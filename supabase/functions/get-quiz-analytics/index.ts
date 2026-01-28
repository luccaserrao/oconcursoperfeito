import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const clampNumber = (value: number, min: number, max: number) => {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
};

const toDateKey = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "unknown";
  return date.toISOString().split("T")[0];
};

const normalizeSource = (value: string) => value.trim().toLowerCase();

const resolveSource = (row: Record<string, unknown>) => {
  const explicit = (row.source as string | undefined) || (row.utm_source as string | undefined);
  if (explicit && explicit.trim()) {
    return normalizeSource(explicit);
  }
  const referrer = row.referrer as string | undefined;
  if (referrer && referrer.trim()) {
    try {
      const hostname = new URL(referrer).hostname.replace(/^www\./, "");
      return normalizeSource(hostname);
    } catch {
      return normalizeSource(referrer);
    }
  }
  return "direto";
};

const countSources = (rows: Array<Record<string, unknown>>) => {
  const counts: Record<string, number> = {};
  rows.forEach((row) => {
    const source = resolveSource(row);
    counts[source] = (counts[source] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const adminTokenHeader =
    req.headers.get("x-admin-token") ||
    req.headers.get("authorization")?.replace("Bearer ", "") ||
    "";
  const expectedToken = Deno.env.get("ADMIN_DASHBOARD_TOKEN") || "";

  if (!expectedToken) {
    return new Response(JSON.stringify({ error: "Token do admin nao configurado no backend" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (adminTokenHeader !== expectedToken) {
    return new Response(JSON.stringify({ error: "Nao autorizado" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return new Response(JSON.stringify({ error: "SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY ausentes" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const daysParam = Number(url.searchParams.get("days") || "30");
    const days = clampNumber(daysParam, 1, 365);
    const sinceIso = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const [startsResult, completionsResult] = await Promise.all([
      supabase
        .from("quiz_starts")
        .select("created_at, source, utm_source, referrer")
        .gte("created_at", sinceIso),
      supabase
        .from("quiz_responses")
        .select("created_at, source, utm_source, referrer")
        .gte("created_at", sinceIso),
    ]);

    if (startsResult.error) {
      throw startsResult.error;
    }
    if (completionsResult.error) {
      throw completionsResult.error;
    }

    const startsRows = (startsResult.data || []) as Array<Record<string, unknown>>;
    const completionsRows = (completionsResult.data || []) as Array<Record<string, unknown>>;

    const dailyMap: Record<string, { starts: number; completions: number }> = {};

    startsRows.forEach((row) => {
      const key = toDateKey(String(row.created_at || ""));
      if (!dailyMap[key]) dailyMap[key] = { starts: 0, completions: 0 };
      dailyMap[key].starts += 1;
    });

    completionsRows.forEach((row) => {
      const key = toDateKey(String(row.created_at || ""));
      if (!dailyMap[key]) dailyMap[key] = { starts: 0, completions: 0 };
      dailyMap[key].completions += 1;
    });

    const daily = Object.entries(dailyMap)
      .map(([date, values]) => ({
        date,
        starts: values.starts,
        completions: values.completions,
        completion_rate: values.starts ? values.completions / values.starts : 0,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const totals = {
      starts: startsRows.length,
      completions: completionsRows.length,
      completion_rate: startsRows.length ? completionsRows.length / startsRows.length : 0,
    };

    const sources = {
      starts: countSources(startsRows).slice(0, 10),
      completions: countSources(completionsRows).slice(0, 10),
    };

    return new Response(
      JSON.stringify({
        period_days: days,
        totals,
        daily,
        sources,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Erro em get-quiz-analytics:", error);
    return new Response(JSON.stringify({ error: "Erro interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

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

const normalizeVersion = (value: unknown) => {
  const normalized = String(value || "").trim().toLowerCase();
  if (normalized === "v1" || normalized === "v2") return normalized;
  return normalized || "desconhecido";
};

const toDateMs = (value: unknown) => {
  const date = new Date(String(value ?? ""));
  const time = date.getTime();
  return Number.isNaN(time) ? null : time;
};

const getSessionId = (row: Record<string, unknown>) => {
  const raw = row.quiz_session_id;
  if (typeof raw !== "string") return "";
  return raw.trim();
};

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

const average = (values: number[]) => {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const median = (values: number[]) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
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
        .select("created_at, source, utm_source, referrer, quiz_session_id, quiz_version")
        .gte("created_at", sinceIso),
      supabase
        .from("quiz_responses")
        .select("created_at, source, utm_source, referrer, quiz_session_id, quiz_version")
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

    const startsBySession: Record<string, Record<string, unknown>> = {};
    startsRows.forEach((row) => {
      const session = getSessionId(row);
      if (!session) return;
      const createdAt = toDateMs(row.created_at);
      const existing = startsBySession[session];
      if (!existing) {
        startsBySession[session] = row;
        return;
      }
      const existingTime = toDateMs(existing.created_at);
      if (createdAt !== null && (existingTime === null || createdAt < existingTime)) {
        startsBySession[session] = row;
      }
    });

    const completionsBySession: Record<string, Record<string, unknown>> = {};
    completionsRows.forEach((row) => {
      const session = getSessionId(row);
      if (!session) return;
      const createdAt = toDateMs(row.created_at);
      const existing = completionsBySession[session];
      if (!existing) {
        completionsBySession[session] = row;
        return;
      }
      const existingTime = toDateMs(existing.created_at);
      if (createdAt !== null && (existingTime === null || createdAt < existingTime)) {
        completionsBySession[session] = row;
      }
    });

    const versionStats: Record<
      string,
      { starts: number; completions: number; durations: number[] }
    > = {};

    Object.values(startsBySession).forEach((row) => {
      const version = normalizeVersion(row.quiz_version);
      if (!versionStats[version]) {
        versionStats[version] = { starts: 0, completions: 0, durations: [] };
      }
      versionStats[version].starts += 1;
    });

    const completionDurations: number[] = [];
    Object.entries(completionsBySession).forEach(([session, completionRow]) => {
      const startRow = startsBySession[session];
      if (!startRow) return;
      const version = normalizeVersion(completionRow.quiz_version || startRow.quiz_version);
      if (!versionStats[version]) {
        versionStats[version] = { starts: 0, completions: 0, durations: [] };
      }
      versionStats[version].completions += 1;
      const startTime = toDateMs(startRow.created_at);
      const completionTime = toDateMs(completionRow.created_at);
      if (startTime === null || completionTime === null) return;
      const minutes = Math.max(0, (completionTime - startTime) / 60000);
      completionDurations.push(minutes);
      versionStats[version].durations.push(minutes);
    });

    const trackedStarts = Object.keys(startsBySession).length;
    const trackedCompletions = Object.keys(completionsBySession).filter((session) => startsBySession[session]).length;

    const dailyTrackedMap: Record<string, { starts: number; completions: number }> = {};
    Object.entries(startsBySession).forEach(([session, startRow]) => {
      const dateKey = toDateKey(String(startRow.created_at || ""));
      if (!dailyTrackedMap[dateKey]) {
        dailyTrackedMap[dateKey] = { starts: 0, completions: 0 };
      }
      dailyTrackedMap[dateKey].starts += 1;
      if (completionsBySession[session]) {
        dailyTrackedMap[dateKey].completions += 1;
      }
    });

    const dailyTracked = Object.entries(dailyTrackedMap)
      .map(([date, values]) => ({
        date,
        starts: values.starts,
        completions: values.completions,
        completion_rate: values.starts ? values.completions / values.starts : 0,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const conversionBySourceMap: Record<string, { starts: number; completions: number }> = {};
    Object.entries(startsBySession).forEach(([session, startRow]) => {
      const source = resolveSource(startRow);
      if (!conversionBySourceMap[source]) {
        conversionBySourceMap[source] = { starts: 0, completions: 0 };
      }
      conversionBySourceMap[source].starts += 1;
      if (completionsBySession[session]) {
        conversionBySourceMap[source].completions += 1;
      }
    });

    const conversionBySource = Object.entries(conversionBySourceMap)
      .map(([source, values]) => ({
        source,
        starts: values.starts,
        completions: values.completions,
        completion_rate: values.starts ? values.completions / values.starts : 0,
      }))
      .sort((a, b) => b.starts - a.starts)
      .slice(0, 10);

    const byVersion = Object.entries(versionStats)
      .map(([version, values]) => ({
        version,
        starts: values.starts,
        completions: values.completions,
        completion_rate: values.starts ? values.completions / values.starts : 0,
        avg_completion_minutes: average(values.durations),
        median_completion_minutes: median(values.durations),
      }))
      .sort((a, b) => b.starts - a.starts);

    const sources = {
      starts: countSources(startsRows).slice(0, 10),
      completions: countSources(completionsRows).slice(0, 10),
    };

    return new Response(
      JSON.stringify({
        period_days: days,
        totals,
        daily,
        daily_tracked: dailyTracked,
        sources,
        funnel: {
          tracked_starts: trackedStarts,
          tracked_completions: trackedCompletions,
          completion_rate: trackedStarts ? trackedCompletions / trackedStarts : 0,
          avg_completion_minutes: average(completionDurations),
          median_completion_minutes: median(completionDurations),
        },
        by_version: byVersion,
        conversion_by_source: conversionBySource,
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

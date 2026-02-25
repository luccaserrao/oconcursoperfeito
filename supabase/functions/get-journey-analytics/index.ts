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

const toDateMs = (value: unknown) => {
  const date = new Date(String(value ?? ""));
  const time = date.getTime();
  return Number.isNaN(time) ? null : time;
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

const stepDefinitions = [
  { step: "landing_viewed", label: "Landing" },
  { step: "preparation_viewed", label: "Preparacao" },
  { step: "quiz_started", label: "Inicio do quiz" },
  { step: "quiz_completed", label: "Conclusao do quiz" },
  { step: "email_submitted", label: "Email enviado" },
  { step: "results_viewed", label: "Resultado visto" },
  { step: "upsell_clicked", label: "Clique no upsell" },
  { step: "checkout_started", label: "Checkout iniciado" },
  { step: "payment_confirmed", label: "Pagamento confirmado" },
];

type SessionAggregate = {
  session_id: string;
  steps: Record<string, string>;
  first_seen: string | null;
  last_seen: string | null;
  last_seen_ms: number;
  source?: string;
  quiz_version?: string;
  quiz_response_id?: string | null;
  order_id?: string | null;
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

    const { data: events, error } = await supabase
      .from("quiz_journey_events")
      .select(
        "created_at, quiz_session_id, step, page_path, source, utm_source, referrer, quiz_version, quiz_response_id, order_id",
      )
      .gte("created_at", sinceIso);

    if (error) {
      throw error;
    }

    const sessions: Record<string, SessionAggregate> = {};
    (events || []).forEach((row) => {
      const sessionId = String(row.quiz_session_id || "").trim();
      const step = String(row.step || "").trim();
      if (!sessionId || !step) return;

      const createdAt = String(row.created_at || "");
      const createdAtMs = toDateMs(createdAt);

      if (!sessions[sessionId]) {
        sessions[sessionId] = {
          session_id: sessionId,
          steps: {},
          first_seen: createdAt || null,
          last_seen: createdAt || null,
          last_seen_ms: createdAtMs || 0,
          source: resolveSource(row as Record<string, unknown>),
          quiz_version: row.quiz_version ? String(row.quiz_version) : undefined,
          quiz_response_id: row.quiz_response_id ? String(row.quiz_response_id) : null,
          order_id: row.order_id ? String(row.order_id) : null,
        };
      }

      const session = sessions[sessionId];
      const existing = session.steps[step];
      if (!existing || (createdAtMs !== null && createdAtMs < (toDateMs(existing) || 0))) {
        session.steps[step] = createdAt;
      }

      if (createdAtMs !== null) {
        if (!session.first_seen || createdAtMs < (toDateMs(session.first_seen) || createdAtMs)) {
          session.first_seen = createdAt;
        }
        if (!session.last_seen || createdAtMs > (toDateMs(session.last_seen) || 0)) {
          session.last_seen = createdAt;
          session.last_seen_ms = createdAtMs;
        }
      }

      if (!session.source) {
        session.source = resolveSource(row as Record<string, unknown>);
      }
      if (!session.quiz_version && row.quiz_version) {
        session.quiz_version = String(row.quiz_version);
      }
      if (!session.quiz_response_id && row.quiz_response_id) {
        session.quiz_response_id = String(row.quiz_response_id);
      }
      if (!session.order_id && row.order_id) {
        session.order_id = String(row.order_id);
      }
    });

    const sessionList = Object.values(sessions);
    const stepCounts = stepDefinitions.map(() => ({ reached: 0, sequential: 0 }));

    sessionList.forEach((session) => {
      let hasAll = true;
      stepDefinitions.forEach((def, idx) => {
        const hasStep = Boolean(session.steps[def.step]);
        if (hasStep) stepCounts[idx].reached += 1;
        if (hasAll && hasStep) {
          stepCounts[idx].sequential += 1;
        } else {
          hasAll = false;
        }
      });
    });

    const stepSummaries = stepDefinitions.map((def, idx) => {
      const prevSequential = idx === 0 ? 0 : stepCounts[idx - 1].sequential;
      const sequential = stepCounts[idx].sequential;
      const conversionRate = idx === 0 ? 1 : prevSequential ? sequential / prevSequential : 0;
      return {
        step: def.step,
        label: def.label,
        reached: stepCounts[idx].reached,
        sequential,
        conversion_rate: conversionRate,
      };
    });

    const totalSessions = sessionList.length;
    const completedSessions = stepCounts[stepCounts.length - 1]?.sequential || 0;
    const completionRate = stepCounts[0]?.sequential
      ? completedSessions / stepCounts[0].sequential
      : 0;

    const journeySessions = sessionList
      .sort((a, b) => b.last_seen_ms - a.last_seen_ms)
      .slice(0, 200);

    const journeyIds = journeySessions.map((session) => session.session_id);
    let responsesMap: Record<string, { id: string; email: string; quiz_version?: string }> = {};
    if (journeyIds.length > 0) {
      const { data: responses } = await supabase
        .from("quiz_responses")
        .select("id, user_email, quiz_version, quiz_session_id")
        .in("quiz_session_id", journeyIds);

      responsesMap = (responses || []).reduce((acc, row) => {
        const sessionId = String(row.quiz_session_id || "");
        if (!sessionId) return acc;
        acc[sessionId] = {
          id: String(row.id || ""),
          email: String(row.user_email || ""),
          quiz_version: row.quiz_version ? String(row.quiz_version) : undefined,
        };
        return acc;
      }, {} as Record<string, { id: string; email: string; quiz_version?: string }>);
    }

    let ordersMap: Record<string, { order_id: string; paid_at: string | null; amount: number | null }> = {};
    const responseIds = Object.values(responsesMap)
      .map((row) => row.id)
      .filter(Boolean);
    if (responseIds.length > 0) {
      const { data: orders } = await supabase
        .from("orders")
        .select("id, quiz_response_id, payment_status, paid_at, amount")
        .in("quiz_response_id", responseIds);

      ordersMap = (orders || []).reduce((acc, order) => {
        if (!order.quiz_response_id) return acc;
        const isPaid = (order.payment_status || "").toLowerCase() === "paid";
        const existing = acc[order.quiz_response_id];
        if (!existing || (isPaid && !existing.paid_at)) {
          acc[order.quiz_response_id] = {
            order_id: String(order.id || ""),
            paid_at: order.paid_at || null,
            amount: order.amount ?? null,
          };
        }
        return acc;
      }, {} as Record<string, { order_id: string; paid_at: string | null; amount: number | null }>);
    }

    const journeys = journeySessions.map((session) => {
      const response = responsesMap[session.session_id];
      const order = response?.id ? ordersMap[response.id] : undefined;
      return {
        session_id: session.session_id,
        first_seen: session.first_seen,
        last_seen: session.last_seen,
        source: session.source || "direto",
        quiz_version: response?.quiz_version || session.quiz_version || null,
        email: response?.email || "",
        quiz_response_id: response?.id || session.quiz_response_id || null,
        order_id: order?.order_id || session.order_id || null,
        paid_at: order?.paid_at || null,
        amount: order?.amount ?? null,
        steps: session.steps,
      };
    });

    return new Response(
      JSON.stringify({
        period_days: days,
        steps: stepSummaries,
        funnel: {
          total_sessions: totalSessions,
          completed_sessions: completedSessions,
          completion_rate: completionRate,
        },
        journeys,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Erro em get-journey-analytics:", error);
    return new Response(JSON.stringify({ error: "Erro interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

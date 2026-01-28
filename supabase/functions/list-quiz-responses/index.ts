import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
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
    return new Response(
      JSON.stringify({ error: "Token do admin nao configurado no backend" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  if (adminTokenHeader !== expectedToken) {
    return new Response(
      JSON.stringify({ error: "Nao autorizado" }),
      { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error("Missing Supabase env vars", { hasUrl: !!supabaseUrl, hasKey: !!supabaseServiceRoleKey });
      return new Response(
        JSON.stringify({ error: "SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY ausentes" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const url = new URL(req.url);
    const limitParam = Number(url.searchParams.get("limit") || "200");
    const limit = Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 500 ? limitParam : 200;

    // Seleciona apenas as colunas reais existentes
    const { data, error } = await supabase
      .from("quiz_responses")
      .select(
        "id, created_at, user_name, user_email, answers_json, riasec_json, quiz_version, macro_area_result, whatsapp, clicked_upsell, upsell_clicked_at, quiz_session_id, source, utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer, landing_path",
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching quiz_responses:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return new Response(
        JSON.stringify({
          error: "Falha ao buscar respostas do quiz",
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const responsesBase = data || [];

    // Enriquecer com status de pagamento (orders)
    const ids = responsesBase.map((row) => row.id).filter(Boolean);
    let paidMap: Record<string, { paid: boolean; paid_at: string | null; amount: number | null; order_id: string | null }> = {};

    if (ids.length > 0) {
      const { data: orders, error: ordersError } = await supabase
        .from("orders")
        .select("id, quiz_response_id, payment_status, paid_at, amount")
        .in("quiz_response_id", ids);

      if (!ordersError && orders) {
        paidMap = orders.reduce((acc: typeof paidMap, order) => {
          if (!order.quiz_response_id) return acc;
          const isPaid = (order.payment_status || "").toLowerCase() === "paid";
          const existing = acc[order.quiz_response_id];
          if (!existing || (isPaid && !existing.paid)) {
            acc[order.quiz_response_id] = {
              paid: isPaid,
              paid_at: order.paid_at || null,
              amount: order.amount ?? null,
              order_id: order.id ?? null,
            };
          }
          return acc;
        }, {});
      }
    }

    const responses = responsesBase.map((row) => {
      const riasec = (row as any).riasec_json || null;
      const answers = (row as any).answers_json || [];
      const paidInfo = paidMap[row.id] || { paid: false, paid_at: null, amount: null, order_id: null };
      return {
        id: row.id,
        name: (row as any).user_name || "",
        email: (row as any).user_email || "",
        whatsapp: (row as any).whatsapp ?? null, // pode não existir; retornamos null
        created_at: row.created_at,
        answers,
        ai_recommendation: riasec,
        clicked_upsell: (row as any).clicked_upsell ?? null, // pode não existir; retornamos null
        upsell_clicked_at: (row as any).upsell_clicked_at ?? null,
        quiz_session_id: (row as any).quiz_session_id ?? null,
        source: (row as any).source ?? null,
        utm_source: (row as any).utm_source ?? null,
        utm_medium: (row as any).utm_medium ?? null,
        utm_campaign: (row as any).utm_campaign ?? null,
        utm_content: (row as any).utm_content ?? null,
        utm_term: (row as any).utm_term ?? null,
        referrer: (row as any).referrer ?? null,
        landing_path: (row as any).landing_path ?? null,
        riasec,
        riasec_top1: riasec?.top1 || null,
        riasec_top2: riasec?.top2 || null,
        quiz_version: (row as any).quiz_version ?? null,
        macro_area_result: (row as any).macro_area_result ?? null,
        paid: paidInfo,
      };
    });

    return new Response(
      JSON.stringify({ responses }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Unexpected error in list-quiz-responses:", error);
    const message = error instanceof Error ? error.message : "Erro interno";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

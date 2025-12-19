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
      .select("id, created_at, name, email, whatsapp, ai_recommendation, answers, clicked_upsell, upsell_clicked_at")
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

    const responses = (data || []).map((row) => {
      const aiRecommendation = (row as any).ai_recommendation || null;
      const riasec = (aiRecommendation as any)?.riasec || null;
      const answers = (row as any).answers || [];
      return {
        id: row.id,
        name: (row as any).name || "",
        email: (row as any).email || "",
        whatsapp: (row as any).whatsapp ?? null,
        created_at: row.created_at,
        answers,
        ai_recommendation: aiRecommendation,
        clicked_upsell: (row as any).clicked_upsell ?? null,
        upsell_clicked_at: (row as any).upsell_clicked_at ?? null,
        riasec,
        riasec_top1: riasec?.top1 || null,
        riasec_top2: riasec?.top2 || null,
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

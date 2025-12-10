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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    const url = new URL(req.url);
    const limitParam = Number(url.searchParams.get("limit") || "200");
    const limit = Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 500 ? limitParam : 200;

    const { data, error } = await supabase
      .from("quiz_responses")
      .select("id, name, email, whatsapp, created_at, answers, ai_recommendation, clicked_upsell, upsell_clicked_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching quiz_responses:", error);
      return new Response(
        JSON.stringify({ error: "Falha ao buscar respostas do quiz" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const responses = (data || []).map((row) => {
      const ai = row.ai_recommendation as any;
      const riasec = ai?.riasec || null;
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        whatsapp: row.whatsapp,
        created_at: row.created_at,
        answers: row.answers,
        ai_recommendation: row.ai_recommendation,
        clicked_upsell: row.clicked_upsell,
        upsell_clicked_at: row.upsell_clicked_at,
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
    return new Response(
      JSON.stringify({ error: "Erro interno" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const requestSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(255),
  answers: z.array(z.any()).nonempty("answers obrigatorio"),
  riasec: z.any().optional(),
  quiz_version: z.enum(["v1", "v2"]).optional(),
  macro_area_result: z.any().optional().nullable(),
  whatsapp: z.string().trim().optional().nullable(),
  clickedUpsell: z.boolean().optional(),
  quiz_session_id: z.string().trim().optional(),
  source: z.string().trim().optional(),
  utm_source: z.string().trim().optional(),
  utm_medium: z.string().trim().optional(),
  utm_campaign: z.string().trim().optional(),
  utm_content: z.string().trim().optional(),
  utm_term: z.string().trim().optional(),
  referrer: z.string().trim().optional(),
  landing_path: z.string().trim().optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Metodo nao permitido" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Dados invalidos", details: parsed.error.errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const {
      name,
      email,
      answers,
      riasec,
      quiz_version,
      macro_area_result,
      whatsapp,
      quiz_session_id,
      source,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      referrer,
      landing_path,
    } = parsed.data;

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: "Variaveis do Supabase ausentes" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const insertPayload: Record<string, unknown> = {
      user_name: name,
      user_email: email,
      answers_json: answers,
      riasec_json: riasec ?? null,
    };

    const safeWhatsapp = typeof whatsapp === "string" ? whatsapp.trim() : "";
    if (safeWhatsapp) insertPayload.whatsapp = safeWhatsapp;
    if (quiz_version) insertPayload.quiz_version = quiz_version;
    if (macro_area_result !== undefined) insertPayload.macro_area_result = macro_area_result;
    if (quiz_session_id) insertPayload.quiz_session_id = quiz_session_id;
    if (source) insertPayload.source = source;
    if (utm_source) insertPayload.utm_source = utm_source;
    if (utm_medium) insertPayload.utm_medium = utm_medium;
    if (utm_campaign) insertPayload.utm_campaign = utm_campaign;
    if (utm_content) insertPayload.utm_content = utm_content;
    if (utm_term) insertPayload.utm_term = utm_term;
    if (referrer) insertPayload.referrer = referrer;
    if (landing_path) insertPayload.landing_path = landing_path;
    const { data, error } = await supabase
      .from("quiz_responses")
      .insert(insertPayload)
      .select("id")
      .single();

    if (error) {
      console.error("Erro ao salvar quiz_responses:", error);
      return new Response(
        JSON.stringify({ error: "Erro ao salvar no Supabase", details: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ ok: true, id: data?.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Erro inesperado em generate-career-recommendation:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

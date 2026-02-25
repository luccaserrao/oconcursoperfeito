import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const requestSchema = z.object({
  quiz_session_id: z.string().trim().min(6),
  step: z.enum([
    "landing_viewed",
    "preparation_viewed",
    "quiz_started",
    "quiz_completed",
    "email_submitted",
    "results_viewed",
    "upsell_clicked",
    "checkout_started",
    "payment_confirmed",
  ]),
  page_path: z.string().trim().max(500).optional(),
  quiz_version: z.string().trim().max(20).optional(),
  home_variant: z.string().trim().max(20).optional(),
  source: z.string().trim().max(200).optional(),
  utm_source: z.string().trim().max(200).optional(),
  utm_medium: z.string().trim().max(200).optional(),
  utm_campaign: z.string().trim().max(200).optional(),
  utm_content: z.string().trim().max(200).optional(),
  utm_term: z.string().trim().max(200).optional(),
  referrer: z.string().trim().max(500).optional(),
  landing_path: z.string().trim().max(500).optional(),
  quiz_response_id: z.string().uuid().optional().nullable(),
  order_id: z.string().uuid().optional().nullable(),
  metadata: z.record(z.any()).optional().nullable(),
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
    const body = await req.json().catch(() => ({}));
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Dados invalidos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !supabaseKey) {
      return new Response(JSON.stringify({ error: "Variaveis do Supabase ausentes" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const payload = {
      quiz_session_id: parsed.data.quiz_session_id,
      step: parsed.data.step,
      page_path: parsed.data.page_path,
      quiz_version: parsed.data.quiz_version,
      home_variant: parsed.data.home_variant,
      source: parsed.data.source,
      utm_source: parsed.data.utm_source,
      utm_medium: parsed.data.utm_medium,
      utm_campaign: parsed.data.utm_campaign,
      utm_content: parsed.data.utm_content,
      utm_term: parsed.data.utm_term,
      referrer: parsed.data.referrer,
      landing_path: parsed.data.landing_path,
      quiz_response_id: parsed.data.quiz_response_id ?? null,
      order_id: parsed.data.order_id ?? null,
      metadata: parsed.data.metadata ?? null,
    };

    const { error } = await supabase
      .from("quiz_journey_events")
      .upsert(payload, { onConflict: "quiz_session_id,step" });

    if (error) {
      console.error("Erro ao inserir quiz_journey_events:", error);
      return new Response(JSON.stringify({ error: "Erro ao salvar no Supabase" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro em track-journey-step:", error);
    return new Response(JSON.stringify({ error: "Erro interno" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

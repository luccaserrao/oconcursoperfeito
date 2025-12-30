import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const requestSchema = z.object({
  quizResponseId: z.string().uuid(),
});

const paidStatuses = ["paid", "approved"];

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[Email Seq 3] Starting email send process");

    const body = await req.json();
    const { quizResponseId } = requestSchema.parse(body);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Skip if user already paid
    const { data: order } = await supabase
      .from("orders")
      .select("id")
      .eq("quiz_response_id", quizResponseId)
      .in("payment_status", paidStatuses)
      .limit(1)
      .maybeSingle();

    if (order) {
      console.log("[Email Seq 3] User already paid, skipping email");
      return new Response(
        JSON.stringify({ message: "User already paid, email skipped" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch lead data
    const { data: quizResponse, error: quizError } = await supabase
      .from("quiz_responses")
      .select("*")
      .eq("id", quizResponseId)
      .single();

    if (quizError || !quizResponse) {
      throw new Error(`Quiz response not found: ${quizError?.message}`);
    }

    const name = (quizResponse as any).user_name || (quizResponse as any).name;
    const email = (quizResponse as any).user_email || (quizResponse as any).email;
    const recommendation = (quizResponse as any).riasec_json || (quizResponse as any).ai_recommendation || {};
    const careerName = recommendation?.careerName || "sua carreira ideal";
    const salary = recommendation?.salary || "competitivo";
    const examFrequency = recommendation?.examFrequency || "";

    // Quick exam window summary
    let examPreview = "proximos meses";
    if (examFrequency.toLowerCase().includes("anual") || examFrequency.toLowerCase().includes("ano")) {
      examPreview = "proximos 6-12 meses";
    } else if (examFrequency.toLowerCase().includes("frequente")) {
      examPreview = "proximos 3-6 meses";
    }

    // Prevent duplicates
    const { data: existingLog } = await supabase
      .from("email_logs")
      .select("id")
      .eq("quiz_response_id", quizResponseId)
      .eq("email_type", "sequence_3")
      .maybeSingle();

    if (existingLog) {
      console.log("[Email Seq 3] Email already sent, skipping");
      return new Response(
        JSON.stringify({ message: "Email already sent" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const paymentLink = `${Deno.env.get("SUPABASE_URL")?.replace("https://gtmsjqqqzsfganppcdxe.supabase.co", "https://seu-dominio.com.br")}/?source=email3&qid=${quizResponseId}`;

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; color: #111;">
        <h2 style="color: #0f172a; margin-bottom: 16px;">${name}, sua decisao final sobre ${careerName}</h2>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 12px;">
          Nosso time reservou um plano completo para voce, mas ele so fica guardado ate hoje.
        </p>

        <div style="background: #0ea5e9; color: white; padding: 16px; border-radius: 10px; margin: 20px 0;">
          <p style="margin: 6px 0; font-size: 16px;"><strong>Carreira:</strong> ${careerName}</p>
          <p style="margin: 6px 0; font-size: 16px;"><strong>Faixa salarial:</strong> ${salary}</p>
          <p style="margin: 6px 0; font-size: 16px;"><strong>Proximo edital:</strong> ${examPreview}</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6; margin: 16px 0;">
          Desbloqueie por R$ 50 e receba o passo a passo para chegar preparado no edital.
        </p>

        <div style="text-align: center; margin: 28px 0;">
          <a href="${paymentLink}" style="background: #0f172a; color: white; padding: 14px 30px; text-decoration: none; border-radius: 10px; display: inline-block; font-weight: 700;">
            Garantir meu plano agora
          </a>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 10px;">
          <p style="margin: 0 0 8px 0; font-size: 15px;"><strong>O que voce leva:</strong></p>
          <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 15px; line-height: 1.6;">
            <li>Cronograma detalhado com as materias que mais pontuam.</li>
            <li>Materiais recomendados pela IA para acelerar a preparacao.</li>
            <li>Revisao express para os 7 dias antes da prova.</li>
          </ul>
        </div>

        <p style="font-size: 14px; color: #475569; margin-top: 24px;">
          Se nao fizer sentido agora, tudo bem. Mas se quer comecar 2025 preparado, esse e o momento.
        </p>

        <p style="font-size: 14px; color: #94a3b8; margin-top: 20px; padding-top: 12px; border-top: 1px solid #e2e8f0;">
          Equipe Concurso Perfeito
        </p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Concurso Perfeito <onboarding@resend.dev>",
      to: [email],
      subject: `${name}, ultima chance de liberar seu plano para ${careerName}`,
      html: emailHtml,
    });

    console.log("[Email Seq 3] Email sent successfully:", emailResponse);

    await supabase.from("email_logs").insert({
      quiz_response_id: quizResponseId,
      user_email: email,
      user_name: name,
      email_type: "sequence_3",
      status: "sent",
      resend_email_id: emailResponse.data?.id,
    });

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[Email Seq 3] Error:", error);

    try {
      const body = await req.json();
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      await supabase.from("email_logs").insert({
        quiz_response_id: body.quizResponseId,
        user_email: "unknown",
        user_name: "unknown",
        email_type: "sequence_3",
        status: "failed",
        error_message: error.message,
      });
    } catch (logError) {
      console.error("[Email Seq 3] Error logging failed:", logError);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);

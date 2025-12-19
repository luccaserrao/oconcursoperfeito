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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[Email Seq 1] Starting email send process");
    
    const body = await req.json();
    const { quizResponseId } = requestSchema.parse(body);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Buscar dados do lead
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
    const careerName = (recommendation as any)?.careerName || (recommendation as any)?.top1 || "sua carreira ideal";
    const salary = (recommendation as any)?.salary || "competitivo";
    const examFrequency = (recommendation as any)?.examFrequency || "";
    
    // Resumir previsão de edital
    let examPreview = "próximos meses";
    if (examFrequency.toLowerCase().includes("anual") || examFrequency.toLowerCase().includes("ano")) {
      examPreview = "próximos 6-12 meses";
    } else if (examFrequency.toLowerCase().includes("frequente")) {
      examPreview = "próximos 3-6 meses";
    }

    // Verificar se já foi enviado
    const { data: existingLog } = await supabase
      .from("email_logs")
      .select("id")
      .eq("quiz_response_id", quizResponseId)
      .eq("email_type", "sequence_1")
      .single();

    if (existingLog) {
      console.log("[Email Seq 1] Email already sent, skipping");
      return new Response(
        JSON.stringify({ message: "Email already sent" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Gerar link de pagamento
    const paymentLink = `${Deno.env.get("SUPABASE_URL")?.replace("https://gtmsjqqqzsfganppcdxe.supabase.co", "https://seu-dominio.com.br")}/?source=email1&qid=${quizResponseId}`;

    // Enviar email
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #2563eb; margin-bottom: 20px;">Oi ${name},</h2>
        
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
          Lembra do teste que você fez no Concurso Perfeito?<br>
          A IA analisou seu perfil e indicou que a carreira ideal pra você é:
        </p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 8px 0; font-size: 16px;"><strong>🎯 ${careerName}</strong></p>
          <p style="margin: 8px 0; font-size: 16px;"><strong>💰 Salário:</strong> ${salary}</p>
          <p style="margin: 8px 0; font-size: 16px;"><strong>📅 Próximo edital:</strong> ${examPreview}</p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
          👉 <strong>Libere agora o resultado completo e veja todas as chances pra 2025:</strong>
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${paymentLink}" style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
            Ver Resultado Completo por R$ 50
          </a>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; margin-top: 30px;">
          Você pode começar o ano já no caminho certo.
        </p>
        
        <p style="font-size: 14px; color: #666; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          — Equipe Concurso Perfeito
        </p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Concurso Perfeito <onboarding@resend.dev>",
      to: [email],
      subject: `${name}, sua carreira pública ideal já foi escolhida pela IA 👀`,
      html: emailHtml,
    });

    console.log("[Email Seq 1] Email sent successfully:", emailResponse);

    // Registrar no log
    await supabase.from("email_logs").insert({
      quiz_response_id: quizResponseId,
      user_email: email,
      user_name: name,
      email_type: "sequence_1",
      status: "sent",
      resend_email_id: emailResponse.data?.id,
    });

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[Email Seq 1] Error:", error);
    
    // Tentar registrar erro no log
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
        email_type: "sequence_1",
        status: "failed",
        error_message: error.message,
      });
    } catch (logError) {
      console.error("[Email Seq 1] Error logging failed:", logError);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);

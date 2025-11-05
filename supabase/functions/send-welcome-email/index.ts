import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  name: string;
  email: string;
  quizResponseId: string;
  careerName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate input
    const requestSchema = z.object({
      name: z.string().trim().min(2).max(100),
      email: z.string().trim().email().max(255),
      quizResponseId: z.string().uuid(),
      careerName: z.string().trim().min(1).max(200),
    });

    const body = await req.json();
    const validationResult = requestSchema.safeParse(body);

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      return new Response(
        JSON.stringify({ 
          error: "Dados inválidos", 
          details: validationResult.error.errors 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    const { name, email, quizResponseId, careerName }: WelcomeEmailRequest = validationResult.data;

    console.log(`Processing welcome email for: ${email}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if welcome email was already sent
    const { data: existingLog, error: checkError } = await supabase
      .from("email_logs")
      .select("id")
      .eq("user_email", email)
      .eq("email_type", "welcome")
      .eq("quiz_response_id", quizResponseId)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking email logs:", checkError);
    }

    if (existingLog) {
      console.log(`Welcome email already sent to ${email}, skipping...`);
      return new Response(
        JSON.stringify({ message: "Email já enviado anteriormente" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Send email via Resend
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              padding: 30px 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .career-box {
              background: #f8f9fa;
              border-left: 4px solid #667eea;
              padding: 15px;
              margin: 20px 0;
            }
            .cta-button {
              display: inline-block;
              padding: 15px 30px;
              background: #667eea;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #666;
              font-size: 12px;
              border-top: 1px solid #e0e0e0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎓 Seu Resultado Está Pronto!</h1>
          </div>
          <div class="content">
            <p>Olá <strong>${name}</strong>,</p>
            
            <p>Parabéns por completar o quiz de orientação de carreira! 🎉</p>
            
            <p>Baseado nas suas respostas, nossa análise identificou que você tem um perfil promissor para:</p>
            
            <div class="career-box">
              <h3>🎯 ${careerName}</h3>
              <p style="margin: 0; color: #666;">Esta é apenas uma prévia do seu resultado completo!</p>
            </div>
            
            <p><strong>Desbloqueie agora seu relatório completo e receba:</strong></p>
            <ul>
              <li>✅ Plano de estudos personalizado</li>
              <li>✅ Cronograma detalhado de preparação</li>
              <li>✅ Carreiras alternativas compatíveis</li>
              <li>✅ Materiais de estudo recomendados</li>
              <li>✅ Acesso ao grupo exclusivo no WhatsApp</li>
            </ul>
            
            <p style="text-align: center;">
              <a href="${supabaseUrl.replace('supabase.co', 'lovable.app')}/?unlock=true" class="cta-button">
                🔓 Desbloquear por R$ 50,00
              </a>
            </p>
            
            <p style="color: #666; font-size: 14px;">
              <em>Investimento único de R$ 50,00 para ter acesso vitalício ao seu plano personalizado.</em>
            </p>
          </div>
          <div class="footer">
            <p>Este email foi enviado porque você completou nosso quiz de orientação de carreira.</p>
            <p>© ${new Date().getFullYear()} - Todos os direitos reservados</p>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Quiz de Carreira <onboarding@resend.dev>",
      to: [email],
      subject: `🎓 ${name}, seu resultado está pronto!`,
      html: emailHtml,
    });

    if (emailResponse.error) {
      throw new Error(`Resend error: ${emailResponse.error.message}`);
    }

    console.log("Email sent successfully via Resend:", emailResponse.data?.id);

    // Log email sent to database
    const { error: logError } = await supabase
      .from("email_logs")
      .insert({
        user_email: email,
        user_name: name,
        email_type: "welcome",
        quiz_response_id: quizResponseId,
        status: "sent",
        resend_email_id: emailResponse.data?.id,
      });

    if (logError) {
      console.error("Error logging email:", logError);
      // Don't fail the request if logging fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email enviado com sucesso",
        emailId: emailResponse.data?.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    
    // Try to log the error
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const body = await req.json().catch(() => ({}));
      
      await supabase.from("email_logs").insert({
        user_email: body.email || "unknown",
        user_name: body.name || "unknown",
        email_type: "welcome",
        quiz_response_id: body.quizResponseId || null,
        status: "failed",
        error_message: error.message,
      });
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

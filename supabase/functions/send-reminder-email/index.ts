import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReminderEmailRequest {
  email: string;
  name: string;
  careerName: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate input
    const requestSchema = z.object({
      email: z.string().trim().email().max(255),
      name: z.string().trim().min(2).max(100),
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

    const { email, name, careerName }: ReminderEmailRequest = validationResult.data;

    console.log(`Processing reminder email for: ${email}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user already paid
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("id")
      .eq("user_email", email)
      .eq("payment_status", "paid")
      .maybeSingle();

    if (existingOrder) {
      console.log(`User ${email} already paid, skipping reminder...`);
      return new Response(
        JSON.stringify({ message: "Usuário já realizou o pagamento" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Check if reminder was sent recently (last 24 hours)
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    const { data: recentReminder } = await supabase
      .from("email_logs")
      .select("id")
      .eq("user_email", email)
      .eq("email_type", "reminder")
      .gte("sent_at", oneDayAgo.toISOString())
      .maybeSingle();

    if (recentReminder) {
      console.log(`Reminder already sent to ${email} in the last 24h, skipping...`);
      return new Response(
        JSON.stringify({ message: "Lembrete já enviado nas últimas 24h" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Send reminder email via Resend
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
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e0e0e0;
            }
            .urgency-box {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
            }
            .cta-button {
              display: inline-block;
              padding: 15px 30px;
              background: #f5576c;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin: 20px 0;
            }
            .benefit-list {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 5px;
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
            <h1>⏰ Não Perca Seu Plano Personalizado!</h1>
          </div>
          <div class="content">
            <p>Olá <strong>${name}</strong>,</p>
            
            <p>Notamos que você ainda não desbloqueou seu resultado completo para <strong>${careerName}</strong>.</p>
            
            <div class="urgency-box">
              <p style="margin: 0;">
                <strong>⚡ Seu plano de estudos personalizado está esperando por você!</strong>
              </p>
            </div>
            
            <p>Milhares de candidatos já estão se preparando. Não fique para trás!</p>
            
            <div class="benefit-list">
              <h3 style="margin-top: 0;">🎯 O que você vai receber:</h3>
              <ul style="margin-bottom: 0;">
                <li>📅 <strong>Cronograma personalizado</strong> baseado no seu perfil</li>
                <li>📚 <strong>Plano de estudos detalhado</strong> com foco nos conteúdos certos</li>
                <li>💼 <strong>3 carreiras alternativas</strong> compatíveis com você</li>
                <li>📖 <strong>Materiais gratuitos</strong> selecionados especialmente</li>
                <li>💬 <strong>Grupo VIP no WhatsApp</strong> com suporte direto</li>
              </ul>
            </div>
            
            <p style="text-align: center;">
              <a href="${supabaseUrl.replace('supabase.co', 'lovable.app')}/?unlock=true" class="cta-button">
                🚀 Desbloquear Agora por R$ 50
              </a>
            </p>
            
            <p style="color: #666; font-size: 14px; text-align: center;">
              <em>Investimento único • Acesso vitalício • Sem mensalidades</em>
            </p>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #999; font-size: 13px;">
              💡 <strong>Dica:</strong> Quanto antes você começar a se preparar, maiores suas chances de aprovação.
            </p>
          </div>
          <div class="footer">
            <p>Este é um lembrete amigável sobre seu resultado do quiz de orientação de carreira.</p>
            <p>© ${new Date().getFullYear()} - Todos os direitos reservados</p>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Quiz de Carreira <onboarding@resend.dev>",
      to: [email],
      subject: `⏰ ${name}, não perca seu plano de estudos!`,
      html: emailHtml,
    });

    if (emailResponse.error) {
      throw new Error(`Resend error: ${emailResponse.error.message}`);
    }

    console.log("Reminder email sent successfully via Resend:", emailResponse.data?.id);

    // Log email sent to database
    const { error: logError } = await supabase
      .from("email_logs")
      .insert({
        user_email: email,
        user_name: name,
        email_type: "reminder",
        status: "sent",
        resend_email_id: emailResponse.data?.id,
      });

    if (logError) {
      console.error("Error logging email:", logError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email de lembrete enviado com sucesso",
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
    console.error("Error in send-reminder-email function:", error);
    
    // Try to log the error
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const body = await req.json().catch(() => ({}));
      
      await supabase.from("email_logs").insert({
        user_email: body.email || "unknown",
        user_name: body.name || "unknown",
        email_type: "reminder",
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

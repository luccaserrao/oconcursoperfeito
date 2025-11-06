import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const requestSchema = z.object({
  quizResponseId: z.string().uuid(),
  userEmail: z.string().email(),
  userName: z.string(),
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[Schedule] Starting email sequence scheduling");
    
    const body = await req.json();
    const { quizResponseId, userEmail, userName } = requestSchema.parse(body);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Verificar se já existe agendamento
    const { data: existing } = await supabase
      .from("email_automation_queue")
      .select("id")
      .eq("quiz_response_id", quizResponseId)
      .limit(1);

    if (existing && existing.length > 0) {
      console.log("[Schedule] Email sequence already scheduled");
      return new Response(
        JSON.stringify({ message: "Email sequence already scheduled" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const now = new Date();
    
    // Email 1: D+0 (imediato - não agendamos pois welcome email já cobre isso)
    // Email 2: D+5
    const email2Date = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);

    const emailsToSchedule = [
      {
        quiz_response_id: quizResponseId,
        user_email: userEmail,
        user_name: userName,
        email_sequence_number: 2,
        scheduled_for: email2Date.toISOString(),
        status: "pending",
      },
    ];

    const { error: insertError } = await supabase
      .from("email_automation_queue")
      .insert(emailsToSchedule);

    if (insertError) {
      throw new Error(`Failed to schedule emails: ${insertError.message}`);
    }

    console.log("[Schedule] Email sequence scheduled successfully:", {
      quizResponseId,
      totalEmails: emailsToSchedule.length,
      dates: emailsToSchedule.map(e => ({ seq: e.email_sequence_number, date: e.scheduled_for })),
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        scheduled: emailsToSchedule.length,
        emails: emailsToSchedule.map(e => ({
          sequence: e.email_sequence_number,
          scheduledFor: e.scheduled_for,
        })),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[Schedule] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);

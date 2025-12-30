import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[Process Queue] Starting email queue processing");
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Buscar emails pendentes (até 50 por execução)
    const now = new Date().toISOString();
    const { data: pendingEmails, error: fetchError } = await supabase
      .from("email_automation_queue")
      .select("*")
      .lte("scheduled_for", now)
      .eq("status", "pending")
      .order("scheduled_for", { ascending: true })
      .limit(50);

    if (fetchError) {
      throw new Error(`Failed to fetch pending emails: ${fetchError.message}`);
    }

    if (!pendingEmails || pendingEmails.length === 0) {
      console.log("[Process Queue] No pending emails to process");
      return new Response(
        JSON.stringify({ message: "No pending emails", processed: 0 }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[Process Queue] Found ${pendingEmails.length} pending emails`);

    const paidStatuses = ["paid", "approved"];

    let processed = 0;
    let skipped = 0;
    let failed = 0;

    for (const emailJob of pendingEmails) {
      try {
        console.log(`[Process Queue] Processing email ${emailJob.id} (seq ${emailJob.email_sequence_number})`);

        // Verificar se já pagou
        const { data: order } = await supabase
          .from("orders")
          .select("*")
          .eq("quiz_response_id", emailJob.quiz_response_id)
          .in("payment_status", paidStatuses)
          .limit(1)
          .maybeSingle();

        if (order) {
          console.log(`[Process Queue] User already paid, skipping email ${emailJob.id}`);
          
          await supabase
            .from("email_automation_queue")
            .update({
              status: "skipped",
              skip_reason: "already_paid",
              sent_at: new Date().toISOString(),
            })
            .eq("id", emailJob.id);
          
          skipped++;
          continue;
        }

        // Invocar edge function correspondente
        const functionName = `send-email-sequence-${emailJob.email_sequence_number}`;
        console.log(`[Process Queue] Invoking ${functionName}`);

        const { data: invokeResult, error: invokeError } = await supabase.functions.invoke(
          functionName,
          {
            body: { quizResponseId: emailJob.quiz_response_id },
          }
        );

        if (invokeError) {
          throw new Error(`Failed to invoke ${functionName}: ${invokeError.message}`);
        }

        console.log(`[Process Queue] ${functionName} invoked successfully:`, invokeResult);

        // Marcar como enviado
        await supabase
          .from("email_automation_queue")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
          })
          .eq("id", emailJob.id);

        processed++;
      } catch (emailError: any) {
        console.error(`[Process Queue] Error processing email ${emailJob.id}:`, emailError);
        
        // Marcar como falhado
        await supabase
          .from("email_automation_queue")
          .update({
            status: "failed",
            skip_reason: emailError.message,
            sent_at: new Date().toISOString(),
          })
          .eq("id", emailJob.id);
        
        failed++;
      }
    }

    console.log(`[Process Queue] Processing complete: ${processed} sent, ${skipped} skipped, ${failed} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        total: pendingEmails.length,
        processed,
        skipped,
        failed,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[Process Queue] Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);

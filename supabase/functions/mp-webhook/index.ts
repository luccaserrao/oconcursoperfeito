import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("MercadoPago Webhook received:", JSON.stringify(body, null, 2));

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Logar evento
    await supabaseClient
      .from("webhook_logs")
      .insert({
        event_type: body.type || "unknown",
        payload: body,
        processed: false
      });

    // Processar apenas eventos de pagamento
    if (body.type !== "payment") {
      console.log("Ignoring non-payment event:", body.type);
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      console.log("No payment ID in webhook");
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Buscar detalhes do pagamento
    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN not configured");
    }

    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    );

    if (!paymentResponse.ok) {
      throw new Error(`Failed to fetch payment: ${paymentResponse.statusText}`);
    }

    const payment = await paymentResponse.json();
    console.log("Payment details:", {
      id: payment.id,
      status: payment.status,
      external_reference: payment.external_reference
    });

    // Determinar status da ordem baseado no status do pagamento
    let orderStatus: string;
    switch (payment.status) {
      case "approved":
        orderStatus = "paid";
        break;
      case "rejected":
      case "cancelled":
        orderStatus = "rejected";
        break;
      case "pending":
      case "in_process":
        orderStatus = "pending";
        break;
      default:
        orderStatus = "pending";
    }

    // Buscar ordem pelo external_reference
    if (!payment.external_reference) {
      console.log("No external_reference, cannot update order");
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const { data: existingOrder } = await supabaseClient
      .from("orders")
      .select("*")
      .eq("id", payment.external_reference)
      .single();

    if (!existingOrder) {
      console.log("Order not found:", payment.external_reference);
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Idempotência: não atualizar se já está no mesmo status
    if (existingOrder.payment_status === orderStatus) {
      console.log("Order already in status:", orderStatus);
      
      await supabaseClient
        .from("webhook_logs")
        .update({ processed: true })
        .eq("payload->data->id", paymentId);

      return new Response(JSON.stringify({ received: true, already_processed: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Atualizar ordem
    const updateData: any = {
      payment_status: orderStatus,
      mercado_pago_payment_id: paymentId,
    };

    if (orderStatus === "paid") {
      updateData.paid_at = new Date().toISOString();
    }

    const { error: updateError } = await supabaseClient
      .from("orders")
      .update(updateData)
      .eq("id", payment.external_reference);

    if (updateError) {
      throw updateError;
    }

    console.log("Order updated successfully:", payment.external_reference);

    await supabaseClient
      .from("webhook_logs")
      .update({ processed: true })
      .eq("payload->data->id", paymentId);

    return new Response(JSON.stringify({ received: true, processed: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Webhook error:", error);
    
    try {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );
      
      await supabaseClient
        .from("webhook_logs")
        .insert({
          event_type: "error",
          payload: { error: error instanceof Error ? error.message : "Unknown error" },
          processed: false,
          error_message: error instanceof Error ? error.message : "Unknown error"
        });
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }

    return new Response(
      JSON.stringify({ error: "Webhook processing failed" }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

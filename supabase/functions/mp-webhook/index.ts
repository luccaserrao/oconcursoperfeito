import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // ========== LOG 1: WEBHOOK RECEBIDO ==========
  console.log("🔔 ========== WEBHOOK RECEBIDO ==========");
  console.log("📅 Timestamp:", new Date().toISOString());
  console.log("🌐 URL:", req.url);
  console.log("📨 Method:", req.method);
  console.log("📋 Headers:", JSON.stringify(Object.fromEntries(req.headers.entries()), null, 2));

  if (req.method === "OPTIONS") {
    console.log("✅ OPTIONS request - returning CORS headers");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // ========== LOG 2: PAYLOAD RECEBIDO ==========
    console.log("📦 ========== PAYLOAD RECEBIDO ==========");
    console.log(JSON.stringify(body, null, 2));
    console.log("🔖 Event Type:", body.type);
    console.log("🆔 Payment ID:", body.data?.id);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Logar evento no banco
    await supabaseClient
      .from("webhook_logs")
      .insert({
        event_type: body.type || "unknown",
        payload: body,
        processed: false
      });
    console.log("💾 Event logged to database");

    // Processar apenas eventos de pagamento
    if (body.type !== "payment") {
      console.log("⏭️ Ignoring non-payment event:", body.type);
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      console.log("⚠️ No payment ID in webhook");
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // ========== LOG 3: BUSCANDO DETALHES DO PAGAMENTO ==========
    console.log("🔍 ========== FETCHING PAYMENT DETAILS ==========");
    console.log("💳 Payment ID:", paymentId);
    
    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      console.error("❌ MERCADO_PAGO_ACCESS_TOKEN not configured");
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN not configured");
    }
    console.log("🔑 Access Token (first 20 chars):", accessToken.substring(0, 20) + "...");

    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      }
    );

    console.log("📡 Payment API Response Status:", paymentResponse.status);

    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      console.error("❌ Failed to fetch payment:", errorText);
      throw new Error(`Failed to fetch payment: ${paymentResponse.statusText}`);
    }

    const payment = await paymentResponse.json();
    
    // ========== LOG 4: DETALHES DO PAGAMENTO ==========
    console.log("💰 ========== PAYMENT DETAILS ==========");
    console.log("🆔 ID:", payment.id);
    console.log("📊 Status:", payment.status);
    console.log("💵 Amount:", payment.transaction_amount);
    console.log("🔗 External Reference:", payment.external_reference);
    console.log("📧 Payer Email:", payment.payer?.email);

    // Determinar status da ordem baseado no status do pagamento
    let orderStatus: string;
    switch (payment.status) {
      case "approved":
        orderStatus = "paid";
        console.log("✅ Payment APPROVED - marking as PAID");
        break;
      case "rejected":
      case "cancelled":
        orderStatus = "rejected";
        console.log("❌ Payment REJECTED/CANCELLED");
        break;
      case "pending":
      case "in_process":
        orderStatus = "pending";
        console.log("⏳ Payment PENDING/IN_PROCESS");
        break;
      default:
        orderStatus = "pending";
        console.log("❓ Unknown status, defaulting to PENDING");
    }

    // Buscar ordem pelo external_reference
    if (!payment.external_reference) {
      console.log("⚠️ No external_reference, cannot update order");
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    console.log("🔍 Searching for order:", payment.external_reference);

    const { data: existingOrder, error: fetchError } = await supabaseClient
      .from("orders")
      .select("*")
      .eq("id", payment.external_reference)
      .single();

    if (fetchError) {
      console.error("❌ Error fetching order:", fetchError);
    }

    if (!existingOrder) {
      console.log("❌ Order not found:", payment.external_reference);
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    console.log("✅ Order found:", existingOrder.id);
    console.log("📊 Current order status:", existingOrder.payment_status);

    // Idempotência: não atualizar se já está no mesmo status
    if (existingOrder.payment_status === orderStatus) {
      console.log("⏭️ Order already in status:", orderStatus);
      
      await supabaseClient
        .from("webhook_logs")
        .update({ processed: true })
        .eq("payload->data->id", paymentId);

      return new Response(JSON.stringify({ received: true, already_processed: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // ========== LOG 5: ATUALIZANDO ORDEM ==========
    console.log("🔄 ========== UPDATING ORDER ==========");
    console.log("🆔 Order ID:", payment.external_reference);
    console.log("📊 New Status:", orderStatus);

    const updateData: any = {
      payment_status: orderStatus,
      mercado_pago_payment_id: paymentId,
    };

    if (orderStatus === "paid") {
      updateData.paid_at = new Date().toISOString();
      console.log("✅ Setting paid_at:", updateData.paid_at);
    }

    const { error: updateError } = await supabaseClient
      .from("orders")
      .update(updateData)
      .eq("id", payment.external_reference);

    if (updateError) {
      console.error("❌ ========== ERROR UPDATING ORDER ==========");
      console.error(JSON.stringify(updateError, null, 2));
      throw updateError;
    }

    console.log("✅ ========== ORDER UPDATED SUCCESSFULLY ==========");
    console.log("🆔 Order ID:", payment.external_reference);
    console.log("📊 New Status:", orderStatus);

    await supabaseClient
      .from("webhook_logs")
      .update({ processed: true })
      .eq("payload->data->id", paymentId);

    console.log("🎉 ========== WEBHOOK PROCESSED SUCCESSFULLY ==========");

    return new Response(JSON.stringify({ received: true, processed: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("❌ ========== WEBHOOK ERROR ==========");
    console.error(error);
    
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

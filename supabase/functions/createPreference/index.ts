import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, userName, quizResponseId } = await req.json();
    console.log("Creating preference for:", { userEmail, userName });
    
    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN not configured");
    }

    // Importar createClient
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.57.2");

    // Criar cliente Supabase para criar ordem no banco
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Criar ordem pendente no banco ANTES de criar a preferência
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        user_email: userEmail,
        user_name: userName,
        quiz_response_id: quizResponseId || null,
        amount: 5000, // R$ 50,00 em centavos
        payment_status: "pending"
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw new Error('Failed to create order');
    }

    console.log('Order created:', order.id);

    const preferenceData = {
      items: [
        {
          title: "Pacote Completo - Carreira dos Sonhos",
          quantity: 1,
          unit_price: 50.00,
          currency_id: "BRL",
        }
      ],
      payer: {
        name: userName,
        email: userEmail,
      },
      back_urls: {
        success: `${req.headers.get("origin")}/paid-content?payment_id={payment_id}`,
        failure: `${req.headers.get("origin")}/?canceled=true`,
        pending: `${req.headers.get("origin")}/?pending=true`,
      },
      auto_return: "approved",
      external_reference: order.id, // Vincular ordem para rastreamento
      notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/mp-webhook`,
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferenceData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("MercadoPago API Error:", errorText);
      throw new Error(`MercadoPago API error: ${response.status}`);
    }

    const preference = await response.json();
    console.log("Preference created:", preference.id);

    return new Response(
      JSON.stringify({ 
        init_point: preference.init_point,
        preference_id: preference.id 
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating preference:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

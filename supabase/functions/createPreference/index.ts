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
    const { userEmail, userName } = await req.json();
    console.log("Creating preference for:", { userEmail, userName });
    
    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN not configured");
    }

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

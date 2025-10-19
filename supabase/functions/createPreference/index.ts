import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Schema de validação
    const requestSchema = z.object({
      userEmail: z.string().trim().email("Email inválido").max(255),
      userName: z.string().trim().min(2, "Nome muito curto").max(100, "Nome muito longo"),
      quizResponseId: z.string().uuid().optional().nullable(),
      product_id: z.string().uuid().optional().nullable(),
      amount: z.number().positive("Valor deve ser positivo").max(1000000, "Valor muito alto").optional().nullable()
    });

    const body = await req.json();
    
    // Validar entrada
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

    const { 
      userEmail, 
      userName, 
      quizResponseId,
      product_id,
      amount
    } = validationResult.data;

    console.log("Creating preference for:", { userEmail, userName, product_id, amount });
    
    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!accessToken) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN not configured");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Determinar produto e valor
    let productData: any = null;
    let finalAmount: number;
    let finalProductId: string | null = null;

    if (product_id) {
      const { data: product, error: productError } = await supabaseClient
        .from("products")
        .select("*")
        .eq("id", product_id)
        .eq("active", true)
        .single();

      if (productError || !product) {
        throw new Error("Product not found or inactive");
      }

      productData = product;
      finalAmount = product.price_cents / 100;
      finalProductId = product.id;
      
    } else if (amount) {
      finalAmount = amount;
      productData = {
        name: "Pagamento Teste",
        description: "Pagamento de teste"
      };
    } else {
      const { data: product, error: productError } = await supabaseClient
        .from("products")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: true })
        .limit(1)
        .single();

      if (productError || !product) {
        throw new Error("No product available");
      }

      productData = product;
      finalAmount = product.price_cents / 100;
      finalProductId = product.id;
    }

    // Create pending order
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        user_email: userEmail,
        user_name: userName,
        quiz_response_id: quizResponseId || null,
        product_id: finalProductId,
        amount: Math.round(finalAmount * 100),
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
          title: productData.name,
          description: productData.description || "",
          quantity: 1,
          unit_price: finalAmount,
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
      external_reference: order.id,
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

    // Atualizar ordem com preference_id
    await supabaseClient
      .from("orders")
      .update({ mp_preference_id: preference.id })
      .eq("id", order.id);

    return new Response(
      JSON.stringify({ 
        init_point: preference.init_point,
        sandbox_init_point: preference.sandbox_init_point,
        preference_id: preference.id,
        order_id: order.id
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

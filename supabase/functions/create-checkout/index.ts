import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
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
    const { userEmail, userName, quizResponseId } = await req.json();
    
    if (!userEmail || !userName) {
      throw new Error("Email and name are required");
    }

    console.log("Creating checkout for:", { userEmail, userName, quizResponseId });

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: userEmail, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Found existing customer:", customerId);
    } else {
      console.log("Creating new customer");
    }

    // Create pending order
    const { data: order, error: orderError } = await supabaseClient
      .from("orders")
      .insert({
        user_email: userEmail,
        user_name: userName,
        quiz_response_id: quizResponseId,
        payment_status: "pending",
        amount: 4800,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      throw orderError;
    }

    console.log("Order created:", order.id);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : userEmail,
      line_items: [
        {
          price: "price_1SJUSC9xNArKjLhda2etWieS",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/paid-content?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      metadata: {
        order_id: order.id,
        user_email: userEmail,
      },
    });

    // Update order with session ID
    await supabaseClient
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    console.log("Checkout session created:", session.id);

    return new Response(JSON.stringify({ url: session.url, orderId: order.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in create-checkout:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

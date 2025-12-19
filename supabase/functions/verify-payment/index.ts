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
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    console.log("Verifying payment for session:", sessionId);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Session payment status:", session.payment_status);

    if (session.payment_status === "paid") {
      // Update order status
      const { data: order, error: updateError } = await supabaseClient
        .from("orders")
        .update({
          payment_status: "paid",
          paid_at: new Date().toISOString(),
        })
        .eq("stripe_session_id", sessionId)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating order:", updateError);
        throw updateError;
      }

      console.log("Order updated to paid:", order.id);

      // Get quiz response with recommendation
      const { data: quizResponse, error: quizError } = await supabaseClient
        .from("quiz_responses")
        .select("*")
        .eq("id", order.quiz_response_id)
        .single();

      if (quizError) {
        console.error("Error fetching quiz response:", quizError);
        throw quizError;
      }

      return new Response(
        JSON.stringify({
          paid: true,
          order,
          recommendation: quizResponse.riasec_json || quizResponse.ai_recommendation,
          userName: (quizResponse as any).user_name || (quizResponse as any).name,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({ paid: false }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in verify-payment:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

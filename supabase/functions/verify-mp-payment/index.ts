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
      paymentId: z.string().min(1, "Payment ID obrigatório").max(255)
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

    const { paymentId } = validationResult.data;

    console.log("Verifying Mercado Pago payment:", paymentId);

    // Buscar informações do pagamento na API do Mercado Pago
    const mpAccessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    if (!mpAccessToken) {
      throw new Error("Mercado Pago access token not configured");
    }

    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          "Authorization": `Bearer ${mpAccessToken}`,
        },
      }
    );

    if (!paymentResponse.ok) {
      throw new Error(`Failed to fetch payment: ${paymentResponse.statusText}`);
    }

    const payment = await paymentResponse.json();
    console.log("Payment status:", payment.status);

    // Verificar se o pagamento foi aprovado
    if (payment.status !== "approved") {
      return new Response(
        JSON.stringify({ 
          error: "Payment not approved",
          status: payment.status 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Criar cliente Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Buscar a ordem pelo external_reference (order_id) ou criar uma nova
    let order;
    
    if (payment.external_reference) {
      // Tentar buscar ordem existente
      const { data: existingOrder } = await supabaseClient
        .from("orders")
        .select("*")
        .eq("id", payment.external_reference)
        .single();

      if (existingOrder) {
        // Atualizar ordem existente
        const { data: updatedOrder, error: updateError } = await supabaseClient
          .from("orders")
          .update({
            payment_status: "paid",
            paid_at: new Date().toISOString(),
            mercado_pago_payment_id: paymentId,
          })
          .eq("id", payment.external_reference)
          .select()
          .single();

        if (updateError) throw updateError;
        order = updatedOrder;
      }
    }

    // Se não encontrou ordem, criar uma nova (fallback)
    if (!order) {
      const { data: newOrder, error: insertError } = await supabaseClient
        .from("orders")
        .insert({
          user_email: payment.payer.email,
          user_name: payment.payer.first_name || "Cliente",
          amount: payment.transaction_amount * 100, // Converter para centavos
          payment_status: "paid",
          paid_at: new Date().toISOString(),
          mercado_pago_payment_id: paymentId,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      order = newOrder;
    }

    console.log("Order updated/created:", order.id);

    // Buscar dados da resposta do quiz se existir
    let quizResponse = null;
    if (order.quiz_response_id) {
      const { data } = await supabaseClient
        .from("quiz_responses")
        .select("*")
        .eq("id", order.quiz_response_id)
        .single();
      
      quizResponse = data;
    }

    // Retornar dados do conteúdo pago
    return new Response(
      JSON.stringify({
        success: true,
        userName: order.user_name,
        userEmail: order.user_email,
        recommendation: quizResponse?.ai_recommendation,
        paidContent: {
          studyPlan: {
            days: ["Dia 1-5: Fundamentos", "Dia 6-10: Prática", "Dia 11-15: Aprofundamento", "Dia 16-20: Simulados", "Dia 21-25: Revisão", "Dia 26-30: Preparação final"],
            hoursPerDay: "4-6 horas",
            focus: "Disciplinas principais e simulados"
          },
          alternativeCareers: [
            {
              name: "Carreira Alternativa 1",
              reason: "Compatível com seu perfil",
              salary: "R$ 8.000 - R$ 15.000"
            },
            {
              name: "Carreira Alternativa 2",
              reason: "Boa opção de backup",
              salary: "R$ 6.000 - R$ 12.000"
            }
          ],
          studyRoadmap: "Roteiro detalhado de estudo personalizado",
          freeMaterials: [
            "Apostilas em PDF",
            "Videoaulas selecionadas",
            "Mapas mentais"
          ],
          whatsappGroupInfo: "Entre em contato pelo WhatsApp para receber seu Pacote Completo de Preparação",
          whatsappSupportNumber: "5591984233672"
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

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
    // Verificar autenticação
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: corsHeaders }
      );
    }

    const supabaseClient = await import("https://esm.sh/@supabase/supabase-js@2.57.2").then(mod => mod.createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    ));

    // Verificar token e obter usuário
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: corsHeaders }
      );
    }

    // Verificar role de admin
    const { data: isAdmin } = await supabaseClient.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: corsHeaders }
      );
    }

    const accessToken = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN");
    const publicKey = Deno.env.get("MERCADO_PAGO_PUBLIC_KEY");

    const missing: string[] = [];
    if (!accessToken) missing.push("MERCADO_PAGO_ACCESS_TOKEN");

    return new Response(
      JSON.stringify({
        ok: missing.length === 0,
        missing,
        hasPublicKey: !!publicKey
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error checking credentials:", error);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🔍 list-users function called');

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const authHeader = req.headers.get('Authorization');

    if (!authHeader) {
      console.log('❌ No authorization header');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create client with service role for admin operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    // Verify user authentication
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      console.log('❌ Invalid token or user not found:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ User authenticated:', user.id);

    // Check if user has admin role
    const { data: isAdmin, error: roleError } = await supabaseAdmin.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError || !isAdmin) {
      console.log('❌ User is not admin:', roleError);
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ User is admin, fetching quiz responses');

    // Fetch quiz responses
    const { data: responses, error: queryError } = await supabaseAdmin
      .from('quiz_responses')
      .select('name, email, whatsapp, ai_recommendation, answers, created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    if (queryError) {
      console.error('❌ Error fetching quiz responses:', queryError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch users' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`✅ Fetched ${responses?.length || 0} quiz responses`);

    // Function to check if user is a qualified lead (Hot Lead)
    const isQualifiedLead = (answers: any[]) => {
      if (!answers || answers.length === 0) {
        return { isQualified: false, score: 0 };
      }

      const q18 = answers.find(a => a.question?.includes("Inteligência Artificial"))?.answer;
      const q19 = answers.find(a => a.question?.includes("preparação hoje"))?.answer;
      const q20 = answers.find(a => a.question?.includes("guia personalizado"))?.answer;
      
      const q18Valid = q18 === "Sim, já sabia disso" || q18 === "Não sabia, mas faz sentido";
      const q19Valid = q19 === "Estou começando agora e me sinto perdido" || 
                       q19 === "Já estudo há um tempo, mas sem direção clara";
      const q20Valid = q20 === "Investiria agora para aumentar minhas chances" || 
                       q20 === "Gostaria de saber mais antes de decidir";
      
      const score = [q18Valid, q19Valid, q20Valid].filter(Boolean).length;
      return { 
        isQualified: q18Valid && q19Valid && q20Valid,
        score
      };
    };

    // Process responses to extract careerName from ai_recommendation
    const users = responses?.map(response => {
      const qualification = isQualifiedLead(response.answers || []);
      return {
        name: response.name,
        email: response.email,
        whatsapp: response.whatsapp,
        careerName: (response.ai_recommendation as any)?.careerName || 'N/A',
        created_at: response.created_at,
        isQualified: qualification.isQualified,
        qualificationScore: qualification.score
      };
    }) || [];

    return new Response(
      JSON.stringify({ users }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

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
    const { email } = await req.json();
    
    console.log('Tracking upsell click for:', email);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Buscar o registro mais recente deste email
    const { data: responses, error: fetchError } = await supabase
      .from('quiz_responses')
      .select('id')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      throw fetchError;
    }

    if (!responses || responses.length === 0) {
      throw new Error('No quiz response found for this email');
    }

    const responseId = responses[0].id;

    // Atualizar com click do upsell
    const { error: updateError } = await supabase
      .from('quiz_responses')
      .update({
        clicked_upsell: true,
        upsell_clicked_at: new Date().toISOString(),
      })
      .eq('id', responseId);

    if (updateError) {
      console.error('Update error:', updateError);
      throw updateError;
    }

    console.log('Successfully tracked upsell click for:', email);

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in track-upsell-click:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

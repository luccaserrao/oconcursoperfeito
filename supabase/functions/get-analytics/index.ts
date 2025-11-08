import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Verificar autenticação de admin
    const authHeader = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(authHeader);
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Usuário não encontrado' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: isAdmin } = await supabaseClient.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Acesso negado' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { days } = await req.json().catch(() => ({ days: 30 }));

    // Buscar estatísticas de cache
    const { data: cacheData, error: cacheError } = await supabaseClient
      .from('quiz_cache')
      .select('*');

    if (cacheError) throw cacheError;

    // Buscar total de respostas
    const { data: responsesData, error: responsesError } = await supabaseClient
      .from('quiz_responses')
      .select('created_at')
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString());

    if (responsesError) throw responsesError;

    // Calcular estatísticas
    const totalCacheHits = cacheData.reduce((sum, item) => sum + (item.hit_count || 0), 0);
    const totalResponses = responsesData.length;
    const totalCacheEntries = cacheData.length;
    const totalGenerations = totalCacheEntries + totalCacheHits;
    
    const cacheHitRate = totalGenerations > 0 
      ? ((totalCacheHits / totalGenerations) * 100).toFixed(2) 
      : "0.00";
    
    // Custo por geração: 1 crédito
    const creditsUsed = totalCacheEntries; // Apenas gerações novas custam créditos
    const creditsSaved = totalCacheHits; // Hits de cache economizam créditos
    const totalPotentialCredits = totalGenerations;
    
    // Economias em %
    const savingsPercent = totalPotentialCredits > 0 
      ? ((creditsSaved / totalPotentialCredits) * 100).toFixed(2)
      : "0.00";

    // Agrupar respostas por dia
    const dailyStats = responsesData.reduce((acc: any, response: any) => {
      const date = new Date(response.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const dailyData = Object.entries(dailyStats)
      .map(([date, count]) => ({ date, completions: count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Estatísticas de cache por entrada
    const cacheStats = cacheData.map(item => ({
      id: item.id,
      hits: item.hit_count,
      created: item.created_at,
      lastUsed: item.last_used_at,
      daysSinceCreation: Math.floor((Date.now() - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24)),
    })).sort((a, b) => b.hits - a.hits);

    console.log('[Analytics] Stats generated:', {
      totalResponses,
      cacheHitRate,
      creditsUsed,
      creditsSaved,
    });

    return new Response(
      JSON.stringify({
        summary: {
          totalResponses,
          totalCacheEntries,
          totalCacheHits,
          cacheHitRate: parseFloat(cacheHitRate),
          creditsUsed,
          creditsSaved,
          savingsPercent: parseFloat(savingsPercent),
          totalGenerations,
        },
        dailyData,
        cacheStats: cacheStats.slice(0, 10), // Top 10 mais usados
        period: days,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[Analytics] Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Erro desconhecido' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

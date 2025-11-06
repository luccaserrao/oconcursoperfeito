import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Função para gerar hash SHA-256 das respostas
async function generateAnswersHash(answers: any[]): Promise<string> {
  // Ordenar respostas para garantir hash consistente
  const sortedAnswers = [...answers].sort((a, b) => 
    a.question.localeCompare(b.question)
  );
  
  const answersString = JSON.stringify(sortedAnswers);
  const encoder = new TextEncoder();
  const data = encoder.encode(answersString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Schema de validação
    const requestSchema = z.object({
      name: z.string().trim().min(2, "Nome muito curto").max(100, "Nome muito longo"),
      email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
      whatsapp: z.string().optional(),
      answers: z.array(z.object({
        question: z.string().max(500),
        answer: z.string().max(1000)
      })).min(1, "Pelo menos uma resposta necessária").max(30, "Muitas respostas")
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

    const { name, email, whatsapp, answers } = validationResult.data;
    
    console.log('Generating career recommendation for:', email);

    // Inicializar Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Gerar hash das respostas para cache
    const answersHash = await generateAnswersHash(answers);
    console.log('Answers hash:', answersHash);

    // Verificar cache (30 dias de validade)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: cachedRecommendation, error: cacheError } = await supabase
      .from('quiz_cache')
      .select('*')
      .eq('answers_hash', answersHash)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .single();

    let recommendation;
    let fromCache = false;

    if (cachedRecommendation && !cacheError) {
      // Cache hit! Usar recomendação existente
      console.log('Cache HIT for hash:', answersHash);
      recommendation = cachedRecommendation.recommendation;
      fromCache = true;

      // Atualizar estatísticas do cache
      await supabase
        .from('quiz_cache')
        .update({
          hit_count: cachedRecommendation.hit_count + 1,
          last_used_at: new Date().toISOString()
        })
        .eq('id', cachedRecommendation.id);
    } else {
      // Cache miss - gerar nova recomendação
      console.log('Cache MISS for hash:', answersHash);

      const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
      if (!LOVABLE_API_KEY) {
        throw new Error('LOVABLE_API_KEY not configured');
      }

      // Construir prompt com as respostas
      const answersText = answers.map((a: any, i: number) => 
        `Pergunta ${i + 1}: ${a.question}\nResposta: ${a.answer}`
      ).join('\n\n');

      const systemPrompt = `Você é um especialista em concursos públicos no Brasil e psicólogo vocacional especializado na metodologia RIASEC (Holland).
Com base nas respostas do quiz, você deve:
1. Analisar o perfil RIASEC da pessoa
2. Recomendar a carreira em concurso público PERFEITA para o perfil

METODOLOGIA RIASEC (Holland):
- Realista (R): Práticas, objetivas, preferem trabalho manual/técnico, gostam de mecânica, construção, agricultura
- Investigativo (I): Analíticas, curiosas, gostam de pesquisar, resolver problemas complexos, ciências
- Artístico (A): Criativas, expressivas, gostam de arte, design, música, escrita
- Social (S): Empáticas, comunicativas, gostam de ajudar pessoas, ensinar, aconselhar
- Empreendedor (E): Persuasivas, líderes, gostam de vender, negociar, gerenciar projetos
- Convencional (C): Organizadas, detalhistas, gostam de dados, administração, seguir procedimentos

Sua resposta deve ser um JSON com esta estrutura EXATA:
{
  "careerName": "Nome do cargo/carreira",
  "justification": "Explicação CURTA de 1 parágrafo (máximo 100 palavras) de por que esta carreira combina",
  "salary": "Faixa salarial detalhada (inicial e com progressão)",
  "examDate": "Data da prova - use um dos formatos: Se houver edital aberto: 'Prova em DD/MM/AAAA (inscrições até DD/MM/AAAA)' | Se houver previsão confirmada: 'Previsto para mês/ano conforme [fonte]' | Se não houver edital: 'Sem edital aberto. Últimos concursos: ano1, ano2, ano3. Previsão: [análise baseada no histórico e intervalo médio]'",
  "workplaces": ["Local 1 com estado/município", "Local 2 com estado/município", "Local 3 com estado/município"],
  "workRoutine": "Descrição breve da rotina de trabalho (2-3 frases)",
  "subjects": ["Lista de 5-8 principais matérias para estudar"],
  "examFrequency": "Análise detalhada: Liste os últimos 3-5 concursos com anos | Calcule o intervalo médio entre editais | Indique se há previsão oficial ou rumores de novo edital. Exemplo: 'Últimos concursos: 2019 (Cespe), 2021 (FCC), 2023 (Vunesp). Intervalo médio: 2 anos. Governo anunciou novo edital para 2025 no planejamento orçamentário.'",
  "riasec": {
    "top1": "Código RIASEC dominante (ex: Realista, Investigativo, Social, etc)",
    "top2": "Código RIASEC secundário",
    "scores": {
      "Realista": 0-100,
      "Investigativo": 0-100,
      "Artístico": 0-100,
      "Social": 0-100,
      "Empreendedor": 0-100,
      "Convencional": 0-100
    },
    "habilidades": ["lista de 5 habilidades principais baseadas no perfil RIASEC"],
    "habilidade_destaque": "adjetivo que melhor descreve a pessoa (ex: práticas e objetivas, analíticas e curiosas)",
    "contexto_profissional": "onde a pessoa se destaca profissionalmente (ex: resolver problemas complexos, ajudar pessoas)"
  }
}

IMPORTANTE: 
- Seja específico com nomes reais de cargos brasileiros
- Salários devem ser realistas (R$)
- Matérias devem ser específicas do cargo
- Justificativa deve ser CURTA mas persuasiva (máximo 100 palavras)
- workplaces deve conter 3 locais específicos com estado/município
- workRoutine deve descrever como é o dia a dia no trabalho

CRÍTICO - examDate DEVE SER DETALHADO E FUNDAMENTADO:
  ✅ BOM: "Sem edital aberto. Últimos concursos: 2018, 2021, 2024. Padrão trienal. Próximo esperado para 2027 segundo PPA do governo."
  ✅ BOM: "Prova em 15/03/2025 (inscrições até 20/01/2025)"
  ❌ RUIM: "Em breve"
  ❌ RUIM: "Previsão para 2025"
  
- examFrequency DEVE incluir análise histórica real com anos, bancas e intervalos calculados
- NUNCA use termos genéricos como "Em breve" ou "Frequência moderada" sem dados concretos

CRÍTICO - ANÁLISE RIASEC:
- Analise cuidadosamente as respostas para identificar os 2 tipos RIASEC dominantes
- Os scores devem somar aproximadamente 300-400 (não 600)
- top1 e top2 devem ser os códigos com maiores scores
- habilidades devem ser específicas e baseadas nos códigos RIASEC identificados
- habilidade_destaque e contexto_profissional devem refletir a combinação dos 2 tipos dominantes`;

      const userPrompt = `Perfil do candidato:
Nome: ${name}

Respostas do quiz:
${answersText}

TAREFA:
1. Analise cuidadosamente as respostas acima
2. Identifique os 2 tipos RIASEC dominantes baseado nas preferências demonstradas
3. Calcule os scores para cada dimensão RIASEC (0-100)
4. Liste as 5 principais habilidades baseadas no perfil RIASEC
5. Recomende a carreira em concurso público IDEAL que combine com este perfil RIASEC

Retorne APENAS o JSON conforme o formato especificado, incluindo o objeto "riasec" completo.`;

      // Chamar a IA
      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.8,
        }),
      });

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('AI API error:', aiResponse.status, errorText);
        throw new Error(`AI API error: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      const aiContent = aiData.choices[0].message.content;
      
      console.log('AI raw response:', aiContent);

      // Parse JSON da resposta da IA
      try {
        // Remove markdown code blocks se houver
        const cleanContent = aiContent.replace(/```json\n?|\n?```/g, '').trim();
        recommendation = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error('Failed to parse AI response:', aiContent);
        throw new Error('Invalid AI response format');
      }

      // Salvar no cache
      const { error: cacheInsertError } = await supabase
        .from('quiz_cache')
        .insert({
          answers_hash: answersHash,
          recommendation: recommendation
        });

      if (cacheInsertError) {
        console.error('Failed to cache recommendation:', cacheInsertError);
        // Não falhar a requisição se o cache falhar
      } else {
        console.log('Recommendation cached successfully');
      }
    }

    const { data: savedResponse, error: dbError } = await supabase
      .from('quiz_responses')
      .insert({
        name,
        email,
        whatsapp,
        answers,
        ai_recommendation: recommendation,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    console.log('Successfully saved recommendation for:', email, fromCache ? '(from cache)' : '(generated)');

    return new Response(
      JSON.stringify({ 
        recommendation,
        quizResponseId: savedResponse.id,
        cached: fromCache
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in generate-career-recommendation:', error);
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

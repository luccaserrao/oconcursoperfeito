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
    const { answers, name, email } = await req.json();
    
    console.log('Generating career recommendation for:', email);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Construir prompt com as respostas
    const answersText = answers.map((a: any, i: number) => 
      `Pergunta ${i + 1}: ${a.question}\nResposta: ${a.answer}`
    ).join('\n\n');

    const systemPrompt = `Você é um especialista em concursos públicos no Brasil. Com base nas respostas do quiz, 
você deve recomendar a carreira em concurso público PERFEITA para o perfil da pessoa.

Sua resposta deve ser um JSON com esta estrutura EXATA:
{
  "careerName": "Nome do cargo/carreira",
  "justification": "Explicação CURTA de 1 parágrafo (máximo 100 palavras) de por que esta carreira combina",
  "salary": "Faixa salarial detalhada (inicial e com progressão)",
  "examDate": "Próxima data aproximada de concurso ou 'Em breve' ou 'Aberto até DD/MM/AAAA'",
  "workplaces": ["Local 1 com estado/município", "Local 2 com estado/município", "Local 3 com estado/município"],
  "workRoutine": "Descrição breve da rotina de trabalho (2-3 frases)",
  "subjects": ["Lista de 5-8 principais matérias para estudar"],
  "examFrequency": "Quando costumam abrir concursos (frequência e últimos editais)"
}

IMPORTANTE: 
- Seja específico com nomes reais de cargos brasileiros
- Salários devem ser realistas (R$)
- Matérias devem ser específicas do cargo
- Justificativa deve ser CURTA mas persuasiva (máximo 100 palavras)
- workplaces deve conter 3 locais específicos com estado/município
- examDate deve ser uma data real ou aproximada
- workRoutine deve descrever como é o dia a dia no trabalho`;

    const userPrompt = `Perfil do candidato:
Nome: ${name}

Respostas do quiz:
${answersText}

Com base nestas respostas, qual é a carreira em concurso público IDEAL para este perfil? 
Retorne APENAS o JSON conforme o formato especificado.`;

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
    let recommendation;
    try {
      // Remove markdown code blocks se houver
      const cleanContent = aiContent.replace(/```json\n?|\n?```/g, '').trim();
      recommendation = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      throw new Error('Invalid AI response format');
    }

    // Salvar no banco
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: savedResponse, error: dbError } = await supabase
      .from('quiz_responses')
      .insert({
        name,
        email,
        answers,
        ai_recommendation: recommendation,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    console.log('Successfully saved recommendation for:', email);

    return new Response(
      JSON.stringify({ 
        recommendation,
        quizResponseId: savedResponse.id 
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

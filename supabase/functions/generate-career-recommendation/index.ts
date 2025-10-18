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
  "justification": "Explicação de 2-3 parágrafos de por que esta carreira é perfeita para o perfil (use persuasão e mostre valor)",
  "salary": "Faixa salarial detalhada (inicial e com progressão)",
  "workplace": "Onde trabalha - DEVE INCLUIR estado/município específico (ex: 'Tribunais de Justiça em São Paulo, SP' ou 'Secretaria de Fazenda do Estado de Minas Gerais')",
  "subjects": ["Lista de 5-8 principais matérias para estudar"],
  "examFrequency": "Quando costumam abrir concursos (frequência e últimos editais)",
  "studyPlan": {
    "weeks": ["Semana 1: ...", "Semana 2: ...", "Semana 3: ...", "Semana 4: ..."],
    "hoursPerWeek": "20-25 horas",
    "focus": "Principais pontos de foco inicial"
  },
  "alternativeCareers": [
    {
      "name": "Carreira 1",
      "reason": "Por que também combina",
      "salary": "Faixa salarial"
    },
    {
      "name": "Carreira 2",
      "reason": "Por que também combina",
      "salary": "Faixa salarial"
    },
    {
      "name": "Carreira 3",
      "reason": "Por que também combina",
      "salary": "Faixa salarial"
    },
    {
      "name": "Carreira 4",
      "reason": "Por que também combina",
      "salary": "Faixa salarial"
    },
    {
      "name": "Carreira 5",
      "reason": "Por que também combina",
      "salary": "Faixa salarial"
    }
  ]
}

IMPORTANTE: 
- Seja específico com nomes reais de cargos brasileiros
- Salários devem ser realistas (R$)
- Matérias devem ser específicas do cargo
- Cronograma deve ser prático e motivador
- Justificativa deve ser personalizada e persuasiva
- NO CAMPO WORKPLACE, SEMPRE inclua o estado ou município específico onde o cargo é exercido`;

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

    const { error: dbError } = await supabase
      .from('quiz_responses')
      .insert({
        name,
        email,
        answers,
        ai_recommendation: recommendation,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    console.log('Successfully saved recommendation for:', email);

    return new Response(
      JSON.stringify({ recommendation }),
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

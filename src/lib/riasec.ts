import { QuizQuestion, RiasecResult, RiasecScores, RiasecType } from "@/types/quiz";

// Likert simétrico para captar intensidade (discordo reduz evidência, concordo aumenta)
const LIKERT_WEIGHT_MAP: Record<string, number> = {
  "Discordo totalmente": -2,
  "Discordo": -1,
  "Neutro": 0,
  "Concordo": 1,
  "Concordo totalmente": 2,
};

// Perguntas mais diagnósticas recebem peso ligeiramente maior
const QUESTION_WEIGHTS: Record<string, number> = {
  // Realista
  riasec_r1: 1.1,
  riasec_r4: 1.15,
  // Investigativo
  riasec_i1: 1.1,
  riasec_i5: 1.15,
  // Artístico
  riasec_a2: 1.1,
  riasec_a3: 1.15,
  // Social
  riasec_s1: 1.1,
  riasec_s4: 1.1,
  // Empreendedor
  riasec_e1: 1.1,
  riasec_e4: 1.15,
  // Convencional
  riasec_c1: 1.1,
  riasec_c3: 1.15,
};

const TRAIT_LIBRARY: Record<RiasecType, { strengths: string[]; environment: string; tagline: string }> = {
  Realista: {
    strengths: ["prático", "mão na massa", "orientado a resultados", "persistente"],
    environment: "ambientes concretos, com processos claros e entregas visíveis",
    tagline: "execução prática e objetiva",
  },
  Investigativo: {
    strengths: ["analítico", "curioso", "metódico", "gosta de dados"],
    environment: "contextos que exigem análise, investigação e entendimento de causas",
    tagline: "profundidade analítica",
  },
  Artístico: {
    strengths: ["criativo", "original", "expressivo", "pensamento divergente"],
    environment: "espaços com liberdade de criação, design ou expressão",
    tagline: "criatividade aplicada",
  },
  Social: {
    strengths: ["empático", "comunicativo", "facilitador", "orientado a pessoas"],
    environment: "times colaborativos, ensino, cuidado ou orientação",
    tagline: "conexão e impacto em pessoas",
  },
  Empreendedor: {
    strengths: ["liderança", "persuasivo", "decisor", "foco em resultados"],
    environment: "cenários com metas, influência, visão de futuro e tomada de risco calculado",
    tagline: "liderança estratégica",
  },
  Convencional: {
    strengths: ["organizado", "detalhista", "sistemático", "consistente"],
    environment: "operações estruturadas, rotinas claras e controle de qualidade",
    tagline: "organização e consistência",
  },
};

type ScoreAccumulator = {
  raw: number;
  max: number;
  min: number;
  strongSignals: number;
  positiveSignals: number;
  weightSum: number;
};

const createAccumulator = (): Record<RiasecType, ScoreAccumulator> => ({
  Realista: { raw: 0, max: 0, min: 0, strongSignals: 0, positiveSignals: 0, weightSum: 0 },
  Investigativo: { raw: 0, max: 0, min: 0, strongSignals: 0, positiveSignals: 0, weightSum: 0 },
  Artístico: { raw: 0, max: 0, min: 0, strongSignals: 0, positiveSignals: 0, weightSum: 0 },
  Social: { raw: 0, max: 0, min: 0, strongSignals: 0, positiveSignals: 0, weightSum: 0 },
  Empreendedor: { raw: 0, max: 0, min: 0, strongSignals: 0, positiveSignals: 0, weightSum: 0 },
  Convencional: { raw: 0, max: 0, min: 0, strongSignals: 0, positiveSignals: 0, weightSum: 0 },
});

const normalizeScore = (raw: number, min: number, max: number) => {
  const safeRange = Math.max(max - min, 1);
  return Math.round(((raw - min) / safeRange) * 100);
};

const buildDescription = (
  top1: RiasecType,
  top2: RiasecType,
  scores: RiasecScores,
  signals: Record<RiasecType, { strong: number; positive: number }>
) => {
  const diff = Math.abs(scores[top1] - scores[top2]);
  const hybrid = diff <= 8;
  const base = hybrid
    ? `Perfil híbrido entre ${top1} e ${top2} (diferença de apenas ${diff} pontos)`
    : `Predominância ${top1} com suporte ${top2} (diferença de ${diff} pontos)`;

  const signalInfo = `${signals[top1].strong} respostas de alta concordância em ${top1} e ${signals[top2].strong} em ${top2}`;

  const env = `${TRAIT_LIBRARY[top1].environment} com influência ${top2.toLowerCase()}`;
  return `${base}. Você mostrou ${signalInfo}, indicando preferência por ${env}.`;
};

export const calculateRiasecScores = (
  answers: Record<string, string>,
  questions: QuizQuestion[]
): RiasecResult => {
  const accumulator = createAccumulator();

  questions.forEach((question) => {
    if (question.type !== "likert" || !question.riasecType) return;

    const answer = answers[question.id];
    const answerValue = LIKERT_WEIGHT_MAP[answer];
    const weight = QUESTION_WEIGHTS[question.id] ?? 1;

    // Sempre somamos limites para normalizar considerando apenas perguntas respondidas
    accumulator[question.riasecType].max += 2 * weight;
    accumulator[question.riasecType].min -= 2 * weight;
    accumulator[question.riasecType].weightSum += weight;

    if (typeof answerValue !== "number") return;

    const contribution = answerValue * weight;
    accumulator[question.riasecType].raw += contribution;

    if (answerValue >= 1) accumulator[question.riasecType].positiveSignals += 1;
    if (answerValue >= 2) accumulator[question.riasecType].strongSignals += 1;
  });

  const normalizedScores = Object.entries(accumulator).reduce((acc, [type, data]) => {
    const normalized = normalizeScore(data.raw, data.min, data.max);
    acc[type as RiasecType] = normalized;
    return acc;
  }, {} as RiasecScores);

  // Ordena por score, desempata por densidade de sinais fortes/positivos
  const ranking = Object.entries(normalizedScores).sort(([typeA, scoreA], [typeB, scoreB]) => {
    if (scoreA !== scoreB) return scoreB - scoreA;

    const signalsA = accumulator[typeA as RiasecType];
    const signalsB = accumulator[typeB as RiasecType];
    const densityA = signalsA.strongSignals * 2 + signalsA.positiveSignals;
    const densityB = signalsB.strongSignals * 2 + signalsB.positiveSignals;
    return densityB - densityA;
  });

  const [top1, top2] = ranking.slice(0, 2).map(([type]) => type as RiasecType);

  const habilidades = Array.from(
    new Set([
      TRAIT_LIBRARY[top1].strengths[0],
      TRAIT_LIBRARY[top1].strengths[1],
      TRAIT_LIBRARY[top2].strengths[0],
      "perfil alinhado às respostas mais fortes",
    ])
  );

  const signals: Record<RiasecType, { strong: number; positive: number }> = {
    Realista: { strong: accumulator.Realista.strongSignals, positive: accumulator.Realista.positiveSignals },
    Investigativo: { strong: accumulator.Investigativo.strongSignals, positive: accumulator.Investigativo.positiveSignals },
    Artístico: { strong: accumulator.Artístico.strongSignals, positive: accumulator.Artístico.positiveSignals },
    Social: { strong: accumulator.Social.strongSignals, positive: accumulator.Social.positiveSignals },
    Empreendedor: { strong: accumulator.Empreendedor.strongSignals, positive: accumulator.Empreendedor.positiveSignals },
    Convencional: { strong: accumulator.Convencional.strongSignals, positive: accumulator.Convencional.positiveSignals },
  };

  const descricao_personalizada = buildDescription(top1, top2, normalizedScores, signals);

  return {
    top1,
    top2,
    scores: normalizedScores,
    habilidades,
    habilidade_destaque: `${TRAIT_LIBRARY[top1].tagline} com apoio ${TRAIT_LIBRARY[top2].tagline}`,
    contexto_profissional: `${TRAIT_LIBRARY[top1].environment} complementado por ${TRAIT_LIBRARY[top2].environment}`,
    descricao_personalizada,
  };
};

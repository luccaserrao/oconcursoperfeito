import { QuizQuestion } from "@/types/quiz";

export type MultipleIntelligenceType =
  | "Linguistica"
  | "LogicoMatematica"
  | "Espacial"
  | "Musical"
  | "CorporalCinestesica"
  | "Interpessoal"
  | "Intrapessoal"
  | "Naturalista";

export const MULTIPLE_INTELLIGENCE_LABELS: Record<MultipleIntelligenceType, string> = {
  Linguistica: "Linguistica",
  LogicoMatematica: "Logico-matematica",
  Espacial: "Espacial",
  Musical: "Musical",
  CorporalCinestesica: "Corporal-cinestesica",
  Interpessoal: "Interpessoal",
  Intrapessoal: "Intrapessoal",
  Naturalista: "Naturalista",
};

export type MultipleIntelligenceQuestion = QuizQuestion & {
  miType?: MultipleIntelligenceType;
};

type ScoreAccumulator = {
  raw: number;
  min: number;
  max: number;
};

const LIKERT_WEIGHT_MAP: Record<string, number> = {
  "Discordo totalmente": -2,
  Discordo: -1,
  Neutro: 0,
  Concordo: 1,
  "Concordo totalmente": 2,
};

const createAccumulator = (): Record<MultipleIntelligenceType, ScoreAccumulator> => ({
  Linguistica: { raw: 0, min: 0, max: 0 },
  LogicoMatematica: { raw: 0, min: 0, max: 0 },
  Espacial: { raw: 0, min: 0, max: 0 },
  Musical: { raw: 0, min: 0, max: 0 },
  CorporalCinestesica: { raw: 0, min: 0, max: 0 },
  Interpessoal: { raw: 0, min: 0, max: 0 },
  Intrapessoal: { raw: 0, min: 0, max: 0 },
  Naturalista: { raw: 0, min: 0, max: 0 },
});

const normalizeScore = (raw: number, min: number, max: number) => {
  const safeRange = Math.max(max - min, 1);
  return Math.round(((raw - min) / safeRange) * 100);
};

export type MultipleIntelligenceResult = {
  scores: Record<MultipleIntelligenceType, number>;
  top1: MultipleIntelligenceType;
  top2: MultipleIntelligenceType;
  ordered: MultipleIntelligenceType[];
};

export const calculateMultipleIntelligences = (
  answers: Record<string, string>,
  questions: MultipleIntelligenceQuestion[],
): MultipleIntelligenceResult => {
  const accumulator = createAccumulator();

  questions.forEach((question) => {
    if (question.type !== "likert" || !question.miType) return;

    const weight = 1;
    accumulator[question.miType].min -= 2 * weight;
    accumulator[question.miType].max += 2 * weight;

    const answer = answers[question.id];
    const answerValue = LIKERT_WEIGHT_MAP[answer];
    if (typeof answerValue !== "number") return;

    accumulator[question.miType].raw += answerValue * weight;
  });

  const scores = Object.entries(accumulator).reduce((acc, [type, data]) => {
    acc[type as MultipleIntelligenceType] = normalizeScore(data.raw, data.min, data.max);
    return acc;
  }, {} as Record<MultipleIntelligenceType, number>);

  const ordered = (Object.keys(scores) as MultipleIntelligenceType[]).sort(
    (a, b) => scores[b] - scores[a],
  );

  return {
    scores,
    top1: ordered[0],
    top2: ordered[1] || ordered[0],
    ordered,
  };
};

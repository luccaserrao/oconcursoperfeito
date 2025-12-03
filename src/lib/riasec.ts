import { QuizQuestion, RiasecResult, RiasecScores, RiasecType } from "@/types/quiz";

const LIKERT_SCORE_MAP: Record<string, number> = {
  "Discordo totalmente": 0,
  "Discordo": 1,
  "Neutro": 2,
  "Concordo": 3,
  "Concordo totalmente": 4,
};

const createScoreBucket = (): Record<RiasecType, number> => ({
  Realista: 0,
  Investigativo: 0,
  Artístico: 0,
  Social: 0,
  Empreendedor: 0,
  Convencional: 0,
});

export const calculateRiasecScores = (
  answers: Record<string, string>,
  questions: QuizQuestion[]
): RiasecResult => {
  const rawScores = createScoreBucket();
  const maxScores = createScoreBucket();
  const maxLikertValue = LIKERT_SCORE_MAP["Concordo totalmente"];

  questions.forEach((question) => {
    if (question.type !== "likert" || !question.riasecType) return;

    const answer = answers[question.id];
    const weight = LIKERT_SCORE_MAP[answer];

    maxScores[question.riasecType] += maxLikertValue;

    if (typeof weight === "number") {
      rawScores[question.riasecType] += weight;
    }
  });

  const normalizedScores = Object.fromEntries(
    Object.entries(rawScores).map(([type, score]) => {
      const max = maxScores[type as RiasecType] || maxLikertValue;
      const percentage = Math.round((score / Math.max(max, 1)) * 100);
      return [type, percentage];
    })
  ) as RiasecScores;

  const [top1, top2] = Object.entries(normalizedScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([type]) => type as RiasecType);

  return {
    top1,
    top2,
    scores: normalizedScores,
    habilidades: [
      `Maior afinidade: ${top1}`,
      `Secundário: ${top2}`,
      "Preferência por tarefas alinhadas às respostas mais concordadas",
    ],
    habilidade_destaque: `${top1} + ${top2}`,
    contexto_profissional: `Ambientes que valorizam características ${top1.toLowerCase()} com complemento ${top2.toLowerCase()}`,
  };
};

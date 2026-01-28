import { CONCURSO_AREA, MacroAreaResult, QuizQuestion } from "@/types/quiz";

const AREA_ORDER: CONCURSO_AREA[] = ["ADMINISTRATIVO", "TRIBUNAIS", "POLICIAL", "FISCAL"];

const LIKERT_SCORE_MAP: Record<string, number> = {
  "Discordo totalmente": -2,
  "Discordo": -1,
  "Neutro": 0,
  "Concordo": 1,
  "Concordo totalmente": 2,
};

const resolveAreaFromAnswer = (question: QuizQuestion, answer?: string | null): CONCURSO_AREA | null => {
  if (!answer) return null;
  if (question.optionAreas && question.optionAreas[answer]) {
    return question.optionAreas[answer];
  }
  const normalized = answer.trim().toUpperCase();
  if (AREA_ORDER.includes(normalized as CONCURSO_AREA)) {
    return normalized as CONCURSO_AREA;
  }
  return null;
};

export const calculateMacroArea = (
  answers: Record<string, string>,
  questions: QuizQuestion[],
): MacroAreaResult => {
  const scores: Record<CONCURSO_AREA, number> = {
    ADMINISTRATIVO: 0,
    TRIBUNAIS: 0,
    POLICIAL: 0,
    FISCAL: 0,
  };

  questions.forEach((question) => {
    if (!question.areaWeights) return;
    const answer = answers[question.id];

    if (question.type === "likert") {
      const weight = LIKERT_SCORE_MAP[answer];
      if (typeof weight !== "number") return;
      AREA_ORDER.forEach((area) => {
        scores[area] += (question.areaWeights?.[area] ?? 0) * weight;
      });
      return;
    }

    const selectedArea = resolveAreaFromAnswer(question, answer);
    if (!selectedArea) return;
    scores[selectedArea] += question.areaWeights?.[selectedArea] ?? 0;
  });

  const ordered = [...AREA_ORDER].sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (diff !== 0) return diff;
    return AREA_ORDER.indexOf(a) - AREA_ORDER.indexOf(b);
  });

  const areaPrincipal = ordered[0];
  const areaPossivel = ordered[1] ?? ordered[0];
  const areaEvitar = ordered[ordered.length - 1];

  return {
    areaPrincipal,
    areaPossivel,
    areaEvitar,
    scores,
  };
};

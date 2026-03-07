import { PoliceResult, PoliceCorp, QuizQuestion } from "@/types/quiz";

const CORPS: PoliceCorp[] = ["PF", "PRF", "PM", "PC", "PENAL"];

export const calculatePoliceProfile = (
  answers: Record<string, string>,
  questions: QuizQuestion[],
): PoliceResult => {
  const scores: Record<PoliceCorp, number> = {
    PF: 0,
    PRF: 0,
    PM: 0,
    PC: 0,
    PENAL: 0,
  };
  const tapAlerts: string[] = [];

  questions.forEach((q) => {
    const answer = answers[q.id];
    if (!answer) return;

    if (q.optionCorpWeights && q.optionCorpWeights[answer]) {
      const weights = q.optionCorpWeights[answer];
      CORPS.forEach((corp) => {
        scores[corp] += weights[corp] || 0;
      });
    } else if (q.corpWeights) {
      CORPS.forEach((corp) => {
        scores[corp] += q.corpWeights?.[corp] || 0;
      });
    }

    if (q.riskTags && q.riskTags[answer]) {
      tapAlerts.push(q.riskTags[answer]);
    }
  });

  const ordered = [...CORPS].sort((a, b) => scores[b] - scores[a]);
  const principal = ordered[0];
  const secundario = ordered[1] || ordered[0];
  const evitar = ordered[ordered.length - 1];

  const alertsUnique = Array.from(new Set(tapAlerts)).slice(0, 3);

  return {
    principal,
    secundario,
    evitar,
    scores,
    tapAlerts: alertsUnique,
  };
};

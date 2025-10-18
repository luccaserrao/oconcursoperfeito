export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface QuizAnswer {
  question: string;
  answer: string;
}

export interface CareerRecommendation {
  careerName: string;
  justification: string;
  salary: string;
  workplace: string;
  subjects: string[];
  examFrequency: string;
  studyPlan: {
    weeks: string[];
    hoursPerWeek: string;
    focus: string;
  };
  alternativeCareers: Array<{
    name: string;
    reason: string;
    salary: string;
  }>;
}

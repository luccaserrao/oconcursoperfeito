export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  type?: "likert" | "multiple-choice";
}

export interface QuizAnswer {
  question: string;
  answer: string;
}

export interface CareerRecommendation {
  careerName: string;
  justification: string;
  salary: string;
  examDate: string;
  workplaces: string[];
  workRoutine: string;
  subjects: string[];
  examFrequency: string;
}

export interface PaidContent {
  studyPlan: {
    days: string[];
    hoursPerDay: string;
    focus: string;
  };
  alternativeCareers: Array<{
    name: string;
    reason: string;
    salary: string;
  }>;
  studyRoadmap: string;
  freeMaterials: string[];
  whatsappGroupInfo: string;
  whatsappSupportNumber: string;
}

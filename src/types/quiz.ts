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
  riasec?: {
    top1: string;
    top2: string;
    scores?: {
      Realista: number;
      Investigativo: number;
      Artístico: number;
      Social: number;
      Empreendedor: number;
      Convencional: number;
    };
    habilidades: string[];
    habilidade_destaque: string;
    contexto_profissional: string;
    descricao_personalizada?: string;
  };
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

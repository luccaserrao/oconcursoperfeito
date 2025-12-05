export type RiasecType = "Realista" | "Investigativo" | "Artístico" | "Social" | "Empreendedor" | "Convencional";

export interface QuizQuestion {
  id: string;
  question: string;
  options?: string[];
  type?: "likert" | "multiple-choice" | "text";
  riasecType?: RiasecType;
  placeholder?: string;
  helperText?: string;
}

export interface QuizAnswer {
  question: string;
  answer: string;
  id?: string;
  riasecType?: RiasecType;
}

export interface RiasecScores {
  Realista: number;
  Investigativo: number;
  Artístico: number;
  Social: number;
  Empreendedor: number;
  Convencional: number;
}

export interface RiasecResult {
  top1: RiasecType;
  top2: RiasecType;
  scores?: RiasecScores;
  habilidades?: string[];
  habilidade_destaque?: string;
  contexto_profissional?: string;
  descricao_personalizada?: string;
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
  riasec?: RiasecResult;
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

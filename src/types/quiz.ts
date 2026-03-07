export type RiasecType = "Realista" | "Investigativo" | "Artístico" | "Social" | "Empreendedor" | "Convencional";

export type CONCURSO_AREA = "ADMINISTRATIVO" | "TRIBUNAIS" | "POLICIAL" | "FISCAL";

export interface QuizQuestion {
  id: string;
  question: string;
  options?: string[];
  type?: "likert" | "multiple-choice" | "text";
  riasecType?: RiasecType;
  areaWeights?: Record<CONCURSO_AREA, number>;
  optionAreas?: Record<string, CONCURSO_AREA>;
  /** Pontuação por corporação policial para fluxos especializados */
  corpWeights?: Record<string, number>;
  /** Pontuação por opção -> corporações (ex.: cada alternativa distribui pesos diferentes) */
  optionCorpWeights?: Record<string, Record<string, number>>;
  /** Map de alertas TAP por opção escolhida */
  riskTags?: Record<string, string>;
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

export interface MacroAreaResult {
  areaPrincipal: CONCURSO_AREA;
  areaPossivel: CONCURSO_AREA;
  areaEvitar: CONCURSO_AREA;
  scores?: Record<CONCURSO_AREA, number>;
}

export type PoliceCorp = "PF" | "PRF" | "PM" | "PC" | "PENAL";

export interface PoliceResult {
  principal: PoliceCorp;
  secundario: PoliceCorp;
  evitar: PoliceCorp;
  scores: Record<PoliceCorp, number>;
  tapAlerts: string[];
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

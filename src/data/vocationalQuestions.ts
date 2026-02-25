import { QuizQuestion, RiasecType } from "@/types/quiz";
import { MultipleIntelligenceType } from "@/lib/multipleIntelligences";

export type VocationalQuestion = QuizQuestion & {
  miType?: MultipleIntelligenceType;
};

export const LIKERT_OPTIONS = [
  "Discordo totalmente",
  "Discordo",
  "Neutro",
  "Concordo",
  "Concordo totalmente",
];

const riasecQuestions: Array<{ id: string; question: string; riasecType: RiasecType }> = [
  // Realista (R)
  {
    id: "vr_r1",
    riasecType: "Realista",
    question: "Gosto de lidar com tarefas praticas e resultados concretos.",
  },
  {
    id: "vr_r2",
    riasecType: "Realista",
    question: "Tenho interesse em montar, consertar ou operar equipamentos.",
  },
  {
    id: "vr_r3",
    riasecType: "Realista",
    question: "Prefiro atividades objetivas a discussoes muito teoricas.",
  },

  // Investigativo (I)
  {
    id: "vr_i1",
    riasecType: "Investigativo",
    question: "Gosto de pesquisar, analisar e entender como algo funciona.",
  },
  {
    id: "vr_i2",
    riasecType: "Investigativo",
    question: "Tenho facilidade com logica, numeros ou analise de dados.",
  },
  {
    id: "vr_i3",
    riasecType: "Investigativo",
    question: "Me sinto motivado quando preciso resolver problemas complexos.",
  },

  // Artistico (A)
  {
    id: "vr_a1",
    riasecType: "Artístico",
    question: "Gosto de criar ideias originais e experimentar novas formas.",
  },
  {
    id: "vr_a2",
    riasecType: "Artístico",
    question: "Expressar-me por meio de arte, escrita ou design me atrai.",
  },
  {
    id: "vr_a3",
    riasecType: "Artístico",
    question: "Prefiro liberdade criativa a seguir regras rigidas.",
  },

  // Social (S)
  {
    id: "vr_s1",
    riasecType: "Social",
    question: "Gosto de ajudar pessoas a aprender ou se desenvolver.",
  },
  {
    id: "vr_s2",
    riasecType: "Social",
    question: "Me sinto energizado trabalhando em equipe e colaborando.",
  },
  {
    id: "vr_s3",
    riasecType: "Social",
    question: "Tenho facilidade para ouvir, orientar ou ensinar.",
  },

  // Empreendedor (E)
  {
    id: "vr_e1",
    riasecType: "Empreendedor",
    question: "Gosto de liderar pessoas ou conduzir projetos.",
  },
  {
    id: "vr_e2",
    riasecType: "Empreendedor",
    question: "Me sinto motivado por metas, resultados e desafios.",
  },
  {
    id: "vr_e3",
    riasecType: "Empreendedor",
    question: "Tenho interesse em negociar, vender ou influenciar.",
  },

  // Convencional (C)
  {
    id: "vr_c1",
    riasecType: "Convencional",
    question: "Gosto de organizar informacoes, planilhas ou processos.",
  },
  {
    id: "vr_c2",
    riasecType: "Convencional",
    question: "Prefiro rotinas claras e bem definidas.",
  },
  {
    id: "vr_c3",
    riasecType: "Convencional",
    question: "Sou atento a detalhes e sigo regras com facilidade.",
  },
];

const miQuestions: Array<{ id: string; question: string; miType: MultipleIntelligenceType }> = [
  {
    id: "mi_l1",
    miType: "Linguistica",
    question: "Tenho facilidade para escrever, explicar ou argumentar.",
  },
  {
    id: "mi_m1",
    miType: "LogicoMatematica",
    question: "Gosto de analisar padroes, numeros e causas.",
  },
  {
    id: "mi_e1",
    miType: "Espacial",
    question: "Consigo visualizar espacos, mapas ou layouts com facilidade.",
  },
  {
    id: "mi_mu1",
    miType: "Musical",
    question: "Percebo ritmos, sons e melodias com facilidade.",
  },
  {
    id: "mi_c1",
    miType: "CorporalCinestesica",
    question: "Aprendo melhor colocando a mao na massa ou movendo o corpo.",
  },
  {
    id: "mi_i1",
    miType: "Interpessoal",
    question: "Entendo rapidamente as emocoes e motivacoes de outras pessoas.",
  },
  {
    id: "mi_in1",
    miType: "Intrapessoal",
    question: "Tenho boa nocao dos meus sentimentos e do que me motiva.",
  },
  {
    id: "mi_n1",
    miType: "Naturalista",
    question: "Tenho interesse por natureza, animais ou fenomenos ambientais.",
  },
];

const likertQuestions: VocationalQuestion[] = [
  ...riasecQuestions.map((q) => ({
    ...q,
    type: "likert",
    options: LIKERT_OPTIONS,
  })),
  ...miQuestions.map((q) => ({
    ...q,
    type: "likert",
    options: LIKERT_OPTIONS,
  })),
];

export const vocationalQuestions: VocationalQuestion[] = likertQuestions;

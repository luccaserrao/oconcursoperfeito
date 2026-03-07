import { QuizQuestion } from "@/types/quiz";

export const quizQuestionsPolicial: QuizQuestion[] = [
  {
    id: "tap_pressao",
    question: "Quando precisa decidir em segundos sob estresse, o que acontece com você?",
    options: [
      "Sigo o protocolo mesmo sob pressão",
      "Fico alerta, mas às vezes atropelo etapas",
      "Travo e preciso de apoio",
    ],
    optionCorpWeights: {
      "Sigo o protocolo mesmo sob pressão": { PF: 2, PRF: 2, PM: 1, PC: 1, PENAL: 1 },
      "Fico alerta, mas às vezes atropelo etapas": { PM: 2, PRF: 1, PC: 1 },
      "Travo e preciso de apoio": { PENAL: 1 },
    },
    riskTags: {
      "Fico alerta, mas às vezes atropelo etapas": "Impulsividade pode pesar no TAP",
      "Travo e preciso de apoio": "Gestão de estresse insuficiente para TAP",
    },
  },
  {
    id: "risco_fisico",
    question: "Quanto de risco físico você aceita no dia a dia?",
    options: [
      "Alto: aceito confrontos e perseguições",
      "Médio: prefiro risco controlado",
      "Baixo: busco funções investigativas/administrativas",
    ],
    optionCorpWeights: {
      "Alto: aceito confrontos e perseguições": { PM: 2, PRF: 2 },
      "Médio: prefiro risco controlado": { PF: 2, PC: 1, PENAL: 1 },
      "Baixo: busco funções investigativas/administrativas": { PF: 1, PC: 2 },
    },
    riskTags: {
      "Baixo: busco funções investigativas/administrativas": "Checar motivação para operações de rua",
    },
  },
  {
    id: "rotina_preferencia",
    question: "Qual rotina mais combina com você?",
    options: [
      "Patrulhamento ostensivo e contato direto com população",
      "Fiscalização de rodovias e trânsito",
      "Investigação, análise e construção de casos",
      "Gestão de custódia e disciplina carcerária",
    ],
    optionCorpWeights: {
      "Patrulhamento ostensivo e contato direto com população": { PM: 2 },
      "Fiscalização de rodovias e trânsito": { PRF: 3 },
      "Investigação, análise e construção de casos": { PF: 2, PC: 2 },
      "Gestão de custódia e disciplina carcerária": { PENAL: 3 },
    },
  },
  {
    id: "hierarquia_disciplina",
    question: "Como você lida com hierarquia rígida e disciplina formal?",
    options: [
      "Funciona bem para mim",
      "Aceito, mas preciso entender o porquê das ordens",
      "Prefiro autonomia alta",
    ],
    optionCorpWeights: {
      "Funciona bem para mim": { PM: 2, PRF: 2, PF: 1, PENAL: 1 },
      "Aceito, mas preciso entender o porquê das ordens": { PF: 2, PC: 1 },
      "Prefiro autonomia alta": { PC: 2 },
    },
    riskTags: {
      "Prefiro autonomia alta": "Aderência baixa a hierarquia pode reprovar no TAP",
    },
  },
  {
    id: "condicionamento_fisico",
    question: "Como está seu condicionamento físico hoje?",
    options: [
      "Pronto para TAF de corrida, barra e flexão",
      "Faço atividade, mas preciso de 30-60 dias de preparo",
      "Sedentário: começando do zero",
    ],
    optionCorpWeights: {
      "Pronto para TAF de corrida, barra e flexão": { PM: 2, PRF: 2, PF: 1 },
      "Faço atividade, mas preciso de 30-60 dias de preparo": { PRF: 1, PF: 1, PC: 1, PENAL: 1 },
      "Sedentário: começando do zero": { PC: 1, PENAL: 1 },
    },
    riskTags: {
      "Sedentário: começando do zero": "Condicionamento baixo é risco imediato no TAF",
    },
  },
  {
    id: "analise_provas",
    question: "Quanto você gosta de analisar provas, laudos e cruzar informações?",
    options: [
      "Muito: adoro mergulhar em dados e documentos",
      "Moderado: prefiro equilibrar rua e gabinete",
      "Pouco: prefiro ação e contato",
    ],
    optionCorpWeights: {
      "Muito: adoro mergulhar em dados e documentos": { PF: 2, PC: 2 },
      "Moderado: prefiro equilibrar rua e gabinete": { PF: 1, PRF: 1 },
      "Pouco: prefiro ação e contato": { PM: 2, PRF: 1 },
    },
  },
  {
    id: "conflito",
    question: "Diante de conflito físico iminente, qual sua primeira reação?",
    options: [
      "Verifico regras de uso da força e tento verbalizar",
      "Atuo rápido para controlar a cena, depois documento",
      "Sinto desconforto alto e prefiro apoio",
    ],
    optionCorpWeights: {
      "Verifico regras de uso da força e tento verbalizar": { PF: 2, PRF: 1, PC: 1 },
      "Atuo rápido para controlar a cena, depois documento": { PM: 2, PRF: 2 },
      "Sinto desconforto alto e prefiro apoio": { PENAL: 1 },
    },
    riskTags: {
      "Sinto desconforto alto e prefiro apoio": "Autocontrole em conflito precisa de reforço para TAP",
    },
  },
  {
    id: "estrada",
    question: "Trabalhar em estrada/rodovia te atrai?",
    options: [
      "Sim, gosto de patrulhamento rodoviário e fiscalização",
      "Indiferente",
      "Prefiro contexto urbano/investigativo",
    ],
    optionCorpWeights: {
      "Sim, gosto de patrulhamento rodoviário e fiscalização": { PRF: 3 },
      "Indiferente": { PM: 1, PENAL: 1 },
      "Prefiro contexto urbano/investigativo": { PF: 1, PC: 1 },
    },
  },
  {
    id: "plantao",
    question: "Disponibilidade para plantões noturnos e escala 12x36/24x48?",
    options: [
      "Total, sem restrições",
      "Posso, mas prefiro limitar a poucos por mês",
      "Difícil: preciso de rotina previsível",
    ],
    optionCorpWeights: {
      "Total, sem restrições": { PM: 2, PRF: 2, PENAL: 2 },
      "Posso, mas prefiro limitar a poucos por mês": { PF: 1, PC: 1 },
      "Difícil: preciso de rotina previsível": { PC: 1 },
    },
    riskTags: {
      "Difícil: preciso de rotina previsível": "Rotina de plantão é parte do TAP/entrevista",
    },
  },
  {
    id: "ambiente_penal",
    question: "Como você se sente em ambiente carcerário/controle de custódia?",
    options: [
      "Tranquilo: consigo manter postura firme",
      "Posso fazer, mas não como função principal",
      "Evitaria se possível",
    ],
    optionCorpWeights: {
      "Tranquilo: consigo manter postura firme": { PENAL: 3 },
      "Posso fazer, mas não como função principal": { PM: 1, PRF: 1, PC: 1 },
      "Evitaria se possível": { PF: 1 },
    },
  },
  {
    id: "etica",
    question: "Diante de pressão externa para flexibilizar regras, você...",
    options: [
      "Mantém o protocolo e registra tudo",
      "Negocia limites, mas não quebra regra",
      "Cede para resolver rápido",
    ],
    optionCorpWeights: {
      "Mantém o protocolo e registra tudo": { PF: 2, PRF: 2, PM: 1 },
      "Negocia limites, mas não quebra regra": { PC: 2, PF: 1 },
      "Cede para resolver rápido": { PENAL: 1 },
    },
    riskTags: {
      "Cede para resolver rápido": "Risco de eliminação por ética no TAP",
    },
  },
];

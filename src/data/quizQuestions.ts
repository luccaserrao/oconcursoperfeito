import { QuizQuestion, RiasecType } from "@/types/quiz";

export const LIKERT_OPTIONS = [
  "Discordo totalmente",
  "Discordo",
  "Neutro",
  "Concordo",
  "Concordo totalmente",
];

// 30 perguntas RIASEC (5 por tipo) para perfis equilibrados e personalizados
const riasecQuestions: Array<{ id: string; question: string; riasecType: RiasecType }> = [
  // Realista (R)
  { id: "riasec_r1", riasecType: "Realista", question: "Você gosta de realizar atividades práticas, como consertar objetos quebrados ou fazer pequenos reparos em casa?" },
  { id: "riasec_r2", riasecType: "Realista", question: "Você sente interesse em operar máquinas, ferramentas ou equipamentos mecânicos por conta própria?" },
  { id: "riasec_r3", riasecType: "Realista", question: "Você gosta de trabalhar em ambientes externos, como jardins, obras ou espaços ao ar livre?" },
  { id: "riasec_r4", riasecType: "Realista", question: "Desmontar equipamentos, entender suas peças e montar novamente é algo que chama sua atenção?" },
  { id: "riasec_r5", riasecType: "Realista", question: "Você se sente confortável em fazer reparos elétricos simples, como trocar tomadas ou instalar lâmpadas?" },

  // Investigativo (I)
  { id: "riasec_i1", riasecType: "Investigativo", question: "Você sente prazer em resolver problemas matemáticos, cálculos ou desafios numéricos?" },
  { id: "riasec_i2", riasecType: "Investigativo", question: "Você gosta de ler sobre descobertas científicas, avanços da medicina ou novas tecnologias?" },
  { id: "riasec_i3", riasecType: "Investigativo", question: "Fazer pesquisas, analisar informações e investigar causas e efeitos te interessa?" },
  { id: "riasec_i4", riasecType: "Investigativo", question: "Você gosta de descobrir como as coisas funcionam desmontando, estudando ou observando processos?" },
  { id: "riasec_i5", riasecType: "Investigativo", question: "Trabalhar com bancos de dados, estatísticas ou gráficos é algo que desperta o seu interesse?" },

  // Artístico (A)
  { id: "riasec_a1", riasecType: "Artístico", question: "Você gosta de criar desenhos, ilustrações, pinturas ou qualquer forma de arte visual?" },
  { id: "riasec_a2", riasecType: "Artístico", question: "Escrever textos, histórias, poesias ou roteiros é algo que te envolve e estimula sua criatividade?" },
  { id: "riasec_a3", riasecType: "Artístico", question: "Expressar ideias de forma criativa, original e fora do padrão é natural para você?" },
  { id: "riasec_a4", riasecType: "Artístico", question: "Tocar instrumentos, compor músicas ou participar de atividades musicais te agrada?" },
  { id: "riasec_a5", riasecType: "Artístico", question: "Criar designs, layouts, artes digitais ou conteúdos visuais te deixa animado?" },

  // Social (S)
  { id: "riasec_s1", riasecType: "Social", question: "Você gosta de ensinar outras pessoas, explicar temas e ajudar alguém a aprender?" },
  { id: "riasec_s2", riasecType: "Social", question: "Ajudar pessoas com dificuldades, oferecendo apoio e orientação, te traz satisfação?" },
  { id: "riasec_s3", riasecType: "Social", question: "Você gosta de dar conselhos, ouvir problemas e orientar amigos ou colegas?" },
  { id: "riasec_s4", riasecType: "Social", question: "Trabalhar em equipe, colaborar com pessoas e criar um ambiente harmonioso te motiva?" },
  { id: "riasec_s5", riasecType: "Social", question: "Cuidar do bem-estar de outras pessoas, seja emocional ou físico, é algo que você valoriza?" },

  // Empreendedor (E)
  { id: "riasec_e1", riasecType: "Empreendedor", question: "Você gosta de liderar grupos, coordenar pessoas ou tomar decisões importantes?" },
  { id: "riasec_e2", riasecType: "Empreendedor", question: "Assumir responsabilidade e ser o responsável final por um projeto te motiva?" },
  { id: "riasec_e3", riasecType: "Empreendedor", question: "Vender produtos, ideias, serviços ou persuadir outras pessoas é algo que você faz bem?" },
  { id: "riasec_e4", riasecType: "Empreendedor", question: "Você gosta de assumir riscos calculados para alcançar resultados maiores?" },
  { id: "riasec_e5", riasecType: "Empreendedor", question: "Planejar metas, criar estratégias e pensar no futuro te empolga?" },

  // Convencional (C)
  { id: "riasec_c1", riasecType: "Convencional", question: "Você gosta de organizar documentos, manter arquivos e deixar tudo fácil de encontrar?" },
  { id: "riasec_c2", riasecType: "Convencional", question: "Seguir regras, procedimentos e rotinas claras te traz segurança e tranquilidade?" },
  { id: "riasec_c3", riasecType: "Convencional", question: "Trabalhar com planilhas, sistemas ou processos administrativos te parece confortável?" },
  { id: "riasec_c4", riasecType: "Convencional", question: "Manter o ambiente limpo, organizado e padronizado é algo que você considera importante?" },
  { id: "riasec_c5", riasecType: "Convencional", question: "Você não se incomoda com tarefas repetitivas e prefere atividades estruturadas?" },
];

const likertQuestions: QuizQuestion[] = riasecQuestions.map((q) => ({
  ...q,
  type: "likert",
  options: LIKERT_OPTIONS,
}));

export const quizQuestionsV1: QuizQuestion[] = [
  // ===== PARTE 1: Perfil RIASEC (30 perguntas - LIKERT) =====
  ...likertQuestions,

  // ===== PARTE 2: Escolha do Concurso Ideal (5 perguntas) =====
  {
    id: "q1",
    type: "multiple-choice",
    question: "Qual é o seu nível de escolaridade atual?",
    options: [
      "Ensino Fundamental completo ou em andamento",
      "Ensino Médio completo ou em andamento",
      "Ensino Superior completo ou em andamento",
      "Pós-graduação (especialização, mestrado ou doutorado)",
    ],
  },
  {
    id: "q2",
    type: "text",
    question: "Em qual estado você deseja prestar o concurso público?",
    placeholder: "Ex: Pará; capital ou interior",
    helperText: "Usuários costumam escrever: 'Pará, capital' ou 'SP, interior'.",
  },
  {
    id: "q3",
    type: "multiple-choice",
    question: "Qual ambiente de trabalho você prefere?",
    options: [
      "Escritório administrativo com rotina estável",
      "Trabalho externo com deslocamentos/fiscalização",
      "Ambiente de saúde (hospital, unidade, serviço de campo)",
      "Instituição de ensino (escola, universidade, formação)",
      "Órgãos de segurança pública ou campo operacional",
    ],
  },
  {
    id: "q4",
    type: "text",
    question: "Descreva sua experiência profissional ou com provas de concursos anteriores.",
    placeholder: "Ex: trabalhei no setor privado e já fiz 2 provas (INSS e TJ-SP)",
    helperText: "Outros exemplos: 'estágio na prefeitura e fiz PF e Receita', 'sou CLT e fiz INSS e TJ-RJ'.",
  },
  {
    id: "q5",
    type: "text",
    question: "Qual é o seu principal objetivo ao passar em um concurso?",
    placeholder: "Ex: salário alto e benefícios / menor concorrência / qualidade de vida",
    helperText: "Usuários escrevem: 'menor concorrência', 'salário alto + benefícios', 'equilíbrio trabalho-vida'.",
  },
  {
    id: "q6",
    type: "text",
    question: "Em quais estados devemos buscar concursos públicos para você?",
    placeholder: "Ex: Pará e São Paulo (capital e interior)",
    helperText: "Liste todos os estados/locais que você aceitaria (pode separar por vírgula).",
  },
  {
    id: "q7",
    type: "text",
    question: "Conte sua experiência com concursos, sua escolaridade e onde trabalha hoje.",
    placeholder: "Ex: estudo há 6 meses, ensino superior completo, trabalho no setor privado",
    helperText: "Pode citar tempo de estudo, concursos já feitos e sua ocupação atual.",
  },
];

const macroLikertQuestions: QuizQuestion[] = [
  {
    id: "v2_q1",
    type: "likert",
    question: "Prefiro rotina previsível, processos claros e organização.",
    options: LIKERT_OPTIONS,
    areaWeights: {
      ADMINISTRATIVO: 2,
      TRIBUNAIS: 1,
      POLICIAL: -1,
      FISCAL: 1,
    },
  },
  {
    id: "v2_q2",
    type: "likert",
    question: "Tenho interesse em análises de números, auditoria e controle de gastos.",
    options: LIKERT_OPTIONS,
    areaWeights: {
      ADMINISTRATIVO: 0,
      TRIBUNAIS: 0,
      POLICIAL: -1,
      FISCAL: 2,
    },
  },
  {
    id: "v2_q3",
    type: "likert",
    question: "Gosto de interpretar normas e revisar documentos com atenção.",
    options: LIKERT_OPTIONS,
    areaWeights: {
      ADMINISTRATIVO: 1,
      TRIBUNAIS: 2,
      POLICIAL: 0,
      FISCAL: 1,
    },
  },
  {
    id: "v2_q4",
    type: "likert",
    question: "Me sinto bem em ambientes com ação, disciplina e resposta rápida.",
    options: LIKERT_OPTIONS,
    areaWeights: {
      ADMINISTRATIVO: -1,
      TRIBUNAIS: 0,
      POLICIAL: 2,
      FISCAL: -1,
    },
  },
  {
    id: "v2_q5",
    type: "likert",
    question: "Fiscalizar, checar conformidade e apontar irregularidades me atrai.",
    options: LIKERT_OPTIONS,
    areaWeights: {
      ADMINISTRATIVO: 0,
      TRIBUNAIS: 1,
      POLICIAL: 1,
      FISCAL: 2,
    },
  },
];

const macroMultipleChoiceQuestions: QuizQuestion[] = [
  {
    id: "v2_q6",
    type: "multiple-choice",
    question: "Qual ambiente te parece mais compatível?",
    options: [
      "Escritório administrativo e processos internos",
      "Tribunais e análise jurídica",
      "Fiscalização e auditoria",
      "Operações e segurança",
    ],
    optionAreas: {
      "Escritório administrativo e processos internos": "ADMINISTRATIVO",
      "Tribunais e análise jurídica": "TRIBUNAIS",
      "Fiscalização e auditoria": "FISCAL",
      "Operações e segurança": "POLICIAL",
    },
    areaWeights: {
      ADMINISTRATIVO: 2,
      TRIBUNAIS: 2,
      POLICIAL: 2,
      FISCAL: 2,
    },
  },
  {
    id: "v2_q7",
    type: "multiple-choice",
    question: "Qual tipo de rotina te atrai mais?",
    options: [
      "Atividades organizacionais e suporte",
      "Leitura e interpretação de normas",
      "Análise de dados e controle",
      "Ação em campo",
    ],
    optionAreas: {
      "Atividades organizacionais e suporte": "ADMINISTRATIVO",
      "Leitura e interpretação de normas": "TRIBUNAIS",
      "Análise de dados e controle": "FISCAL",
      "Ação em campo": "POLICIAL",
    },
    areaWeights: {
      ADMINISTRATIVO: 2,
      TRIBUNAIS: 2,
      POLICIAL: 2,
      FISCAL: 2,
    },
  },
  {
    id: "v2_q8",
    type: "multiple-choice",
    question: "O que te motiva mais em um concurso?",
    options: [
      "Organizar e manter processos funcionando",
      "Contribuir para decisões justas",
      "Combater desperdícios e fraudes",
      "Proteger pessoas e patrimônio",
    ],
    optionAreas: {
      "Organizar e manter processos funcionando": "ADMINISTRATIVO",
      "Contribuir para decisões justas": "TRIBUNAIS",
      "Combater desperdícios e fraudes": "FISCAL",
      "Proteger pessoas e patrimônio": "POLICIAL",
    },
    areaWeights: {
      ADMINISTRATIVO: 2,
      TRIBUNAIS: 2,
      POLICIAL: 2,
      FISCAL: 2,
    },
  },
  {
    id: "v2_q9",
    type: "multiple-choice",
    question: "Qual cenário te parece mais interessante?",
    options: [
      "Gestão administrativa e suporte interno",
      "Gabinetes e análise de processos",
      "Auditorias e fiscalização externa",
      "Operações e rotina operacional",
    ],
    optionAreas: {
      "Gestão administrativa e suporte interno": "ADMINISTRATIVO",
      "Gabinetes e análise de processos": "TRIBUNAIS",
      "Auditorias e fiscalização externa": "FISCAL",
      "Operações e rotina operacional": "POLICIAL",
    },
    areaWeights: {
      ADMINISTRATIVO: 2,
      TRIBUNAIS: 2,
      POLICIAL: 2,
      FISCAL: 2,
    },
  },
  {
    id: "v2_q10",
    type: "multiple-choice",
    question: "Qual atividade parece mais natural para você?",
    options: [
      "Organizar documentos e fluxos",
      "Analisar processos e provas",
      "Examinar números e apontar inconsistências",
      "Atuar em ocorrências",
    ],
    optionAreas: {
      "Organizar documentos e fluxos": "ADMINISTRATIVO",
      "Analisar processos e provas": "TRIBUNAIS",
      "Examinar números e apontar inconsistências": "FISCAL",
      "Atuar em ocorrências": "POLICIAL",
    },
    areaWeights: {
      ADMINISTRATIVO: 2,
      TRIBUNAIS: 2,
      POLICIAL: 2,
      FISCAL: 2,
    },
  },
];

export const quizQuestionsV2: QuizQuestion[] = [
  ...macroLikertQuestions,
  ...macroMultipleChoiceQuestions,
  {
    id: "v2_q11",
    type: "text",
    question: "Em quais estados devemos buscar concursos públicos para você?",
    placeholder: "Ex: Paraná e Minas Gerais (capital e interior)",
    helperText: "Liste todos os estados/locais que você aceitaria (pode separar por vírgula).",
  },
  {
    id: "v2_q12",
    type: "text",
    question: "Conte sua experiência com concursos, sua escolaridade e onde trabalha hoje.",
    placeholder: "Ex: 1 ano estudando, ensino médio completo, trabalho no comércio",
    helperText: "Pode citar tempo de estudo, concursos já feitos e sua ocupação atual.",
  },
];

export const allQuizQuestions: QuizQuestion[] = [
  ...quizQuestionsV1,
  ...quizQuestionsV2,
];

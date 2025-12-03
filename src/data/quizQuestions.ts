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

export const quizQuestions: QuizQuestion[] = [
  // ===== PARTE 1: Perfil RIASEC (30 perguntas - LIKERT) =====
  ...likertQuestions,

  // ===== PARTE 2: Escolha do Concurso Ideal (5 perguntas - MULTIPLE CHOICE) =====
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
    type: "multiple-choice",
    question: "Você prefere trabalhar mais com:",
    options: [
      "Atendimento ao público e relacionamento interpessoal",
      "Análise de documentos e processos administrativos",
      "Fiscalização e aplicação de normas",
      "Ensino e desenvolvimento de pessoas",
      "Saúde e cuidado com pessoas",
    ],
  },
  {
    id: "q3",
    type: "multiple-choice",
    question: "Qual ambiente de trabalho você prefere?",
    options: [
      "Escritório administrativo com rotina estável",
      "Trabalho externo com deslocamentos e fiscalização",
      "Ambiente hospitalar ou de saúde",
      "Instituição de ensino (escola, universidade)",
      "Órgãos de segurança pública",
    ],
  },
  {
    id: "q4",
    type: "multiple-choice",
    question: "Você tem experiência ou formação em qual área?",
    options: [
      "Área da Saúde (Enfermagem, Medicina, Odontologia, etc.)",
      "Área Jurídica (Direito)",
      "Área Administrativa",
      "Área de Engenharia ou Tecnologia",
      "Área de Educação",
      "Não tenho formação específica ainda",
    ],
  },
  {
    id: "q5",
    type: "multiple-choice",
    question: "Qual é o seu principal objetivo ao passar em um concurso?",
    options: [
      "Estabilidade financeira e segurança no emprego",
      "Alto salário e possibilidade de crescimento",
      "Contribuir com a sociedade e fazer diferença",
      "Qualidade de vida e equilíbrio trabalho-vida pessoal",
    ],
  },
];

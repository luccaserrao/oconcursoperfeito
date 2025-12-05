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
  { id: "riasec_r1", riasecType: "Realista", question: "VocÃª gosta de realizar atividades prÃ¡ticas, como consertar objetos quebrados ou fazer pequenos reparos em casa?" },
  { id: "riasec_r2", riasecType: "Realista", question: "VocÃª sente interesse em operar mÃ¡quinas, ferramentas ou equipamentos mecÃ¢nicos por conta prÃ³pria?" },
  { id: "riasec_r3", riasecType: "Realista", question: "VocÃª gosta de trabalhar em ambientes externos, como jardins, obras ou espaÃ§os ao ar livre?" },
  { id: "riasec_r4", riasecType: "Realista", question: "Desmontar equipamentos, entender suas peÃ§as e montar novamente Ã© algo que chama sua atenÃ§Ã£o?" },
  { id: "riasec_r5", riasecType: "Realista", question: "VocÃª se sente confortÃ¡vel em fazer reparos elÃ©tricos simples, como trocar tomadas ou instalar lÃ¢mpadas?" },

  // Investigativo (I)
  { id: "riasec_i1", riasecType: "Investigativo", question: "VocÃª sente prazer em resolver problemas matemÃ¡ticos, cÃ¡lculos ou desafios numÃ©ricos?" },
  { id: "riasec_i2", riasecType: "Investigativo", question: "VocÃª gosta de ler sobre descobertas cientÃ­ficas, avanÃ§os da medicina ou novas tecnologias?" },
  { id: "riasec_i3", riasecType: "Investigativo", question: "Fazer pesquisas, analisar informaÃ§Ãµes e investigar causas e efeitos te interessa?" },
  { id: "riasec_i4", riasecType: "Investigativo", question: "VocÃª gosta de descobrir como as coisas funcionam desmontando, estudando ou observando processos?" },
  { id: "riasec_i5", riasecType: "Investigativo", question: "Trabalhar com bancos de dados, estatÃ­sticas ou grÃ¡ficos Ã© algo que desperta o seu interesse?" },

  // ArtÃ­stico (A)
  { id: "riasec_a1", riasecType: "ArtÃ­stico", question: "VocÃª gosta de criar desenhos, ilustraÃ§Ãµes, pinturas ou qualquer forma de arte visual?" },
  { id: "riasec_a2", riasecType: "ArtÃ­stico", question: "Escrever textos, histÃ³rias, poesias ou roteiros Ã© algo que te envolve e estimula sua criatividade?" },
  { id: "riasec_a3", riasecType: "ArtÃ­stico", question: "Expressar ideias de forma criativa, original e fora do padrÃ£o Ã© natural para vocÃª?" },
  { id: "riasec_a4", riasecType: "ArtÃ­stico", question: "Tocar instrumentos, compor mÃºsicas ou participar de atividades musicais te agrada?" },
  { id: "riasec_a5", riasecType: "ArtÃ­stico", question: "Criar designs, layouts, artes digitais ou conteÃºdos visuais te deixa animado?" },

  // Social (S)
  { id: "riasec_s1", riasecType: "Social", question: "VocÃª gosta de ensinar outras pessoas, explicar temas e ajudar alguÃ©m a aprender?" },
  { id: "riasec_s2", riasecType: "Social", question: "Ajudar pessoas com dificuldades, oferecendo apoio e orientaÃ§Ã£o, te traz satisfaÃ§Ã£o?" },
  { id: "riasec_s3", riasecType: "Social", question: "VocÃª gosta de dar conselhos, ouvir problemas e orientar amigos ou colegas?" },
  { id: "riasec_s4", riasecType: "Social", question: "Trabalhar em equipe, colaborar com pessoas e criar um ambiente harmonioso te motiva?" },
  { id: "riasec_s5", riasecType: "Social", question: "Cuidar do bem-estar de outras pessoas, seja emocional ou fÃ­sico, Ã© algo que vocÃª valoriza?" },

  // Empreendedor (E)
  { id: "riasec_e1", riasecType: "Empreendedor", question: "VocÃª gosta de liderar grupos, coordenar pessoas ou tomar decisÃµes importantes?" },
  { id: "riasec_e2", riasecType: "Empreendedor", question: "Assumir responsabilidade e ser o responsÃ¡vel final por um projeto te motiva?" },
  { id: "riasec_e3", riasecType: "Empreendedor", question: "Vender produtos, ideias, serviÃ§os ou persuadir outras pessoas Ã© algo que vocÃª faz bem?" },
  { id: "riasec_e4", riasecType: "Empreendedor", question: "VocÃª gosta de assumir riscos calculados para alcanÃ§ar resultados maiores?" },
  { id: "riasec_e5", riasecType: "Empreendedor", question: "Planejar metas, criar estratÃ©gias e pensar no futuro te empolga?" },

  // Convencional (C)
  { id: "riasec_c1", riasecType: "Convencional", question: "VocÃª gosta de organizar documentos, manter arquivos e deixar tudo fÃ¡cil de encontrar?" },
  { id: "riasec_c2", riasecType: "Convencional", question: "Seguir regras, procedimentos e rotinas claras te traz seguranÃ§a e tranquilidade?" },
  { id: "riasec_c3", riasecType: "Convencional", question: "Trabalhar com planilhas, sistemas ou processos administrativos te parece confortÃ¡vel?" },
  { id: "riasec_c4", riasecType: "Convencional", question: "Manter o ambiente limpo, organizado e padronizado Ã© algo que vocÃª considera importante?" },
  { id: "riasec_c5", riasecType: "Convencional", question: "VocÃª nÃ£o se incomoda com tarefas repetitivas e prefere atividades estruturadas?" },
];

const likertQuestions: QuizQuestion[] = riasecQuestions.map((q) => ({
  ...q,
  type: "likert",
  options: LIKERT_OPTIONS,
}));

export const quizQuestions: QuizQuestion[] = [
  // ===== PARTE 1: Perfil RIASEC (30 perguntas - LIKERT) =====
  ...likertQuestions,

  // ===== PARTE 2: Escolha do Concurso Ideal (5 perguntas) =====
  {
    id: "q1",
    type: "multiple-choice",
    question: "Qual e o seu nivel de escolaridade atual?",
    options: [
      "Ensino Fundamental completo ou em andamento",
      "Ensino Medio completo ou em andamento",
      "Ensino Superior completo ou em andamento",
      "Pos-graduacao (especializacao, mestrado ou doutorado)",
    ],
  },
  {
    id: "q2",
    type: "text",
    question: "Em qual estado voce deseja prestar o concurso publico?",
    placeholder: "Ex: Para; capital ou interior",
    helperText: "Usuarios costumam escrever: 'Para, capital' ou 'SP, interior'.",
  },
  {
    id: "q3",
    type: "multiple-choice",
    question: "Qual ambiente de trabalho voce prefere?",
    options: [
      "Escritorio administrativo com rotina estavel",
      "Trabalho externo com deslocamentos/fiscalizacao",
      "Ambiente de saude (hospital, unidade, servico de campo)",
      "Instituicao de ensino (escola, universidade, formacao)",
      "Orgaos de seguranca publica ou campo operacional",
    ],
  },
  {
    id: "q4",
    type: "text",
    question: "Voce tem experiencia ou formacao em alguma area?",
    placeholder: "Ex: cursando direito e estagio em escritorio",
    helperText: "Outros exemplos: 'cursando administracao, sem experiencia ainda'.",
  },
  {
    id: "q5",
    type: "text",
    question: "Qual e o seu principal objetivo ao passar em um concurso?",
    placeholder: "Ex: salario alto e beneficios / menor concorrencia / qualidade de vida",
    helperText: "Usuarios escrevem: 'menor concorrencia', 'salario alto + beneficios', 'equilibrio trabalho-vida'.",
  },
];

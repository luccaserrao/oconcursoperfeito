import { QuizQuestion } from "@/types/quiz";

const LIKERT_OPTIONS = [
  "Discordo totalmente",
  "Discordo",
  "Neutro",
  "Concordo",
  "Concordo totalmente",
];

export const quizQuestions: QuizQuestion[] = [
  // ===== PARTE 1: Perfil RIASEC (15 perguntas - LIKERT) =====
  { id: "riasec_1", type: "likert", question: "Você prefere resolver problemas práticos com suas próprias mãos do que lidar com pessoas?", options: LIKERT_OPTIONS },
  { id: "riasec_2", type: "likert", question: "Você gosta de pesquisar, entender como as coisas funcionam e encontrar soluções lógicas?", options: LIKERT_OPTIONS },
  { id: "riasec_3", type: "likert", question: "Você se sente mais realizado criando, desenhando ou inovando ideias?", options: LIKERT_OPTIONS },
  { id: "riasec_4", type: "likert", question: "Você gosta de ensinar, orientar pessoas e se comunicar?", options: LIKERT_OPTIONS },
  { id: "riasec_5", type: "likert", question: "Prefere seguir regras claras e trabalhar com organização e processos definidos?", options: LIKERT_OPTIONS },
  { id: "riasec_6", type: "likert", question: "Prefiro aprender fazendo, colocando a mão na massa em vez de apenas ouvir explicações.", options: LIKERT_OPTIONS },
  { id: "riasec_7", type: "likert", question: "Gosto de entender o motivo por trás das coisas e resolver problemas usando raciocínio lógico.", options: LIKERT_OPTIONS },
  { id: "riasec_8", type: "likert", question: "Sinto prazer em criar algo novo, diferente ou original — mesmo que as pessoas não entendam de imediato.", options: LIKERT_OPTIONS },
  { id: "riasec_9", type: "likert", question: "Fico feliz quando consigo ajudar alguém a compreender algo ou se sentir melhor com o que ensinei.", options: LIKERT_OPTIONS },
  { id: "riasec_10", type: "likert", question: "Gosto de influenciar pessoas e inspirar outros a acreditarem em uma ideia ou projeto.", options: LIKERT_OPTIONS },
  { id: "riasec_11", type: "likert", question: "Gosto de trabalhar ao ar livre ou com ferramentas/equipamentos.", options: LIKERT_OPTIONS },
  { id: "riasec_12", type: "likert", question: "Curto analisar dados, buscar padrões e tirar conclusões.", options: LIKERT_OPTIONS },
  { id: "riasec_13", type: "likert", question: "Prefiro ter liberdade e autonomia para criar e experimentar soluções.", options: LIKERT_OPTIONS },
  { id: "riasec_14", type: "likert", question: "Sinto satisfação em orientar, escutar e oferecer suporte direto às pessoas.", options: LIKERT_OPTIONS },
  { id: "riasec_15", type: "likert", question: "Gosto de organizar planilhas, checklists e documentos para manter tudo em ordem.", options: LIKERT_OPTIONS },

  // ===== PARTE 2: Escolha do Concurso Ideal (9 perguntas - MULTIPLE CHOICE) =====
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
  {
    id: "q6",
    type: "multiple-choice",
    question: "Em relação ao salário, qual faixa inicial você busca?",
    options: [
      "R$ 2.000 a R$ 4.000",
      "R$ 4.000 a R$ 8.000",
      "R$ 8.000 a R$ 15.000",
      "Acima de R$ 15.000",
    ],
  },
  {
    id: "q7",
    type: "multiple-choice",
    question: "Você está disposto a mudar de cidade para alcançar o cargo ideal?",
    options: [
      "Prefiro vagas apenas na minha cidade",
      "Aceito vagas em cidades próximas (mesma região)",
      "Aceito vagas em qualquer lugar do meu estado",
      "Tenho disponibilidade total para mudança",
    ],
  },
  {
    id: "q8",
    type: "multiple-choice",
    question: "Em relação à jornada de trabalho, você prefere carga horária fixa ou escalas de plantão?",
    options: [
      "20 a 30 horas semanais",
      "40 horas semanais (período integral)",
      "Regime de plantão (escala de trabalho)",
      "Não tenho preferência específica",
    ],
  },
  {
    id: "q9",
    type: "multiple-choice",
    question: "Você tem interesse em carreiras com porte de arma ou funções de segurança?",
    options: [
      "Sim, tenho interesse em carreiras policiais",
      "Tenho interesse em segurança, mas em cargos administrativos",
      "Não tenho interesse",
    ],
  },

  // ===== PARTE 3: Preparação e Interesse no Produto (3 perguntas - MULTIPLE CHOICE) =====
  {
    id: "q10",
    type: "multiple-choice",
    question: "Como você avalia sua preparação hoje para o concurso ideal?",
    options: [
      "Estou começando agora e me sinto perdido",
      "Já estudo há um tempo, mas sem direção clara",
      "Tenho um plano sólido de estudos",
    ],
  },
  {
    id: "q11",
    type: "multiple-choice",
    question: "Você sabia que candidatos que estudam com auxílio de Inteligência Artificial têm até 3x mais chances de aprovação?",
    options: [
      "Sim, já sabia disso",
      "Não sabia, mas faz sentido",
      "Não acredito muito nisso",
    ],
  },
  {
    id: "q12",
    type: "multiple-choice",
    question: "Se existe um guia personalizado com IA, mostrando o que mais cai na prova e um plano de estudo feito sob medida por apenas R$50, você:",
    options: [
      "Investiria agora para aumentar minhas chances",
      "Gostaria de saber mais antes de decidir",
      "Não compraria no momento",
    ],
  },
];

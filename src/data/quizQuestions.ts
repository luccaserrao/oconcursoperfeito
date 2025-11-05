import { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  // ===== RIASEC - 5 PERGUNTAS (ESCALA LIKERT) =====
  {
    id: "riasec_1",
    question: "Você prefere resolver problemas práticos com suas próprias mãos do que lidar com pessoas?",
    type: "likert",
    options: [
      "Discordo totalmente",
      "Discordo",
      "Neutro",
      "Concordo",
      "Concordo totalmente"
    ]
  },
  {
    id: "riasec_2",
    question: "Você gosta de pesquisar, entender como as coisas funcionam e encontrar soluções lógicas?",
    type: "likert",
    options: [
      "Discordo totalmente",
      "Discordo",
      "Neutro",
      "Concordo",
      "Concordo totalmente"
    ]
  },
  {
    id: "riasec_3",
    question: "Você se sente mais realizado criando, desenhando ou inovando ideias?",
    type: "likert",
    options: [
      "Discordo totalmente",
      "Discordo",
      "Neutro",
      "Concordo",
      "Concordo totalmente"
    ]
  },
  {
    id: "riasec_4",
    question: "Você gosta de ensinar, orientar pessoas e se comunicar?",
    type: "likert",
    options: [
      "Discordo totalmente",
      "Discordo",
      "Neutro",
      "Concordo",
      "Concordo totalmente"
    ]
  },
  {
    id: "riasec_5",
    question: "Prefere seguir regras claras e trabalhar com organização e processos definidos?",
    type: "likert",
    options: [
      "Discordo totalmente",
      "Discordo",
      "Neutro",
      "Concordo",
      "Concordo totalmente"
    ]
  },
  
  // ===== PERGUNTAS ORIGINAIS (20 PERGUNTAS) =====
  {
    id: "q1",
    question: "Qual é o seu nível de escolaridade atual?",
    type: "multiple-choice",
    options: [
      "Ensino Fundamental completo ou em andamento",
      "Ensino Médio completo ou em andamento",
      "Ensino Superior completo ou em andamento",
      "Pós-graduação (especialização, mestrado ou doutorado)"
    ]
  },
  {
    id: "q2",
    question: "Você prefere trabalhar mais com:",
    type: "multiple-choice",
    options: [
      "Atendimento ao público e relacionamento interpessoal",
      "Análise de documentos e processos administrativos",
      "Fiscalização e aplicação de normas",
      "Ensino e desenvolvimento de pessoas",
      "Saúde e cuidado com pessoas"
    ]
  },
  {
    id: "q3",
    question: "Em relação ao salário, você busca uma faixa inicial de:",
    type: "multiple-choice",
    options: [
      "R$ 2.000 a R$ 4.000",
      "R$ 4.000 a R$ 8.000",
      "R$ 8.000 a R$ 15.000",
      "Acima de R$ 15.000"
    ]
  },
  {
    id: "q4",
    question: "Quanto tempo você pode dedicar aos estudos por semana?",
    type: "multiple-choice",
    options: [
      "Menos de 10 horas",
      "10 a 20 horas",
      "20 a 30 horas",
      "Mais de 30 horas (dedicação exclusiva)"
    ]
  },
  {
    id: "q5",
    question: "Você tem mais facilidade com:",
    type: "multiple-choice",
    options: [
      "Matérias de Humanas (Português, Direito, História)",
      "Matérias de Exatas (Matemática, Raciocínio Lógico, Estatística)",
      "Matérias Técnicas específicas (Informática, Contabilidade, Engenharia)",
      "Tenho facilidade equilibrada em todas as áreas"
    ]
  },
  {
    id: "q6",
    question: "Qual ambiente de trabalho você prefere?",
    type: "multiple-choice",
    options: [
      "Escritório administrativo com rotina estável",
      "Trabalho externo com deslocamentos e fiscalização",
      "Ambiente hospitalar ou de saúde",
      "Instituição de ensino (escola, universidade)",
      "Órgãos de segurança pública"
    ]
  },
  {
    id: "q7",
    question: "Você se sente mais confortável em cargos que exigem:",
    type: "multiple-choice",
    options: [
      "Trabalho em equipe e colaboração constante",
      "Autonomia e trabalho individual",
      "Liderança e tomada de decisões",
      "Execução de tarefas técnicas especializadas"
    ]
  },
  {
    id: "q8",
    question: "Qual é a sua disponibilidade para mudança de cidade?",
    type: "multiple-choice",
    options: [
      "Prefiro vagas apenas na minha cidade",
      "Aceito vagas em cidades próximas (mesma região)",
      "Aceito vagas em qualquer lugar do meu estado",
      "Tenho disponibilidade para todo o Brasil"
    ]
  },
  {
    id: "q9",
    question: "Você tem experiência ou formação em qual área?",
    type: "multiple-choice",
    options: [
      "Área da Saúde (Enfermagem, Medicina, Odontologia, etc.)",
      "Área Jurídica (Direito)",
      "Área Administrativa (Administração, Contabilidade, Gestão)",
      "Área de Engenharia ou Tecnologia",
      "Área de Educação",
      "Não tenho formação específica ainda"
    ]
  },
  {
    id: "q10",
    question: "Qual é o seu principal objetivo ao passar em um concurso?",
    type: "multiple-choice",
    options: [
      "Estabilidade financeira e segurança no emprego",
      "Alto salário e possibilidade de crescimento",
      "Contribuir com a sociedade e fazer diferença",
      "Qualidade de vida e equilíbrio trabalho-vida pessoal"
    ]
  },
  {
    id: "q11",
    question: "Você se interessa por cargos que envolvem:",
    type: "multiple-choice",
    options: [
      "Investigação e análise de crimes",
      "Fiscalização tributária e financeira",
      "Assistência social e políticas públicas",
      "Planejamento e gestão de projetos",
      "Nenhuma dessas atividades específicas"
    ]
  },
  {
    id: "q12",
    question: "Qual nível de concorrência você está disposto a enfrentar?",
    type: "multiple-choice",
    options: [
      "Prefiro concursos com menor concorrência (mais chances)",
      "Aceito concorrência moderada",
      "Estou disposto a enfrentar alta concorrência por um cargo melhor",
      "Concorrência não é um fator decisivo para mim"
    ]
  },
  {
    id: "q13",
    question: "Você prefere concursos com provas que incluem:",
    type: "multiple-choice",
    options: [
      "Apenas prova objetiva (múltipla escolha)",
      "Prova objetiva + discursiva",
      "Prova objetiva + discursiva + prova de títulos",
      "Não me importo com o formato"
    ]
  },
  {
    id: "q14",
    question: "Em relação à jornada de trabalho, você prefere:",
    type: "multiple-choice",
    options: [
      "20 a 30 horas semanais",
      "40 horas semanais (período integral)",
      "Regime de plantão (escala de trabalho)",
      "Não tenho preferência específica"
    ]
  },
  {
    id: "q15",
    question: "Qual a sua idade atual?",
    type: "multiple-choice",
    options: [
      "18 a 25 anos",
      "26 a 35 anos",
      "36 a 45 anos",
      "Acima de 45 anos"
    ]
  },
  {
    id: "q16",
    question: "Você tem interesse em cargos que exigem porte de arma?",
    type: "multiple-choice",
    options: [
      "Sim, tenho interesse em carreiras policiais/militares",
      "Talvez, dependendo do cargo",
      "Não tenho interesse"
    ]
  },
  {
    id: "q17",
    question: "Como você lida com pressão e prazos apertados?",
    type: "multiple-choice",
    options: [
      "Prefiro ambientes com menos pressão e rotina mais tranquila",
      "Lido bem com pressão moderada",
      "Funciono melhor sob pressão e desafios constantes"
    ]
  },
  {
    id: "q18",
    question: "Você sabia que candidatos que estudam com auxílio de Inteligência Artificial têm até 3x mais chances de aprovação?",
    type: "multiple-choice",
    options: [
      "Sim, já sabia disso",
      "Não sabia, mas faz sentido",
      "Não acredito muito nisso"
    ]
  },
  {
    id: "q19",
    question: "Como você avalia sua preparação hoje para o concurso ideal?",
    type: "multiple-choice",
    options: [
      "Estou começando agora e me sinto perdido",
      "Já estudo há um tempo, mas sem direção clara",
      "Tenho um plano sólido de estudos"
    ]
  },
  {
    id: "q20",
    question: "Se existisse um guia personalizado com IA, mostrando o que mais cai na prova e um plano de estudo feito sob medida, por apenas R$50, você:",
    type: "multiple-choice",
    options: [
      "Investiria agora para aumentar minhas chances",
      "Gostaria de saber mais antes de decidir",
      "Não investiria no momento"
    ]
  }
];

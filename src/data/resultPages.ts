export type ResultPage = {
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    badge?: string;
    ctaLabel: string;
    ctaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  painPoints: string[];
  benefits: string[];
  fitProfile: string[];
  avoidProfile: string[];
  recommendedExams: string[];
  studyPlan: {
    focus: string;
    hours: string;
    roadmap: string[];
  };
  faqs: Array<{ question: string; answer: string }>;
  cta: {
    label: string;
    href: string;
  };
};

export const RESULT_PAGES: ResultPage[] = [
  {
    slug: "area-administrativa",
    title: "Resultado: Área Administrativa — Concursos com ritmo previsível e organização",
    metaDescription:
      "Perfil alinhado à Área Administrativa. Concursos com rotina estruturada, progressão clara e menor exposição a risco. Veja próximos editais e plano de estudos.",
    keywords: [
      "área administrativa",
      "concursos administrativos",
      "técnico administrativo",
      "analista administrativo",
      "rotina de escritório",
    ],
    hero: {
      eyebrow: "Direção indicada",
      heading: "Você combina com a Área Administrativa",
      subheading:
        "Ambiente organizado, entregas previsíveis e estabilidade. Foque em editais com rotina de escritório, análise de processos e atendimento interno.",
      badge: "Resultado gratuito",
      ctaLabel: "Refazer o teste com foco administrativo",
      ctaHref: "/",
      secondaryCtaLabel: "Ver plano completo (R$25)",
      secondaryCtaHref: "/paid-content",
    },
    painPoints: [
      "Falta de clareza sobre quais órgãos priorizar",
      "Rotina de estudos irregular e sem horas mínimas",
      "Dificuldade para memorizar legislação básica",
      "Pouco tempo para revisar exercícios comentados",
    ],
    benefits: [
      "Editais frequentes e com programas estáveis",
      "Rotina previsível, sem escala de plantão",
      "Progressão e gratificações por produtividade",
      "Equilíbrio entre vida pessoal e trabalho",
    ],
    fitProfile: [
      "Gosta de processos claros e checklists",
      "Valoriza estabilidade e previsibilidade",
      "Consegue lidar com atendimento interno e protocolar",
      "Prefere tarefas analíticas e documentação",
    ],
    avoidProfile: [
      "Busca muita adrenalina e trabalho de rua",
      "Não gosta de ambientes normativos",
      "Prefere decisões rápidas com alto risco",
    ],
    recommendedExams: [
      "Administrativo — Universidades e IFs",
      "Administrativo — Ministérios e Autarquias",
      "Administrativo — Prefeituras de capitais",
      "BACEN (área meio) e BNDES (técnico)",
    ],
    studyPlan: {
      focus: "Legislação básica + Administração + Português",
      hours: "2h a 3h/dia, 5x por semana",
      roadmap: [
        "Bloco 1 (2 semanas): Português + Ética no serviço público",
        "Bloco 2 (2 semanas): Administração Pública + Noções de Direito Adm.",
        "Bloco 3 (2 semanas): Raciocínio Lógico + Informática",
        "Simulados quinzenais com foco em tempo por questão",
      ],
    },
    faqs: [
      {
        question: "Quais matérias priorizar primeiro?",
        answer:
          "Português, Administração Pública, Ética e Direito Administrativo formam a base comum. Depois, ajuste conforme edital-alvo.",
      },
      {
        question: "Preciso de pós-graduação?",
        answer:
          "Para cargos técnicos, não. Para analista, graduação é suficiente na maioria dos órgãos.",
      },
      {
        question: "Quanto tempo até ficar competitivo?",
        answer:
          "Com 2-3h/dia consistentes, em 4 a 6 meses você tende a ganhar ritmo de prova e nota de corte competitiva.",
      },
    ],
    cta: {
      label: "Quero meu plano completo",
      href: "/paid-content",
    },
  },
  {
    slug: "area-tribunais",
    title: "Resultado: Área de Tribunais — estabilidade com bons benefícios",
    metaDescription:
      "Perfil indicado para concursos de Tribunais. Benefícios robustos, carreira estruturada e ambiente jurídico-organizacional. Confira próximos editais e plano de estudo.",
    keywords: [
      "concursos tribunais",
      "TJ TRT TRE TRF",
      "carreira judiciária",
      "técnico judiciário",
      "analista judiciário",
    ],
    hero: {
      eyebrow: "Direção indicada",
      heading: "Você se encaixa na Área de Tribunais",
      subheading:
        "Rotina jurídica, benefícios acima da média e ambiente de precisão técnica. Ideal para quem gosta de normas claras e procedimentos.",
      badge: "Resultado gratuito",
      ctaLabel: "Refazer o teste focando tribunais",
      ctaHref: "/",
      secondaryCtaLabel: "Ver plano completo (R$25)",
      secondaryCtaHref: "/paid-content",
    },
    painPoints: [
      "Volume alto de legislação específica por tribunal",
      "Provas longas com gestão de tempo apertada",
      "Concorrência alta em capitais",
      "Dificuldade em manter revisões espaçadas",
    ],
    benefits: [
      "Benefícios e remuneração consistentes",
      "Jornada estável e menor exposição a risco",
      "Carreira estruturada com remoções internas",
      "Ambiente técnico e organizado",
    ],
    fitProfile: [
      "Aprecia detalhamento de normas e procedimentos",
      "Gosta de estabilidade e rotina previsível",
      "Consegue estudar jurisprudência e letra de lei",
      "Boa gestão de tempo em provas longas",
    ],
    avoidProfile: [
      "Busca trabalho em campo ou com viaturas",
      "Não gosta de leitura densa",
      "Prefere decisões rápidas com pouca formalidade",
    ],
    recommendedExams: [
      "TJ estaduais — técnicos e analistas",
      "TRT — área judiciária e administrativa",
      "TRE — técnico e analista judiciário",
      "TRF — apoio administrativo",
    ],
    studyPlan: {
      focus: "Português + Direito Constitucional + Administrativo + Processo (conforme tribunal)",
      hours: "3h/dia em blocos de 50 minutos",
      roadmap: [
        "Bloco 1 (2 semanas): Português + Constitucional",
        "Bloco 2 (2 semanas): Administrativo + Ética",
        "Bloco 3 (2 semanas): Processo (Civil/Trabalho/Eleitoral conforme alvo)",
        "Simulados semanais com marcação de tempo por disciplina",
      ],
    },
    faqs: [
      {
        question: "Qual tribunal priorizar primeiro?",
        answer:
          "Escolha pelo critério proximidade + edital provável. TRT e TRE costumam alternar bons ciclos; TJ tem frequência estadual.",
      },
      {
        question: "Preciso dominar jurisprudência?",
        answer:
          "Para cargos técnicos, letra de lei e súmulas principais resolvem. Para analista, inclua informativos selecionados.",
      },
      {
        question: "Vale fazer provas em outros estados?",
        answer:
          "Sim, amplia chances e experiência de prova. Use roteiros de viagem e simulados focados no edital específico.",
      },
    ],
    cta: {
      label: "Quero meu plano completo",
      href: "/paid-content",
    },
  },
  {
    slug: "area-policial",
    title: "Resultado: Área Policial — ação, rua e operação",
    metaDescription:
      "Perfil aderente à Área Policial. Rotina de campo, investigação e cumprimento de metas. Veja editais previstos e plano de preparação física + teórica.",
    keywords: [
      "concursos policiais",
      "polícia civil",
      "polícia federal",
      "agente policial",
      "carreira policial",
    ],
    hero: {
      eyebrow: "Direção indicada",
      heading: "Você tem perfil para a Área Policial",
      subheading:
        "Ambiente dinâmico, decisões rápidas e trabalho em campo. Combine preparo físico com teoria para ficar pronto para TAF e prova objetiva.",
      badge: "Resultado gratuito",
      ctaLabel: "Refazer o teste focando área policial",
      ctaHref: "/",
      secondaryCtaLabel: "Ver plano completo (R$25)",
      secondaryCtaHref: "/paid-content",
    },
    painPoints: [
      "Conciliar treino físico e estudo teórico",
      "Gestão de tempo para alto volume de questões",
      "Legislação penal e processual extensa",
      "Ansiedade com TAF e investigação social",
    ],
    benefits: [
      "Adrenalina de operações e resultados rápidos",
      "Carreira com adicionais e progressão por cursos",
      "Diversidade de lotações (investigação, inteligência, operação)",
      "Respeito institucional e impacto direto",
    ],
    fitProfile: [
      "Gosta de trabalho de campo e ação",
      "Suporta rotina de turnos e plantões",
      "Disciplina para treinar e estudar diariamente",
      "Consegue lidar com pressão e protocolos",
    ],
    avoidProfile: [
      "Prefere rotina 100% administrativa",
      "Não gosta de uso de força ou confronto",
      "Baixa tolerância a plantões noturnos",
    ],
    recommendedExams: [
      "Polícia Civil (Agente/Escrivão) — estaduais",
      "PRF — Policial Rodoviário Federal",
      "PF — Agente Administrativo / Agente de Polícia",
      "Polícias Penais estaduais",
    ],
    studyPlan: {
      focus: "Penal + Processo Penal + Legislação Especial + Português + Informática",
      hours: "3h teóricas + 40 min físicos, 5x semana",
      roadmap: [
        "Manhã/Noite: 2 blocos teóricos (50 min) + 1 bloco de questões",
        "Treino físico: 4 a 5 sessões (corrida + barra + core)",
        "Revisão: mapas mentais e flashcards de leis secas",
        "Simulados mensais incluindo TAF em dia separado",
      ],
    },
    faqs: [
      {
        question: "Como dividir treino e estudo?",
        answer:
          "Use blocos curtos (50 min) e treinos de 40-50 min. Dias pesados de físico, reduza uma disciplina teórica.",
      },
      {
        question: "TAF elimina muito?",
        answer:
          "Sim. Antecipe preparação física já no início para evitar reprovação por falta de condicionamento.",
      },
      {
        question: "Preciso decorar toda a lei seca?",
        answer:
          "Foque em artigos mais cobrados (crimes em espécie, inquérito, prova, prisão) e legislação especial do edital.",
      },
    ],
    cta: {
      label: "Quero meu plano completo",
      href: "/paid-content",
    },
  },
  {
    slug: "area-fiscal",
    title: "Resultado: Área Fiscal — alta remuneração e cobrança por performance",
    metaDescription:
      "Perfil para Área Fiscal. Provas densas, raciocínio lógico e legislação tributária. Veja editais-alvo e plano de estudos intensivo.",
    keywords: [
      "área fiscal",
      "auditor fiscal",
      "receita federal",
      "secretaria de fazenda",
      "tce tcm",
    ],
    hero: {
      eyebrow: "Direção indicada",
      heading: "Seu perfil encaixa na Área Fiscal",
      subheading:
        "Ambiente analítico, metas e alta remuneração. Exige disciplina para volume de matérias e consistência em questões.",
      badge: "Resultado gratuito",
      ctaLabel: "Refazer o teste focando área fiscal",
      ctaHref: "/",
      secondaryCtaLabel: "Ver plano completo (R$25)",
      secondaryCtaHref: "/paid-content",
    },
    painPoints: [
      "Carga pesada de disciplinas exatas e legislação tributária",
      "Gestão de tempo para 10+ matérias em paralelo",
      "Pressão por alto desempenho em simulados",
      "Manter motivação em ciclo longo de estudos",
    ],
    benefits: [
      "Salários e bônus acima da média do serviço público",
      "Carreira com mobilidade e especialização",
      "Uso de dados e tecnologia no dia a dia",
      "Reconhecimento técnico e impacto arrecadatório",
    ],
    fitProfile: [
      "Gosta de números, dados e leis ao mesmo tempo",
      "Suporta rotina intensa e metas exigentes",
      "Organizado para ciclos longos de estudo",
      "Curioso para entender negócios e fiscalizar processos",
    ],
    avoidProfile: [
      "Baixa tolerância a alta carga de estudo",
      "Não gosta de disciplinas exatas",
      "Prefere rotina sem metas agressivas",
    ],
    recommendedExams: [
      "Receita Federal (Auditor/Analista)",
      "SEFAZ estaduais (ICMS/IPVA)",
      "Secretarias municipais de finanças (ISS)",
      "Tribunais de Contas (TCE/TCM) área de controle",
    ],
    studyPlan: {
      focus: "Tributário + Constitucional + Administrativo + Contabilidade + Raciocínio Lógico/Matemática",
      hours: "4h/dia (2 blocos manhã, 2 blocos noite)",
      roadmap: [
        "Ciclo 1 (3 semanas): Constitucional, Administrativo, Português, RLM",
        "Ciclo 2 (3 semanas): Contabilidade Geral + Avançada (bases) + Estatística",
        "Ciclo 3 (3 semanas): Direito Tributário + Legislação específica do estado/município",
        "Simulados quinzenais integrando 8-10 matérias; revisão por flashcards",
      ],
    },
    faqs: [
      {
        question: "Quanto tempo para ficar pronto?",
        answer:
          "Com 4h/dia consistentes, 8-12 meses é uma média para chegar competitivo em editais de nível estadual.",
      },
      {
        question: "Preciso começar por Contabilidade?",
        answer:
          "Sim, é base para a área fiscal. Inicie com contabilidade geral e avance para custos/avançada na sequência.",
      },
      {
        question: "Vale usar materiais resumidos?",
        answer:
          "Use resumos só após primeira volta completa. Para exatas, priorize exercícios e revisões espaçadas.",
      },
    ],
    cta: {
      label: "Quero meu plano completo",
      href: "/paid-content",
    },
  },
];

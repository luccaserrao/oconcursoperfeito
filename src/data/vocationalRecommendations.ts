import { RiasecScores, RiasecType } from "@/types/quiz";

export type CareerCluster = {
  id: string;
  title: string;
  description: string;
  tags: RiasecType[];
  careers: string[];
};

export type CareerClusterResult = CareerCluster & {
  affinity: number;
};

export const CAREER_CLUSTERS: CareerCluster[] = [
  {
    id: "tech-dados",
    title: "Tecnologia e Dados",
    description: "Perfis analiticos e organizados que gostam de resolver problemas complexos.",
    tags: ["Investigativo", "Convencional"],
    careers: ["Analista de dados", "Engenheiro de software", "Cientista de dados"],
  },
  {
    id: "saude-bem-estar",
    title: "Saude e Bem-estar",
    description: "Combina interesse por pessoas com atividades praticas e foco em cuidado.",
    tags: ["Social", "Realista"],
    careers: ["Fisioterapeuta", "Enfermeiro", "Educador fisico"],
  },
  {
    id: "criacao-comunicacao",
    title: "Criacao e Comunicacao",
    description: "Ideias originais, expressao e capacidade de engajar pessoas.",
    tags: ["Artístico", "Empreendedor"],
    careers: ["Designer", "Produtor de conteudo", "Diretor de arte"],
  },
  {
    id: "educacao-desenvolvimento",
    title: "Educacao e Desenvolvimento Humano",
    description: "Perfis que gostam de orientar, ensinar e gerar impacto humano.",
    tags: ["Social", "Investigativo"],
    careers: ["Professor", "Psicologo", "Pedagogo"],
  },
  {
    id: "negocios-gestao",
    title: "Negocios e Gestao",
    description: "Organizacao, metas e lideranca para tomar decisoes com impacto.",
    tags: ["Empreendedor", "Convencional"],
    careers: ["Gestor de projetos", "Consultor", "Analista de negocios"],
  },
  {
    id: "operacoes-qualidade",
    title: "Operacoes e Qualidade",
    description: "Perfis praticos que gostam de processos, padroes e execucao.",
    tags: ["Realista", "Convencional"],
    careers: ["Tecnico industrial", "Coordenador de operacoes", "Analista de qualidade"],
  },
  {
    id: "pesquisa-estrategia",
    title: "Pesquisa e Estrategia",
    description: "Curiosidade, investigacao e visao de negocio.",
    tags: ["Investigativo", "Empreendedor"],
    careers: ["Estrategista", "Pesquisador de mercado", "UX Researcher"],
  },
  {
    id: "experiencia-design",
    title: "Experiencia e Design",
    description: "Criacao, empatia e analise para construir solucoes melhores.",
    tags: ["Artístico", "Investigativo"],
    careers: ["UX/UI Designer", "Arquiteto de informacao", "Ilustrador"],
  },
  {
    id: "relacionamento-vendas",
    title: "Relacionamento e Vendas",
    description: "Influenciar, negociar e construir relacoes duradouras.",
    tags: ["Social", "Empreendedor"],
    careers: ["Executivo de contas", "Customer success", "Recrutador"],
  },
];

const buildFallbackScores = (top1: RiasecType, top2: RiasecType): RiasecScores => {
  const base: RiasecScores = {
    Realista: 55,
    Investigativo: 55,
    Artístico: 55,
    Social: 55,
    Empreendedor: 55,
    Convencional: 55,
  };

  base[top1] = 88;
  base[top2] = 76;
  return base;
};

export const getVocationalClusters = (
  scores: RiasecScores | undefined,
  top1: RiasecType,
  top2: RiasecType,
): CareerClusterResult[] => {
  const safeScores = scores || buildFallbackScores(top1, top2);

  const ranked = CAREER_CLUSTERS.map((cluster) => {
    const baseScore =
      cluster.tags.reduce((sum, tag) => sum + (safeScores[tag] || 0), 0) / cluster.tags.length;
    const bonus = (cluster.tags.includes(top1) ? 5 : 0) + (cluster.tags.includes(top2) ? 3 : 0);
    const affinity = Math.min(98, Math.max(45, Math.round(baseScore + bonus)));

    return {
      ...cluster,
      affinity,
    };
  })
    .sort((a, b) => b.affinity - a.affinity)
    .slice(0, 3);

  return ranked;
};

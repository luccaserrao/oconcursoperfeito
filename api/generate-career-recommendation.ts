import type { VercelRequest, VercelResponse } from "@vercel/node";

type RiasecDimension =
  | "Realista"
  | "Investigativo"
  | "Artístico"
  | "Social"
  | "Empreendedor"
  | "Convencional";

type QuizAnswer = {
  question: string;
  answer: string;
  id?: string;
  riasecType?: RiasecDimension;
};

type BodyType = {
  answers: QuizAnswer[];
  name: string;
  email: string;
  whatsapp: string;
};

const descriptions: Record<RiasecDimension, string> = {
  Realista:
    "Você prefere atividades práticas, operacionais e concretas. Perfis Realistas combinam com concursos de áreas estruturadas, operacionais e rotinas claras.",
  Investigativo:
    "Você gosta de analisar, entender e resolver problemas complexos. Perfis Investigativos se destacam em áreas fiscais, controle, TI e carreiras de análise.",
  Artístico:
    "Você valoriza criatividade, expressão e inovação. Perfis Artísticos combinam com comunicação, cultura e ambientes menos rígidos.",
  Social:
    "Você gosta de ajudar, orientar e interagir. Perfis Sociais se dão bem em concursos de atendimento, assistência, educação e saúde.",
  Empreendedor:
    "Você gosta de liderar, influenciar e tomar decisões. Perfis Empreendedores combinam com gestão, liderança e carreiras com autonomia.",
  Convencional:
    "Você gosta de organização, rotina, precisão e estrutura. Perfis Convencionais se destacam em áreas administrativas, financeiras e cartoriais.",
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });

    const body: BodyType = req.body;

    if (!body || !Array.isArray(body.answers)) {
      return res
        .status(400)
        .json({ error: "Invalid body. Expected answers: QuizAnswer[]" });
    }

    const score: Record<RiasecDimension, number> = {
      Realista: 0,
      Investigativo: 0,
      Artístico: 0,
      Social: 0,
      Empreendedor: 0,
      Convencional: 0,
    };

    for (const ans of body.answers) {
      if (ans.riasecType && score[ans.riasecType] !== undefined) {
        score[ans.riasecType] += 1;
      }
    }

    const sorted = Object.entries(score).sort((a, b) => b[1] - a[1]);

    const top1 =
      sorted[0][0] as RiasecDimension;
    const top2 =
      sorted[1][0] as RiasecDimension;

    const recommendation = `
Seu perfil RIASEC mostra forte predominância em **${top1}**, seguido por **${top2}**.

${descriptions[top1]}

O fator secundário, **${top2}**, reforça suas forças naturais e ajuda você a se destacar em concursos que valorizam esse tipo de habilidade.

Com esse perfil, foque em concursos que valorizam essas características para aumentar suas chances de aprovação.
`.trim();

    res.status(200).json({
      profile: { top1, top2, score },
      recommendation,
    });
  } catch (err: any) {
    res.status(500).json({
      error: "Server error",
      details: err?.message || String(err),
    });
  }
}

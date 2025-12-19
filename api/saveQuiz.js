import { supabase } from "./supabaseClient.js";

const parseBody = (payload) => {
  if (!payload) return {};
  if (typeof payload === "string") {
    try {
      return JSON.parse(payload);
    } catch {
      return {};
    }
  }
  return payload;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo nao permitido" });
    return;
  }

  if (!supabase) {
    res.status(500).json({ error: "Supabase credentials missing in environment." });
    return;
  }

  try {
    const body = parseBody(req.body);
    const name = body.name || body.user_name;
    const email = body.email || body.user_email;
    const whatsapp = body.whatsapp || null;
    const answers = body.answers || body.answers_json || [];
    const aiRecommendation =
      body.ai_recommendation ||
      (body.riasec_json ? { riasec: body.riasec_json } : null);

    if (!name || !email) {
      res.status(400).json({ error: "Nome e email obrigatorios." });
      return;
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      res.status(400).json({ error: "Respostas do quiz obrigatorias." });
      return;
    }

    const { data, error } = await supabase
      .from("quiz_responses")
      .insert({
        name,
        email,
        whatsapp,
        answers,
        ai_recommendation: aiRecommendation || {},
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      res.status(500).json({ error: "Erro ao salvar no Supabase." });
      return;
    }

    res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

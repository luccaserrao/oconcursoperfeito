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
    const { user_name, user_email, riasec_json, answers_json } = parseBody(req.body);

    if (!user_name || !user_email) {
      res.status(400).json({ error: "Nome e email obrigatorios." });
      return;
    }

    const { data, error } = await supabase
      .from("quiz_responses")
      .insert({
        user_name,
        user_email,
        riasec_json,
        answers_json,
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

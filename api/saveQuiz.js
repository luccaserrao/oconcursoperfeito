import { supabase } from "../src/lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { user_name, user_email, riasec_json, answers_json } = req.body;

  const { data, error } = await supabase
    .from("quiz_responses")
    .insert([
      {
        user_name,
        user_email,
        riasec_json,
        answers_json,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro ao salvar quiz:", error);
    return res.status(500).json({ error: "Erro ao salvar quiz" });
  }

  return res.status(200).json({ quiz_response: data });
}

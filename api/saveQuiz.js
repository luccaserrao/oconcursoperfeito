const { supabase } = require("./supabaseclient");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Método não permitido" });
      return;
    }

    const { user_name, user_email, riasec_json, answers_json } = req.body;

    if (!user_name || !user_email) {
      res.status(400).json({ error: "Nome e email obrigatórios." });
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
};

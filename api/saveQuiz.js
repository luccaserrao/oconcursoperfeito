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
    const riasec = body.riasec || body.riasec_json || null;
    const quizVersion = body.quiz_version || body.quizVersion || null;
    const macroAreaResult = body.macro_area_result || body.macroAreaResult || null;
    const clickedUpsell = body.clickedUpsell ?? body.clicked_upsell;
    const quizSessionId = body.quiz_session_id || null;
    const source = body.source || null;
    const utmSource = body.utm_source || null;
    const utmMedium = body.utm_medium || null;
    const utmCampaign = body.utm_campaign || null;
    const utmContent = body.utm_content || null;
    const utmTerm = body.utm_term || null;
    const referrer = body.referrer || null;
    const landingPath = body.landing_path || null;

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
        user_name: name,
        user_email: email,
        answers_json: answers,
        riasec_json: riasec,
        ...(quizVersion ? { quiz_version: quizVersion } : {}),
        ...(macroAreaResult != null ? { macro_area_result: macroAreaResult } : {}),
        ...(quizSessionId ? { quiz_session_id: quizSessionId } : {}),
        ...(source ? { source } : {}),
        ...(utmSource ? { utm_source: utmSource } : {}),
        ...(utmMedium ? { utm_medium: utmMedium } : {}),
        ...(utmCampaign ? { utm_campaign: utmCampaign } : {}),
        ...(utmContent ? { utm_content: utmContent } : {}),
        ...(utmTerm ? { utm_term: utmTerm } : {}),
        ...(referrer ? { referrer } : {}),
        ...(landingPath ? { landing_path: landingPath } : {}),
        ...(whatsapp ? { whatsapp } : {}),
        ...(typeof clickedUpsell === "boolean" ? { clicked_upsell: clickedUpsell } : {}),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      res.status(500).json({ error: "Erro ao salvar no Supabase." });
      return;
    }

    try {
      await supabase.functions.invoke("schedule-email-sequence", {
        body: {
          quizResponseId: data.id,
          userEmail: email,
          userName: name,
        },
      });
    } catch (scheduleError) {
      console.error("Falha ao agendar sequencia de emails:", scheduleError);
    }

    res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

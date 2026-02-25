// Proxy local API -> Supabase Edge Function for career recommendation/quiz save
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo nao permitido" });
    return;
  }

  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    "";
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  if (!supabaseUrl || !supabaseKey) {
    res.status(500).json({ error: "Variaveis do Supabase ausentes" });
    return;
  }

  const fnUrl = `${supabaseUrl.replace(/\/$/, "")}/functions/v1/generate-career-recommendation`;

  try {
    const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
    let parsed;
    try {
      parsed = typeof rawBody === "string" ? JSON.parse(rawBody || "{}") : rawBody || {};
    } catch {
      parsed = {};
    }

    const skipEmailSequence =
      parsed.skip_email_sequence === true ||
      parsed.skip_email_sequence === "true" ||
      parsed.skipEmailSequence === true ||
      parsed.skipEmailSequence === "true";

    const payload = {
      name: parsed.name || parsed.user_name || "",
      email: parsed.email || parsed.user_email || "",
      answers: parsed.answers || parsed.answers_json || [],
      riasec: parsed.riasec || parsed.riasec_json || null,
      quiz_version: parsed.quiz_version,
      macro_area_result: parsed.macro_area_result,
      quiz_session_id: parsed.quiz_session_id,
      source: parsed.source,
      utm_source: parsed.utm_source,
      utm_medium: parsed.utm_medium,
      utm_campaign: parsed.utm_campaign,
      utm_content: parsed.utm_content,
      utm_term: parsed.utm_term,
      referrer: parsed.referrer,
      landing_path: parsed.landing_path,
      ...(parsed.whatsapp ? { whatsapp: parsed.whatsapp } : {}),
    };

    const response = await fetch(fnUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!response.ok) {
      const status = Math.max(400, response.status || 500);
      res.status(status).json({
        error: "Erro na funcao generate-career-recommendation",
        details: data,
      });
      return;
    }

    // Schedule follow-up email sequence (fire-and-forget)
    if (!skipEmailSequence && data?.id && payload.email && payload.name) {
      const scheduleUrl = `${supabaseUrl.replace(/\/$/, "")}/functions/v1/schedule-email-sequence`;
      try {
        await fetch(scheduleUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            quizResponseId: data.id,
            userEmail: payload.email,
            userName: payload.name,
          }),
        });
      } catch (scheduleError) {
        console.error("Failed to schedule email sequence:", scheduleError);
      }
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error generate-career-recommendation:", error);
    res.status(500).json({ error: "Erro interno ao chamar a funcao" });
  }
}

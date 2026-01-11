import { Resend } from "resend";

export const config = {
  runtime: "nodejs",
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function extractBearerToken(authorization: unknown): string | null {
  if (typeof authorization !== "string") {
    return null;
  }

  const prefix = "Bearer ";
  if (!authorization.startsWith(prefix)) {
    return null;
  }

  const token = authorization.slice(prefix.length).trim();
  return isNonEmptyString(token) ? token : null;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = extractBearerToken(req.headers.authorization);
  const expectedToken = process.env.INTERNAL_API_TOKEN;

  if (!isNonEmptyString(token) || !isNonEmptyString(expectedToken) || token !== expectedToken) {
    const authHeader = req.headers.authorization;
    const hasAuthHeader = typeof authHeader === "string" && authHeader.length > 0;
    const authStartsWithBearer = typeof authHeader === "string" && authHeader.startsWith("Bearer ");
    const tokenLength = typeof token === "string" ? token.length : 0;
    const hasExpectedToken = isNonEmptyString(expectedToken);
    const expectedTokenLength = hasExpectedToken ? expectedToken.length : 0;

    res.status(401).json({
      error: "unauthorized",
      hasAuthHeader,
      authStartsWithBearer,
      tokenLength,
      hasExpectedToken,
      expectedTokenLength,
    });
    return;
  }

  const { to, template } = req.body ?? {};

  if (!isNonEmptyString(to)) {
    res.status(400).json({ error: "Missing required field: to" });
    return;
  }

  let subject = "";
  let html = "";

  switch (template) {
    case "welcome":
      subject = "Bem-vindo";
      html = "<p>Ola! Bem-vindo(a) ao O Concurso Perfeito.</p>";
      break;
    case "day1":
      subject = "Dia 1 - Primeiros passos";
      html = "<p>Ola! Aqui estao seus primeiros passos.</p>";
      break;
    case "day2":
      subject = "Dia 2 - Foco na rotina";
      html = "<p>Ola! Vamos ajustar sua rotina de estudos.</p>";
      break;
    case "day3":
      subject = "Dia 3 - Consistencia";
      html = "<p>Ola! Mantenha a consistencia e avance hoje.</p>";
      break;
    case "day5":
      subject = "Dia 5 - Proximos passos";
      html = "<p>Ola! Confira os proximos passos recomendados.</p>";
      break;
    default:
      res.status(400).json({ error: "Invalid template" });
      return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const fromName = process.env.RESEND_FROM_NAME;

  if (!isNonEmptyString(apiKey) || !isNonEmptyString(fromEmail) || !isNonEmptyString(fromName)) {
    res.status(500).json({ error: "Email configuration missing" });
    return;
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to,
      subject,
      html,
    });

    if (error || !data?.id) {
      res.status(500).json({ error: error?.message || "Failed to send email" });
      return;
    }

    res.status(200).json({ id: data.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to send email" });
  }
}

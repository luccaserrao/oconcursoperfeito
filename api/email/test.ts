import { Resend } from "resend";

export const config = {
  runtime: "nodejs",
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const testTokenHeader = req.headers["x-test-token"];
  const testToken = Array.isArray(testTokenHeader) ? testTokenHeader[0] : testTokenHeader;
  const expectedToken = process.env.EMAIL_TEST_TOKEN;

  if (!isNonEmptyString(testToken) || !isNonEmptyString(expectedToken) || testToken !== expectedToken) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  const { to, subject, html } = req.body ?? {};

  if (!isNonEmptyString(to) || !isNonEmptyString(subject) || !isNonEmptyString(html)) {
    res.status(400).json({ error: "Missing required fields: to, subject, html" });
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

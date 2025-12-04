import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const webhookHeader = req.headers["x-pushinpay-token"];
  const webhookToken = Array.isArray(webhookHeader) ? webhookHeader[0] : webhookHeader;
  const expectedToken = process.env.PUSHINPAY_TOKEN;

  if (!expectedToken) {
    return res.status(500).json({ error: "Webhook token not configured" });
  }

  if (webhookToken !== expectedToken) {
    return res.status(401).json({ error: "Invalid webhook token" });
  }

  console.log("PIX payment webhook received", {
    headers: req.headers,
    body: req.body,
  });

  return res.status(200).json({ received: true });
}

export default async function handler(req: any, res: any) {
  const secret = process.env.PUSHINPAY_SECRET_WEBHOOK_TOKEN;
  const incoming = req.headers["x-pushinpay-token"];

  if (incoming !== secret) {
    return res.status(401).json({ error: "Token inválido" });
  }

  try {
    const body = JSON.parse(req.body || "{}");

    console.log("Pagamento recebido:", body);

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error("Erro no webhook:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
}

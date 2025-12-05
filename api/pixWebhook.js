const parseBody = (payload) => {
  if (!payload) return {};
  if (typeof payload === "string") {
    try {
      return JSON.parse(payload);
    } catch {
      return { raw: payload };
    }
  }
  return payload;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo nao permitido" });
  }

  const expectedToken = process.env.PUSHINPAY_WEBHOOK_TOKEN || process.env.PUSHINPAY_TOKEN;
  const incoming = req.headers["x-pushinpay-token"];

  if (!expectedToken) {
    return res.status(500).json({ error: "Token do webhook nao configurado" });
  }

  if (incoming !== expectedToken) {
    return res.status(401).json({ error: "Token invalido" });
  }

  try {
    const body = parseBody(req.body);
    console.log("Pagamento recebido:", body);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}

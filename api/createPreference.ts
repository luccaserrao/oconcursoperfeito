import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { userName, userEmail, amount } = req.body ?? {};

    if (!userEmail || !amount) {
      return res.status(400).json({
        error: "Missing required fields",
        details: { userEmail, amount },
      });
    }

    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "Mercado Pago token missing",
        hint: "Configure MERCADO_PAGO_ACCESS_TOKEN na Vercel",
      });
    }

    const preferenceBody = {
      items: [
        {
          title: "Relatório completo",
          description: "Relatório personalizado baseado no seu perfil RIASEC.",
          quantity: 1,
          unit_price: Number(amount),
          currency_id: "BRL",
        },
      ],
      payer: {
        name: userName || "Cliente",
        email: userEmail,
      },
      back_urls: {
        success: "https://futuroperfeito.com.br/sucesso",
        failure: "https://futuroperfeito.com.br/falha",
        pending: "https://futuroperfeito.com.br/pendente",
      },
      auto_return: "approved",
    };

    const mpRes = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(preferenceBody),
      }
    );

    const mpData = await mpRes.json();

    if (!mpRes.ok) {
      return res.status(mpRes.status).json({
        error: "MercadoPago API error",
        status: mpRes.status,
        details: mpData,
        requestSent: preferenceBody,
      });
    }

    return res.status(200).json(mpData);
  } catch (err: any) {
    return res.status(500).json({
      error: "Server error",
      details: err?.message || String(err),
    });
  }
}

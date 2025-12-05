export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const token = process.env.PUSHINPAY_TOKEN;

  const url = "https://api.pushinpay.com/v1/checkout/create";

  if (!token) {
    return res.status(500).json({ error: "PUSHINPAY_TOKEN não configurado" });
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        transactionAmount: 25.00,
        description: "Compra de relatório profissional",
        externalReference: "pedido-123",
        paymentMethods: ["pix"]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        error: "Erro da PushinPay",
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao conectar:", err);
    return res.status(500).json({
      error: "Falha ao conectar ao servidor PushinPay",
    });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const token = process.env.PUSHINPAY_TOKEN;
  const baseUrl = process.env.PUSHINPAY_BASE_URL || "https://api.pushinpay.com.br";

  if (!token) {
    return res.status(500).json({ error: "PUSHINPAY_TOKEN não está configurado" });
  }

  const url = `${baseUrl}/api/pix/cashIn`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        // R$ 25,00 -> 2500 centavos
        value: 2500,
        webhook_url: "https://futuroperfeito.com.br/api/pixWebhook",
      }),
    });

    const data = await response.json();

    // Se a API responder erro, repassa o erro pra tela
    if (!response.ok) {
      console.error("Erro da PushinPay:", data);
      return res.status(response.status).json({
        error: "Erro na PushinPay",
        details: data,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao chamar PushinPay:", err);
    return res.status(500).json({ error: "Falha ao conectar com a PushinPay" });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const token = process.env.PUSHINPAY_TOKEN;

  // ENDPOINT OFICIAL QUE FUNCIONA PARA 100% DOS USUÁRIOS HOJE
  const url = "https://api.pushinpay.com.br/api/pix/cashIn";

  if (!token) {
    return res.status(500).json({ error: "PUSHINPAY_TOKEN não configurado" });
  }

  try {
    const body = {
      value: 2500, // 25,00 em centavos
      webhook_url: "https://futuroperfeito.com.br/api/pixWebhook"
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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
    console.error("ERRO AO CONECTAR:", err);
    return res.status(500).json({
      error: "Falha ao conectar ao servidor PushinPay",
      details: err.toString(),
    });
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const token = process.env.PUSHINPAY_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "PUSHINPAY_TOKEN não está configurado" });
  }

  const url = "https://api.pushinpay.com/pix/create";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: "25.00",  
        description: "Relatorio vocacional",
        callback_url: "https://futuroperfeito.com.br/api/pixWebhook",
        payer_name: "Cliente do Site",
        external_reference: Date.now().toString(),
      }),
    });

    const text = await response.text(); // leitura bruta para debug

    console.log("Resposta PushinPay (RAW):", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Resposta não era JSON. HTML retornado:");
      return res.status(500).json({
        error: "PushinPay retornou resposta inválida",
        raw: text,
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao conectar ao PushinPay:", err);
    return res.status(500).json({ error: "Falha ao conectar ao PushinPay" });
  }
}

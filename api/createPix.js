export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo nao permitido" });
  }

  const token = process.env.PUSHINPAY_TOKEN;
  const url = "https://api.pushinpay.com.br/api/pix/cashIn";

  if (!token) {
    return res.status(500).json({ error: "PUSHINPAY_TOKEN nao configurado" });
  }

  try {
    const reqBody = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const amountNumber = Number(reqBody.amount || 25); // valor em reais
    const valueInCents = Number.isFinite(amountNumber) && amountNumber > 0 ? Math.round(amountNumber * 100) : 2500;

    const body = {
      value: valueInCents,
      webhook_url: "https://futuroperfeito.com.br/api/pixWebhook",
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

    const transactionData = data?.transaction_data || data?.point_of_interaction?.transaction_data;

    const qrCodeImage =
      data?.qrCodeImage ||
      data?.qr_code_base64 ||
      data?.qrCodeBase64 ||
      data?.qrCode ||
      data?.qrcode ||
      data?.qrcode_base64 ||
      transactionData?.qr_code_base64;

    const copyPaste =
      data?.copyPaste ||
      data?.copy_and_paste ||
      data?.pixCopiaECola ||
      data?.copia_e_cola ||
      data?.qrCodeText ||
      data?.qr_code_text ||
      data?.emv ||
      data?.qr_code ||
      transactionData?.qr_code ||
      transactionData?.qr_code_text;

    if (!copyPaste) {
      return res.status(502).json({
        error: "Resposta da PushinPay nao trouxe codigo PIX",
        details: data,
      });
    }

    return res.status(200).json({
      qrCodeImage,
      copyPaste,
      raw: data,
    });
  } catch (err) {
    console.error("ERRO AO CONECTAR:", err);
    return res.status(500).json({
      error: "Falha ao conectar ao servidor PushinPay",
      details: err.toString(),
    });
  }
}

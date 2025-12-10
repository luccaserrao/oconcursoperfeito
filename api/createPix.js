export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo nao permitido" });
  }

  const token = process.env.PUSHINPAY_TOKEN;
  const pushinpayBase = (process.env.PUSHINPAY_BASE_URL || "https://api.pushinpay.com.br").replace(/\/$/, "");
  const url = `${pushinpayBase}/api/pix/cashIn`;

  if (!token) {
    return res.status(500).json({ error: "PUSHINPAY_TOKEN nao configurado" });
  }

  try {
    const reqBody = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const amountNumber = Number(reqBody.amount || 25); // valor em reais
    const valueInCents = Number.isFinite(amountNumber) && amountNumber > 0 ? Math.round(amountNumber * 100) : 2500;

    const forwardedProto = (req.headers["x-forwarded-proto"] || "").toString().split(",")[0];
    const hostHeader = (req.headers["x-forwarded-host"] || req.headers.host || "").toString().split(",")[0].trim();
    const webhookBase = process.env.PIX_WEBHOOK_URL || `${forwardedProto || "https"}://${process.env.PIX_WEBHOOK_HOST || hostHeader || "www.futuroperfeito.com.br"}`;
    const webhookUrl = webhookBase.endsWith("/api/pixWebhook")
      ? webhookBase
      : `${webhookBase.replace(/\/$/, "")}/api/pixWebhook`;

    const body = {
      value: valueInCents,
      webhook_url: webhookUrl,
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

    const rawData = await response.text();
    let data;
    try {
      data = rawData ? JSON.parse(rawData) : null;
    } catch {
      data = rawData;
    }

    if (!response.ok) {
      console.error("PushinPay createPix failed", response.status, data);
      const errorStatus = response.status === 404 ? 502 : Math.max(400, response.status || 400);
      return res.status(errorStatus).json({
        error: "Erro ao gerar PIX",
        details: data || response.statusText || "Erro da PushinPay",
      });
    }

    const safeData = (typeof data === "object" && data) || {};
    const transactionData = safeData?.transaction_data || safeData?.point_of_interaction?.transaction_data;

    const qrCodeImage =
      safeData?.qrCodeImage ||
      safeData?.qr_code_base64 ||
      safeData?.qrCodeBase64 ||
      safeData?.qrCode ||
      safeData?.qrcode ||
      safeData?.qrcode_base64 ||
      transactionData?.qr_code_base64;

    const copyPaste =
      safeData?.copyPaste ||
      safeData?.copy_and_paste ||
      safeData?.pixCopiaECola ||
      safeData?.copia_e_cola ||
      safeData?.qrCodeText ||
      safeData?.qr_code_text ||
      safeData?.emv ||
      safeData?.qr_code ||
      transactionData?.qr_code ||
      transactionData?.qr_code_text ||
      (typeof data === "string" ? data : undefined);

    if (!copyPaste) {
      console.error("PushinPay response missing copyPaste/qr_code", data);
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

const normalizeBaseUrl = (url) => (url || "").replace(/\/+$/, "");

const parseRequestBody = (body) => {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
};

const extractPixFields = (data) => {
  if (!data || typeof data !== "object") return { qrCodeImage: undefined, copyPaste: undefined };

  const qrCodeImage =
    data.qrCodeImage ||
    data.qr_code_image ||
    data.qr_code_base64 ||
    data.qr_code ||
    data.qrCode ||
    data.qrCodeBase64 ||
    data.pix?.qrCodeImage ||
    data.pix?.qr_code_image ||
    data.pix?.qr_code_base64 ||
    data.pix?.qrCode ||
    data.pix?.qr_code;

  const copyPaste =
    data.copyPaste ||
    data.copy_paste ||
    data.emv ||
    data.payload ||
    data.pix?.copyPaste ||
    data.pix?.copy_paste ||
    data.pix?.emv ||
    data.pix?.payload ||
    data.pix?.emvCode ||
    data.emvCode;

  return { qrCodeImage, copyPaste };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo nao permitido" });
  }

  const token = process.env.PUSHINPAY_TOKEN;
  const baseUrl = process.env.PUSHINPAY_BASE_URL || "https://api.pushinpay.com";

  if (!token) {
    return res.status(500).json({ error: "PUSHINPAY_TOKEN nao configurado" });
  }

  const { userName, userEmail, quizResponseId, amount = 25 } = parseRequestBody(req.body);
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: "Valor do PIX invalido" });
  }

  const url = `${normalizeBaseUrl(baseUrl)}/v1/checkout/create`;

  const payload = {
    amount: numericAmount.toFixed(2),
    currency: "BRL",
    payment_method: "pix",
    description: "Relatorio vocacional",
    reference_id: quizResponseId || `quiz-${Date.now()}`,
    customer: {
      name: userName || "Cliente",
      email: userEmail,
    },
    metadata: {
      userName,
      userEmail,
      quizResponseId,
    },
  };

  let pushinpayResponse;
  try {
    pushinpayResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Erro ao chamar PushinPay:", error);
    return res.status(500).json({ error: "Falha ao conectar com a PushinPay" });
  }

  const contentType = pushinpayResponse.headers.get("content-type") || "";
  let pushinpayData;

  try {
    pushinpayData = contentType.includes("application/json")
      ? await pushinpayResponse.json()
      : await pushinpayResponse.text();
  } catch (error) {
    console.error("Erro ao ler resposta da PushinPay:", error);
    return res.status(500).json({ error: "Nao foi possivel ler a resposta da PushinPay" });
  }

  if (!pushinpayResponse.ok) {
    const message =
      (pushinpayData && typeof pushinpayData === "object" && (pushinpayData.error || pushinpayData.message || pushinpayData.detail)) ||
      (typeof pushinpayData === "string" ? pushinpayData : `PushinPay retornou status ${pushinpayResponse.status}`);

    return res
      .status(pushinpayResponse.status)
      .json({ error: message, details: typeof pushinpayData === "string" ? undefined : pushinpayData });
  }

  const { qrCodeImage, copyPaste } = extractPixFields(pushinpayData);

  if (!qrCodeImage && !copyPaste) {
    return res.status(502).json({
      error: "Resposta inesperada da PushinPay",
      details: typeof pushinpayData === "string" ? pushinpayData : pushinpayData,
    });
  }

  return res.status(200).json({
    qrCodeImage,
    copyPaste,
    checkoutId:
      (pushinpayData && typeof pushinpayData === "object" && (pushinpayData.checkout_id || pushinpayData.id || pushinpayData.transactionId)) ||
      undefined,
  });
}

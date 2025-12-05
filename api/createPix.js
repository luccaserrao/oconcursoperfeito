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
    data.qrCodeImageBase64 ||
    data.pix?.qrCodeImage ||
    data.pix?.qr_code_image ||
    data.pix?.qr_code_base64 ||
    data.pix?.qrCode ||
    data.pix?.qr_code ||
    data.pix?.qrCodeBase64;

  const copyPaste =
    data.copyPaste ||
    data.copy_paste ||
    data.emv ||
    data.payload ||
    data.brCode ||
    data.br_code ||
    data.pixCopiaECola ||
    data.pixCopiaCola ||
    data.pix_copia_e_cola ||
    data.pix_copia_cola ||
    data.emvCode ||
    data.pix?.copyPaste ||
    data.pix?.copy_paste ||
    data.pix?.emv ||
    data.pix?.payload ||
    data.pix?.emvCode ||
    data.pix?.brCode ||
    data.pix?.br_code;

  return { qrCodeImage, copyPaste };
};

const buildPixUrl = (baseUrl, path) => {
  const base = normalizeBaseUrl(baseUrl || "https://api.pushinpay.com.br");
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "/api/pix/cashIn";
  const rawUrl = `${base}${normalizedPath}`;

  const urlObj = new URL(rawUrl);
  return { rawUrl, url: urlObj.toString() };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo nao permitido" });
  }

  const token = process.env.PUSHINPAY_TOKEN;
  const baseUrl = process.env.PUSHINPAY_BASE_URL || "https://api.pushinpay.com.br";
  const path = process.env.PUSHINPAY_PIX_PATH || "/api/pix/cashIn";

  if (!token) {
    return res.status(500).json({ error: "PUSHINPAY_TOKEN nao configurado" });
  }

  const { userName, userEmail, quizResponseId, amount = 25 } = parseRequestBody(req.body);
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: "Valor do PIX invalido" });
  }

  let pixUrl;
  let rawUrl;
  try {
    const built = buildPixUrl(baseUrl, path);
    pixUrl = built.url;
    rawUrl = built.rawUrl;
  } catch (error) {
    console.error("URL da PushinPay invalida:", baseUrl, path, error);
    return res.status(500).json({ error: "PUSHINPAY_BASE_URL invalida", details: error?.message });
  }

  const valueInCents = Math.round(numericAmount * 100);

  if (valueInCents < 50) {
    return res.status(400).json({ error: "Valor do PIX deve ser no minimo 0.50 (50 centavos)" });
  }

  const payload = {
    value: valueInCents, // inteiro em centavos, conforme requisito da API
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
    pushinpayResponse = await fetch(pixUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Erro ao conectar com PushinPay:", { message: error?.message, url: rawUrl });
    return res.status(502).json({ error: "Falha ao conectar com a PushinPay", details: error?.message });
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

  if (contentType.includes("text/html")) {
    const preview =
      typeof pushinpayData === "string" ? pushinpayData.slice(0, 300) : JSON.stringify(pushinpayData).slice(0, 300);
    console.error("PushinPay retornou HTML (provavel URL errada ou bloqueio):", {
      status: pushinpayResponse.status,
      url: rawUrl,
      preview,
    });
    return res.status(502).json({
      error: "PushinPay retornou HTML (verifique PUSHINPAY_BASE_URL / PATH ou bloqueio de WAF)",
      details: preview,
    });
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

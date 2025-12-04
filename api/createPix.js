import type { VercelRequest, VercelResponse } from "@vercel/node";

interface PixRequestBody {
  userName?: string;
  userEmail?: string;
  userId?: string;
  quizResponseId?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { userName, userEmail, userId, quizResponseId } = (req.body || {}) as PixRequestBody;

    const token = process.env.PUSHINPAY_TOKEN;
    const baseUrl = process.env.PUSHINPAY_BASE_URL;

    if (!token || !baseUrl) {
      return res.status(500).json({
        error: "PushinPay configuration missing",
        hint: "Defina PUSHINPAY_TOKEN e PUSHINPAY_BASE_URL nas variáveis de ambiente",
      });
    }

    const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
    const endpoint = `${normalizedBaseUrl}/v1/checkout/create`;

    const payload = {
      payment_type: "pix",
      amount: 25.0,
      currency: "BRL",
      description: "Plano completo Futuro Perfeito",
      customer: {
        name: userName || "Cliente",
        email: userEmail,
        external_id: userId || quizResponseId || userEmail,
      },
      metadata: {
        quizResponseId,
        userEmail,
      },
    };

    const pushinpayResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const pushinpayData = await pushinpayResponse.json();

    if (!pushinpayResponse.ok) {
      return res.status(pushinpayResponse.status).json({
        error: "PushinPay API error",
        status: pushinpayResponse.status,
        details: pushinpayData,
      });
    }

    const pixData = pushinpayData.pix || pushinpayData.data || pushinpayData;
    const qrCodeImage =
      pixData?.qr_code_image ||
      pixData?.qrCodeImage ||
      pixData?.qr_code ||
      pixData?.qrCode ||
      pixData?.image;
    const copyPaste =
      pixData?.copy_paste ||
      pixData?.copyAndPaste ||
      pixData?.brcode ||
      pixData?.pix_copia_cola ||
      pixData?.qrcode_text;

    if (!qrCodeImage && !copyPaste) {
      return res.status(500).json({
        error: "PushinPay response missing PIX data",
        details: pushinpayData,
      });
    }

    return res.status(200).json({
      qrCodeImage,
      copyPaste,
      checkoutId: pushinpayData?.id || pushinpayData?.reference,
    });
  } catch (err) {
    console.error("createPix error", err);
    return res.status(500).json({
      error: "Server error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

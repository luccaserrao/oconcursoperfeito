import { supabase } from "./supabaseClient.js";

const normalizeString = (value, fallback = "") => {
  if (!value) return fallback;
  return String(value).trim();
};

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
    const userName = normalizeString(reqBody.userName || reqBody.name || "Cliente");
    const userEmail = normalizeString(reqBody.userEmail || reqBody.email || "").toLowerCase();
    const quizResponseId = normalizeString(reqBody.quizResponseId || reqBody.quiz_response_id || "");

    if (!userEmail) {
      return res.status(400).json({ error: "Email obrigatorio" });
    }

    const amountNumber = Number(reqBody.amount || 25); // valor em reais
    const valueInCents = Number.isFinite(amountNumber) && amountNumber > 0 ? Math.round(amountNumber * 100) : 2500;

    const forwardedProto = (req.headers["x-forwarded-proto"] || "").toString().split(",")[0];
    const hostHeader = (req.headers["x-forwarded-host"] || req.headers.host || "").toString().split(",")[0].trim();
    const webhookBase =
      process.env.PIX_WEBHOOK_URL ||
      `${forwardedProto || "https"}://${process.env.PIX_WEBHOOK_HOST || hostHeader || "www.futuroperfeito.com.br"}`;
    const webhookUrl = webhookBase.endsWith("/api/pixWebhook")
      ? webhookBase
      : `${webhookBase.replace(/\/$/, "")}/api/pixWebhook`;

    // 1) Cria pedido unico por tentativa (nao reutiliza), mas evita gerar PIX se ja estiver pago
    let orderRecord = null;
    if (!supabase) {
      console.error("Supabase client not configured; skipping order insert for PIX");
    } else {
      try {
        let paidOrder = null;

        if (quizResponseId) {
          const { data: rows, error: fetchErr } = await supabase
            .from("orders")
            .select("id, payment_status")
            .eq("quiz_response_id", quizResponseId)
            .eq("payment_status", "paid")
            .order("created_at", { ascending: false })
            .limit(1);
          if (fetchErr && fetchErr.code !== "PGRST116") {
            console.error("Erro ao buscar pedido pago (quiz_response_id):", fetchErr);
          }
          if (rows && rows.length) paidOrder = rows[0];
        }

        if (!paidOrder && userEmail) {
          const { data: rows, error: fetchErr } = await supabase
            .from("orders")
            .select("id, payment_status")
            .eq("user_email", userEmail)
            .eq("payment_status", "paid")
            .order("created_at", { ascending: false })
            .limit(1);
          if (fetchErr && fetchErr.code !== "PGRST116") {
            console.error("Erro ao buscar pedido pago (email):", fetchErr);
          }
          if (rows && rows.length) paidOrder = rows[0];
        }

        if (paidOrder) {
          return res.status(200).json({
            already_paid: true,
            order_id: paidOrder.id,
            payment_status: "paid",
          });
        }

        const { data: inserted, error: insertErr } = await supabase
          .from("orders")
          .insert({
            user_email: userEmail,
            user_name: userName,
            quiz_response_id: quizResponseId || null,
            amount: valueInCents,
            payment_status: "pending",
          })
          .select()
          .single();
        if (insertErr) {
          console.error("Erro ao criar pedido para PIX:", insertErr);
        } else {
          orderRecord = inserted;
        }
      } catch (dbErr) {
        console.error("Erro inesperado ao preparar pedido PIX:", dbErr);
      }
    }

    // 2) Gera PIX na PushinPay
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

    const transactionId =
      safeData?.transaction_id ||
      safeData?.transactionId ||
      safeData?.id ||
      transactionData?.transaction_id ||
      transactionData?.id ||
      safeData?.payment_id ||
      safeData?.paymentId ||
      null;

    if (!copyPaste) {
      console.error("PushinPay response missing copyPaste/qr_code", data);
      return res.status(502).json({
        error: "Resposta da PushinPay nao trouxe codigo PIX",
        details: data,
      });
    }

    // 3) Atualiza pedido com referencia do PIX para o webhook localizar
    if (orderRecord && supabase) {
      try {
        const updatePayload = {
          payment_status: "pending",
          pix_copy_paste: copyPaste || null,
          pushinpay_transaction_id: transactionId || orderRecord?.pushinpay_transaction_id || null,
          pushinpay_status: safeData?.status || null,
        };
        const { error: updateErr } = await supabase
          .from("orders")
          .update(updatePayload)
          .eq("id", orderRecord.id);

        if (updateErr) {
          console.error("Erro ao salvar referencia PIX no pedido:", updateErr);
        } else {
          orderRecord = { ...orderRecord, ...updatePayload };
        }
      } catch (updErr) {
        console.error("Erro inesperado ao atualizar pedido PIX:", updErr);
      }
    }

    return res.status(200).json({
      qrCodeImage,
      copyPaste,
      order_id: orderRecord?.id || null,
      transaction_id: transactionId || null,
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

import { supabase } from "./supabaseClient.js";
import { deliverPaidResult } from "./lib/deliverPaidResult.js";

const parseBody = (payload) => {
  if (!payload) return {};
  if (typeof payload === "string") {
    try {
      return JSON.parse(payload);
    } catch {
      return { raw: payload };
    }
  }
  return payload;
};

const mapStatus = (body) => {
  const statusRaw =
    body?.status ||
    body?.payment_status ||
    body?.transaction_status ||
    body?.pix_status ||
    body?.status_name ||
    body?.status_detail ||
    null;

  const lowered = typeof statusRaw === "string" ? statusRaw.toLowerCase() : "";
  const completed = body?.complete === true || body?.completed === true || body?.success === true;

  if (completed) return { normalized: "paid", raw: statusRaw };
  if (lowered.includes("paid") || lowered.includes("approved") || lowered.includes("completed") || lowered.includes("conclu") || lowered.includes("confirm")) {
    return { normalized: "paid", raw: statusRaw };
  }
  if (lowered.includes("rejected") || lowered.includes("cancel") || lowered.includes("failed")) {
    return { normalized: "rejected", raw: statusRaw };
  }
  return { normalized: null, raw: statusRaw };
};

const extractTransactionId = (body) =>
  body?.transaction_id ||
  body?.transactionId ||
  body?.data?.transaction_id ||
  body?.data?.id ||
  body?.transaction?.id ||
  body?.payment_id ||
  body?.paymentId ||
  body?.id ||
  null;

const extractOrderId = (body) =>
  body?.order_id ||
  body?.orderId ||
  body?.external_reference ||
  body?.reference ||
  body?.metadata?.order_id ||
  null;

const extractQuizResponseId = (body) =>
  body?.quiz_response_id ||
  body?.quizResponseId ||
  body?.metadata?.quiz_response_id ||
  null;

const extractCopyPaste = (body) =>
  body?.copyPaste ||
  body?.copy_and_paste ||
  body?.pixCopiaECola ||
  body?.copia_e_cola ||
  body?.qrCodeText ||
  body?.qr_code_text ||
  body?.emv ||
  body?.qr_code ||
  null;

const extractAmountCents = (body) => {
  const candidates = [
    body?.value,
    body?.amount,
    body?.amount_cents,
    body?.transaction_amount,
    body?.payment_amount,
    body?.valor,
    body?.transaction?.value,
    body?.data?.value,
  ];
  for (const c of candidates) {
    const num = Number(c);
    if (Number.isFinite(num) && num > 0) {
      // Heuristica: se for > 1000 provavelmente jŠ est  em centavos; se < 1000, pode ser em reais
      return num > 1000 ? Math.round(num) : Math.round(num * 100);
    }
  }
  return null;
};

const extractEmail = (body) =>
  (body?.payer_email || body?.email || body?.payer?.email || body?.customer_email || body?.cliente_email || body?.user_email || "").toString().trim().toLowerCase();

const extractName = (body) =>
  (body?.payer_name || body?.name || body?.payer?.name || body?.cliente_nome || body?.user_name || "Cliente PIX").toString().trim();

async function logWebhook(eventType, payload, errorMessage) {
  if (!supabase) return;
  try {
    await supabase.from("webhook_logs").insert({
      event_type: eventType,
      payload,
      processed: !errorMessage,
      error_message: errorMessage || null,
    });
  } catch (logErr) {
    console.error("Falha ao gravar webhook_logs:", logErr);
  }
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).json({ ok: true });
  }

  if (req.method === "GET" || req.method === "HEAD") {
    return res.status(200).json({ ok: true, message: "PIX webhook ativo" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo nao permitido" });
  }

  const expectedToken = process.env.PUSHINPAY_WEBHOOK_TOKEN || process.env.PUSHINPAY_TOKEN;
  const incoming = req.headers["x-pushinpay-token"];

  if (!expectedToken) {
    return res.status(500).json({ error: "Token do webhook nao configurado" });
  }

  if (incoming !== expectedToken) {
    return res.status(401).json({ error: "Token invalido" });
  }

  const rawBody = parseBody(req.body);
  const body = typeof rawBody === "object" && rawBody ? rawBody : {};

  const { normalized: normalizedStatus, raw: rawStatus } = mapStatus(body);
  const transactionId = extractTransactionId(body);
  const orderIdFromPayload = extractOrderId(body);
  const quizResponseId = extractQuizResponseId(body);
  const copyPaste = extractCopyPaste(body);
  const amountCents = extractAmountCents(body);
  const userEmail = extractEmail(body);
  const userName = extractName(body);

  try {
    if (!supabase) {
      console.error("Supabase client nao configurado; nao foi possivel atualizar pedido PIX");
      return res.status(500).json({ error: "Backend sem acesso ao banco" });
    }

    // Localiza pedido pela referencia mais forte primeiro
    let order = null;
    if (orderIdFromPayload) {
      const { data } = await supabase.from("orders").select("*").eq("id", orderIdFromPayload).single();
      order = data || null;
    }

    if (!order && transactionId) {
      const { data: rows } = await supabase
        .from("orders")
        .select("*")
        .eq("pushinpay_transaction_id", transactionId)
        .order("created_at", { ascending: false })
        .limit(1);
      if (rows && rows.length) order = rows[0];
    }

    if (!order && quizResponseId) {
      const { data: rows } = await supabase
        .from("orders")
        .select("*")
        .eq("quiz_response_id", quizResponseId)
        .order("created_at", { ascending: false })
        .limit(1);
      if (rows && rows.length) order = rows[0];
    }

    if (!order && userEmail) {
      const { data: rows } = await supabase
        .from("orders")
        .select("*")
        .eq("user_email", userEmail)
        .not("payment_status", "eq", "paid")
        .order("created_at", { ascending: false })
        .limit(1);
      if (rows && rows.length) order = rows[0];
    }

    // Se ainda nao existe, cria fallback (para nao perder venda)
    if (!order) {
      const { data: inserted, error: insertErr } = await supabase
        .from("orders")
        .insert({
          user_email: userEmail || "desconhecido@pushinpay",
          user_name: userName || "Cliente PIX",
          quiz_response_id: quizResponseId || null,
          payment_status: normalizedStatus === "paid" ? "paid" : "pending",
          paid_at: normalizedStatus === "paid" ? new Date().toISOString() : null,
          amount: amountCents || 0,
          pushinpay_transaction_id: transactionId || null,
          pushinpay_status: rawStatus || null,
          pix_copy_paste: copyPaste || null,
        })
        .select()
        .single();

      if (insertErr) {
        console.error("Erro ao criar pedido via webhook PIX:", insertErr);
        await logWebhook("pix_webhook_error", body, insertErr.message || "insert_error");
        return res.status(500).json({ error: "Falha ao registrar pagamento PIX" });
      }

      order = inserted;
    }

    const updates = {
      pushinpay_transaction_id: transactionId || order.pushinpay_transaction_id || null,
      pushinpay_status: rawStatus || order.pushinpay_status || null,
      pix_copy_paste: copyPaste || order.pix_copy_paste || null,
    };

    if (amountCents && (!order.amount || order.amount <= 0)) {
      updates.amount = amountCents;
    }

    if (normalizedStatus === "paid" && order.payment_status !== "paid") {
      updates.payment_status = "paid";
      updates.paid_at = new Date().toISOString();
      if (!order.result_email_sent_at && !order.result_email_status) {
        updates.result_email_status = "pending";
      }
    } else if (normalizedStatus === "rejected" && order.payment_status !== "paid") {
      updates.payment_status = "rejected";
    }

    const { data: updated, error: updateErr } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", order.id)
      .select()
      .single();

    if (updateErr) {
      console.error("Erro ao atualizar pedido com pagamento PIX:", updateErr);
      await logWebhook("pix_webhook_error", body, updateErr.message || "update_error");
      return res.status(500).json({ error: "Falha ao atualizar pedido PIX" });
    }

    await logWebhook("pix_webhook", body, null);

    const finalOrder = updated || order;
    const isPaid = (finalOrder?.payment_status || "").toLowerCase() === "paid";

    if (isPaid && finalOrder?.quiz_response_id && supabase) {
      try {
        await supabase
          .from("quiz_responses")
          .update({
            result_status: "paid",
            paid_at: new Date().toISOString(),
          })
          .eq("id", finalOrder.quiz_response_id);
      } catch (quizUpdateError) {
        console.error("Erro ao atualizar quiz_responses pago:", quizUpdateError);
      }
    }

    if (isPaid) {
      const delivery = await deliverPaidResult({ orderId: finalOrder.id, source: "pix_webhook" });
      if (!delivery?.ok) {
        console.error("Falha ao enviar resultado pago (webhook):", delivery?.error || "unknown");
      }
    }

    return res.status(200).json({
      ok: true,
      order_id: updated?.id || order.id,
      payment_status: updated?.payment_status || updates.payment_status || order.payment_status,
      transaction_id: transactionId || null,
    });
  } catch (error) {
    console.error("Erro no webhook PIX:", error);
    await logWebhook("pix_webhook_error", body, error instanceof Error ? error.message : "unknown");
    return res.status(500).json({ error: "Erro interno" });
  }
}

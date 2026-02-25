import { supabase } from "../supabaseClient.js";
import { deliverPaidResult } from "../lib/deliverPaidResult.js";

const parseBody = (payload) => {
  if (!payload) return {};
  if (typeof payload === "string") {
    try {
      return JSON.parse(payload);
    } catch {
      return {};
    }
  }
  return payload;
};

const normalizeEmail = (value) => (value ? String(value).trim().toLowerCase() : "");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Metodo nao permitido" });
    return;
  }

  if (!supabase) {
    res.status(500).json({ error: "Supabase nao configurado no servidor." });
    return;
  }

  const body = parseBody(req.body);
  const orderId = body.order_id || body.orderId;
  const userEmail = normalizeEmail(body.user_email || body.userEmail);

  if (!orderId || !userEmail) {
    res.status(400).json({ error: "order_id e user_email sao obrigatorios" });
    return;
  }

  try {
    const { data: order, error } = await supabase
      .from("orders")
      .select("id, user_email, payment_status, paid_at, amount, quiz_response_id, result_email_status, result_email_sent_at")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      res.status(404).json({ error: "Pedido nao encontrado" });
      return;
    }

    if (normalizeEmail(order.user_email) !== userEmail) {
      res.status(403).json({ error: "Nao autorizado" });
      return;
    }

    const paymentStatus = (order.payment_status || "").toLowerCase();
    let deliveryAttempt = null;

    if (paymentStatus === "paid" && order.result_email_status !== "sent") {
      deliveryAttempt = await deliverPaidResult({ orderId: order.id, source: "status_poll" });
    }

    res.status(200).json({
      order_id: order.id,
      payment_status: order.payment_status,
      paid_at: order.paid_at,
      amount: order.amount,
      result_email_status: order.result_email_status,
      result_email_sent_at: order.result_email_sent_at,
      delivery_attempt: deliveryAttempt ? { ok: deliveryAttempt.ok } : null,
    });
  } catch (err) {
    console.error("Erro ao verificar status do pedido:", err);
    res.status(500).json({ error: "Erro interno" });
  }
}

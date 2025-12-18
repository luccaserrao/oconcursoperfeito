import { supabase } from "./supabaseClient.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Metodo nao permitido" });
    return;
  }

  if (!supabase) {
    res.status(500).json({ error: "Supabase nao configurado no servidor." });
    return;
  }

  const token =
    (req.headers["x-admin-token"] || req.headers.authorization || "")
      .toString()
      .replace(/Bearer /i, "")
      .trim();

  const expectedToken =
    process.env.ADMIN_DASHBOARD_TOKEN ||
    process.env.ADMIN_CLIENTS_TOKEN ||
    "";

  if (!expectedToken) {
    res.status(500).json({ error: "ADMIN_DASHBOARD_TOKEN ausente no backend" });
    return;
  }

  if (!token || token !== expectedToken) {
    res.status(401).json({ error: "Token invalido" });
    return;
  }

  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        user_name,
        user_email,
        amount,
        payment_status,
        created_at,
        paid_at,
        product_id,
        quiz_response_id,
        mp_preference_id,
        mercado_pago_payment_id,
        stripe_session_id,
        updated_at
      `
      )
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error("Erro ao buscar orders:", error);
      res.status(500).json({ error: "Falha ao listar clientes/pedidos" });
      return;
    }

    res.status(200).json({ orders: data || [] });
  } catch (err) {
    console.error("Erro inesperado em listClients:", err);
    res.status(500).json({ error: "Erro interno" });
  }
}

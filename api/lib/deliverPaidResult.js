import { Resend } from "resend";
import { supabase } from "../supabaseClient.js";

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const safeString = (value, fallback = "") => {
  if (!isNonEmptyString(value)) return fallback;
  return value.trim();
};

const parseMaybeJson = (value) => {
  if (!value) return null;
  if (typeof value === "object") return value;
  if (typeof value !== "string") return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const formatMacroArea = (area) => {
  const map = {
    ADMINISTRATIVO: "Area Administrativa",
    TRIBUNAIS: "Area de Tribunais",
    POLICIAL: "Area Policial",
    FISCAL: "Area Fiscal",
  };
  if (!isNonEmptyString(area)) return "Area Administrativa";
  return map[area] || area;
};

const buildPaidResultEmail = ({ userName, orderId, quizVersion, riasec, macro }) => {
  const firstName = safeString(userName, "Concurseiro").split(" ")[0];
  const isV2 = quizVersion === "v2";

  const riasecTop =
    riasec && isNonEmptyString(riasec.top1) && isNonEmptyString(riasec.top2)
      ? `${riasec.top1} + ${riasec.top2}`
      : "Perfil RIASEC";

  const macroPrincipal = macro?.areaPrincipal ? formatMacroArea(macro.areaPrincipal) : "Area principal";
  const macroPossivel = macro?.areaPossivel ? formatMacroArea(macro.areaPossivel) : "Area possivel";
  const macroEvitar = macro?.areaEvitar ? formatMacroArea(macro.areaEvitar) : "Area a evitar";

  const summaryBlock = isV2
    ? `
      <h3>Direcao principal</h3>
      <p><strong>${macroPrincipal}</strong></p>
      <p>Area possivel: ${macroPossivel}</p>
      <p>Area a evitar: ${macroEvitar}</p>
    `
    : `
      <h3>Perfil RIASEC</h3>
      <p><strong>${riasecTop}</strong></p>
      ${riasec?.habilidades?.length ? `<p>Forcas: ${riasec.habilidades.join(", ")}</p>` : ""}
      ${riasec?.contexto_profissional ? `<p>Contexto ideal: ${riasec.contexto_profissional}</p>` : ""}
    `;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: Arial, sans-serif; color: #1f2937; background: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border-radius: 12px; }
          .header { text-align: center; margin-bottom: 24px; }
          .badge { display: inline-block; padding: 6px 12px; background: #ecfdf3; color: #047857; border-radius: 999px; font-size: 12px; font-weight: bold; }
          .section { margin-bottom: 20px; }
          .divider { border-top: 1px solid #e5e7eb; margin: 16px 0; }
          .footer { font-size: 12px; color: #6b7280; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">Pagamento confirmado</span>
            <h2>Seu resultado completo esta pronto, ${firstName}!</h2>
          </div>
          <div class="section">
            ${summaryBlock}
          </div>
          <div class="section">
            <p>Seu pedido: <strong>${orderId}</strong></p>
            <p>Guarde este email para consultar quando precisar.</p>
          </div>
          <div class="divider"></div>
          <div class="footer">
            <p>Se precisar de ajuda, responda este email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const deliverPaidResult = async ({ orderId, source = "unknown" }) => {
  if (!supabase) {
    return { ok: false, error: "supabase_not_configured" };
  }

  if (!isNonEmptyString(orderId)) {
    return { ok: false, error: "missing_order_id" };
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    return { ok: false, error: "order_not_found" };
  }

  const paymentStatus = safeString(order.payment_status || "");
  if (paymentStatus.toLowerCase() !== "paid") {
    return { ok: false, error: "order_not_paid", payment_status: paymentStatus };
  }

  if (order.result_email_status === "sent" || order.result_email_sent_at) {
    return { ok: true, alreadySent: true };
  }

  if (order.quiz_response_id) {
    const { data: existingLog } = await supabase
      .from("email_logs")
      .select("id, resend_email_id, sent_at")
      .eq("email_type", "paid_result")
      .eq("quiz_response_id", order.quiz_response_id)
      .maybeSingle();

    if (existingLog) {
      await supabase
        .from("orders")
        .update({
          result_email_status: "sent",
          result_email_sent_at: existingLog.sent_at || new Date().toISOString(),
          result_email_id: existingLog.resend_email_id || null,
        })
        .eq("id", order.id);
      return { ok: true, alreadySent: true };
    }
  }

  if (order.user_email) {
    const { data: emailLogs } = await supabase
      .from("email_logs")
      .select("id, resend_email_id, sent_at")
      .eq("email_type", "paid_result")
      .eq("user_email", order.user_email)
      .order("sent_at", { ascending: false })
      .limit(1);

    if (emailLogs && emailLogs.length > 0) {
      const lastLog = emailLogs[0];
      await supabase
        .from("orders")
        .update({
          result_email_status: "sent",
          result_email_sent_at: lastLog.sent_at || new Date().toISOString(),
          result_email_id: lastLog.resend_email_id || null,
        })
        .eq("id", order.id);
      return { ok: true, alreadySent: true };
    }
  }

  const { data: lockedOrder } = await supabase
    .from("orders")
    .update({ result_email_status: "sending" })
    .eq("id", order.id)
    .or("result_email_status.is.null,result_email_status.eq.pending,result_email_status.eq.failed")
    .select()
    .single();

  if (!lockedOrder) {
    return { ok: true, alreadySending: true };
  }

  let quizResponse = null;
  if (order.quiz_response_id) {
    const { data } = await supabase
      .from("quiz_responses")
      .select("*")
      .eq("id", order.quiz_response_id)
      .maybeSingle();
    quizResponse = data || null;
  }

  const userEmail =
    safeString(order.user_email) ||
    safeString(quizResponse?.user_email) ||
    safeString(quizResponse?.email);
  const userName =
    safeString(order.user_name) ||
    safeString(quizResponse?.user_name) ||
    safeString(quizResponse?.name) ||
    "Concurseiro";

  if (!userEmail) {
    await supabase
      .from("orders")
      .update({ result_email_status: "failed", result_email_error: "missing_user_email" })
      .eq("id", order.id);
    return { ok: false, error: "missing_user_email" };
  }

  const riasec = parseMaybeJson(quizResponse?.riasec_json ?? quizResponse?.ai_recommendation);
  const macro = parseMaybeJson(quizResponse?.macro_area_result);
  const quizVersion = quizResponse?.quiz_version || (macro ? "v2" : "v1");

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const fromName = process.env.RESEND_FROM_NAME;

  if (!isNonEmptyString(apiKey) || !isNonEmptyString(fromEmail) || !isNonEmptyString(fromName)) {
    await supabase
      .from("orders")
      .update({ result_email_status: "failed", result_email_error: "resend_not_configured" })
      .eq("id", order.id);
    return { ok: false, error: "resend_not_configured" };
  }

  const resend = new Resend(apiKey);
  const html = buildPaidResultEmail({
    userName,
    orderId: order.id,
    quizVersion,
    riasec,
    macro,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [userEmail],
      subject: "Seu resultado completo esta pronto",
      html,
    });

    if (error || !data?.id) {
      throw new Error(error?.message || "resend_failed");
    }

    await supabase.from("email_logs").insert({
      user_email: userEmail,
      user_name: userName,
      email_type: "paid_result",
      quiz_response_id: order.quiz_response_id || null,
      status: "sent",
      resend_email_id: data.id,
    });

    await supabase
      .from("orders")
      .update({
        result_email_status: "sent",
        result_email_sent_at: new Date().toISOString(),
        result_email_id: data.id,
        result_email_error: null,
      })
      .eq("id", order.id);

    if (order.quiz_response_id) {
      await supabase
        .from("quiz_responses")
        .update({
          result_status: "paid",
          paid_at: new Date().toISOString(),
        })
        .eq("id", order.quiz_response_id);
    }

    return { ok: true, emailId: data.id, source };
  } catch (err) {
    await supabase
      .from("orders")
      .update({
        result_email_status: "failed",
        result_email_error: err instanceof Error ? err.message : "send_failed",
      })
      .eq("id", order.id);

    await supabase.from("email_logs").insert({
      user_email: userEmail,
      user_name: userName,
      email_type: "paid_result",
      quiz_response_id: order.quiz_response_id || null,
      status: "failed",
      error_message: err instanceof Error ? err.message : "send_failed",
    });

    return { ok: false, error: err instanceof Error ? err.message : "send_failed" };
  }
};

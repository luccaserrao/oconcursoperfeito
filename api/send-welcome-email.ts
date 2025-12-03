import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { userName, userEmail } = req.body ?? {};

    if (!userEmail) {
      return res.status(400).json({
        error: "Missing userEmail",
      });
    }

    const resendKey = process.env.RESEND_API_KEY;

    // Se não existir chave, apenas simule o envio
    if (!resendKey) {
      console.log("[send-welcome-email] Simulando envio:", {
        userName,
        userEmail,
      });
      return res.status(200).json({ ok: true, simulated: true });
    }

    const emailBody = {
      from: "Futuro Perfeito <no-reply@futuroperfeito.com.br>",
      to: [userEmail],
      subject: "Bem-vindo ao Futuro Perfeito!",
      html: `
        <h1>Olá, ${userName || "concurseiro(a)"}!</h1>
        <p>Obrigado por realizar o teste do Futuro Perfeito.</p>
        <p>Seu relatório personalizado está disponível logo após o pagamento.</p>
      `,
    };

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify(emailBody),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      return res.status(resendRes.status).json({
        error: "Resend API error",
        status: resendRes.status,
        details: resendData,
      });
    }

    return res.status(200).json({
      ok: true,
      details: resendData,
    });
  } catch (err: any) {
    return res.status(500).json({
      error: "Server error",
      details: err?.message || String(err),
    });
  }
}

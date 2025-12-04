export default async function handler(req, res) {
  const token = process.env.PUSHINPAY_API_TOKEN;
  const url = "https://api.pushinpay.com/pix/charge";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: "25.00",   // formato correto
        description: "Relatorio vocacional"
      }),
    });

    const data = await response.json();

    console.log("Resposta PUSHINPAY:", data);

    return res.status(200).json(data);

  } catch (err) {
    console.error("Erro PIX:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
}

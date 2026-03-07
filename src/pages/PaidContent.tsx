import { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { PaidContent as PaidContentType } from "@/types/quiz";
import { getHomeVariant, trackEvent, trackPurchase } from "@/lib/analytics";
import { MercadoPagoButton } from "@/components/MercadoPagoButton";

type Status = "idle" | "pending" | "paid" | "verifying";

const PIX_STORAGE_KEY = "pix_last_order_state";
const CONTACT_STORAGE_KEY = "quiz_contact";

export const PaidContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paidContent, setPaidContent] = useState<PaidContentType | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [quizResponseId, setQuizResponseId] = useState<string | undefined>();
  const [error, setError] = useState("");

  const pollRef = useRef<number | null>(null);

  const stopPolling = () => {
    if (pollRef.current) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  const loadContact = () => {
    try {
      const raw = window.localStorage.getItem(CONTACT_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const name = typeof parsed?.name === "string" && parsed.name.trim().length ? parsed.name : "Concurseiro";
      const email = typeof parsed?.email === "string" ? parsed.email.trim().toLowerCase() : "";
      const quizId = typeof parsed?.quizResponseId === "string" ? parsed.quizResponseId : undefined;
      if (!email) return null;
      return { name, email, quizResponseId: quizId };
    } catch {
      return null;
    }
  };

  const loadPixState = () => {
    try {
      const raw = window.localStorage.getItem(PIX_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed?.order_id) return null;
      return {
        orderId: parsed.order_id as string,
        paymentStatus: (parsed.payment_status as string) || "pending",
        userEmail: (parsed.user_email as string) || "",
        resultEmailStatus: parsed.result_email_status as string | null | undefined,
      };
    } catch {
      return null;
    }
  };

  const checkStatus = async (order: string, email: string) => {
    try {
      const resp = await fetch("/api/orders/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: order, user_email: email }),
      });
      if (!resp.ok) return null;
      const data = await resp.json();
      return data;
    } catch (err) {
      console.error("Erro ao verificar status do pedido:", err);
      return null;
    }
  };

  useEffect(() => {
    const contact = loadContact();
    if (!contact) {
      setError("Preciso do seu email para liberar o plano. Refaca o teste e informe o email.");
      setLoading(false);
      return;
    }

    setUserName(contact.name);
    setUserEmail(contact.email);
    setQuizResponseId(contact.quizResponseId);

    const pixState = loadPixState();
    const hasPaymentParam = Boolean(searchParams.get("session_id") || searchParams.get("payment_id"));

    if (pixState?.orderId) {
      setOrderId(pixState.orderId);
      const normalized = (pixState.paymentStatus || "").toLowerCase();
      if (normalized === "paid") {
        setStatus("paid");
        setLoading(false);
        return;
      }
      setStatus(hasPaymentParam ? "verifying" : "pending");
      setLoading(false);

      const poll = async () => {
        const res = await checkStatus(pixState.orderId, contact.email);
        const paymentStatus = (res?.payment_status || "").toLowerCase();
        if (paymentStatus === "paid") {
          setStatus("paid");
          stopPolling();
          trackPurchase(pixState.orderId, 25.0, { home_variant: getHomeVariant() });
        }
      };
      poll();
      pollRef.current = window.setInterval(poll, 4000);
      return () => stopPolling();
    }

    if (hasPaymentParam) {
      setStatus("verifying");
      setLoading(false);
      const timeout = window.setTimeout(() => {
        setStatus("idle");
      }, 2500);
      return () => {
        window.clearTimeout(timeout);
        stopPolling();
      };
    } else {
      setStatus("idle");
    }

    setLoading(false);
    return () => stopPolling();
  }, [searchParams]);

  useEffect(() => {
    if (status !== "paid") return;
    if (!paidContent) {
      const mock: PaidContentType = {
        studyPlan: { days: [], hoursPerDay: "2h", focus: "Inicio rapido" },
        alternativeCareers: [],
        studyRoadmap: "Plano sera enviado por e-mail.",
        freeMaterials: [],
        whatsappGroupInfo: "",
        whatsappSupportNumber: "5591984233672",
      };
      setPaidContent(mock);
    }
    toast.success("Pagamento confirmado!");
  }, [status, paidContent]);

  useEffect(() => {
    return () => stopPolling();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground">Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-lg text-destructive">{error}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate("/")}>Voltar ao inicio</Button>
            <Button variant="outline" asChild>
              <Link to="/">Refazer o teste</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const renderPaywall = () => (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="p-8 shadow-2xl border-primary/20 space-y-6">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">Plano completo</p>
            <h1 className="text-3xl md:text-4xl font-bold">Desbloqueie seu plano completo por R$25</h1>
            <p className="text-base text-muted-foreground">
              Use PIX seguro. Assim que o pagamento for aprovado, liberamos o acesso e enviamos por e-mail.
            </p>
          </div>

          <div className="space-y-6">
            <MercadoPagoButton
              userName={userName || "Concurseiro"}
              userEmail={userEmail}
              quizResponseId={quizResponseId}
              amount={25}
              location="paid_content_page"
              quizVersion="v2"
              onStatusChange={(next) => {
                if (next.orderId) setOrderId(next.orderId);
                if (next.paymentStatus === "paid") {
                  setStatus("paid");
                } else if (next.paymentStatus === "pending") {
                  setStatus("pending");
                } else {
                  setStatus("idle");
                }
              }}
            />

            {status === "pending" && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Pagamento em processamento. Confirmamos em poucos segundos e liberamos seu plano.
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-3 text-sm text-muted-foreground">
              <div className="rounded-lg border p-4 bg-muted/50">Checklist de edital + roteiro de 7 dias</div>
              <div className="rounded-lg border p-4 bg-muted/50">Comparacao de areas e cargos</div>
              <div className="rounded-lg border p-4 bg-muted/50">Suporte rapido via WhatsApp apos confirmar</div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Usa outro email? Refaca o teste para atualizar o contato antes de pagar.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );

  if (status !== "paid" || !paidContent) {
    return status === "verifying" ? (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground">Verificando pagamento...</p>
        </div>
      </div>
    ) : (
      renderPaywall()
    );
  }

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_contact_clicked", {
      source: "paid_content_page",
    });

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Contact", {
        content_name: "WhatsApp Support - Post Purchase",
      });
    }
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace("55", "");
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const whatsappMessage = encodeURIComponent(
    "Ola! Acabei de fazer o pagamento do Pacote Completo de Preparacao e gostaria de receber meu acesso."
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-6 shadow-lg animate-bounce-slow">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Pagamento confirmado!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Ola, <strong>{userName.split(" ")[0]}</strong>! Seu investimento foi processado com sucesso.
          </p>
        </div>

        <Card className="p-8 shadow-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-2 border-green-500">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4 animate-pulse">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold mb-2 text-green-900 dark:text-green-100">
              Proximo passo: receba seu material
            </h2>

            <p className="text-lg font-semibold mb-6 text-green-800 dark:text-green-200">
              Entre em contato agora para liberar seu acesso
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border-2 border-green-300 dark:border-green-700">
              <p className="text-base text-gray-700 dark:text-gray-300 mb-3">
                <strong>IMPORTANTE:</strong> Clique no botao abaixo e envie uma mensagem no WhatsApp dizendo:
              </p>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 my-4 border-l-4 border-green-500">
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "Ola! Acabei de fazer o pagamento do Pacote Completo de Preparacao e gostaria de receber meu acesso."
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vou te enviar todo o material em ate <strong className="text-green-600 dark:text-green-400">10 minutos</strong>!
              </p>
            </div>

            <a
              href={`https://wa.me/${paidContent.whatsappSupportNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="block"
            >
              <Button
                size="lg"
                className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <MessageCircle className="mr-2 w-6 h-6" />
                Falar comigo agora: {formatPhoneNumber(paidContent.whatsappSupportNumber)}
              </Button>
            </a>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              Atendimento imediato • Entrega em ate 10 minutos
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Confirmacao enviada para: <strong>{userName}</strong>
          </p>
          {orderId ? (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Pedido: {orderId}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

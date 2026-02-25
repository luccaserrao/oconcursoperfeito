import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Copy, Check } from "lucide-react";
import {
  getHomeVariant,
  trackBeginCheckout,
  trackCheckoutSuccess,
  trackCtaDesbloqueioClick,
  trackEvent,
} from "@/lib/analytics";
import { trackJourneyStep } from "@/lib/quizTracking";

interface MercadoPagoButtonProps {
  userName: string;
  userEmail: string;
  quizResponseId?: string;
  amount?: number;
  location?: string;
  quizVersion?: "v1" | "v2";
  onStatusChange?: (status: {
    orderId?: string | null;
    paymentStatus: "idle" | "pending" | "paid" | "rejected" | "failed";
    resultEmailStatus?: string | null;
  }) => void;
}

interface PixData {
  qrCodeImage?: string;
  copyPaste?: string;
}

type PaymentStatus = "idle" | "pending" | "paid" | "rejected" | "failed";

export const MercadoPagoButton = ({
  userName,
  userEmail,
  quizResponseId,
  amount = 25,
  location = "unknown",
  quizVersion,
  onStatusChange,
}: MercadoPagoButtonProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [copied, setCopied] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [resultEmailStatus, setResultEmailStatus] = useState<string | null>(null);
  const pollingRef = useRef<number | null>(null);
  const pollStartedAt = useRef<number | null>(null);
  const trackedPurchase = useRef(false);

  const STORAGE_KEY = "pix_last_order_state";

  const persistState = (next: {
    orderId?: string | null;
    paymentStatus?: PaymentStatus;
    resultEmailStatus?: string | null;
  }) => {
    if (typeof window === "undefined") return;
    const payload = {
      order_id: next.orderId ?? orderId,
      payment_status: next.paymentStatus ?? paymentStatus,
      result_email_status: next.resultEmailStatus ?? resultEmailStatus,
      user_email: userEmail,
      quiz_response_id: quizResponseId || null,
      updated_at: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const notifyStatus = (next: {
    orderId?: string | null;
    paymentStatus: PaymentStatus;
    resultEmailStatus?: string | null;
  }) => {
    onStatusChange?.({
      orderId: next.orderId ?? orderId,
      paymentStatus: next.paymentStatus,
      resultEmailStatus: next.resultEmailStatus ?? resultEmailStatus,
    });
  };

  const clearPolling = () => {
    if (pollingRef.current) {
      window.clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const startPolling = (orderIdToPoll: string) => {
    if (typeof window === "undefined") return;
    if (pollingRef.current) return;

    pollStartedAt.current = Date.now();

    const poll = async () => {
      try {
        const resp = await fetch("/api/orders/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderIdToPoll, user_email: userEmail }),
        });

        if (!resp.ok) {
          return;
        }

        const data = await resp.json();
        const normalized = (data?.payment_status || "").toLowerCase();
        const status: PaymentStatus =
          normalized === "paid"
            ? "paid"
            : normalized === "rejected" || normalized === "failed"
              ? "rejected"
              : "pending";

        setPaymentStatus(status);
        setResultEmailStatus(data?.result_email_status || null);
        persistState({
          orderId: orderIdToPoll,
          paymentStatus: status,
          resultEmailStatus: data?.result_email_status || null,
        });
        notifyStatus({
          orderId: orderIdToPoll,
          paymentStatus: status,
          resultEmailStatus: data?.result_email_status || null,
        });

        if (status === "paid") {
          clearPolling();
          if (!trackedPurchase.current) {
            trackCheckoutSuccess(orderIdToPoll, amount, { home_variant: getHomeVariant() });
            trackedPurchase.current = true;
          }
          toast({
            title: "Pagamento confirmado!",
            description: "Seu resultado completo sera enviado por email.",
          });
        }
      } catch (error) {
        console.error("Erro ao verificar status do pedido:", error);
      }
    };

    poll();
    pollingRef.current = window.setInterval(() => {
      if (pollStartedAt.current && Date.now() - pollStartedAt.current > 5 * 60 * 1000) {
        clearPolling();
        return;
      }
      poll();
    }, 4000);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedRaw = window.localStorage.getItem(STORAGE_KEY);
    if (!storedRaw) return;

    try {
      const stored = JSON.parse(storedRaw);
      if (!stored?.order_id || !stored?.user_email) return;
      if (stored.user_email !== userEmail) return;
      if (quizResponseId && stored.quiz_response_id && stored.quiz_response_id !== quizResponseId) return;

      setOrderId(stored.order_id);
      const status = (stored.payment_status || "pending") as PaymentStatus;
      setPaymentStatus(status);
      setResultEmailStatus(stored.result_email_status || null);
      notifyStatus({
        orderId: stored.order_id,
        paymentStatus: status,
        resultEmailStatus: stored.result_email_status || null,
      });

      if (status !== "paid") {
        startPolling(stored.order_id);
      }
    } catch {
      // ignore parse errors
    }

    return () => clearPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, quizResponseId]);

  useEffect(() => {
    if (paymentStatus !== "paid") return;
    trackJourneyStep({
      step: "payment_confirmed",
      quiz_version: quizVersion,
      quiz_response_id: quizResponseId || null,
      order_id: orderId || null,
      metadata: { location },
    });
  }, [paymentStatus, orderId, quizResponseId, quizVersion, location]);

  const handleClick = async () => {
    if (isLoading) return;
    if (paymentStatus === "paid") {
      toast({
        title: "Pagamento ja confirmado",
        description: "Seu resultado completo sera enviado por email.",
      });
      return;
    }

    try {
      setIsLoading(true);
      setCopied(false);

      trackJourneyStep({
        step: "upsell_clicked",
        quiz_version: quizVersion,
        quiz_response_id: quizResponseId || null,
        metadata: { location },
      });
      trackJourneyStep({
        step: "checkout_started",
        quiz_version: quizVersion,
        quiz_response_id: quizResponseId || null,
        metadata: { location },
      });
      trackCtaDesbloqueioClick(location);
      if (quizVersion === "v2") {
        trackEvent("cta_desbloqueio_click_v2", { location });
      }
      trackBeginCheckout(amount, { home_variant: getHomeVariant() });

      toast({
        title: "Gerando PIX...",
        description: "Estamos criando seu QR Code e o codigo para copiar e colar.",
      });

      const body: Record<string, string | number | undefined> = {
        userName,
        userEmail,
        quizResponseId,
        amount,
      };

      const resp = await fetch("/api/createPix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const rawText = await resp.text();
      let json: any = {};
      try {
        json = rawText ? JSON.parse(rawText) : {};
      } catch (parseError) {
        console.error("Parse error on createPix response:", parseError, rawText);
        json = {};
      }

      if (!resp.ok) {
        const detail = json?.details || json?.error || resp.statusText || `Erro no checkout (status ${resp.status})`;
        throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
      }

      if (json?.already_paid) {
        setPaymentStatus("paid");
        setOrderId(json?.order_id || null);
        persistState({ orderId: json?.order_id || null, paymentStatus: "paid" });
        notifyStatus({ orderId: json?.order_id || null, paymentStatus: "paid" });
        toast({
          title: "Pagamento ja confirmado",
          description: "Seu resultado completo sera enviado por email.",
        });
        return;
      }

      if (!json.qrCodeImage && !json.copyPaste) {
        throw new Error("Erro ao gerar PIX. Tente novamente em instantes.");
      }

      setPixData({
        qrCodeImage: json.qrCodeImage || undefined,
        copyPaste: json.copyPaste || "",
      });

      if (json?.order_id) {
        setOrderId(json.order_id);
        setPaymentStatus("pending");
        persistState({ orderId: json.order_id, paymentStatus: "pending" });
        notifyStatus({ orderId: json.order_id, paymentStatus: "pending" });
        startPolling(json.order_id);
      }

      toast({
        title: "PIX gerado!",
        description: "Use o QR Code ou o codigo para copiar e colar abaixo.",
      });
    } catch (error) {
      console.error("Payment error:", error);
      const detail =
        (error instanceof Error && error.message) ||
        (typeof error === "string" && error) ||
        (typeof error === "object" && error && "message" in error ? String((error as { message?: unknown }).message) : null) ||
        "nao foi possivel processar. Tente novamente.";

      toast({
        variant: "destructive",
        title: "Erro no checkout",
        description: typeof detail === "string" ? detail : JSON.stringify(detail),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!pixData?.copyPaste) return;
    try {
      await navigator.clipboard.writeText(pixData.copyPaste);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed", error);
      toast({
        variant: "destructive",
        title: "Erro ao copiar",
        description: "Tente copiar manualmente o codigo",
      });
    }
  };

  const qrCodeSrc = pixData?.qrCodeImage?.startsWith("data:")
    ? pixData.qrCodeImage
    : pixData?.qrCodeImage
      ? `data:image/png;base64,${pixData.qrCodeImage}`
      : undefined;

  return (
    <div className="w-full space-y-3">
      <Button
        onClick={handleClick}
        disabled={isLoading || paymentStatus === "paid"}
        size="lg"
        aria-label={`Pagar R$ ${amount} com segurança via PIX`}
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-base md:text-lg py-5 md:py-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-full shadow-[var(--shadow-elevated)]"
      >
        {paymentStatus === "paid" ? (
          <span className="flex items-center justify-center">
            <Check className="mr-2 w-5 h-5 flex-shrink-0" />
            Pagamento confirmado
          </span>
        ) : isLoading ? (
          <span className="flex items-center justify-center">
            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Processando...
          </span>
        ) : (
          <span className="flex items-center justify-center whitespace-nowrap">
            <CreditCard className="mr-2 w-5 h-5 flex-shrink-0" />
            <span className="truncate">Gerar PIX de R$ {amount}</span>
          </span>
        )}
      </Button>

      {pixData && (
        <div className="w-full rounded-lg border bg-card p-4 shadow-sm space-y-3">
          <p className="font-semibold">Pague escaneando ou copiando o codigo:</p>

          {qrCodeSrc && (
            <div className="flex justify-center">
              <img src={qrCodeSrc} alt="QR Code PIX" className="w-48 h-48 rounded-md border" />
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Copie e cole (PIX ideal no celular)</p>
            <div className="flex flex-col gap-2">
              <div className="rounded-md bg-muted p-3 text-sm break-all min-h-[64px] flex items-center">
                {pixData.copyPaste || "Codigo ainda nao carregou. Aguarde 1 segundo ou toque novamente em copiar."}
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                className="self-start"
                disabled={!pixData.copyPaste}
              >
                {copied ? (
                  <span className="flex items-center gap-2 text-emerald-700">
                    <Check className="h-4 w-4" /> Copiado!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Copy className="h-4 w-4" /> Copiar codigo
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {paymentStatus === "pending" && orderId && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Aguardando confirmacao do pagamento. Assim que o PIX for aprovado, voce recebera o resultado completo por email.
        </div>
      )}

      {paymentStatus === "paid" && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Pagamento confirmado. Voce vai receber o resultado completo no email em instantes.
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Copy, Check } from "lucide-react";
import { getHomeVariant, trackBeginCheckout, trackCtaDesbloqueioClick } from "@/lib/analytics";

interface MercadoPagoButtonProps {
  userName: string;
  userEmail: string;
  quizResponseId?: string;
  amount?: number;
  location?: string;
}

interface PixData {
  qrCodeImage?: string;
  copyPaste?: string;
}

export const MercadoPagoButton = ({
  userName,
  userEmail,
  quizResponseId,
  amount = 25,
  location = "unknown",
}: MercadoPagoButtonProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setCopied(false);

      trackCtaDesbloqueioClick(location);
      trackBeginCheckout(amount, { home_variant: getHomeVariant() });

      toast({
        title: "Gerando PIX...",
        description: "Estamos criando seu QR Code e o código para copiar e colar.",
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

      if (!json.qrCodeImage && !json.copyPaste) {
        throw new Error("Erro ao gerar PIX. Tente novamente em instantes.");
      }

      setPixData({
        qrCodeImage: json.qrCodeImage || undefined,
        copyPaste: json.copyPaste || "",
      });

      toast({
        title: "PIX gerado!",
        description: "Use o QR Code ou o código para copiar e colar abaixo.",
      });
    } catch (error) {
      console.error("Payment error:", error);
      const detail =
        (error instanceof Error && error.message) ||
        (typeof error === "string" && error) ||
        (typeof error === "object" && error && "message" in error ? String((error as { message?: unknown }).message) : null) ||
        "não foi possível processar. Tente novamente.";

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
        description: "Tente copiar manualmente o código",
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
        disabled={isLoading}
        size="lg"
        aria-label={`Pagar R$ ${amount} com segurança via PIX`}
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-base md:text-lg py-5 md:py-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-full shadow-[var(--shadow-elevated)]"
      >
        {isLoading ? (
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
          <p className="font-semibold">Pague escaneando ou copiando o código:</p>

          {qrCodeSrc && (
            <div className="flex justify-center">
              <img src={qrCodeSrc} alt="QR Code PIX" className="w-48 h-48 rounded-md border" />
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Copie e cole (PIX ideal no celular)</p>
            <div className="flex flex-col gap-2">
              <div className="rounded-md bg-muted p-3 text-sm break-all min-h-[64px] flex items-center">
                {pixData.copyPaste || "Código ainda não carregou. Aguarde 1 segundo ou toque novamente em copiar."}
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
                    <Copy className="h-4 w-4" /> Copiar código
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};





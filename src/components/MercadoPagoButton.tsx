import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";
import { trackBeginCheckout, trackCtaDesbloqueioClick } from "@/lib/analytics";

interface MercadoPagoButtonProps {
  userName: string;
  userEmail: string;
  quizResponseId?: string;
  productId?: string;
  amount?: number;
  location?: string;
}

export const MercadoPagoButton = ({ userName, userEmail, quizResponseId, productId, amount = 25, location = 'unknown' }: MercadoPagoButtonProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    // Prevenir cliques múltiplos
    if (isLoading) {
      console.log("Button already processing, ignoring click");
      return;
    }
    
    try {
      setIsLoading(true);
      console.log("Starting payment process");
      
      // Track CTA Desbloqueio Click
      trackCtaDesbloqueioClick(location);
      
      // Track begin_checkout for Google Ads
      trackBeginCheckout(amount);
      console.log("Google Ads: begin_checkout tracked");
      
      // Track Facebook Pixel - InitiateCheckout
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          value: amount,
          currency: 'BRL',
          content_name: 'Pacote Completo de Preparação',
          content_category: 'Concursos Públicos'
        });
        console.log("Facebook Pixel: InitiateCheckout tracked");
      }
      
      toast({
        title: "Processando...",
        description: "Preparando seu checkout",
      });

      const body: any = { userName, userEmail, quizResponseId };
      if (productId) body.product_id = productId;
      if (amount) body.amount = amount;

      console.log("Request body:", body);
      const endpoint = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/createPreference`;
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const text = await resp.text();
      console.log("CreatePreference raw response:", resp.status, text);

      let json: any = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        console.error("Failed to parse JSON from createPreference:", parseErr);
      }

      if (!resp.ok) {
        const detail = json?.details || json?.error || text || `Erro no checkout (status ${resp.status})`;
        throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
      }

      if (json?.init_point) {
        console.log("Redirecting to:", json.init_point);
        window.location.href = json.init_point;
      } else {
        console.error("No init_point in response JSON", json);
        throw new Error('No init_point returned');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsLoading(false); // Só desabilita loading em caso de erro
      
      const ctx = (error as any)?.context || {};

      // Tenta ler o corpo da resposta da Edge Function (se existir)
      let serverBodyText: string | null = null;
      try {
        const resp = (ctx as any)?.response as Response | undefined;
        if (resp && typeof resp.text === "function") {
          serverBodyText = await resp.text();
          console.error("CreatePreference body:", serverBodyText);
        }
        // Caso o próprio ctx seja a Response
        if (!serverBodyText && ctx instanceof Response && typeof ctx.text === "function") {
          serverBodyText = await ctx.text();
          console.error("CreatePreference body (ctx is response):", serverBodyText);
        }
      } catch (readErr) {
        console.error("Failed to read error body:", readErr);
      }

      const detail =
        serverBodyText ||
        (ctx as any)?.body ||
        (error instanceof Error && error.message) ||
        ctx.error ||
        ctx.details ||
        (typeof error === "object" && error && "message" in (error as any) ? (error as any).message : null) ||
        "Não foi possível processar. Tente novamente.";

      toast({
        variant: "destructive",
        title: "Erro no checkout",
        description: typeof detail === "string" ? detail : JSON.stringify(detail),
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      size="lg"
      aria-label={`Pagar R$ ${amount} com segurança pelo Mercado Pago`}
      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base md:text-lg py-5 md:py-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-full shadow-[var(--shadow-elevated)]"
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Processando...
        </span>
      ) : (
        <span className="flex items-center justify-center whitespace-nowrap">
          <CreditCard className="mr-2 w-5 h-5 flex-shrink-0" />
          <span className="truncate">Pagar R$ {amount} — acesso imediato</span>
        </span>
      )}
    </Button>
  );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
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
      console.log("⚠️ Button already processing, ignoring click");
      return;
    }
    
    try {
      setIsLoading(true);
      console.log("🚀 Starting payment process");
      
      // Track CTA Desbloqueio Click
      trackCtaDesbloqueioClick(location);
      
      // Track begin_checkout for Google Ads
      trackBeginCheckout(amount);
      console.log("📊 Google Ads: begin_checkout tracked");
      
      // Track Facebook Pixel - InitiateCheckout
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          value: amount,
          currency: 'BRL',
          content_name: 'Pacote Completo de Preparação',
          content_category: 'Concursos Públicos'
        });
        console.log("📊 Facebook Pixel: InitiateCheckout tracked");
      }
      
      toast({
        title: "Processando...",
        description: "Preparando seu checkout",
      });

      const body: any = { userName, userEmail, quizResponseId };
      if (productId) body.product_id = productId;
      if (amount) body.amount = amount;

      console.log("📦 Request body:", body);

      const { data, error } = await supabase.functions.invoke('createPreference', {
        body
      });

      console.log("📡 Response:", { data, error });

      if (error) {
        console.error("❌ Error from createPreference:", error);
        throw error;
      }

      if (data?.init_point) {
        console.log("✅ Redirecting to:", data.init_point);
        // Manter loading ativo até o redirecionamento completar
        window.location.href = data.init_point;
      } else {
        console.error("❌ No init_point in response");
        throw new Error('No init_point returned');
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      setIsLoading(false); // Só desabilita loading em caso de erro
      
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível processar. Tente novamente.",
      });
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      size="lg"
      className="group h-auto w-full rounded-full bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#0ea5e9] py-6 text-base font-semibold text-white shadow-[0_24px_55px_-20px_rgba(76,29,149,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_32px_65px_-18px_rgba(14,165,233,0.65)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/60 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-lg"
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Processando...
        </span>
      ) : (
        <span className="flex items-center justify-center whitespace-nowrap text-center">
          <CreditCard className="mr-2 h-5 w-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <span className="truncate">Garanta meu plano completo por R$ {amount}</span>
        </span>
      )}
    </Button>
  );
};

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";

interface MercadoPagoButtonProps {
  userName: string;
  userEmail: string;
  quizResponseId?: string;
  productId?: string;
  amount?: number;
}

export const MercadoPagoButton = ({ userName, userEmail, quizResponseId, productId, amount }: MercadoPagoButtonProps) => {
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      toast({
        title: "Processando...",
        description: "Preparando seu checkout",
      });

      const body: any = { userName, userEmail, quizResponseId };
      if (productId) body.product_id = productId;
      if (amount) body.amount = amount;

      const { data, error } = await supabase.functions.invoke('createPreference', {
        body
      });

      if (error) throw error;

      if (data?.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error('Error:', error);
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
      size="lg"
      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg py-6"
    >
      <CreditCard className="mr-2 w-5 h-5" />
      Pagar R$ 50,00 com Mercado Pago
    </Button>
  );
};

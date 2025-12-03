import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { PaidContent as PaidContentType } from "@/types/quiz";
import { trackEvent, trackPurchase } from "@/lib/analytics";

export const PaidContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paidContent, setPaidContent] = useState<PaidContentType | null>(null);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const paymentId = searchParams.get("payment_id") || "simulado";
    const mock: PaidContentType = {
      studyPlan: { days: [], hoursPerDay: "2h", focus: "Início rápido" },
      alternativeCareers: [],
      studyRoadmap: "Plano será enviado por e-mail.",
      freeMaterials: [],
      whatsappGroupInfo: "",
      whatsappSupportNumber: "5591984233672",
    };
    setUserName("Usuário");
    setPaidContent(mock);
    trackPurchase(paymentId, 25.0);
    toast.success("Pagamento confirmado!");
    setLoading(false);
  }, [searchParams]);

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
        <div className="text-center">
          <p className="text-lg text-destructive mb-4">{error}</p>
          <Button onClick={() => navigate("/")}>Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  if (!paidContent) return null;

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_contact_clicked', { 
      source: 'paid_content_page'
    });
    
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: 'WhatsApp Support - Post Purchase'
      });
    }
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace('55', '');
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const whatsappMessage = encodeURIComponent('Olá! Acabei de fazer o pagamento do Pacote Completo de Preparação e gostaria de receber meu acesso.');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-6 shadow-lg animate-bounce-slow">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Pagamento Confirmado! ✅
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Olá, <strong>{userName.split(' ')[0]}</strong>! Seu investimento foi processado com sucesso.
          </p>
        </div>

        {/* WhatsApp Contact Card */}
        <Card className="p-8 shadow-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-2 border-green-500">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4 animate-pulse">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-green-900 dark:text-green-100">
              Próximo Passo: Receba Seu Material
            </h2>
            
            <p className="text-lg font-semibold mb-6 text-green-800 dark:text-green-200">
              Entre em contato agora para liberar seu acesso
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border-2 border-green-300 dark:border-green-700">
              <p className="text-base text-gray-700 dark:text-gray-300 mb-3">
                🔔 <strong>IMPORTANTE:</strong> Clique no botão abaixo e me envie uma mensagem no WhatsApp dizendo:
              </p>
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 my-4 border-l-4 border-green-500">
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "Olá! Acabei de fazer o pagamento do Pacote Completo de Preparação e gostaria de receber meu acesso."
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vou te enviar todo o material em até <strong className="text-green-600 dark:text-green-400">10 minutos</strong>!
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
                Falar Comigo Agora: {formatPhoneNumber(paidContent.whatsappSupportNumber)}
              </Button>
            </a>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              🚀 Atendimento imediato · 📦 Entrega em até 10 minutos
            </p>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            📧 Confirmação enviada para: <strong>{userName}</strong>
          </p>
        </div>

      </div>
    </div>
  );
};

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { trackConversion } from "@/lib/analytics";

const Obrigado = () => {
  useEffect(() => {
    // Registrar conversão no Google Ads
    trackConversion('AW-XXXXXXX/YYYZZZZ');
  }, []);

  const handleWhatsAppClick = () => {
    const whatsappUrl = "https://wa.me/5591984233672?text=Olá,+acabei+de+realizar+meu+pagamento+e+quero+reivindicar+meu+produto!";
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          ✅ Pagamento confirmado!
        </h1>

        {/* Texto principal */}
        <div className="space-y-4 text-lg text-gray-700">
          <p>
            Parabéns! Seu pagamento foi confirmado com sucesso 🎉
          </p>
          <p>
            Para liberar o acesso ao seu produto, fale diretamente comigo pelo WhatsApp.
          </p>
          <p className="font-medium">
            Basta clicar no botão abaixo 👇
          </p>
        </div>

        {/* Botão WhatsApp */}
        <div className="pt-4">
          <Button
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            size="lg"
          >
            📲 Falar com o Suporte
          </Button>
        </div>

        {/* Rodapé */}
        <p className="text-sm text-gray-500 italic pt-8">
          *Atendimento disponível de segunda a sexta, das 9h às 18h.*
        </p>
      </div>
    </div>
  );
};

export default Obrigado;

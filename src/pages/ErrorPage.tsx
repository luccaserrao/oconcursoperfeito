import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { RefreshCw, MessageCircle } from "lucide-react";

interface ErrorPageProps {
  onRetry: () => void;
}

const ErrorPage = ({ onRetry }: ErrorPageProps) => {
  const whatsappUrl = "https://wa.me/5591984233672?text=Tive%20um%20problema%20ao%20gerar%20minha%20recomenda%C3%A7%C3%A3o%20de%20carreira";

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center py-8">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="p-8 shadow-[var(--shadow-elevated)] text-center">
            <div className="text-6xl mb-4">😅</div>
            
            <h2 className="text-2xl font-bold mb-3">Ops! Algo deu errado...</h2>
            
            <p className="text-muted-foreground mb-6">
              Nossa IA está sobrecarregada agora (muita gente fazendo o quiz!). 
              Mas não se preocupe, seus dados estão salvos.
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={onRetry} 
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Tentar Novamente
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="w-full"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Falar com Suporte (WhatsApp)
                </a>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-6">
              Geralmente resolve em segundos. Se persistir, te respondo 
              no WhatsApp rapidinho!
            </p>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;

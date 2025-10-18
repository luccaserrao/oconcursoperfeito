import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface LandingProps {
  onStart: () => void;
}

export const Landing = ({ onStart }: LandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Recomendação personalizada por IA
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Descubra o{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Concurso Público Perfeito
            </span>
            {" "}para Você
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Em menos de 5 minutos, descubra a carreira pública ideal para seu perfil — 
            com alto salário e alta chance de aprovação
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 py-8">
            {[
              {
                title: "Análise de Perfil",
                description: "IA analisa suas respostas e identifica a carreira perfeita"
              },
              {
                title: "Salários Reais",
                description: "Descubra carreiras com remuneração de até R$ 25 mil+"
              },
              {
                title: "Plano de Estudos",
                description: "Receba um cronograma personalizado para começar já"
              }
            ].map((benefit, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300"
              >
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-8">
            <Button 
              onClick={onStart}
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent"
            >
              Iniciar Quiz Gratuito
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Social Proof */}
          <p className="text-sm text-muted-foreground pt-4">
            ✨ Mais de 1.000 pessoas já descobriram sua carreira ideal
          </p>
        </div>
      </div>
    </div>
  );
};

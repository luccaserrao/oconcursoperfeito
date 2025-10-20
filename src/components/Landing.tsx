import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2, Clock, Users, Award, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LandingProps {
  onStart: () => void;
}

export const Landing = ({ onStart }: LandingProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            {/* Badge with real-time counter */}
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-pulse">
                <Users className="w-4 h-4" />
                <span className="font-bold">847</span> pessoas fizeram o quiz esta semana
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
              Em apenas 5 minutos, descubra a carreira pública ideal para seu perfil — 
              com alto salário e maior chance de aprovação
            </p>

            {/* CTA Button */}
            <Button 
              onClick={onStart}
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent"
            >
              Iniciar Quiz Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* How it works */}
            <div className="pt-8">
              <h2 className="text-2xl font-bold mb-6">Como Funciona?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: "1️⃣",
                    title: "Responda 17 perguntas",
                    description: "Leva apenas 5 minutos"
                  },
                  {
                    icon: "2️⃣",
                    title: "IA analisa seu perfil",
                    description: "Algoritmo identifica a melhor carreira"
                  },
                  {
                    icon: "3️⃣",
                    title: "Receba sua carreira ideal",
                    description: "Com salário, próxima prova e plano de estudos"
                  }
                ].map((step, i) => (
                  <Card 
                    key={i} 
                    className="p-6 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-4xl mb-3">{step.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 py-8">
              {[
                {
                  icon: <Award className="w-6 h-6 text-primary" />,
                  title: "Análise de Perfil Completa",
                  description: "IA analisa suas respostas e identifica a carreira perfeita"
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
                  title: "Salários Reais",
                  description: "Descubra carreiras com remuneração de até R$ 25 mil+"
                },
                {
                  icon: <Clock className="w-6 h-6 text-primary" />,
                  title: "Resultado Imediato",
                  description: "Receba sua recomendação em segundos"
                }
              ].map((benefit, i) => (
                <Card 
                  key={i} 
                  className="p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300"
                >
                  <div className="mb-3">{benefit.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-8">
              <Button 
                onClick={onStart}
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent animate-pulse"
              >
                Iniciar Quiz Gratuito Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                ✅ 100% gratuito • ⏱️ 5 minutos • 🔒 Seus dados protegidos
              </p>
            </div>

            {/* FAQ */}
            <div className="pt-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
              <Accordion type="single" collapsible className="w-full text-left">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    É realmente grátis?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! O quiz e a recomendação básica são 100% gratuitos. 
                    Oferecemos também um Pacote Completo opcional (R$ 50) com cronograma 
                    de estudos, materiais e suporte.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Quanto tempo leva?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    O quiz tem 17 perguntas e leva em média 5 minutos. 
                    Você recebe o resultado imediatamente após finalizar.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    As recomendações são confiáveis?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! Nossa IA foi treinada com dados reais de concursos públicos, 
                    salários oficiais e perfis de milhares de aprovados. Já ajudamos 
                    mais de 1.000 pessoas a encontrarem sua carreira ideal.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Vou receber spam?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Não! Enviamos apenas seu resultado e, opcionalmente, 
                    informações sobre o Pacote Completo. Você pode cancelar 
                    o recebimento de e-mails a qualquer momento.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Posso fazer o quiz mais de uma vez?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! Você pode refazer o quiz quantas vezes quiser. 
                    Cada nova análise considera suas respostas mais recentes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Final social proof */}
            <div className="pt-8">
              <p className="text-sm text-muted-foreground">
                🔥 <strong>23 pessoas</strong> fizeram o quiz nas últimas 2 horas
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

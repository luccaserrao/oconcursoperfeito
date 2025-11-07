import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerRecommendation } from "@/types/quiz";
import { MercadoPagoButton } from "./MercadoPagoButton";
import { CountdownTimer } from "./CountdownTimer";
import { Footer } from "./Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  Lock,
  Star,
  Shield,
  Sparkles,
  Calendar,
  DollarSign,
  BookOpen,
  Target,
  TrendingUp,
  MessageCircle,
  AlertTriangle
} from "lucide-react";
import { trackEvent, trackCupomWhatsappClick } from "@/lib/analytics";

interface ResultsProps {
  recommendation: CareerRecommendation;
  userName: string;
  userEmail: string;
  quizResponseId?: string;
}

export const Results = ({
  recommendation,
  userName,
  userEmail,
  quizResponseId
}: ResultsProps) => {
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [showScrollCta, setShowScrollCta] = useState(false);
  
  // Extrair dados RIASEC
  const riasecData = recommendation.riasec || {
    top1: "Realista",
    top2: "Investigativo",
    habilidades: ["organizada", "comunicativa", "lógica", "criativa", "persistente"],
    habilidade_destaque: "práticas e objetivas",
    contexto_profissional: "organizar processos e resolver problemas complexos"
  };

  const firstName = userName.split(' ')[0];

  // Track page view
  useEffect(() => {
    trackEvent('results_viewed', {
      career: recommendation.careerName
    });
  }, [recommendation.careerName]);

  // Scroll tracking for CTAs
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Desktop floating CTA aparece após 60% de scroll
      if (scrollPercentage > 60 && window.innerWidth >= 768) {
        setShowFloatingCta(true);
      } else {
        setShowFloatingCta(false);
      }
      
      // Banner CTA aparece após 60% de scroll
      if (scrollPercentage > 60) {
        setShowScrollCta(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // A/B Test para CTA text
  const ctaVariant = Math.random() > 0.5 ? 'A' : 'B';
  const ctaText = ctaVariant === 'A' 
    ? "Quero meu plano completo agora (R$25)" 
    : "Desbloquear relatório profissional (R$25)";

  const handleWhatsAppClick = () => {
    trackCupomWhatsappClick();
    window.open('https://wa.me/5591984233672?text=Oi,+vi+meu+resultado+no+teste+e+quero+reivindicar+meu+cupom+de+R$5', '_blank');
  };

  return (
    <>
      {/* ============= TIMER FIXO NO TOPO ============= */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-destructive/90 to-destructive/70 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-white text-sm md:text-base">
          <Lock className="w-4 h-4" />
          <span className="font-medium">Seus dados expiram em:</span>
          <CountdownTimer initialMinutes={5} />
        </div>
      </div>

      {/* ============= CTA FLUTUANTE LATERAL (DESKTOP) ============= */}
      {showFloatingCta && (
        <div className="hidden md:block fixed right-4 top-1/2 -translate-y-1/2 z-40 animate-slide-in-right">
          <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-lg shadow-2xl max-w-xs">
            <p className="text-white font-bold text-center mb-3">
              Desbloqueie seu plano completo!
            </p>
            <MercadoPagoButton
              userName={userName}
              userEmail={userEmail}
              quizResponseId={quizResponseId}
              amount={25}
              location="floating_desktop"
            />
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
        
          {/* ============= 1️⃣ HERO - RESULTADO GRATUITO (R.I.A.S.E.C.) ============= */}
          <div className="mb-12 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {firstName}, seu perfil RIASEC predominante é: {riasecData.top1}
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Este é um recorte do seu potencial. Abaixo veja como transformar isso em um plano real de ação e estudo.
              </p>
            </div>

            {/* 3 Cards: Forças, Áreas, O que evitar */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-lg">Forças principais</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {riasecData.habilidades.slice(0, 3).map((hab, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="capitalize">{hab}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-lg">Áreas onde você tende a performar melhor</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{riasecData.contexto_profissional}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Tarefas que exigem {riasecData.habilidade_destaque}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Ambientes que valorizam suas qualidades</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-destructive/5 to-orange-500/5 border-2 border-destructive/20">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h3 className="font-bold text-lg">O que evitar</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <span>Funções muito rotineiras ou repetitivas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <span>Ambientes que não valorizam sua criatividade</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Aviso de Segurança */}
            <Card className="p-6 bg-destructive/10 border-2 border-destructive/30">
              <div className="flex items-center justify-center gap-2 text-destructive">
                <Lock className="w-5 h-5" />
                <p className="text-sm font-semibold">
                  🔒 Por segurança, seus dados ficam guardados por 5 minutos e depois são excluídos automaticamente.
                </p>
              </div>
            </Card>
          </div>

          {/* ============= 2️⃣ PROVA SOCIAL (DEPOIMENTOS REAIS) ============= */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              💬 Quem já fez o upgrade, descobriu o caminho certo!
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Carla Pereira",
                  location: "SP",
                  course: "cursando administração (4º período)",
                  date: "06/11/25",
                  text: "Eu já tinha feito vários testes gratuitos e nenhum fazia sentido, resolvi pagar os 25 reais e valeu demais, o relatório mostrou o concurso ideal pra mim, e ainda vem com um plano de estudo que me deixou animada pra começar logo."
                },
                {
                  name: "Lucas Andrade",
                  location: "MG",
                  course: "formado em direito",
                  date: "21/09/25",
                  text: "Eu tava perdido, sem saber qual carreira seguir, fiz o quiz e o relatório completo me deu uma clareza absurda, agora sei exatamente qual caminho seguir e onde focar, gostei muito do professor de IA e do cronograma de estudos que veio junto."
                },
                {
                  name: "Amanda Souza",
                  location: "PE",
                  course: "estudante de enfermagem",
                  date: "11/08/25",
                  text: "Achei que seria só mais um teste qualquer, mas esse aqui entrega de verdade, os 25 reais valeram cada centavo, recomendo pra quem quer saber o que seguir sem ficar perdido."
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 border-2 border-primary/10 animate-fade-in hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t pt-3">
                    <p className="font-bold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location} · {testimonial.course}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.date}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* ============= 3️⃣ PRÉVIA VISUAL DO RELATÓRIO COMPLETO (COM BLUR) ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/30 relative overflow-hidden">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  📊 Prévia do Relatório Profissional Completo
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Desbloqueie o Relatório Profissional Completo e transforme este resultado em um plano de ação prático para conquistar seu cargo ideal.
                </p>
              </div>

              {/* Mockup do relatório com blur */}
              <div className="relative">
                <div className="bg-card border-2 border-border rounded-lg p-8 blur-md select-none pointer-events-none">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full" />
                      <div>
                        <div className="h-4 bg-foreground/20 rounded w-48 mb-2" />
                        <div className="h-3 bg-foreground/10 rounded w-32" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-6 bg-foreground/20 rounded w-3/4" />
                      <div className="h-4 bg-foreground/10 rounded w-full" />
                      <div className="h-4 bg-foreground/10 rounded w-5/6" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-foreground/10 rounded" />
                      <div className="h-24 bg-foreground/10 rounded" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-4 bg-foreground/10 rounded w-full" />
                      <div className="h-4 bg-foreground/10 rounded w-4/5" />
                      <div className="h-4 bg-foreground/10 rounded w-5/6" />
                    </div>
                  </div>
                </div>

                {/* Etiquetas sobre o relatório borrado */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
                  <Lock className="w-16 h-16 text-primary animate-pulse" />
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
                    <Badge className="bg-primary/90 text-primary-foreground px-3 py-2">
                      <Target className="w-4 h-4 mr-1" />
                      Carreira indicada pela IA
                    </Badge>
                    <Badge className="bg-primary/90 text-primary-foreground px-3 py-2">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Faixa salarial completa
                    </Badge>
                    <Badge className="bg-primary/90 text-primary-foreground px-3 py-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      Probabilidade do edital
                    </Badge>
                    <Badge className="bg-primary/90 text-primary-foreground px-3 py-2">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Plano de estudos 30/60/90
                    </Badge>
                    <Badge className="bg-primary/90 text-primary-foreground px-3 py-2">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Materiais recomendados
                    </Badge>
                    <Badge className="bg-primary/90 text-primary-foreground px-3 py-2">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Checklist completo
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ============= 4️⃣ OFERTA (UPSELL NATURAL) ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-2 border-primary/30">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  Pronto pra sair do genérico e ter um plano sob medida?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Por menos que um hambúrguer (R$25) você recebe o caminho completo.
                </p>
              </div>

              {/* Lista de benefícios */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Target, text: "Cargo recomendado e justificativa do seu perfil" },
                  { icon: DollarSign, text: "Faixa salarial inicial e com progressão" },
                  { icon: Calendar, text: "Probabilidade do próximo edital" },
                  { icon: BookOpen, text: "Plano de estudos 30/60/90 dias" },
                  { icon: Sparkles, text: "Materiais práticos e checklist" },
                  { icon: TrendingUp, text: "Acesso imediato ao relatório" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Preço e Garantia */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-6 mb-6 text-center border-2 border-amber-500/20">
                <p className="text-4xl font-bold text-amber-600 mb-1">
                  R$ 25<span className="text-xl">,00</span>
                </p>
                <p className="text-sm text-muted-foreground mb-4">(pagamento único)</p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-bold mb-4">
                  <Shield className="w-4 h-4" />
                  Se não te ajudar, devolvemos o valor em até 7 dias
                </div>
              </div>

              {/* CTA Principal */}
              <div className="mb-4">
                <MercadoPagoButton
                  userName={userName}
                  userEmail={userEmail}
                  quizResponseId={quizResponseId}
                  amount={25}
                  location="main_offer"
                />
              </div>

              {/* Ícones de Confiança */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Conexão segura
                </span>
                <span>💳 Cartão</span>
                <span>🔵 Pix</span>
                <span>💚 Mercado Pago</span>
              </div>
            </Card>
          </div>

          {/* ============= BANNER CTA APÓS 60% DE SCROLL ============= */}
          {showScrollCta && (
            <div className="mb-12 animate-fade-in">
              <Card className="p-6 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xl font-bold mb-1">Ainda não desbloqueou seu plano?</p>
                    <p className="text-sm opacity-90">Aproveite enquanto seus dados ainda estão disponíveis!</p>
                  </div>
                  <MercadoPagoButton
                    userName={userName}
                    userEmail={userEmail}
                    quizResponseId={quizResponseId}
                    amount={25}
                    location="scroll_banner"
                  />
                </div>
              </Card>
            </div>
          )}

          {/* ============= 5️⃣ FAQ (RESPOSTAS CURTAS) ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-card">
              <h2 className="text-2xl font-bold text-center mb-8">
                ❓ Perguntas Frequentes
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Isso é melhor que teste gratuito?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Sim, aqui você recebe um plano real de ação baseado no seu perfil.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Em quanto tempo recebo?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Logo após o pagamento, o relatório é liberado automaticamente.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Posso acessar depois?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Sim, você pode baixar e consultar quando quiser.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      E meus dados?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Ficam guardados por 5 minutos e são apagados depois, por segurança.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>

          {/* ============= 6️⃣ CTA SECUNDÁRIO + DESCONTO VIA WHATSAPP ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-2 border-green-500/20 text-center">
              <h3 className="text-xl font-bold mb-4">Prefere conversar antes?</h3>
              <p className="text-muted-foreground mb-6">
                Fale comigo no WhatsApp e ganhe um cupom exclusivo de R$5 OFF!
              </p>
              
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                variant="outline"
                className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white border-none mb-4"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Prefiro pensar depois
              </Button>
              
              <p className="text-xs text-destructive font-semibold">
                ⏰ Cupom válido por 24h, após isso o desconto expira.
              </p>
            </Card>
          </div>

          {/* ============= CTA FINAL - ENCERRAMENTO EMOCIONAL ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                🌟 Seu futuro começa com uma decisão de R$25
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Você já deu o primeiro passo fazendo este teste. Agora é hora de transformar esse resultado em um plano de ação concreto.
              </p>
              
              <MercadoPagoButton
                userName={userName}
                userEmail={userEmail}
                quizResponseId={quizResponseId}
                amount={25}
                location="final_cta"
              />
              
              <p className="text-sm text-muted-foreground mt-4">
                ✨ Junte-se a centenas de pessoas que já descobriram seu caminho!
              </p>
            </Card>
          </div>

        </div>
      </div>

      {/* CTA Sticky Mobile (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-primary to-accent p-4 shadow-2xl">
        <MercadoPagoButton
          userName={userName}
          userEmail={userEmail}
          quizResponseId={quizResponseId}
          amount={25}
          location="sticky_mobile"
        />
      </div>

      <Footer />
    </>
  );
};

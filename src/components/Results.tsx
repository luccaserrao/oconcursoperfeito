import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerRecommendation, RiasecResult } from "@/types/quiz";
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
  AlertTriangle,
  Lightbulb,
  Scale,
  Dna,
  Coins,
  Globe,
  Award,
  Brain,
  Clock,
  Users,
  Zap
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trackEvent, trackCupomWhatsappClick } from "@/lib/analytics";

interface ResultsProps {
  recommendation: CareerRecommendation;
  userName: string;
  userEmail: string;
  quizResponseId?: string;
  riasecFallback?: RiasecResult;
}

export const Results = ({
  recommendation,
  userName,
  userEmail,
  quizResponseId,
  riasecFallback
}: ResultsProps) => {
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [showScrollCta, setShowScrollCta] = useState(false);
  const [ctaVariant] = useState<'A' | 'B'>(() => {
    if (typeof window === "undefined") return "A";
    const stored = window.localStorage.getItem("cta_variant");
    if (stored === "A" || stored === "B") return stored;
    const variant = Math.random() > 0.5 ? "A" : "B";
    window.localStorage.setItem("cta_variant", variant);
    return variant;
  });
  
  // Extrair dados RIASEC
  const riasecData = recommendation.riasec || riasecFallback || {
    top1: "Realista",
    top2: "Investigativo",
    habilidades: ["organizada", "comunicativa", "logica", "criativa", "persistente"],
    habilidade_destaque: "praticas e objetivas",
    contexto_profissional: "organizar processos e resolver problemas complexos"
  };

  const firstName = userName.split(' ')[0];
  const shortJustification = (recommendation.justification?.split(".")[0] || "").trim();
  const top1Score = riasecData.scores?.[riasecData.top1] ?? 90;
  const top2Score = riasecData.scores?.[riasecData.top2] ?? 78;
  const heroCopy = riasecData.descricao_personalizada || "Se este recorte gratuito já faz sentido, o plano completo (R$25) destrava salário, cronograma e cargos que combinam com seu estilo.";

  // Track page view
  useEffect(() => {
    trackEvent('results_viewed', {
      career: recommendation.careerName
    });
  }, [recommendation.careerName]);

  useEffect(() => {
    trackEvent('cta_variant_assigned', { variant: ctaVariant });
  }, [ctaVariant]);

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
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-white text-sm md:text-base text-center">
          <Lock className="w-4 h-4" />
          <span className="font-medium">Oferta garantida por 5 minutos (R$25 com pagamento seguro):</span>
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
        
          {/* ============= HERO + IDENTIDADE RIASEC (MOBILE FIRST) ============= */}
          <div className="mb-14 animate-fade-in">
            <div className="text-center mb-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
                diagnóstico gratuito pronto - se isso convence grátis, imagine por R$25
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                {firstName}, seu DNA RIASEC e: {riasecData.top1} <span className="text-primary">+ {riasecData.top2}</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {heroCopy}
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.1fr,1fr]">
              <Card className="p-6 bg-card border-2 border-primary/20">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2 text-xs uppercase font-semibold">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">perfil hibrido top2</Badge>
                    <Badge variant="outline" className="bg-muted text-foreground">alta correspondencia de respostas</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold">Seu mapa de identidade {riasecData.top1} com toque {riasecData.top2}</p>
                    <p className="text-sm text-muted-foreground">Densidade de sinais fortes apontou que você rende mais quando combina {riasecData.habilidade_destaque}.</p>
                  </div>
                  <div className="space-y-3">
                    {[{ label: riasecData.top1, value: top1Score, tone: "primary" }, { label: riasecData.top2, value: top2Score, tone: "accent" }].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold">{item.label}</span>
                          <span className="text-muted-foreground">{item.value}% sinais</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full ${item.tone === "primary" ? "bg-primary" : "bg-accent"}`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                      <span>{recommendation.careerName}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-primary mt-0.5" />
                      <span>{shortJustification || "Roteiro inicial baseado no seu par RIASEC top2."}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-lg">Roteiro imediato (grátis)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Forcas principais</p>
                    <ul className="space-y-2 text-sm">
                      {riasecData.habilidades.slice(0, 3).map((hab, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="capitalize">{hab}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Onde você brilha</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{riasecData.contexto_profissional}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>Tarefas que exigem {riasecData.habilidade_destaque}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Evite desperdício</p>
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
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  Este é o aperitivo gratuito. O upgrade entrega salário, cronograma 30/60/90 e cargos mais aderentes ao seu DNA.
                </div>
              </Card>
            </div>

            <Card className="p-6 mt-6 bg-primary/5 border-2 border-primary/30">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    Se isso faz sentido, destrave o resto
                  </div>
                  <p className="text-xl font-bold">Plano completo por R$25</p>
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    Veja faixa salarial, probabilidade de edital, cronograma de estudos 30/60/90 e checklist pronto. Garantia de 7 dias.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-foreground">
                    <Badge variant="outline" className="bg-white/40 border-primary/30 text-primary inline-flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5" />
                      Pagamento seguro · Mercado Pago + criptografia
                    </Badge>
                    <Badge variant="outline" className="bg-white/40 border-primary/30 text-primary">Relatorio imediato</Badge>
                    <Badge variant="outline" className="bg-white/40 border-primary/30 text-primary">+ Prova social 4.8/5</Badge>
                  </div>
                  <MercadoPagoButton
                    userName={userName}
                    userEmail={userEmail}
                    quizResponseId={quizResponseId}
                    amount={25}
                    location="hero_upgrade"
                  />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-4 h-4 text-primary" />
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Garantia de 7 dias. Sem perguntas.</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ============= 2?? PROVA SOCIAL (DEPOIMENTOS REAIS) ============= */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              ?? Quem já fez o upgrade, descobriu o caminho certo!
            </h2>
            
              <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Carla Pereira",
                  location: "SP",
                  course: "cursando administração (4º período)",
                  date: "06/11/25",
                  text: "O relatório liberou 'Técnico Administrativo TJ-SP' pra mim. Vi salário, rotina e um plano de 30 dias que fez sentido. Não precisei ficar adivinhando edital."
                },
                {
                  name: "Lucas Andrade",
                  location: "MG",
                  course: "formado em direito",
                  date: "21/09/25",
                  text: "Eu tinha medo de estar mirando errado. O upgrade mostrou 'Analista MPU', justificou com meu perfil Investigativo/Social e já trouxe matérias mais cobradas. Paguei 25 e parei de perder tempo."
                },
                {
                  name: "Amanda Souza",
                  location: "PE",
                  course: "estudante de enfermagem",
                  date: "11/08/25",
                  text: "Ele indicou 'Enfermeira SAMU Recife' com faixa salarial e frequência de edital. O plano veio mastigado, só segui. Valeu mais que uma pizza."
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 border-2 border-primary/10 animate-fade-in hover:shadow-lg transition-shadow">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 italic leading-relaxed break-words">
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

          {/* ============= ?? POR QUE ESTE TESTE VALE R$25 ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 border-2 border-amber-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-8 h-8 text-amber-500" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  ?? Por que este teste vale R$25?
                </h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A maioria dos testes gratuitos mostra apenas seu tipo de personalidade. Este aqui vai além: analisa seu perfil RIASEC e combina com carreiras e concursos que realmente se encaixam no seu estilo de trabalho.
                </p>
                <p>
                  Você não paga apenas por um resultado — recebe um plano de ação personalizado, um cronograma de estudos e cargos recomendados com base em dados reais do mercado píblico brasileiro.
                </p>
                <p className="font-semibold text-foreground">
                  Por R$25, você economiza tempo, evita estudar para o concurso errado e ganha clareza sobre onde concentrar seus esforços.
                </p>
              </div>
            </Card>
          </div>

          {/* ============= ?? O QUE FAZ DIFERENTE DOS OUTROS ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-blue-500/10 border-2 border-blue-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-8 h-8 text-blue-500" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  ?? O que faz diferente dos outros
                </h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Nosso diferencial é que cruzamos seus dados RIASEC com suas preferências de trabalho em concursos píblicos. Isso mostra quais carreiras e cargos píblicos combinam com você e inclui um plano de estudos prático para alcançar seus objetivos.
                </p>
                <div className="bg-primary/10 rounded-lg p-6 border-l-4 border-primary">
                  <p className="font-semibold text-foreground mb-2">
                    ?? Contexto do Mercado Brasileiro
                  </p>
                  <p>
                    No Brasil existem mais de <span className="font-bold text-foreground">10 mil concursos píblicos</span> realizados todos os anos, em níveis municipal, estadual e federal.
                  </p>
                </div>
                <p>
                  Escolher o concurso certo, alinhado ao seu perfil, é o que define quem progride rápido e quem desiste no meio do caminho. Nosso sistema analisa o perfil dos cargos que mais se repetem nos concursos com os melhores salários e estabilidade de emprego, indicando caminhos de maior potencial.
                </p>
              </div>
            </Card>
          </div>

          {/* ============= ?? SOBRE O MÉTODO RIASEC ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-purple-500/10 border-2 border-purple-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Dna className="w-8 h-8 text-purple-500" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  ?? Sobre o método
                </h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-green-500/20 text-green-700 border-green-500/30 px-4 py-1.5">
                    <Award className="w-4 h-4 mr-2" />
                    Validado Cientificamente
                  </Badge>
                </div>
                
                <p>
                  O teste é baseado no modelo <span className="font-bold text-foreground">RIASEC</span>, criado pelo psicólogo John L. Holland (Universidade Johns Hopkins) e usado há décadas por centros de carreira e universidades do mundo todo.
                </p>
                <p>
                  O RIASEC identifica seus principais interesses profissionais e mostra onde você tende a ter melhor desempenho.
                </p>
                <p className="font-semibold text-foreground">
                  Nosso sistema aprimora esse método cruzando seus resultados com carreiras píblicas brasileiras e com o perfil dos cargos que mais aparecem nos concursos com os melhores salários e estabilidade de emprego.
                </p>
              </div>
            </Card>
          </div>

          {/* ============= ?? DIFERENCIAIS EXCLUSIVOS ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  ?? Diferenciais Exclusivos
                </h2>
                <p className="text-muted-foreground">
                  Recursos ínicos que transformam seu resultado em ação
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Award, title: "Base científica validada", desc: "Método RIASEC internacional" },
                  { icon: Target, title: "Personalizado para BR", desc: "Foco em concursos píblicos" },
                  { icon: Brain, title: "Cruzamento inteligente", desc: "Perfil + oportunidades reais" },
                  { icon: DollarSign, title: "Faixas salariais", desc: "Médias atualizadas do mercado" },
                  { icon: Calendar, title: "Plano 30/60/90 dias", desc: "Cronograma estruturado" },
                  { icon: TrendingUp, title: "Frequência de editais", desc: "Probabilidade real" },
                  { icon: Zap, title: "Resultado imediato", desc: "Acesso instantâneo" },
                  { icon: Users, title: "Suporte direto", desc: "WhatsApp disponível" }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col items-center text-center p-4 bg-background/50 rounded-lg border border-border hover:shadow-lg transition-all"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <item.icon className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* ============= ?? INVESTIMENTO E BENEFÍCIO ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-yellow-500/10 border-2 border-yellow-500/30">
              <div className="flex items-center gap-3 mb-6">
                <Coins className="w-8 h-8 text-yellow-600" />
                <h2 className="text-2xl md:text-3xl font-bold">
                  ?? Investimento e Benefício
                </h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  O teste custa <span className="font-bold text-foreground text-xl">R$25</span>, um valor simbólico perto do que ele entrega.
                </p>
                <p>
                  Foi criado para ser acessível, mas com nível de qualidade profissional.
                </p>
                <p className="font-semibold text-foreground">
                  Em vez de perder tempo com testes genéricos, aqui você recebe uma análise feita sob medida para sua realidade e seu objetivo.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6 pt-6 border-t">
                  <div className="text-center p-3 bg-background/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">R$25</p>
                    <p className="text-xs">Nosso teste</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg opacity-60">
                    <p className="text-2xl font-bold">R$30</p>
                    <p className="text-xs">Hambírguer</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg opacity-60">
                    <p className="text-2xl font-bold">R$40</p>
                    <p className="text-xs">Streaming</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ============= ?? COMPARATIVO COM OUTROS TESTES ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-card border-2 border-primary/20">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                ?? Comparativo com outros testes
              </h2>
              
              {/* Versão Desktop - Tabela */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Teste</TableHead>
                      <TableHead className="font-bold">Foco</TableHead>
                      <TableHead className="font-bold">Resultado Entregue</TableHead>
                      <TableHead className="font-bold">Personalização</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="opacity-60">
                      <TableCell className="font-medium">MBTI / 16personalities</TableCell>
                      <TableCell>Personalidade</TableCell>
                      <TableCell>Tipo psicológico (ex: INTJ, ENFP)</TableCell>
                      <TableCell>Genérico, sem plano</TableCell>
                    </TableRow>
                    <TableRow className="opacity-60">
                      <TableCell className="font-medium">GPTs gratuitos</TableCell>
                      <TableCell>Curiosidade</TableCell>
                      <TableCell>Respostas automáticas sem base científica</TableCell>
                      <TableCell>Sem plano de ação</TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/10 border-2 border-primary font-bold">
                      <TableCell className="font-bold text-primary">RIASEC + Concursos (nosso)</TableCell>
                      <TableCell className="text-primary">Carreira píblica</TableCell>
                      <TableCell className="text-primary">Cargo ideal + cronograma + plano de ação</TableCell>
                      <TableCell className="text-primary">Totalmente personalizado</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Versão Mobile - Cards */}
              <div className="md:hidden space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg opacity-60 border">
                  <p className="font-bold mb-2">MBTI / 16personalities</p>
                  <div className="text-sm space-y-1">
                    <p><span className="font-semibold">Foco:</span> Personalidade</p>
                    <p><span className="font-semibold">Resultado:</span> Tipo psicológico</p>
                    <p><span className="font-semibold">Personalização:</span> Genérico</p>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg opacity-60 border">
                  <p className="font-bold mb-2">GPTs gratuitos</p>
                  <div className="text-sm space-y-1">
                    <p><span className="font-semibold">Foco:</span> Curiosidade</p>
                    <p><span className="font-semibold">Resultado:</span> Respostas automáticas</p>
                    <p><span className="font-semibold">Personalização:</span> Sem plano</p>
                  </div>
                </div>
                
                <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
                  <p className="font-bold text-primary mb-2">? RIASEC + Concursos (nosso)</p>
                  <div className="text-sm space-y-1">
                    <p><span className="font-semibold">Foco:</span> Carreira píblica</p>
                    <p><span className="font-semibold">Resultado:</span> Cargo + cronograma + plano</p>
                    <p><span className="font-semibold">Personalização:</span> <span className="text-primary font-bold">Totalmente personalizado</span></p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* ============= 3?? PRÉVIA VISUAL DO RELATÓRIO COMPLETO (COM BLUR) ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/30 relative overflow-hidden">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  ?? Prévia do Relatório Profissional Completo
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

          {/* ============= 4?? OFERTA (UPSELL NATURAL) ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-2 border-primary/30">
              <div className="text-center mb-8 space-y-2">
                <h2 className="text-2xl md:text-4xl font-bold">
                  Desbloqueie o plano completo por R$25
                </h2>
                <p className="text-lg text-muted-foreground">
                  Menos que 1 mês de cursinho (R$150+) e com garantia de satisfação.
                </p>
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
                  <Sparkles className="w-4 h-4" />
                  Bonus: checklist de edital + mini plano imediato
                </div>
              </div>

              {/* Lista de beneficios */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Target, text: "Cargo recomendado e justificativa do seu perfil" },
                  { icon: DollarSign, text: "Faixa salarial inicial e com progressão" },
                  { icon: Calendar, text: "Probabilidade do próximo edital" },
                  { icon: BookOpen, text: "Plano de estudos 30/60/90 dias" },
                  { icon: Sparkles, text: "Materiais práticos e checklist" },
                  { icon: TrendingUp, text: "Acesso imediato ao Relatório" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Preco, ancoragem e garantia */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-6 mb-6 text-center border-2 border-amber-500/20 space-y-3">
                <p className="text-4xl font-bold text-amber-600">
                  R$ 25<span className="text-xl">,00</span>
                </p>
                <p className="text-sm text-muted-foreground">(pagamento unico · acesso imediato)</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-bold">
                  <Shield className="w-4 h-4" />
                  Garantia 7 dias ou seu dinheiro de volta
                </div>
                <div className="text-sm text-foreground font-semibold">
                  referência: cursinho 1 mês custa R$150+ — aqui você paga 6x menos
                </div>
              </div>

                            {/* Social proof + CTA */}
              <div className="grid lg:grid-cols-[2fr,1fr] gap-6 items-center">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                      <Star className="w-4 h-4" />
                      4.8/5 por 1.240 concurseiros
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                      <Users className="w-4 h-4" />
                      Pagamento seguro · selo Mercado Pago
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 text-sm">
                    <div className="flex-1 rounded-lg border bg-background/60 p-3">
                      <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                        <Sparkles className="w-4 h-4" /> Tamires, aprovada em pre-análise
                      </div>
                      <p className="text-muted-foreground mt-1">"Paguei os 25 e recebi um passo a passo de estudo sem enrolação."</p>
                    </div>
                    <div className="flex-1 rounded-lg border bg-background/60 p-3">
                      <div className="flex items-center gap-2 text-primary font-semibold text-xs">
                        <Sparkles className="w-4 h-4" /> Diego, PF administrativa
                      </div>
                      <p className="text-muted-foreground mt-1">"Valeu mais que 1 mês de cursinho. Checklist e cronograma em minutos."</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <MercadoPagoButton
                    userName={userName}
                    userEmail={userEmail}
                    quizResponseId={quizResponseId}
                    amount={25}
                    location="main_offer"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Pix, cartao ou saldo Mercado Pago · conexão segura com criptografia.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* ============= BANNER CTA APOS 60% DE SCROLL ============= */}
          {showScrollCta && (
            <div className="mb-12 animate-fade-in">
              <Card className="p-6 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xl font-bold mb-1">Ainda não desbloqueou seu plano?</p>
                    <p className="text-sm opacity-90">Oferta de R$25 ativa por tempo limitado, com garantia de 7 dias.</p>
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

          {/* ============= 5?? FAQ (RESPOSTAS CURTAS) ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-card">
              <h2 className="text-2xl font-bold text-center mb-8">
                ? Perguntas Frequentes
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Por que pagar R$25 se há testes gratuitos?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Porque aqui você recebe um plano de ação prático e cargos reais do serviço público que combinam com você. Não é só teoria — é um caminho completo com cronograma de estudos e materiais específicos.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      O método e confiavel?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Sim. Baseado na teoria RIASEC, criada por John L. Holland e usada em universidades e orgaos de RH no mundo todo há decadas. Nosso diferencial e adaptar isso para o mercado de concursos públicos brasileiros.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Recebo o resultado na hora?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Sim. O relatório completo é liberado automaticamente logo após a confirmação do pagamento.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Posso acessar depois?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Sim, você pode baixar o relatório e consultar quando quiser. Recomendamos salvar uma cópia.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      Isso e melhor que teste gratuito?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Sim, aqui você recebe um plano real de ação baseado no seu perfil específico, não apenas um tipo de personalidade genérico.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      E meus dados?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    Usamos apenas para gerar e entregar seu relatório. Pagamento processado pelo Mercado Pago e você pode solicitar remoção a qualquer momento (LGPD).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>

          {/* ============= 6?? CTA SECUNDÁRIO + DESCONTO VIA WHATSAPP ============= */}
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
                ? Cupom válido por 24h, após isso o desconto expira.
              </p>
            </Card>
          </div>

          {/* ============= ?? COMPARATIVO INTERNACIONAL ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-6 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 border border-blue-500/20">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm md:text-base">
                      ?? Comparativo Internacional
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Testes internacionais RIASEC custam US$20 (~R$110). O nosso: <span className="font-bold text-primary">R$25</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    4x mais barato
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* ============= CTA FINAL - ENCERRAMENTO EMOCIONAL ============= */}
          <div className="mb-12 animate-fade-in">
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ?? Seu futuro começa com uma decisão de R$25
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
                ? Junte-se a centenas de pessoas que já descobriram seu caminho!
              </p>
            </Card>
          </div>

        </div>
      </div>

      {/* CTA Sticky Mobile (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-primary to-accent p-4 pb-[calc(env(safe-area-inset-bottom,0px)+16px)] shadow-2xl">
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
// mobile-conversion-note: sticky purchase CTA and timer present; safe-area padding handled in Landing.




































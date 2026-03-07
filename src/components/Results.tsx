import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerRecommendation, CONCURSO_AREA, MacroAreaResult, RiasecResult } from "@/types/quiz";
import { MercadoPagoButton } from "./MercadoPagoButton";
import { CountdownTimer } from "./CountdownTimer";
import { Footer } from "./Footer";
import { trackEvent, trackCupomWhatsappClick } from "@/lib/analytics";
import { trackJourneyStep } from "@/lib/quizTracking";
import {
  Lock,
  Sparkles,
  Target,
  AlertTriangle,
  Shield,
  DollarSign,
  CheckCircle2,
  Clock,
  Lightbulb,
  Star,
} from "lucide-react";

interface ResultsProps {
  recommendation: CareerRecommendation;
  userName: string;
  userEmail: string;
  quizResponseId?: string;
  riasecFallback?: RiasecResult;
  mode?: "free-v1" | "free-v2";
  macroAreaResult?: MacroAreaResult;
}

type PaymentStatus = "idle" | "pending" | "paid" | "rejected" | "failed";

const LOCKED_SECTIONS = [
  {
    key: "salary_range",
    title: "Faixa salarial do seu concurso ideal",
    teaser: "Estado que você escolheu · R$ ▢▢▢▢ - ▢▢▢▢",
    bullets: [
      "Órgão 1: R$ ▢▢▢▢ + benefícios",
      "Órgão 2: R$ ▢▢▢▢ (progressão em ▢ anos)",
      "Projeção em 3 anos: R$ ▢▢▢▢",
    ],
  },
  {
    key: "top_exams",
    title: "Top 3 concursos para o seu estado",
    teaser: "Selecionados pelo seu perfil + localização",
    bullets: ["#1 ▢▢▢ ▢▢▢", "#2 ▢▢▢ ▢▢", "#3 ▢▢▢ ▢▢"],
  },
  {
    key: "subjects_plan",
    title: "O que estudar para passar no concurso #1",
    teaser: "Horas/dia e matérias priorizadas",
    bullets: [
      "Horas/dia: ▢▢ | Semanas: ▢▢",
      "Matérias-chave: ▢▢▢, ▢▢▢, ▢▢▢",
      "Checklist de revisão: ▢▢ itens",
    ],
  },
  {
    key: "past_exams",
    title: "Provas e editais anteriores",
    teaser: "Links e banca dominante",
    bullets: [
      "Edital ▢▢/▢▢: banca ▢▢▢",
      "Prova PDF: ▢▢▢▢",
      "Média de corte: ▢▢/100",
    ],
  },
  {
    key: "timeframe",
    title: "Tempo médio de estudo + próxima data",
    teaser: "Quanto tempo as pessoas levam e quando abre",
    bullets: [
      "Tempo médio: ▢▢ meses para ficar competitivo",
      "Próxima janela de edital: ▢▢/▢▢",
      "Aviso de risco: concorrência alta em ▢▢",
    ],
  },
];

export const Results = ({
  recommendation,
  userName,
  userEmail,
  quizResponseId,
  riasecFallback,
  mode = "free-v1",
  macroAreaResult,
}: ResultsProps) => {
  const isV2 = mode === "free-v2";
  const quizVersion = isV2 ? "v2" : "v1";
  const macroAreaLabels: Record<CONCURSO_AREA, string> = {
    ADMINISTRATIVO: "Área Administrativa",
    TRIBUNAIS: "Área de Tribunais",
    POLICIAL: "Área Policial",
    FISCAL: "Área Fiscal",
  };
  const macroResult: MacroAreaResult = macroAreaResult || {
    areaPrincipal: "ADMINISTRATIVO",
    areaPossivel: "TRIBUNAIS",
    areaEvitar: "POLICIAL",
  };
  const formatMacroArea = (area: CONCURSO_AREA) => macroAreaLabels[area] || "Área Administrativa";
  const [showFloatingCta, setShowFloatingCta] = useState(false);
  const [showScrollCta, setShowScrollCta] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [resultEmailStatus, setResultEmailStatus] = useState<string | null>(null);
  const [paidOrderId, setPaidOrderId] = useState<string | null>(null);

  const paywallTracked = useRef(false);
  const salaryPreviewTracked = useRef(false);

  // Extrair dados RIASEC
  const riasecData = recommendation.riasec || riasecFallback || {
    top1: "Realista",
    top2: "Investigativo",
    habilidades: ["organizada", "comunicativa", "logica", "criativa", "persistente"],
    habilidade_destaque: "praticas e objetivas",
    contexto_profissional: "organizar processos e resolver problemas complexos",
  };

  const firstName = userName.split(" ")[0] || "Você";
  const shortJustification = (recommendation.justification?.split(".")[0] || "").trim();
  const heroTitle = isV2
    ? `${firstName}, sua direção inicial é ${formatMacroArea(macroResult.areaPrincipal)}`
    : `${firstName}, seu par RIASEC é ${riasecData.top1} + ${riasecData.top2}`;
  const heroCopy =
    riasecData.descricao_personalizada ||
    "Você está vendo 20% do diagnóstico. O relatório completo revela o PORQUÊ e o plano passo a passo.";
  const alertCopy = isV2
    ? "Erro comum: escolher edital só pelo salário e ignorar rotina diária."
    : "Erro comum: aceitar cargos que matam sua combinação RIASEC top2.";

  // Track page view
  useEffect(() => {
    trackEvent("results_viewed", {
      career: recommendation.careerName,
      quiz_version: mode,
    });
    trackJourneyStep({
      step: "results_viewed",
      quiz_version: mode,
      quiz_response_id: quizResponseId || null,
    });
    if (isV2) {
      trackEvent("results_viewed_v2", {
        area_principal: macroResult.areaPrincipal,
      });
    }
  }, [recommendation.careerName, mode, isV2, macroResult.areaPrincipal, quizResponseId]);

  useEffect(() => {
    if (paywallTracked.current) return;
    paywallTracked.current = true;
    trackEvent("paywall_viewed", { quiz_version: mode });
  }, [mode]);

  useEffect(() => {
    if (salaryPreviewTracked.current) return;
    salaryPreviewTracked.current = true;
    trackEvent("salary_preview_viewed", { quiz_version: mode });
  }, [mode]);

  // Scroll tracking for CTAs
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercentage > 50 && window.innerWidth >= 768) {
        setShowFloatingCta(true);
      } else {
        setShowFloatingCta(false);
      }

      if (scrollPercentage > 60) {
        setShowScrollCta(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePaymentStatusChange = (status: {
    orderId?: string | null;
    paymentStatus: PaymentStatus;
    resultEmailStatus?: string | null;
  }) => {
    setPaymentStatus(status.paymentStatus);
    setResultEmailStatus(status.resultEmailStatus || null);
    if (status.orderId) {
      setPaidOrderId(status.orderId);
    }
  };

  const handleLockedClick = (section: string) => {
    trackEvent("locked_section_click", { section, quiz_version: mode });
  };

  const handleWhatsAppClick = () => {
    trackCupomWhatsappClick();
    window.open(
      "https://wa.me/5591984233672?text=Oi,+vi+meu+resultado+no+teste+e+quero+reivindicar+meu+cupom+de+R$5",
      "_blank",
    );
  };

  const CTA_TEXT = "Desbloquear relatório completo (R$25)";

  const LockedCard = ({
    title,
    teaser,
    bullets,
  }: {
    title: string;
    teaser: string;
    bullets?: string[];
  }) => (
    <Card
      className="p-5 bg-card border-2 border-dashed border-primary/25 cursor-pointer"
      onClick={() => handleLockedClick(title)}
    >
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
          <Lock className="w-4 h-4" />
          Conteúdo bloqueado
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{teaser}</p>
        {bullets && bullets.length > 0 && (
          <div className="relative mt-2">
            <ul className="space-y-1 text-sm text-muted-foreground blur-sm opacity-70 select-none pointer-events-none">
              {bullets.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
            <div className="absolute inset-0 rounded-md bg-background/40 backdrop-blur-[1px] border border-primary/20 flex items-center justify-center gap-2 text-primary font-semibold pointer-events-none">
              <Lock className="w-4 h-4" />
              <span className="text-xs md:text-sm">Disponível no relatório completo</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <>
      {/* Timer fixo no topo */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-destructive/90 to-destructive/70 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2 text-white text-sm md:text-base text-center">
          <Lock className="w-4 h-4" />
          <span className="font-medium">Oferta garantida por 5 minutos (R$25 com pagamento seguro):</span>
          <CountdownTimer initialMinutes={5} />
        </div>
      </div>

      {/* CTA flutuante desktop */}
      {showFloatingCta && (
        <div className="hidden md:block fixed right-4 top-1/2 -translate-y-1/2 z-40 animate-slide-in-right">
          <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-lg shadow-2xl max-w-xs">
            <p className="text-white font-bold text-center mb-3">{CTA_TEXT}</p>
            <MercadoPagoButton
              userName={userName}
              userEmail={userEmail}
              quizResponseId={quizResponseId}
              amount={25}
              location="floating_desktop"
              quizVersion={quizVersion}
              onStatusChange={handlePaymentStatusChange}
            />
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-5xl space-y-10">
          {(paymentStatus === "paid" || paymentStatus === "pending") && (
            <Card className="border-2 border-primary/30 bg-primary/5 p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-3">
                  {paymentStatus === "paid" ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : (
                    <Clock className="w-6 h-6 text-primary" />
                  )}
                  <div>
                    <p className="font-semibold text-base">
                      {paymentStatus === "paid" ? "Pagamento confirmado" : "Aguardando confirmação do PIX"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {paymentStatus === "paid"
                        ? "Seu resultado completo será enviado por email."
                        : "Assim que o pagamento for aprovado, enviamos o resultado completo."}
                    </p>
                  </div>
                </div>
                {paidOrderId && <div className="text-xs text-muted-foreground">Pedido: {paidOrderId}</div>}
                {paymentStatus === "paid" && resultEmailStatus && (
                  <div className="text-xs text-muted-foreground">Email: {resultEmailStatus}</div>
                )}
              </div>
            </Card>
          )}

          {/* Hero resumido */}
          <Card className="p-8 bg-card border-2 border-primary/20 space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wide">
              diagnóstico gratuito (20% liberado)
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{heroTitle}</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl">{heroCopy}</p>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-4 border border-primary/20 bg-primary/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-1">
                  <Target className="w-4 h-4" />
                  Direção inicial
                </div>
                <p className="text-lg font-bold">
                  {isV2 ? formatMacroArea(macroResult.areaPrincipal) : `${riasecData.top1} + ${riasecData.top2}`}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{shortJustification || "Baseado nas suas respostas."}</p>
              </Card>

              <Card className="p-4 border border-amber-200 bg-amber-50/60">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  Atenção
                </div>
                <p className="text-sm text-foreground">{alertCopy}</p>
              </Card>

              <Card className="p-4 border border-green-200 bg-green-50/60">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-700 mb-1">
                  <Sparkles className="w-4 h-4" />
                  Gap de valor
                </div>
                <p className="text-sm text-foreground">
                  Você está vendo 20% do diagnóstico — libere o resto em 2 cliques.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                  <Star className="w-4 h-4 text-primary" />
                  Metodologia RIASEC + dados de editais
                </div>
              </Card>
            </div>
          </Card>

          {/* Prévia salarial (teaser) */}
          <Card className="p-5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-2 border-blue-500/20 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-blue-700 font-semibold bg-white/50 px-3 py-1 rounded-full">
                <DollarSign className="w-4 h-4" />
                Faixa salarial (teaser)
              </div>
              <p className="text-sm text-foreground">
                Faixa média desta área: disponível no relatório completo (valores por órgão, estado e progressão).
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Lock className="w-5 h-5" />
              Liberar detalhes
            </div>
          </Card>

          {/* Como geramos seu resultado */}
          <Card className="p-6 bg-primary/5 border-2 border-primary/25">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold bg-white/60 px-3 py-1 rounded-full w-fit">
              <Sparkles className="w-4 h-4" />
              Como geramos seu resultado
            </div>
            <div className="grid gap-3 md:grid-cols-3 mt-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-sm text-foreground">
                  Perfil comportamental (RIASEC + respostas objetivas) cruzado com rotina de cargos.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-sm text-foreground">
                  Base de editais e faixas salariais atualizadas por área.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-sm text-foreground">
                  Prioridade dada ao encaixe entre rotina diária e seu estilo de trabalho.
                </p>
              </div>
            </div>
          </Card>

          {/* Conteúdo bloqueado */}
          <div className="grid gap-4 md:grid-cols-2">
            {LOCKED_SECTIONS.map((section) => (
              <LockedCard
                key={section.key}
                title={section.title}
                teaser={section.teaser}
                bullets={section.bullets}
              />
            ))}
          </div>

          {/* CTA principal */}
          <Card className="p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/20 space-y-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Desbloqueie o relatório completo agora</h2>
            <p className="text-base text-muted-foreground">
              Por R$25 você recebe o PORQUÊ, comparativo de áreas, cargos compatíveis e plano de 7 dias.
            </p>
            <div className="mx-auto max-w-md">
              <MercadoPagoButton
                userName={userName}
                userEmail={userEmail}
                quizResponseId={quizResponseId}
                amount={25}
                location="hero_upgrade"
                quizVersion={quizVersion}
                onStatusChange={handlePaymentStatusChange}
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-4 h-4 text-primary" />
              <Shield className="w-4 h-4 text-primary" />
              <span>Pagamento seguro + garantia de 7 dias.</span>
            </div>
          </Card>

          {/* Banner CTA após 60% de scroll */}
          {showScrollCta && (
            <Card className="p-6 bg-gradient-to-r from-primary to-accent text-primary-foreground">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-bold mb-1">Ainda não liberou o relatório?</p>
                  <p className="text-sm opacity-90">Oferta de R$25 ativa por tempo limitado, com garantia de 7 dias.</p>
                </div>
                <div className="min-w-[220px]">
                  <MercadoPagoButton
                    userName={userName}
                    userEmail={userEmail}
                    quizResponseId={quizResponseId}
                    amount={25}
                    location="scroll_banner"
                    quizVersion={quizVersion}
                    onStatusChange={handlePaymentStatusChange}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* CTA secundário com cupom */}
          <Card className="p-8 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-2 border-green-500/20 text-center">
            <h3 className="text-xl font-bold mb-4">Prefere conversar antes?</h3>
            <p className="text-muted-foreground mb-6">
              Fale comigo no WhatsApp e ganhe um cupom exclusivo de R$5 OFF.
            </p>

            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              variant="outline"
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white border-none mb-4"
            >
              Falar no WhatsApp
            </Button>

            <p className="text-xs text-destructive font-semibold">Cupom válido por 24h.</p>
          </Card>

          {/* CTA final */}
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Seu futuro começa com uma decisão de R$25</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Você já deu o primeiro passo. Agora libere o relatório completo e siga um plano de ação claro.
            </p>
            <div className="mx-auto max-w-md">
              <MercadoPagoButton
                userName={userName}
                userEmail={userEmail}
                quizResponseId={quizResponseId}
                amount={25}
                location="final_cta"
                quizVersion={quizVersion}
                onStatusChange={handlePaymentStatusChange}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">Garantia de 7 dias.</p>
          </Card>
        </div>
      </div>

      {/* CTA Sticky Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-primary to-accent p-4 pb-[calc(env(safe-area-inset-bottom,0px)+16px)] shadow-2xl">
        <MercadoPagoButton
          userName={userName}
          userEmail={userEmail}
          quizResponseId={quizResponseId}
          amount={25}
          location="sticky_mobile"
          quizVersion={quizVersion}
          onStatusChange={handlePaymentStatusChange}
        />
      </div>

      <Footer />
    </>
  );
};

import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Quiz } from "@/components/Quiz";
import { EmailCapture } from "@/components/EmailCapture";
import { ResultsPolicial } from "@/components/ResultsPolicial";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PoliceResult, QuizAnswer } from "@/types/quiz";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";
import { getQuizTrackingContext, trackJourneyStep } from "@/lib/quizTracking";
import { buildCanonicalUrl } from "@/lib/seo";
import { Shield, Zap } from "lucide-react";

type Step = "landing" | "quiz" | "email" | "results";

const PolicialLanding = ({ onStart }: { onStart: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-50">
    <div className="container mx-auto max-w-6xl px-4 pt-20 pb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-[0.2em]">
          Teste vocacional policial
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          Descubra agora qual corporação policial combina com você e se seu perfil passa no TAP.
        </h1>
        <p className="text-lg text-slate-200/80">
          Quiz rápido (8-10 min) baseado em TAP/TAF, rotina e disciplina. Prévia gratuita, relatório completo por R$25.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={onStart} className="h-auto px-7 py-4 text-base font-semibold">
            Começar quiz policial
          </Button>
          <Button variant="outline" onClick={onStart} className="h-auto px-7 py-4 text-base font-semibold border-primary text-primary">
            Ver como funciona
          </Button>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-300">
          <span className="rounded-full bg-slate-800 px-3 py-1">Prévia grátis</span>
          <span className="rounded-full bg-slate-800 px-3 py-1">Oferta de R$25 por 5 min</span>
          <span className="rounded-full bg-slate-800 px-3 py-1">PF · PRF · PM · PC · Penal</span>
        </div>
      </div>

      <Card className="bg-slate-900/70 border border-primary/25 shadow-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Shield className="w-5 h-5" />
          <p className="font-semibold">Teste inspirado no TAP + rotina real</p>
        </div>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>10 perguntas sobre estresse, hierarquia, risco e rotina.</li>
          <li>Saída grátis: corporação sugerida + alerta TAP.</li>
          <li>Relatório pago: plano TAF 30 dias, checklist investigação social, simulação de plantão.</li>
        </ul>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Zap className="w-4 h-4" /> Resultado imediato · Sem anúncios · Sem empurrar curso.
        </div>
      </Card>
    </div>
  </div>
);

const Policial = () => {
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [policeResult, setPoliceResult] = useState<PoliceResult | null>(null);
  const [userName, setUserName] = useState("Concurseiro");
  const [userEmail, setUserEmail] = useState("");
  const [quizResponseId, setQuizResponseId] = useState<string | undefined>();
  const homeVariant = "policial";
  const hasTrackedLanding = useRef(false);

  useEffect(() => {
    if (currentStep === "landing" && !hasTrackedLanding.current) {
      trackEvent("home_policial_viewed");
      trackJourneyStep({ step: "landing_viewed", quiz_version: "policial", home_variant: homeVariant });
      hasTrackedLanding.current = true;
    }
  }, [currentStep, homeVariant]);

  const handleStart = () => {
    trackEvent("quiz_start_clicked_policial");
    setCurrentStep("quiz");
  };

  const handleQuizComplete = ({ answers, policeResult: result }: { answers: QuizAnswer[]; policeResult?: PoliceResult }) => {
    setQuizAnswers(answers);
    if (result) setPoliceResult(result);
    trackJourneyStep({ step: "quiz_completed", quiz_version: "policial", home_variant: homeVariant });
    setCurrentStep("email");
  };

  const handleEmailSubmit = async (name: string, email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const safeName = name.trim().length >= 2 ? name.trim() : "Concurseiro";
    const tracking = getQuizTrackingContext();
    const trackingPayload = {
      quiz_session_id: tracking.quiz_session_id || undefined,
      source: tracking.source || undefined,
      utm_source: tracking.utm_source || undefined,
      utm_medium: tracking.utm_medium || undefined,
      utm_campaign: tracking.utm_campaign || undefined,
      utm_content: tracking.utm_content || undefined,
      utm_term: tracking.utm_term || undefined,
      referrer: tracking.referrer || undefined,
      landing_path: tracking.landing_path || undefined,
    };

    setUserName(safeName);
    setUserEmail(trimmedEmail);

    try {
      window.localStorage.setItem(
        "quiz_contact",
        JSON.stringify({ name: safeName, email: trimmedEmail, quizResponseId: undefined })
      );
    } catch (e) {
      console.warn("Não foi possível salvar quiz_contact no localStorage:", e);
    }

    let newQuizResponseId: string | undefined;
    try {
      const response = await fetch("/api/generate-career-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: quizAnswers,
          name: safeName,
          email: trimmedEmail,
          quiz_version: "policial",
          police_result: policeResult,
          macro_area_result: { areaPrincipal: "POLICIAL", areaPossivel: "POLICIAL", areaEvitar: "FISCAL" },
          ...trackingPayload,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.warn("Falha ao salvar recomendação policial:", text);
      } else {
        const data = await response.json();
        newQuizResponseId = data?.id;
        setQuizResponseId(data?.id);
        try {
          window.localStorage.setItem(
            "quiz_contact",
            JSON.stringify({ name: safeName, email: trimmedEmail, quizResponseId: data?.id })
          );
        } catch (e) {
          console.warn("Falha ao salvar quiz_contact:", e);
        }
      }
    } catch (error) {
      console.error("Erro ao enviar recomendação policial:", error);
    }

    trackJourneyStep({
      step: "email_submitted",
      quiz_version: "policial",
      home_variant: homeVariant,
      quiz_response_id: newQuizResponseId || quizResponseId || null,
    });
    toast.success("Resultado gerado com sucesso!");
    setCurrentStep("results");
  };

  const canonical = buildCanonicalUrl("/policial");

  return (
    <>
      <Helmet>
        <title>Teste vocacional policial grátis | Futuro Perfeito</title>
        <meta
          name="description"
          content="Descubra se você passa no TAP e qual corporação policial combina com você. Prévia grátis + relatório completo por R$25."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      {currentStep === "landing" && <PolicialLanding onStart={handleStart} />}
      {currentStep === "quiz" && (
        <Quiz
          onComplete={handleQuizComplete}
          onBack={() => setCurrentStep("landing")}
          quizVersion="policial"
        />
      )}
      {currentStep === "email" && <EmailCapture onSubmit={handleEmailSubmit} />}
      {currentStep === "results" && policeResult && (
        <ResultsPolicial
          policeResult={policeResult}
          userName={userName}
          userEmail={userEmail}
          quizResponseId={quizResponseId}
        />
      )}
    </>
  );
};

export default Policial;

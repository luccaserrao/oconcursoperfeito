import { useEffect, useRef, useState } from "react";
import { Landing } from "@/components/Landing";
import { PreparationScreen } from "@/components/PreparationScreen";
import { Quiz } from "@/components/Quiz";
import { EmailCapture } from "@/components/EmailCapture";
import { Results } from "@/components/Results";
import ErrorPage from "./ErrorPage";
import { QuizAnswer, CareerRecommendation, MacroAreaResult, RiasecResult } from "@/types/quiz";
import { toast } from "sonner";
import { getHomeVariant, setGAUserProperties, trackEvent } from "@/lib/analytics";
import { getQuizTrackingContext, trackJourneyStep } from "@/lib/quizTracking";
import { calculateRiasecScores } from "@/lib/riasec";
import { calculateMacroArea } from "@/lib/calculateMacroArea";
import { quizQuestionsV1, quizQuestionsV2 } from "@/data/quizQuestions";
import { useSearchParams } from "react-router-dom";

type Step = "landing" | "preparation" | "quiz" | "email" | "results" | "error";
type HomeVariant = "A" | "B";
type QuizVersion = "v1" | "v2";

const HOME_VARIANT_KEY = "home_variant";
const QUIZ_VERSION_KEY = "quiz_version";

const parseHomeVariant = (value: string | null): HomeVariant | null => {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return normalized === "A" || normalized === "B" ? normalized : null;
};

const parseQuizVersion = (value: string | null): QuizVersion | null => {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  return normalized === "v1" || normalized === "v2" ? (normalized as QuizVersion) : null;
};

const resolveQuizVersion = (): QuizVersion => {
  if (typeof window === "undefined") return "v1";
  const stored = parseQuizVersion(window.localStorage.getItem(QUIZ_VERSION_KEY));
  if (stored) return stored;

  const savedProgress = window.localStorage.getItem("quiz_progress");
  if (savedProgress) {
    try {
      const parsed = JSON.parse(savedProgress);
      const savedVersion = parseQuizVersion(parsed?.version || null);
      return savedVersion || "v1";
    } catch {
      return "v1";
    }
  }

  return "v2";
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [recommendation, setRecommendation] = useState<CareerRecommendation | null>(null);
  const [riasecResult, setRiasecResult] = useState<RiasecResult | null>(null);
  const [macroAreaResult, setMacroAreaResult] = useState<MacroAreaResult | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [quizResponseId, setQuizResponseId] = useState<string | undefined>();
  const [quizVersion, setQuizVersion] = useState<QuizVersion>(() => resolveQuizVersion());
  const [homeVariant, setHomeVariant] = useState<HomeVariant>(() => {
    if (typeof window === "undefined") return "A";

    const paramVariant = parseHomeVariant(new URLSearchParams(window.location.search).get("ab"));
    if (paramVariant) {
      window.localStorage.setItem(HOME_VARIANT_KEY, paramVariant);
      return paramVariant;
    }

    const storedVariant = parseHomeVariant(window.localStorage.getItem(HOME_VARIANT_KEY));
    if (storedVariant) return storedVariant;

    const randomVariant: HomeVariant = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(HOME_VARIANT_KEY, randomVariant);
    return randomVariant;
  });
  const hasTrackedHomeView = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const paramVariant = parseHomeVariant(searchParams.get("ab"));
    if (paramVariant) {
      window.localStorage.setItem(HOME_VARIANT_KEY, paramVariant);
      setHomeVariant(paramVariant);
      return;
    }

    const storedVariant = parseHomeVariant(window.localStorage.getItem(HOME_VARIANT_KEY));
    if (storedVariant) {
      setHomeVariant(storedVariant);
      return;
    }

    const randomVariant: HomeVariant = Math.random() < 0.5 ? "A" : "B";
    window.localStorage.setItem(HOME_VARIANT_KEY, randomVariant);
    setHomeVariant(randomVariant);
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const resolved = resolveQuizVersion();
    window.localStorage.setItem(QUIZ_VERSION_KEY, resolved);
    setQuizVersion(resolved);
  }, []);

  useEffect(() => {
    setGAUserProperties({ home_variant: homeVariant });
    trackEvent("home_variant_assigned", { variant: homeVariant });
  }, [homeVariant]);

  useEffect(() => {
    if (currentStep !== "landing") return;
    if (hasTrackedHomeView.current) return;
    trackEvent("home_viewed", { variant: homeVariant });
    hasTrackedHomeView.current = true;
  }, [currentStep, homeVariant]);

  useEffect(() => {
    if (currentStep === "landing") {
      trackJourneyStep({
        step: "landing_viewed",
        quiz_version: quizVersion,
        home_variant: homeVariant,
      });
    }
    if (currentStep === "preparation") {
      trackJourneyStep({
        step: "preparation_viewed",
        quiz_version: quizVersion,
        home_variant: homeVariant,
      });
    }
    if (currentStep === "quiz") {
      trackJourneyStep({
        step: "quiz_started",
        quiz_version: quizVersion,
        home_variant: homeVariant,
      });
    }
  }, [currentStep, quizVersion, homeVariant]);

  const handleStartQuiz = () => {
    trackEvent("quiz_start_clicked");
    setCurrentStep("preparation");
  };

  const handlePrepareQuiz = () => {
    trackEvent("quiz_preparation_completed");
    setCurrentStep("quiz");
  };

  const handleQuizComplete = ({
    answers,
    riasecResult: riasecScore,
    macroAreaResult: macroResult,
  }: {
    answers: QuizAnswer[];
    riasecResult?: RiasecResult;
    macroAreaResult?: MacroAreaResult;
  }) => {
    setQuizAnswers(answers);
    setRiasecResult(riasecScore || null);
    setMacroAreaResult(macroResult || null);
    trackJourneyStep({
      step: "quiz_completed",
      quiz_version: quizVersion,
      home_variant: homeVariant,
    });
    trackEvent("email_form_viewed");
    setCurrentStep("email");
  };

  const handleEmailSubmit = async (name: string, email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const safeName = name.trim().length >= 2 ? name.trim() : "Concurseiro";
    const activeQuestions = quizVersion === "v2" ? quizQuestionsV2 : quizQuestionsV1;
    const answersRecord = quizAnswers.reduce<Record<string, string>>((acc, cur, idx) => {
      const questionId = cur.id || activeQuestions[idx]?.id || `q${idx}`;
      acc[questionId] = cur.answer;
      return acc;
    }, {});
    const riasecPayload =
      quizVersion === "v1"
        ? riasecResult || calculateRiasecScores(answersRecord, activeQuestions)
        : null;
    const macroAreaPayload =
      quizVersion === "v2"
        ? macroAreaResult || calculateMacroArea(answersRecord, activeQuestions)
        : null;

    if (!trimmedEmail) {
      toast.error("Informe um email valido.");
      setCurrentStep("email");
      return;
    }

    setUserName(safeName);
    setUserEmail(trimmedEmail);
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
    trackEvent("email_captured", { home_variant: getHomeVariant() });

    try {
      // Enviar todas as respostas para o backend
      const payloadAnswers = quizAnswers;

      const response = await fetch("/api/generate-career-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: payloadAnswers,
          name: safeName,
          email: trimmedEmail,
          riasec: riasecPayload,
          whatsapp: "",
          quiz_version: quizVersion,
          macro_area_result: macroAreaPayload,
          ...trackingPayload,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao salvar recomendacao: ${errorText}`);
      }

      const data = await response.json();

      const localRecommendation: CareerRecommendation = quizVersion === "v2"
        ? {
            careerName: macroAreaPayload ? `Direção inicial: ${macroAreaPayload.areaPrincipal}` : "Direção inicial",
            justification: "Resultado gratuito baseado no seu perfil.",
            salary: "Em definicao",
            examDate: "Em definicao",
            workplaces: [],
            workRoutine: "Relatório completo detalha o porquê e cargos compatíveis.",
            subjects: [],
            examFrequency: "Em definicao",
          }
        : {
            careerName: `Plano recomendado para perfil ${riasecPayload?.top1}`,
            justification: "Baseado nas suas respostas RIASEC.",
            salary: "Em definicao",
            examDate: "Em definicao",
            workplaces: [],
            workRoutine: "Plano inicial alinhado ao seu perfil.",
            subjects: [],
            examFrequency: "Em definicao",
            riasec: riasecPayload || undefined,
          };

      setRecommendation(localRecommendation);
      setQuizResponseId(data?.id);
      trackJourneyStep({
        step: "email_submitted",
        quiz_version: quizVersion,
        home_variant: homeVariant,
        quiz_response_id: data?.id || null,
      });

      // Send welcome email (do not block flow if it fails)
      if (data?.id) {
        try {
          await fetch("/api/send-welcome-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: safeName,
              email: trimmedEmail,
              quizResponseId: data.id,
              careerName: localRecommendation.careerName,
            }),
          });
          console.log("Welcome email sent successfully");
        } catch (emailError) {
          console.error("Error sending welcome email:", emailError);
        }
      }

      setCurrentStep("results");
      toast.success("Resultado gerado com sucesso!");
    } catch (error) {
      console.error("Error generating recommendation:", error);
      const fallbackRiasec =
        quizVersion === "v1"
          ? riasecPayload || calculateRiasecScores(answersRecord, activeQuestions)
          : null;
      const fallbackMacro =
        quizVersion === "v2" ? macroAreaPayload || calculateMacroArea(answersRecord, activeQuestions) : null;

      const fallbackRecommendation: CareerRecommendation = quizVersion === "v2"
        ? {
            careerName: fallbackMacro ? `Direção inicial: ${fallbackMacro.areaPrincipal}` : "Direção inicial",
            justification: "Resultado preliminar enquanto geramos o relatório completo.",
            salary: "Em definicao",
            examDate: "Em definicao",
            workplaces: [],
            workRoutine: "Relatório completo detalha o porquê e cargos compatíveis.",
            subjects: [],
            examFrequency: "Em definicao",
          }
        : {
            careerName: `Plano recomendado para perfil ${fallbackRiasec?.top1}`,
            justification: "Baseado nas suas respostas, criamos um plano preliminar enquanto geramos o relatório completo.",
            salary: "Em definicao",
            examDate: "Em definicao",
            workplaces: [],
            workRoutine: "Rotina flexivel alinhada ao seu perfil.",
            subjects: [],
            examFrequency: "Em definicao",
            riasec: fallbackRiasec || undefined,
          };

      setRecommendation(fallbackRecommendation);
      setQuizResponseId(undefined);

      // Fallback: tentar salvar o quiz mesmo se a recomendacao falhar
      try {
        const saveResp = await fetch("/api/saveQuiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: quizAnswers,
            name: safeName,
            email: trimmedEmail,
            riasec: fallbackRiasec,
            whatsapp: "",
            quiz_version: quizVersion,
            macro_area_result: fallbackMacro,
            ...trackingPayload,
          }),
        });

        if (saveResp.ok) {
          const saveData = await saveResp.json();
          if (saveData?.id) {
            setQuizResponseId(saveData.id);
            trackJourneyStep({
              step: "email_submitted",
              quiz_version: quizVersion,
              home_variant: homeVariant,
              quiz_response_id: saveData.id,
            });
          }
        }
      } catch (saveError) {
        console.error("Erro ao salvar quiz (fallback):", saveError);
      }
      setCurrentStep("results");
      toast.warning("Não conseguimos gerar o relatório completo agora. Mostramos um resultado parcial.");
    }
  };

  const handleUpsellClick = async () => {
    trackJourneyStep({
      step: "upsell_clicked",
      quiz_version: quizVersion,
      home_variant: homeVariant,
      quiz_response_id: quizResponseId || null,
    });
    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-upsell-click`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });
    } catch (error) {
      console.error("Error tracking upsell click:", error);
    }
  };

  const handleBackToLanding = () => {
    setCurrentStep("landing");
  };

  const handleRetry = async () => {
    setCurrentStep("email");
    if (userName && userEmail) {
      await handleEmailSubmit(userName, userEmail);
    }
  };

  return (
    <>
      {currentStep === "landing" && <Landing onStart={handleStartQuiz} variant={homeVariant} />}
      {currentStep === "preparation" && <PreparationScreen onStart={handlePrepareQuiz} />}
      {currentStep === "quiz" && (
        <Quiz
          onComplete={handleQuizComplete}
          onBack={handleBackToLanding}
          quizVersion={quizVersion}
        />
      )}
      {currentStep === "email" && <EmailCapture onSubmit={handleEmailSubmit} />}
      {currentStep === "error" && <ErrorPage onRetry={handleRetry} />}
      {currentStep === "results" && recommendation && (
        <Results
          recommendation={recommendation}
          userName={userName}
          userEmail={userEmail}
          quizResponseId={quizResponseId}
          riasecFallback={riasecResult || undefined}
          macroAreaResult={macroAreaResult || undefined}
          mode={quizVersion === "v2" ? "free-v2" : "free-v1"}
        />
      )}
    </>
  );
};

export default Index;





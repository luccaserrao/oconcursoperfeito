import { useEffect, useState } from "react";
import { Landing } from "@/components/Landing";
import { PreparationScreen } from "@/components/PreparationScreen";
import { Quiz } from "@/components/Quiz";
import { EmailCapture } from "@/components/EmailCapture";
import { Results } from "@/components/Results";
import ErrorPage from "./ErrorPage";
import { QuizAnswer, CareerRecommendation, RiasecResult } from "@/types/quiz";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";
import { calculateRiasecScores } from "@/lib/riasec";
import { quizQuestions } from "@/data/quizQuestions";
import { useSearchParams } from "react-router-dom";

type Step = "landing" | "preparation" | "quiz" | "email" | "results" | "error";
type HomeVariant = "A" | "B";

const HOME_VARIANT_KEY = "home_variant";

const parseHomeVariant = (value: string | null): HomeVariant | null => {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return normalized === "A" || normalized === "B" ? normalized : null;
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [recommendation, setRecommendation] = useState<CareerRecommendation | null>(null);
  const [riasecResult, setRiasecResult] = useState<RiasecResult | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [quizResponseId, setQuizResponseId] = useState<string | undefined>();
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
    trackEvent("home_variant_assigned", { variant: homeVariant });
  }, [homeVariant]);

  const handleStartQuiz = () => {
    trackEvent("quiz_start_clicked");
    setCurrentStep("preparation");
  };

  const handlePrepareQuiz = () => {
    trackEvent("quiz_preparation_completed");
    setCurrentStep("quiz");
  };

  const handleQuizComplete = (answers: QuizAnswer[], riasecScore: RiasecResult) => {
    setQuizAnswers(answers);
    setRiasecResult(riasecScore);
    trackEvent("email_form_viewed");
    setCurrentStep("email");
  };

  const handleEmailSubmit = async (name: string, email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const safeName = name.trim().length >= 2 ? name.trim() : "Concurseiro";
    const riasecPayload =
      riasecResult ||
      calculateRiasecScores(
        quizAnswers.reduce<Record<string, string>>((acc, cur, idx) => {
          const questionId = cur.id || quizQuestions[idx]?.id || `q${idx}`;
          acc[questionId] = cur.answer;
          return acc;
        }, {}),
        quizQuestions
      );

    if (!trimmedEmail) {
      toast.error("Informe um email valido.");
      setCurrentStep("email");
      return;
    }

    setUserName(safeName);
    setUserEmail(trimmedEmail);
    trackEvent("email_captured");

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
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao salvar recomendacao: ${errorText}`);
      }

      const data = await response.json();

      const localRecommendation: CareerRecommendation = {
        careerName: `Plano recomendado para perfil ${riasecPayload.top1}`,
        justification: "Baseado nas suas respostas RIASEC.",
        salary: "Em definicao",
        examDate: "Em definicao",
        workplaces: [],
        workRoutine: "Plano inicial alinhado ao seu perfil.",
        subjects: [],
        examFrequency: "Em definicao",
        riasec: riasecPayload,
      };

      setRecommendation(localRecommendation);
      setQuizResponseId(data?.id);

      // Send welcome email (do not block flow if it fails)
      try {
        await fetch("/api/send-welcome-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: safeName,
            userEmail: trimmedEmail,
          }),
        });
        console.log("Welcome email sent successfully");
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
      }

      setCurrentStep("results");
      toast.success("Resultado gerado com sucesso!");
    } catch (error) {
      console.error("Error generating recommendation:", error);
      const fallbackRiasec =
        riasecPayload ||
        calculateRiasecScores(
          quizAnswers.reduce<Record<string, string>>((acc, cur, idx) => {
            const questionId = cur.id || quizQuestions[idx]?.id || `q${idx}`;
            acc[questionId] = cur.answer;
            return acc;
          }, {}),
          quizQuestions
        );

      const fallbackRecommendation: CareerRecommendation = {
        careerName: `Plano recomendado para perfil ${fallbackRiasec.top1}`,
        justification: "Baseado nas suas respostas, criamos um plano preliminar enquanto geramos o relatorio completo.",
        salary: "Em definicao",
        examDate: "Em definicao",
        workplaces: [],
        workRoutine: "Rotina flexivel alinhada ao seu perfil.",
        subjects: [],
        examFrequency: "Em definicao",
        riasec: fallbackRiasec,
      };

      setRecommendation(fallbackRecommendation);
      setQuizResponseId(undefined);
      setCurrentStep("results");
      toast.warning("Nao conseguimos gerar o relatorio completo agora. Mostramos um resultado parcial.");
    }
  };

  const handleUpsellClick = async () => {
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
      {currentStep === "quiz" && <Quiz onComplete={handleQuizComplete} onBack={handleBackToLanding} />}
      {currentStep === "email" && <EmailCapture onSubmit={handleEmailSubmit} />}
      {currentStep === "error" && <ErrorPage onRetry={handleRetry} />}
      {currentStep === "results" && recommendation && (
        <Results
          recommendation={recommendation}
          userName={userName}
          userEmail={userEmail}
          quizResponseId={quizResponseId}
          riasecFallback={riasecResult || undefined}
        />
      )}
    </>
  );
};

export default Index;



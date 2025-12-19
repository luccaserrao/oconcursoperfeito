import { useState } from "react";
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

type Step = "landing" | "preparation" | "quiz" | "email" | "results" | "error";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [recommendation, setRecommendation] = useState<CareerRecommendation | null>(null);
  const [riasecResult, setRiasecResult] = useState<RiasecResult | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [quizResponseId, setQuizResponseId] = useState<string | undefined>();

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
      {currentStep === "landing" && <Landing onStart={handleStartQuiz} />}
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



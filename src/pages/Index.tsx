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
    trackEvent('quiz_start_clicked');
    setCurrentStep("preparation");
  };

  const handlePrepareQuiz = () => {
    trackEvent('quiz_preparation_completed');
    setCurrentStep("quiz");
  };

  const handleQuizComplete = (answers: QuizAnswer[], riasecScore: RiasecResult) => {
    setQuizAnswers(answers);
    setRiasecResult(riasecScore);
    trackEvent('email_form_viewed');
    setCurrentStep("email");
  };

  const handleEmailSubmit = async (name: string, email: string) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      toast.error("Nome muito curto. Use pelo menos 2 caracteres.");
      setCurrentStep("email");
      return;
    }

    setUserName(trimmedName);
    setUserEmail(trimmedEmail);
    trackEvent('email_captured');

    try {
      // Backend aceita no máximo 30 respostas; fatiamos para evitar 400
      const payloadAnswers = quizAnswers.slice(0, 30);

      const response = await fetch("/api/generate-career-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: payloadAnswers,
          name: trimmedName,
          email: trimmedEmail,
          whatsapp: "",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao gerar recomendacao: ${errorText}`);
      }

      const data = await response.json();
      const mergedRecommendation: CareerRecommendation = {
        ...data.recommendation,
        riasec: data.recommendation.riasec || riasecResult || undefined,
      };

      setRecommendation(mergedRecommendation);
      setQuizResponseId(data.quizResponseId);
      
      // Send welcome email (don't block flow if it fails)
      try {
        await fetch("/api/send-welcome-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: trimmedName,
            userEmail: trimmedEmail,
          }),
        });
        console.log("Welcome email sent successfully");
        
      } catch (emailError) {
        // Don't block the flow if email fails
        console.error("Error sending welcome email:", emailError);
      }
      
      setCurrentStep("results");
      
      toast.success("Resultado gerado com sucesso!");
    } catch (error) {
      console.error("Error generating recommendation:", error);
      setCurrentStep("error");
    }
  };

  const handleUpsellClick = async () => {
    try {
      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-upsell-click`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        }
      );
    } catch (error) {
      console.error("Error tracking upsell click:", error);
    }
  };

  const handleBackToLanding = () => {
    setCurrentStep("landing");
  };

  const handleRetry = async () => {
    setCurrentStep("email");
    // Try submitting again
    if (userName && userEmail) {
      await handleEmailSubmit(userName, userEmail);
    }
  };

  return (
    <>
      {currentStep === "landing" && <Landing onStart={handleStartQuiz} />}
      {currentStep === "preparation" && <PreparationScreen onStart={handlePrepareQuiz} />}
      {currentStep === "quiz" && (
        <Quiz onComplete={handleQuizComplete} onBack={handleBackToLanding} />
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
        />
      )}
    </>
  );
};

export default Index;















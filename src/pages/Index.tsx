import { useState } from "react";
import { Landing } from "@/components/Landing";
import { Quiz } from "@/components/Quiz";
import { EmailCapture } from "@/components/EmailCapture";
import { Results } from "@/components/Results";
import ErrorPage from "./ErrorPage";
import { QuizAnswer, CareerRecommendation } from "@/types/quiz";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

type Step = "landing" | "quiz" | "email" | "results" | "error";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("landing");
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [recommendation, setRecommendation] = useState<CareerRecommendation | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [quizResponseId, setQuizResponseId] = useState<string | undefined>();

  const handleStartQuiz = () => {
    trackEvent('quiz_start_clicked');
    setCurrentStep("quiz");
  };

  const handleQuizComplete = (answers: QuizAnswer[]) => {
    setQuizAnswers(answers);
    trackEvent('email_form_viewed');
    setCurrentStep("email");
  };

  const handleEmailSubmit = async (name: string, email: string, whatsapp?: string) => {
    setUserName(name);
    setUserEmail(email);
    trackEvent('email_captured', { hasWhatsapp: !!whatsapp });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-career-recommendation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: quizAnswers,
            name,
            email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao gerar recomendação");
      }

      const data = await response.json();
      setRecommendation(data.recommendation);
      setQuizResponseId(data.quizResponseId);
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
        />
      )}
    </>
  );
};

export default Index;

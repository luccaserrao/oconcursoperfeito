import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizAnswer } from "@/types/quiz";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface QuizProps {
  onComplete: (answers: QuizAnswer[]) => void;
  onBack: () => void;
}

export const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];
  const isLikertQuestion = question.type === "likert";

  // Load saved progress on mount
  useEffect(() => {
    console.log(`📚 Total de perguntas no quiz: ${quizQuestions.length}`);

    const saved = localStorage.getItem("quiz_progress");
    if (saved) {
      try {
        const { currentQuestion: savedQ, answers: savedA } = JSON.parse(saved);
        if (savedQ > 0 && savedQ < quizQuestions.length) {
          console.log(
            `♻️ Restaurando progresso: pergunta ${savedQ + 1}/${quizQuestions.length}`
          );
          setCurrentQuestion(savedQ);
          setAnswers(savedA);
        } else {
          console.warn("⚠️ Progresso inválido detectado, limpando localStorage");
          localStorage.removeItem("quiz_progress");
        }
      } catch (e) {
        console.error("❌ Falha ao carregar progresso salvo:", e);
        localStorage.removeItem("quiz_progress");
      }
    }
    trackEvent("quiz_started");
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (currentQuestion > 0 || answers.length > 0) {
      localStorage.setItem(
        "quiz_progress",
        JSON.stringify({ currentQuestion, answers })
      );
    }
  }, [currentQuestion, answers]);

  // Track progress milestones
  useEffect(() => {
    const progressPercent = Math.round(progress);
    if ([25, 50, 75].includes(progressPercent)) {
      trackEvent("quiz_progress", { progress: progressPercent });
    }
  }, [currentQuestion, progress]);

  // Motivational messages based on remaining count (27 questions)
  const getMotivationalMessage = () => {
    const remaining = quizQuestions.length - (currentQuestion + 1);
    if (remaining === 0) return "🎯 Última pergunta!";
    if (remaining === 5) return "Quase lá! Últimas 5 perguntas.";
    if (remaining === 10) return "Você está indo bem! Faltam só 10 perguntas.";
    if (currentQuestion >= 5) return "✅ Ótimo progresso";
    return "🌟 Continue assim";
  };

  const handleNext = () => {
    if (!selectedOption) {
      console.warn("⚠️ Nenhuma opção selecionada");
      return;
    }

    console.log(
      `📝 Respondendo pergunta ${currentQuestion + 1}/${quizQuestions.length}`
    );

    const newAnswers = [
      ...answers,
      {
        question: question.question,
        answer: selectedOption,
      },
    ];

    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion === quizQuestions.length - 1) {
      console.log(`✅ Quiz completado! Total de respostas: ${newAnswers.length}`);
      localStorage.removeItem("quiz_progress");
      trackEvent("quiz_completed");
      onComplete(newAnswers);
    } else {
      console.log(
        `➡️ Avançando para pergunta ${currentQuestion + 2}/${quizQuestions.length}`
      );
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const remainingQuestions = quizQuestions.length - (currentQuestion + 1);
  const estimatedMinutes = Math.max(0, Math.ceil(remainingQuestions * 0.3));

  return (
    <div className="quiz-page">
      <div className="progress-section">
        <Progress value={progress} className="h-3" />
        <p className="mt-2 text-sm text-muted-foreground">
          {getMotivationalMessage()}
        </p>
      </div>

      <div className="question-container">
        <h2 className="question-text">{question.question}</h2>
        <div className="likert-options">
          {(question.options || []).map((opt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedOption(opt)}
              className={`likert-option border ${
                selectedOption === opt
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <button
        className="next-button bg-gradient-to-r from-primary to-accent text-white rounded-full py-3 disabled:opacity-50"
        onClick={handleNext}
        disabled={!selectedOption}
      >
        {currentQuestion === quizQuestions.length - 1 ? "Finalizar" : "Próxima →"}
      </button>
    </div>
  );
};

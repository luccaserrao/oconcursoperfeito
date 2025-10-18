import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizAnswer } from "@/types/quiz";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuizProps {
  onComplete: (answers: QuizAnswer[]) => void;
  onBack: () => void;
}

export const Quiz = ({ onComplete, onBack }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  const handleNext = () => {
    if (!selectedOption) return;

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
      onComplete(newAnswers);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion === 0) {
      onBack();
      return;
    }

    const newAnswers = [...answers];
    const previousAnswer = newAnswers.pop();
    setAnswers(newAnswers);
    setSelectedOption(previousAnswer?.answer || null);
    setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress */}
        <div className="mb-8 space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
            <span>{Math.round(progress)}% concluído</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-[var(--shadow-elevated)] animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === option
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <span className="text-base">{option}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className="gap-2 bg-gradient-to-r from-primary to-accent"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Finalizar" : "Próxima"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

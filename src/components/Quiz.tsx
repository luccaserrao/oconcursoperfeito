import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizAnswer } from "@/types/quiz";
import { ArrowLeft, ArrowRight, CheckCircle, Trophy } from "lucide-react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

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
  const isLikertQuestion = question.type === "likert";

  // Load saved progress on mount
  useEffect(() => {
    console.log(`📚 Total de perguntas no quiz: ${quizQuestions.length}`);
    
    const saved = localStorage.getItem('quiz_progress');
    if (saved) {
      try {
        const { currentQuestion: savedQ, answers: savedA } = JSON.parse(saved);
        if (savedQ > 0 && savedQ < quizQuestions.length) {
          console.log(`♻️ Restaurando progresso: pergunta ${savedQ + 1}/${quizQuestions.length}`);
          setCurrentQuestion(savedQ);
          setAnswers(savedA);
        } else {
          // Limpar localStorage corrompido
          console.warn('⚠️ Progresso inválido detectado, limpando localStorage');
          localStorage.removeItem('quiz_progress');
        }
      } catch (e) {
        console.error("❌ Falha ao carregar progresso salvo:", e);
        localStorage.removeItem('quiz_progress');
      }
    }
    trackEvent('quiz_started');
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (currentQuestion > 0 || answers.length > 0) {
      localStorage.setItem('quiz_progress', JSON.stringify({ currentQuestion, answers }));
    }
  }, [currentQuestion, answers]);

  // Track progress milestones
  useEffect(() => {
    const progressPercent = Math.round(progress);
    if ([25, 50, 75].includes(progressPercent)) {
      trackEvent('quiz_progress', { progress: progressPercent });
    }
  }, [currentQuestion, progress]);

  // Get motivational message based on progress
  const getMotivationalMessage = () => {
    console.log(`💬 Mostrando mensagem para pergunta ${currentQuestion + 1}/${quizQuestions.length}`);
    
    // Pergunta 30 (última)
    if (currentQuestion === 29) {
      return "🏆 Última pergunta! A próxima tela vai revelar seu perfil vocacional.";
    }
    // Pergunta 20
    if (currentQuestion === 19) {
      return "💪 Falta pouco! Sua combinação de respostas está ficando única.";
    }
    // Pergunta 10
    if (currentQuestion === 9) {
      return "✨ Você está indo muito bem! Essas respostas ajudam a IA a entender seu perfil.";
    }
    
    // Mensagens gerais de progresso
    if (currentQuestion >= 25) return "🚀 Últimas perguntas!";
    if (currentQuestion >= 15) return "🏁 Faltam só 15 perguntas";
    if (currentQuestion >= 5) return "🎉 Ótimo progresso";
    return "✨ Continue assim";
  };

  const handleNext = () => {
    if (!selectedOption) {
      console.warn('⚠️ Nenhuma opção selecionada');
      return;
    }

    console.log(`✅ Respondendo pergunta ${currentQuestion + 1}/${quizQuestions.length}`);

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
      console.log(`🎉 Quiz completado! Total de respostas: ${newAnswers.length}`);
      localStorage.removeItem('quiz_progress');
      trackEvent('quiz_completed');
      onComplete(newAnswers);
    } else {
      console.log(`➡️ Avançando para pergunta ${currentQuestion + 2}/${quizQuestions.length}`);
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
        <div className="mb-8 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">
              Pergunta {currentQuestion + 1} de {quizQuestions.length}
            </span>
            <span className="font-semibold text-primary">
              {Math.round(progress)}% • ~{Math.ceil((quizQuestions.length - currentQuestion) * 0.3)} min restantes
            </span>
          </div>
          <Progress value={progress} className="h-3" />
          {currentQuestion >= 5 && (
            <div className={`text-center text-sm animate-fade-in ${
              [9, 19, 29].includes(currentQuestion) 
                ? "text-primary font-semibold text-base" 
                : "text-muted-foreground"
            }`}>
              {getMotivationalMessage()}
            </div>
          )}
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-[var(--shadow-elevated)] animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            {question.question}
          </h2>

          {/* Question Options */}
          <div className="space-y-3">
            {isLikertQuestion ? (
              // Likert Scale - Horizontal buttons
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-2">
                  {question.options.map((option, index) => {
                    const colors = [
                      "border-destructive/50 hover:bg-destructive/10 hover:border-destructive data-[selected=true]:bg-destructive data-[selected=true]:text-destructive-foreground",
                      "border-orange-500/50 hover:bg-orange-500/10 hover:border-orange-500 data-[selected=true]:bg-orange-500 data-[selected=true]:text-white",
                      "border-muted hover:bg-muted hover:border-muted-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground",
                      "border-green-500/50 hover:bg-green-500/10 hover:border-green-500 data-[selected=true]:bg-green-500 data-[selected=true]:text-white",
                      "border-primary/50 hover:bg-primary/10 hover:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
                    ];
                    
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedOption(option)}
                        data-selected={selectedOption === option}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-sm font-medium text-center ${colors[index]}`}
                      >
                        <div className="text-2xl mb-1">{index + 1}</div>
                        <div className="text-xs leading-tight">
                          {index === 0 ? "Discordo muito" : 
                           index === 1 ? "Discordo" : 
                           index === 2 ? "Neutro" : 
                           index === 3 ? "Concordo" : 
                           "Concordo muito"}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground px-1">
                  <span>← Discordo</span>
                  <span>Concordo →</span>
                </div>
              </div>
            ) : (
              // Multiple Choice - Regular buttons
              question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 relative group ${
                    selectedOption === option
                      ? "border-primary bg-primary/10 shadow-md scale-[1.02]"
                      : "border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base flex-1">{option}</span>
                    {selectedOption === option && (
                      <CheckCircle className="w-5 h-5 text-primary animate-scale-in" />
                    )}
                  </div>
                </button>
              ))
            )}
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

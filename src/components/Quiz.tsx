import { useEffect, useMemo, useRef, useState } from "react";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizAnswer } from "@/types/quiz";
import { trackEvent } from "@/lib/analytics";

interface QuizProps {
  onComplete: (answers: QuizAnswer[]) => void;
  onBack: () => void;
}

export const Quiz = ({ onComplete }: QuizProps) => {
  const pageSize = 3;
  const totalPages = Math.ceil(quizQuestions.length / pageSize);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const answeredCount = useMemo(
    () => Object.keys(answers).length,
    [answers]
  );
  const progress = (answeredCount / quizQuestions.length) * 100;

  const visibleQuestions = useMemo(() => {
    const start = currentPage * pageSize;
    return quizQuestions.slice(start, start + pageSize);
  }, [currentPage, pageSize]);

  const pageComplete = visibleQuestions.every((q) => answers[q.id]);
  const isLastPage = currentPage === totalPages - 1;

  useEffect(() => {
    console.log(`[Quiz] Total de perguntas no quiz: ${quizQuestions.length}`);
    const saved = localStorage.getItem("quiz_progress");
    if (saved) {
      try {
        const { answers: savedA } = JSON.parse(saved);
        if (savedA && typeof savedA === "object") {
          setAnswers(savedA);
        }
      } catch (e) {
        console.error("[Quiz] Falha ao carregar progresso salvo:", e);
        localStorage.removeItem("quiz_progress");
      }
    }
    trackEvent("quiz_started");
  }, []);

  useEffect(() => {
    localStorage.setItem("quiz_progress", JSON.stringify({ answers }));
  }, [answers]);

  const handleSelect = (id: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
    trackEvent("quiz_option_selected", { questionId: id, answer });
  };

  const handleNext = () => {
    if (!pageComplete) {
      const firstUnanswered = visibleQuestions.find((q) => !answers[q.id]);
      if (firstUnanswered) {
        const target = questionRefs.current[firstUnanswered.id];
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (!isLastPage) {
      trackEvent("quiz_page_advance", { page: currentPage + 1 });
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const normalizedAnswers: QuizAnswer[] = quizQuestions.map((q) => ({
      question: q.question,
      answer: answers[q.id],
    }));

    localStorage.removeItem("quiz_progress");
    trackEvent("quiz_completed");
    onComplete(normalizedAnswers);
  };

  const buttonLabel = isLastPage ? "Finalizar" : "Próxima";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-3 space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Página {currentPage + 1} de {totalPages}</span>
            <span className="font-medium">
              Respondidas {answeredCount}/{quizQuestions.length}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Complete as {Math.min(pageSize, visibleQuestions.length)} perguntas para avançar
          </p>
        </div>
      </div>

      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-4 space-y-4">
        {visibleQuestions.map((q, idx) => {
          const globalIndex = currentPage * pageSize + idx;
          return (
          <div
            key={q.id}
            ref={(el) => {
              questionRefs.current[q.id] = el;
            }}
            className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                {globalIndex + 1}
              </div>
              <div className="space-y-3 w-full">
                <p className="text-base sm:text-lg font-semibold leading-snug">
                  {q.question}
                </p>
                <div className="grid gap-2">
                  {(q.options || []).map((opt, i) => {
                    const selected = answers[q.id] === opt;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSelect(q.id, opt)}
                        className={`text-left w-full rounded-xl border px-4 py-3 sm:py-3.5 text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                          selected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background hover:bg-muted/70"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
        })}
      </div>

      <div className="sticky bottom-0 z-20 bg-background/95 backdrop-blur border-t">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <button
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-primary/20"
            onClick={handleNext}
            disabled={answeredCount === 0}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

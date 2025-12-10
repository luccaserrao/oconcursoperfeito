import { useEffect, useMemo, useRef, useState } from "react";
import { quizQuestions } from "@/data/quizQuestions";
import { QuizAnswer, RiasecResult } from "@/types/quiz";
import { trackEvent } from "@/lib/analytics";
import { calculateRiasecScores } from "@/lib/riasec";
import { Clock3, ShieldCheck, Sparkles, Target } from "lucide-react";

interface QuizProps {
  onComplete: (answers: QuizAnswer[], riasecResult: RiasecResult) => void;
  onBack: () => void;
}

export const Quiz = ({ onComplete }: QuizProps) => {
  const pageSize = 3;
  const totalPages = Math.ceil(quizQuestions.length / pageSize);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const secondsPerQuestion = 12;

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = (answeredCount / quizQuestions.length) * 100;
  const remainingQuestions = Math.max(quizQuestions.length - answeredCount, 0);
  const estimatedSecondsRemaining = remainingQuestions * secondsPerQuestion;
  const estimatedMinutesRemaining = estimatedSecondsRemaining === 0 ? 0 : Math.max(1, Math.ceil(estimatedSecondsRemaining / 60));

  const visibleQuestions = useMemo(() => {
    const start = currentPage * pageSize;
    return quizQuestions.slice(start, start + pageSize);
  }, [currentPage, pageSize]);

  // Para textos livres, nÃ£o bloquear avanÃ§o se o usuÃ¡rio nÃ£o digitar (opcional),
  // mas preferimos usar o valor se fornecido.
  const pageComplete = visibleQuestions.every((q) => {
    if (q.type === "text") return true;
    return Boolean(answers[q.id]);
  });
  const isLastPage = currentPage === totalPages - 1;

  const microBanners = [
    {
      title: "Plano completo liberado no final",
      description: "Depois do diagnóstico grátis, destrave opcionalmente o plano completo + checklist de edital por R$25.",
      pill: "Bonus pago",
      cta: "Quero ver o plano completo",
      event: "quiz_microbanner_click_full_plan",
    },
    {
      title: "Resultado grátis imediato",
      description: "Mostramos seu diagnóstico antes da oferta paga. você só paga se quiser o plano completo.",
      pill: "grátis primeiro",
      cta: "Ver como funciona",
      event: "quiz_microbanner_click_free_first",
    },
    {
      title: "Roteiro personalizado",
      description: "Seu perfil RIASEC vira um plano de estudos com priorização do que rende mais.",
      pill: "Benefício",
      cta: "Quero meu roteiro",
      event: "quiz_microbanner_click_route",
    },
  ];
  const currentBanner = microBanners[currentPage % microBanners.length];

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleSelect = (id: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
    trackEvent("quiz_option_selected", { questionId: id, answer });
  };

  const handleTextChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
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

    const riasecResult = calculateRiasecScores(answers, quizQuestions);

    const normalizedAnswers: QuizAnswer[] = quizQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      answer: answers[q.id],
      riasecType: q.riasecType,
    }));

    localStorage.removeItem("quiz_progress");
    trackEvent("quiz_completed");
    onComplete(normalizedAnswers, riasecResult);
  };

  const buttonLabel = isLastPage ? "Finalizar" : "próxima";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-3 space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Pagina {currentPage + 1} de {totalPages}</span>
            <span className="font-medium">
              Respondidas {answeredCount}/{quizQuestions.length} Â· {progress.toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/60">
              <Clock3 className="w-4 h-4 text-primary" />
              Tempo restante aprox: {estimatedMinutesRemaining} min
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/60">
              <ShieldCheck className="w-4 h-4 text-primary" />
              diagnóstico grátis antes da oferta paga
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/60">
              <Target className="w-4 h-4 text-primary" />
              Foque em respostas sinceras para mais precisao
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-4 space-y-4">
        {visibleQuestions.map((q, idx) => {
          const globalIndex = currentPage * pageSize + idx;
          const showBanner = idx === 0;
          return (
            <div key={q.id} className="space-y-4">
              <div
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
                    {q.type === "text" ? (
                      <div className="space-y-1">
                        <textarea
                          value={answers[q.id] || ""}
                          onChange={(e) => handleTextChange(q.id, e.target.value)}
                          onBlur={(e) => trackEvent("quiz_text_answered", { questionId: q.id, length: (e.target.value || "").length })}
                          placeholder={q.placeholder || ""}
                          className="w-full rounded-xl border px-4 py-3 text-sm sm:text-base bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                          rows={2}
                        />
                        {q.helperText && (
                          <p className="text-xs text-muted-foreground">{q.helperText}</p>
                        )}
                      </div>
                    ) : (
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
                    )}
                  </div>
                </div>
              </div>

              {showBanner && (
                <div className="rounded-2xl border bg-muted/40 p-4 sm:p-5 flex gap-3 items-start">
                  <div className="mt-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold">
                      {currentBanner.pill}
                    </div>
                    <p className="text-sm font-semibold text-foreground">{currentBanner.title}</p>
                    <p className="text-sm text-muted-foreground">{currentBanner.description}</p>
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 underline"
                      onClick={() => trackEvent(currentBanner.event, { page: currentPage + 1 })}
                    >
                      {currentBanner.cta}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 z-20 bg-background/95 backdrop-blur border-t">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-2">
          <p className="text-xs text-muted-foreground text-center">
            Complete a pagina para avancar. Seu diagnóstico gratuito aparece ao final antes de qualquer oferta paga.
          </p>
          <button
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-primary/20"
            onClick={handleNext}
            disabled={!pageComplete}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};


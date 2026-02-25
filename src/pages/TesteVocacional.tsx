
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { vocationalQuestions, VocationalQuestion } from "@/data/vocationalQuestions";
import { calculateRiasecScores } from "@/lib/riasec";
import {
  calculateMultipleIntelligences,
  MULTIPLE_INTELLIGENCE_LABELS,
  MultipleIntelligenceResult,
} from "@/lib/multipleIntelligences";
import { getVocationalClusters, CareerClusterResult } from "@/data/vocationalRecommendations";
import { VocationalEmailCapture } from "@/components/VocationalEmailCapture";
import { MercadoPagoButton } from "@/components/MercadoPagoButton";
import { getQuizTrackingContext, trackJourneyStep } from "@/lib/quizTracking";
import { trackEvent } from "@/lib/analytics";
import { QuizAnswer, RiasecResult } from "@/types/quiz";
import { CheckCircle2, Clock3, ShieldCheck, Sparkles } from "lucide-react";

const faqItems = [
  {
    question: "O teste vocacional e gratuito mesmo?",
    answer:
      "Sim. Voce recebe um resultado gratuito imediato com a direcao inicial. O relatorio completo e opcional e pago.",
  },
  {
    question: "Qual metodologia o teste usa?",
    answer:
      "Combinamos a teoria RIASEC (Holland) com Inteligencias Multiplas (Gardner) para oferecer uma visao mais ampla do seu perfil.",
  },
  {
    question: "Quanto tempo leva para fazer o teste?",
    answer: "Cerca de 7 a 10 minutos, dependendo do seu ritmo.",
  },
  {
    question: "O teste substitui orientacao profissional?",
    answer:
      "Nao. Ele e uma ferramenta de autoconhecimento que ajuda a ganhar clareza e acelerar sua decisao.",
  },
  {
    question: "O que tem no relatorio completo?",
    answer:
      "Explicacao detalhada do seu perfil, comparacao entre areas, exemplos de carreiras, habilidades prioritarias e plano de acao.",
  },
  {
    question: "Meus dados estao seguros?",
    answer: "Sim. Seguimos a LGPD e usamos seus dados apenas para gerar e entregar o relatorio.",
  },
];

const structuredFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

type Step = "landing" | "quiz" | "results" | "email" | "upsell";

interface QuizCompletePayload {
  answers: Record<string, string>;
  answerList: QuizAnswer[];
}

const VocationalQuiz = ({
  questions,
  onComplete,
  onBack,
}: {
  questions: VocationalQuestion[];
  onComplete: (payload: QuizCompletePayload) => void;
  onBack: () => void;
}) => {
  const pageSize = 4;
  const totalPages = Math.ceil(questions.length / pageSize);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const visibleQuestions = useMemo(() => {
    const start = currentPage * pageSize;
    return questions.slice(start, start + pageSize);
  }, [currentPage, pageSize, questions]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const progress = (answeredCount / questions.length) * 100;
  const remainingQuestions = Math.max(questions.length - answeredCount, 0);
  const estimatedMinutesRemaining = Math.max(1, Math.ceil((remainingQuestions * 10) / 60));

  const pageComplete = visibleQuestions.every((q) => Boolean(answers[q.id]));
  const isLastPage = currentPage === totalPages - 1;

  useEffect(() => {
    trackEvent("vocational_quiz_started");
  }, []);

  const handleSelect = (id: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
    trackEvent("vocational_quiz_option_selected", { questionId: id, answer });
  };
  const handleNext = () => {
    if (!pageComplete) return;

    if (!isLastPage) {
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const answerList: QuizAnswer[] = questions.map((q) => ({
      id: q.id,
      question: q.question,
      answer: answers[q.id],
      riasecType: q.riasecType,
    }));

    onComplete({ answers, answerList });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto px-4 pt-4 pb-3 space-y-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Pagina {currentPage + 1} de {totalPages}</span>
            <span className="font-medium">
              Respondidas {answeredCount}/{questions.length} · {progress.toFixed(0)}%
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
              Resultado gratuito antes do relatorio
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-6 space-y-5">
        {visibleQuestions.map((q, idx) => {
          const globalIndex = currentPage * pageSize + idx;
          return (
            <div key={q.id} className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {globalIndex + 1}
                  </div>
                  <div className="space-y-3 w-full">
                    <p className="text-base sm:text-lg font-semibold leading-snug">{q.question}</p>
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
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 z-20 bg-background/95 backdrop-blur border-t">
        <div className="max-w-3xl mx-auto px-4 py-3 space-y-2">
          <p className="text-xs text-muted-foreground text-center">
            Responda todas as perguntas da pagina para avancar.
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <Button variant="outline" className="md:w-40" onClick={onBack}>
              Voltar
            </Button>
            <Button
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-primary/20"
              onClick={handleNext}
              disabled={!pageComplete}
            >
              {isLastPage ? "Finalizar" : "Proxima"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TesteVocacional = () => {
  const [step, setStep] = useState<Step>("landing");
  const [riasecResult, setRiasecResult] = useState<RiasecResult | null>(null);
  const [miResult, setMiResult] = useState<MultipleIntelligenceResult | null>(null);
  const [clusters, setClusters] = useState<CareerClusterResult[]>([]);
  const [answerList, setAnswerList] = useState<QuizAnswer[]>([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [quizResponseId, setQuizResponseId] = useState<string | undefined>();

  useEffect(() => {
    if (step === "landing") {
      trackJourneyStep({ step: "landing_viewed", quiz_version: "vocacional" });
      trackEvent("vocational_landing_viewed");
    }
    if (step === "quiz") {
      trackJourneyStep({ step: "quiz_started", quiz_version: "vocacional" });
    }
    if (step === "results") {
      trackJourneyStep({ step: "results_viewed", quiz_version: "vocacional" });
      trackEvent("vocational_results_viewed");
    }
  }, [step]);

  const handleStartQuiz = () => {
    trackEvent("vocational_quiz_start_click");
    setStep("quiz");
  };

  const handleQuizComplete = ({ answers, answerList: completed }: QuizCompletePayload) => {
    const riasec = calculateRiasecScores(answers, vocationalQuestions);
    const mi = calculateMultipleIntelligences(answers, vocationalQuestions);
    const clusterResults = getVocationalClusters(riasec.scores, riasec.top1, riasec.top2);

    setRiasecResult(riasec);
    setMiResult(mi);
    setClusters(clusterResults);
    setAnswerList(completed);

    trackEvent("vocational_quiz_completed");
    trackJourneyStep({ step: "quiz_completed", quiz_version: "vocacional" });
    setStep("results");
  };

  const handleEmailSubmit = async (name: string, email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const safeName = name.trim().length >= 2 ? name.trim() : "Pessoa";

    setUserName(safeName);
    setUserEmail(trimmedEmail);
    trackEvent("vocational_email_submitted");

    const tracking = getQuizTrackingContext();
    const trackingPayload = {
      quiz_session_id: tracking.quiz_session_id || undefined,
      source: "testevocacional",
      utm_source: tracking.utm_source || undefined,
      utm_medium: tracking.utm_medium || undefined,
      utm_campaign: tracking.utm_campaign || undefined,
      utm_content: tracking.utm_content || undefined,
      utm_term: tracking.utm_term || undefined,
      referrer: tracking.referrer || undefined,
      landing_path: tracking.landing_path || undefined,
    };

    const riasecPayload = riasecResult
      ? { ...riasecResult, multipleIntelligences: miResult || null }
      : null;

    try {
      const response = await fetch("/api/generate-career-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: answerList,
          name: safeName,
          email: trimmedEmail,
          riasec: riasecPayload,
          source: "testevocacional",
          skip_email_sequence: true,
          ...trackingPayload,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao salvar recomendacao: ${errorText}`);
      }

      const data = await response.json();
      setQuizResponseId(data?.id);

      trackJourneyStep({
        step: "email_submitted",
        quiz_version: "vocacional",
        quiz_response_id: data?.id || null,
      });
    } catch (error) {
      console.error("Erro ao salvar respostas:", error);
    }

    setStep("upsell");
  };
  if (step === "quiz") {
    return (
      <VocationalQuiz
        questions={vocationalQuestions}
        onComplete={handleQuizComplete}
        onBack={() => setStep("landing")}
      />
    );
  }

  if (step === "email") {
    return (
      <VocationalEmailCapture onSubmit={handleEmailSubmit} onBack={() => setStep("results")} />
    );
  }

  if (step === "upsell") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4 max-w-5xl space-y-10">
          <Card className="p-8 bg-card border-2 border-primary/20">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold bg-primary/10 border border-primary/30 px-3 py-1 rounded-full w-fit">
                <Sparkles className="w-4 h-4" />
                Relatorio completo desbloqueavel
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Seu resultado completo esta pronto, {userName || ""}.
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Voce ja recebeu a direcao inicial. Agora destrave o relatorio profissional com plano de acao e comparacao de areas.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Comparacao entre 3 clusters de carreira",
                  "Plano de acao em 30 dias",
                  "Forcas e pontos de atencao",
                  "Sugestoes de cursos e proximos passos",
                  "Checklist de decisoes para nao errar",
                  "Resumo em PDF para salvar",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <MercadoPagoButton
                  userName={userName}
                  userEmail={userEmail}
                  quizResponseId={quizResponseId}
                  amount={25}
                  location="vocational_upsell"
                  onStatusChange={() => {}}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Pagamento unico de R$25. Resultado completo enviado por email automaticamente.
              </p>
            </div>
          </Card>
          <div className="text-center">
            <Button variant="outline" onClick={() => setStep("landing")} className="rounded-full">
              Voltar ao inicio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "results" && riasecResult && miResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-10">
          <Card className="p-8 bg-card border-2 border-primary/20">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold bg-primary/10 border border-primary/30 px-3 py-1 rounded-full w-fit">
                resultado gratuito
              </div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Seu perfil principal: {riasecResult.top1} + {riasecResult.top2}
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                {riasecResult.descricao_personalizada}
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {clusters.map((cluster) => (
                  <Card key={cluster.id} className="p-5 border border-border bg-background/80">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{cluster.title}</p>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {cluster.affinity}% afinidade
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{cluster.description}</p>
                    <div className="mt-3 text-sm text-foreground">{cluster.careers.join(" · ")}</div>
                  </Card>
                ))}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Inteligencia dominante</p>
                  <p className="text-lg font-semibold mt-1">
                    {MULTIPLE_INTELLIGENCE_LABELS[miResult.top1]}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Inteligencia secundaria</p>
                  <p className="text-lg font-semibold mt-1">
                    {MULTIPLE_INTELLIGENCE_LABELS[miResult.top2]}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold bg-primary/10 border border-primary/30 px-3 py-1 rounded-full w-fit">
                  Relatorio completo
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Quer o relatorio completo com plano de acao?
                </h2>
                <p className="text-muted-foreground">
                  O relatorio completo explica o PORQUE das areas sugeridas, mostra pontos fortes, alerta armadilhas e detalha proximos passos.
                </p>
              </div>
              <Button
                onClick={() => {
                  trackEvent("vocational_upsell_clicked");
                  trackJourneyStep({ step: "upsell_clicked", quiz_version: "vocacional" });
                  setStep("email");
                }}
                className="h-auto rounded-full px-8 py-5 text-base font-semibold"
              >
                Quero meu relatorio completo
              </Button>
            </div>
          </Card>

          <div className="text-center">
            <Button variant="outline" onClick={() => setStep("landing")} className="rounded-full">
              Voltar ao inicio
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Teste vocacional gratis e completo | Futuro Perfeito</title>
        <meta
          name="description"
          content="Teste vocacional online com resultado gratis imediato e relatorio completo opcional. Descubra sua carreira ideal em minutos."
        />
        <meta
          name="keywords"
          content="teste vocacional, teste vocacional online, teste de profissao, carreira ideal, orientacao profissional"
        />
        <meta property="og:title" content="Teste vocacional gratis e completo" />
        <meta
          property="og:description"
          content="Descubra sua carreira ideal com um teste vocacional rapido, baseado em RIASEC e Inteligencias Multiplas."
        />
        <script type="application/ld+json">{JSON.stringify(structuredFaq)}</script>
      </Helmet>

      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_hsla(210,70%,70%,0.18),_transparent_45%)] text-foreground">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-white/90 backdrop-blur">
          <div className="container mx-auto flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" className="text-lg font-semibold tracking-tight">
                Futuro Perfeito
              </Link>
              <Button
                onClick={handleStartQuiz}
                className="h-auto rounded-full bg-primary px-5 py-4 text-sm font-semibold text-primary-foreground md:hidden"
              >
                Fazer teste
              </Button>
            </div>
            <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-muted-foreground">
              <a href="#inicio" className="text-foreground">
                Inicio
              </a>
              <a href="#metodologia" className="hover:text-foreground">
                Metodologia
              </a>
              <a href="#faq" className="hover:text-foreground">
                FAQ
              </a>
              <Link to="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </nav>
            <Button
              onClick={handleStartQuiz}
              className="hidden h-auto rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground md:inline-flex"
            >
              Fazer teste gratuito
            </Button>
          </div>
        </header>

        <main className="pt-16">
          <section id="inicio" className="scroll-mt-24">
            <div className="container mx-auto grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Teste vocacional online
                </div>
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Teste vocacional gratis e completo: descubra sua carreira ideal em minutos.
                </h1>
                <p className="text-base text-muted-foreground sm:text-lg">
                  Um teste rapido, baseado em RIASEC + Inteligencias Multiplas, para revelar seu perfil profissional e indicar as carreiras mais compativeis com voce.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={handleStartQuiz}
                    className="h-auto rounded-full bg-primary px-8 py-6 text-base font-semibold text-primary-foreground"
                  >
                    Comecar teste gratis
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-auto rounded-full border-primary px-8 py-6 text-base font-semibold text-primary"
                  >
                    <a href="#como-funciona">Ver como funciona</a>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm">Resultado gratis imediato</span>
                  <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm">7 a 10 minutos</span>
                  <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm">Relatorio completo opcional</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle,_hsla(210,80%,60%,0.2),_transparent_70%)]" aria-hidden="true" />
                <Card className="relative rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_30px_70px_-50px_hsla(210,80%,50%,0.6)]">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      <span>Seu Perfil</span>
                      <span>Futuro Perfeito</span>
                    </div>
                    <div className="rounded-2xl bg-muted/40 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Compatibilidade</p>
                      <div className="mt-4 flex items-end gap-2">
                        {[10, 18, 28, 14, 22].map((h, idx) => (
                          <div
                            key={idx}
                            className="w-8 rounded-lg bg-primary/60"
                            style={{ height: `${h * 2}px` }}
                          />
                        ))}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                        <span className="rounded-full bg-white px-3 py-1 shadow-sm">Tecnologia</span>
                        <span className="rounded-full bg-white px-3 py-1 shadow-sm">Design</span>
                        <span className="rounded-full bg-white px-3 py-1 shadow-sm">Educacao</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-primary/20 bg-white p-3 text-xs text-muted-foreground">
                        <p className="font-semibold text-foreground">Perfil RIASEC</p>
                        <p className="mt-1">Social · Investigativo</p>
                      </div>
                      <div className="rounded-2xl border border-primary/20 bg-white p-3 text-xs text-muted-foreground">
                        <p className="font-semibold text-foreground">Inteligencias</p>
                        <p className="mt-1">Interpessoal · Linguistica</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
          <section id="como-funciona" className="py-16 bg-white/60 scroll-mt-24">
            <div className="container mx-auto space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold sm:text-3xl">Como funciona o teste vocacional</h2>
                <p className="text-muted-foreground">Tres passos simples para voce ter clareza.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  "Responda o teste em 7 a 10 minutos",
                  "Receba um resultado gratuito imediato",
                  "Se quiser, destrave o relatorio completo",
                ].map((text, index) => (
                  <Card key={text} className="p-6 border border-primary/20 bg-white/90">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="font-medium">{text}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="metodologia" className="py-16 scroll-mt-24">
            <div className="container mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold sm:text-3xl">Metodologia validada</h2>
                <p className="text-muted-foreground">
                  Unimos a teoria RIASEC (John Holland) com Inteligencias Multiplas (Howard Gardner) para mapear interesses, habilidades e estilo de trabalho.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    "RIASEC identifica seu estilo profissional dominante",
                    "Inteligencias Multiplas mostram como voce aprende e se destaca",
                    "Resultado gratuito + relatorio completo com plano de acao",
                    "Perguntas objetivas para reduzir vies",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-white/80 p-4">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/10 border border-primary/20">
                <h3 className="text-lg font-semibold">Resultado gratuito vs. completo</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Direcao inicial</span>
                    <span className="font-semibold text-primary">Gratis</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Top 3 clusters de carreira</span>
                    <span className="font-semibold text-primary">Gratis</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Plano de acao + comparativos</span>
                    <span className="font-semibold">Completo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Checklist e relatorio em PDF</span>
                    <span className="font-semibold">Completo</span>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section id="para-quem" className="py-16 bg-white/60">
            <div className="container mx-auto space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold sm:text-3xl">Para quem este teste vocacional e ideal?</h2>
                <p className="text-muted-foreground">Estudantes, profissionais em transicao e pessoas indecisas sobre carreira.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  "Escolhendo faculdade ou curso tecnico",
                  "Mudando de area ou replanejando carreira",
                  "Querendo entender seus pontos fortes",
                ].map((item) => (
                  <Card key={item} className="p-6 border border-primary/20 bg-white/90">
                    <p className="font-medium">{item}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="provas" className="py-16">
            <div className="container mx-auto space-y-8">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold sm:text-3xl">Depoimentos</h2>
                <p className="text-muted-foreground">Relatos reais de quem ganhou clareza de carreira.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    name: "Larissa A.",
                    quote: "Sempre fiquei em duvida entre psicologia e pedagogia. O teste me deu um caminho claro.",
                  },
                  {
                    name: "Bruno P.",
                    quote: "Descobri que meu perfil e mais analitico. Parei de buscar areas que nao combinavam comigo.",
                  },
                  {
                    name: "Joana R.",
                    quote: "Gostei porque o resultado gratuito ja trouxe clareza e o relatorio completo valeu o investimento.",
                  },
                ].map((item) => (
                  <Card key={item.name} className="p-6 border border-primary/20 bg-white/90">
                    <p className="text-sm text-muted-foreground">{item.quote}</p>
                    <p className="mt-4 text-sm font-semibold">{item.name}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="py-16 bg-white/60 scroll-mt-24">
            <div className="container mx-auto space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold sm:text-3xl">FAQ</h2>
                <p className="text-muted-foreground">Respostas diretas para duvidas comuns.</p>
              </div>
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <details key={item.question} className="rounded-2xl border border-primary/20 bg-white/90 p-5">
                    <summary className="cursor-pointer text-base font-semibold">{item.question}</summary>
                    <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="conteudo" className="py-16">
            <div className="container mx-auto space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold sm:text-3xl">Conteudo de apoio</h2>
                <p className="text-muted-foreground">Artigos para aprofundar sua decisao de carreira.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { label: "Como saber qual profissao escolher", slug: "como-saber-qual-profissao-escolher" },
                  { label: "Qual carreira seguir", slug: "qual-carreira-seguir" },
                  { label: "Teste vocacional para adultos", slug: "teste-vocacional-adulto" },
                  { label: "Como alinhar carreira com perfil e valores", slug: "como-alinhar-carreira-com-perfil-e-valores" },
                ].map((post) => (
                  <Card key={post.slug} className="p-5 border border-primary/20 bg-white/90">
                    <Link to={`/blog/${post.slug}`} className="font-medium hover:text-primary">
                      {post.label}
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="lgpd" className="py-16 bg-white/60">
            <div className="container mx-auto grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold sm:text-3xl">Transparencia e LGPD</h2>
                <p className="text-muted-foreground">
                  Seus dados sao usados apenas para gerar o relatorio. Nada de venda de informacoes ou spam.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-white/90 p-5">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <p className="text-sm text-muted-foreground">Se quiser, voce pode solicitar a exclusao a qualquer momento.</p>
              </div>
            </div>
          </section>

          <section id="cta" className="py-16">
            <div className="container mx-auto text-center">
              <Card className="p-10 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30">
                <div className="space-y-4 max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-semibold">
                    Pronto para descobrir sua carreira ideal?
                  </h2>
                  <p className="text-muted-foreground">
                    Faca o teste agora e receba sua direcao inicial gratuitamente.
                  </p>
                  <Button onClick={handleStartQuiz} className="rounded-full px-10 py-6 text-base font-semibold">
                    Comecar teste gratuito
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        </main>

        <footer className="border-t border-border bg-white py-10">
          <div className="container mx-auto px-4 grid gap-6 md:grid-cols-3 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground">Futuro Perfeito</p>
              <p className="mt-2">Clareza para escolher a carreira certa e agir com seguranca.</p>
            </div>
            <div>
              <p className="font-semibold text-foreground">Links</p>
              <div className="mt-2 space-y-2">
                <Link to="/blog" className="block hover:text-foreground">Blog</Link>
                <Link to="/privacy" className="block hover:text-foreground">Politica de Privacidade</Link>
                <Link to="/terms" className="block hover:text-foreground">Termos de Uso</Link>
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground">Contato</p>
              <p className="mt-2">WhatsApp: (91) 98423-3672</p>
              <a
                href="https://www.instagram.com/luccaserrao/"
                target="_blank"
                rel="noreferrer"
                className="block hover:text-foreground"
              >
                Instagram: @luccaserrao
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default TesteVocacional;

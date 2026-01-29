import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { allQuizQuestions, quizQuestionsV1, quizQuestionsV2 } from "@/data/quizQuestions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle2, Loader2, Lock, RefreshCcw, Shield } from "lucide-react";

type QuizAnswer = {
  id?: string;
  question?: string;
  answer?: string;
};

type QuizResponse = {
  id: string;
  name: string;
  email: string;
  whatsapp?: string | null;
  created_at: string;
  answers?: QuizAnswer[];
  raw_answers?: unknown;
  ai_recommendation?: Record<string, unknown> | null;
  clicked_upsell?: boolean | null;
  upsell_clicked_at: string | null;
  quiz_session_id?: string | null;
  source?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  referrer?: string | null;
  landing_path?: string | null;
  riasec_top1?: string | null;
  riasec_top2?: string | null;
  riasec?: Record<string, unknown> | null;
  quiz_version?: "v1" | "v2" | null;
  macro_area_result?: Record<string, unknown> | null;
  paid?: {
    paid: boolean;
    paid_at: string | null;
    amount: number | null;
    order_id: string | null;
  };
};

type QuizAnalytics = {
  period_days: number;
  totals: {
    starts: number;
    completions: number;
    completion_rate: number;
  };
  funnel?: {
    tracked_starts: number;
    tracked_completions: number;
    completion_rate: number;
    avg_completion_minutes: number;
    median_completion_minutes: number;
  };
  daily: Array<{
    date: string;
    starts: number;
    completions: number;
    completion_rate: number;
  }>;
  daily_tracked?: Array<{
    date: string;
    starts: number;
    completions: number;
    completion_rate: number;
  }>;
  sources: {
    starts: Array<{ source: string; count: number }>;
    completions: Array<{ source: string; count: number }>;
  };
  by_version?: Array<{
    version: string;
    starts: number;
    completions: number;
    completion_rate: number;
    avg_completion_minutes: number;
    median_completion_minutes: number;
  }>;
  conversion_by_source?: Array<{
    source: string;
    starts: number;
    completions: number;
    completion_rate: number;
  }>;
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("pt-BR");
};

const questionTextMap: Record<string, string> = allQuizQuestions.reduce((acc, q) => {
  acc[q.id] = q.question;
  return acc;
}, {} as Record<string, string>);

const textQuestionIds = new Set(
  allQuizQuestions.filter((q) => q.type === "text").map((q) => q.id)
);
const textQuestionTexts = new Set(
  allQuizQuestions
    .filter((q) => q.type === "text")
    .map((q) => q.question.trim().toLowerCase())
);

const getReferrerHost = (value?: string | null) => {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

const resolveResponseSource = (item: QuizResponse) => {
  const explicit = item.source || item.utm_source;
  if (explicit) return explicit;
  return getReferrerHost(item.referrer) || "direto";
};

const getTextAnswers = (answers: QuizAnswer[]) =>
  answers.filter((answer) => {
    const answerText = String(answer.answer || "").trim();
    if (!answerText) return false;
    const hasTextId = Boolean(answer.id && textQuestionIds.has(answer.id));
    if (hasTextId) return true;
    const questionText = String(answer.question || "").trim().toLowerCase();
    return questionText ? textQuestionTexts.has(questionText) : false;
  });

const getExpectedAnswerCount = (version?: "v1" | "v2" | null) => {
  if (version === "v2") return quizQuestionsV2.length;
  return quizQuestionsV1.length;
};

const formatPercent = (value: number) => {
  if (!Number.isFinite(value)) return "0%";
  return `${Math.round(value * 100)}%`;
};

const formatMinutes = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) return "—";
  if (value < 1) return "<1 min";
  if (value >= 60) return `${(value / 60).toFixed(1)} h`;
  return `${Math.round(value)} min`;
};

const AdminQuizResponses = () => {
  const [token, setToken] = useState("");
  const [inputToken, setInputToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [onlyWithAnswers, setOnlyWithAnswers] = useState(false);
  const [onlyRecent, setOnlyRecent] = useState(false); // Últimas 24h
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});
  const [analyticsDays, setAnalyticsDays] = useState(30);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("admin_quiz_token");
    if (stored) {
      setToken(stored);
      setInputToken(stored);
    }
  }, []);

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery<QuizResponse[], Error>({
    queryKey: ["quiz-responses", token],
    enabled: Boolean(token),
    queryFn: async () => {
      if (!token) return [];

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error("VITE_SUPABASE_URL não configurada");
      }

      const url = `${supabaseUrl}/functions/v1/list-quiz-responses?limit=200`;
      const response = await fetch(url, {
        headers: {
          "x-admin-token": token,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error("401: token invalido");
        }
        if (response.status >= 500) {
          const detail = body?.message || body?.error || body?.details || JSON.stringify(body) || "erro interno da função";
          throw new Error(`500: ${detail}`);
        }
        const message = body?.error || "Erro ao buscar respostas";
        throw new Error(message);
      }

      const payload = await response.json();
      const raw = (payload?.responses || []) as any[];

      return raw.map((item) => {
        const answersRaw = item.answers;
        let normalizedAnswers: QuizAnswer[] = [];

        if (Array.isArray(answersRaw)) {
          normalizedAnswers = answersRaw.map((a: any) => {
            const rawId = typeof a?.id === "string" ? a.id : typeof a?.question === "string" ? a.question : "";
            const normalizedId = typeof a?.id === "string" ? a.id : textQuestionIds.has(rawId) ? rawId : undefined;
            return {
              id: normalizedId,
              question: questionTextMap[rawId] || a?.question || "",
              answer: a?.answer ?? "",
            };
          });
        } else if (answersRaw && typeof answersRaw === "object") {
          normalizedAnswers = Object.entries(answersRaw).map(([key, value]) => ({
            id: key,
            question: questionTextMap[key] || String(key),
            answer: value != null ? String(value) : "",
          }));
        }

        return {
          id: item.id,
          name: item.name || "",
          email: item.email || "",
          whatsapp: item.whatsapp ?? null,
          created_at: item.created_at,
          answers: normalizedAnswers,
          raw_answers: answersRaw,
          ai_recommendation: item.ai_recommendation || null,
          clicked_upsell: item.clicked_upsell ?? null,
          upsell_clicked_at: item.upsell_clicked_at ?? null,
          quiz_session_id: item.quiz_session_id ?? null,
          source: item.source ?? null,
          utm_source: item.utm_source ?? null,
          utm_medium: item.utm_medium ?? null,
          utm_campaign: item.utm_campaign ?? null,
          utm_content: item.utm_content ?? null,
          utm_term: item.utm_term ?? null,
          referrer: item.referrer ?? null,
          landing_path: item.landing_path ?? null,
          riasec_top1: item.riasec_top1 || item.riasec?.top1 || null,
          riasec_top2: item.riasec_top2 || item.riasec?.top2 || null,
          riasec: item.riasec || item.ai_recommendation || null,
          quiz_version: item.quiz_version || null,
          macro_area_result: item.macro_area_result || null,
          paid: item.paid || { paid: false, paid_at: null, amount: null, order_id: null },
        };
      });
    },
  });

  const {
    data: analytics,
    isFetching: isFetchingAnalytics,
    error: analyticsError,
    refetch: refetchAnalytics,
  } = useQuery<QuizAnalytics, Error>({
    queryKey: ["quiz-analytics", token, analyticsDays],
    enabled: Boolean(token),
    queryFn: async () => {
      if (!token) {
        return {
          period_days: analyticsDays,
          totals: { starts: 0, completions: 0, completion_rate: 0 },
          daily: [],
          sources: { starts: [], completions: [] },
        };
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error("VITE_SUPABASE_URL nao configurada");
      }

      const url = `${supabaseUrl}/functions/v1/get-quiz-analytics?days=${analyticsDays}`;
      const response = await fetch(url, {
        headers: {
          "x-admin-token": token,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const message = body?.error || "Erro ao buscar analytics";
        throw new Error(message);
      }

      return response.json();
    },
  });

  const isRefreshing = isFetching || isFetchingAnalytics;

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputToken.trim();
    if (!trimmed) return;
    setToken(trimmed);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("admin_quiz_token", trimmed);
    }
  };

  const handleLogout = () => {
    setToken("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("admin_quiz_token");
    }
  };

  const stats = useMemo(() => {
    const items = data || [];
    const total = items.length;
    const upsells = items.filter((item) => item.clicked_upsell).length;
    const riasecCounts = items.reduce<Record<string, number>>((acc, item) => {
      const top1 = item.riasec_top1 || "";
      if (top1) acc[top1] = (acc[top1] || 0) + 1;
      return acc;
    }, {});

    const topProfiles = Object.entries(riasecCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return { total, upsells, topProfiles };
  }, [data]);

  const analyticsSummary = useMemo(() => {
    if (!analytics) {
      return {
        starts: 0,
        completions: 0,
        completionRate: 0,
        trackedStarts: 0,
        trackedCompletions: 0,
        trackedCompletionRate: 0,
        avgCompletionMinutes: 0,
        medianCompletionMinutes: 0,
        daily: [],
        dailyTracked: [],
        sources: { starts: [], completions: [] },
        byVersion: [],
        conversionBySource: [],
      };
    }
    const completionRate =
      analytics.totals?.completion_rate ??
      (analytics.totals?.starts ? analytics.totals.completions / analytics.totals.starts : 0);
    const daily = analytics.daily || [];
    const dailyTracked = analytics.daily_tracked || [];
    const funnel = analytics.funnel;
    return {
      starts: analytics.totals?.starts || 0,
      completions: analytics.totals?.completions || 0,
      completionRate,
      trackedStarts: funnel?.tracked_starts || 0,
      trackedCompletions: funnel?.tracked_completions || 0,
      trackedCompletionRate: funnel?.completion_rate || 0,
      avgCompletionMinutes: funnel?.avg_completion_minutes || 0,
      medianCompletionMinutes: funnel?.median_completion_minutes || 0,
      daily,
      dailyTracked,
      sources: analytics.sources || { starts: [], completions: [] },
      byVersion: analytics.by_version || [],
      conversionBySource: analytics.conversion_by_source || [],
    };
  }, [analytics]);

  const recentDailyRows = useMemo(() => {
    const rows = analyticsSummary.dailyTracked.length ? analyticsSummary.dailyTracked : analyticsSummary.daily;
    if (rows.length <= 10) return [...rows].reverse();
    return rows.slice(-10).reverse();
  }, [analyticsSummary]);
  const usingTrackedDaily = analyticsSummary.dailyTracked.length > 0;

  const primaryStarts = analyticsSummary.trackedStarts || analyticsSummary.starts;
  const primaryCompletions = analyticsSummary.trackedCompletions || analyticsSummary.completions;
  const primaryRate = analyticsSummary.trackedStarts
    ? analyticsSummary.trackedCompletionRate
    : analyticsSummary.completionRate;
  const primaryLabel = analyticsSummary.trackedStarts ? "rastreados" : "totais";

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const now = new Date().getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    return (data || []).filter((item) => {
      const matchesTerm =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term);

      const hasAnswers = (item.answers || []).length > 0;
      const matchesAnswers = !onlyWithAnswers || hasAnswers;

      const createdAtMs = new Date(item.created_at).getTime();
      const matchesRecent = !onlyRecent || (now - createdAtMs <= oneDayMs);

      return matchesTerm && matchesAnswers && matchesRecent;
    });
  }, [data, searchTerm, onlyWithAnswers, onlyRecent]);

  const completedData = useMemo(() => {
    const items = filteredData || [];
    return items.filter((item) => {
      const expected = getExpectedAnswerCount(item.quiz_version || "v1");
      const count = (item.answers || []).length;
      return count >= expected;
    });
  }, [filteredData]);

  const handleCopyEmail = (email: string) => {
    if (!email) return;
    navigator.clipboard?.writeText(email).catch(() => {});
  };

  const handleCopyAnswers = (item: QuizResponse) => {
    const payload = {
      id: item.id,
      name: item.name,
      email: item.email,
      created_at: item.created_at,
      quiz_session_id: item.quiz_session_id || null,
      source: item.source || null,
      utm_source: item.utm_source || null,
      utm_medium: item.utm_medium || null,
      utm_campaign: item.utm_campaign || null,
      utm_content: item.utm_content || null,
      utm_term: item.utm_term || null,
      referrer: item.referrer || null,
      landing_path: item.landing_path || null,
      answers: item.answers && item.answers.length ? item.answers : item.raw_answers || [],
      raw_answers: item.raw_answers || [],
      riasec: item.riasec || item.ai_recommendation || null,
      quiz_version: item.quiz_version || null,
      macro_area_result: item.macro_area_result || null,
    };
    navigator.clipboard?.writeText(JSON.stringify(payload, null, 2)).catch(() => {});
  };

  const handleCopyPdfData = () => {
    if (!filteredData.length) return;
    const blocks = filteredData.map((item, idx) => {
      const answers = item.answers || [];
      const textAnswers = getTextAnswers(answers);
      const quizVersion = item.quiz_version ? item.quiz_version.toUpperCase() : "N/A";
      const sourceLabel = resolveResponseSource(item);
      const riasecTop = item.riasec_top1 || item.riasec_top2;
      const riasecSecondary = item.riasec_top2 || item.riasec_top1;
      const macroArea = item.macro_area_result as any;
      const macroPrincipal = macroArea?.areaPrincipal || "";
      const macroPossivel = macroArea?.areaPossivel || "";
      const macroEvitar = macroArea?.areaEvitar || "";

      const lines = [
        `#${idx + 1} - ${item.name || "Sem nome"}`,
        `Email: ${item.email || "—"}`,
        item.whatsapp ? `WhatsApp: ${item.whatsapp}` : null,
        `Data: ${formatDate(item.created_at)}`,
        `Versao do quiz: ${quizVersion}`,
        sourceLabel ? `Origem: ${sourceLabel}` : null,
        item.utm_campaign ? `Campanha: ${item.utm_campaign}` : null,
        item.quiz_version === "v2"
          ? `Macroarea: Principal ${macroPrincipal || "N/A"} | Possivel ${macroPossivel || "N/A"} | Evitar ${macroEvitar || "N/A"}`
          : `Perfil RIASEC: ${riasecTop || "N/A"}${riasecSecondary ? ` / ${riasecSecondary}` : ""}`,
        "",
        "Respostas escritas:",
        textAnswers.length
          ? textAnswers.map((answer) => `- ${answer.question || "Pergunta"}: ${answer.answer || "Sem resposta"}`).join("\n")
          : "- (nenhuma resposta escrita)",
      ].filter(Boolean);

      return lines.join("\n");
    });

    const payload = blocks.join("\n\n------------------------\n\n");
    navigator.clipboard?.writeText(payload).catch(() => {});
  };

  const toggleAnswersVisibility = (id: string) => {
    setExpandedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const handleExportCsv = () => {
    const rows = filteredData.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      created_at: item.created_at,
      answers_count: item.answers?.length || 0,
      riasec_top1: item.riasec_top1 || "",
      riasec_top2: item.riasec_top2 || "",
      quiz_version: item.quiz_version || "",
      macro_area_principal: (item.macro_area_result as any)?.areaPrincipal || "",
      macro_area_possivel: (item.macro_area_result as any)?.areaPossivel || "",
      macro_area_evitar: (item.macro_area_result as any)?.areaEvitar || "",
      source: item.source || "",
      utm_source: item.utm_source || "",
      utm_medium: item.utm_medium || "",
      utm_campaign: item.utm_campaign || "",
      utm_content: item.utm_content || "",
      utm_term: item.utm_term || "",
      referrer: item.referrer || "",
      landing_path: item.landing_path || "",
      quiz_session_id: item.quiz_session_id || "",
      clicked_upsell: item.clicked_upsell ? "yes" : "no",
    }));

    const header = Object.keys(rows[0] || {
      id: "",
      name: "",
      email: "",
      created_at: "",
      answers_count: "",
      riasec_top1: "",
      riasec_top2: "",
      quiz_version: "",
      macro_area_principal: "",
      macro_area_possivel: "",
      macro_area_evitar: "",
      source: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      referrer: "",
      landing_path: "",
      quiz_session_id: "",
      clicked_upsell: "",
    });

    const csv = [
      header.join(","),
      ...rows.map((row) =>
        header
          .map((key) => {
            const value = (row as any)[key] ?? "";
            const needsQuote = typeof value === "string" && /[",\n]/.test(value);
            const safe = String(value).replace(/"/g, '""');
            return needsQuote ? `"${safe}"` : safe;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quiz_responses.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderTokenGate = () => (
    <Card className="max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Acesso restrito</p>
          <h1 className="text-xl font-bold">Digite o token secreto</h1>
        </div>
      </div>
      <form onSubmit={handleSaveToken} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="token">Token</Label>
          <Input
            id="token"
            type="password"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            placeholder="Cole o token definido no backend"
          />
        </div>
        <Button type="submit" className="w-full">
          Desbloquear
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Usamos apenas este token para validar que você é o dono. Nenhum dado sensível é gravado no navegador.
        </p>
      </form>
    </Card>
  );

  if (!token) {
    return (
      <div className="min-h-screen bg-muted/20 py-12 px-4">
        {renderTokenGate()}
      </div>
    );
  }

  const unauthorized =
    error?.message?.startsWith("401") ||
    error?.message?.toLowerCase().includes("não autorizado") ||
    error?.message?.toLowerCase().includes("não autorizado") ||
    error?.message?.toLowerCase().includes("token");
  const serverError = error?.message?.startsWith("500");

  return (
      <div className="min-h-screen bg-muted/20 py-10 px-4">
        <div className="container mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Painel privado</p>
              <h1 className="text-2xl font-bold">Respostas do quiz</h1>
              <p className="text-sm text-muted-foreground">
                Apenas quem tem o token secreto consegue carregar estes dados.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleLogout}>
                Trocar token
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  refetch();
                  refetchAnalytics();
                }}
                disabled={isRefreshing}
              >
                {isRefreshing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCcw className="w-4 h-4 mr-2" />}
                Atualizar
              </Button>
              <Button variant="outline" onClick={handleCopyPdfData} disabled={!filteredData.length}>
                Copiar dados (PDF)
              </Button>
              <Button variant="outline" onClick={handleExportCsv} disabled={!filteredData.length}>
                Exportar CSV
              </Button>
            </div>
          </div>

        <Card className="p-4 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <Input
                id="search"
                placeholder="Filtre por nome, email ou ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:w-56 space-y-2">
              <Label>Filtros</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={onlyWithAnswers ? "default" : "outline"}
                  onClick={() => setOnlyWithAnswers((v) => !v)}
                  className="text-sm"
                >
                  {onlyWithAnswers ? "Com respostas" : "Todas"}
                </Button>
                <Button
                  type="button"
                  variant={onlyRecent ? "default" : "outline"}
                  onClick={() => setOnlyRecent((v) => !v)}
                  className="text-sm"
                >
                  Últimas 24h
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {unauthorized && (
          <Card className="border-destructive/40 bg-destructive/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <p className="font-semibold">Token inválido</p>
                <p className="text-sm text-muted-foreground">
                  Confirme o token ADMIN_DASHBOARD_TOKEN configurado na API e cole novamente.
                </p>
              </div>
            </div>
          </Card>
        )}

        {serverError && (
          <Card className="border-orange-300/60 bg-orange-100/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-semibold">Erro interno</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {error?.message || "A Edge Function retornou 500. Confira os logs no Supabase."}
                </p>
              </div>
            </div>
          </Card>
        )}

        {analyticsError && (
          <Card className="border-orange-300/60 bg-orange-100/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-semibold">Erro ao carregar analytics</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {analyticsError.message}
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Fluxo do quiz</p>
              <p className="text-xs text-muted-foreground">Ultimos {analytics?.period_days ?? analyticsDays} dias</p>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="analytics-days">Periodo (dias)</Label>
              <Input
                id="analytics-days"
                type="number"
                min={1}
                max={365}
                value={analyticsDays}
                onChange={(e) => {
                  const next = Number(e.target.value || 1);
                  setAnalyticsDays(Math.min(365, Math.max(1, next)));
                }}
                className="w-24"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Inicios do quiz</p>
              <p className="text-2xl font-bold">{primaryStarts}</p>
              <p className="text-xs text-muted-foreground">Base: {primaryLabel}</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Finalizacoes</p>
              <p className="text-2xl font-bold">{primaryCompletions}</p>
              <p className="text-xs text-muted-foreground">Base: {primaryLabel}</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Taxa de conclusao</p>
              <p className="text-2xl font-bold">{formatPercent(primaryRate)}</p>
              <p className="text-xs text-muted-foreground">Base: {primaryLabel}</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Tempo medio p/ concluir</p>
              <p className="text-2xl font-bold">{formatMinutes(analyticsSummary.avgCompletionMinutes)}</p>
              <p className="text-xs text-muted-foreground">Base: sessoes rastreadas</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Inicios rastreados</p>
              <p className="text-2xl font-bold">{analyticsSummary.trackedStarts}</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Finalizacoes rastreadas</p>
              <p className="text-2xl font-bold">{analyticsSummary.trackedCompletions}</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Taxa rastreada</p>
              <p className="text-2xl font-bold">{formatPercent(analyticsSummary.trackedCompletionRate)}</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Mediana p/ concluir</p>
              <p className="text-2xl font-bold">{formatMinutes(analyticsSummary.medianCompletionMinutes)}</p>
              <p className="text-xs text-muted-foreground">Base: sessoes rastreadas</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">
                Por dia ({usingTrackedDaily ? "rastreados" : "totais"} - ultimos 10 dias com dados)
              </p>
              {recentDailyRows.length === 0 ? (
                <p className="text-sm text-muted-foreground">Sem dados no periodo.</p>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-4 text-xs text-muted-foreground">
                    <span>Data</span>
                    <span>Inicios</span>
                    <span>Finalizacoes</span>
                    <span>Taxa</span>
                  </div>
                  {recentDailyRows.map((row) => (
                    <div key={row.date} className="grid grid-cols-4">
                      <span>{row.date}</span>
                      <span>{row.starts}</span>
                      <span>{row.completions}</span>
                      <span>{formatPercent(row.completion_rate)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold">Origens (inicios)</p>
                <div className="flex flex-wrap gap-2">
                  {analyticsSummary.sources.starts.length === 0 && (
                    <span className="text-sm text-muted-foreground">N/A</span>
                  )}
                  {analyticsSummary.sources.starts.map((source) => (
                    <Badge key={`start-${source.source}`} variant="outline">
                      {source.source} ({source.count})
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Origens (finalizacoes)</p>
                <div className="flex flex-wrap gap-2">
                  {analyticsSummary.sources.completions.length === 0 && (
                    <span className="text-sm text-muted-foreground">N/A</span>
                  )}
                  {analyticsSummary.sources.completions.map((source) => (
                    <Badge key={`complete-${source.source}`} variant="outline">
                      {source.source} ({source.count})
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Conversao por origem (rastreados)</p>
                <div className="flex flex-wrap gap-2">
                  {analyticsSummary.conversionBySource.length === 0 && (
                    <span className="text-sm text-muted-foreground">N/A</span>
                  )}
                  {analyticsSummary.conversionBySource.map((row) => (
                    <Badge key={`source-conv-${row.source}`} variant="outline">
                      {row.source} {row.completions}/{row.starts} ({formatPercent(row.completion_rate)})
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Conversao por versao (rastreados)</p>
                <div className="flex flex-wrap gap-2">
                  {analyticsSummary.byVersion.length === 0 && (
                    <span className="text-sm text-muted-foreground">N/A</span>
                  )}
                  {analyticsSummary.byVersion.map((row) => (
                    <Badge key={`version-${row.version}`} variant="outline">
                      {row.version.toUpperCase()} {row.completions}/{row.starts} ({formatPercent(row.completion_rate)})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Total de respostas</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Cliques em upsell</p>
              <p className="text-2xl font-bold">{stats.upsells}</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Perfis mais comuns</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {stats.topProfiles.length === 0 && (
                  <span className="text-sm text-muted-foreground">N/A</span>
                )}
                {stats.topProfiles.map(([label, count]) => (
                  <Badge key={label} variant="outline">
                    {label} ({count})
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Concluíram o quiz</p>
              <p className="text-xs text-muted-foreground">Baseado no total de perguntas por versão</p>
            </div>
            <Badge variant="outline">Total: {completedData.length}</Badge>
          </div>
          {completedData.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma resposta completa no período filtrado.</p>
          ) : (
            <div className="space-y-3">
              {completedData.map((item) => {
                const quizVersion = item.quiz_version || "v1";
                const answers = item.answers || [];
                const textAnswers = getTextAnswers(answers);
                const riasecTop = item.riasec_top1 || item.riasec_top2;
                const riasecSecondary = item.riasec_top2 || item.riasec_top1;
                const macroArea = item.macro_area_result as any;
                const macroPrincipal = macroArea?.areaPrincipal || "";
                const macroPossivel = macroArea?.areaPossivel || "";
                const macroEvitar = macroArea?.areaEvitar || "";
                const sourceLabel = resolveResponseSource(item);
                const referrerHost = getReferrerHost(item.referrer);

                return (
                  <Card key={`completed-${item.id}`} className="border border-border/70">
                    <div className="p-4 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{item.name || "Sem nome"}</p>
                        <Badge variant="secondary" className="text-xs">{item.email}</Badge>
                        <Badge variant="outline" className="text-xs">Quiz {quizVersion.toUpperCase()}</Badge>
                        <Button size="sm" variant="outline" onClick={() => handleCopyAnswers(item)}>
                          Copiar dados
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground flex flex-wrap gap-4">
                        <span>Recebido em {formatDate(item.created_at)}</span>
                        {sourceLabel && <span>Origem: {sourceLabel}</span>}
                        {item.utm_campaign && <span>Campanha: {item.utm_campaign}</span>}
                        {referrerHost && <span>Referrer: {referrerHost}</span>}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {quizVersion === "v2" ? (
                          <span>
                            Macroárea: Principal {macroPrincipal || "N/A"} | Possível {macroPossivel || "N/A"} | Evitar {macroEvitar || "N/A"}
                          </span>
                        ) : (
                          <span>
                            Perfil RIASEC: {riasecTop || "N/A"}
                            {riasecSecondary ? ` / ${riasecSecondary}` : ""}
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold">Respostas escritas</p>
                        {textAnswers.length === 0 ? (
                          <p className="text-sm text-muted-foreground">Sem respostas escritas.</p>
                        ) : (
                          <div className="grid gap-2">
                            {textAnswers.map((answer, idx) => (
                              <div key={`${item.id}-completed-text-${idx}`} className="text-sm">
                                <span className="font-medium">{answer.question || "Pergunta"}:</span>{" "}
                                <span className="text-muted-foreground">{answer.answer || "Sem resposta"}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Card>

        {isLoading && (
          <Card className="p-8 text-center space-y-3">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">Carregando respostas...</p>
          </Card>
        )}

        {!isLoading && !data?.length && !error && (
          <Card className="p-6 text-center space-y-2">
            <Shield className="w-6 h-6 mx-auto text-muted-foreground" />
            <p className="font-semibold">Nenhuma resposta encontrada</p>
            <p className="text-sm text-muted-foreground">Quando alguem concluir o quiz, os dados aparecem aqui.</p>
          </Card>
        )}

        {filteredData.length ? (
          <div className="space-y-4">
            {filteredData.map((item) => {
              const paid = item.paid?.paid;
              const paidAmount =
                item.paid?.amount && Number.isFinite(item.paid.amount / 100)
                  ? (item.paid.amount / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                  : null;
              const quizVersion = item.quiz_version || "v1";
              const macroArea = item.macro_area_result as any;
              const macroPrincipal = macroArea?.areaPrincipal || "";
              const macroPossivel = macroArea?.areaPossivel || "";
              const macroEvitar = macroArea?.areaEvitar || "";
              const riasecTop = item.riasec_top1 || item.riasec_top2;
              const riasecSecondary = item.riasec_top2 || item.riasec_top1;
              const riasecScores = (item.riasec as any)?.scores || {};
              const riasecDesc = (item.riasec as any)?.descricao_personalizada || "";
              const riasecHabs = (item.riasec as any)?.habilidades || [];
              const answers = item.answers || [];
              const textAnswers = getTextAnswers(answers);
              const isExpanded = expandedAnswers[item.id];
              const answersToShow = isExpanded ? answers : answers.slice(0, 5);
              const hiddenCount = Math.max(0, answers.length - answersToShow.length);
              const sourceLabel = resolveResponseSource(item);
              const referrerHost = getReferrerHost(item.referrer);

              return (
                <Card key={item.id} className="overflow-hidden border-border/70 shadow-sm">
                  <div className="p-6 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-semibold text-foreground">{item.name || "Sem nome"}</h3>
                          <Badge variant="secondary" className="text-xs">{item.email}</Badge>
                          <Badge variant="outline" className="text-xs">Quiz {quizVersion.toUpperCase()}</Badge>
                          {item.whatsapp && <Badge variant="outline">WhatsApp: {item.whatsapp}</Badge>}
                          {paid ? (
                            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Pago {paidAmount ? `- ${paidAmount}` : ""}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-amber-600 border-amber-300">
                              Aguardando pagamento
                            </Badge>
                          )}
                          {item.clicked_upsell && (
                            <Badge className="bg-blue-600 text-white">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Clicou no upsell
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground flex flex-wrap gap-4">
                          <span>Recebido em {formatDate(item.created_at)}</span>
                          <span>ID: {item.id}</span>
                          {item.paid?.paid_at && <span>Pago em {formatDate(item.paid.paid_at)}</span>}
                          {sourceLabel && <span>Origem: {sourceLabel}</span>}
                          {item.utm_campaign && <span>Campanha: {item.utm_campaign}</span>}
                          {referrerHost && <span>Referrer: {referrerHost}</span>}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleCopyEmail(item.email)}>
                            Copiar email
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleCopyAnswers(item)}>
                            Copiar dados
                          </Button>
                        </div>
                      </div>

                      <div className="w-full md:w-96">
                        <Card className="p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5 border border-primary/20 space-y-3">
                          {quizVersion === "v2" ? (
                            <div className="space-y-3">
                              <p className="text-xs uppercase text-primary font-semibold">Resultado macroárea</p>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">Principal</span>
                                  <Badge className="bg-primary text-white">{macroPrincipal || "N/A"}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">Possível</span>
                                  <Badge variant="outline" className="border-primary text-primary">{macroPossivel || "N/A"}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">Evitar</span>
                                  <Badge variant="outline" className="border-destructive text-destructive">{macroEvitar || "N/A"}</Badge>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Resultado resumido do quiz v2 (macroáreas).
                              </p>
                            </div>
                          ) : (
                            <>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs uppercase text-primary font-semibold">Perfil RIASEC</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {riasecTop && <Badge className="bg-primary text-white">{riasecTop}</Badge>}
                                {riasecSecondary && (
                                  <Badge variant="outline" className="border-primary text-primary">
                                    {riasecSecondary}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            {item.clicked_upsell && (
                              <Badge className="bg-blue-600 text-white">Clicou upsell</Badge>
                            )}
                          </div>
                          <div className="space-y-2">
                            {Object.entries(riasecScores).map(([label, score]) => (
                              <div key={label} className="space-y-1">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>{label}</span>
                                  <span>{score as number}%</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                  <div
                                    className="h-full bg-primary"
                                    style={{ width: `${Math.min(100, Number(score) || 0)}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {riasecDesc
                              ? String(riasecDesc).slice(0, 220) + (String(riasecDesc).length > 220 ? "..." : "")
                              : "Resumo de personalidade baseado nas respostas do usuário."}
                          </p>
                          {riasecHabs?.length ? (
                            <div className="flex flex-wrap gap-2">
                              {riasecHabs.slice(0, 5).map((hab: any, idx: number) => (
                                <Badge key={`${item.id}-hab-${idx}`} variant="outline" className="text-xs">
                                  {String(hab)}
                                </Badge>
                              ))}
                            </div>
                          ) : null}
                            </>
                          )}
                        </Card>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <p className="font-semibold text-sm text-foreground">Respostas escritas ({textAnswers.length})</p>
                      {textAnswers.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Sem respostas escritas.</p>
                      ) : (
                        <div className="grid gap-3">
                          {textAnswers.map((answer, index) => (
                            <Card key={`${item.id}-text-${index}`} className="border border-border/80 bg-card/60">
                              <div className="p-4 space-y-2">
                                <div className="flex items-start justify-between gap-3">
                                  <p className="text-sm font-semibold text-foreground">
                                    {answer.question || "Pergunta"}
                                  </p>
                                  <Badge variant="outline" className="text-xs">Texto</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {answer.answer || "Sem resposta"}
                                </p>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm text-foreground">Respostas ({answers.length})</p>
                        {answers.length > 5 && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleAnswersVisibility(item.id)}
                            className="h-8 px-2 text-xs"
                          >
                            {isExpanded ? "Ver menos" : `Ver todas (${answers.length})`}
                          </Button>
                        )}
                      </div>
                      {answers.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Sem respostas registradas.</p>
                      ) : (
                        <ScrollArea className={isExpanded ? "max-h-[520px]" : "max-h-[320px]"}>
                          <div className="grid gap-3 pr-1">
                            {answersToShow.map((answer, index) => (
                              <Card key={`${item.id}-${index}`} className="border border-border/80 bg-card/60">
                                <div className="p-4 space-y-2">
                                  <div className="flex items-start justify-between gap-3">
                                    <p className="text-sm font-semibold text-foreground">
                                      Q{index + 1}: {answer.question || "Pergunta"}
                                    </p>
                                    <Badge variant="outline" className="text-xs">Resposta do usuário</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {answer.answer || "Sem resposta"}
                                  </p>
                                </div>
                              </Card>
                            ))}
                            {!isExpanded && hiddenCount > 0 && (
                              <p className="text-xs text-muted-foreground pb-2">
                                +{hiddenCount} respostas ocultas. Clique em "Ver todas".
                              </p>
                            )}
                          </div>
                        </ScrollArea>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminQuizResponses;



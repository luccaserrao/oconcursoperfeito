import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  ai_recommendation?: Record<string, unknown> | null;
  clicked_upsell?: boolean | null;
  upsell_clicked_at?: string | null;
  riasec_top1?: string | null;
  riasec_top2?: string | null;
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("pt-BR");
};

const AdminQuizResponses = () => {
  const [token, setToken] = useState("");
  const [inputToken, setInputToken] = useState("");

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
        throw new Error("VITE_SUPABASE_URL nao configurada");
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
          const detail = body?.error || JSON.stringify(body) || "erro interno da funcao";
          throw new Error(`500: ${detail}`);
        }
        const message = body?.error || "Erro ao buscar respostas";
        throw new Error(message);
      }

      const payload = await response.json();
      return (payload?.responses || []) as QuizResponse[];
    },
  });

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
    error?.message?.toLowerCase().includes("nao autorizado") ||
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
            <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCcw className="w-4 h-4 mr-2" />}
              Atualizar
            </Button>
          </div>
        </div>

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

        {data?.length ? (
          <div className="space-y-4">
            {data.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="p-6 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold">{item.name || "Sem nome"}</h3>
                        <Badge variant="secondary">{item.email}</Badge>
                        {item.whatsapp && <Badge variant="outline">WhatsApp: {item.whatsapp}</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Recebido em {formatDate(item.created_at)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.riasec_top1 && <Badge>{item.riasec_top1}</Badge>}
                        {item.riasec_top2 && <Badge variant="outline">{item.riasec_top2}</Badge>}
                        {item.clicked_upsell && (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Clicou no upsell
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                      <p>ID: {item.id}</p>
                      {item.upsell_clicked_at && (
                        <p>Upsell em {formatDate(item.upsell_clicked_at)}</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <Accordion type="single" collapsible>
                    <AccordionItem value="answers">
                      <AccordionTrigger>Respostas ({item.answers?.length || 0})</AccordionTrigger>
                      <AccordionContent>
                        <ScrollArea className="max-h-96 pr-4">
                          <div className="space-y-3">
                            {(item.answers || []).map((answer, index) => (
                              <div key={`${item.id}-${index}`} className="rounded-lg border p-3 bg-muted/30">
                                <p className="text-sm font-semibold mb-1">
                                  Q{index + 1}: {answer.question || "Pergunta"}
                                </p>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {answer.answer || "Sem resposta"}
                                </p>
                              </div>
                            ))}
                            {(!item.answers || item.answers.length === 0) && (
                              <p className="text-sm text-muted-foreground">Sem respostas registradas.</p>
                            )}
                          </div>
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminQuizResponses;




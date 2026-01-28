import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle2, Copy, Loader2, Lock, RefreshCcw } from "lucide-react";

type Order = {
  id: string;
  user_name: string;
  user_email: string;
  amount: number;
  payment_status: string;
  created_at: string;
  paid_at: string | null;
  product_id?: string | null;
  quiz_response_id?: string | null;
  mp_preference_id?: string | null;
  mercado_pago_payment_id?: string | null;
  stripe_session_id?: string | null;
  updated_at: string | null;
};

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("pt-BR");
};

const formatCurrency = (value?: number) => {
  if (!Number.isFinite(value || 0)) return "—";
  const amount = (value as number) / 100;
  return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const AdminClients = () => {
  const [token, setToken] = useState("");
  const [inputToken, setInputToken] = useState("");
  const [search, setSearch] = useState("");
  const [onlyPaid, setOnlyPaid] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored =
      window.localStorage.getItem("admin_clients_token") ||
      window.localStorage.getItem("admin_quiz_token");
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
  } = useQuery<{ orders: Order[] }, Error>({
    queryKey: ["clients", token],
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await fetch("/api/listClients", {
        headers: {
          "x-admin-token": token,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const message = body?.error || body?.details || body?.message || "Erro ao buscar clientes";
        throw new Error(`${response.status}: ${message}`);
      }

      return response.json();
    },
  });

  const orders = data?.orders || [];

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matches =
        !term ||
        o.user_name?.toLowerCase().includes(term) ||
        o.user_email?.toLowerCase().includes(term) ||
        o.id?.toLowerCase().includes(term);
      const paidOk = !onlyPaid || o.payment_status?.toLowerCase() === "paid";
      return matches && paidOk;
    });
  }, [orders, search, onlyPaid]);

  const stats = useMemo(() => {
    const total = orders.length;
    const paid = orders.filter((o) => (o.payment_status || "").toLowerCase() === "paid");
    const revenueCents = paid.reduce((acc, o) => acc + (o.amount || 0), 0);
    const pending = orders.filter((o) => (o.payment_status || "").toLowerCase() !== "paid");
    return { total, paid: paid.length, pending: pending.length, revenueCents };
  }, [orders]);

  const saveToken = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputToken.trim();
    if (!trimmed) return;
    setToken(trimmed);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("admin_clients_token", trimmed);
    }
  };

  const logout = () => {
    setToken("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("admin_clients_token");
    }
  };

  const copy = (value?: string | null) => {
    if (!value) return;
    navigator.clipboard?.writeText(value).catch(() => {});
  };

  const exportCsv = () => {
    if (!filtered.length) return;
    const header = [
      "id",
      "user_name",
      "user_email",
      "amount_cents",
      "payment_status",
      "created_at",
      "paid_at",
      "product_id",
      "quiz_response_id",
      "mp_preference_id",
      "mercado_pago_payment_id",
      "stripe_session_id",
    ];
    const csv = [
      header.join(","),
      ...filtered.map((row) =>
        header
          .map((key) => {
            const value = (row as any)[key] ?? "";
            const safe = String(value).replace(/"/g, '""');
            return /[",\n]/.test(safe) ? `"${safe}"` : safe;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "clientes.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const unauthorized = error?.message?.startsWith("401");
  const serverError = error && !unauthorized;

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
      <form onSubmit={saveToken} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="token">Token</Label>
          <Input
            id="token"
            type="password"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            placeholder="Cole o token ADMIN_DASHBOARD_TOKEN"
          />
        </div>
        <Button type="submit" className="w-full">
          Desbloquear
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Usamos apenas este token para validar que você é o dono.
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

  return (
    <div className="min-h-screen bg-muted/20 py-10 px-4">
      <div className="container mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Painel privado</p>
            <h1 className="text-2xl font-bold">Clientes / Pedidos</h1>
            <p className="text-sm text-muted-foreground">
              Lista pedidos gravados no Supabase (service role).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={logout}>
              Trocar token
            </Button>
            <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCcw className="w-4 h-4 mr-2" />}
              Atualizar
            </Button>
            <Button variant="outline" onClick={exportCsv} disabled={!filtered.length}>
              Exportar CSV
            </Button>
          </div>
        </div>

        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Total pedidos</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Pagos</p>
              <p className="text-2xl font-bold">{stats.paid}</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/40">
              <p className="text-sm text-muted-foreground">Receita (R$)</p>
              <p className="text-2xl font-bold">{formatCurrency(stats.revenueCents)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Buscar</Label>
              <Input
                id="search"
                placeholder="Filtre por nome, email ou ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:w-56 space-y-2">
              <Label>Filtros</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={onlyPaid ? "default" : "outline"}
                  onClick={() => setOnlyPaid((v) => !v)}
                  className="text-sm"
                >
                  {onlyPaid ? "Somente pagos" : "Todos"}
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
                <p className="font-semibold">Token invalido</p>
                <p className="text-sm text-muted-foreground">
                  Confirme o ADMIN_DASHBOARD_TOKEN configurado na API e cole novamente.
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
                  {error?.message}
                </p>
              </div>
            </div>
          </Card>
        )}

        {isLoading && (
          <Card className="p-8 text-center space-y-3">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">Carregando clientes...</p>
          </Card>
        )}

        {!isLoading && !filtered.length && !error && (
          <Card className="p-6 text-center space-y-2">
            <Lock className="w-6 h-6 mx-auto text-muted-foreground" />
            <p className="font-semibold">Nenhum pedido encontrado</p>
            <p className="text-sm text-muted-foreground">Quando houver vendas elas aparecem aqui.</p>
          </Card>
        )}

        {filtered.length ? (
          <div className="space-y-4">
            {filtered.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="p-6 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold">{item.user_name || "Sem nome"}</h3>
                        <Badge variant="secondary">{item.user_email}</Badge>
                        <Badge variant="outline">{formatCurrency(item.amount)}</Badge>
                        {item.payment_status?.toLowerCase() === "paid" ? (
                          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Pago
                          </Badge>
                        ) : (
                          <Badge variant="outline">{item.payment_status || "status"}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Criado em {formatDate(item.created_at)} • Pago em {formatDate(item.paid_at)}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => copy(item.user_email)}>
                          <Copy className="w-3 h-3 mr-1" />
                          Copiar email
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => copy(item.id)}>
                          <Copy className="w-3 h-3 mr-1" />
                          Copiar ID pedido
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground text-right space-y-1">
                      <p>ID: {item.id}</p>
                      {item.quiz_response_id && <p>Quiz: {item.quiz_response_id}</p>}
                      {item.mercado_pago_payment_id && <p>MP: {item.mercado_pago_payment_id}</p>}
                      {item.stripe_session_id && <p>Stripe: {item.stripe_session_id}</p>}
                    </div>
                  </div>
                  <Separator />
                  <div className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p>Produto: {item.product_id || "—"}</p>
                    <p>Preferencia MP: {item.mp_preference_id || "—"}</p>
                    <p>Atualizado em: {formatDate(item.updated_at)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdminClients;



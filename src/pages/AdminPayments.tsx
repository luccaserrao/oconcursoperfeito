import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Copy, ExternalLink, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  user_email: string;
  user_name: string;
  amount: number;
  payment_status: string;
  created_at: string;
  updated_at: string;
  products?: {
    name: string;
  };
}

const AdminPayments = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [credentialsOk, setCredentialsOk] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const webhookUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mp-webhook`;

  const checkCredentials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-mp-credentials');
      
      if (error) throw error;
      
      setCredentialsOk(data.ok);
      
      if (data.ok) {
        toast({
          title: "✅ Credenciais OK",
          description: "Mercado Pago configurado corretamente",
        });
      } else {
        toast({
          variant: "destructive",
          title: "❌ Credenciais faltando",
          description: `Configurar: ${data.missing.join(", ")}`,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível verificar credenciais",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTestPayment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('createPreference', {
        body: {
          userName: "Teste Admin",
          userEmail: "admin@teste.com",
          amount: 1.00
        }
      });

      if (error) throw error;

      if (data?.init_point) {
        window.open(data.init_point, '_blank');
        toast({
          title: "Pagamento teste criado",
          description: "Abrindo checkout em nova aba...",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível criar pagamento teste",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "✅ Copiado!",
      description: "URL do webhook copiada",
    });
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const { data, error } = await supabase.functions.invoke('list-orders');
      
      if (error) throw error;
      
      setOrders(data.orders || []);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar pedidos",
      });
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/login');
        return;
      }
      
      setIsAuthenticated(true);
      setIsCheckingAuth(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      checkCredentials();
      loadOrders();
    }
  }, [isAuthenticated]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Pago</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejeitado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Painel de Pagamentos</h1>
        <p className="text-muted-foreground">Gerenciar Mercado Pago e pedidos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🚀 Guia de Configuração</CardTitle>
          <CardDescription>Siga estes passos para testar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-bold">1.</span>
            <span>Verifique as credenciais do Mercado Pago</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">2.</span>
            <span>Copie a URL do webhook e configure no painel do Mercado Pago</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">3.</span>
            <span>Crie um pagamento de teste (R$ 1,00)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">4.</span>
            <span>Complete o pagamento e volte aqui para ver o status</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔑 Credenciais do Mercado Pago</CardTitle>
          <CardDescription>Verificar configuração</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {credentialsOk === null ? (
                <span className="text-muted-foreground">Verificando...</span>
              ) : credentialsOk ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 font-semibold">Configurado</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-600 font-semibold">Faltando configuração</span>
                </>
              )}
            </div>
            <Button onClick={checkCredentials} disabled={loading} variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Verificar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔔 Webhook URL</CardTitle>
          <CardDescription>Configure esta URL no painel do Mercado Pago</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <code className="flex-1 p-2 bg-muted rounded text-sm break-all">
              {webhookUrl}
            </code>
            <Button onClick={copyWebhookUrl} size="icon" variant="outline">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Configure em: Mercado Pago → Integrações → Webhooks → Eventos: payment.created, payment.updated
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🧪 Pagamento de Teste</CardTitle>
          <CardDescription>Criar pagamento de R$ 1,00 para testar</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={createTestPayment} disabled={loading || !credentialsOk}>
            <ExternalLink className="w-4 h-4 mr-2" />
            Criar Pagamento Teste (R$ 1,00)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>📦 Pedidos Recentes</CardTitle>
            <CardDescription>Últimos 50 pedidos</CardDescription>
          </div>
          <Button onClick={loadOrders} disabled={loadingOrders} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${loadingOrders ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </CardHeader>
        <CardContent>
          {loadingOrders ? (
            <div className="text-center py-10 text-muted-foreground">
              Carregando...
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              Nenhum pedido ainda
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Email</th>
                    <th className="text-left py-2 px-4">Nome</th>
                    <th className="text-left py-2 px-4">Produto</th>
                    <th className="text-right py-2 px-4">Valor</th>
                    <th className="text-center py-2 px-4">Status</th>
                    <th className="text-left py-2 px-4">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-2 px-4 text-sm">{order.user_email}</td>
                      <td className="py-2 px-4 text-sm">{order.user_name}</td>
                      <td className="py-2 px-4 text-sm">{order.products?.name || "-"}</td>
                      <td className="py-2 px-4 text-sm text-right">
                        R$ {(order.amount / 100).toFixed(2)}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {getStatusBadge(order.payment_status)}
                      </td>
                      <td className="py-2 px-4 text-sm">
                        {new Date(order.created_at).toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;

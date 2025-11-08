import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, Database, DollarSign, Users, BarChart3, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface AnalyticsSummary {
  totalResponses: number;
  totalCacheEntries: number;
  totalCacheHits: number;
  cacheHitRate: number;
  creditsUsed: number;
  creditsSaved: number;
  savingsPercent: number;
  totalGenerations: number;
}

interface DailyData {
  date: string;
  completions: number;
}

interface CacheStat {
  id: string;
  hits: number;
  created: string;
  lastUsed: string;
  daysSinceCreation: number;
}

const AdminAnalytics = () => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [cacheStats, setCacheStats] = useState<CacheStat[]>([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState(30);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/login');
        return;
      }
      
      const { data: isAdmin } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (!isAdmin) {
        toast({
          variant: "destructive",
          title: "Acesso negado",
          description: "Você não tem permissão de administrador",
        });
        navigate('/');
        return;
      }
      
      setIsAuthenticated(true);
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [navigate, toast]);

  useEffect(() => {
    if (isAuthenticated) {
      loadAnalytics();
    }
  }, [isAuthenticated, period]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data, error } = await supabase.functions.invoke('get-analytics', {
        body: { days: period },
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      });
      
      if (error) throw error;
      
      setSummary(data.summary);
      setDailyData(data.dailyData);
      setCacheStats(data.cacheStats);
      
      toast({
        title: "Analytics atualizados",
        description: `Dados dos últimos ${period} dias carregados`,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar analytics",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const pieData = summary ? [
    { name: 'Cache Hits', value: summary.totalCacheHits, color: '#10b981' },
    { name: 'Novas Gerações', value: summary.totalCacheEntries, color: '#3b82f6' },
  ] : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 px-4 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard de Analytics</h1>
            <p className="text-muted-foreground">
              Monitore cache hit rate, consumo de créditos e custos do Lovable AI
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/admin/users')} variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Usuários
            </Button>
            <Button onClick={() => navigate('/admin/payments')} variant="outline">
              <CreditCard className="w-4 h-4 mr-2" />
              Pagamentos
            </Button>
            <Button onClick={loadAnalytics} variant="outline" disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {[7, 30, 90].map((days) => (
            <Button
              key={days}
              variant={period === days ? "default" : "outline"}
              onClick={() => setPeriod(days)}
              size="sm"
            >
              {days} dias
            </Button>
          ))}
        </div>

        {loading && !summary ? (
          <div className="text-center py-10">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Carregando analytics...</p>
          </div>
        ) : summary ? (
          <>
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Respostas</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{summary.totalResponses}</div>
                  <p className="text-xs text-muted-foreground">
                    Quiz completados nos últimos {period} dias
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{summary.cacheHitRate.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    {summary.totalCacheHits} hits de {summary.totalGenerations} total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Créditos Usados</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{summary.creditsUsed}</div>
                  <p className="text-xs text-muted-foreground">
                    Gerações únicas que custaram créditos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Créditos Economizados</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{summary.creditsSaved}</div>
                  <p className="text-xs text-muted-foreground">
                    {summary.savingsPercent.toFixed(1)}% de economia pelo cache
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Daily Completions Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Completações Diárias</CardTitle>
                  <CardDescription>Número de quiz completados por dia</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="completions" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        name="Completações"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Cache Distribution Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição Cache vs Gerações</CardTitle>
                  <CardDescription>Como as recomendações são servidas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Cache Entries */}
            <Card>
              <CardHeader>
                <CardTitle>Top 10 Recomendações em Cache</CardTitle>
                <CardDescription>Combinações de respostas mais reutilizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cacheStats.map((stat, index) => (
                    <div 
                      key={stat.id} 
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>
                        <div>
                          <p className="text-sm font-medium">Cache ID: {stat.id.slice(0, 8)}...</p>
                          <p className="text-xs text-muted-foreground">
                            Criado há {stat.daysSinceCreation} dias • 
                            Último uso: {new Date(stat.lastUsed).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{stat.hits} hits</p>
                        <p className="text-xs text-green-600 font-medium">
                          {stat.hits} créditos economizados
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cost Summary */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Resumo de Custos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Custo Total (com cache)</p>
                    <p className="text-2xl font-bold">{summary.creditsUsed} créditos</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Custo sem Cache (potencial)</p>
                    <p className="text-2xl font-bold text-red-600">{summary.totalGenerations} créditos</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Economia Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      {summary.creditsSaved} créditos ({summary.savingsPercent.toFixed(1)}%)
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    💡 <strong>Insights:</strong>
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Cada geração única custa 1 crédito do Lovable AI</li>
                    <li>• Cache hits são totalmente gratuitos (0 créditos)</li>
                    <li>• Seu cache atual está economizando {summary.savingsPercent.toFixed(1)}% dos custos</li>
                    <li>• {summary.totalCacheEntries} combinações únicas de respostas já foram geradas</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center py-10">
            <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum dado disponível ainda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;

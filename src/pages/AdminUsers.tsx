import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Search, Users, MessageCircle, RefreshCw, CreditCard, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface User {
  name: string;
  email: string;
  whatsapp: string;
  careerName: string;
  created_at: string;
  isQualified: boolean;
  qualificationScore: number;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyQualified, setShowOnlyQualified] = useState(false);
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
      loadUsers();
    }
  }, [isAuthenticated]);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data, error } = await supabase.functions.invoke('list-users', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`
        }
      });
      
      if (error) throw error;
      
      setUsers(data.users || []);
      toast({
        title: "Usuários carregados",
        description: `${data.users?.length || 0} usuários encontrados`,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar usuários",
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.careerName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => !showOnlyQualified || user.isQualified)
    .sort((a, b) => {
      if (a.isQualified && !b.isQualified) return -1;
      if (!a.isQualified && b.isQualified) return 1;
      return 0;
    });

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 px-4 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Lista de Usuários Cadastrados</h1>
            <p className="text-muted-foreground">
              Todos os usuários que completaram o quiz
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/admin/analytics')} variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button onClick={() => navigate('/admin/payments')} variant="outline">
              <CreditCard className="w-4 h-4 mr-2" />
              Pagamentos
            </Button>
            <Button onClick={loadUsers} variant="outline" disabled={loadingUsers}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loadingUsers ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, e-mail ou carreira..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Button
                variant={showOnlyQualified ? "default" : "outline"}
                onClick={() => setShowOnlyQualified(!showOnlyQualified)}
                className="gap-2"
              >
                <Users className="w-4 h-4" />
                {showOnlyQualified ? "Todos os Usuários" : "Apenas Leads Qualificados"}
                {showOnlyQualified && users.filter(u => u.isQualified).length > 0 && (
                  <span className="ml-2 bg-white text-primary rounded-full px-2 py-0.5 text-xs font-semibold">
                    {users.filter(u => u.isQualified).length}
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {loadingUsers ? (
          <div className="text-center py-10">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Carregando usuários...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-10">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm 
                ? "Nenhum usuário encontrado para esta busca" 
                : "Nenhum usuário cadastrado ainda"}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Carreira Recomendada</TableHead>
                      <TableHead>Data de Cadastro</TableHead>
                      <TableHead className="text-center">WhatsApp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <TableRow key={`${user.email}-${index}`}>
                        <TableCell>
                          {user.isQualified ? (
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse">
                                🔥 HOT LEAD
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ({user.qualificationScore}/3)
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                                Lead Padrão
                              </span>
                              {user.qualificationScore > 0 && (
                                <span className="text-xs text-muted-foreground">
                                  ({user.qualificationScore}/3)
                                </span>
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.careerName}</TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => window.open(
                              `https://wa.me/55${user.whatsapp}`,
                              '_blank'
                            )}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Abrir WhatsApp
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {filteredUsers.map((user, index) => (
                <Card key={`${user.email}-${index}`}>
                  <CardContent className="pt-6 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      {user.isQualified ? (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse">
                            🔥 HOT LEAD
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({user.qualificationScore}/3)
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                            Lead Padrão
                          </span>
                          {user.qualificationScore > 0 && (
                            <span className="text-xs text-muted-foreground">
                              ({user.qualificationScore}/3)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Nome</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">E-mail</p>
                      <p className="text-sm">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Carreira</p>
                      <p className="text-sm">{user.careerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cadastro</p>
                      <p className="text-sm">
                        {new Date(user.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.open(
                        `https://wa.me/55${user.whatsapp}`,
                        '_blank'
                      )}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Abrir WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

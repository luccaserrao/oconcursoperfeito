import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Calendar, BookOpen, Target, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { PaidContent as PaidContentType } from "@/types/quiz";

export const PaidContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paidContent, setPaidContent] = useState<PaidContentType | null>(null);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      
      if (!sessionId) {
        setError("Link inválido");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId },
        });

        if (error) throw error;

        if (!data.paid) {
          toast.error("Pagamento não confirmado");
          navigate("/");
          return;
        }

        // Mock paid content for now - this should come from the recommendation
        setPaidContent({
          studyPlan: {
            days: Array.from({ length: 30 }, (_, i) => 
              `Dia ${i + 1}: Estudar ${i % 2 === 0 ? 'matéria principal' : 'revisão'}`
            ),
            hoursPerDay: "4-5 horas",
            focus: "Preparação focada nas principais matérias do edital"
          },
          alternativeCareers: [
            { name: "Carreira 1", reason: "Motivo 1", salary: "R$ 10.000" },
            { name: "Carreira 2", reason: "Motivo 2", salary: "R$ 12.000" },
            { name: "Carreira 3", reason: "Motivo 3", salary: "R$ 15.000" },
            { name: "Carreira 4", reason: "Motivo 4", salary: "R$ 18.000" },
            { name: "Carreira 5", reason: "Motivo 5", salary: "R$ 20.000" }
          ],
          studyRoadmap: "Roteiro detalhado de 30 dias com foco nas principais matérias...",
          freeMaterials: [
            "Material gratuito 1",
            "Material gratuito 2",
            "Material gratuito 3"
          ],
          whatsappGroupInfo: "Entre em contato pelo número abaixo para ser adicionado ao grupo",
          whatsappSupportNumber: "91984233672"
        });
        
        setUserName(data.userName || "Concurseiro");
        
        toast.success("Pagamento confirmado! Bem-vindo ao Pacote Completo");
      } catch (error) {
        console.error("Error verifying payment:", error);
        setError("Erro ao verificar pagamento");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground">Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-destructive mb-4">{error}</p>
          <Button onClick={() => navigate("/")}>Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  if (!paidContent) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent mb-6">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Parabéns, {userName.split(' ')[0]}! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            Seu conteúdo completo está liberado
          </p>
        </div>

        {/* Study Plan */}
        <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)]">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Cronograma de 30 Dias
          </h2>
          <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Dedicação Diária</p>
                <p className="font-semibold">{paidContent.studyPlan.hoursPerDay}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Foco</p>
                <p className="font-semibold">{paidContent.studyPlan.focus}</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {paidContent.studyPlan.days.map((day, i) => (
              <div key={i} className="p-3 rounded-lg border border-border text-sm">
                {day}
              </div>
            ))}
          </div>
        </Card>

        {/* Alternative Careers */}
        <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)]">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            5 Carreiras Alternativas
          </h2>
          <div className="space-y-4">
            {paidContent.alternativeCareers.map((career, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{career.name}</h3>
                  <Badge variant="secondary">{career.salary}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{career.reason}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Study Roadmap */}
        <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)]">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Roteiro de Estudo
          </h2>
          <p className="text-muted-foreground">{paidContent.studyRoadmap}</p>
        </Card>

        {/* Free Materials */}
        <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)]">
          <h2 className="text-2xl font-bold mb-6">📚 Materiais Gratuitos</h2>
          <div className="space-y-3">
            {paidContent.freeMaterials.map((material, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{material}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* WhatsApp Support */}
        <Card className="p-8 shadow-[var(--shadow-elevated)] bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Acesso ao Grupo e Suporte</h2>
            <p className="text-muted-foreground mb-6">{paidContent.whatsappGroupInfo}</p>
            <a
              href={`https://wa.me/55${paidContent.whatsappSupportNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                <MessageCircle className="mr-2 w-5 h-5" />
                Entrar em Contato: {paidContent.whatsappSupportNumber}
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

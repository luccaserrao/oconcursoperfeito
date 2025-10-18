import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerRecommendation } from "@/types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MercadoPagoButton } from "./MercadoPagoButton";
import { Trophy, DollarSign, MapPin, BookOpen, Calendar, CheckCircle2, Sparkles, Lock, Briefcase, Clock } from "lucide-react";
interface ResultsProps {
  recommendation: CareerRecommendation;
  userName: string;
  userEmail: string;
  quizResponseId?: string;
}
export const Results = ({
  recommendation,
  userName,
  userEmail,
  quizResponseId
}: ResultsProps) => {
  return <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent mb-6 animate-scale-in">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Parabéns, {userName.split(' ')[0]}! 🎉
          </h1>
          <p className="text-xl text-muted-foreground">
            Descobrimos a carreira perfeita para você
          </p>
        </div>

        {/* Main Career Card - Simplified Initial View */}
        <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)] animate-fade-in">
          <div className="mb-6">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent">
              Carreira Recomendada
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {recommendation.careerName}
            </h2>
          </div>

          {/* Quick Info */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5">
              <DollarSign className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Remuneração</p>
                <p className="font-semibold">{recommendation.salary}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Próxima Prova</p>
                <p className="font-semibold">{recommendation.examDate}</p>
              </div>
            </div>
          </div>

          {/* Workplaces */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Locais de Trabalho</h3>
            </div>
            <div className="space-y-2">
              {recommendation.workplaces.map((place, i) => <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{place}</span>
                </div>)}
            </div>
          </div>

          {/* Work Routine */}
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Rotina de Trabalho</p>
                <p className="text-sm text-muted-foreground">{recommendation.workRoutine}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Free Content Sections */}
        <div className="space-y-6 mb-8">
          {/* Justification */}
          <Card className="p-6 shadow-[var(--shadow-elevated)]">
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>{recommendation.justification}</p>
            </div>
          </Card>

          {/* Subjects */}
          <Card className="p-6 shadow-[var(--shadow-elevated)]">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Principais Matérias
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendation.subjects.map((subject, i) => <Badge key={i} variant="secondary" className="text-sm py-1.5">
                  {subject}
                </Badge>)}
            </div>
          </Card>

          {/* Exam Frequency */}
          <Card className="p-6 shadow-[var(--shadow-elevated)]">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold mb-2">Frequência de Concursos</p>
                <p className="text-sm text-muted-foreground">{recommendation.examFrequency}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Payment Card */}
        <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)] bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-fade-in">
          <div className="text-center mb-6">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              Pacote Completo - Carreira dos Sonhos
            </h3>
            <div className="text-3xl font-bold text-primary mb-2">
              R$ 50,00
            </div>
            <p className="text-muted-foreground">
              Tenha acesso a tudo que você precisa para sua aprovação
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {["📅 Cronograma de estudos personalizado de 30 dias", "🎯 5 carreiras alternativas que combinam com você", "📚 Roteiro de estudo completo", "📖 Lista de materiais gratuitos para sua carreira", "👥 Acesso ao grupo de concurseiros", "💬 Suporte via WhatsApp para tirar dúvidas"].map((benefit, i) => <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{benefit}</span>
              </div>)}
          </div>

          <MercadoPagoButton 
            userName={userName} 
            userEmail={userEmail}
            quizResponseId={quizResponseId}
          />
        </Card>


        {/* CTA Footer */}
        <div className="text-center mt-12 p-6 rounded-2xl bg-card">
          <p className="text-muted-foreground mb-2">
            ✨ Resultado enviado para <strong>{userEmail}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Boa sorte na sua jornada rumo à aprovação! 🚀
          </p>
        </div>
      </div>
    </div>;
};
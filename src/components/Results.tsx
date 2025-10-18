import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerRecommendation } from "@/types/quiz";
import { 
  Trophy, 
  DollarSign, 
  MapPin, 
  BookOpen, 
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";

interface ResultsProps {
  recommendation: CareerRecommendation;
  userName: string;
  userEmail: string;
  onUpsellClick: () => void;
}

export const Results = ({ recommendation, userName, userEmail, onUpsellClick }: ResultsProps) => {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);

  const handleUpsellClick = () => {
    setShowAlternatives(true);
    setShowStudyPlan(true);
    onUpsellClick();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
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

        {/* Main Career Card */}
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
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5">
              <DollarSign className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Remuneração</p>
                <p className="font-semibold">{recommendation.salary}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Local de Trabalho</p>
                <p className="font-semibold">{recommendation.workplace}</p>
              </div>
            </div>
          </div>

          {/* Justification */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Por que esta carreira é perfeita para você
            </h3>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
              {recommendation.justification.split('\n').map((paragraph, i) => (
                paragraph.trim() && <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Principais matérias para estudar
            </h3>
            <div className="flex flex-wrap gap-2">
              {recommendation.subjects.map((subject, i) => (
                <Badge key={i} variant="secondary" className="text-sm py-1.5">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          {/* Exam Frequency */}
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Frequência de Concursos</p>
                <p className="text-sm text-muted-foreground">{recommendation.examFrequency}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Upsell Card */}
        <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)] bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-fade-in">
          <div className="text-center mb-6">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              Quer Maximizar Suas Chances?
            </h3>
            <p className="text-muted-foreground">
              Desbloqueie informações exclusivas para acelerar sua aprovação
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {[
              "5 carreiras alternativas que também combinam com você",
              "Cronograma de estudos personalizado de 4 semanas",
              "Estratégias específicas para cada matéria",
              "Dicas de materiais de estudo recomendados"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {!showAlternatives && (
            <Button
              onClick={handleUpsellClick}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent text-lg py-6"
            >
              Desbloquear Conteúdo Completo
            </Button>
          )}
        </Card>

        {/* Alternative Careers (Hidden until upsell click) */}
        {showAlternatives && (
          <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)] animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">
              5 Carreiras Alternativas Para Você
            </h3>
            <div className="space-y-4">
              {recommendation.alternativeCareers.map((career, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-lg">{career.name}</h4>
                    <Badge variant="secondary">{career.salary}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{career.reason}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Study Plan (Hidden until upsell click) */}
        {showStudyPlan && (
          <Card className="p-8 shadow-[var(--shadow-elevated)] animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">
              Seu Cronograma de Estudos Inicial
            </h3>

            <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dedicação Semanal</p>
                  <p className="font-semibold">{recommendation.studyPlan.hoursPerWeek}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Foco Principal</p>
                  <p className="font-semibold">{recommendation.studyPlan.focus}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {recommendation.studyPlan.weeks.map((week, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border"
                >
                  <p className="text-muted-foreground">{week}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

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
    </div>
  );
};

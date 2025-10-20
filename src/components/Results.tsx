import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerRecommendation } from "@/types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MercadoPagoButton } from "./MercadoPagoButton";
import { CountdownTimer } from "./CountdownTimer";
import { Footer } from "./Footer";
import { Trophy, DollarSign, MapPin, BookOpen, Calendar, CheckCircle2, Sparkles, Lock, Briefcase, Clock, Star, Shield, Users } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
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
  trackEvent('results_viewed', { career: recommendation.careerName });

  return (
    <>
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

        {/* Urgency Timer */}
        <div className="text-center mb-8 animate-fade-in">
          <p className="text-sm text-muted-foreground mb-3">⏰ OFERTA EXCLUSIVA - EXPIRA EM:</p>
          <CountdownTimer initialMinutes={120} />
          <p className="text-xs text-muted-foreground mt-2">
            Por ter completado o quiz hoje, você tem acesso especial ao<br />
            <strong>Pacote Completo de Preparação com 60% de desconto</strong>
          </p>
        </div>

        {/* Payment Card */}
        <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)] bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-fade-in relative overflow-hidden">
          {/* Decorative badge */}
          <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            60% OFF
          </div>
          
          <div className="text-center mb-6">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">
              🎁 PACOTE COMPLETO DE PREPARAÇÃO
            </h3>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-lg text-muted-foreground line-through">De R$ 127,00</span>
              <span className="text-3xl font-bold text-primary">por apenas R$ 50,00</span>
            </div>
            <p className="text-muted-foreground">
              Tudo que você precisa para começar sua jornada rumo à aprovação
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <p className="font-semibold text-lg mb-3">✨ O QUE VOCÊ RECEBE:</p>
            {[
              "📅 Cronograma personalizado de estudos (12 semanas)",
              "🎯 3 carreiras alternativas compatíveis com você",
              "📚 Roteiro de estudo validado por aprovados",
              "📖 Materiais de estudo gratuitos selecionados",
              "👥 Acesso ao grupo exclusivo no WhatsApp",
              "💬 Suporte direto comigo por 30 dias",
              "🎁 BÔNUS: Técnicas de memorização para concursos"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-center">
              🔥 <strong>23 pessoas</strong> compraram nas últimas 24h<br />
              ⚠️ <strong>Restam apenas 7 vagas</strong> hoje com desconto
            </p>
          </div>

          {/* Guarantee */}
          <div className="bg-background/80 border-2 border-primary/20 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2">✅ GARANTIA INCONDICIONAL DE 7 DIAS</h4>
                <p className="text-sm text-muted-foreground">
                  Se você não ficar 100% satisfeito, devolvemos seu dinheiro.<br />
                  Sem perguntas, sem burocracia.
                </p>
              </div>
            </div>
          </div>

          {/* Payment details */}
          <div className="text-center mb-6 space-y-2 text-sm text-muted-foreground">
            <p>💳 Pagamento único de R$ 50,00</p>
            <p>🔒 Ambiente 100% seguro (Mercado Pago)</p>
            <p>📧 Acesso imediato após confirmação do pagamento</p>
          </div>

          <div onClick={() => trackEvent('upsell_clicked', { career: recommendation.careerName })}>
            <MercadoPagoButton 
              userName={userName} 
              userEmail={userEmail}
              quizResponseId={quizResponseId}
            />
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-4">
            👆 Clique aqui e comece sua aprovação hoje
          </p>
        </Card>

        {/* Testimonials */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-center mb-6">
            O que dizem quem já garantiu o Pacote Completo:
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: "M.S.",
                text: "Passei para Auditor Fiscal seguindo o plano! O cronograma foi essencial.",
                rating: 5
              },
              {
                name: "A.R.",
                text: "Nunca tinha pensado em TRT, mas a IA acertou em cheio. Hoje estou estudando focado!",
                rating: 5
              },
              {
                name: "J.C.",
                text: "O grupo de WhatsApp foi fundamental pra manter foco. Valeu cada centavo!",
                rating: 5
              }
            ].map((testimonial, i) => (
              <Card key={i} className="p-4">
                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic mb-2">
                  "{testimonial.text}"
                </p>
                <p className="text-xs font-semibold">— {testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>


        {/* CTA Footer */}
        <div className="text-center mt-12 p-6 rounded-2xl bg-card shadow-[var(--shadow-card)]">
          <p className="text-muted-foreground mb-2">
            ✨ Resultado enviado para <strong>{userEmail}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Boa sorte na sua jornada rumo à aprovação! 🚀
          </p>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};
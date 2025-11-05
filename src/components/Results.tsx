import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerRecommendation } from "@/types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MercadoPagoButton } from "./MercadoPagoButton";
import { CountdownTimer } from "./CountdownTimer";
import { Footer } from "./Footer";
import { Trophy, DollarSign, MapPin, BookOpen, Calendar, CheckCircle2, Sparkles, Lock, Briefcase, Clock, Star, Shield, Users, Copy } from "lucide-react";
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
  trackEvent('results_viewed', {
    career: recommendation.careerName
  });
  return <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-6 animate-scale-in">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            🔍 {userName.split(' ')[0]}, encontramos sua carreira ideal!
          </h1>
          <p className="text-xl text-muted-foreground">
            Desbloqueie agora o resultado completo + seu plano personalizado de preparação.
          </p>
        </div>

        {/* Main Career Card - Partial Access */}
        <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)] animate-fade-in">
          <div className="text-center mb-6">
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Com base nas suas respostas, <strong>encontramos uma carreira no serviço público compatível com seu perfil</strong>. Veja abaixo o que conseguimos liberar por enquanto:
            </p>
            
            <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500">
              🔒 ACESSO PARCIAL
            </Badge>
            
            {/* Nome do cargo BORRADO */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="bg-background/90 backdrop-blur-sm rounded-lg px-6 py-3 border-2 border-primary">
                  <Lock className="w-6 h-6 text-primary inline-block mr-2" />
                  <span className="text-lg font-bold">Desbloqueie para ver o nome do cargo ideal</span>
                </div>
              </div>
              <h2 
                className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent select-none"
                style={{ filter: 'blur(12px)' }}
              >
                {recommendation.careerName}
              </h2>
            </div>

            {/* Informações parciais liberadas */}
            <div className="grid md:grid-cols-2 gap-6 mt-8 text-left max-w-2xl mx-auto">
              {/* Faixa Salarial */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">Faixa Salarial</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  <strong>Inicial:</strong> {recommendation.salary.split(' ')[0]} (pode variar)<br/>
                  <strong>Com progressão:</strong> Pode ultrapassar R$ 8.000
                </p>
              </div>

              {/* Probabilidade de Edital */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">Próximo Edital</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Probabilidade: <strong>
                    {recommendation.examFrequency.toLowerCase().includes('anual') || recommendation.examFrequency.toLowerCase().includes('todo ano') 
                      ? 'ALTA' 
                      : recommendation.examFrequency.toLowerCase().includes('bienal') || recommendation.examFrequency.toLowerCase().includes('2 anos')
                      ? 'MÉDIA'
                      : 'BAIXA'}
                  </strong><br/>
                  Previsão: {recommendation.examDate || 'Próximos 6 a 12 meses'}
                </p>
              </div>

              {/* Nível de Dificuldade */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">Nível de Dificuldade</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {recommendation.subjects && recommendation.subjects.length > 10 
                    ? '⚠️ Nível de dificuldade alto, mas com nosso plano de estudos suas chances aumentam significativamente.'
                    : '✅ Nível de dificuldade médio - ideal para quem está começando.'
                  }
                </p>
              </div>
            </div>
          </div>
        </Card>


        {/* Offer Section - Simplified */}
        <div id="offer-section" className="scroll-mt-8">
          <Card className="p-8 mb-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-primary/20 text-center animate-fade-in">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🎯 Descubra sua carreira ideal + como ser aprovado
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Desbloqueie <strong>agora</strong> o resultado completo com:
            </p>
            
            {/* Lista de benefícios condensada */}
            <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto text-left mb-8">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Nome completo do cargo</strong> + justificativa personalizada</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Análise completa do edital</strong> e matérias-chave</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Plano de estudos de 30 dias</strong> personalizado</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>3 carreiras alternativas</strong> com matérias semelhantes</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Professor IA 24h</strong> treinado para seu concurso</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm"><strong>Mapa de oportunidades</strong> dos próximos 12 meses</span>
              </div>
            </div>

            {/* Preço */}
            <div className="bg-background/80 rounded-2xl p-6 mb-6 max-w-md mx-auto border-2 border-primary">
              <p className="text-sm text-muted-foreground mb-2">Valor normal: <span className="line-through">R$ 110,00</span></p>
              <p className="text-5xl font-bold text-primary mb-2">R$ 50,00</p>
              <p className="text-xs text-muted-foreground">Pagamento único • Acesso imediato</p>
            </div>

            {/* Contador de Urgência - 5 minutos */}
            <Card className="p-6 mb-6 bg-destructive/10 border-2 border-destructive text-center">
              <Clock className="w-8 h-8 text-destructive mx-auto mb-3" />
              <p className="text-destructive font-bold text-xl mb-2">
                ⏰ Seus dados e este resultado parcial ficarão disponíveis por apenas 5 minutos
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Após esse prazo, serão <strong>excluídos automaticamente por segurança</strong>.
              </p>
              <CountdownTimer initialMinutes={5} />
              <p className="text-xs text-muted-foreground mt-3">
                ⚠️ Não perca acesso ao seu resultado personalizado
              </p>
            </Card>

            {/* CTA Principal */}
            <div id="mercadopago-button" onClick={() => trackEvent('upsell_clicked', {
              career: recommendation.careerName
            })}>
              <MercadoPagoButton 
                userName={userName} 
                userEmail={userEmail} 
                quizResponseId={quizResponseId} 
              />
            </div>

            {/* Garantia compacta */}
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>Garantia incondicional de 7 dias • Pagamento seguro via Mercado Pago</span>
            </div>
          </Card>
        </div>

        {/* Testimonials */}
        <div className="mb-8 mt-12">
          <h3 className="text-2xl font-bold text-center mb-6">
            ⭐ O que dizem quem já garantiu o Pacote:
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[{
              name: "Camila Torres",
              role: "Técnica Administrativa (TRE-SP)",
              text: "Descobri que estava estudando para o concurso errado. Achei que queria área policial, mas meu perfil era administrativo. Agora estudo para tribunais e me sinto no caminho certo.",
              date: "03/05/2024",
              rating: 5
            }, {
              name: "Rogério P. Lima",
              role: "Analista Judiciário (TRT)",
              text: "O plano de 30 dias me mostrou quanto tempo eu realmente precisava estudar por semana. Parei de me culpar e comecei a avançar.",
              date: "14/08/2024",
              rating: 5
            }, {
              name: "Beatriz M.",
              role: "Estudante de Enfermagem Pública",
              text: "O professor IA cria questões idênticas às da banca e ainda explica os erros. Nunca aprendi tanto em tão pouco tempo.",
              date: "27/09/2024",
              rating: 5
            }].map((testimonial, i) => <Card key={i} className="p-5 border-2 border-primary/10">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  "{testimonial.text}"
                </p>
                <p className="text-xs font-semibold">
                  — {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role} • {testimonial.date}
                </p>
              </Card>)}
          </div>
        </div>


        {/* CTA Footer */}
        <div className="text-center mt-12 p-6 rounded-2xl bg-card shadow-[var(--shadow-card)]">
          <p className="text-muted-foreground mb-2">
            ✨ Seu resultado gratuito foi enviado para <strong>{userEmail}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Agora é hora de transformar essa descoberta em aprovação. 🚀
          </p>
        </div>
      </div>

      {/* Sticky CTA Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-primary/20 md:hidden z-50">
        <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90" onClick={() => {
          trackEvent('upsell_clicked', {
            career: recommendation.careerName,
            source: 'sticky_mobile'
          });
          document.getElementById('mercadopago-button')?.scrollIntoView({
            behavior: 'smooth'
          });
        }}>
          🔓 Desbloquear por R$ 50
        </Button>
      </div>
      </div>
      <Footer />
    </>;
};
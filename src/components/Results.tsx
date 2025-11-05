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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent mb-6 animate-scale-in">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            🎉 Parabéns, {userName.split(' ')[0]}! Você descobriu sua carreira ideal no serviço público.
          </h1>
          <p className="text-xl text-muted-foreground">
            Agora transforme essa descoberta em uma aprovação real.
          </p>
        </div>

        {/* Main Career Card - Free Result */}
        <Card className="p-8 mb-8 shadow-[var(--shadow-elevated)] animate-fade-in">
          <div className="text-center mb-6">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent">
              🎁 SEU RESULTADO GRATUITO
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {recommendation.careerName}
            </h2>
            <div className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-semibold text-primary">
              <DollarSign className="w-7 h-7" />
              {recommendation.salary}
            </div>
          </div>

          {/* Locked Information Grid */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            {/* Próxima Prova - BLOQUEADA */}
            

            {/* Locais de Trabalho - BLOQUEADO */}
            

            {/* Rotina de Trabalho - BLOQUEADA */}
            
          </div>
        </Card>

        {/* 3 Locked Product Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8 animate-fade-in">
          {/* Card 1 - Análise do Edital */}
          <Card className="relative overflow-hidden p-6 border-2 border-primary/30 bg-background/40 backdrop-blur-sm">
            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 mx-auto">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-lg">Análise do Edital + Como Estudar p/ seu Cargo</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Saiba o que realmente cai na prova, as matérias mais cobradas e os requisitos do edital.
                </p>
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" onClick={() => document.getElementById('purchase-button')?.scrollIntoView({
                behavior: 'smooth'
              })}>
                🔓 Desbloquear
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-40"></div>
          </Card>

          {/* Card 2 - Plano de Estudos */}
          <Card className="relative overflow-hidden p-6 border-2 border-primary/30 bg-background/40 backdrop-blur-sm">
            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 mx-auto">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-lg">Plano de Estudos de 30 Dias</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Descubra quantas horas estudar por dia e como organizar sua rotina com base no seu cargo.
                </p>
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" onClick={() => document.getElementById('purchase-button')?.scrollIntoView({
                behavior: 'smooth'
              })}>
                🔓 Desbloquear
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-40"></div>
          </Card>

          {/* Card 3 - Professor IA */}
          <Card className="relative overflow-hidden p-6 border-2 border-primary/30 bg-background/40 backdrop-blur-sm">
            <div className="relative z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-lg">Professor IA + Simulados Corrigidos</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Receba questões da banca, simulados corrigidos, materiais gratuitos e recomendações de estudo.
                </p>
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90" onClick={() => document.getElementById('purchase-button')?.scrollIntoView({
                behavior: 'smooth'
              })}>🔓 Desbloquear </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-40"></div>
          </Card>
        </div>


        {/* Emotional Transition */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-primary/20 text-center animate-fade-in">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            🎓 Descobrir sua carreira é o primeiro passo.
          </h3>
          <p className="text-muted-foreground">
            Agora, veja como começar sua preparação de forma inteligente,<br className="hidden md:block" />
            focando no que <strong>realmente importa para passar</strong>.
          </p>
        </Card>

        {/* Offer Section */}
        <div id="offer-section" className="scroll-mt-8">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              🎁 Seu Plano Personalizado para Conquistar Essa Vaga
            </h2>
            <p className="text-xl text-muted-foreground">
              Feito com base nas suas respostas do quiz e nos editais mais recentes
            </p>
          </div>

          {/* 6 Products Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* Produto 1 */}
            <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">Valor: R$15,00</Badge>
                  <h4 className="font-bold text-lg">📘 Guia das Matérias-Chave</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Lista exata das matérias que <strong>mais caem</strong> no seu concurso.
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Economiza <strong>meses</strong> de estudo desnecessário</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Foque apenas no que <strong>realmente importa</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Baseado em <strong>editais reais</strong> dos últimos 5 anos</span>
                </div>
              </div>
            </Card>

            {/* Produto 2 */}
            <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">Valor: R$25,00</Badge>
                  <h4 className="font-bold text-lg">📅 Plano de Estudo de 1 mês</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Cronograma personalizado com <strong>revisões programadas</strong> e tempo ideal por matéria.
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Elimina <strong>indecisão</strong> sobre o que estudar hoje</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Cria <strong>disciplina diária</strong> automática</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Revisões espaçadas para <strong>não esquecer</strong></span>
                </div>
              </div>
            </Card>

            {/* Produto 3 */}
            <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">Valor: R$10,00</Badge>
                  <h4 className="font-bold text-lg">🧠 Estilo de Aprendizado Ideal</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Descubra como você aprende mais rápido: vídeos, leitura, questões ou presencial, por meio do nosso teste de IA<strong>você aprende mais rápido</strong>: vídeos, leitura, questões ou presencial.
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Acelera seu aprendizado em <strong>até 2x</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Evita perder tempo com métodos <strong>que não funcionam pra você</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Baseado em <strong>neurociência</strong> do aprendizado</span>
                </div>
              </div>
            </Card>

            {/* Produto 4 */}
            <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">Valor: R$20,00</Badge>
                  <h4 className="font-bold text-lg">📍 Mapa de Oportunidades</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Lista de <strong>editais abertos e previstos</strong> para sua carreira nos próximos 12 meses.
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Saiba <strong>quando e onde</strong> as provas acontecem</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Não perca <strong>nenhuma oportunidade</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Fique <strong>na frente</strong> de 99% dos concurseiros</span>
                </div>
              </div>
            </Card>

            {/* Produto 5 */}
            <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">Valor: R$15,00</Badge>
                  <h4 className="font-bold text-lg">💼 3 Carreiras Alternativas</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Outras opções compatíveis com <strong>matérias semelhantes</strong> à sua carreira ideal.
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Amplia suas <strong>chances de aprovação</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Evita recomeçar <strong>do zero</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Mais segurança no <strong>plano B e C</strong></span>
                </div>
              </div>
            </Card>

            {/* Produto 6 */}
            <Card className="p-6 border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">Valor: R$25,00</Badge>
                  <h4 className="font-bold text-lg">🤖 Professor Inteligência Artificial</h4>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                IA personalizada que <strong>conhece sua carreira</strong> e responde suas dúvidas 24h.
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Como ter um <strong>professor particular</strong> sempre disponível</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Tire dúvidas, revise e <strong>ajuste seu plano</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>Treinado especificamente para <strong>seu concurso</strong></span>
                </div>
              </div>
            </Card>
          </div>

          {/* Value Stacking */}
          <Card className="p-8 mb-6 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border-4 border-primary/30 relative overflow-hidden animate-fade-in">
            <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-sm font-bold px-4 py-2 rounded-full animate-pulse shadow-lg">
              54% OFF
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Se comprasse tudo separado:</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-3xl font-bold line-through text-muted-foreground">R$ 110,00</span>
              </div>
              
              <div className="mb-3">
                <p className="text-lg text-muted-foreground mb-2">
                  Mas como você demonstrou <strong>alto potencial</strong> no quiz e decidiu agir agora:
                </p>
              </div>

              <Button id="purchase-button" className="p-6 rounded-2xl bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity cursor-pointer h-auto" onClick={() => {
                trackEvent('upsell_clicked', {
                  career: recommendation.careerName,
                  source: 'value_stacking_card'
                });
                document.getElementById('mercadopago-button')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}>
                <div className="text-center">
                  <p className="text-white text-lg mb-2">🎯 PACOTE COMPLETO POR APENAS</p>
                  <p className="text-5xl font-bold text-white">R$ 50,00</p>
                  <p className="text-white/90 text-sm mt-2">Clique para pagar com Mercado Pago</p>
                </div>
              </Button>
            </div>
          </Card>

          {/* Timer */}
          <Card className="p-6 mb-6 bg-destructive/10 border-2 border-destructive text-center animate-fade-in">
            <p className="text-destructive font-bold text-lg mb-2">
              ⚠️ ATENÇÃO: Seus resultados foram salvos por apenas 15 minutos
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Após esse prazo, os dados serão excluídos por segurança e você precisará refazer o teste.
            </p>
            <CountdownTimer initialMinutes={15} />
            <p className="text-xs text-muted-foreground mt-2">
              ⏰ Oferta expira em minutos
            </p>
          </Card>

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
                <p className="text-sm text-muted-foreground mt-2">
                  🔒 <strong>Pagamento 100% seguro via Mercado Pago</strong>
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div id="mercadopago-button" onClick={() => trackEvent('upsell_clicked', {
            career: recommendation.careerName
          })}>
            <MercadoPagoButton userName={userName} userEmail={userEmail} quizResponseId={quizResponseId} />
          </div>
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
        <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90" onClick={() => {
          trackEvent('upsell_clicked', {
            career: recommendation.careerName,
            source: 'sticky_mobile'
          });
          document.getElementById('mercadopago-button')?.scrollIntoView({
            behavior: 'smooth'
          });
        }}>
          🔥 Quero Meu Pacote por R$ 50
        </Button>
      </div>
      </div>
      <Footer />
    </>;
};
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CareerRecommendation } from "@/types/quiz";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MercadoPagoButton } from "./MercadoPagoButton";
import { CountdownTimer } from "./CountdownTimer";
import { Footer } from "./Footer";
import { SocialProofPopup } from "./SocialProofPopup";
import { RiasecScores } from "./RiasecScores";
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
  // Extrair dados RIASEC da recomendação ou usar fallback
  const riasecData = recommendation.riasec || {
    top1: "Realista",
    top2: "Investigativo",
    habilidades: ["organizada", "comunicativa", "lógica", "criativa", "persistente"],
    habilidade_destaque: "práticas e objetivas",
    contexto_profissional: "organizar processos e resolver problemas complexos"
  };

  trackEvent('results_viewed', {
    career: recommendation.careerName
  });
  
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
        
        {/* ============= BLOCO 1: PRIMEIRA DOBRA (Hero Section) ============= */}
        <div className="mb-12 animate-fade-in">
          {/* Título principal */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              🎯 Seu resultado está pronto — veja o que sua personalidade revela e descubra seu futuro no serviço público!
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Com base nas suas respostas, identificamos seu tipo de personalidade e encontramos{" "}
              <strong>o concurso público ideal para você.</strong><br />
              Veja seu mini resultado e desbloqueie seu plano completo com tudo que precisa para começar hoje mesmo 👇
            </p>
          </div>

          {/* Grid: Mini Resultado + Oferta Principal (lado a lado) */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            
            {/* MINI RESULTADO (Esquerda) */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 h-full">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  Resultado Parcial Gratuito
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Seu Perfil de Personalidade</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tipo de Personalidade:</p>
                  <p className="text-lg font-bold text-primary">
                    {riasecData.top1} + {riasecData.top2}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Habilidades-chave:</p>
                  <div className="flex flex-wrap gap-2">
                    {riasecData.habilidades.slice(0, 4).map((hab, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {hab}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Áreas que combinam com você:</p>
                  <p className="text-sm font-medium">{riasecData.contexto_profissional}</p>
                </div>
              </div>
            </Card>

            {/* OFERTA PRINCIPAL (Direita) */}
            <Card className="p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-2 border-primary/30 h-full">
              <h3 className="text-xl font-bold mb-3">
                💼 Seu cargo ideal está pronto para ser revelado!
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                De acordo com seu perfil <strong className="text-primary">{riasecData.top1} + {riasecData.top2}</strong>, 
                encontramos o <strong>cargo público ideal</strong> para o seu jeito de ser.
              </p>

              <div className="bg-card rounded-lg p-4 mb-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>🧠 <strong>Nome do cargo e salário inicial real</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>📅 <strong>Previsão do próximo edital</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>🎯 <strong>Plano de estudos de 30 dias personalizado</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>🤖 <strong>Professor de IA</strong> que corrige, ensina e faz simulados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>🎓 <strong>3 melhores cursinhos</strong> com até <strong>50% de desconto</strong></span>
                </div>
              </div>

              <p className="text-xs italic text-muted-foreground mb-4 border-l-2 border-primary pl-3">
                Por menos do que um hambúrguer, você investe no seu futuro e descobre o caminho certo pra conquistar estabilidade e propósito.
              </p>

              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-4 mb-3 text-center">
                <p className="text-2xl font-bold text-amber-600 mb-1">
                  R$ 25<span className="text-base">,00</span>
                </p>
                <p className="text-xs text-muted-foreground">Pagamento único • Acesso imediato</p>
              </div>

              <MercadoPagoButton
                userName={userName}
                userEmail={userEmail}
                quizResponseId={quizResponseId}
                productId="resultado-completo"
                amount={25}
              />

              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  🔒 Pagamento seguro
                </span>
                <span>Acesso imediato</span>
                <span>Sem mensalidades</span>
              </div>
            </Card>
          </div>
        </div>

        {/* ============= BLOCO 2: DETALHES (ao rolar) ============= */}
        <div className="mb-8 animate-scale-in">
          <Card className="p-8 bg-card border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-6">
              🟢 Seu Perfil RIASEC Completo
            </h3>
            
            <p className="text-base leading-relaxed mb-6">
              <strong>{userName.split(' ')[0]}</strong>, seu perfil mostra que você é predominantemente{" "}
              <strong className="text-primary">{riasecData.top1}</strong>, com traços de{" "}
              <strong className="text-accent">{riasecData.top2}</strong>.
            </p>
            
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Pessoas assim se destacam por serem <strong>{riasecData.habilidade_destaque}</strong>, o que as torna ideais para{" "}
              <strong>cargos públicos que exigem {riasecData.contexto_profissional}.</strong>
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Habilidades do seu perfil</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {riasecData.habilidades.map((hab, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {hab}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Cargo recomendado</p>
                <p className="font-semibold text-lg blur-sm select-none">{recommendation.careerName}</p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Salário inicial</p>
                <p className="font-semibold text-primary">{recommendation.salary.split(' - ')[0]}</p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Salário com progressão</p>
                <p className="font-semibold blur-sm select-none">R$ 18.500,00</p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Frequência de concursos</p>
                <p className="font-semibold blur-sm select-none">{recommendation.examFrequency}</p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Próximo edital previsto</p>
                <p className="font-semibold blur-sm select-none">{recommendation.examDate}</p>
              </div>
            </div>

            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-destructive" />
                <p className="text-sm font-semibold text-destructive">Atenção: Dados temporários</p>
              </div>
              <p className="text-sm text-muted-foreground">
                🕒 Esses dados ficam salvos por apenas <strong>5 minutos</strong>. Após esse tempo, o sistema apaga automaticamente por segurança.
              </p>
              <div className="mt-3">
                <CountdownTimer initialMinutes={5} />
              </div>
            </div>
          </Card>
        </div>

        {/* Scores RIASEC detalhados (se disponíveis) */}
        {riasecData.scores && (
          <div className="mb-8 animate-scale-in">
            <RiasecScores scores={riasecData.scores} />
          </div>
        )}

        {/* ============= BLOCO 3: SEGUNDA OFERTA (reforço após rolar) ============= */}
        <div className="mb-8 animate-fade-in">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/30">
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                💬 Quer o resultado completo? Ele já está pronto pra você!
              </h3>
              
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Desbloqueie agora e receba:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">O nome do seu cargo ideal</p>
                  <p className="text-sm text-muted-foreground">Cargo que combina com seu perfil</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Plano de estudos de 30 dias</p>
                  <p className="text-sm text-muted-foreground">Cronograma detalhado e personalizado</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Professor/Coach de IA</p>
                  <p className="text-sm text-muted-foreground">Simulados, correções e ensino 24/7</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Desconto exclusivo até 50%</p>
                  <p className="text-sm text-muted-foreground">Nos melhores cursinhos preparatórios</p>
                </div>
              </div>
            </div>

            <p className="text-center text-base text-muted-foreground mb-6">
              🚀 Comece ainda hoje a estudar com clareza e propósito.
            </p>

            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-6 mb-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground line-through mb-1">De R$ 50</p>
                <p className="text-4xl font-bold text-amber-600 mb-1">
                  R$ 25<span className="text-lg">,00</span>
                </p>
                <div className="inline-block px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-bold mb-2">
                  50% OFF
                </div>
                <p className="text-sm text-muted-foreground">Pagamento único • Acesso imediato</p>
              </div>

              <MercadoPagoButton
                userName={userName}
                userEmail={userEmail}
                quizResponseId={quizResponseId}
                productId="resultado-completo"
                amount={25}
              />
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                🔒 Pagamento seguro
              </span>
              <span>Acesso imediato</span>
              <span>Sem mensalidades</span>
            </div>
          </Card>
        </div>

        {/* ============= BLOCO 4: DEPOIMENTOS (Prova Social) ============= */}
        <div className="mb-8 animate-fade-in">
          <Card className="p-8 bg-card">
            <h3 className="text-2xl font-bold text-center mb-8">
              💬 Quem já fez o teste, se encontrou de verdade!
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Isabela, 19 anos",
                  text: "Eu estava perdida, sem saber se fazia faculdade ou concurso. O teste me mostrou que meu perfil é mais prático e que o caminho certo é o concurso administrativo.",
                  rating: 5
                },
                {
                  name: "Lucas, 20 anos",
                  text: "Eu fazia vários testes gratuitos, mas nenhum fazia sentido. Esse foi o único que me deu direção e até indicou o cursinho certo pra mim.",
                  rating: 5
                },
                {
                  name: "Camila, 21 anos",
                  text: "R$ 25 parece pouco, mas o que recebi vale muito mais. Agora sei qual concurso seguir e já comecei meu plano de estudos.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-5 border-2 border-primary/10">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    "{testimonial.text}"
                  </p>
                  <p className="text-xs font-semibold">
                    — {testimonial.name}
                  </p>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* ============= BLOCO 5: ENCERRAMENTO EMOCIONAL ============= */}
        <div className="text-center mb-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary animate-fade-in">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">🌟 Você já deu o primeiro passo. Agora é hora de agir!</h3>
          <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            {userName.split(' ')[0]}, seu perfil já revelou seu potencial — agora só falta você desbloquear e ver qual cargo realmente combina com seu jeito de ser.<br />
            Por <strong className="text-primary">R$ 25</strong>, você garante acesso completo e dá o primeiro passo pra mudar seu futuro.
          </p>
          
          <MercadoPagoButton
            userName={userName}
            userEmail={userEmail}
            quizResponseId={quizResponseId}
            productId="resultado-completo"
            amount={25}
          />
        </div>
      </div>

        <Footer />

        {/* Pop-up de Prova Social (mantém o mesmo) */}
        <SocialProofPopup />

        {/* Sticky CTA for mobile */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border md:hidden z-50 animate-fade-in">
          <MercadoPagoButton
            userName={userName}
            userEmail={userEmail}
            quizResponseId={quizResponseId}
            productId="resultado-completo"
            amount={25}
          />
        </div>
      </div>
    </>
  );
};

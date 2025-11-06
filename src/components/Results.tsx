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
        <div className="container mx-auto px-4 max-w-4xl">
        {/* BLOCO 1: Cabeçalho */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-medium">Resultado Parcial Desbloqueado</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            🎯 Seu resultado está pronto — veja o que sua personalidade revela sobre você!
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Com base nas suas respostas, analisamos sua personalidade e identificamos seus principais pontos fortes.
            Este resultado é <strong>único</strong>, criado a partir do seu jeito de pensar e aprender.
            Você vai se reconhecer em cada linha — e o melhor: sua personalidade mostra <strong>que existe um concurso público ideal para você</strong>.
            <br />
            <span className="inline-block mt-2">👇 Veja abaixo sua análise gratuita e como desbloquear o resultado completo.</span>
          </p>
        </div>

        {/* BLOCO 2: Resultado Gratuito (Perfil RIASEC) */}
        <div className="mb-8 animate-scale-in">
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-background to-accent/5 border-2 border-primary/20">
            <div className="flex items-center gap-2 mb-6">
              <div className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                🟢 Perfil RIASEC Gratuito
              </div>
            </div>
            
            <p className="text-lg leading-relaxed mb-6">
              <strong>{userName.split(' ')[0]}</strong>, seu perfil mostra que você é predominantemente{" "}
              <strong className="text-primary">{riasecData.top1}</strong>, com traços de{" "}
              <strong className="text-accent">{riasecData.top2}</strong>.
            </p>
            
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Pessoas com esse tipo de personalidade se destacam por serem <strong>{riasecData.habilidade_destaque}</strong> e 
              por terem facilidade em <strong>{riasecData.contexto_profissional}</strong>.
              Essas características são exatamente o que os <strong>cargos públicos mais valorizados e bem pagos</strong> buscam em seus aprovados.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Além disso, com base em suas respostas, conseguimos identificar <strong>quais graduações combinam com seu perfil</strong> e{" "}
              <strong>quais concursos você pode prestar</strong>, mesmo sem ensino superior.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Tipo de Personalidade</p>
                <p className="font-semibold text-primary">{riasecData.top1} + {riasecData.top2}</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-sm text-muted-foreground mb-2">Habilidades Principais</p>
                <p className="font-semibold">{riasecData.habilidades.join(", ")}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-6 italic">
              🟢 Este é o seu perfil gratuito com base na metodologia RIASEC — reconhecida mundialmente em orientação profissional.
            </p>
          </Card>
        </div>

        {/* Scores RIASEC detalhados (se disponíveis) */}
        {riasecData.scores && (
          <div className="mb-8 animate-scale-in">
            <RiasecScores scores={riasecData.scores} />
          </div>
        )}

        {/* BLOCO 3: Oferta Principal (Primeira Dobra) */}
        <div className="mb-8 animate-scale-in">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-6">
              💡 Quer ver qual cargo combina com você e quanto pode ganhar?
            </h3>
            
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              De acordo com seu perfil <strong className="text-primary">{riasecData.top1} + {riasecData.top2}</strong>, 
              encontramos um <strong>cargo público ideal para o seu jeito de ser.</strong>
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="font-semibold">Salário inicial:</p>
                  <p className="text-lg text-primary">{recommendation.salary.split(' - ')[0]}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">📈</span>
                <div>
                  <p className="font-semibold">Salário com progressão:</p>
                  <p className="text-lg blur-[12px] select-none">R$ 18.500,00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-semibold">Previsão do próximo edital:</p>
                  <p className="text-lg blur-[12px] select-none">2º semestre de 2025</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-card rounded-lg border-2 border-primary/30 mb-6">
              <p className="text-base leading-relaxed">
                Para <strong>liberar o nome do cargo ideal, o salário com progressão e o próximo edital</strong>, 
                basta pagar um valor simbólico de <strong className="text-primary text-lg">R$ 25</strong>.
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Carreira Recomendada:</p>
              <h2 className="text-3xl font-bold blur-sm select-none mb-6">
                {recommendation.careerName}
              </h2>
            </div>

            <p className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4 my-6">
              R$ 25 é <strong>menos que um hambúrguer</strong>, mas pode te dar clareza sobre o que fazer pelo resto da vida —
              a direção certa para conquistar estabilidade e sustentar sua família com orgulho.
            </p>
          </Card>
        </div>


        {/* Oferta - Benefícios e CTA */}
        <div className="mb-8 animate-fade-in">
          <Card className="p-8 bg-card shadow-[var(--shadow-elevated)]">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full mb-4">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-600">Oferta por Tempo Limitado</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                🎯 Desbloqueie Seu Resultado Completo
              </h2>
              
              <CountdownTimer initialMinutes={5} />
            </div>

            <div className="space-y-4 mb-8">
              <p className="font-semibold text-lg mb-4">Com esse desbloqueio, você também recebe:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Nome do Cargo Ideal</p>
                    <p className="text-sm text-muted-foreground">Cargo público que combina com seu perfil</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Salário Real Completo</p>
                    <p className="text-sm text-muted-foreground">Inicial e com progressão na carreira</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Previsão do Próximo Edital</p>
                    <p className="text-sm text-muted-foreground">Quando você pode prestar o concurso</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Plano de Estudos de 1 Mês</p>
                    <p className="text-sm text-muted-foreground">Cronograma personalizado e focado</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Professor/Coach de IA</p>
                    <p className="text-sm text-muted-foreground">Simulados, correções e orientação 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Análise do Edital</p>
                    <p className="text-sm text-muted-foreground">Matérias que mais caem e pesos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Indicação dos 3 Melhores Cursinhos</p>
                    <p className="text-sm text-muted-foreground">Estratégia, Gran e Nova Concursos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Cupom de até 50% de Desconto</p>
                    <p className="text-sm text-muted-foreground">Para o cursinho online ideal para você</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Graduação Ideal</p>
                    <p className="text-sm text-muted-foreground">Se você ainda não tem faculdade</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Grupo VIP WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Comunidade e suporte dedicado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground line-through">De R$ 50</p>
                  <p className="text-4xl font-bold text-amber-600">
                    R$ 25<span className="text-lg">,00</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Pagamento único • Acesso imediato</p>
                </div>
                <div className="text-right">
                  <div className="px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-bold">
                    50% OFF
                  </div>
                </div>
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
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>🔒 Pagamento seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Acesso imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Sem mensalidade</span>
              </div>
            </div>
          </Card>
        </div>

        {/* BLOCO 4: Detalhamento do Produto */}
        <div className="mb-8 animate-fade-in">
          <Card className="p-8 bg-card border-2 border-primary/20">
            <h3 className="text-2xl font-bold mb-6">🚀 Ao desbloquear seu resultado completo, você recebe:</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>O <strong>nome do cargo ideal</strong> segundo seu perfil</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>O <strong>salário real</strong> (inicial e progressão)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>A <strong>previsão do próximo edital</strong></span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>O <strong>plano de estudos de 1 mês</strong></span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>O <strong>Professor/Coach de IA</strong> com simulados e correções</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>A <strong>análise do edital</strong> com as matérias que mais caem</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>O <strong>melhor cursinho online</strong> com cupom de até <strong>50% de desconto</strong></span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>E, se você ainda não tem faculdade, <strong>a graduação que mais combina com você</strong></span>
              </div>
            </div>

            <MercadoPagoButton
              userName={userName}
              userEmail={userEmail}
              quizResponseId={quizResponseId}
              productId="resultado-completo"
              amount={25}
            />
          </Card>
        </div>

        {/* BLOCO 5: Prova Social + Escassez */}
        <div className="mb-12 animate-fade-in">
          <h3 className="text-2xl font-bold text-center mb-8">
            💬 Quem já fez o teste, se encontrou de verdade!
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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

          {/* Gatilho de escassez */}
          <div className="text-center mt-8 p-6 bg-destructive/5 rounded-lg border-2 border-destructive/20">
            <p className="text-destructive font-bold text-xl mb-4">
              ⚡ Seus dados ficarão salvos por apenas <strong>5 minutos</strong>.
            </p>
            <p className="text-muted-foreground mb-4">
              Após esse tempo, o sistema apaga automaticamente por segurança.
            </p>
            <CountdownTimer initialMinutes={5} />
          </div>
        </div>


        {/* BLOCO 7: Encerramento Emocional */}
        <div className="text-center mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary animate-fade-in">
          <h3 className="text-2xl font-bold mb-4">🌟 O seu futuro começa agora</h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            {userName.split(' ')[0]}, você já descobriu seu perfil e suas habilidades.
            Agora é o momento de transformar esse autoconhecimento em ação.
            Por apenas <strong className="text-primary">R$ 25</strong>, você descobre <strong>o concurso, a graduação e o plano de estudos ideais para seu perfil</strong>,
            e ainda ganha orientação com um professor de IA e descontos reais para começar a estudar hoje mesmo.
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

        {/* BLOCO 6: Pop-up de Prova Social */}
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
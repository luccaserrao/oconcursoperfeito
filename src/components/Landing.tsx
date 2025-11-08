import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2, Clock, Users, Award, Target, Heart, Star, Brain, Shield, TrendingUp, X } from "lucide-react";
import { useState } from "react";
import mariaPersona from "@/assets/maria-persona.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface LandingProps {
  onStart: () => void;
}

export const Landing = ({ onStart }: LandingProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            {/* Badge with real-time counter */}
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-pulse">
                <Users className="w-4 h-4" />
                <span className="font-bold">5.247</span> pessoas já descobriram sua carreira ideal
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Descubra qual{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                concurso público combina com você
              </span>
              {" "}e mude sua vida!
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Baseado na metodologia RIASEC, o teste revela suas habilidades, personalidade e o concurso ideal para o seu perfil. 
              Ideal para quem terminou o ensino médio ou quer recomeçar do zero no serviço público.
            </p>

            {/* CTA Button */}
            <Button 
              onClick={onStart}
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent"
            >
              Fazer o teste gratuito agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* SEÇÃO 2: Conexão Emocional */}
            <div className="pt-16">
              <Card className="p-8 max-w-3xl mx-auto bg-card border border-border">
                <div className="space-y-6 text-left">
                  <p className="text-lg text-foreground">
                    Você já fez vários testes vocacionais gratuitos e nenhum realmente te entendeu?
                  </p>
                  <p className="text-lg text-foreground">
                    Os resultados pareciam genéricos, sem dizer o que fazer depois?
                  </p>
                  <p className="text-lg font-medium text-foreground">
                    Nosso teste vai além: ele entende sua personalidade, cruza suas respostas com dados reais de concursos e mostra qual carreira pública faz sentido para você.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                      <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-destructive">Testes gratuitos</p>
                        <p className="text-sm text-muted-foreground">Respostas vagas e genéricas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-primary">Nosso teste</p>
                        <p className="text-sm text-muted-foreground">Resultado personalizado e aplicável</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* SEÇÃO 3: O Diferencial */}
            <div className="pt-16">
              <h2 className="text-3xl font-bold mb-4">💡 O que torna o nosso teste diferente?</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Enquanto outros testes apenas descrevem traços genéricos, o nosso utiliza o modelo <strong>RIASEC</strong>, validado por psicólogos, e combina com dados de concursos reais.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: <Target className="w-8 h-8 text-primary" />,
                    title: "Seu tipo de personalidade",
                    description: "Ex.: Realista + Investigativo"
                  },
                  {
                    icon: <Brain className="w-8 h-8 text-primary" />,
                    title: "Habilidades naturais",
                    description: "O que você faz de melhor"
                  },
                  {
                    icon: <Award className="w-8 h-8 text-primary" />,
                    title: "Resumo vocacional gratuito",
                    description: "Comece agora sem pagar nada"
                  }
                ].map((item, i) => (
                  <Card 
                    key={i} 
                    className="p-6 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 hover:scale-105"
                  >
                    <div className="mb-3">{item.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </Card>
                ))}
              </div>

              <Card className="p-8 bg-primary/5 border-primary/20 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  Ou desbloqueie o resultado completo
                </h3>
                <p className="text-center text-muted-foreground mb-6">
                  Após suas respostas, você pode optar por aprofundar seu resultado com:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    "Cargo público ideal para você",
                    "Salário inicial e progressão",
                    "Previsão do próximo edital",
                    "Plano de estudos de 1 mês",
                    "Professor/Coach de IA personalizado",
                    "Indicação do melhor cursinho com até 50% de desconto"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-lg font-semibold">
                  Por apenas <span className="text-2xl text-primary">R$ 25</span> para liberar o acesso completo
                </p>
              </Card>
            </div>

            {/* SEÇÃO 4: Histórias das Personas */}
            <div className="pt-16">
              <h2 className="text-3xl font-bold mb-8">🎯 Histórias reais de quem mudou de rumo</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="p-6 hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                      <img src={mariaPersona} alt="Maria, 21 anos" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold">Maria, 21 anos</p>
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mt-1">
                        Descobriu carreira administrativa
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "Terminei o ensino médio sem saber o que fazer. Fiz o teste e descobri que meu perfil combina com a área administrativa — agora sei o caminho certo!"
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-2xl">👨‍💼</span>
                    </div>
                    <div>
                      <p className="font-bold">João, 28 anos</p>
                      <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs rounded-full mt-1">
                        Redirecionou para cargo analítico
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "Estudava há 3 anos para o concurso errado. O teste mostrou que eu tinha perfil analítico e estratégico — agora estudo para o cargo certo!"
                  </p>
                </Card>
              </div>
            </div>

            {/* SEÇÃO 5: Autoridade RIASEC */}
            <div className="pt-16">
              <Card className="p-8 max-w-4xl mx-auto bg-primary/5 border-primary/20">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Shield className="w-16 h-16 text-primary" />
                  <h2 className="text-3xl font-bold">🧠 Metodologia RIASEC — usada por psicólogos e universidades</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    O teste RIASEC foi desenvolvido pelo psicólogo americano John Holland e é usado há décadas em universidades e processos de orientação profissional. 
                    Nós adaptamos esse método ao mundo dos concursos públicos com apoio de Inteligência Artificial.
                  </p>
                  <div className="flex gap-3 pt-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      Validado cientificamente
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      <Award className="w-4 h-4" />
                      Usado em universidades
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* SEÇÃO 6: CTA Intermediária */}
            <div className="pt-16">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold">🚀 Dê o primeiro passo para descobrir o seu futuro</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Faça o teste gratuitamente e receba sua orientação vocacional agora mesmo.
                  </p>
                  <p>
                    Entenda seu perfil, descubra suas habilidades e veja uma amostra do concurso que mais combina com você.
                  </p>
                  <p>
                    Depois, se quiser, desbloqueie o resultado completo e saiba <strong>qual cargo é ideal para o seu perfil</strong>, com <strong>plano de estudos, cursinho com desconto e coach de IA</strong>.
                  </p>
                </div>
                <Button 
                  onClick={onStart}
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent"
                >
                  Fazer o teste gratuito agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-sm text-muted-foreground">
                  ✅ 100% gratuito • ⏱️ 7 minutos • 🔒 Dados protegidos
                </p>
              </div>
            </div>

            {/* SEÇÃO 7: Prova Social (Depoimentos) */}
            <div className="pt-16">
              <h2 className="text-3xl font-bold mb-8">⭐ Mais de 5.000 pessoas já descobriram sua carreira ideal</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    text: "Achei que seria só mais um teste, mas ele realmente me mostrou um caminho!",
                    name: "Ana Paula S."
                  },
                  {
                    text: "Valeu demais. Descobri o concurso certo pra mim!",
                    name: "Carlos Eduardo M."
                  },
                  {
                    text: "Finalmente entendi qual área combina com minha personalidade",
                    name: "Juliana M."
                  }
                ].map((testimonial, i) => (
                  <Card 
                    key={i} 
                    className="p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300"
                  >
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm">👤</span>
                      </div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* SEÇÃO 8: Fechamento */}
            <div className="pt-16">
              <h2 className="text-3xl font-bold mb-4">💬 O primeiro passo do seu futuro começa agora</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Nosso teste gratuito vai te mostrar quem você é, o que te motiva e qual caminho seguir.
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Clique abaixo e descubra seu perfil vocacional agora mesmo.
              </p>
              <Button 
                onClick={onStart}
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent animate-pulse"
              >
                Fazer o teste gratuito agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* FAQ */}
            <div className="pt-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
              <Accordion type="single" collapsible className="w-full text-left">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    É realmente grátis?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! O quiz e a recomendação básica são 100% gratuitos. 
                    Oferecemos também um Resultado Completo opcional (R$ 25) com cargo ideal, 
                    salário, plano de estudos, coach de IA e indicação de cursinho com desconto.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Quanto tempo leva?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    O quiz tem 25 perguntas e leva em média 7-10 minutos. 
                    Você recebe o resultado imediatamente após finalizar.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    As recomendações são confiáveis?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! Nossa IA foi treinada com dados reais de concursos públicos, 
                    salários oficiais e perfis de milhares de aprovados. Já ajudamos 
                    mais de 5.000 pessoas a encontrarem sua carreira ideal.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Vou receber spam?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Não! Enviamos apenas seu resultado e, opcionalmente, 
                    informações sobre o Resultado Completo. Você pode cancelar 
                    o recebimento de e-mails a qualquer momento.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Posso fazer o quiz mais de uma vez?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! Você pode refazer o quiz quantas vezes quiser. 
                    Cada nova análise considera suas respostas mais recentes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Final social proof */}
            <div className="pt-8">
              <p className="text-sm text-muted-foreground">
                🔥 <strong>31 pessoas</strong> fizeram o quiz na última hora
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

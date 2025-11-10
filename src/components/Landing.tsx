import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Users,
  Award,
  Target,
  Star,
  Brain,
  Shield,
  TrendingUp,
  X,
} from "lucide-react";
import mariaPersona from "@/assets/maria-persona.jpg";
import joaoPersona from "@/assets/joao-persona.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface LandingProps {
  onStart: () => void;
}

const CTA_BUTTON_CLASSES =
  "group h-auto rounded-full bg-gradient-to-r from-[#7c3aed] via-[#6366f1] to-[#0ea5e9] px-8 py-4 text-base font-semibold tracking-tight text-white shadow-[0_20px_45px_-18px_rgba(99,102,241,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_55px_-18px_rgba(14,165,233,0.75)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:px-10 md:py-5 md:text-lg";

const heroFeatures = [
  {
    icon: Shield,
    title: "Método RIASEC validado",
    description: "Traduzido para concursos públicos",
  },
  {
    icon: Clock,
    title: "Resultado em 7 minutos",
    description: "Comece agora mesmo, sem custo",
  },
  {
    icon: TrendingUp,
    title: "Plano para sair na frente",
    description: "Mostramos o caminho e os próximos passos",
  },
] as const;

const credibilityHighlights = [
  {
    icon: Target,
    title: "Baseado em dados reais",
    description: "Cruzamos editais, salários e perfis aprovados",
  },
  {
    icon: Users,
    title: "+10 mil concurseiros",
    description: "Testado e aprovado por iniciantes e veteranos",
  },
  {
    icon: Award,
    title: "Especialistas + IA",
    description: "Metodologia RIASEC adaptada para concursos",
  },
] as const;

export const Landing = ({ onStart }: LandingProps) => {
  return (
    <>
      <div className="bg-background text-foreground">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#6d28d9] via-[#4338ca] to-[#0ea5e9]">
          <div className="absolute inset-0 -z-10 opacity-20 blur-3xl" aria-hidden>
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_55%)]" />
          </div>
          <div className="container mx-auto px-4 py-20 sm:py-24">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                <Users className="h-4 w-4" aria-hidden />
                <span className="font-semibold">10.842</span> pessoas já iniciaram o teste nas últimas semanas
              </span>

              <h1 className="mt-6 text-balance text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Descubra agora o concurso público que tem a sua cara
              </h1>

              <p className="mt-6 text-pretty text-lg text-white/80 sm:text-xl">
                Em menos de 7 minutos, nossa IA cruza sua personalidade com dados reais de concursos e revela a carreira que combina com você — com um plano claro para começar hoje mesmo.
              </p>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                <Button onClick={onStart} size="lg" className={CTA_BUTTON_CLASSES}>
                  Quero começar meu teste agora
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Button>
                <p className="text-sm text-white/80">⚡ Grátis, rápido e com resultado imediato</p>
              </div>

              <div className="mt-12 grid w-full gap-4 sm:grid-cols-3">
                {heroFeatures.map(({ icon: Icon, title, description }) => (
                  <Card
                    key={title}
                    className="flex flex-col items-center gap-2 rounded-2xl border-white/20 bg-white/10 p-5 text-center text-sm font-medium text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="text-base font-semibold">{title}</span>
                    <p className="text-xs text-white/70">{description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-16 pt-12 sm:pb-24 sm:pt-16">
          <div className="mx-auto max-w-5xl space-y-16 md:space-y-20">
            {/* Credibility strip */}
            <div className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur">
              <div className="grid gap-6 text-center sm:grid-cols-3">
                {credibilityHighlights.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="flex flex-col items-center gap-3 rounded-2xl bg-background/70 p-5 text-sm shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" aria-hidden />
                    </div>
                    <p className="text-base font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SEÇÃO 2: Conexão Emocional */}
            <section>
              <Card className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-lg">
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

                  <div className="grid gap-4 pt-4 md:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                      <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
                      <div>
                        <p className="font-semibold text-destructive">Testes gratuitos</p>
                        <p className="text-sm text-muted-foreground">Respostas vagas e genéricas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/10 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold text-primary">Nosso teste</p>
                        <p className="text-sm text-muted-foreground">Resultado personalizado e aplicável</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* SEÇÃO 3: O Diferencial */}
            <section>
              <h2 className="mb-4 text-3xl font-bold">💡 O que torna o nosso teste diferente?</h2>
              <p className="mx-auto mb-8 max-w-3xl text-lg text-muted-foreground">
                Enquanto outros testes apenas descrevem traços genéricos, o nosso utiliza o modelo <strong>RIASEC</strong>, validado por psicólogos, e combina com dados de concursos reais.
              </p>

              <div className="mb-8 grid gap-6 md:grid-cols-3">
                {[
                  {
                    icon: <Target className="h-8 w-8 text-primary" aria-hidden />,
                    title: "Seu tipo de personalidade",
                    description: "Ex.: Realista + Investigativo",
                  },
                  {
                    icon: <Brain className="h-8 w-8 text-primary" aria-hidden />,
                    title: "Habilidades naturais",
                    description: "O que você faz de melhor",
                  },
                  {
                    icon: <Award className="h-8 w-8 text-primary" aria-hidden />,
                    title: "Resumo vocacional gratuito",
                    description: "Comece agora sem pagar nada",
                  },
                ].map((item) => (
                  <Card
                    key={item.title}
                    className="group rounded-2xl border border-border/70 p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.85)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_28px_60px_-32px_rgba(59,130,246,0.65)]"
                  >
                    <div className="mb-3">{item.icon}</div>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>

              <Card className="mx-auto max-w-4xl rounded-3xl border border-primary/30 bg-primary/5 p-8 shadow-[0_20px_50px_-35px_rgba(79,70,229,0.6)]">
                <h3 className="mb-4 text-center text-2xl font-bold">Ou desbloqueie o resultado completo</h3>
                <p className="mb-6 text-center text-muted-foreground">
                  Após suas respostas, você pode optar por aprofundar seu resultado com:
                </p>
                <div className="mb-6 grid gap-4 md:grid-cols-2">
                  {[
                    "Cargo público ideal para você",
                    "Salário inicial e progressão",
                    "Previsão do próximo edital",
                    "Plano de estudos de 1 mês",
                    "Professor/Coach de IA personalizado",
                    "Indicação do melhor cursinho com até 50% de desconto",
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2 text-left">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-lg font-semibold">
                  Por apenas <span className="text-2xl text-primary">R$ 25</span> para liberar o acesso completo
                </p>
              </Card>
            </section>

            {/* SEÇÃO 4: Histórias das Personas */}
            <section>
              <h2 className="mb-8 text-3xl font-bold">🎯 Histórias reais de quem mudou de rumo</h2>
              <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                {[{
                  name: "Maria, 21 anos",
                  highlight: "Descobriu carreira administrativa",
                  quote:
                    "Terminei o ensino médio sem saber o que fazer. Fiz o teste e descobri que meu perfil combina com a área administrativa — agora sei o caminho certo!",
                  image: mariaPersona,
                  badgeColor: "primary",
                }, {
                  name: "João, 28 anos",
                  highlight: "Redirecionou para cargo analítico",
                  quote:
                    "Estudava há 3 anos para o concurso errado. O teste mostrou que eu tinha perfil analítico e estratégico — agora estudo para o cargo certo!",
                  image: joaoPersona,
                  badgeColor: "accent",
                }].map((persona) => (
                  <Card
                    key={persona.name}
                    className="group rounded-2xl border border-border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={cn(
                          "h-12 w-12 overflow-hidden rounded-full border-2",
                          persona.badgeColor === "primary" ? "border-primary/20" : "border-accent/20",
                        )}
                      >
                        <img
                          src={persona.image}
                          alt={persona.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div>
                        <p className="font-bold">{persona.name}</p>
                        <span
                          className={cn(
                            "mt-1 inline-block rounded-full px-2 py-1 text-xs",
                            persona.badgeColor === "primary"
                              ? "bg-primary/10 text-primary"
                              : "bg-accent/10 text-accent",
                          )}
                        >
                          {persona.highlight}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">“{persona.quote}”</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* SEÇÃO 5: Autoridade RIASEC */}
            <section>
              <Card className="mx-auto max-w-4xl rounded-3xl border border-primary/25 bg-primary/5 p-8 shadow-[0_25px_60px_-40px_rgba(79,70,229,0.6)]">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Shield className="h-16 w-16 text-primary" aria-hidden />
                  <h2 className="text-3xl font-bold">🧠 Metodologia RIASEC — usada por psicólogos e universidades</h2>
                  <p className="max-w-2xl text-lg text-muted-foreground">
                    O teste RIASEC foi desenvolvido pelo psicólogo americano John Holland e é usado há décadas em universidades e processos de orientação profissional. Nós adaptamos esse método ao mundo dos concursos públicos com apoio de Inteligência Artificial.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                      Validado cientificamente
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      <Award className="h-4 w-4" aria-hidden />
                      Usado em universidades
                    </span>
                  </div>
                </div>
              </Card>
            </section>

            {/* SEÇÃO 6: CTA Intermediária */}
            <section>
              <div className="mx-auto max-w-3xl space-y-6 text-center">
                <h2 className="text-3xl font-bold">🚀 Dê o primeiro passo para descobrir o seu futuro</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>Faça o teste gratuitamente e receba sua orientação vocacional agora mesmo.</p>
                  <p>Entenda seu perfil, descubra suas habilidades e veja uma amostra do concurso que mais combina com você.</p>
                  <p>
                    Depois, se quiser, desbloqueie o resultado completo e saiba <strong>qual cargo é ideal para o seu perfil</strong>, com <strong>plano de estudos, cursinho com desconto e coach de IA</strong>.
                  </p>
                </div>
                <Button onClick={onStart} size="lg" className={CTA_BUTTON_CLASSES}>
                  Quero começar meu teste agora
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Button>
                <p className="text-sm text-muted-foreground">✅ 100% gratuito • ⏱️ 7 minutos • 🔒 Dados protegidos</p>
              </div>
            </section>

            {/* SEÇÃO 7: Prova Social (Depoimentos) */}
            <section>
              <h2 className="mb-8 text-3xl font-bold">⭐ Mais de 5.000 pessoas já descobriram sua carreira ideal</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {[{
                  text: "Achei que seria só mais um teste, mas ele realmente me mostrou um caminho!",
                  name: "Ana Paula S.",
                },
                {
                  text: "Valeu demais. Descobri o concurso certo pra mim!",
                  name: "Carlos Eduardo M.",
                },
                {
                  text: "Finalmente entendi qual área combina com minha personalidade",
                  name: "Juliana M.",
                }].map((testimonial) => (
                  <Card
                    key={testimonial.name}
                    className="rounded-3xl border border-border/60 bg-card/90 p-6 shadow-[0_20px_40px_-35px_rgba(15,23,42,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_28px_60px_-32px_rgba(79,70,229,0.45)]"
                  >
                    <div className="mb-3 flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Star key={`${testimonial.name}-${index}`} className="h-4 w-4 fill-primary text-primary" aria-hidden />
                      ))}
                    </div>
                    <p className="mb-4 text-sm italic text-muted-foreground">“{testimonial.text}”</p>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">👤</div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* SEÇÃO 8: Fechamento */}
            <section className="text-center">
              <h2 className="mb-4 text-3xl font-bold">💬 O primeiro passo do seu futuro começa agora</h2>
              <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
                Nosso teste gratuito vai te mostrar quem você é, o que te motiva e qual caminho seguir.
              </p>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Clique abaixo e descubra seu perfil vocacional agora mesmo.
              </p>
              <Button onClick={onStart} size="lg" className={`${CTA_BUTTON_CLASSES} animate-pulse`}>
                Quero meu resultado gratuito agora
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Button>
            </section>

            {/* FAQ */}
            <section className="mx-auto max-w-2xl pt-12">
              <h2 className="mb-6 text-2xl font-bold">Perguntas Frequentes</h2>
              <Accordion type="single" collapsible className="w-full text-left">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">É realmente grátis?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! O quiz e a recomendação básica são 100% gratuitos. Oferecemos também um Resultado Completo opcional (R$ 25) com cargo ideal, salário, plano de estudos, coach de IA e indicação de cursinho com desconto.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">Quanto tempo leva?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    O quiz tem 25 perguntas e leva em média 7-10 minutos. Você recebe o resultado imediatamente após finalizar.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">As recomendações são confiáveis?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! Nossa IA foi treinada com dados reais de concursos públicos, salários oficiais e perfis de milhares de aprovados. Já ajudamos mais de 5.000 pessoas a encontrarem sua carreira ideal.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">Vou receber spam?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Não! Enviamos apenas seu resultado e, opcionalmente, informações sobre o Resultado Completo. Você pode cancelar o recebimento de e-mails a qualquer momento.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">Posso fazer o quiz mais de uma vez?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim! Você pode refazer o quiz quantas vezes quiser. Cada nova análise considera suas respostas mais recentes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Final social proof */}
            <section>
              <p className="text-sm text-muted-foreground">🔥 <strong>31 pessoas</strong> fizeram o quiz na última hora</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

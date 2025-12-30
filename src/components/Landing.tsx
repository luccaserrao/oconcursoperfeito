import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Layers,
  MapPin,
  Sparkles,
  Star,
  Target,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface LandingProps {
  onStart: () => void;
}

export const Landing = ({ onStart }: LandingProps) => {
  const heroPhrases = useMemo(
    () => [
      "baseado na sua personalidade",
      "baseado na sua experiência com provas anteriores",
      "baseado na sua formação acadêmica",
      "baseado no estado onde deseja construir carreira",
    ],
    []
  );
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    let timeout: number | undefined;
    const interval = window.setInterval(() => {
      setHeroVisible(false);
      timeout = window.setTimeout(() => {
        setHeroIndex((prev) => (prev + 1) % heroPhrases.length);
        setHeroVisible(true);
      }, 220);
    }, 2000);

    return () => {
      clearInterval(interval);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [heroPhrases]);

  const howItems = [
    { title: "Personalidade (RIASEC)", icon: <Sparkles className="w-5 h-5 text-primary" /> },
    { title: "Formação acadêmica e habilidades", icon: <BookOpen className="w-5 h-5 text-primary" /> },
    { title: "Histórico com provas anteriores", icon: <Layers className="w-5 h-5 text-primary" /> },
    { title: "Objetivo de carreira e qualidade de vida", icon: <Target className="w-5 h-5 text-primary" /> },
    { title: "Localização onde deseja construir carreira", icon: <MapPin className="w-5 h-5 text-primary" /> },
  ];

  const whatYouReceive = [
    "Ranking dos concursos mais compatíveis (3 concursos públicos ideais)",
    "Descrição prática do dia a dia no trabalho",
    "Faixa salarial e tempo estimado de estudo",
    "Orientação para editais e provas anteriores",
    "Plano de estudo alinhado ao edital",
    "Assistente de Estudos para organizar o cronograma",
  ];

  const testimonials = [
    {
      quote:
        "“Obrigada pela análise! Creio que são 3 boas opções dentro da minha área que demandam menos estresse cognitivo. E a opção número 1 é exatamente meu foco hoje: área pericial… Foi o motivo para eu fazer o PIX, para contribuir com o trabalho :).”",
      name: "Bruna, área pericial",
    },
    {
      quote:
        "“Consegui ver sim, tem vínculo com meu perfil. Agora vou pensar em algo relacionado à transição de carreira, pois trabalho com engenharia ambiental.”",
      name: "Diogo, engenharia ambiental",
    },
  ];

  const differentiators = [
    "Futuro Perfeito é tocado por uma pessoa, com melhoria contínua a cada feedback para entregar um futuro cada vez mais perfeito para você.",
    "Atendimento próximo: respondo direto e ajusto o produto com base nas dúvidas reais dos clientes.",
    "Transparente e simples: pagamento único de R$ 25 para o relatório completo, sem assinatura ou recorrência.",
    "Base em método (RIASEC) + dados reais, sem promessas milagrosas.",
  ];

  const steps = [
    { title: "Responda ao teste", desc: "Leva 7-10 minutos e já é gratuito.", icon: <Sparkles className="w-5 h-5 text-primary" /> },
    { title: "Veja seus insights", desc: "Receba os primeiros encaixes e pontos fortes na hora.", icon: <Target className="w-5 h-5 text-primary" /> },
    {
      title: "Destrave o relatório completo",
      desc: "Se fizer sentido, por R$ 25 você recebe ranking de concursos e plano detalhado (pagamento único).",
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto space-y-16 animate-fade-in">
            <div className="text-center space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                Descubra o concurso que combina com você —{" "}
                <span className="block md:inline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  <span
                    className="relative inline-flex items-center justify-center min-h-[34px] sm:min-h-[40px] md:min-h-[44px]"
                  >
                    <span
                      className={`absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-inherit transition-opacity duration-300 ${heroVisible ? "opacity-100" : "opacity-0"}`}
                    >
                      {heroPhrases[heroIndex]}
                    </span>
                    <span className="opacity-0 text-2xl sm:text-3xl md:text-inherit">baseado na sua personalidade</span>
                  </span>
                </span>
              </h1>

              <div className="flex justify-center">
                <div className="relative w-full max-w-3xl h-14 sm:h-16 md:h-20" style={{ perspective: "1200px" }}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/15 via-accent/10 to-primary/15 blur-md" />
                  <div className="relative h-full overflow-hidden rounded-2xl border border-primary/20 bg-white/50 backdrop-blur-sm shadow-[var(--shadow-elevated)]">
                    {heroPhrases.map((phrase, index) => (
                      <div
                        key={phrase}
                        className="absolute inset-0 flex items-center justify-center text-base sm:text-lg md:text-xl font-semibold text-primary transition-all duration-500 ease-out"
                        style={{
                          opacity: heroIndex === index ? 1 : 0,
                          transform: heroIndex === index ? "translateZ(40px) rotateX(0deg)" : "translateZ(-40px) rotateX(-70deg)",
                        }}
                      >
                        {phrase}
                      </div>
                    ))}
                    <div className="opacity-0 text-base sm:text-lg md:text-xl">baseado na sua personalidade</div>
                  </div>
                </div>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Um relatório personalizado que transforma suas informações em um plano claro — mostrando quais concursos realmente valem seu tempo e como estudar com método, sem promessas milagrosas ou testes genéricos.
              </p>

              <div className="flex flex-col items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Centenas de pessoas já fizeram o teste e avaliaram positivamente a experiência.
                </div>
                <Button
                  onClick={onStart}
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent"
                >
                  Começar meu teste agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-sm text-muted-foreground">Teste gratuito, leva 7–10 minutos para responder.</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Relatório completo custa R$ 25 (pagamento único, sem assinatura) — menos do que um hambúrguer para evitar meses no edital errado.
                </p>
                <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Pagamento único, sem assinatura
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Dados protegidos
                  </span>
                </div>
              </div>
            </div>

            <section>
              <Card className="p-8 bg-card border border-border">
                <div className="space-y-4 text-left">
                  <h2 className="text-3xl font-bold">Você estuda muito… mas cresce pouco.</h2>
                  <p className="text-lg text-foreground">
                    O maior problema não é a quantidade de horas de estudo, e sim escolher o concurso errado para o seu perfil e realidade.
                  </p>
                  <p className="text-lg text-foreground">
                    Muita gente segue listas aleatórias e passa anos sem resultado. O Futuro Perfeito foi criado para acabar com essa perda de tempo: ele mostra o caminho certo, de acordo com quem você é e onde quer chegar.
                  </p>
                </div>
              </Card>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Como o Futuro Perfeito funciona: analisamos</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {howItems.map((item, index) => (
                  <Card key={index} className="p-5 flex items-center gap-3 h-full">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <p className="font-semibold leading-snug">{item.title}</p>
                  </Card>
                ))}
              </div>
              <Card className="p-6 bg-primary/5 border-primary/20 text-center">
                <p className="text-lg">Com isso, o relatório indica concursos compatíveis e um plano de estudo realista.</p>
              </Card>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Futuro Perfeito: feito por uma pessoa, evoluindo sempre</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {differentiators.map((item, index) => (
                  <Card key={index} className="p-5 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                    <p>{item}</p>
                  </Card>
                ))}
              </div>
              <Card className="p-6 bg-primary/5 border-primary/20 text-center space-y-3">
                <p className="text-lg">
                  Você começa respondendo ao teste gratuitamente, vê seus primeiros insights e só paga se quiser receber o relatório completo, detalhado e personalizado.
                </p>
                <p className="text-sm text-muted-foreground">
                  O relatório completo custa R$ 25 — menos do que um hambúrguer — para te ajudar a decidir um caminho de concursos alinhado com o seu perfil.
                  Sem mensalidade, sem recorrência: pagamento único que evita anos de tentativa e erro.
                </p>
                <p className="text-sm text-muted-foreground">
                  Precisa falar direto comigo? WhatsApp:{" "}
                  <a className="text-primary font-semibold" href="https://wa.me/5591984233672" target="_blank" rel="noreferrer">
                    (91) 98423-3672
                  </a>
                </p>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-center">Como acontece na prática</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {steps.map((step, index) => (
                  <Card key={index} className="p-5 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </Card>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Seus dados ficam protegidos; envio no WhatsApp é opcional e não há assinatura escondida.
              </p>
            </section>

            <section className="grid md:grid-cols-2 gap-6 items-start">
              <Card className="p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Concursos alinhados com a sua realidade geográfica</h3>
                </div>
                <p className="text-muted-foreground text-lg">
                  Você pode focar na região onde já vive ou considerar outros estados. O relatório mostra oportunidades que realmente existem para o seu cenário — sem forçar ninguém a se mudar.
                </p>
              </Card>

              <Card className="p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold">Sua experiência com provas vira vantagem</h3>
                </div>
                <div className="space-y-2 text-muted-foreground text-lg">
                  <p>Usamos seu histórico para:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>identificar matérias onde você trava,</li>
                    <li>ajustar seu cronograma,</li>
                    <li>criar um plano eficiente para o seu momento atual.</li>
                  </ul>
                  <p className="font-medium text-foreground">Você não começa do zero — começa de onde está.</p>
                </div>
              </Card>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-bold text-center">O que você recebe</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {whatYouReceive.map((item, index) => (
                  <Card key={index} className="p-5 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1" />
                    <p>{item}</p>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Para quem o Futuro Perfeito foi feito</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-6 space-y-3">
                  <p className="font-semibold">É para quem:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1" />
                      <span>quer estabilidade com clareza e método,</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1" />
                      <span>já estudou sem resultados consistentes,</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1" />
                      <span>busca direção realista.</span>
                    </li>
                  </ul>
                </Card>
                <Card className="p-6 space-y-3">
                  <p className="font-semibold">Não é para quem:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <X className="w-4 h-4 text-destructive mt-1" />
                      <span>quer promessas mágicas,</span>
                    </li>
                    <li className="flex gap-2">
                      <X className="w-4 h-4 text-destructive mt-1" />
                      <span>não quer seguir um plano.</span>
                    </li>
                    <li className="flex gap-2">
                      <X className="w-4 h-4 text-destructive mt-1" />
                      <span>acredita em milagres sem esforço.</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-center">Depoimentos</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {testimonials.map((item, index) => (
                  <Card key={index} className="p-6 space-y-3 shadow-[var(--shadow-card)]">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star key={starIndex} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">{item.quote}</p>
                    <p className="font-semibold">{item.name}</p>
                  </Card>
                ))}
              </div>
            </section>

            <section className="text-center space-y-4">
              <h2 className="text-3xl font-bold">
                Você não precisa estudar mais. Precisa estudar com direção — para o concurso certo.
              </h2>
              <Button
                onClick={onStart}
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent"
              >
                Começar meu teste agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Teste gratuito para começar; o relatório completo é opcional, de pagamento único e sem recorrência.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

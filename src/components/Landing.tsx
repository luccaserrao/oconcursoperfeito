import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2, Star, Brain, Shield, Target, Award, X } from "lucide-react";
import { useEffect, useState } from "react";
import mariaPersona from "@/assets/maria-persona.jpg";
import joaoPersona from "@/assets/joao-persona.jpg";
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
  const [badgeOffset, setBadgeOffset] = useState(0);
  const [badgeIndex, setBadgeIndex] = useState(0);
  const [badgeVisible, setBadgeVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const move = Math.min(y * 0.2, 40);
      setBadgeOffset(move);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeVisible(false);
      const t = setTimeout(() => {
        setBadgeIndex((prev) => (prev === 0 ? 1 : 0));
        setBadgeVisible(true);
      }, 250);
      return () => clearTimeout(t);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            {/* Banner fixo com copy rotativa */}
            <div className="fixed inset-x-0 top-0 z-40" style={{ transform: `translateY(${2 + badgeOffset}px)` }}>
              <div className="px-4">
                <div
                  className={`w-full text-center text-white text-sm font-medium shadow-md transition-opacity duration-500 px-4 py-[10px] sm:py-[12px] rounded-b-[12px] ${badgeVisible ? "opacity-100" : "opacity-0"}`}
                  style={{ background: "linear-gradient(90deg, #c3b5ff 0%, #8a5aff 100%)" }}
                >
                  {badgeIndex === 0
                    ? "11.253 pessoas já descobriram um caminho seguro sem se expor"
                    : "Resultado em 5 minutos enviado direto para você, sem redes sociais"}
                </div>
              </div>
            </div>

            {/* Hero */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Estabilidade sem chute: descubra em 5 minutos o concurso que combina com você{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                sem estudar para o caminho errado
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Para quem quer sair do salário apertado rumo a estabilidade e 5-10 mil, com direção clara e sem se expor nas redes. O resultado e o plano inicial chegam direto para você.
            </p>

            <Button
              onClick={onStart}
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-[var(--shadow-elevated)] hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-primary to-accent"
            >
              Fazer o teste gratuito agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            {/* conexão com a dor da persona */}
            <div className="pt-16">
              <Card className="p-8 max-w-3xl mx-auto bg-card border border-border">
                <div className="space-y-6 text-left">
                  <p className="text-lg text-foreground">Se sente atrasada ou perdida sobre qual concurso escolher?</p>
                  <p className="text-lg text-foreground">Tem medo de gastar meses no edital errado e continuar no salário apertado?</p>
                  <p className="text-lg font-medium text-foreground">
                    Nosso teste cruza sua personalidade, rotina e faixa salarial com dados reais de concursos e já entrega um primeiro passo seguro para começar hoje.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                      <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-destructive">Tentativa e erro</p>
                        <p className="text-sm text-muted-foreground">Meses de estudo no concurso errado, sem clareza de próxima prova.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-primary">Teste O Concurso Perfeito</p>
                        <p className="text-sm text-muted-foreground">Encaixe com personalidade + plano de 7 dias para começar sem medo.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Diferenciais para a persona */}
            <div className="pt-16">
              <h2 className="text-3xl font-bold mb-4">O que você recebe agora no teste</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Simples, direto e acolhedor para quem quer estabilidade sem se expor.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: <Target className="w-8 h-8 text-primary" />,
                    title: "Encaixe com seu jeito de trabalhar",
                    description: "Adaptamos o método RIASEC para concursos e mostramos onde você rende mais (administrativo, atendimento, analítico)."
                  },
                  {
                    icon: <Brain className="w-8 h-8 text-primary" />,
                    title: "Lista curta de concursos certos",
                    description: "2 a 3 opções alinhadas ao seu perfil, estabilidade e salário alvo (5-10 mil)."
                  },
                  {
                    icon: <Award className="w-8 h-8 text-primary" />,
                    title: "Resumo gratuito em até 5 minutos",
                    description: "Sem cadastro complexo e sem se expor. só clicar, responder e ver seu resultado."
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
                  Depois do quiz, opcional: destravar resultado completo
                </h3>
                <p className="text-center text-muted-foreground mb-6">
                  Se fizer sentido para você, por R$ 25 liberamos um plano detalhado feito para quem quer estabilidade sem perder tempo.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    "Cargo indicado para seu estilo (tribunais, administrativo, segurança leve)",
                    "Faixa salarial inicial e progressão",
                    "próxima janela de edital e matérias prioritarias",
                    "Plano de estudo de 7 dias para sair do zero",
                    "Entrega por email e opcional WhatsApp sem aparecer",
                    "Cupom de desconto para cursinho parceiro"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-lg font-semibold">
                  R$ 25 com pagamento seguro. O teste básico continua 100% grátis.
                </p>
              </Card>
            </div>

            {/* histórias alinhadas a persona */}
            <div className="pt-16">
              <h2 className="text-3xl font-bold mb-8">histórias reais de quem saiu da dúvida</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="p-6 hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                      <img src={mariaPersona} alt="Patricia, 34 anos" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold">Patricia, 34 anos</p>
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full mt-1">
                        Auxiliar adm, buscava estabilidade
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "Ganhava 2.7k e estava perdida. O teste mostrou que meu perfil combina com area administrativa em tribunais e deu um plano de 7 dias para começar sem travar."
                  </p>
                </Card>

                <Card className="p-6 hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20">
                      <img src={joaoPersona} alt="Rafael, 32 anos" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold">Rafael, 32 anos</p>
                      <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs rounded-full mt-1">
                        Redirecionou estudos para concurso certo
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "Estudava há 2 anos para o edital errado. O teste cruzou meu perfil com concursos reais e eu foquei no cargo certo, sem perder tempo."
                  </p>
                </Card>
              </div>
            </div>

            {/* Autoridade RIASEC */}
            <div className="pt-16">
              <Card className="p-8 max-w-4xl mx-auto bg-primary/5 border-primary/20">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Shield className="w-16 h-16 text-primary" />
                  <h2 className="text-3xl font-bold">Metodologia RIASEC adaptada para estabilidade</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl">
                    O modelo RIASEC e usado em orientação profissional no mundo todo. Aqui ele foi ajustado para a realidade dos concursos públicos, ajudando você a escolher um caminho que combina com sua personalidade e rotina.
                  </p>
                  <div className="flex gap-3 pt-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      <CheckCircle2 className="w-4 h-4" />
                      Base científica
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      <Award className="w-4 h-4" />
                      Foco em concurso público
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* CTA intermediaria */}
            <div className="pt-16">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold">Pare de adiar a escolha certa</h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>O teste gratuito mostra seu encaixe, seus pontos fortes e qual concurso e mais seguro para você.</p>
                  <p>Em seguida, escolha se quer destravar o plano completo por R$ 25 com cronograma e desconto em cursinho.</p>
                  <p>Sem se expor, sem promessa milagrosa. direção clara para sair do salário de 2.5k-3k rumo a estabilidade.</p>
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
                  grátis. 7-10 minutos. Dados protegidos e sem aparecer nas redes.
                </p>
              </div>
            </div>

            {/* Prova social */}
            <div className="pt-16">
              <h2 className="text-3xl font-bold mb-8">Mais de 11 mil pessoas já encontraram seu concurso ideal</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    text: "Achei que seria só mais um teste. Ele comparou meu perfil com INSS e tribunais e me deu um passo a passo de 7 dias. Parei de empurrar com a barriga.",
                    name: "Ana Paula - administrativa"
                  },
                  {
                    text: "Tinha vergonha de me expor. Fiz o quiz no celular, recebi o resultado no email e consegui focar em um edital que paga melhor.",
                    name: "Camila R."
                  },
                  {
                    text: "Com 37 anos achei que estava tarde. O teste mostrou que ainda da tempo e sugeriu um concurso com estabilidade real e matérias que eu já domino.",
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
                        <span className="text-sm">â˜…</span>
                      </div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Fechamento */}
            <div className="pt-16">
              <h2 className="text-3xl font-bold mb-4">O primeiro passo da sua estabilidade começa aqui</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                O teste gratuito revela seu perfil, indica concursos aderentes e libera um plano inicial para você sair do zero ainda hoje.
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Clique abaixo, responda em minutos e receba seu resultado de forma privada.
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
              <h2 className="text-2xl font-bold mb-6">Perguntas frequentes</h2>
              <Accordion type="single" collapsible className="w-full text-left">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    E grátis mesmo?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim. O quiz e a recomendação básica sao 100% gratuitos. O plano completo com cargo, salário e cronograma e opcional por R$ 25.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    Preciso aparecer ou gravar algo?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    não. você responde no seu ritmo e recebe tudo por email (e opcionalmente no WhatsApp). Nada de se expor em rede social.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    Quanto tempo leva?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Em média 7-10 minutos para 25 perguntas. O resultado sai na hora.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    E se eu não tiver tempo agora?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    você recebe um plano de 7 dias para começar aos poucos, com foco no que da mais retorno. Pode salvar no email e continuar depois.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    Posso fazer o quiz mais de uma vez?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Sim. Pode refazer sempre que quiser. Cada nova análise considera suas respostas mais recentes.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Prova social final */}
            <div className="pt-8">
              <p className="text-sm text-muted-foreground">
                31 pessoas fizeram o quiz na última hora. Seu resultado fica visível só para você.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


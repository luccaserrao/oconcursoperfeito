import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { ReactNode, useEffect, useId, useRef } from "react";
import { Link } from "react-router-dom";

interface LandingProps {
  onStart: () => void;
  variant: "A" | "B";
}

interface GradientIconProps {
  children: ReactNode;
  size?: number;
}

const GradientIcon = ({ children, size = 24 }: GradientIconProps) => {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      <g
        stroke={`url(#${gradientId})`}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
};

const IconCoin = () => (
  <GradientIcon>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.5 9.5h5" />
    <path d="M9.5 14.5h5" />
    <path d="M12 8.5v7" />
  </GradientIcon>
);

const IconCopy = () => (
  <GradientIcon>
    <rect x="7" y="7" width="11" height="11" rx="2" />
    <path d="M5 15V7a2 2 0 0 1 2-2h6" />
  </GradientIcon>
);

const IconTarget = () => (
  <GradientIcon>
    <circle cx="12" cy="12" r="6.5" />
    <circle cx="12" cy="12" r="1.6" />
    <path d="M12 4.5v2.5" />
    <path d="M12 17v2.5" />
    <path d="M4.5 12h2.5" />
    <path d="M17 12h2.5" />
  </GradientIcon>
);

const IconMap = () => (
  <GradientIcon>
    <path d="M3 6.5l6-2 6 2 6-2v13l-6 2-6-2-6 2z" />
    <path d="M9 4.5v13" />
    <path d="M15 6.5v13" />
  </GradientIcon>
);

const IconShield = () => (
  <GradientIcon>
    <path d="M12 3.5l7 3v5.5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6.5z" />
    <path d="M9 12l6 6" />
  </GradientIcon>
);

const IconGauge = () => (
  <GradientIcon>
    <path d="M4.5 14.5a7.5 7.5 0 0 1 15 0" />
    <path d="M12 14.5l3-3" />
    <circle cx="12" cy="14.5" r="1.6" />
  </GradientIcon>
);

const IconBriefcase = () => (
  <GradientIcon>
    <rect x="4" y="7" width="16" height="11" rx="2" />
    <path d="M9 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5V7" />
    <path d="M4 11.5h16" />
  </GradientIcon>
);

const IconClipboard = () => (
  <GradientIcon>
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <rect x="9" y="3.5" width="6" height="4" rx="1" />
    <path d="M9 11.5h6" />
    <path d="M9 15.5h4" />
  </GradientIcon>
);

const IconScale = () => (
  <GradientIcon>
    <path d="M12 4v16" />
    <path d="M6 8h12" />
    <path d="M8 8l-3 5h6z" />
    <path d="M16 8l-3 5h6z" />
  </GradientIcon>
);

const mistakes = [
  {
    title: "Escolher concurso apenas pelo salário.",
    description: "Sem alinhamento com seu perfil, a motivação some rápido.",
    Icon: IconCoin,
  },
  {
    title: "Copiar o caminho de outras pessoas.",
    description: "O que funciona para alguém pode ser ruim para você.",
    Icon: IconCopy,
  },
  {
    title: "Começar a estudar sem saber se tem perfil.",
    description: "Sem direção, o esforço vira frustração e retrabalho.",
    Icon: IconTarget,
  },
];

const benefits = [
  {
    title: "Áreas de concurso mais compatíveis com seu perfil",
    Icon: IconMap,
  },
  {
    title: "Áreas que você deve evitar e por quê",
    Icon: IconShield,
  },
  {
    title: "Análise do seu nível de pressão, rotina ideal e perfil de trabalho (RIASEC)",
    Icon: IconGauge,
  },
  {
    title: "Sugestões de cargos específicos e requisitos",
    Icon: IconBriefcase,
  },
  {
    title: "Plano inicial de estudo e próximos passos",
    Icon: IconClipboard,
  },
  {
    title: "Comparativo de risco/benefício de cada área",
    Icon: IconScale,
  },
];

const testimonials = [
  {
    name: "Carolina M.",
    role: "Área fiscal",
    quote:
      "Eu estava perdida entre tribunais e fiscal. O relatório trouxe clareza e economizou meses de dúvidas.",
  },
  {
    name: "Igor S.",
    role: "Área administrativa",
    quote:
      "Achei que precisava estudar tudo. O teste mostrou o que faz sentido para o meu perfil e onde focar.",
  },
  {
    name: "Renata L.",
    role: "Área policial",
    quote:
      "Finalmente entendi que não era falta de esforço, era falta de direção. Valeu cada minuto.",
  },
];

const steps = [
  {
    step: "1",
    text: "Responda ao teste (7–10 min)",
  },
  {
    step: "2",
    text: "Veja sua recomendação de área — quais áreas e cargos fazem sentido para você",
  },
  {
    step: "3",
    text: "Destrave o relatório completo e receba o plano de estudo, comparação de áreas e checklist de próximos passos",
  },
];

const faqs = [
  {
    question: "O teste é genérico?",
    answer: "Não, é especializado para concursos públicos e compara áreas.",
  },
  {
    question: "Quanto tempo demora?",
    answer: "7–10 min.",
  },
  {
    question: "Como recebo o resultado?",
    answer: "Você recebe uma prévia grátis e o relatório completo por e-mail/WhatsApp após o pagamento.",
  },
  {
    question: "E se eu discordar do resultado?",
    answer: "O relatório é personalizado e gratuito para começar.",
  },
];

const paymentLink = "https://checkout.futuroperfeito.com.br";

const cardBase = "rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]";
const pillBase = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.15em]";

export const Landing = ({ onStart }: LandingProps) => {
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleScrollTestimonials = (direction: "left" | "right") => {
    if (!testimonialsRef.current) return;
    const offset = direction === "left" ? -360 : 360;
    testimonialsRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 text-foreground">
      <div className="pointer-events-none absolute inset-0 landing-dot opacity-20" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
          <div className="container mx-auto flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" className="text-lg font-semibold tracking-tight text-foreground">
                Futuro Perfeito
              </Link>
              <Button
                onClick={onStart}
                className="h-auto rounded-full px-5 py-3 text-sm font-semibold md:hidden"
              >
                Começar teste
              </Button>
            </div>
            <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-muted-foreground">
              <a
                href="#inicio"
                aria-current="page"
                className="border-b-2 border-primary pb-1 text-foreground"
              >
                Início
              </a>
              <Link to="/blog" className="transition-colors hover:text-primary">
                Blog
              </Link>
              <a href="#contato" className="transition-colors hover:text-primary">
                Contato
              </a>
            </nav>
            <Button
              onClick={onStart}
              className="hidden h-auto rounded-full px-6 py-3 text-sm font-semibold md:inline-flex"
            >
              Começar teste
            </Button>
          </div>
        </header>

        <main className="pt-24">
          <section id="inicio" className="relative scroll-mt-24 py-16 lg:py-20">
            <div className="container mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="reveal space-y-6" data-reveal>
                <span className={`${pillBase} bg-primary/10 text-primary`}>Teste vocacional para concursos</span>
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Descubra qual área de concurso combina com você — e pare de perder tempo estudando o concurso errado.
                </h1>
                <p className="text-base text-muted-foreground sm:text-lg">
                  Um teste rápido que analisa seu perfil e mostra qual área de concurso faz sentido para você
                  (administrativo, tribunais, policial, fiscal, etc.) — e quais você deve evitar.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={onStart}
                    className="h-auto rounded-full px-8 py-6 text-base font-semibold"
                  >
                    Descobrir meu concurso ideal
                  </Button>
                  <Button asChild variant="outline" className="h-auto rounded-full px-8 py-6 text-base font-semibold">
                    <a href="#erros">Quero saber mais</a>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="rounded-full bg-muted px-4 py-2 shadow-sm">Resposta em 7–10 minutos</span>
                  <span className="rounded-full bg-muted px-4 py-2 shadow-sm">Prévia gratuita + relatório completo</span>
                </div>
              </div>

              <div className="reveal relative" data-reveal>
                <div className={`${cardBase} relative p-6 lg:p-7`}>
                  <div className="absolute left-1/2 top-4 h-1.5 w-16 -translate-x-1/2 rounded-full bg-muted" />
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      <span>Relatório</span>
                      <span>Futuro Perfeito</span>
                    </div>
                    <div className="rounded-2xl bg-muted/60 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Compatibilidade</p>
                      <div className="mt-4 flex items-end gap-2">
                        <div className="h-10 w-8 rounded-lg bg-primary/20" />
                        <div className="h-16 w-8 rounded-lg bg-primary/30" />
                        <div className="h-24 w-8 rounded-lg bg-primary/50" />
                        <div className="h-12 w-8 rounded-lg bg-primary/25" />
                        <div className="h-20 w-8 rounded-lg bg-primary/40" />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                        <span className="rounded-full bg-card px-3 py-1 shadow-sm">Administrativo</span>
                        <span className="rounded-full bg-card px-3 py-1 shadow-sm">Tribunais</span>
                        <span className="rounded-full bg-card px-3 py-1 shadow-sm">Fiscal</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-border bg-card p-3 text-xs text-muted-foreground">
                        <p className="font-semibold text-foreground">Perfil RIASEC</p>
                        <p className="mt-1">Social · Investigativo</p>
                      </div>
                      <div className="rounded-2xl border border-border bg-card p-3 text-xs text-muted-foreground">
                        <p className="font-semibold text-foreground">Plano inicial</p>
                        <p className="mt-1">Primeiros 30 dias</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="erros" className="scroll-mt-24 bg-background py-16 lg:py-20">
            <div className="container mx-auto max-w-6xl space-y-10 px-4">
              <div className="reveal space-y-4" data-reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">Você talvez esteja cometendo estes erros</h2>
                <p className="text-lg font-semibold text-muted-foreground">
                  O erro da maioria não é falta de esforço, é começar a estudar sem escolher a área correta.
                </p>
                <p className="text-base text-muted-foreground">
                  Esses erros podem custar anos de estudo. O teste corrige isso com clareza e um caminho realista antes
                  de você investir energia.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {mistakes.map((item, index) => (
                  <div
                    key={item.title}
                    className={`reveal ${cardBase} p-6`}
                    data-reveal
                    style={{ transitionDelay: `${index * 120}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                        <item.Icon />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="recebe" className="scroll-mt-24 bg-muted/50 py-16 lg:py-20">
            <div className="container mx-auto max-w-6xl space-y-10 px-4">
              <div className="reveal space-y-4" data-reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">O que você recebe</h2>
                <p className="text-base text-muted-foreground">
                  Um relatório objetivo, focado no seu perfil e nas áreas de concurso que realmente fazem sentido.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {benefits.map((item, index) => (
                  <div
                    key={item.title}
                    className={`reveal flex items-start gap-4 ${cardBase} p-6`}
                    data-reveal
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                      <item.Icon />
                    </div>
                    <p className="text-base font-medium text-foreground">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="valor" className="scroll-mt-24 bg-background py-16 lg:py-20">
            <div className="container mx-auto max-w-6xl grid gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="reveal space-y-5" data-reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">Por que pagar R$ 25?</h2>
                <p className="text-base text-muted-foreground">
                  Estudar para o concurso errado pode custar anos da sua vida e milhares de reais. Por apenas R$ 25, você
                  elimina a incerteza e foca no que realmente importa.
                </p>
                <Button
                  asChild
                  className="h-auto rounded-full px-7 py-6 text-base font-semibold"
                >
                  <a href={paymentLink} target="_blank" rel="noreferrer">
                    Liberar relatório por R$ 25
                  </a>
                </Button>
              </div>
              <div className={`reveal ${cardBase} p-6`} data-reveal>
                <h3 className="text-base font-semibold text-foreground">
                  Tempo perdido sem clareza vs. investimento baixo
                </h3>
                <div className="mt-6 space-y-5 text-muted-foreground">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em]">
                      <span>Sem clareza</span>
                      <span>12–24 meses</span>
                    </div>
                    <div className="mt-2 h-3 rounded-full bg-muted">
                      <div className="h-3 w-[88%] rounded-full bg-foreground" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em]">
                      <span>Com o teste</span>
                      <span>7–10 min</span>
                    </div>
                    <div className="mt-2 h-3 rounded-full bg-primary/20">
                      <div className="h-3 w-[32%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-muted/60 p-4 text-sm text-muted-foreground">
                    Investimento baixo agora = meses economizados depois.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="depoimentos" className="scroll-mt-24 bg-muted/50 py-16 lg:py-20">
            <div className="container mx-auto max-w-6xl space-y-8 px-4">
              <div className="reveal flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-reveal>
                <div>
                  <h2 className="text-2xl font-semibold sm:text-3xl">Depoimentos</h2>
                  <p className="text-base text-muted-foreground">Histórias reais de quem ganhou clareza.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleScrollTestimonials("left")}
                    aria-label="Ver depoimento anterior"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary transition hover:bg-primary/10"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScrollTestimonials("right")}
                    aria-label="Ver próximo depoimento"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary transition hover:bg-primary/10"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div
                ref={testimonialsRef}
                className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory"
              >
                {testimonials.map((item, index) => (
                  <div
                    key={item.name}
                    className={`reveal min-w-[280px] snap-center ${cardBase} p-6 sm:min-w-[320px]`}
                    data-reveal
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.role}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-1 text-primary">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={`${item.name}-${starIndex}`}
                          className="h-4 w-4"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">{item.quote}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="como-funciona" className="scroll-mt-24 bg-background py-16 lg:py-20">
            <div className="container mx-auto max-w-6xl space-y-10 px-4">
              <div className="reveal space-y-4" data-reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">Como funciona</h2>
                <p className="text-base text-muted-foreground">
                  Responda ao teste (7–10 min) → Veja sua recomendação de área → Destrave o relatório completo e receba um
                  plano detalhado.
                </p>
              </div>
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                {steps.map((item, index) => (
                  <div key={item.step} className="flex flex-1 flex-col gap-6 md:flex-row md:items-center">
                    <div
                      className={`reveal flex flex-1 items-start gap-4 ${cardBase} p-6`}
                      data-reveal
                      style={{ transitionDelay: `${index * 120}ms` }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
                        {item.step}
                      </div>
                      <p className="text-base font-medium text-foreground">{item.text}</p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:flex md:items-center md:justify-center text-muted-foreground">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="scroll-mt-24 bg-muted/50 py-16 lg:py-20">
            <div className="container mx-auto max-w-6xl space-y-8 px-4">
              <div className="reveal space-y-4" data-reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">FAQ / Perguntas frequentes</h2>
                <p className="text-base text-muted-foreground">Respostas diretas para dúvidas comuns.</p>
              </div>
              <div className="space-y-4">
                {faqs.map((item, index) => (
                  <details
                    key={item.question}
                    className={`reveal ${cardBase} p-5`}
                    data-reveal
                    style={{ transitionDelay: `${index * 90}ms` }}
                  >
                    <summary className="cursor-pointer text-base font-semibold text-foreground">
                      {item.question}
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="cta" className="scroll-mt-24 bg-background py-16 lg:py-20">
            <div className="container mx-auto max-w-5xl text-center px-4">
              <div className="reveal mx-auto max-w-3xl space-y-6" data-reveal>
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  Não escolha no escuro. Tenha clareza para estudar o concurso certo.
                </h2>
                <Button
                  onClick={onStart}
                  className="h-auto rounded-full px-10 py-6 text-base font-semibold"
                >
                  Descobrir meu concurso ideal
                </Button>
              </div>
            </div>
          </section>
        </main>

        <footer id="contato" className="mt-auto border-t border-border bg-muted/60 py-12 text-foreground">
          <div className="container mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
            <div className="space-y-3">
              <p className="text-lg font-semibold">Futuro Perfeito</p>
              <p className="text-sm text-muted-foreground">
                Clareza para você escolher a área de concurso certa antes de investir meses de estudo.
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <p className="font-semibold">Links</p>
              <div className="space-y-2">
                <Link to="/blog" className="block transition-colors hover:text-primary">
                  Blog
                </Link>
                <Link to="/privacy" className="block transition-colors hover:text-primary">
                  Política de Privacidade
                </Link>
                <Link to="/terms" className="block transition-colors hover:text-primary">
                  Termos de Uso
                </Link>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <p className="font-semibold">Contato</p>
              <p className="text-muted-foreground">WhatsApp: (91) 98423-3672</p>
              <a
                href="https://www.instagram.com/luccaserrao/"
                target="_blank"
                rel="noreferrer"
                className="block transition-colors hover:text-primary"
              >
                Instagram: @luccaserrao
              </a>
            </div>
          </div>
          <div className="container mx-auto mt-10 max-w-6xl border-t border-border pt-6 text-center text-xs text-muted-foreground">
            (c) 2026 Futuro Perfeito. Todos os direitos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
};

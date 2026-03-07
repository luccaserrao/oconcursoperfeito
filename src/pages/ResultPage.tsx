import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RESULT_PAGES } from "@/data/resultPages";
import type { ResultPage as ResultPageData } from "@/data/resultPages";
import { buildCanonicalUrl } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";
import { trackJourneyStep } from "@/lib/quizTracking";
import NotFound from "./NotFound";
import { MercadoPagoButton } from "@/components/MercadoPagoButton";
import { Lock } from "lucide-react";

const SectionTitle = ({ title, kicker }: { title: string; kicker?: string }) => (
  <div className="space-y-1">
    {kicker ? <p className="text-xs uppercase tracking-[0.2em] text-primary/80 font-semibold">{kicker}</p> : null}
    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
  </div>
);

const ResultPageView = ({ page }: { page: ResultPageData }) => {
  const [contact, setContact] = useState<{
    name: string;
    email: string;
    quizResponseId?: string;
  } | null>(null);

  const LOCKED_TEASERS = [
    {
      key: "salary_range",
      title: "Faixa salarial do seu concurso ideal",
      teaser: "Estado que você escolheu · R$ ▢▢▢▢ - ▢▢▢▢",
      bullets: [
        "Órgão 1: R$ ▢▢▢▢ + benefícios",
        "Órgão 2: R$ ▢▢▢▢ (progressão em ▢ anos)",
        "Projeção em 3 anos: R$ ▢▢▢▢",
      ],
    },
    {
      key: "top_exams",
      title: "Top 3 concursos para o seu estado",
      teaser: "Selecionados pelo seu perfil + localização",
      bullets: ["#1 ▢▢▢ ▢▢▢", "#2 ▢▢▢ ▢▢", "#3 ▢▢▢ ▢▢"],
    },
    {
      key: "subjects_plan",
      title: "O que estudar para passar no concurso #1",
      teaser: "Horas/dia e matérias priorizadas",
      bullets: [
        "Horas/dia: ▢▢ | Semanas: ▢▢",
        "Matérias-chave: ▢▢▢, ▢▢▢, ▢▢▢",
        "Checklist de revisão: ▢▢ itens",
      ],
    },
    {
      key: "past_exams",
      title: "Provas e editais anteriores",
      teaser: "Links e banca dominante",
      bullets: [
        "Edital ▢▢/▢▢: banca ▢▢▢",
        "Prova PDF: ▢▢▢▢",
        "Média de corte: ▢▢/100",
      ],
    },
    {
      key: "timeframe",
      title: "Tempo médio de estudo + próxima data",
      teaser: "Quanto tempo as pessoas levam e quando abre",
      bullets: [
        "Tempo médio: ▢▢ meses para ficar competitivo",
        "Próxima janela de edital: ▢▢/▢▢",
        "Aviso de risco: concorrência alta em ▢▢",
      ],
    },
  ];

  const canonical = buildCanonicalUrl(`/resultado/${page.slug}`);

  useEffect(() => {
    trackEvent("result_page_viewed", { result_slug: page.slug });
    trackJourneyStep({
      step: "results_viewed",
      quiz_version: "v2",
      page_path: `/resultado/${page.slug}`,
      metadata: { result_slug: page.slug },
    });
  }, [page.slug]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: buildCanonicalUrl("/") },
      { "@type": "ListItem", position: 2, name: page.hero.heading, item: canonical },
    ],
  };

  const ogTitle = page.title;
  const ogDescription = page.metaDescription;

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem("quiz_contact") : null;
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const name =
        typeof parsed?.name === "string" && parsed.name.trim().length ? parsed.name.trim() : "Concurseiro";
      const email =
        typeof parsed?.email === "string" && parsed.email.trim().length ? parsed.email.trim().toLowerCase() : "";
      const quizResponseId =
        typeof parsed?.quizResponseId === "string" && parsed.quizResponseId.length ? parsed.quizResponseId : undefined;
      if (email) {
        setContact({ name, email, quizResponseId });
      }
    } catch (err) {
      console.warn("Could not load quiz_contact", err);
    }
  }, []);

  const LockedBlock = ({
    title,
    teaser,
    bullets,
  }: {
    title: string;
    teaser: string;
    bullets?: string[];
  }) => (
    <Card className="p-6 border-2 border-dashed border-primary/25">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-primary font-semibold bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
          <Badge variant="outline" className="border-none bg-transparent text-primary p-0">
            Bloqueado
          </Badge>
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{teaser}</p>
        {bullets && bullets.length > 0 && (
          <div className="relative mt-2">
            <ul className="space-y-1 text-sm text-muted-foreground blur-sm opacity-70 select-none pointer-events-none">
              {bullets.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
            <div className="absolute inset-0 rounded-md bg-background/40 backdrop-blur-[1px] border border-primary/20 flex items-center justify-center gap-2 text-primary font-semibold pointer-events-none">
              <Lock className="w-4 h-4" />
              <span className="text-xs md:text-sm">Disponível no relatório completo</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={page.keywords.join(", ")} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl space-y-12">
          <header className="space-y-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  {page.hero.badge ? <Badge variant="outline">{page.hero.badge}</Badge> : null}
                  <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                    {page.hero.eyebrow}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">{page.hero.heading}</h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">{page.hero.subheading}</p>
              </div>
              <div className="flex flex-col gap-3 md:items-end w-full md:w-auto">
                {contact ? (
                  <div className="w-full md:w-72">
                    <MercadoPagoButton
                      userName={contact.name}
                      userEmail={contact.email}
                      quizResponseId={contact.quizResponseId}
                      amount={25}
                      location="result_static_page"
                      quizVersion="v2"
                    />
                  </div>
                ) : (
                  <Button asChild className="w-full md:w-auto text-base px-6">
                    <Link to="/">Fazer o teste para liberar pagamento</Link>
                  </Button>
                )}
                <Button asChild variant="outline" className="w-full md:w-auto text-base px-6">
                  <Link to="/">Refazer o teste</Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center md:text-right">
                  Prévia gratuita · Relatório completo envia os detalhes.
                </p>
              </div>
            </div>
          </header>

          <div className="space-y-8">
            <Card className="p-6 md:p-8 space-y-4">
              <SectionTitle title="Prévia dos benefícios" kicker="Grátis (20%)" />
              <div className="grid gap-3 md:grid-cols-2">
                {page.benefits.slice(0, 3).map((item) => (
                  <div key={item} className="rounded-xl border p-3 bg-primary/5 border-primary/15 text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Detalhes completos, exemplos e comparações ficam liberados no relatório.
              </p>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {LOCKED_TEASERS.map((item) => (
                <LockedBlock key={item.key} title={item.title} teaser={item.teaser} bullets={item.bullets} />
              ))}
            </div>
          </div>

          <footer className="flex flex-wrap gap-4 items-center justify-between border-t pt-6 text-sm text-muted-foreground">
            <span>Prévia gratuita. Libere o relatório completo por R$25.</span>
            <div className="flex gap-3">
              <Link className="underline" to="/">Fazer o teste</Link>
              <Link className="underline" to="/paid-content">Plano completo</Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

const ResultPage = () => {
  const { slug } = useParams();
  const page = useMemo(() => RESULT_PAGES.find((item) => item.slug === slug), [slug]);

  if (!page) return <NotFound />;

  return <ResultPageView page={page} />;
};

export default ResultPage;

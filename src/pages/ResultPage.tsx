import { useEffect, useMemo } from "react";
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

const SectionTitle = ({ title, kicker }: { title: string; kicker?: string }) => (
  <div className="space-y-1">
    {kicker ? <p className="text-xs uppercase tracking-[0.2em] text-primary/80 font-semibold">{kicker}</p> : null}
    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
  </div>
);

const Pill = ({ children }: { children: string }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-primary/5 border-primary/20 text-primary">
    {children}
  </span>
);

const ResultPageView = ({ page }: { page: ResultPageData }) => {
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
              <div className="flex flex-col gap-3 md:items-end">
                <Button asChild className="w-full md:w-auto text-base px-6">
                  <Link to={page.hero.secondaryCtaHref}>{page.hero.secondaryCtaLabel}</Link>
                </Button>
                <Button asChild variant="outline" className="w-full md:w-auto text-base px-6">
                  <Link to={page.hero.ctaHref}>{page.hero.ctaLabel}</Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Veja também nosso <Link className="underline" to="/blog">blog de concursos</Link>.
                </p>
              </div>
            </div>
          </header>

          <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
            <Card className="p-6 md:p-8 space-y-8">
              <div className="space-y-3">
                <SectionTitle title="Por que essa área combina com você" kicker="Benefícios" />
                <div className="grid gap-3 md:grid-cols-2">
                  {page.benefits.map((item) => (
                    <div key={item} className="rounded-xl border p-3 bg-primary/5 border-primary/15 text-sm font-medium">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <SectionTitle title="Evite estes erros" kicker="Dores comuns" />
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {page.painPoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <SectionTitle title="Combina com você se..." />
                  <div className="flex flex-wrap gap-2">
                    {page.fitProfile.map((item) => (
                      <Pill key={item}>{item}</Pill>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <SectionTitle title="Evite se..." />
                  <div className="flex flex-wrap gap-2">
                    {page.avoidProfile.map((item) => (
                      <Pill key={item}>{item}</Pill>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <SectionTitle title="Editais que valem sua energia" kicker="Alvos" />
                <div className="grid gap-3 md:grid-cols-2">
                  {page.recommendedExams.map((exam) => (
                    <Card key={exam} className="p-4 border-dashed bg-muted/40">
                      <p className="font-semibold text-sm">{exam}</p>
                      <p className="text-xs text-muted-foreground mt-1">Priorize questões recentes e banca dominante.</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <SectionTitle title="Mini plano de estudos" kicker="Roteiro prático" />
                <div className="rounded-2xl border p-5 bg-accent/10 border-accent/30 space-y-3">
                  <p className="text-sm font-semibold">Foco: {page.studyPlan.focus}</p>
                  <p className="text-sm text-muted-foreground">Carga recomendada: {page.studyPlan.hours}</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    {page.studyPlan.roadmap.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <SectionTitle title="Próximo passo" kicker="CTA" />
                <p className="text-sm text-muted-foreground">
                  Gere seu relatório completo, receba por e-mail e acompanhe as próximas turmas.
                </p>
                <Button asChild className="w-full">
                  <Link to={page.cta.href}>{page.cta.label}</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full">
                  <Link to="/">Refazer o teste</Link>
                </Button>
              </div>

              <div className="space-y-3">
                <SectionTitle title="FAQ rápido" kicker="Dúvidas" />
                <div className="space-y-3">
                  {page.faqs.map((faq) => (
                    <div key={faq.question} className="border-b pb-3 last:border-none">
                      <p className="font-semibold text-sm">{faq.question}</p>
                      <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <footer className="flex flex-wrap gap-4 items-center justify-between border-t pt-6 text-sm text-muted-foreground">
            <span>Quer aprofundar? Leia o blog ou volte ao teste para calibrar.</span>
            <div className="flex gap-3">
              <Link className="underline" to="/">Fazer o teste</Link>
              <Link className="underline" to="/blog">Blog</Link>
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

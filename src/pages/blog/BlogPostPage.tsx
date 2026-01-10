import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect, useMemo, useState } from "react";
import { getPostBySlug, getAllPosts, BlogPost } from "@/lib/blog";

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const [progress, setProgress] = useState(0);

  const relatedPosts: BlogPost[] = useMemo(() => {
    const all = getAllPosts().filter((p) => p.slug !== post?.slug);
    return all.slice(0, 3);
  }, [post?.slug]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const value = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
      setProgress(value);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const extractText = (children: any): string => {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) return children.map(extractText).join(" ");
    if (children && typeof children === "object" && "props" in children) {
      // @ts-ignore
      return extractText(children.props?.children);
    }
    return "";
  };

  const tocItems = useMemo(() => {
    if (!post?.content) return [];
    const matches = [...post.content.matchAll(/^##\s+(.+)$/gm)];
    return matches.map((m) => {
      const title = m[1].trim();
      return { id: slugify(title), title };
    });
  }, [post?.content]);

  const TableOfContents = ({ items }: { items: { id: string; title: string }[] }) => {
    if (!items.length) return null;
    return (
      <div className="mb-8 rounded-2xl border border-slate-200 bg-muted/60 p-4 text-sm md:p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Neste artigo</p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const CtaBlock = ({
    title = "Quer clarear ainda mais?",
    description = "Responda o teste Futuro Perfeito e receba sugestões de cargos alinhadas ao seu perfil.",
    fullWidth = false,
  }) => (
    <div className="my-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 shadow-sm transition dark:border-indigo-900/60 dark:bg-indigo-950/40 md:p-5">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{description}</p>
        <div className="pt-1">
          <a
            href="/"
            className={`inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 ${fullWidth ? "w-full" : ""}`}
          >
            Fazer o teste Futuro Perfeito
          </a>
        </div>
      </div>
    </div>
  );

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md rounded-xl border border-slate-200 bg-card p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Blog</p>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">Post não encontrado</h1>
          <p className="mt-3 text-slate-600">O link pode ter sido alterado ou removido.</p>
          <Link
            to="/blog"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Voltar para o Blog
          </Link>
        </div>
      </div>
    );
  }

  const canonical =
    typeof window !== "undefined" ? `${window.location.origin}/blog/${post.slug}` : `/blog/${post.slug}`;

  const keywords = post.tags.join(", ");
  const [heroImageLoaded, setHeroImageLoaded] = useState(true);
  const heroImage =
    post.slug === "qual-profissao-combina-comigo" ? "/blog/qual-profissao-hero.png" : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-x-0 top-0 z-30 h-2 bg-transparent">
        <div
          className="h-1 rounded-r-full bg-indigo-600 transition-[width]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <Helmet>
        <title>{`${post.title} | Blog`}</title>
        <meta name="description" content={post.description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta property="article:published_time" content={post.date} />
      </Helmet>

      <div className="space-y-10 md:space-y-14">
        <section className="bg-slate-950/5">
      <div className="mx-auto max-w-3xl md:max-w-4xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.35fr,1fr] lg:items-center">
          <div className="rounded-3xl border border-slate-200 bg-card p-6 shadow-sm sm:p-8 md:p-8 lg:p-9">
            <div className="flex items-center justify-between">
                  <Link
                    to="/blog"
                    className="text-sm font-semibold text-slate-600 underline-offset-4 hover:text-indigo-700 hover:underline"
                  >
                    {"<- Voltar para o Blog"}
                  </Link>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700">
                    {formatDate(post.date)}
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                    {post.title}
                  </h1>
                  <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                    {post.description}
                  </p>
                </div>
              </div>

              <div className="hidden h-full lg:block">
                {heroImage && heroImageLoaded ? (
                  <div className="relative h-full min-h-[220px] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-sm">
                    <img
                      src={heroImage}
                      alt="Ilustração sobre escolha de profissão"
                      className="h-full w-full object-cover"
                      onError={() => setHeroImageLoaded(false)}
                    />
                  </div>
                ) : (
                  <div className="relative h-full min-h-[220px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-100 via-white to-slate-100 shadow-sm">
                    <div className="absolute -left-10 top-6 h-24 w-24 rounded-full bg-indigo-200 blur-2xl" />
                    <div className="absolute right-0 top-10 h-32 w-32 rounded-full bg-indigo-300/70 blur-3xl" />
                    <div className="absolute bottom-6 left-6 h-28 w-28 rounded-full bg-slate-200 blur-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/60" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl md:max-w-4xl px-4 pb-14 md:px-6 md:pb-16">
          <article>
            <div className="prose prose-lg prose-slate mx-auto max-w-3xl leading-relaxed prose-a:text-indigo-700 hover:prose-a:text-indigo-900 prose-headings:tracking-tight prose-headings:font-semibold prose-headings:mt-10 prose-h2:mb-3 prose-h3:mb-2 prose-p:my-4 md:prose-p:my-5 prose-p:leading-8 prose-ul:my-4 prose-ol:my-4 prose-li:my-1.5 prose-li:leading-relaxed prose-li:marker:text-slate-400 prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-semibold prose-strong:bg-slate-100/60 dark:prose-strong:bg-slate-800/40 prose-strong:px-0.5 prose-strong:rounded prose-hr:my-8 prose-hr:border-slate-200 dark:prose-hr:border-slate-800 prose-blockquote:my-8 prose-img:my-8 prose-img:rounded-2xl prose-img:shadow-sm dark:prose-invert">
              <TableOfContents items={tocItems} />
              <CtaBlock fullWidth />
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => {
                    const text = extractText(props.children);
                    const id = slugify(text);
                    return (
                      <h2 id={id} {...props}>
                        {props.children}
                      </h2>
                    );
                  },
                  blockquote: ({ node, ...props }) => (
                    <div className="my-8 rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 text-slate-800 shadow-sm ring-1 ring-indigo-100/60 dark:border-indigo-900/60 dark:bg-indigo-950/30 dark:text-slate-100">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        Dica
                      </p>
                      <div
                        className="space-y-2 text-base leading-relaxed [&>p]:m-0 [&>p]:leading-relaxed"
                        {...props}
                      />
                    </div>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
              <CtaBlock />
            </div>

            <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                >
                  {"<- Voltar para o Blog"}
                </Link>
                <Link
                  to="/"
                  className="text-sm font-medium text-slate-600 underline decoration-dashed underline-offset-4 hover:text-slate-800"
                >
                  Ir para a Home
                </Link>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Fazer o teste Futuro Perfeito
              </Link>
            </div>

            <div className="mx-auto mt-10 max-w-4xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Leia também</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedPosts.map((item) => (
                  <Link
                    to={`/blog/${item.slug}`}
                    key={item.slug}
                    className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="text-xs font-semibold text-slate-500">{formatDate(item.date)}</div>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.tags.slice(0, 2).join(" · ")}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-muted/80 p-4 md:p-5">
                <div className="flex items-start gap-3">
                  <img
                    src="/favicon.png"
                    alt="Futuro Perfeito"
                    className="mt-1 h-10 w-10 shrink-0 rounded-full object-cover"
                  />
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-900">Sobre o Futuro Perfeito</p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      O Futuro Perfeito é um projeto focado em dar clareza para quem quer seguir carreira em concursos,
                      conectando perfil, rotina desejada e cargos reais. Conteúdo direto, prático e alinhado com o que
                      você precisa para decidir com segurança.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;

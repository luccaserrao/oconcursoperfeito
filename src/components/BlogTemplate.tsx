import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";

interface BlogTemplateProps {
  title: string;
  description: string;
  keywords?: string;
  children: React.ReactNode;
  showTOC?: boolean;
}

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

const BlogTemplate: React.FC<BlogTemplateProps> = ({
  title,
  description,
  keywords,
  children,
  showTOC = true,
}) => {
  const articleRef = useRef<HTMLElement | null>(null);
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [progress, setProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  const highlightPoints = useMemo(() => {
    const sentences = description
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean);

    return sentences.length > 1 ? sentences : [description];
  }, [description]);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const hs = Array.from(article.querySelectorAll("h2, h3")).map((h) => {
      const text = h.textContent?.trim() ?? "";
      const id = h.id || slugify(text || title);

      if (!h.id) {
        h.id = id;
      }

      return {
        id,
        text: text || title,
        level: Number(h.tagName.replace("H", "")),
      };
    });

    setHeadings(hs);
  }, [children, title]);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const text = article.innerText || "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const estimatedMinutes = Math.max(1, Math.ceil(words / 200));

    setReadingTime(estimatedMinutes);
  }, [children]);

  useEffect(() => {
    const handleProgress = () => {
      const article = articleRef.current;
      if (!article) return;

      const start = article.offsetTop;
      const height = article.offsetHeight;
      const end = start + height - window.innerHeight;
      const scrollY = window.scrollY;

      if (height <= window.innerHeight) {
        setProgress(100);
        return;
      }

      const rawProgress = ((scrollY - start) / (end - start)) * 100;
      const clamped = Math.min(100, Math.max(0, rawProgress));

      setProgress(clamped);
    };

    handleProgress();
    window.addEventListener("scroll", handleProgress, { passive: true });
    window.addEventListener("resize", handleProgress);

    return () => {
      window.removeEventListener("scroll", handleProgress);
      window.removeEventListener("resize", handleProgress);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200/60 dark:bg-slate-800/60 z-40">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <div className="w-full bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="w-full max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200 px-3 py-1 font-medium">
                <span className="h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                Blog
              </span>
              <div className="hidden sm:flex items-center gap-2 text-slate-500 dark:text-slate-300">
                <a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</a>
                <span>/</span>
                <a href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400">Blog</a>
                <span>/</span>
                <span className="font-semibold text-slate-700 dark:text-slate-100">{title}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-300">
              <div className="flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1 border border-slate-200 dark:border-slate-800">
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                Leituras rápidas: ~{readingTime} min
              </div>
              {headings.length > 0 && (
                <div className="hidden md:inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-900 px-3 py-1 border border-slate-200 dark:border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-blue-400" aria-hidden />
                  {headings.length} tópicos
                </div>
              )}
            </div>
          </div>
        </div>

        <header className="w-full relative overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-slate-900 to-emerald-600 opacity-90" />
          <div className="absolute -top-32 -left-16 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl" />
          <div className="absolute -bottom-32 -right-10 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl" />
          <div className="relative max-w-5xl mx-auto px-4 py-14 flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm tracking-wide uppercase">
                Conteúdo exclusivo
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h1>
              <div className="space-y-3 text-lg text-slate-100/90 max-w-2xl">
                {highlightPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden />
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-80">
              <div className="relative rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-white/20" />
                <div className="relative px-6 py-7 space-y-4 text-slate-50">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-200/80">Tempo estimado</p>
                  <div className="text-5xl font-black flex items-baseline gap-2">
                    {readingTime}
                    <span className="text-base font-semibold text-slate-200">min</span>
                  </div>
                  <p className="text-sm text-slate-100/80 leading-relaxed">
                    Aprenda no seu ritmo com uma leitura enxuta e objetiva.
                  </p>
                  <a
                    href="/"
                    className="inline-flex w-full justify-center items-center gap-2 rounded-xl bg-white text-slate-900 font-semibold py-3 shadow-lg shadow-indigo-900/20 hover:-translate-y-0.5 transition-transform"
                  >
                    Fazer Teste Vocacional
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10">
          <article
            ref={articleRef}
            className="prose prose-lg dark:prose-invert flex-1 max-w-none"
          >
            {children}

            <div className="md:hidden mt-12">
              <a
                href="/"
                className="block w-full text-center bg-indigo-600 text-white font-semibold py-4 rounded-xl shadow hover:bg-indigo-700"
              >
                Fazer Teste Vocacional Agora
              </a>
            </div>
          </article>

          <aside className="hidden md:block w-80 sticky top-16 self-start space-y-6">
            {showTOC && headings.length > 0 && (
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between mb-3 text-sm font-semibold text-slate-600 dark:text-slate-200">
                  <p>Nesta página</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-100">
                    {headings.length} tópicos
                  </span>
                </div>
                <ul className="space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                      <a
                        href={`#${h.id}`}
                        className="text-slate-700 dark:text-slate-300 hover:text-indigo-600"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-6 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm bg-white dark:bg-slate-900 space-y-3">
              <div className="text-xs uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-300">
                Sugestão
              </div>
              <h3 className="text-xl font-semibold">
                Descubra qual concurso é perfeito para você
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Faça agora seu teste gratuito e descubra sua carreira pública ideal.
              </p>
              <a
                href="/"
                className="block w-full text-center bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 shadow"
              >
                Fazer Teste Vocacional
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default BlogTemplate;

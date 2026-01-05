import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getAllPosts, BlogPost } from "@/lib/blog";

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const BlogIndex = () => {
  const posts: BlogPost[] = getAllPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Blog | O Concurso Perfeito</title>
        <meta
          name="description"
          content="Conteúdos práticos sobre preparação para concursos: organização, rotina e o dia da prova."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <div className="mx-auto max-w-3xl md:max-w-4xl px-4 py-14 md:px-6 md:py-16">
        <header className="mb-12 rounded-3xl border border-slate-200 bg-card/80 px-6 py-10 text-center shadow-sm backdrop-blur-sm sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Conteúdo para concurseiros
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Blog</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg md:mx-auto md:max-w-3xl">
            Artigos rápidos com táticas práticas para estudar melhor, manter o foco e chegar bem ao dia da prova.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-center text-slate-500">Nenhum post publicado ainda.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-7"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-indigo-700">
                    {formatDate(post.date)}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                    <Link to={`/blog/${post.slug}`} className="hover:text-indigo-700">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{post.description}</p>
                </div>

                <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                  >
                    Ler artigo
                  </Link>
                  <Link
                    to="/"
                    className="text-sm font-medium text-slate-500 underline decoration-dashed hover:text-slate-700"
                  >
                    Voltar para a Home
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogIndex;

import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

interface BlogTemplateProps {
  title: string;
  description: string;
  keywords?: string;
  children: React.ReactNode;
  coverImage?: string; // opcional para hero
}

export default function BlogTemplate({
  title,
  description,
  keywords,
  children,
  coverImage,
}: BlogTemplateProps) {
  return (
    <div className="bg-white text-slate-900 min-h-screen font-sans">
      {/* ---------------- SEO ---------------- */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>

      {/* ---------------- BREADCRUMB ---------------- */}
      <div className="w-full border-b border-slate-200 py-3 bg-white/80 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-700">Home</Link> /{" "}
          <Link to="/blog" className="hover:text-slate-700">Blog</Link> /{" "}
          <span className="text-slate-800 font-medium">{title}</span>
        </div>
      </div>

      {/* ---------------- HERO ---------------- */}
      <header className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="uppercase text-xs tracking-wider text-blue-600 font-semibold mb-3">
            Blog • Guia de Concursos
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
            {title}
          </h1>

          <p className="text-slate-600 text-lg">{description}</p>

          {/* CTA inicial */}
          <a
            href="/"
            className="inline-block mt-6 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Fazer meu teste vocacional → 
          </a>
        </div>

        {/* Imagem opcional ao estilo Riverside */}
        {coverImage && (
          <div className="w-full hidden md:block">
            <img
              src={coverImage}
              alt="Imagem de capa"
              className="w-full h-64 object-cover rounded-xl shadow"
            />
          </div>
        )}
      </header>

      {/* ---------------- LAYOUT DO ARTIGO ---------------- */}
      <main className="max-w-4xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10">

        {/* ----------- CONTEÚDO PRINCIPAL ----------- */}
        <article className="prose prose-slate prose-lg max-w-none leading-relaxed">
          {children}

          {/* Bloco CTA dentro do conteúdo (igual Riverside) */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mt-12 mb-10">
            <h3 className="text-xl font-bold mb-2 text-blue-800">
              Descubra agora qual concurso combina com você
            </h3>
            <p className="text-blue-700 mb-4">
              Faça o teste vocacional para concursos e receba uma análise personalizada.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition"
            >
              Fazer teste gratuito →
            </a>
          </div>
        </article>

        {/* ----------- SIDEBAR (LATERAL) ----------- */}
        <aside className="hidden md:block sticky top-24 h-max">
          <div className="border border-slate-200 p-6 rounded-xl shadow-sm">
            <h4 className="text-lg font-bold mb-3">Teste Vocacional para Concursos</h4>
            <p className="text-sm text-slate-600 mb-4">
              Descubra com precisão qual área e qual concurso combina com o seu perfil.
            </p>
            <a
              href="/"
              className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition"
            >
              Fazer teste agora
            </a>
          </div>
        </aside>
      </main>

      {/* ---------------- CTA FINAL FIXA ---------------- */}
      <footer className="w-full border-t bg-white py-5 shadow-inner sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 flex justify-center">
          <a
            href="/"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg transition"
          >
            Fazer meu teste vocacional agora
          </a>
        </div>
      </footer>
    </div>
  );
}

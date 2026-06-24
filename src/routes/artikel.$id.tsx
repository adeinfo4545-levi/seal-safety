import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, User, ArrowRight, Phone } from "lucide-react";
import { articles } from "@/data/articles";
import { Nav, Footer, WhatsAppFAB } from "./index";
import { useT } from "@/lib/i18n";
import React from "react";

export const Route = createFileRoute("/artikel/$id")({
  component: ArtikelDetail,
  head: ({ params }) => {
    const id = params.id;
    const article = articles.find((a) => a.id === id);
    if (!article) {
      return {
        meta: [
          { title: "Artikel Tidak Ditemukan — SEAL Training Center" },
          { name: "description", content: "Artikel yang Anda cari tidak ditemukan." },
        ],
      };
    }
    return {
      meta: [
        { title: `${article.metaTitle} — SEAL Training Center` },
        { name: "description", content: article.metaDesc },
        { property: "og:title", content: article.metaTitle },
        { property: "og:description", content: article.metaDesc },
        { property: "og:image", content: article.img },
      ],
    };
  },
});

function ArtikelDetail() {
  const { id } = Route.useParams();
  const { t, lang } = useT();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background font-sans text-charcoal flex flex-col">
        <Nav />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="max-w-md text-center px-4">
            <h1 className="text-7xl font-black text-charcoal">404</h1>
            <h2 className="mt-4 text-xl font-bold text-charcoal">
              {t("Artikel Tidak Ditemukan", "Article Not Found")}
            </h2>
            <p className="mt-2 text-sm text-midgray">
              {t(
                "Artikel yang Anda cari tidak ada atau telah dipindahkan.",
                "The article you are looking for does not exist or has been moved.",
              )}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-charcoal px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <ArrowLeft size={16} /> {t("Kembali ke Beranda", "Back to Home")}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Filter other articles to show in the sidebar
  const otherArticles = articles.filter((a) => a.id !== id);

  return (
    <div className="min-h-screen bg-background font-sans text-charcoal flex flex-col">
      <Nav />

      {/* Breadcrumbs */}
      <div className="border-b border-border bg-lightgray py-4 text-[11px] font-bold uppercase tracking-wider text-midgray">
        <div className="container-swiss flex items-center gap-2">
          <Link to="/" className="hover:text-charcoal transition-colors">
            HOME
          </Link>
          <span>/</span>
          <span className="text-charcoal">{t("ARTIKEL", "ARTICLES")}</span>
          <span>/</span>
          <span className="text-charcoal/60 truncate max-w-[200px] sm:max-w-none">
            {t(article.t, article.tEn)}
          </span>
        </div>
      </div>

      {/* Main Layout */}
      <main className="flex-1 bg-background py-12 sm:py-20">
        <div className="container-swiss">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-midgray hover:text-charcoal transition-colors mb-8 group"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            {t("Kembali ke Beranda", "Back to Home")}
          </Link>

          {/* Article Header */}
          <header className="max-w-4xl mb-10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-charcoal bg-lime inline-block px-2.5 py-1 mb-4">
              HSE · {t("Wawasan", "Insight")}
            </div>
            <h1 className="text-3xl font-black leading-tight text-charcoal sm:text-4xl md:text-5xl tracking-tight">
              {t(article.t, article.tEn)}
            </h1>

            {/* Meta Info */}
            <div className="mt-6 flex flex-wrap items-center gap-y-3 gap-x-6 border-y border-border py-4 text-xs font-semibold text-midgray">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-charcoal" />
                <span>Tim HSE SEAL Training</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-charcoal" />
                <span>24 Juni 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-charcoal" />
                <span>{t(article.readTime, article.readTimeEn)}</span>
              </div>
            </div>
          </header>

          {/* Article Layout Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Main Article Content */}
            <article className="lg:col-span-8">
              {/* Featured Image */}
              <div className="aspect-[16/9] w-full overflow-hidden bg-lightgray border border-border mb-8">
                <img
                  src={article.img}
                  alt={t(article.t, article.tEn)}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Rendered Body Content */}
              <div className="prose max-w-none text-charcoal">
                {parseMarkdown(lang === "id" ? article.content : article.contentEn)}
              </div>
            </article>

            {/* Sidebar widgets */}
            <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 self-start">
              {/* CTA In-House Training Box */}
              <div className="bg-lime p-6 border border-charcoal text-charcoal flex flex-col">
                <h3 className="text-lg font-black leading-tight">
                  {t(
                    "Siap Meningkatkan Kompetensi Tim Anda?",
                    "Ready to Strengthen Your Team's Competency?",
                  )}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-charcoal/80">
                  {t(
                    "Dapatkan program in-house training H2S, Confined Space, atau K3 lainnya yang disesuaikan khusus untuk profil risiko perusahaan Anda.",
                    "Get tailored in-house training for H2S, Confined Space, or other HSE programs customized to your company's risk profile.",
                  )}
                </p>
                <a
                  href="/#contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
                >
                  <Phone size={14} /> {t("Hubungi Kami", "Contact Us")}
                </a>
              </div>

              {/* Other Articles widget */}
              <div className="border border-border p-6 bg-lightgray">
                <h3 className="text-sm font-black uppercase tracking-wider text-charcoal mb-4 pb-2 border-b border-border">
                  {t("Artikel Lainnya", "Other Articles")}
                </h3>
                <div className="space-y-4">
                  {otherArticles.map((other) => (
                    <Link
                      key={other.id}
                      to="/artikel/$id"
                      params={{ id: other.id }}
                      className="group block"
                    >
                      <div className="text-[10px] font-bold uppercase tracking-wider text-midgray mb-1">
                        HSE · {t("Wawasan", "Insight")}
                      </div>
                      <h4 className="text-sm font-bold text-charcoal group-hover:text-charcoal/70 leading-snug transition-colors line-clamp-2">
                        {t(other.t, other.tEn)}
                      </h4>
                      <div className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-charcoal">
                        {t("Baca Selengkapnya", "Read More")}{" "}
                        <ArrowRight
                          size={10}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

// Markdown Parser Helper Function
function parseMarkdown(md: string): React.ReactNode[] {
  const blocks = md.split(/\n\n+/);
  return blocks
    .map((block, index) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Heading 1 (Ignore as it's already rendered in header)
      if (trimmed.startsWith("# ")) {
        return null;
      }

      // Heading 2
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-xl sm:text-2xl font-black tracking-tight text-charcoal mt-10 mb-4 border-b border-border pb-2"
          >
            {renderInlineStyles(trimmed.slice(3))}
          </h2>
        );
      }

      // Heading 3
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-base sm:text-lg font-black text-charcoal mt-6 mb-3"
          >
            {renderInlineStyles(trimmed.slice(4))}
          </h3>
        );
      }

      // Blockquote
      if (trimmed.startsWith("> ")) {
        const quoteLines = trimmed
          .split("\n")
          .map((line) => line.replace(/^>\s*/, ""));
        return (
          <blockquote
            key={index}
            className="my-6 border-l-4 border-lime bg-lightgray p-5 text-sm sm:text-base italic leading-relaxed text-charcoal/90"
          >
            {quoteLines.map((line, lIdx) => (
              <p key={lIdx} className={lIdx > 0 ? "mt-2" : ""}>
                {renderInlineStyles(line)}
              </p>
            ))}
          </blockquote>
        );
      }

      // List
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").map((line) => line.replace(/^[-*]\s*/, ""));
        return (
          <ul
            key={index}
            className="my-5 space-y-2 pl-5 list-disc text-darkgray text-sm sm:text-base leading-relaxed"
          >
            {items.map((item, i) => (
              <li key={i}>{renderInlineStyles(item)}</li>
            ))}
          </ul>
        );
      }

      // Table
      if (trimmed.startsWith("|")) {
        const lines = trimmed
          .split("\n")
          .filter((line) => line.trim().startsWith("|"));
        if (lines.length > 1) {
          const rows = lines.map((line) =>
            line
              .split("|")
              .slice(1, -1)
              .map((cell) => cell.trim()),
          );

          const hasSeparator = rows[1] && rows[1].every((cell) => cell.startsWith("-"));
          const headerRow = rows[0];
          const dataRows = hasSeparator ? rows.slice(2) : rows.slice(1);

          return (
            <div key={index} className="my-6 overflow-x-auto border border-border">
              <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-charcoal text-white font-bold border-b border-charcoal">
                    {headerRow.map((cell, i) => (
                      <th key={i} className="px-4 py-3 border-r border-darkgray">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, rIndex) => (
                    <tr
                      key={rIndex}
                      className={rIndex % 2 === 0 ? "bg-white" : "bg-lightgray"}
                    >
                      {row.map((cell, cIndex) => (
                        <td
                          key={cIndex}
                          className="px-4 py-3 border-r border-border text-darkgray align-middle"
                        >
                          {renderInlineStyles(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Regular Paragraph
      return (
        <p
          key={index}
          className="my-4 text-sm sm:text-base leading-relaxed text-darkgray"
        >
          {renderInlineStyles(trimmed)}
        </p>
      );
    })
    .filter(Boolean);
}

// Inline Style Parser Function
function renderInlineStyles(text: string): React.ReactNode {
  const tokenRegex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  const matches = text.split(tokenRegex);

  return matches.map((match, idx) => {
    if (match.startsWith("**") && match.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-charcoal">
          {match.slice(2, -2)}
        </strong>
      );
    }
    if (match.startsWith("[") && match.includes("](")) {
      const labelEnd = match.indexOf("](");
      const label = match.slice(1, labelEnd);
      const url = match.slice(labelEnd + 2, -1);

      const isHash = url.startsWith("#");
      let targetUrl = url;

      if (url === "#") {
        if (label.toLowerCase().includes("jadwal")) {
          targetUrl = "/#schedule";
        } else {
          targetUrl = "/#contact";
        }
      } else if (isHash) {
        targetUrl = `/${url}`;
      }

      return (
        <a
          key={idx}
          href={targetUrl}
          className="font-bold text-charcoal underline decoration-lime decoration-2 underline-offset-2 hover:text-charcoal/70 transition-colors"
        >
          {label}
        </a>
      );
    }
    return match;
  });
}

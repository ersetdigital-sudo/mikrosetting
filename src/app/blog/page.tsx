import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { SearchIcon } from "@/components/common/Icons";
import { getArticles, formatDate, readingTime } from "@/lib/articles";
import BlogFilter from "./BlogFilter";

export const metadata: Metadata = {
  title: "Blog Jaringan MikroTik, OLT & WiFi",
  description:
    "Panduan praktis seputar MikroTik, OLT, hotspot, VPN, WiFi, dan keamanan jaringan untuk teknisi, pemilik RT/RW Net, sekolah, kantor, dan ISP.",
  keywords:
    "blog mikrotik, tutorial mikrotik, setting OLT, jaringan wifi, hotspot mikrotik, VPN port forwarding, RT RW Net",
  openGraph: {
    title: "Blog Jaringan MikroTik, OLT & WiFi | MikroSetting",
    description:
      "Insight teknis yang praktis, ringkas, dan bisa langsung diterapkan pada jaringan Anda.",
  },
};

// Data artikel diambil dari Supabase saat request (selalu fresh)
export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<string, string> = {
  MikroTik: "text-[var(--blue)]",
  "OLT & Fiber": "text-cyan-600",
  WiFi: "text-violet-600",
  Keamanan: "text-emerald-600",
  Hotspot: "text-violet-600",
  VPN: "text-[var(--blue)]",
};

export default async function BlogPage() {
  const articles = await getArticles();
  const featuredArticle = articles.find((a) => a.slug === "optimasi") ?? articles[0];
  const otherArticles = articles.filter((a) => a.slug !== featuredArticle?.slug);
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--navy)] via-[var(--navy-2)] to-[var(--blue)] text-white">
          <div className="hero-grid absolute inset-0 opacity-70" />
          <div className="absolute -top-24 right-0 w-80 h-80 rounded-full bg-[var(--cyan)]/20 blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
            <nav className="flex items-center gap-2 text-sm text-blue-100 mb-7" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white">Blog</span>
            </nav>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-widest uppercase text-[var(--cyan)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]" /> Knowledge Center
              </span>
              <h1 className="font-head font-extrabold text-4xl sm:text-5xl md:text-6xl leading-[1.08] mt-5">
                Upgrade skill jaringan, <span className="text-[var(--cyan)]">satu artikel</span> sekali baca.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed">
                Panduan teknis yang praktis dan mudah dipahami tentang MikroTik, OLT, WiFi, VPN, serta pengelolaan jaringan modern.
              </p>
              <div className="mt-8 max-w-xl relative">
                <label htmlFor="blogSearch" className="sr-only">Cari artikel</label>
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="blogSearch"
                  type="search"
                  placeholder="Cari topik: MikroTik, OLT, VPN..."
                  className="w-full h-13 rounded-xl bg-white text-slate-900 pl-12 pr-4 shadow-xl outline-none ring-4 ring-white/10 focus:ring-[var(--cyan)]/40 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filter */}
        <BlogFilter />

        {/* Featured Article */}
        {featuredArticle && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12" aria-labelledby="featured-title">
            <article className="article-card search-item overflow-hidden rounded-3xl bg-white border border-slate-200 grid lg:grid-cols-[1.12fr_.88fr]">
              <Link
                href={`/blog/artikel?topik=${featuredArticle.slug}`}
                className="overflow-hidden min-h-72 lg:min-h-105 block relative"
                aria-label={`Baca ${featuredArticle.title}`}
              >
                {featuredArticle.image && (
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                )}
              </Link>
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="text-[var(--blue)] uppercase tracking-widest">Pilihan Editor</span>
                  <span className="text-slate-300">•</span>
                  <time dateTime={featuredArticle.published_at ?? undefined} className="text-slate-500">{formatDate(featuredArticle.published_at)}</time>
                </div>
                <h2 id="featured-title" className="font-head font-extrabold text-2xl sm:text-3xl text-[var(--navy)] leading-tight mt-4">
                  {featuredArticle.title}
                </h2>
                <p className="mt-4 text-[var(--muted)] leading-relaxed">{featuredArticle.excerpt}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid place-items-center w-10 h-10 rounded-full bg-blue-100 text-[var(--blue)] font-head font-bold">MS</span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Tim MikroSetting</p>
                      <p className="text-xs text-slate-500">{readingTime(featuredArticle)}</p>
                    </div>
                  </div>
                  <Link
                    href={`/blog/artikel?topik=${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 text-[var(--blue)] font-bold text-sm hover:gap-3 transition-all"
                  >
                    Baca artikel <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Article Grid */}
        <section id="artikel-terbaru" className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-24" aria-labelledby="latest-title">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Insight Terbaru</span>
              <h2 id="latest-title" className="font-head font-extrabold text-3xl text-[var(--navy)] mt-2">Artikel pilihan untuk Anda</h2>
            </div>
            <p id="resultCount" className="text-sm text-slate-500">Menampilkan {otherArticles.length} artikel</p>
          </div>

          <div id="articleGrid" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherArticles.map((article) => (
              <article
                key={article.slug}
                className="article-card search-item bg-white rounded-2xl overflow-hidden border border-slate-200 flex flex-col"
                data-category={(article.category ?? "").toLowerCase()}
              >
                <Link href={`/blog/artikel?topik=${article.slug}`} className="block overflow-hidden h-52 relative">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </Link>
                <div className="p-6 flex flex-col grow">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold uppercase tracking-wider ${CATEGORY_COLORS[article.category ?? ""] || "text-[var(--blue)]"}`}>
                      {article.category}
                    </span>
                    <time dateTime={article.published_at ?? undefined} className="text-slate-400">{formatDate(article.published_at)}</time>
                  </div>
                  <h3 className="font-head font-bold text-xl leading-snug text-[var(--navy)] mt-3">
                    <Link href={`/blog/artikel?topik=${article.slug}`} className="hover:text-[var(--blue)]">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 mt-3">{article.excerpt}</p>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-400">
                    <span>{readingTime(article)}</span>
                    <Link href={`/blog/artikel?topik=${article.slug}`} className="font-bold text-[var(--blue)]">
                      Selengkapnya →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div id="emptyState" className="hidden text-center bg-white border border-dashed border-slate-300 rounded-2xl py-14 px-5">
            <p className="font-head font-bold text-xl text-[var(--navy)]">Artikel belum ditemukan</p>
            <p className="text-slate-500 mt-2">Coba kata kunci atau kategori lainnya.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 grid lg:grid-cols-[1fr_auto] items-center gap-8">
            <div className="max-w-2xl">
              <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Butuh bantuan langsung?</span>
              <h2 className="font-head font-extrabold text-3xl md:text-4xl text-[var(--navy)] mt-3">
                Masalah jaringan tidak selesai hanya dengan tutorial?
              </h2>
              <p className="text-slate-500 mt-4 leading-relaxed">
                Diskusikan topologi, perangkat, dan kendala Anda dengan tim MikroSetting. Konsultasi awal gratis.
              </p>
            </div>
            <a
              href="https://wa.me/6281112001036"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 bg-[var(--green)] hover:bg-green-700 text-white font-bold px-7 py-3.5 rounded-xl transition shadow-lg shadow-green-900/15"
            >
              Chat WhatsApp <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
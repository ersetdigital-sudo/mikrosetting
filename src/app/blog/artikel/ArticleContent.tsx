"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { WHATSAPP_URL } from "@/constants";
import { formatDate, readingTime, type Article, type TocItem } from "@/lib/articles";

type Props = {
  article: Article;
  toc: TocItem[];
  related: Article[];
};

export default function ArticleContent({ article, toc, related }: Props) {
  const [copyText, setCopyText] = useState("Salin link");
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(max ? window.scrollY / max : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Wrap tables in scrollable container for mobile
  useEffect(() => {
    const articleEl = document.querySelector(".reading-prose");
    if (!articleEl) return;
    const tables = articleEl.querySelectorAll("table:not(.table-wrapper table)");
    tables.forEach((table) => {
      if (table.parentElement?.classList.contains("table-wrapper")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "table-wrapper";
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      const checkScroll = () => {
        wrapper.classList.toggle("scrollable", wrapper.scrollWidth > wrapper.clientWidth);
      };
      checkScroll();
      window.addEventListener("resize", checkScroll);
    });
  }, [article.content]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyText("Link tersalin ✓");
      setTimeout(() => setCopyText("Salin link"), 1800);
    } catch {
      setCopyText("Gagal menyalin");
    }
  }, []);

  const dateLabel = formatDate(article.published_at);
  const lead = article.excerpt ?? article.meta_description ?? "";
  const faqs = article.faqs ?? [];

  return (
    <>
      <div
        className="reading-progress fixed top-0 left-0 right-0 z-[60] h-1 bg-gradient-to-r from-[var(--cyan)] to-[var(--blue)]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 md:pt-16 pb-6 md:pb-8">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--blue)]">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[var(--blue)]">Blog</Link>
              <span>/</span>
              <span className="truncate text-slate-700">{article.category}</span>
            </nav>
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                <span className="rounded-full bg-blue-50 text-[var(--blue)] px-3 py-1.5 uppercase tracking-widest">
                  {article.category}
                </span>
                <time dateTime={article.published_at ?? undefined} className="text-slate-400">{dateLabel}</time>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{readingTime(article)}</span>
              </div>
              <h1 className="font-head font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.12] text-[var(--navy)] mt-5">
                {article.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed mt-5 max-w-3xl">
                {lead}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-11 h-11 rounded-full bg-blue-100 text-[var(--blue)] font-head font-bold">MS</span>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{article.author ?? "Tim MikroSetting"}</p>
                    <p className="text-xs text-slate-500">Praktisi jaringan</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-600 hover:border-blue-300 hover:text-[var(--blue)] transition"
                    aria-label="Salin tautan"
                  >
                    {copyText}
                  </button>
                  <Link
                    href="/blog"
                    className="inline-flex items-center rounded-lg bg-slate-100 px-3.5 py-2 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-[var(--blue)]"
                  >
                    ← Semua artikel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 md:pt-6 pb-8 md:pb-12">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-10 lg:gap-14 items-start">
            <article className="min-w-0">
              {/* Article Body — konten dari Supabase */}
              <div
                className="reading-prose bg-white rounded-2xl border border-slate-200 mt-4 md:mt-6 p-6 sm:p-9 md:p-11"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* FAQ */}
              {faqs.length > 0 && (
                <section id="faq" className="bg-white rounded-2xl border border-slate-200 mt-8 p-6 sm:p-9" aria-labelledby="faq-title">
                  <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Pertanyaan Umum</span>
                  <h2 id="faq-title" className="font-head font-extrabold text-2xl sm:text-3xl text-[var(--navy)] mt-2">FAQ</h2>
                  <div className="mt-6 divide-y divide-slate-200">
                    {faqs.map((f, i) => (
                      <details key={i} className="group py-4" {...(i === 0 ? { open: true } : {})}>
                        <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[var(--navy)]">
                          {f.q}
                          <span className="text-[var(--blue)] text-xl group-open:rotate-45 transition">+</span>
                        </summary>
                        <p className="text-sm leading-relaxed text-slate-500 mt-3 pr-8">{f.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}


              {/* CTA */}
              <section className="mt-8 rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[var(--blue)] text-white p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[var(--cyan)]">Perlu konfigurasi langsung?</p>
                  <h2 className="font-head font-extrabold text-2xl mt-2">Konsultasikan topologi Anda</h2>
                  <p className="text-blue-100 text-sm mt-2">Tim kami siap membantu audit dan konfigurasi jarak jauh.</p>
                </div>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="shrink-0 inline-flex justify-center bg-[var(--green)] hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition">Chat WhatsApp →</a>
              </section>

              {/* Author */}
              <section className="bg-white rounded-2xl border border-slate-200 mt-8 p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:items-center">
                <span className="grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-[var(--blue)] font-head font-extrabold text-xl shrink-0">MS</span>
                <div className="grow">
                  <p className="text-xs font-bold tracking-widest uppercase text-[var(--blue)]">Tentang Penulis</p>
                  <h2 className="font-head font-extrabold text-xl text-[var(--navy)] mt-1">Tim MikroSetting</h2>
                  <p className="text-sm leading-relaxed text-slate-500 mt-2">Praktisi jaringan yang menangani konfigurasi MikroTik, OLT, hotspot, VPN, dan access point untuk berbagai kebutuhan operasional.</p>
                </div>
                <Link href="/tentang" className="text-sm font-bold text-[var(--blue)] shrink-0">Tentang kami →</Link>
              </section>

              {/* Related Articles */}
              {related.length > 0 && (
                <section className="mt-8" aria-labelledby="related-title">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Lanjut Membaca</span>
                      <h2 id="related-title" className="font-head font-extrabold text-2xl text-[var(--navy)] mt-2">Artikel terkait</h2>
                    </div>
                    <Link href="/blog" className="text-sm font-bold text-[var(--blue)]">Lihat semua →</Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-5">
                    {related.map((a) => (
                      <Link key={a.slug} href={`/blog/artikel?topik=${a.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300 hover:shadow-lg transition">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--blue)]">{a.category}</span>
                        <h3 className="font-head font-bold text-lg leading-snug text-[var(--navy)] mt-2 group-hover:text-[var(--blue)]">{a.title}</h3>
                        <span className="inline-block text-sm font-bold text-[var(--blue)] mt-4">Baca artikel →</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 space-y-5">
              <div className="rounded-2xl bg-white border border-slate-200 p-5">
                <p className="font-head font-bold text-[var(--navy)]">Dalam artikel ini</p>
                <nav className="mt-4 grid gap-1 text-sm">
                  {toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`} className="toc-link rounded-lg px-3 py-2 text-slate-500 hover:bg-blue-50 hover:text-[var(--blue)]">
                      {item.text.replace(/^\d+\.\s*/, "")}
                    </a>
                  ))}
                  {faqs.length > 0 && (
                    <a href="#faq" className="toc-link rounded-lg px-3 py-2 text-slate-500 hover:bg-blue-50 hover:text-[var(--blue)]">FAQ</a>
                  )}
                </nav>
              </div>
              <div className="rounded-2xl bg-[var(--navy)] text-white p-5">
                <span className="text-[var(--cyan)] text-xs font-bold tracking-widest uppercase">Catatan penting</span>
                <p className="font-head font-bold text-lg mt-2">Backup sebelum eksekusi</p>
                <p className="text-sm leading-relaxed text-blue-100 mt-2">Setiap jaringan berbeda. Uji perubahan di luar jam sibuk dan siapkan jalur rollback.</p>
              </div>
              <Link href="/blog" className="flex items-center justify-between rounded-2xl bg-white border border-slate-200 p-5 font-bold text-sm text-[var(--blue)] hover:border-blue-300">
                Artikel lainnya <span>→</span>
              </Link>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react"
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { SparkleIcon } from "@/components/common/Icons";
import { articles, guidance, articleSlugs } from "@/lib/blogData";
import type { ArticleData, GuidanceData } from "@/types";

export default function ArticleContent({ topic }: { topic: string }) {
  const [copyText, setCopyText] = useState("Salin link");
  const [scrollProgress, setScrollProgress] = useState(0);

  const data: ArticleData = articles[topic] || articles.optimasi;
  const extra: GuidanceData = guidance[data.category] || guidance.MikroTik;
  const relatedSlugs = articleSlugs.filter((s) => s !== topic).slice(0, 2);

  const handleScroll = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(max ? window.scrollY / max : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyText("Link tersalin ✓");
      setTimeout(() => setCopyText("Salin link"), 1800);
    } catch {
      setCopyText("Gagal menyalin");
    }
  }, []);

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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 md:pt-16 pb-8 md:pb-12">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--blue)]">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[var(--blue)]">Blog</Link>
              <span>/</span>
              <span className="truncate text-slate-700">{data.category}</span>
            </nav>
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                <span className="rounded-full bg-blue-50 text-[var(--blue)] px-3 py-1.5 uppercase tracking-widest">
                  {data.category}
                </span>
                <time dateTime={data.date} className="text-slate-400">{data.date}</time>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{data.time}</span>
              </div>
              <h1 className="font-head font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.12] text-[var(--navy)] mt-5">
                {data.title}
              </h1>
              <p className="text-lg md:text-xl text-slate-500 leading-relaxed mt-5 max-w-3xl">
                {data.lead}
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-11 h-11 rounded-full bg-blue-100 text-[var(--blue)] font-head font-bold">MS</span>
                  <div>
                    <p className="font-bold text-sm text-slate-900">Tim MikroSetting</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-10 lg:gap-14 items-start">
            <article className="min-w-0">
              {/* Hero visual */}
              <figure className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-72 sm:min-h-0 sm:aspect-[16/9] bg-gradient-to-br from-slate-950 via-[var(--navy)] to-blue-700 shadow-[0_24px_65px_-35px_rgba(11,27,77,.55)]" aria-label="Visualisasi performa jaringan">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
                <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-cyan-400/25 blur-3xl" />
                <div className="absolute left-[8%] right-[8%] top-[14%] bottom-[14%] rounded-2xl border border-white/15 bg-white/10 backdrop-blur p-5 sm:p-8 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] sm:text-xs font-bold tracking-[.2em] uppercase text-[var(--cyan)]">{data.category}</p>
                      <p className="font-head font-bold text-white text-lg sm:text-2xl mt-2 max-w-lg line-clamp-2">{data.title}</p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-2 rounded-full bg-emerald-400/15 border border-emerald-300/30 px-3 py-1 text-[10px] sm:text-xs font-bold text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" /> Online
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="rounded-xl bg-slate-950/45 border border-white/10 p-3 sm:p-4">
                      <p className="text-[9px] sm:text-xs text-blue-200">Latency</p>
                      <p className="font-head font-extrabold text-white text-lg sm:text-2xl mt-1">12 <span className="text-xs font-normal text-blue-200">ms</span></p>
                    </div>
                    <div className="rounded-xl bg-slate-950/45 border border-white/10 p-3 sm:p-4">
                      <p className="text-[9px] sm:text-xs text-blue-200">Uptime</p>
                      <p className="font-head font-extrabold text-white text-lg sm:text-2xl mt-1">99.9<span className="text-xs font-normal text-blue-200">%</span></p>
                    </div>
                    <div className="rounded-xl bg-slate-950/45 border border-white/10 p-3 sm:p-4">
                      <p className="text-[9px] sm:text-xs text-blue-200">Status</p>
                      <p className="font-head font-extrabold text-emerald-300 text-sm sm:text-xl mt-1">Stabil</p>
                    </div>
                  </div>
                </div>
              </figure>

              {/* AI Summary */}
              <section className="ai-shine relative overflow-hidden rounded-2xl border border-blue-200 mt-8 p-5 sm:p-7" aria-labelledby="ai-title">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-cyan-300/20 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white shadow-lg">
                        <SparkleIcon className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-indigo-600">Ringkasan cerdas</p>
                        <h2 id="ai-title" className="font-head font-extrabold text-xl text-[var(--navy)]">Intisari Artikel</h2>
                      </div>
                    </div>
                    <span className="hidden sm:inline-flex rounded-full border border-blue-200 bg-white/70 px-3 py-1 text-[11px] font-bold text-slate-500">± 30 detik baca</span>
                  </div>
                  <p className="mt-5 text-slate-700 leading-relaxed">{data.summary}</p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                    {data.points.map((p, i) => (
                      <li key={i} className="rounded-xl bg-white/75 border border-white p-3 text-sm font-bold text-slate-700">
                        <span className="text-[var(--blue)] mr-1">0{i + 1}.</span> {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[11px] text-slate-400">Ringkasan otomatis berdasarkan isi artikel. Verifikasi konfigurasi sesuai topologi dan versi RouterOS Anda.</p>
                </div>
              </section>

              {/* Article Body */}
              <div className="reading-prose bg-white rounded-2xl border border-slate-200 mt-8 p-6 sm:p-9 md:p-11">
                <p><strong className="text-[var(--navy)]">{data.title}</strong> bukan sekadar soal memasukkan beberapa rule lalu selesai. Konfigurasi yang baik harus sesuai topologi, kapasitas perangkat, jumlah pengguna, dan pola trafik pada jam sibuk.</p>
                <p>{data.lead} Panduan ini membahas proses dari persiapan sampai verifikasi agar hasilnya dapat diukur, didokumentasikan, dan mudah dirawat oleh teknisi berikutnya.</p>
                <h2 id="context">Kenapa topik ini penting?</h2>
                <p>Masalah jaringan sering terlihat sederhana di sisi pengguna, tetapi penyebabnya bisa berasal dari banyak lapisan. Tanpa baseline, teknisi cenderung mencoba banyak perubahan sekaligus dan akhirnya tidak mengetahui konfigurasi mana yang benar-benar memberi dampak.</p>
                <ul>{data.points.map((p, i) => (<li key={i}>{p} menjadi bagian utama yang perlu diperiksa.</li>))}</ul>
                {data.sections.map((s, i) => (
                  <div key={i}>
                    <h2 id={s[0]}>{s[1]}</h2>
                    <p>{s[2]}</p>
                    <p>Pada tahap ini, catat kondisi awal dan hasil sesudah perubahan. Jalankan pengujian dari sisi router sekaligus perangkat pengguna karena hasil yang terlihat baik di router belum tentu sama di lapangan.</p>
                    {i === 1 && (
                      <div className="mt-6 rounded-xl bg-slate-950 p-5 text-sm text-slate-200 overflow-x-auto">
                        <div className="flex justify-between gap-4 text-xs text-slate-500 mb-3"><span>Alur implementasi aman</span><span>Checklist</span></div>
                        <code>backup → audit → konfigurasi → pengujian → monitoring</code>
                      </div>
                    )}
                  </div>
                ))}
                <h2 id="verification">Cara memverifikasi hasil</h2>
                <p>Jangan berhenti setelah konfigurasi berhasil disimpan. Uji kembali layanan utama pada kondisi normal dan saat beban meningkat. Bandingkan hasilnya dengan baseline yang dibuat di awal.</p>
                <ul>
                  <li>Lakukan ping dan traceroute dari beberapa segmen jaringan.</li>
                  <li>Uji akses layanan utama menggunakan perangkat pengguna nyata.</li>
                  <li>Pantau resource dan log minimal selama satu siklus jam sibuk.</li>
                  <li>Simpan dokumentasi perubahan, hasil tes, dan jalur rollback.</li>
                </ul>
                <div className="mt-8 rounded-2xl border-l-4 border-[var(--blue)] bg-blue-50 p-5">
                  <p className="!mt-0 !text-base"><strong className="text-[var(--navy)]">Tips teknisi:</strong> Selalu simpan backup dan lakukan perubahan satu per satu agar proses rollback mudah dilakukan.</p>
                </div>
              </div>

              {/* Metrics Table */}
              <section className="bg-white rounded-2xl border border-slate-200 mt-8 p-6 sm:p-9" aria-labelledby="checklist-title">
                <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Checklist Implementasi</span>
                <h2 id="checklist-title" className="font-head font-extrabold text-2xl sm:text-3xl text-[var(--navy)] mt-2">Sebelum dan sesudah konfigurasi</h2>
                <p className="text-slate-500 leading-relaxed mt-3">Gunakan tabel ini sebagai kontrol kualitas sederhana. Catat hasil pengukuran agar perubahan tidak hanya dinilai berdasarkan perasaan.</p>
                <div className="overflow-x-auto mt-6 rounded-xl border border-slate-200">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead className="bg-slate-50 text-left text-[var(--navy)]">
                      <tr><th className="px-5 py-4 font-bold">Parameter</th><th className="px-5 py-4 font-bold">Sebelum</th><th className="px-5 py-4 font-bold">Target</th><th className="px-5 py-4 font-bold">Cara cek</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {extra.metrics.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => j === 0 ? (
                            <th key={j} className="px-5 py-4 font-bold text-slate-800 text-left">{cell}</th>
                          ) : (
                            <td key={j} className="px-5 py-4 text-slate-500">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Mistakes */}
              <section className="bg-white rounded-2xl border border-slate-200 mt-8 p-6 sm:p-9" aria-labelledby="mistakes-title">
                <span className="text-rose-600 text-xs font-bold tracking-widest uppercase">Wajib Dihindari</span>
                <h2 id="mistakes-title" className="font-head font-extrabold text-2xl sm:text-3xl text-[var(--navy)] mt-2">Kesalahan yang sering terjadi</h2>
                <div className="grid sm:grid-cols-3 gap-4 mt-6">
                  {extra.mistakes.map((m, i) => (
                    <article key={i} className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
                      <span className="grid place-items-center w-7 h-7 rounded-lg bg-rose-100 text-rose-600 text-xs font-extrabold">{i + 1}</span>
                      <p className="text-sm leading-relaxed text-slate-600 mt-3">{m}</p>
                    </article>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-white rounded-2xl border border-slate-200 mt-8 p-6 sm:p-9" aria-labelledby="faq-title">
                <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Pertanyaan Umum</span>
                <h2 id="faq-title" className="font-head font-extrabold text-2xl sm:text-3xl text-[var(--navy)] mt-2">FAQ</h2>
                <div className="mt-6 divide-y divide-slate-200">
                  {extra.faqs.map((f, i) => (
                    <details key={i} className="group py-4" {...(i === 0 ? { open: true } : {})}>
                      <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-[var(--navy)]">
                        {f[0]}
                        <span className="text-[var(--blue)] text-xl group-open:rotate-45 transition">+</span>
                      </summary>
                      <p className="text-sm leading-relaxed text-slate-500 mt-3 pr-8">{f[1]}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section className="mt-8 rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[var(--blue)] text-white p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[var(--cyan)]">Perlu konfigurasi langsung?</p>
                  <h2 className="font-head font-extrabold text-2xl mt-2">Konsultasikan topologi Anda</h2>
                  <p className="text-blue-100 text-sm mt-2">Tim kami siap membantu audit dan konfigurasi jarak jauh.</p>
                </div>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener" className="shrink-0 inline-flex justify-center bg-[var(--green)] hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition">Chat WhatsApp →</a>
              </section>

              {/* Author */}
              <section className="bg-white rounded-2xl border border-slate-200 mt-8 p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:items-center">
                <span className="grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-[var(--blue)] font-head font-extrabold text-xl shrink-0">MS</span>
                <div className="grow">
                  <p className="text-xs font-bold tracking-widest uppercase text-[var(--blue)]">Tentang Penulis</p>
                  <h2 className="font-head font-extrabold text-xl text-[var(--navy)] mt-1">Tim MikroSetting</h2>
                  <p className="text-sm leading-relaxed text-slate-500 mt-2">Praktisi jaringan yang menangani konfigurasi MikroTik, OLT, hotspot, VPN, dan access point untuk berbagai kebutuhan operasional.</p>
                </div>
                <Link href="/#tentang" className="text-sm font-bold text-[var(--blue)] shrink-0">Tentang kami →</Link>
              </section>

              {/* Related Articles */}
              <section className="mt-8" aria-labelledby="related-title">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Lanjut Membaca</span>
                    <h2 id="related-title" className="font-head font-extrabold text-2xl text-[var(--navy)] mt-2">Artikel terkait</h2>
                  </div>
                  <Link href="/blog" className="text-sm font-bold text-[var(--blue)]">Lihat semua →</Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-5">
                  {relatedSlugs.map((slug) => {
                    const a = articles[slug];
                    return (
                      <Link key={slug} href={`/blog/artikel?topik=${slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300 hover:shadow-lg transition">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--blue)]">{a.category}</span>
                        <h3 className="font-head font-bold text-lg leading-snug text-[var(--navy)] mt-2 group-hover:text-[var(--blue)]">{a.title}</h3>
                        <span className="inline-block text-sm font-bold text-[var(--blue)] mt-4">Baca artikel →</span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 space-y-5">
              <div className="rounded-2xl bg-white border border-slate-200 p-5">
                <p className="font-head font-bold text-[var(--navy)]">Dalam artikel ini</p>
                <nav className="mt-4 grid gap-1 text-sm">
                  <a href="#context" className="toc-link rounded-lg px-3 py-2 text-slate-500 hover:bg-blue-50 hover:text-[var(--blue)]">Kenapa ini penting</a>
                  {data.sections.map((s) => (
                    <a key={s[0]} href={`#${s[0]}`} className="toc-link rounded-lg px-3 py-2 text-slate-500 hover:bg-blue-50 hover:text-[var(--blue)]">{s[1].replace(/^\d+\.\s*/, "")}</a>
                  ))}
                  <a href="#verification" className="toc-link rounded-lg px-3 py-2 text-slate-500 hover:bg-blue-50 hover:text-[var(--blue)]">Verifikasi hasil</a>
                  <a href="#faq" className="toc-link rounded-lg px-3 py-2 text-slate-500 hover:bg-blue-50 hover:text-[var(--blue)]">FAQ</a>
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



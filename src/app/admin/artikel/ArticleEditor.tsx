"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Article, ArticleFaq } from "@/lib/articles";
import TipTapEditor from "@/components/tiptap-editor";

type Props = { mode: "create" | "edit"; initial?: Article };

const CATEGORIES = ["MikroTik", "OLT & Fiber", "WiFi", "Hotspot", "VPN", "Keamanan"];

const PRESET_IMAGES = [
  { label: "Jaringan / Server", value: "/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png" },
  { label: "VPN / Keamanan", value: "/images/751c3bc4-1bc6-40bd-aa78-5b5dde4f7868.png" },
  { label: "Hotspot / Voucher", value: "/images/b016bc02-0547-4245-9a6f-6b3b9d2b540e.png" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function countWords(html: string): number {
  return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

function ensureH2Ids(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const used = new Set<string>();
  doc.querySelectorAll("h2").forEach((h2) => {
    let id = h2.id || slugify(h2.textContent ?? "");
    if (!id) id = "section";
    let candidate = id;
    let i = 2;
    while (used.has(candidate)) candidate = `${id}-${i++}`;
    used.add(candidate);
    h2.id = candidate;
  });
  return doc.body.innerHTML;
}

export default function ArticleEditor({ mode, initial }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [metaDescription, setMetaDescription] = useState(initial?.meta_description ?? "");
  const [category, setCategory] = useState(initial?.category ?? "MikroTik");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [image, setImage] = useState(initial?.image ?? PRESET_IMAGES[0].value);
  const [keywordsStr, setKeywordsStr] = useState((initial?.keywords ?? []).join(", "));
  const [faqs, setFaqs] = useState<ArticleFaq[]>(initial?.faqs ?? []);
  const [html, setHtml] = useState(initial?.content ?? "");
  const [tab, setTab] = useState<"tulis" | "preview">("tulis");
  const [saving, setSaving] = useState<false | "draft" | "published">(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const words = countWords(html);
  const readingMins = Math.max(1, Math.ceil(words / 200));

  const save = async (targetStatus: "draft" | "published") => {
    setSaving(targetStatus);
    setNotice(null);
    const finalHtml = ensureH2Ids(html);
    setHtml(finalHtml);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      meta_description: metaDescription.trim(),
      category,
      excerpt: excerpt.trim(),
      content: finalHtml,
      keywords: keywordsStr.split(",").map((k) => k.trim()).filter(Boolean),
      faqs: faqs.filter((f) => f.q.trim() && f.a.trim()),
      image,
      status: targetStatus,
    };

    const url = mode === "create" ? "/api/admin/articles" : `/api/admin/articles/${initial!.id}`;
    const res = await fetch(url, {
      method: mode === "create" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => null);
    setSaving(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setNotice({ ok: false, text: data?.error ?? "Gagal menyimpan." });
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <Link href="/admin" className="text-sm font-bold text-slate-500 hover:text-[var(--blue)]">
          &larr; Semua Artikel
        </Link>
        <div className="flex items-center gap-2">
          <div className="rounded-lg border border-slate-200 bg-white p-0.5 flex text-sm font-bold">
            <button
              onClick={() => setTab("tulis")}
              className={`px-4 py-1.5 rounded-md transition ${tab === "tulis" ? "bg-[var(--blue)] text-white" : "text-slate-500 hover:text-[var(--blue)]"}`}
            >
              Tulis
            </button>
            <button
              onClick={() => setTab("preview")}
              className={`px-4 py-1.5 rounded-md transition ${tab === "preview" ? "bg-[var(--blue)] text-white" : "text-slate-500 hover:text-[var(--blue)]"}`}
            >
              Preview
            </button>
          </div>
          <span className="hidden sm:inline text-xs text-slate-400">{words.toLocaleString("id-ID")} kata &bull; &plusmn;{readingMins} mnt</span>
          <button
            onClick={() => save("draft")}
            disabled={saving !== false}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:border-blue-300 hover:text-[var(--blue)] transition disabled:opacity-50"
          >
            {saving === "draft" ? "Menyimpan..." : "Simpan Draft"}
          </button>
          <button
            onClick={() => save("published")}
            disabled={saving !== false}
            className="rounded-lg bg-[var(--blue)] px-5 py-2 text-sm font-bold text-white hover:bg-[var(--navy-2)] transition disabled:opacity-50"
          >
            {saving === "published" ? "Memproses..." : mode === "create" ? "Publish" : "Update"}
          </button>
        </div>
      </div>

      {notice && (
        <div className={`mb-5 rounded-xl border px-4 py-3 text-sm font-semibold ${notice.ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
          {notice.text}
        </div>
      )}

      {tab === "tulis" ? (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-5">
              <input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Tulis judul artikel di sini..."
                className="w-full font-head font-extrabold text-2xl sm:text-3xl text-[var(--navy)] placeholder:text-slate-300 outline-none"
              />
            </div>

            <TipTapEditor content={html} onChange={setHtml} />

            <div className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-head font-extrabold text-lg text-[var(--navy)]">FAQ Artikel</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Tampil sebagai accordion + schema FAQPage di blog.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFaqs([...faqs, { q: "", a: "" }])}
                  className="rounded-lg border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-600 hover:border-blue-300 hover:text-[var(--blue)] transition"
                >
                  + Tambah FAQ
                </button>
              </div>
              <div className="space-y-3">
                {faqs.length === 0 && (
                  <p className="text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl px-4 py-6 text-center">
                    Belum ada FAQ &mdash; klik &quot;+ Tambah FAQ&quot; untuk menambahkan.
                  </p>
                )}
                {faqs.map((f, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 p-4 space-y-2 bg-slate-50/50">
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 grid place-items-center w-6 h-6 rounded-md bg-blue-100 text-[var(--blue)] text-xs font-extrabold mt-1">{i + 1}</span>
                      <input
                        value={f.q}
                        onChange={(e) => setFaqs(faqs.map((x, xi) => (xi === i ? { ...x, q: e.target.value } : x)))}
                        placeholder="Pertanyaan (contoh: Apakah load balance menggabungkan kecepatan?)"
                        className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-800 outline-none focus:border-[var(--blue)]"
                      />
                      <button
                        type="button"
                        onClick={() => setFaqs(faqs.filter((_, xi) => xi !== i))}
                        className="shrink-0 grid place-items-center w-9 h-10 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                        title="Hapus FAQ"
                      >
                        &#x2715;
                      </button>
                    </div>
                    <textarea
                      value={f.a}
                      onChange={(e) => setFaqs(faqs.map((x, xi) => (xi === i ? { ...x, a: e.target.value } : x)))}
                      placeholder="Jawaban langsung 40-80 kata..."
                      rows={3}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[var(--blue)] resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-20">
            <div className="rounded-2xl bg-white border border-slate-200 p-5">
              <h3 className="font-head font-extrabold text-[var(--navy)]">Publish</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p className="flex justify-between"><span>Kata</span><b>{words.toLocaleString("id-ID")}</b></p>
                <p className="flex justify-between"><span>Estimasi baca</span><b>{readingMins} menit</b></p>
                <p className="flex justify-between"><span>FAQ</span><b>{faqs.filter((f) => f.q.trim() && f.a.trim()).length}</b></p>
              </div>
              {mode === "edit" && initial?.status === "published" && (
                <a
                  href={`/blog/artikel?topik=${initial.slug}`}
                  target="_blank"
                  rel="noopener"
                  className="mt-4 block text-center rounded-lg border border-slate-200 py-2 text-sm font-bold text-[var(--blue)] hover:border-blue-300 transition"
                >
                  Lihat artikel live &#x2197;
                </a>
              )}
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
              <h3 className="font-head font-extrabold text-[var(--navy)]">Meta SEO</h3>
              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <label className="text-xs font-bold text-slate-600">Judul (title tag)</label>
                  <span className={`text-[11px] font-bold ${title.length > 60 ? "text-rose-500" : "text-slate-400"}`}>{title.length}/60</span>
                </div>
                <p className="text-xs text-slate-400">Diisi dari judul artikel di atas.</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Slug URL</label>
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="text-slate-400 text-xs">?topik=</span>
                  <input
                    value={slug}
                    onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }}
                    disabled={mode === "edit"}
                    className="w-full h-9 rounded-lg border border-slate-300 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)] disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                {mode === "edit" && <p className="text-[11px] text-slate-400 mt-1">Slug terkunci agar URL tidak berubah.</p>}
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <label className="text-xs font-bold text-slate-600">Meta description</label>
                  <span className={`text-[11px] font-bold ${metaDescription.length >= 140 && metaDescription.length <= 160 ? "text-emerald-600" : metaDescription.length > 160 ? "text-rose-500" : "text-amber-500"}`}>
                    {metaDescription.length}/160
                  </span>
                </div>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  placeholder="Ringkasan 140-160 karakter untuk hasil pencarian Google..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[var(--blue)] resize-y"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Keywords (pisah koma)</label>
                <input
                  value={keywordsStr}
                  onChange={(e) => setKeywordsStr(e.target.value)}
                  placeholder="optimasi mikrotik, mikrotik lemot, pcq"
                  className="w-full h-9 rounded-lg border border-slate-300 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)]"
                />
              </div>
              <div className="rounded-xl border border-slate-200 p-3 bg-slate-50">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Preview Google</p>
                <p className="text-[#1a0dab] text-base leading-snug truncate">{title || "Judul artikel..."}</p>
                <p className="text-[#006621] text-xs truncate">mikrosetting.com/blog/artikel?topik={slug || "..."}</p>
                <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">{metaDescription || "Meta description akan tampil di sini..."}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)] bg-white"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Gambar sampul</label>
                <select
                  value={PRESET_IMAGES.some((p) => p.value === image) ? image : "custom"}
                  onChange={(e) => { if (e.target.value !== "custom") setImage(e.target.value); }}
                  className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)] bg-white"
                >
                  {PRESET_IMAGES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  <option value="custom">URL kustom...</option>
                </select>
                {!PRESET_IMAGES.some((p) => p.value === image) && (
                  <input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/... atau https://..."
                    className="mt-2 w-full h-9 rounded-lg border border-slate-300 px-3 text-sm text-slate-800 outline-none focus:border-[var(--blue)]"
                  />
                )}
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5">Excerpt (ringkasan kartu)</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  placeholder="1-2 kalimat ringkasan untuk kartu blog &amp; lead artikel..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[var(--blue)] resize-y"
                />
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto">
          <section className="bg-white border border-slate-200 rounded-2xl">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                <span className="rounded-full bg-blue-50 text-[var(--blue)] px-3 py-1.5 uppercase tracking-widest">{category}</span>
                <span className="text-slate-400">{new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-slate-500">{readingMins} menit baca</span>
              </div>
              <h1 className="font-head font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.12] text-[var(--navy)] mt-5">
                {title || "Judul artikel..."}
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mt-5 max-w-3xl">
                {excerpt || metaDescription || "Excerpt / lead artikel..."}
              </p>
            </div>
          </section>

          <div
            className="reading-prose bg-white rounded-2xl border border-slate-200 mt-6 p-6 sm:p-9 md:p-11"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {faqs.some((f) => f.q.trim() && f.a.trim()) && (
            <section className="bg-white rounded-2xl border border-slate-200 mt-6 p-6 sm:p-9">
              <span className="text-[var(--blue)] text-xs font-bold tracking-widest uppercase">Pertanyaan Umum</span>
              <h2 className="font-head font-extrabold text-2xl sm:text-3xl text-[var(--navy)] mt-2">FAQ</h2>
              <div className="mt-6 divide-y divide-slate-200">
                {faqs.filter((f) => f.q.trim() && f.a.trim()).map((f, i) => (
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

          <section className="mt-6 rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[var(--blue)] text-white p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-[var(--cyan)]">Perlu konfigurasi langsung?</p>
              <h2 className="font-head font-extrabold text-2xl mt-2">Konsultasikan topologi Anda</h2>
              <p className="text-blue-100 text-sm mt-2">Tim kami siap membantu audit dan konfigurasi jarak jauh.</p>
            </div>
            <span className="shrink-0 inline-flex justify-center bg-[var(--green)] text-white font-bold px-6 py-3 rounded-xl">Chat WhatsApp &rarr;</span>
          </section>
        </div>
      )}
    </main>
  );
}

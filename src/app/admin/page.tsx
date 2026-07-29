import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { adminListArticles } from "@/lib/articles-admin";
import { formatDate } from "@/lib/articles";
import DeleteArticleButton from "./DeleteArticleButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();
  const articles = await adminListArticles();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-head font-extrabold text-2xl text-[var(--navy)]">Artikel</h1>
          <p className="text-sm text-slate-500 mt-1">{articles.length} artikel total — klik judul untuk edit.</p>
        </div>
        <Link
          href="/admin/artikel/baru"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--blue)] hover:bg-[var(--navy-2)] text-white font-bold px-5 py-2.5 transition shadow"
        >
          + Tulis Artikel Baru
        </Link>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3.5 font-bold">Judul</th>
              <th className="px-4 py-3.5 font-bold">Kategori</th>
              <th className="px-4 py-3.5 font-bold">Status</th>
              <th className="px-4 py-3.5 font-bold">Kata</th>
              <th className="px-4 py-3.5 font-bold">Tanggal</th>
              <th className="px-4 py-3.5 font-bold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.map((a) => (
              <tr key={a.id} className="hover:bg-blue-50/40 transition">
                <td className="px-5 py-4">
                  <Link href={`/admin/artikel/${a.id}`} className="font-bold text-[var(--navy)] hover:text-[var(--blue)]">
                    {a.title}
                  </Link>
                  <p className="text-xs text-slate-400 mt-0.5">/{a.slug}</p>
                </td>
                <td className="px-4 py-4 text-slate-600">{a.category}</td>
                <td className="px-4 py-4">
                  {a.status === "published" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Draft
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-slate-600">{a.word_count?.toLocaleString("id-ID") ?? "-"}</td>
                <td className="px-4 py-4 text-slate-600">{formatDate(a.published_at ?? a.updated_at)}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/artikel/${a.id}`}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-blue-300 hover:text-[var(--blue)] transition"
                    >
                      Edit
                    </Link>
                    {a.status === "published" && (
                      <a
                        href={`/blog/artikel?topik=${a.slug}`}
                        target="_blank"
                        rel="noopener"
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-blue-300 hover:text-[var(--blue)] transition"
                      >
                        Lihat ↗
                      </a>
                    )}
                    <DeleteArticleButton id={a.id} title={a.title} />
                  </div>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-14 text-center text-slate-400">
                  Belum ada artikel. <Link href="/admin/artikel/baru" className="font-bold text-[var(--blue)]">Tulis yang pertama →</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

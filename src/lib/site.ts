/**
 * Sumber tunggal (single source of truth) untuk URL kanonis situs.
 *
 * KENAPA ADA FILE INI:
 * Sebelumnya URL produksi di-hardcode di 12 file berbeda. Saat domain
 * mikrosetting.com mengarah ke server lain (mis. halaman "under maintenance"
 * WordPress di hosting lama), SELURUH canonical, sitemap, robots, Open Graph,
 * dan JSON-LD tetap menunjuk ke domain itu — sehingga Google & AI crawler
 * diarahkan ke halaman kosong, bukan ke aplikasi yang sebenarnya hidup.
 * Itu = 100% kebocoran traffic organik ("canonical trap").
 *
 * KENAPA VERSI INI BERBEDA (revisi 2026-08-04):
 * Versi sebelumnya hanya membaca NEXT_PUBLIC_SITE_URL. Artinya perbaikan
 * BARU aktif kalau ada orang yang login ke dashboard dan mengisi env var
 * secara manual. Selama itu belum dilakukan, fallback tetap menunjuk ke
 * domain yang rusak — jadi pendarahan SEO terus berjalan.
 *
 * Sekarang resolusinya otomatis dan "self-healing":
 *
 *   1. NEXT_PUBLIC_SITE_URL                       ← override manual (menang mutlak)
 *   2. NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL  ← otomatis dari Vercel (build)
 *   3. VERCEL_PROJECT_PRODUCTION_URL              ← otomatis dari Vercel (runtime)
 *   4. FALLBACK_SITE_URL                          ← jaring pengaman terakhir
 *
 * Vercel mengisi *_PROJECT_PRODUCTION_URL dengan custom domain produksi
 * TERPENDEK yang benar-benar terpasang di project; kalau belum ada custom
 * domain yang terpasang, ia memakai domain .vercel.app milik project.
 *
 * Efek praktisnya:
 *   - Selama mikrosetting.com belum terdaftar/terverifikasi di Vercel Domains,
 *     canonical otomatis memakai domain .vercel.app yang HIDUP dan berisi
 *     aplikasi asli → 13 URL asli boleh terindeks, bukan halaman maintenance.
 *   - Begitu DNS dibetulkan dan domain didaftarkan di Vercel, nilai itu
 *     berubah sendiri jadi https://mikrosetting.com — TANPA ganti kode,
 *     TANPA ganti env, TANPA deploy manual tambahan.
 *
 * Catatan: kalau System Environment Variables dimatikan di project settings,
 * langkah 2 & 3 kosong dan kita jatuh ke fallback — makanya override manual
 * di langkah 1 tetap dipertahankan sebagai jalur darurat.
 */

const FALLBACK_SITE_URL = "https://mikrosetting.com";

function normalize(url: string | undefined | null): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  // Buang trailing slash supaya `${siteUrl}/blog` tidak pernah jadi "//blog"
  return withProtocol.replace(/\/+$/, "");
}

function resolveSiteUrl(): string {
  return (
    normalize(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalize(process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) ??
    normalize(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    FALLBACK_SITE_URL
  );
}

export const siteUrl = resolveSiteUrl();

/** Bantu bikin absolute URL yang selalu konsisten. */
export function absoluteUrl(path = ""): string {
  if (!path) return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteName = "MikroSetting";

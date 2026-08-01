/**
 * Sumber tunggal (single source of truth) untuk URL kanonis situs.
 *
 * KENAPA ADA FILE INI:
 * Sebelumnya "https://mikrosetting.com" di-hardcode di 12 file berbeda.
 * Saat domain mikrosetting.com mengarah ke server lain (mis. halaman
 * "under maintenance" WordPress di hosting lama), SELURUH canonical,
 * sitemap, robots, Open Graph, dan JSON-LD tetap menunjuk ke domain itu —
 * sehingga Google & AI crawler diarahkan ke halaman kosong, bukan ke
 * aplikasi yang sebenarnya hidup. Itu = 100% kebocoran traffic organik.
 *
 * Dengan file ini, URL kanonis bisa diganti lewat 1 environment variable
 * tanpa mengubah kode dan tanpa menunggu perbaikan DNS.
 *
 * CARA PAKAI:
 *   Vercel → Settings → Environment Variables
 *   NEXT_PUBLIC_SITE_URL = https://mikrosetting.com          (setelah DNS benar)
 *   NEXT_PUBLIC_SITE_URL = https://mikrosetting-swart.vercel.app  (darurat, selama DNS salah)
 *
 * Kalau env tidak diisi, fallback ke domain produksi (perilaku lama).
 */

const FALLBACK_SITE_URL = "https://mikrosetting.com";

function normalize(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return FALLBACK_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  // Buang trailing slash supaya `${siteUrl}/blog` tidak pernah jadi "//blog"
  return withProtocol.replace(/\/+$/, "");
}

export const siteUrl = normalize(
  process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL
);

/** Bantu bikin absolute URL yang selalu konsisten. */
export function absoluteUrl(path = ""): string {
  if (!path) return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const siteName = "MikroSetting";

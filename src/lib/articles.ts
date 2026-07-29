// Data artikel blog — sumber: Supabase (tabel public.articles)
// Publishable key aman diexpose: tabel dilindungi RLS, publik hanya bisa SELECT artikel published.

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  category: string | null;
  excerpt: string | null;
  content: string;
  keywords: string[] | null;
  author: string | null;
  reading_time: string | null;
  image: string | null;
  word_count: number | null;
  faqs: ArticleFaq[] | null;
  published_at: string | null;
  updated_at: string | null;
  status: string | null;
}

export interface TocItem {
  id: string;
  text: string;
}

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://webwuckjwmjfcgmyreyx.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "sb_publishable_CVTzHHOTG-39CKs9SevR8g_SK_SwR1K";

const HEADERS: HeadersInit = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

const LIST_SELECT =
  "select=slug,title,meta_description,category,excerpt,image,reading_time,word_count,published_at,status";

export async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?${LIST_SELECT}&status=eq.published&order=published_at.desc,slug.asc`,
      { headers: HEADERS }
    );
    if (!res.ok) return [];
    return (await res.json()) as Article[];
  } catch {
    return [];
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?select=*&slug=eq.${encodeURIComponent(slug)}&status=eq.published&limit=1`,
      { headers: HEADERS }
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as Article[];
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getRelatedArticles(slug: string, take = 2): Promise<Article[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?${LIST_SELECT}&status=eq.published&slug=neq.${encodeURIComponent(slug)}&order=published_at.desc,slug.asc&limit=${take}`,
      { headers: HEADERS }
    );
    if (!res.ok) return [];
    return (await res.json()) as Article[];
  } catch {
    return [];
  }
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

/** ISO string → "29 Jul 2026" */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Ambil daftar H2 (id + teks) dari konten HTML untuk table of contents */
export function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const re = /<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const text = m[2].replace(/<[^>]+>/g, "").trim();
    if (text) items.push({ id: m[1], text });
  }
  return items;
}

/** Estimasi waktu baca dari word_count (fallback kalau kolom reading_time kosong) */
export function readingTime(article: Article): string {
  if (article.reading_time) return article.reading_time;
  if (article.word_count) return `${Math.ceil(article.word_count / 200)} menit baca`;
  return "10 menit baca";
}

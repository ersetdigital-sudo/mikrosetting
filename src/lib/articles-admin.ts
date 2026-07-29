// Operasi TULIS ke tabel articles — hanya dipakai server-side (API routes admin).
// Pakai service role key dari env (JANGAN pernah expose ke client).

import type { Article, ArticleFaq } from "./articles";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://webwuckjwmjfcgmyreyx.supabase.co";

function serviceHeaders(): HeadersInit {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export interface ArticleInput {
  slug: string;
  title: string;
  meta_description: string;
  category: string;
  excerpt: string;
  content: string;
  keywords: string[];
  faqs: ArticleFaq[];
  image: string;
  status: "draft" | "published";
  published_at?: string | null;
}

export function countWords(html: string): number {
  return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

function buildRow(input: ArticleInput, existing?: Article | null) {
  const wc = countWords(input.content);
  const now = new Date().toISOString();
  const publishedAt =
    input.status === "published"
      ? existing?.published_at ?? input.published_at ?? now
      : input.published_at ?? null;
  return {
    slug: input.slug,
    title: input.title,
    meta_description: input.meta_description || null,
    category: input.category || null,
    excerpt: input.excerpt || null,
    content: input.content,
    keywords: input.keywords,
    faqs: input.faqs,
    author: existing?.author ?? "Tim MikroSetting",
    reading_time: `${Math.ceil(wc / 200)} menit baca`,
    image: input.image || null,
    word_count: wc,
    published_at: publishedAt,
    updated_at: now,
    status: input.status,
  };
}

export async function adminListArticles(): Promise<Article[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?select=*&order=updated_at.desc`, {
    headers: serviceHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase list gagal: ${res.status} ${await res.text()}`);
  return (await res.json()) as Article[];
}

export async function adminGetArticle(id: string): Promise<Article | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/articles?select=*&id=eq.${encodeURIComponent(id)}&limit=1`,
    { headers: serviceHeaders(), cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Supabase get gagal: ${res.status} ${await res.text()}`);
  const rows = (await res.json()) as Article[];
  return rows[0] ?? null;
}

export async function adminCreateArticle(input: ArticleInput): Promise<Article> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
    method: "POST",
    headers: { ...serviceHeaders(), Prefer: "return=representation" },
    body: JSON.stringify(buildRow(input)),
  });
  if (!res.ok) throw new Error(`Supabase insert gagal: ${res.status} ${await res.text()}`);
  const rows = (await res.json()) as Article[];
  return rows[0];
}

export async function adminUpdateArticle(id: string, input: ArticleInput, existing: Article | null): Promise<Article> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...serviceHeaders(), Prefer: "return=representation" },
    body: JSON.stringify(buildRow(input, existing)),
  });
  if (!res.ok) throw new Error(`Supabase update gagal: ${res.status} ${await res.text()}`);
  const rows = (await res.json()) as Article[];
  return rows[0];
}

export async function adminDeleteArticle(id: string): Promise<void> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: serviceHeaders(),
  });
  if (!res.ok) throw new Error(`Supabase delete gagal: ${res.status} ${await res.text()}`);
}

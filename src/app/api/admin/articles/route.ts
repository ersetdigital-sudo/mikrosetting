import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { adminListArticles, adminCreateArticle, type ArticleInput } from "@/lib/articles-admin";

async function guard() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function validate(body: Partial<ArticleInput>): string | null {
  if (!body.title?.trim()) return "Judul wajib diisi.";
  if (!body.slug?.trim()) return "Slug wajib diisi.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug)) return "Slug hanya boleh huruf kecil, angka, dan strip.";
  if (!body.content?.trim()) return "Konten artikel wajib diisi.";
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  try {
    const articles = await adminListArticles();
    return NextResponse.json({ ok: true, articles });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  try {
    const body = (await request.json()) as Partial<ArticleInput>;
    const err = validate(body);
    if (err) return NextResponse.json({ ok: false, error: err }, { status: 400 });
    const article = await adminCreateArticle({
      slug: body.slug!.trim(),
      title: body.title!.trim(),
      meta_description: body.meta_description ?? "",
      category: body.category ?? "MikroTik",
      excerpt: body.excerpt ?? "",
      content: body.content!,
      keywords: body.keywords ?? [],
      faqs: body.faqs ?? [],
      image: body.image ?? "",
      status: body.status === "published" ? "published" : "draft",
    });
    return NextResponse.json({ ok: true, article });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

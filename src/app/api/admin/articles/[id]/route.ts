import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import {
  adminGetArticle,
  adminUpdateArticle,
  adminDeleteArticle,
  type ArticleInput,
} from "@/lib/articles-admin";

type Ctx = { params: Promise<{ id: string }> };

async function guard() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function PUT(request: Request, ctx: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  try {
    const { id } = await ctx.params;
    const body = (await request.json()) as Partial<ArticleInput>;
    if (!body.title?.trim()) return NextResponse.json({ ok: false, error: "Judul wajib diisi." }, { status: 400 });
    if (!body.content?.trim()) return NextResponse.json({ ok: false, error: "Konten wajib diisi." }, { status: 400 });
    const existing = await adminGetArticle(id);
    if (!existing) return NextResponse.json({ ok: false, error: "Artikel tidak ditemukan." }, { status: 404 });
    const article = await adminUpdateArticle(
      id,
      {
        slug: existing.slug, // slug tidak diubah lewat edit (URL aman)
        title: body.title.trim(),
        meta_description: body.meta_description ?? "",
        category: body.category ?? existing.category ?? "MikroTik",
        excerpt: body.excerpt ?? "",
        content: body.content,
        keywords: body.keywords ?? [],
        faqs: body.faqs ?? [],
        image: body.image ?? "",
        status: body.status === "published" ? "published" : "draft",
        published_at: existing.published_at,
      },
      existing
    );
    return NextResponse.json({ ok: true, article });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, ctx: Ctx) {
  const denied = await guard();
  if (denied) return denied;
  try {
    const { id } = await ctx.params;
    await adminDeleteArticle(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

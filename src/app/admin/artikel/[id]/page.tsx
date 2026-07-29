import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { adminGetArticle } from "@/lib/articles-admin";
import ArticleEditor from "../ArticleEditor";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const article = await adminGetArticle(id);
  if (!article) notFound();
  return <ArticleEditor mode="edit" initial={article} />;
}

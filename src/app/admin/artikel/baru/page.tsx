import { requireAdmin } from "@/lib/admin-auth";
import ArticleEditor from "../ArticleEditor";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  await requireAdmin();
  return <ArticleEditor mode="create" />;
}

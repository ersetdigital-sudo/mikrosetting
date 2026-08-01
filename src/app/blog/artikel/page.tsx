import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getRelatedArticles, extractToc } from "@/lib/articles";
import ArticleContent from "./ArticleContent";
import { siteUrl } from "@/lib/site";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function resolveSlug(raw: string | string[] | undefined): string {
  const topic = Array.isArray(raw) ? raw[0] : raw;
  return topic?.trim() || "optimasi";
}

async function resolveArticle(raw: string | string[] | undefined) {
  const slug = resolveSlug(raw);
  const article = await getArticle(slug);
  if (article) return article;
  if (slug !== "optimasi") return getArticle("optimasi");
  return null;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const data = await resolveArticle(params.topik);
  if (!data) return { title: "Artikel" };
  const canonical = `${siteUrl}/blog/artikel?topik=${data.slug}`;
  const description = data.meta_description ?? data.excerpt ?? "";
  return {
    title: data.title,
    description,
    keywords: data.keywords?.join(", "),
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: data.title,
      description,
      url: canonical,
      publishedTime: data.published_at ?? undefined,
      modifiedTime: data.updated_at ?? undefined,
      images: data.image
        ? [{ url: `${siteUrl}${data.image}`, width: 1200, height: 630, alt: data.title }]
        : undefined,
    },
  };
}

export default async function ArticlePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const article = await resolveArticle(params.topik);
  if (!article) notFound();

  const [related] = await Promise.all([getRelatedArticles(article.slug, 2)]);
  const toc = extractToc(article.content);
  const canonical = `${siteUrl}/blog/artikel?topik=${article.slug}`;
  const description = article.meta_description ?? article.excerpt ?? "";

  const schemas: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description,
      image: article.image ? `${siteUrl}${article.image}` : undefined,
      datePublished: article.published_at,
      dateModified: article.updated_at ?? article.published_at,
      wordCount: article.word_count ?? undefined,
      keywords: article.keywords?.join(", "),
      inLanguage: "id-ID",
      author: {
        "@type": "Organization",
        name: "MikroSetting",
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        name: "MikroSetting",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/fb3b9521-c9c8-4641-b2c5-c60073257a0f.png`,
        },
      },
      mainEntityOfPage: canonical,
    },
  ];

  if (article.faqs && article.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ArticleContent article={article} toc={toc} related={related} />
    </>
  );
}

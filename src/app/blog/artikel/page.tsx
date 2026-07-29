import type { Metadata } from "next";
import { articles } from "@/lib/blogData";
import ArticleContent from "./ArticleContent";

const siteUrl = "https://mikrosetting.com";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function resolveTopic(raw: string | string[] | undefined): string {
  const topic = Array.isArray(raw) ? raw[0] : raw;
  return topic && articles[topic] ? topic : "optimasi";
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const topic = resolveTopic(params.topik);
  const data = articles[topic];
  const canonical = `${siteUrl}/blog/artikel?topik=${topic}`;
  return {
    title: data.title,
    description: data.lead,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: data.title,
      description: data.lead,
      url: canonical,
      publishedTime: data.dateIso,
      images: [{ url: `${siteUrl}${data.image}`, width: 1200, height: 630, alt: data.title }],
    },
  };
}

export default async function ArticlePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const topic = resolveTopic(params.topik);
  const data = articles[topic];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.lead,
    image: `${siteUrl}${data.image}`,
    datePublished: data.dateIso,
    dateModified: data.dateIso,
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
    mainEntityOfPage: `${siteUrl}/blog/artikel?topik=${topic}`,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ArticleContent topic={topic} />
    </>
  );
}
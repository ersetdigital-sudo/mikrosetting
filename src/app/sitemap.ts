import type { MetadataRoute } from "next";
import { articleSlugs } from "@/lib/blogData";

const siteUrl = "https://mikrosetting.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  const articlePages = articleSlugs.map((slug) => ({
    url: `${siteUrl}/blog/artikel?topik=${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
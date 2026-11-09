import type { MetadataRoute } from "next";
import { ARTICLES } from "@/content/articles";
import { LAST_UPDATED, SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 1 },
    ...ARTICLES.map((a) => ({ url: `${SITE_URL}/kien-thuc/${a.slug}`, lastModified: a.publishedAt, priority: 0.6 })),
  ];
}

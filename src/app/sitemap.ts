import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { standings } from "@/data/standings";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${siteUrl}/${lang}`,
    lastModified: standings.updatedAt,
    changeFrequency: "weekly",
    priority: lang === "kz" ? 1 : 0.9,
    alternates: { languages: { kk: `${siteUrl}/kz`, ru: `${siteUrl}/ru` } },
  }));
}

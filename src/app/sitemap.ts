export const dynamic = "force-static";
import type { MetadataRoute } from "next";

const BASE_URL = "https://tooltab.xyz";


// Add new tools here — sitemap updates automatically
const tools = [
  { slug: "timestamp",      priority: 0.9, changeFrequency: "monthly" },
  { slug: "timezone",       priority: 0.9, changeFrequency: "monthly" },
  { slug: "unit-converter", priority: 0.9, changeFrequency: "monthly" },
  { slug: "urlencode",      priority: 0.9, changeFrequency: "monthly" },
  { slug: "uuid",           priority: 0.9, changeFrequency: "monthly" },
  { slug: "wordcount",      priority: 0.9, changeFrequency: "monthly" },
] satisfies {
  slug: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
}[];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolRoutes = tools.map(({ slug, priority, changeFrequency }) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return [
    // Homepage — highest priority
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...toolRoutes,
  ];
}
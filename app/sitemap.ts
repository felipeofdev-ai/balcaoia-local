import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const STATIC_ROUTES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/checklist", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/obrigado", changeFrequency: "yearly" as const, priority: 0.1 },
  { path: "/disclaimer", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/termos-de-uso", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/politica-de-privacidade", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

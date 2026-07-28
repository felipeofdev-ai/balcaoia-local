import type { MetadataRoute } from "next";
import { getAllEbookIdeas } from "@/lib/market-research/trends";
import { BLOG_POSTS } from "@/lib/content/blog";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://balcaoia-studio.vercel.app"
).replace(/\/$/, "");

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/vendas", changeFrequency: "weekly", priority: 0.95 },
  { path: "/afiliados", changeFrequency: "weekly", priority: 0.85 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/diagnostico", changeFrequency: "monthly", priority: 0.75 },
  { path: "/checklist", changeFrequency: "monthly", priority: 0.6 },
  { path: "/aula-gratis", changeFrequency: "monthly", priority: 0.6 },
  { path: "/negocio-local-ia", changeFrequency: "weekly", priority: 0.85 },
  { path: "/ferramentas/calculadora-afiliados", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ferramentas/checklist-negocio", changeFrequency: "monthly", priority: 0.65 },
  { path: "/obrigado", changeFrequency: "yearly", priority: 0.1 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
  { path: "/termos-de-uso", changeFrequency: "yearly", priority: 0.3 },
  { path: "/politica-de-privacidade", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const products = getAllEbookIdeas().map((e) => ({
    url: `${SITE_URL}/produtos/${e.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const posts = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...products, ...posts];
}

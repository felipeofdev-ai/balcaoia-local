import type { MetadataRoute } from "next";
import { getAllEbookIdeas } from "@/lib/market-research/trends";
import { BLOG_POSTS } from "@/lib/content/blog";
import { getAllTierZeroSlugs, getAllCaptureSlugs } from "@/lib/sales/tier-zero-catalog";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://balcaoialocal.com.br"
).replace(/\/$/, "");

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/ecossistema", changeFrequency: "weekly", priority: 0.9 },
  { path: "/vendas", changeFrequency: "weekly", priority: 0.95 },
  { path: "/afiliados", changeFrequency: "weekly", priority: 0.88 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.82 },
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

  const ideaSlugs = new Set(getAllEbookIdeas().map((e) => e.slug));
  const tierSlugs = getAllTierZeroSlugs();
  const productSlugSet = new Set([...ideaSlugs, ...tierSlugs]);

  const products = [...productSlugSet].map((slug) => ({
    url: `${SITE_URL}/produtos/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const captures = getAllCaptureSlugs()
    .filter((s) => s.length > 2) // skip short codes j1 etc in sitemap noise
    .filter((s) => !/^(j\d+|a\d+|b\d+|c\d+|d\d+)$/i.test(s))
    .map((slug) => ({
      url: `${SITE_URL}/captura/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const posts = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...products, ...captures, ...posts];
}

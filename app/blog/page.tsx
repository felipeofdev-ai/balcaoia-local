import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { BLOG_POSTS } from "@/lib/content/blog";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Blog | BalcãoIA Local",
  description: "Artigos práticos sobre atendimento, IA responsável e negócios locais.",
  alternates: { canonical: `${SITE.url}/blog` },
};

export default function BlogIndexPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="container-app flex-1 py-14">
        <h1 className="text-3xl font-bold text-[var(--brand-graphite)]">Blog</h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Conteúdo educativo — sem promessa de renda ou resultados garantidos.
        </p>
        <ul className="mt-10 space-y-4">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-[var(--border)] bg-white p-5 transition-shadow hover:shadow-md"
              >
                <p className="text-xs text-[var(--muted-foreground)]">{post.date}</p>
                <h2 className="mt-1 text-lg font-semibold text-[var(--brand-graphite)]">
                  {post.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <MarketingFooter />
    </div>
  );
}

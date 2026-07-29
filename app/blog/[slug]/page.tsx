import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { BLOG_POSTS, getPost } from "@/lib/content/blog";
import { SITE } from "@/lib/config/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artigo" };
  return {
    title: `${post.title} | BalcãoIA`,
    description: post.description,
    alternates: { canonical: `${SITE.url}/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "BalcãoIA" },
    publisher: {
      "@type": "Organization",
      name: "BalcãoIA",
      logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
    },
    mainEntityOfPage: `${SITE.url}/blog/${slug}`,
    inLanguage: "pt-BR",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <MarketingHeader />
      <main className="container-app max-w-3xl flex-1 py-14">
        <p className="text-xs text-[var(--muted-foreground)]">{post.date}</p>
        <h1 className="mt-2 text-3xl font-bold text-[var(--brand-graphite)]">{post.title}</h1>
        <article className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap text-sm leading-relaxed text-[var(--brand-graphite)]">
          {post.content}
        </article>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/vendas" className={cn(buttonVariants({ variant: "amber" }))}>
            Conhecer Método 7D
          </Link>
          {post.relatedProductSlug && (
            <Link
              href={`/produtos/${post.relatedProductSlug}`}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Ver produto relacionado
            </Link>
          )}
          <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
            Voltar ao blog
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}

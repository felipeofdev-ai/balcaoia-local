import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1 bg-white py-16 sm:py-20">
        <div className="container-app max-w-3xl">
          <article className="flex flex-col gap-6 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--brand-graphite)] [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-[var(--muted-foreground)] [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_li]:text-sm [&_li]:leading-relaxed [&_li]:text-[var(--muted-foreground)] [&_strong]:text-[var(--brand-graphite)]">
            {children}
          </article>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { cn } from "@/lib/utils";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="container-app flex h-[5rem] items-center justify-between gap-4 sm:h-[5.75rem] md:h-24">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center"
          aria-label="BalcãoIA Local — página inicial"
        >
          <BrandLogo size="lg" priority className="max-w-[min(100%,280px)] sm:max-w-[min(100%,360px)] md:max-w-none" />
        </Link>

        <Link
          href="#captura"
          className={cn(buttonVariants({ variant: "amber" }), "shrink-0 text-sm sm:text-base")}
        >
          Quero meu diagnóstico
        </Link>
      </div>
    </header>
  );
}

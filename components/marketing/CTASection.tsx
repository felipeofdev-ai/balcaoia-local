import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="bg-[var(--brand-graphite-dark)] py-20 sm:py-24">
      <div className="container-app flex flex-col items-center gap-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Seu atendimento pode virar seu maior argumento de venda
        </h2>
        <p className="max-w-xl text-balance text-white/70">
          Faça o diagnóstico gratuito agora e descubra, em minutos, onde seu
          atendimento está deixando dinheiro na mesa.
        </p>
        <Link
          href="#captura"
          className={cn(buttonVariants({ variant: "amber", size: "lg" }))}
        >
          Fazer meu diagnóstico grátis
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

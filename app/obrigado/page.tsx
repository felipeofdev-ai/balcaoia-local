import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Recebemos seus dados!",
  description: "Seu cadastro foi confirmado com sucesso.",
};

interface ObrigadoPageProps {
  searchParams: Promise<{ nome?: string }>;
}

export default async function ObrigadoPage({ searchParams }: ObrigadoPageProps) {
  const { nome } = await searchParams;
  const firstName = nome?.trim().split(" ")[0];

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex flex-1 items-center justify-center py-20">
        <div className="container-app flex flex-col items-center gap-6 text-center">
          <BrandLogo size="xl" className="mx-auto" />

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-petrol)]/10">
            <CheckCircle2 className="h-8 w-8 text-[var(--brand-petrol)]" />
          </div>

          <h1 className="text-balance text-3xl font-extrabold text-[var(--brand-graphite)] sm:text-4xl">
            {firstName ? `Prontinho, ${firstName}!` : "Prontinho!"} Recebemos
            seus dados.
          </h1>

          <p className="max-w-lg text-balance text-[var(--muted-foreground)]">
            Em instantes você recebe um e-mail com os próximos passos para
            fazer o diagnóstico completo do seu atendimento. Fique de olho na
            sua caixa de entrada (e no spam, por garantia).
          </p>

          <div className="mt-4 grid w-full max-w-lg gap-4 sm:grid-cols-2">
            <div className="flex flex-col items-start gap-2 rounded-xl border border-[var(--border)] p-5 text-left">
              <Sparkles className="h-5 w-5 text-[var(--brand-amber-dark)]" />
              <h3 className="text-sm font-semibold text-[var(--brand-graphite)]">
                Enquanto isso
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Conheça o checklist completo de 37 perguntas sobre atendimento.
              </p>
              <Link href="/checklist" className="text-sm font-semibold text-[var(--brand-petrol)] underline underline-offset-2">
                Ver checklist
              </Link>
            </div>
            <div className="flex flex-col items-start gap-2 rounded-xl border border-[var(--border)] p-5 text-left">
              <MessageCircle className="h-5 w-5 text-[var(--brand-amber-dark)]" />
              <h3 className="text-sm font-semibold text-[var(--brand-graphite)]">
                Dúvidas?
              </h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                Fale com a gente pelo e-mail de contato a qualquer momento.
              </p>
              <a
                href="mailto:contato@balcaoialocal.com.br"
                className="text-sm font-semibold text-[var(--brand-petrol)] underline underline-offset-2"
              >
                contato@balcaoialocal.com.br
              </a>
            </div>
          </div>

          <Link href="/" className={cn(buttonVariants({ variant: "outline" }), "mt-6")}>
            Voltar para a página inicial
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}

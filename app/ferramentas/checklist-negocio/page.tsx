import type { Metadata } from "next";
import Link from "next/link";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Checklist de negócio digital | BalcãoIA",
  description: "Checklist gratuito para organizar atendimento e presença local.",
};

const ITEMS = [
  "Catálogo com preços e prazos atualizados",
  "Política de troca/cancelamento escrita",
  "FAQ das 10 perguntas mais comuns",
  "Roteiro de primeira resposta",
  "Resposta padrão para “está caro”",
  "Horário de atendimento comunicado",
  "Google Meu Negócio atualizado",
  "Opt-out respeitado no WhatsApp",
  "Revisão humana de textos gerados por IA",
  "Diagnóstico BalcãoIA feito",
];

export default function ChecklistNegocioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="container-app max-w-2xl flex-1 py-14">
        <h1 className="text-3xl font-bold text-[var(--brand-graphite)]">
          Checklist de negócio digital
        </h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Use como guia. Não promete vendas — organiza o básico que a maioria deixa de lado.
        </p>
        <ul className="mt-8 space-y-3">
          {ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm"
            >
              <input type="checkbox" className="mt-1" aria-label={item} />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/diagnostico" className={cn(buttonVariants({ variant: "amber" }))}>
            Fazer diagnóstico
          </Link>
          <Link href="/vendas" className={cn(buttonVariants({ variant: "outline" }))}>
            Conhecer o Método 7D
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}

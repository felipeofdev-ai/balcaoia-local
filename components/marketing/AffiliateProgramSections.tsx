import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  HandCoins,
  Link2,
  Megaphone,
  Share2,
  UserCheck,
} from "lucide-react";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { AffiliateCommissionCalculator } from "@/components/marketing/AffiliateCommissionCalculator";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatBRL } from "@/lib/config/pricing";
import { HOTMART } from "@/lib/config/hotmart";
import { SITE } from "@/lib/config/site";
import {
  LOTE1_ALL,
  LOTE1_FLAGSHIPS,
  LOTE1_MICROS,
  LOTE1_COOKIE_DAYS,
  commissionPerSale,
} from "@/lib/config/lote1-affiliates";

const STEPS = [
  {
    icon: UserCheck,
    title: "Candidate-se na Hotmart",
    description:
      "Acesse o marketplace, solicite afiliação nos produtos BalcãoIA LOTE 1 e aguarde aprovação (automática quando configurada).",
  },
  {
    icon: Link2,
    title: "Receba seu link oficial",
    description:
      "Use apenas o link de afiliado gerado pela Hotmart — com UTM se quiser medir campanhas. Nunca invente checkout.",
  },
  {
    icon: Share2,
    title: "Divulgue com transparência",
    description:
      "Informe que é link de afiliado(a), use os materiais desta página e siga as regras de compliance (sem renda garantida).",
  },
  {
    icon: HandCoins,
    title: "Comissão após confirmação",
    description:
      "A Hotmart registra a venda pelo seu link e paga a comissão conforme calendário da plataforma. Valores variam por produto vendido.",
  },
];

export const AFFILIATE_PROGRAM_FAQ = [
  {
    question: "Qual a comissão do programa?",
    answer: `Os flagships LOTE 1 (A1, A2, B1, C2, D1, D3) têm comissão de 50% e os micros J1–J10 têm comissão de 70%, ambos configurados no painel Hotmart, com cookie de ${LOTE1_COOKIE_DAYS} dias. Produtos de tiers superiores no ecossistema Studio podem ter percentuais diferentes (30–40%).`,
  },
  {
    question: "Posso prometer que o afiliado vai ganhar R$ X por mês?",
    answer:
      "Não. É proibido prometer renda, lucro ou vendas garantidas. Use a calculadora desta página apenas como exemplo matemático com disclaimer de que resultados variam.",
  },
  {
    question: "Preciso ser influenciador grande?",
    answer:
      "Não. O programa é aberto a empreendedores, consultores e criadores que atendem negócios locais — desde que divulguem com ética e público relevante.",
  },
  {
    question: "Quanto tempo demora a aprovação?",
    answer:
      "Depende da configuração no painel Hotmart. Quando a aprovação automática está ativa, o link fica disponível em minutos após a solicitação.",
  },
  {
    question: "Posso usar anúncios pagos?",
    answer:
      "Sim, desde que respeite as políticas da Hotmart, Meta/Google e as regras desta página: sem promessa de renda, sem uso indevido de marcas e sem landing page enganosa.",
  },
  {
    question: "E se o cliente pedir reembolso?",
    answer:
      "Reembolsos dentro da garantia cancelam a comissão conforme regras Hotmart. Isso faz parte do jogo — foque em divulgação honesta para o público certo.",
  },
  {
    question: "Posso divulgar só os micros J de R$ 7?",
    answer:
      "Sim. Micros são tripwire de volume — comissão de 70% sobre preço baixo, ideal para testar tráfego. Depois você pode indicar flagships como FOCO 14 ou WhatsApp Ético.",
  },
  {
    question: "O BalcãoIA é oficial da Meta ou WhatsApp?",
    answer:
      "Não. Somos marca educativa independente. Cite WhatsApp/Meta apenas de forma nominativa, nunca como parceria oficial.",
  },
  {
    question: "Onde pego criativos e copys?",
    answer:
      "Nesta página, na seção Materiais para afiliados, e em /produtos/[slug]/afiliados para cada produto. Sempre adapte ao seu tom e inclua disclosure.",
  },
  {
    question: "Checkout ainda não está no ar — o que faço?",
    answer: `Alguns produtos aguardam link real do painel Hotmart. Enquanto isso, candidate-se no marketplace e escreva para ${SITE.supportEmail} se precisar de orientação.`,
  },
  {
    question: "Isso é pirâmide ou MLM?",
    answer:
      "Não. É comissão por venda de produto digital educacional via Hotmart — modelo clássico de afiliado, sem recrutamento em cascata.",
  },
  {
    question: "Como entro em contato com o produtor?",
    answer: `E-mail ${SITE.supportEmail}. Respondemos dúvidas de afiliação, materiais e conformidade — não prometemos resultados de vendas.`,
  },
];

export function AffiliateProgramSections() {
  const affiliateUrl =
    process.env.NEXT_PUBLIC_HOTMART_AFFILIATE_URL || HOTMART.affiliateBaseUrl;
  const maxCommission = Math.max(...LOTE1_ALL.map((p) => p.commissionPercent));

  return (
    <>
      <section className="relative overflow-hidden gradient-petrol text-white">
        <div className="bg-grid-petrol absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="container-app relative flex flex-col items-center gap-6 py-16 text-center sm:py-24">
          <div className="inline-flex items-center rounded-2xl bg-white px-5 py-3.5 shadow-lg shadow-black/25">
            <BrandLogo size="xl" variant="light" priority />
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--brand-amber)]">
            <Megaphone className="h-3.5 w-3.5" />
            Programa de afiliados · LOTE 1
          </span>
          <h1 className="text-balance max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Indique produtos BalcãoIA e receba até {maxCommission}% de comissão por venda
          </h1>
          <p className="max-w-2xl text-balance text-white/75">
            {LOTE1_ALL.length} produtos no LOTE 1 — foco, atendimento ético, IA assistida e
            micro-produtos de entrada. Cookie de {LOTE1_COOKIE_DAYS} dias.{" "}
            <strong className="font-semibold text-white">
              Sem promessa de renda: resultados dependem do seu esforço e do seu público.
            </strong>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "amber", size: "lg" }))}
            >
              Candidatar-se na Hotmart
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${SITE.supportEmail}?subject=${encodeURIComponent("Programa de afiliados BalcãoIA")}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/30 text-white hover:bg-white hover:text-[var(--brand-petrol)]"
              )}
            >
              Falar com o produtor
            </a>
          </div>
          <p className="text-xs text-white/50">
            Comissão paga pela Hotmart · Cookie de {LOTE1_COOKIE_DAYS} dias · Materiais e regras
            de compliance abaixo
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-app flex flex-col gap-12">
          <SectionTitle
            eyebrow="Como funciona"
            title="4 passos para começar a divulgar"
            description="Processo simples, transparente e alinhado às políticas Hotmart."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--muted)]/30 p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-petrol)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <Icon className="h-6 w-6 text-[var(--brand-amber-dark)]" />
                <h3 className="text-sm font-bold text-[var(--brand-graphite)]">{title}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--muted)]/60 py-16 sm:py-20">
        <div className="container-app flex flex-col gap-10">
          <SectionTitle
            eyebrow="LOTE 1"
            title="Tabela de comissões — 50% (flagships) a 70% (micros)"
            description={`Valores ilustrativos por venda confirmada, com cookie de ${LOTE1_COOKIE_DAYS} dias. Order bumps e upsells podem gerar comissões adicionais conforme configuração Hotmart.`}
          />
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--muted)]/50">
                  <th className="px-4 py-3 font-semibold text-[var(--brand-graphite)]">Código</th>
                  <th className="px-4 py-3 font-semibold text-[var(--brand-graphite)]">Produto</th>
                  <th className="px-4 py-3 font-semibold text-[var(--brand-graphite)]">Preço</th>
                  <th className="px-4 py-3 font-semibold text-[var(--brand-graphite)]">Comissão</th>
                  <th className="px-4 py-3 font-semibold text-[var(--brand-graphite)]">Página</th>
                </tr>
              </thead>
              <tbody>
                {LOTE1_FLAGSHIPS.map((p) => (
                  <tr key={p.code} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[var(--brand-petrol)]">
                      {p.code}
                    </td>
                    <td className="px-4 py-3 text-[var(--brand-graphite)]">{p.name}</td>
                    <td className="px-4 py-3">{formatBRL(p.price)}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--brand-amber-dark)]">
                      {formatBRL(commissionPerSale(p.price, p.commissionPercent))} (
                      {p.commissionPercent}%)
                    </td>
                    <td className="px-4 py-3">
                      {p.studioSlug ? (
                        <Link
                          href={`/produtos/${p.studioSlug}`}
                          className="text-[var(--brand-petrol)] underline-offset-2 hover:underline"
                        >
                          Ver produto
                        </Link>
                      ) : (
                        <span className="text-[var(--muted-foreground)]">Em breve no Studio</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <details className="rounded-2xl border border-[var(--border)] bg-white">
            <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-[var(--brand-graphite)]">
              Micro-produtos J1–J10 (tripwire R$ 7–14 · comissão 70%)
            </summary>
            <div className="overflow-x-auto border-t border-[var(--border)]">
              <table className="w-full min-w-[560px] text-left text-sm">
                <tbody>
                  {LOTE1_MICROS.map((p) => (
                    <tr key={p.code} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-2.5 font-mono text-xs font-bold text-[var(--brand-petrol)]">
                        {p.code}
                      </td>
                      <td className="px-4 py-2.5">{p.name}</td>
                      <td className="px-4 py-2.5">{formatBRL(p.price)}</td>
                      <td className="px-4 py-2.5 font-medium text-[var(--brand-amber-dark)]">
                        {formatBRL(commissionPerSale(p.price, p.commissionPercent))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
          <p className="text-center text-xs text-[var(--muted-foreground)]">
            Exemplo: 3 vendas/dia de FOCO 14 (B1) × 30 dias = 90 vendas ×{" "}
            {formatBRL(commissionPerSale(47, 50))} ={" "}
            {formatBRL(commissionPerSale(47, 50) * 90)} —{" "}
            <em>hipótese ilustrativa, não garantia de ganho.</em>
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-app flex flex-col gap-10">
          <SectionTitle
            eyebrow="Catálogo"
            title={`${LOTE1_ALL.length} produtos prontos para divulgar`}
            description="Cada card leva à página de vendas quando o produto já está publicado no Studio."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {LOTE1_ALL.map((p) => {
              const card = (
                <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--muted)]/30 p-5 text-center transition-colors hover:border-[var(--brand-petrol)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/logos/${p.studioSlug}/logo-square.svg`}
                    alt={p.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg object-contain"
                  />
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--brand-petrol)]">
                    {p.code}
                  </p>
                  <p className="text-sm font-semibold leading-snug text-[var(--brand-graphite)]">
                    {p.name}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {formatBRL(p.price)} · comissão {p.commissionPercent}%
                  </p>
                </div>
              );
              return p.studioSlug ? (
                <Link key={p.code} href={`/produtos/${p.studioSlug}`}>
                  {card}
                </Link>
              ) : (
                <div key={p.code}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--muted)]/60 py-16 sm:py-20">
        <div className="container-app flex flex-col gap-8">
          <SectionTitle
            eyebrow="Simulador"
            title="Estime comissões (com ressalvas)"
            description="Ajuste vendas por dia e produto. Use só como referência educativa."
          />
          <div className="flex justify-center">
            <AffiliateCommissionCalculator />
          </div>
          <p className="mx-auto flex max-w-lg items-start gap-2 text-xs text-[var(--muted-foreground)]">
            <Calculator className="mt-0.5 h-4 w-4 shrink-0" />
            Nenhum valor desta seção constitui promessa de renda. Afiliados experientes e iniciantes
            têm resultados muito diferentes.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-app flex flex-col gap-10">
          <SectionTitle eyebrow="FAQ" title="Perguntas frequentes do programa" />
          <FAQAccordion items={AFFILIATE_PROGRAM_FAQ} />
        </div>
      </section>

      <section className="gradient-petrol py-14 text-white">
        <div className="container-app flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Pronto para divulgar com responsabilidade?</h2>
          <p className="max-w-xl text-sm text-white/75">
            Candidate-se no marketplace Hotmart ou fale conosco se tiver dúvidas sobre compliance e
            materiais.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "amber", size: "lg" }))}
            >
              Abrir marketplace Hotmart
            </a>
            <a
              href={`mailto:${SITE.supportEmail}`}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/30 text-white hover:bg-white hover:text-[var(--brand-petrol)]"
              )}
            >
              {SITE.supportEmail}
            </a>
          </div>
          <Link href="#materiais" className="text-xs text-white/60 underline-offset-2 hover:underline">
            Ir para materiais prontos (copys, Reels, e-mails) ↓
          </Link>
        </div>
      </section>
    </>
  );
}

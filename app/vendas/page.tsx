import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Flame,
  Gift,
  Layers,
  ListChecks,
  MessageCircleWarning,
  MessagesSquare,
  Puzzle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingDown,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { DisclaimerBrands } from "@/components/marketing/DisclaimerBrands";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { VSLPlaceholder } from "@/components/marketing/VSLPlaceholder";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PRICING, perceivedTotal, formatBRL } from "@/lib/config/pricing";
import { HOTMART } from "@/lib/config/hotmart";
import { SITE } from "@/lib/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Método BalcãoIA 7D — Organize o atendimento do seu negócio com IA",
  description:
    "Organize o atendimento do seu negócio com IA em 7 dias — sem programação, sem gambiarra e sem depender de automações proibidas.",
};

const painPoints = [
  {
    icon: Clock,
    title: "Cliente espera, cliente some",
    description:
      "Enquanto ninguém responde, o cliente já está conversando com o concorrente ao lado.",
  },
  {
    icon: MessageCircleWarning,
    title: "Cada atendente responde diferente",
    description:
      "Sem roteiro, sem padrão — o cliente recebe uma experiência diferente dependendo de quem atendeu.",
  },
  {
    icon: TrendingDown,
    title: '"Vou pensar" vira ponto final',
    description:
      "Objeções comuns não têm resposta pronta, então a conversa esfria e a venda não fecha.",
  },
  {
    icon: Users,
    title: "Tudo depende de uma pessoa",
    description:
      "Preço, prazo, política de troca: se essa pessoa falta, o atendimento trava.",
  },
];

const method7D = [
  {
    day: "D1",
    icon: Compass,
    title: "Diagnóstico e fundação",
    description:
      "Você mapeia como o atendimento funciona hoje e define o tom de voz e o perfil do negócio.",
  },
  {
    day: "D2",
    icon: BookOpenCheck,
    title: "Base de conhecimento",
    description:
      "Organiza as perguntas frequentes em respostas claras, prontas para qualquer atendente usar.",
  },
  {
    day: "D3",
    icon: FileText,
    title: "Catálogo e políticas",
    description:
      "Preço, prazo, forma de pagamento e política de cancelamento em um documento único.",
  },
  {
    day: "D4",
    icon: MessagesSquare,
    title: "Roteiros de resposta",
    description:
      "Scripts de primeira resposta e qualificação, no tom de voz do seu negócio.",
  },
  {
    day: "D5",
    icon: Workflow,
    title: "Objeções e follow-up",
    description:
      "Respostas prontas para as objeções mais comuns e mensagens de retomada para orçamentos parados.",
  },
  {
    day: "D6",
    icon: Sparkles,
    title: "Prompt mestre e simulador",
    description:
      "Reúne tudo em um prompt para usar com IA (ChatGPT, Claude, Gemini) e testa no simulador.",
  },
  {
    day: "D7",
    icon: Rocket,
    title: "Checklist e handoff",
    description:
      "Passo a passo de implantação e regras claras de quando transferir para um atendente humano.",
  },
];

const deliverables = [
  "Diagnóstico completo do atendimento (37 perguntas)",
  "Perfil comercial pronto para bio e apresentações",
  "Catálogo de produtos/serviços organizado com preços",
  "Base de perguntas frequentes (FAQ) por categoria",
  "Prompt mestre para usar em ChatGPT, Claude ou Gemini",
  "Roteiros de primeira resposta e qualificação",
  "Scripts de objeção para os bloqueios mais comuns",
  "Mensagens de follow-up (24h, 48h, 7 dias)",
  "Regras claras de transferência para atendimento humano",
  "Checklist de implantação em 7 dias",
  "Simulador para testar o atendimento antes de usar de verdade",
  PRICING.orderBump.name,
];

const modules = [
  {
    number: "01",
    title: "Fundamentos do Balcão Organizado",
    lessons: "4 aulas",
    description: "Por que atendimento desorganizado custa vendas — e o que muda com o Método 7D.",
  },
  {
    number: "02",
    title: "Diagnóstico do seu atendimento",
    lessons: "3 aulas",
    description: "Como aplicar o checklist de 37 perguntas e interpretar os resultados.",
  },
  {
    number: "03",
    title: "Base de conhecimento e catálogo",
    lessons: "5 aulas",
    description: "Organize FAQ, produtos, preços e políticas em textos claros e reutilizáveis.",
  },
  {
    number: "04",
    title: "Roteiros que vendem com clareza",
    lessons: "6 aulas",
    description: "Primeira resposta, qualificação, objeções e recomendação — com exemplos reais.",
  },
  {
    number: "05",
    title: "IA aplicada ao atendimento",
    lessons: "5 aulas",
    description: "Como usar ChatGPT, Claude ou Gemini com o prompt mestre do seu negócio.",
  },
  {
    number: "06",
    title: "Simulador e testes antes de ir ao ar",
    lessons: "3 aulas",
    description: "Teste conversas simuladas e ajuste antes de usar com clientes reais.",
  },
  {
    number: "07",
    title: "Implantação e rotina de melhoria",
    lessons: "4 aulas",
    description: "Checklist de 7 dias, handoff humano e como revisar o atendimento todo mês.",
  },
];

const bonuses = [
  {
    icon: Gift,
    title: "Pack Nichos Prontos",
    description:
      "Modelos de FAQ, objeções e tom de voz para 10 nichos de negócio local, prontos para adaptar.",
    tag: `Incluso no order bump (${formatBRL(PRICING.orderBump.price)})`,
  },
  {
    icon: Layers,
    title: "Kit de Prompts para IA",
    description:
      "Coleção extra de prompts para gerar variações de scripts e respostas sempre que precisar.",
    tag: "Bônus incluso",
  },
  {
    icon: Puzzle,
    title: "Planilha de Organização de Leads",
    description:
      "Modelo simples para acompanhar contatos, status e próximos passos sem depender de memória.",
    tag: "Bônus incluso",
  },
  {
    icon: MessagesSquare,
    title: "Comunidade de apoio",
    description:
      "Espaço para trocar experiências com outros donos de negócio aplicando o método.",
    tag: "Bônus incluso",
  },
];

const forWhom = [
  "Donos de negócios locais (salões, clínicas, petshops, academias, delivery, consultorias)",
  "Autônomos e freelancers que atendem clientes diretamente",
  "Pequenas equipes que revezam o atendimento e precisam de padrão",
  "Quem já usa IA no dia a dia e quer aplicar isso ao atendimento com organização",
];

const notForWhom = [
  "Quem busca automação de disparo em massa ou robôs que enganam clientes",
  "Quem espera resultado sem aplicar nenhum material ou mudar nada no atendimento",
  "Quem procura integração oficial com Meta/WhatsApp incluída no produto",
  "Negócios que já têm um atendimento totalmente estruturado e documentado",
];

const comparisonRows = [
  {
    label: "Tempo até organizar o atendimento",
    diy: "Semanas ou meses, no improviso",
    consulting: "2 a 6 semanas, dependendo da agenda",
    balcaoia: "7 dias, no seu ritmo",
  },
  {
    label: "Custo estimado",
    diy: "Seu tempo (alto, incerto)",
    consulting: "R$ 1.500 a R$ 5.000+",
    balcaoia: `A partir de ${formatBRL(PRICING.beta)}`,
  },
  {
    label: "Materiais prontos para usar",
    diy: "Você cria do zero",
    consulting: "Depende do consultor",
    balcaoia: "Sim, com IA e modelos guiados",
  },
  {
    label: "Fica com você depois",
    diy: "Sim, mas sem estrutura",
    consulting: "Nem sempre documentado",
    balcaoia: "Sim, documentado e reaplicável",
  },
];

const faqItems = [
  {
    question: "Preciso saber programar para usar o BalcãoIA?",
    answer:
      "Não. Todo o método foi desenhado para quem não tem conhecimento técnico. Você preenche informações do seu negócio e recebe textos prontos para usar.",
  },
  {
    question: "O sistema envia mensagens automaticamente para os meus clientes?",
    answer:
      "Não. O BalcãoIA organiza e gera os materiais de atendimento (roteiros, respostas, políticas). Quem atende continua sendo você ou sua equipe, copiando e enviando pelo canal que preferir. Não fazemos nem ensinamos disparo automático ou integração não oficial de contas.",
  },
  {
    question: "Preciso ter o WhatsApp Business para usar?",
    answer:
      "Não é obrigatório. Os materiais podem ser usados manualmente em qualquer canal — incluindo o WhatsApp Business, Instagram, telefone ou presencialmente. O BalcãoIA é uma ferramenta independente, sem qualquer vínculo oficial com o WhatsApp LLC ou a Meta Platforms, Inc.",
  },
  {
    question: "É uma integração oficial com a Meta ou o WhatsApp?",
    answer:
      "Não. O BalcãoIA não é afiliado, associado, autorizado, patrocinado ou endossado pela Meta Platforms, Inc. ou pelo WhatsApp LLC. Citamos esses nomes apenas para referência do contexto de uso, conforme detalhado no nosso disclaimer de marcas.",
  },
  {
    question: "Funciona para freelancers ou agências que atendem clientes?",
    answer:
      "Sim. Além do curso, existe o Kit Agência BalcãoIA (upsell opcional), com modelos de proposta comercial e briefing para quem implanta o método para clientes.",
  },
  {
    question: "Quanto tempo leva para implementar de verdade?",
    answer:
      "O método segue uma estrutura de 7 dias, mas o ritmo é seu. Muita gente aplica as primeiras melhorias já nos 2 primeiros dias.",
  },
  {
    question: "E se eu comprar e não fizer sentido para o meu negócio?",
    answer:
      "Você tem 7 dias de garantia incondicional a partir da compra. Se não fizer sentido, é só pedir o reembolso integral.",
  },
  {
    question: "Não tenho catálogo de produtos organizado. Funciona para mim?",
    answer:
      "Sim. O método inclui um passo específico para organizar catálogo, preços e políticas do zero, mesmo que hoje isso só exista na sua cabeça.",
  },
  {
    question: "Serve só para WhatsApp, ou também para Instagram e webchat?",
    answer:
      "Os materiais são pensados para qualquer canal de atendimento: WhatsApp, Instagram, telefone, webchat ou presencial. O foco é a clareza da resposta, não uma plataforma específica.",
  },
  {
    question: "Posso usar isso para enviar mensagens em massa para quem não pediu?",
    answer:
      "Não incentivamos nem ensinamos disparo em massa não solicitado. O método reforça o uso de comunicação com consentimento, respeitando a LGPD e as políticas de cada plataforma.",
  },
];

export default function VendasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        {/* 1. Hero */}
        <section className="relative overflow-hidden gradient-petrol text-white">
          <div className="bg-grid-petrol absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-[var(--brand-amber)]/20 blur-3xl" />

          <div className="container-app relative flex flex-col items-center gap-7 py-20 text-center sm:py-28">
            <div className="inline-flex items-center rounded-2xl bg-white px-5 py-3.5 shadow-lg shadow-black/25">
              <BrandLogo size="hero" variant="light" priority />
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--brand-amber)]">
              <Rocket className="h-3.5 w-3.5" />
              Método BalcãoIA 7D
            </span>

            <h1 className="text-balance max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Organize o atendimento do seu negócio com{" "}
              <span className="text-[var(--brand-amber)]">IA em 7 dias</span> —
              sem programação, sem gambiarra e sem depender de automações
              proibidas.
            </h1>

            <p className="max-w-2xl text-balance text-lg text-white/75 sm:text-xl">
              Um método passo a passo para transformar o conhecimento que só
              está na sua cabeça em roteiros, respostas e políticas claras —
              prontos para você e sua equipe usarem todos os dias.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#oferta"
                className={cn(buttonVariants({ variant: "amber", size: "lg" }), "justify-center")}
              >
                Quero organizar meu atendimento
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/diagnostico"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "justify-center border-white/30 text-white hover:bg-white hover:text-[var(--brand-petrol)]"
                )}
              >
                Fazer diagnóstico grátis
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-amber)]" />
                7 dias de garantia
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-amber)]" />
                Sem automação não oficial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[var(--brand-amber)]" />
                Feito para negócios locais
              </span>
            </div>
          </div>
        </section>

        {/* 2. VSL placeholder */}
        <section className="bg-[var(--brand-graphite-dark)] py-16 sm:py-20">
          <div className="container-app">
            <VSLPlaceholder
              title="Assista antes de continuar: como o Método BalcãoIA 7D organiza seu atendimento"
              duration="≈ 8–12 min"
              embedUrl={SITE.media.salesVslEmbedUrl}
              caption={
                SITE.media.salesVslEmbedUrl
                  ? undefined
                  : "Player pronto — configure NEXT_PUBLIC_VSL_VENDAS_URL com sua VSL final."
              }
            />
          </div>
        </section>

        {/* 3. Pain section */}
        <section className="bg-white py-20 sm:py-28">
          <div className="container-app flex flex-col gap-14">
            <SectionTitle
              eyebrow="Isso te parece familiar?"
              title="Seu atendimento pode estar deixando vendas na mesa todos os dias"
              description="Não é falta de cliente. Na maioria dos negócios locais, o problema está em como o atendimento responde."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {painPoints.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col gap-4 rounded-xl border border-[var(--border)] p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50">
                    <Icon className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-base font-semibold text-[var(--brand-graphite)]">
                    {title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Invisible cost */}
        <section className="bg-[var(--muted)]/60 py-20 sm:py-28">
          <div className="container-app flex flex-col gap-10">
            <SectionTitle
              eyebrow="O custo invisível"
              title="O preço de um atendimento desorganizado não aparece em nenhuma planilha"
              description="Ele aparece no cliente que não voltou, na venda que esfriou e na equipe que improvisa todos os dias."
            />
            <div className="mx-auto grid w-full max-w-3xl gap-6 sm:grid-cols-3">
              <div className="flex flex-col gap-2 rounded-xl bg-white p-6 text-center shadow-sm">
                <Timer className="mx-auto h-6 w-6 text-[var(--brand-petrol)]" />
                <span className="text-2xl font-extrabold text-[var(--brand-graphite)]">Minutos</span>
                <p className="text-sm text-[var(--muted-foreground)]">
                  perdidos toda vez que alguém precisa lembrar preço, prazo ou política de cabeça.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl bg-white p-6 text-center shadow-sm">
                <MessageCircleWarning className="mx-auto h-6 w-6 text-[var(--brand-petrol)]" />
                <span className="text-2xl font-extrabold text-[var(--brand-graphite)]">Respostas</span>
                <p className="text-sm text-[var(--muted-foreground)]">
                  inconsistentes que fazem o cliente desconfiar da seriedade do negócio.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl bg-white p-6 text-center shadow-sm">
                <TrendingDown className="mx-auto h-6 w-6 text-[var(--brand-petrol)]" />
                <span className="text-2xl font-extrabold text-[var(--brand-graphite)]">Conversas</span>
                <p className="text-sm text-[var(--muted-foreground)]">
                  que esfriam sem follow-up e nunca mais voltam a virar orçamento.
                </p>
              </div>
            </div>
            <p className="mx-auto max-w-2xl text-center text-xs text-[var(--muted-foreground)]">
              Ilustrativo — o impacto real varia de negócio para negócio. Não
              fazemos qualquer promessa de faturamento ou renda.
            </p>
          </div>
        </section>

        {/* 5. Turnaround */}
        <section className="bg-white py-20 sm:py-28">
          <div className="container-app grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-5">
              <SectionTitle
                align="left"
                eyebrow="A virada"
                title="A IA só funciona bem quando o conhecimento do seu negócio está organizado"
              />
              <p className="text-[var(--muted-foreground)]">
                ChatGPT, Claude ou Gemini podem ajudar muito no atendimento —
                mas só respondem tão bem quanto a informação que recebem. Sem
                catálogo, políticas e roteiros organizados, qualquer
                ferramenta de IA vai improvisar como um atendente
                despreparado.
              </p>
              <p className="text-[var(--muted-foreground)]">
                O Método BalcãoIA 7D existe para resolver exatamente essa
                etapa: organizar o conhecimento do seu negócio antes de
                colocar a IA para ajudar — para que ela responda com o preço
                certo, o tom certo e sem inventar informação.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)]/60 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-red-600">
                <X className="h-4 w-4" />
                Sem organização
              </div>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                &ldquo;Não sei informar o prazo exato, deixa eu perguntar pra
                minha colega e te falo depois.&rdquo;
              </p>
              <div className="my-5 h-px bg-[var(--border)]" />
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand-petrol)]">
                <Check className="h-4 w-4" />
                Com o BalcãoIA
              </div>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                &ldquo;O prazo médio é de 3 a 5 dias úteis, e consigo priorizar
                seu pedido se fechar até amanhã. Quer que eu já reserve?&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* 6. Método BalcãoIA 7D */}
        <section className="bg-[var(--muted)]/60 py-20 sm:py-28">
          <div className="container-app flex flex-col gap-14">
            <SectionTitle
              eyebrow="O método"
              title="Método BalcãoIA 7D: um passo por dia até seu atendimento estar organizado"
              description="Sem depender de equipe técnica. Cada dia entrega um material pronto para usar."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {method7D.map(({ day, icon: Icon, title, description }) => (
                <div key={day} className="relative flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-petrol)]/10">
                      <Icon className="h-5 w-5 text-[var(--brand-petrol)]" />
                    </div>
                    <span className="text-xl font-extrabold text-[var(--border)]">{day}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[var(--brand-graphite)]">{title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Studio demo mock */}
        <section className="bg-white py-20 sm:py-28">
          <div className="container-app flex flex-col gap-14">
            <SectionTitle
              eyebrow="Por dentro do Studio"
              title="Veja como fica o material gerado para o seu negócio"
              description="Uma prévia da tela do BalcãoIA Studio, onde tudo é organizado e gerado com IA."
            />
            <StudioDemoMock />
          </div>
        </section>

        {/* 8. What you get */}
        <section className="bg-[var(--muted)]/60 py-20 sm:py-28">
          <div className="container-app flex flex-col gap-14">
            <SectionTitle
              eyebrow="O que você recebe"
              title="Tudo pronto para organizar seu atendimento de ponta a ponta"
            />
            <div className="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-2">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 rounded-lg bg-white p-4 text-sm text-[var(--brand-graphite)] shadow-sm"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-petrol)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Course modules */}
        <section className="bg-white py-20 sm:py-28">
          <div className="container-app flex flex-col gap-14">
            <SectionTitle
              eyebrow="Curso completo"
              title="7 módulos para você aplicar o método do início ao fim"
            />
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
              {modules.map((mod) => (
                <div
                  key={mod.number}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--border)] p-5 sm:flex-row sm:items-start sm:gap-5"
                >
                  <span className="text-2xl font-extrabold text-[var(--brand-amber-dark)]">
                    {mod.number}
                  </span>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-[var(--brand-graphite)]">
                        {mod.title}
                      </h3>
                      <Badge variant="secondary">{mod.lessons}</Badge>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">{mod.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Bonuses */}
        <section className="bg-[var(--muted)]/60 py-20 sm:py-28">
          <div className="container-app flex flex-col gap-14">
            <SectionTitle
              eyebrow="Bônus"
              title="Extras para acelerar sua organização"
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bonuses.map(({ icon: Icon, title, description, tag }) => (
                <div key={title} className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-amber)]/15">
                    <Icon className="h-5 w-5 text-[var(--brand-amber-dark)]" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--brand-graphite)]">{title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{description}</p>
                  <Badge variant="petrol" className="w-fit">{tag}</Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 11. For whom / not for whom */}
        <section className="bg-white py-20 sm:py-28">
          <div className="container-app flex flex-col gap-14">
            <SectionTitle
              eyebrow="É para você?"
              title="Para quem é (e para quem não é) o BalcãoIA"
            />
            <div className="mx-auto grid w-full max-w-4xl gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-4 rounded-2xl border-2 border-[var(--brand-petrol)]/20 bg-[var(--brand-petrol)]/5 p-6">
                <div className="flex items-center gap-2 text-sm font-bold text-[var(--brand-petrol)]">
                  <CheckCircle2 className="h-5 w-5" />
                  É para você se...
                </div>
                <ul className="flex flex-col gap-3">
                  {forWhom.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--brand-graphite)]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-petrol)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border-2 border-red-100 bg-red-50/50 p-6">
                <div className="flex items-center gap-2 text-sm font-bold text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Não é para você se...
                </div>
                <ul className="flex flex-col gap-3">
                  {notForWhom.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--brand-graphite)]">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Value comparison */}
        <section className="bg-[var(--muted)]/60 py-20 sm:py-28">
          <div className="container-app flex flex-col gap-12">
            <SectionTitle
              eyebrow="Comparativo"
              title="Fazer sozinho, contratar consultoria ou usar o BalcãoIA"
            />

            <div className="mx-auto w-full max-w-4xl overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left">
                    <th className="p-4 font-semibold text-[var(--brand-graphite)]"> </th>
                    <th className="p-4 font-semibold text-[var(--muted-foreground)]">Fazer sozinho</th>
                    <th className="p-4 font-semibold text-[var(--muted-foreground)]">Contratar consultoria</th>
                    <th className="p-4 font-semibold text-[var(--brand-petrol)]">Método BalcãoIA 7D</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="border-b border-[var(--border)] last:border-0">
                      <td className="p-4 font-medium text-[var(--brand-graphite)]">{row.label}</td>
                      <td className="p-4 text-[var(--muted-foreground)]">{row.diy}</td>
                      <td className="p-4 text-[var(--muted-foreground)]">{row.consulting}</td>
                      <td className="p-4 font-semibold text-[var(--brand-petrol)]">{row.balcaoia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
              <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                O que compõe o valor percebido do pacote completo
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PRICING.anchors.map((anchor) => (
                  <div
                    key={anchor.name}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-white px-4 py-3"
                  >
                    <span className="text-sm text-[var(--brand-graphite)]">{anchor.name}</span>
                    <span className="text-sm font-bold text-[var(--brand-petrol)]">
                      {formatBRL(anchor.value)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-[var(--muted-foreground)]">
                Valores estimados de componentes individuais, calculados para
                referência de valor percebido — total de {formatBRL(perceivedTotal)}.
                Não representam preços de venda avulsos nem garantia de
                retorno financeiro.
              </p>
            </div>
          </div>
        </section>

        {/* 13. Offer */}
        <section id="oferta" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div className="container-app flex flex-col gap-14">
            <SectionTitle
              eyebrow="Oferta"
              title="Escolha como quer começar a organizar seu atendimento"
              description="Sem mensalidade obrigatória. Pagamento único, acesso ao método completo."
            />

            <div className="mx-auto w-full max-w-lg rounded-2xl border-2 border-[var(--brand-amber)] bg-white p-8 shadow-xl shadow-[var(--brand-amber)]/10">
              <div className="flex items-center justify-between">
                <Badge variant="amber" className="gap-1.5">
                  <Flame className="h-3.5 w-3.5" />
                  Turma beta — vagas limitadas
                </Badge>
                <span className="text-xs font-medium text-[var(--muted-foreground)]">
                  Apenas {PRICING.betaLimit} vagas
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-1">
                <span className="text-sm text-[var(--muted-foreground)] line-through">
                  Valor de tabela: {formatBRL(PRICING.table)}
                </span>
                <span className="text-sm text-[var(--muted-foreground)]">
                  Valor de lançamento: {formatBRL(PRICING.launch)}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-[var(--brand-graphite)] sm:text-5xl">
                    {formatBRL(PRICING.beta)}
                  </span>
                  <span className="text-sm text-[var(--muted-foreground)]">à vista, turma beta</span>
                </div>
                <span className="text-sm font-medium text-[var(--brand-petrol)]">
                  {PRICING.installmentText}
                </span>
              </div>

              <ul className="mt-7 flex flex-col gap-3">
                {deliverables.slice(0, 6).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--brand-graphite)]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-petrol)]" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={HOTMART.checkoutUrl}
                className={cn(buttonVariants({ variant: "amber", size: "lg" }), "mt-8 w-full")}
              >
                Quero minha vaga na turma beta
              </Link>

              <p className="mt-4 text-center text-xs text-[var(--muted-foreground)]">
                Valor percebido do pacote completo: {formatBRL(perceivedTotal)}.
              </p>
            </div>

            <div className="mx-auto grid w-full max-w-3xl gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-dashed border-[var(--brand-petrol-light)]/40 p-5">
                <Gift className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-amber-dark)]" />
                <div>
                  <h4 className="text-sm font-bold text-[var(--brand-graphite)]">
                    Leve também: {PRICING.orderBump.name}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    Modelos prontos por nicho de negócio, por apenas{" "}
                    <strong>{formatBRL(PRICING.orderBump.price)}</strong> a mais no checkout.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-dashed border-[var(--brand-petrol-light)]/40 p-5">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-amber-dark)]" />
                <div>
                  <h4 className="text-sm font-bold text-[var(--brand-graphite)]">
                    Para agências: {PRICING.upsell.name}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                    Oferecido após a compra, por {formatBRL(PRICING.upsell.price)}, com propostas
                    e briefings prontos para implantar em clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 14. Guarantee */}
        <section className="bg-[var(--brand-petrol)]/5 py-16 sm:py-20">
          <div className="container-app flex flex-col items-center gap-4 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-petrol)]/10">
              <ShieldCheck className="h-7 w-7 text-[var(--brand-petrol)]" />
            </span>
            <h2 className="text-balance text-2xl font-extrabold text-[var(--brand-graphite)] sm:text-3xl">
              Garantia incondicional de 7 dias
            </h2>
            <p className="max-w-xl text-balance text-[var(--muted-foreground)]">
              Aplique o método. Se em até 7 dias após a compra você sentir que
              não fez sentido para o seu negócio, é só pedir o reembolso
              integral — sem perguntas, sem burocracia.
            </p>
          </div>
        </section>

        {/* 15. FAQ */}
        <section className="bg-white py-20 sm:py-28">
          <div className="container-app flex flex-col gap-14">
            <SectionTitle
              eyebrow="Perguntas frequentes"
              title="Ainda com dúvidas? A gente responde"
            />
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* 16. Final CTA */}
        <section className="bg-[var(--brand-graphite-dark)] py-20 sm:py-24">
          <div className="container-app flex flex-col items-center gap-6 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Seu atendimento pode ficar organizado a partir de hoje
            </h2>
            <p className="max-w-xl text-balance text-white/70">
              Comece pelo diagnóstico gratuito ou garanta sua vaga na turma
              beta do Método BalcãoIA 7D agora mesmo.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="#oferta" className={cn(buttonVariants({ variant: "amber", size: "lg" }))}>
                Quero minha vaga
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/checklist"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white/30 text-white hover:bg-white hover:text-[var(--brand-petrol)]"
                )}
              >
                Ver checklist gratuito
              </Link>
            </div>
          </div>
        </section>

        {/* 17. Disclaimer */}
        <section className="bg-[var(--brand-graphite-dark)] pb-16">
          <div className="container-app border-t border-white/10 pt-8">
            <DisclaimerBrands />
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

function StudioDemoMock() {
  const tabs = [
    { icon: BookOpenCheck, label: "Base de Conhecimento", active: false },
    { icon: MessagesSquare, label: "Scripts", active: true },
    { icon: ListChecks, label: "Simulador", active: false },
    { icon: BadgeCheck, label: "Checklist 7D", active: false },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--muted)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand-amber)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs text-[var(--muted-foreground)]">
          balcaoia.studio/negocio/salao-da-ana
        </span>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="flex shrink-0 gap-1 border-b border-[var(--border)] bg-[var(--muted)]/60 p-3 sm:flex-col sm:border-b-0 sm:border-r sm:p-4 sm:w-48">
          {tabs.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium",
                active
                  ? "bg-[var(--brand-petrol)] text-white"
                  : "text-[var(--muted-foreground)]"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex-1 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[var(--brand-graphite)]">
              Roteiro de objeção — &ldquo;Está caro&rdquo;
            </h3>
            <Badge variant="petrol">Gerado com IA</Badge>
          </div>
          <div className="flex flex-col gap-3 rounded-lg bg-[var(--muted)]/60 p-4 text-sm text-[var(--brand-graphite)]">
            <p>
              &ldquo;Entendo perfeitamente! O valor inclui [detalhe do
              produto/serviço] e costuma durar [prazo]. Se fechar até
              [data], consigo manter esse valor. Posso reservar para
              você?&rdquo;
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">Tom: acolhedor</Badge>
            <Badge variant="secondary">Objeção: preço</Badge>
            <Badge variant="secondary">Próximo passo: agendar</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

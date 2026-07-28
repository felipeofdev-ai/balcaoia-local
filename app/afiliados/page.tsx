import type { Metadata } from "next";
import {
  AlertTriangle,
  Ban,
  Mail,
  MessageCircle,
  ShieldAlert,
  UserX,
  Video,
} from "lucide-react";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { SectionTitle } from "@/components/marketing/SectionTitle";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { DisclaimerBrands } from "@/components/marketing/DisclaimerBrands";
import { CopyButton } from "@/components/shared/CopyButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { HOTMART, HOTMART_COMPLIANCE_RULES } from "@/lib/config/hotmart";
import { PRICING, formatBRL } from "@/lib/config/pricing";
import { SITE } from "@/lib/config/site";
import {
  AffiliateProgramSections,
  AFFILIATE_PROGRAM_FAQ,
} from "@/components/marketing/AffiliateProgramSections";

export const metadata: Metadata = {
  title: "Programa de Afiliados — até 70% LOTE 1",
  description:
    "Indique os 16 produtos BalcãoIA LOTE 1 (A1, A2, B1, C2, D1, D3 + micros J1–J10) com comissão de 50% a 70% e cookie de 180 dias. Materiais, tabela, simulador e regras de compliance — sem promessa de renda.",
  alternates: { canonical: `${SITE.url}/afiliados` },
  openGraph: {
    title: "Programa de Afiliados BalcãoIA",
    description: "Comissão de até 70% no LOTE 1, cookie de 180 dias. Materiais prontos e regras Hotmart.",
    url: `${SITE.url}/afiliados`,
  },
};

const shortCopy = `Ajudo negócios locais a organizar o atendimento com IA — sem programação, sem gambiarra e sem depender de automações proibidas.

Conheça o Método BalcãoIA 7D e organize seu atendimento em 7 dias: ${HOTMART.affiliateBaseUrl}`;

const headlines = [
  "Seu atendimento responde rápido ou o cliente já foi pra concorrência?",
  "7 dias para organizar o atendimento do seu negócio com IA (sem programar)",
  "O erro mais comum de quem tenta usar IA no atendimento (e como evitar)",
  'Chega de responder "deixa eu ver e te falo depois"',
  "Seu catálogo existe, mas ainda parece uma bagunça? Isso tem solução",
  "A IA só ajuda de verdade quando você organiza o que ela precisa saber",
  "Método BalcãoIA 7D: organize o atendimento sem depender de equipe técnica",
  '"Vou pensar" não precisa ser o fim da conversa com o cliente',
  "Pare de perder venda por demora ou resposta desorganizada",
  "Como negócios locais estão organizando o atendimento com IA, sem automação arriscada",
];

const reelsScripts = [
  {
    title: "Reel 1 — O problema do improviso",
    script:
      "GANCHO: \"Seu atendimento tem dono ou tem sorte?\"\nDESENVOLVIMENTO: Mostre 2-3 sinais de atendimento desorganizado (demora, respostas diferentes, preço na cabeça).\nCTA: \"Eu uso um método de 7 dias pra organizar isso. Link na bio.\"",
  },
  {
    title: "Reel 2 — Antes e depois de uma resposta",
    script:
      "GANCHO: \"Olha a diferença entre responder no improviso e responder organizado.\"\nDESENVOLVIMENTO: Leia a mesma pergunta de cliente com resposta ruim vs. resposta clara e objetiva.\nCTA: \"Isso é o Método BalcãoIA 7D. Link na bio pra conhecer.\"",
  },
  {
    title: "Reel 3 — O erro de usar IA sem organização",
    script:
      "GANCHO: \"Você usa ChatGPT no atendimento e ele ainda erra o preço?\"\nDESENVOLVIMENTO: Explique que a IA só responde bem com informação organizada — catálogo, política, tom de voz.\nCTA: \"Tem um método pra organizar isso antes. Link na bio.\"",
  },
  {
    title: "Reel 4 — 3 perguntas que revelam bagunça",
    script:
      "GANCHO: \"3 perguntas que mostram se seu atendimento está organizado.\"\nDESENVOLVIMENTO: 1) Você sabe seu tempo médio de resposta? 2) Tem resposta pronta pra objeção de preço? 3) Alguém revisa as conversas?\nCTA: \"Se travou em alguma, faça o diagnóstico gratuito. Link na bio.\"",
  },
  {
    title: "Reel 5 — O que é o Método 7D",
    script:
      "GANCHO: \"O que é o Método BalcãoIA 7D em 30 segundos.\"\nDESENVOLVIMENTO: Cite rapidamente: diagnóstico, base de conhecimento, catálogo, roteiros, objeções, IA e checklist.\nCTA: \"Cada dia entrega um material pronto. Link na bio.\"",
  },
  {
    title: "Reel 6 — Objeção: \"está caro\"",
    script:
      "GANCHO: \"Você sabe responder quando o cliente diz que está caro?\"\nDESENVOLVIMENTO: Mostre um exemplo de resposta de objeção bem estruturada (valor, prazo, próximo passo).\nCTA: \"Scripts assim vêm prontos no Método 7D. Link na bio.\"",
  },
  {
    title: "Reel 7 — Sem automação arriscada",
    script:
      "GANCHO: \"Não, isso não é um robô te enganando no WhatsApp.\"\nDESENVOLVIMENTO: Explique que o método organiza materiais pra você e sua equipe usarem — sem disparo automático nem integração não oficial.\nCTA: \"Organização de verdade, no seu controle. Link na bio.\"",
  },
  {
    title: "Reel 8 — Depoimento estruturado (uso próprio)",
    script:
      "GANCHO: \"O que mudou no meu atendimento depois de organizar.\"\nDESENVOLVIMENTO: Fale de mudanças concretas e observáveis (tempo de resposta, clareza, menos retrabalho) — sem citar números de faturamento ou promessas de ganho.\nCTA: \"Se quiser testar o mesmo processo, link na bio.\"",
  },
  {
    title: "Reel 9 — Para quem atende sozinho",
    script:
      "GANCHO: \"Se você atende sozinho, isso é pra você.\"\nDESENVOLVIMENTO: Mostre como ter roteiros prontos evita ter que \"inventar\" resposta toda hora.\nCTA: \"O Método 7D ajuda a organizar isso em uma semana. Link na bio.\"",
  },
  {
    title: "Reel 10 — Convite para o diagnóstico gratuito",
    script:
      "GANCHO: \"Teste grátis: seu atendimento está organizado?\"\nDESENVOLVIMENTO: Convide para o diagnóstico gratuito de 10 perguntas, cite que leva 2 minutos.\nCTA: \"Link na bio pra fazer o diagnóstico agora.\"",
  },
];

const emails = [
  {
    subject: "Seu atendimento está deixando venda na mesa?",
    body: "Oi, [nome]!\n\nVocê já parou pra pensar em quantas vendas se perdem só porque o atendimento demorou ou respondeu sem clareza?\n\nConheci um método chamado BalcãoIA 7D que ajuda negócios locais a organizar tudo isso — catálogo, respostas, objeções — em 7 dias, sem precisar programar nada.\n\nTem até um diagnóstico gratuito de 2 minutos pra você ver onde seu atendimento está travando: [link]\n\nUm abraço,\n[seu nome]",
  },
  {
    subject: "O erro que quase todo mundo comete ao usar IA no atendimento",
    body: "Oi, [nome]!\n\nUsar ChatGPT ou outra IA no atendimento parece ótimo, até a IA responder errado o preço ou inventar uma política que não existe.\n\nO problema não é a IA — é a falta de organização por trás dela.\n\nO Método BalcãoIA 7D resolve exatamente essa etapa: organiza catálogo, políticas e tom de voz antes de qualquer IA entrar em cena.\n\nVale a pena conhecer: [link]\n\n[seu nome]",
  },
  {
    subject: "Diagnóstico gratuito: como está seu atendimento hoje?",
    body: "Oi, [nome]!\n\nSepara 2 minutos e responde esse diagnóstico gratuito de 10 perguntas sobre o seu atendimento: [link]\n\nNo final você recebe uma pontuação e um plano de ação de 7 dias — sem custo, sem compromisso.\n\n[seu nome]",
  },
  {
    subject: "Como organizar seu atendimento em 7 dias (sem gambiarra)",
    body: "Oi, [nome]!\n\nQuero te apresentar o Método BalcãoIA 7D: um passo a passo simples pra organizar diagnóstico, catálogo, roteiros de resposta, objeções e checklist de implantação — um passo por dia, sem depender de equipe técnica.\n\nDá uma olhada nos detalhes aqui: [link]\n\n[seu nome]",
  },
  {
    subject: "Últimos dias da turma beta do Método BalcãoIA 7D",
    body: "Oi, [nome]!\n\nA turma beta do Método BalcãoIA 7D tem vagas limitadas e um valor especial enquanto durar.\n\nSe você quer organizar o atendimento do seu negócio com um método claro, sem depender de automação arriscada, esse é o momento: [link]\n\nQualquer dúvida, me chama.\n\n[seu nome]",
  },
];

const communityMessages = [
  "Pessoal, encontrei um método (BalcãoIA 7D) que ajuda a organizar o atendimento de negócios locais com IA, em 7 dias, sem precisar programar. Tem até diagnóstico gratuito pra quem quiser testar: [link]. (Sou afiliado(a) e posso ganhar comissão se você comprar por esse link.)",
  "Alguém aqui sente que o atendimento do negócio ainda é meio no improviso? Vale a pena fazer esse diagnóstico gratuito de 2 minutos, mostra onde estão os gargalos: [link]. (Link de afiliado(a) — divulgação transparente.)",
  "Compartilhando um material gratuito sobre como organizar catálogo, respostas e objeções antes de usar IA no atendimento: [link]. Achei bem direto ao ponto. (Uso link de afiliado(a) nessa recomendação.)",
  "Para quem atende sozinho e sente que vive respondendo \"no improviso\": existe um método estruturado de 7 dias pra organizar isso (BalcãoIA 7D). Aula gratuita aqui: [link]. (Divulgação como afiliado(a).)",
  "Só passando pra avisar: a turma beta de um curso sobre organização de atendimento com IA (BalcãoIA) está com vagas limitadas. Achei o conteúdo útil e virei afiliado(a): [link].",
];

const objectionFaq = [
  {
    question: "Isso é pirâmide, MLM ou esquema de ganhar dinheiro rápido?",
    answer:
      "Não. O programa de afiliados do BalcãoIA é uma comissão por indicação de um produto educacional real (curso + ferramenta). Não fazemos qualquer promessa de renda, e os resultados como afiliado dependem do seu próprio esforço de divulgação.",
  },
  {
    question: "Quanto vou ganhar divulgando como afiliado(a)?",
    answer:
      "Não é possível prometer valores ou renda garantida — isso varia conforme o esforço de cada afiliado, o público e diversos outros fatores fora do nosso controle. Qualquer material que sugira ganho garantido não deve ser usado.",
  },
  {
    question: "Posso dizer que sou parceiro(a) oficial do WhatsApp ou da Meta?",
    answer:
      "Não. O BalcãoIA não tem qualquer vínculo oficial, autorização, patrocínio ou associação com o WhatsApp LLC ou a Meta Platforms, Inc. Nunca use termos como \"parceiro oficial\" ou similares ao divulgar.",
  },
  {
    question: "Posso usar o nome BalcãoIA, WhatsApp ou Meta no meu nome de perfil/usuário?",
    answer:
      "Não. Evite usar essas marcas em nomes de perfil, nome de usuário, domínio ou identidade visual que sugira ser um canal oficial. Você pode citar os nomes no conteúdo, de forma nominativa, sempre com clareza de que é uma recomendação pessoal.",
  },
  {
    question: "Posso enviar essas mensagens em massa para quem não pediu?",
    answer:
      "Não. As mensagens de comunidade e e-mail devem ser usadas apenas em contextos com relação e consentimento prévio (sua própria lista, grupos onde você participa ativamente). Evite qualquer prática de spam.",
  },
];

const disclosureRules = [
  {
    icon: Ban,
    title: "Nunca prometa renda garantida",
    description:
      "Não use frases como \"ganhe R$X por mês\" ou \"renda garantida\". Resultados variam e dependem do esforço de cada pessoa.",
  },
  {
    icon: ShieldAlert,
    title: "Nunca diga ser oficial da Meta/WhatsApp",
    description:
      "O BalcãoIA não tem qualquer parceria oficial com Meta Platforms, Inc. ou WhatsApp LLC. Cite os nomes apenas de forma nominativa e neutra.",
  },
  {
    icon: UserX,
    title: "Não use marcas de terceiros no seu perfil",
    description:
      "Evite nomes de usuário, biografias ou domínios que usem \"WhatsApp\", \"Meta\" ou \"BalcãoIA\" de forma a parecer um canal oficial.",
  },
  {
    icon: AlertTriangle,
    title: "Não faça spam",
    description:
      "Só divulgue em canais onde você tem relação com o público (sua lista, seus grupos, seu conteúdo) e sempre com transparência de que é um link de afiliado(a).",
  },
];

export default function AfiliadosPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AFFILIATE_PROGRAM_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MarketingHeader />
      <main className="flex-1">
        <AffiliateProgramSections />

        <section id="materiais" className="scroll-mt-20 bg-white py-10">
          <div className="container-app">
            <SectionTitle
              align="left"
              eyebrow="Materiais"
              title="Kit oficial do afiliado — copys e roteiros"
            />
            <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--muted)]/40 p-6">
              <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                <li>
                  <strong className="text-[var(--brand-graphite)]">Produto:</strong>{" "}
                  {HOTMART.productName}
                </li>
                <li>
                  <strong className="text-[var(--brand-graphite)]">Preços:</strong> tabela{" "}
                  {formatBRL(PRICING.table)} · lançamento {formatBRL(PRICING.launch)} · beta{" "}
                  {formatBRL(PRICING.beta)}
                </li>
                <li>
                  <strong className="text-[var(--brand-graphite)]">Garantia:</strong>{" "}
                  {HOTMART.guaranteeDays} dias
                </li>
                <li>
                  <strong className="text-[var(--brand-graphite)]">Página de vendas:</strong>{" "}
                  {SITE.url}/vendas
                </li>
                <li>
                  <strong className="text-[var(--brand-graphite)]">Link afiliado:</strong>{" "}
                  {HOTMART.affiliateBaseUrl}
                </li>
              </ul>
              <p className="mt-4 text-xs text-[var(--muted-foreground)]">
                Diretrizes Hotmart: não use a marca Hotmart como se o produto fosse dela; não
                prometa resultados; não faça spam; informe características reais da oferta. Veja{" "}
                <a
                  className="underline"
                  href="https://hotmart.com/pt-br/legal/politicas-de-uso"
                  target="_blank"
                  rel="noreferrer"
                >
                  Política de Uso Responsável
                </a>{" "}
                e{" "}
                <a
                  className="underline"
                  href="https://hotmart.com/pt-br/blog/melhores-praticas"
                  target="_blank"
                  rel="noreferrer"
                >
                  melhores práticas
                </a>
                .
              </p>
              <div className="mt-4 space-y-1">
                {HOTMART_COMPLIANCE_RULES.map((rule) => (
                  <p key={rule} className="text-xs text-[var(--brand-graphite)]">
                    • {rule}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--muted)]/60 py-14 sm:py-16">
          <div className="container-app">
            <div className="mx-auto flex w-full max-w-3xl items-start gap-3 rounded-xl border-2 border-[var(--brand-amber)] bg-white p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-amber-dark)]" />
              <p className="text-sm text-[var(--brand-graphite)]">
                <strong>Antes de divulgar:</strong> leia as regras de
                divulgação no final desta página. Elas existem para proteger
                você e o BalcãoIA de problemas legais e de reputação.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="container-app flex flex-col gap-6">
            <SectionTitle
              align="left"
              eyebrow="Copy curta"
              title="Para usar em bio, assinatura ou legenda rápida"
            />
            <Card className="mx-auto w-full max-w-3xl">
              <CardContent className="flex flex-col gap-4 pt-6">
                <p className="whitespace-pre-line text-sm text-[var(--brand-graphite)]">
                  {shortCopy}
                </p>
                <CopyButton text={shortCopy} className="w-fit" />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-[var(--muted)]/60 py-16 sm:py-24">
          <div className="container-app flex flex-col gap-10">
            <SectionTitle
              eyebrow="Biblioteca de materiais"
              title="Headlines, roteiros de Reels, e-mails e mensagens de comunidade"
              description="Copie, adapte ao seu tom de voz e sempre inclua a transparência de que é um link de afiliado(a)."
            />

            <Tabs defaultValue="headlines" className="mx-auto w-full max-w-4xl">
              <TabsList className="flex w-full flex-wrap justify-center gap-1">
                <TabsTrigger value="headlines">Headlines</TabsTrigger>
                <TabsTrigger value="reels">Reels</TabsTrigger>
                <TabsTrigger value="emails">E-mails</TabsTrigger>
                <TabsTrigger value="community">Comunidade</TabsTrigger>
              </TabsList>

              <TabsContent value="headlines">
                <div className="grid gap-3 sm:grid-cols-2">
                  {headlines.map((headline, index) => (
                    <div
                      key={headline}
                      className="flex items-start justify-between gap-3 rounded-lg border border-[var(--border)] bg-white p-4"
                    >
                      <p className="text-sm text-[var(--brand-graphite)]">
                        <span className="mr-1.5 font-bold text-[var(--brand-amber-dark)]">
                          {index + 1}.
                        </span>
                        {headline}
                      </p>
                      <CopyButton
                        text={headline}
                        copyLabel=""
                        copiedLabel=""
                        size="icon"
                        className="min-w-0 shrink-0"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reels">
                <div className="flex flex-col gap-4">
                  {reelsScripts.map((reel) => (
                    <Card key={reel.title}>
                      <CardContent className="flex flex-col gap-3 pt-6">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-[var(--brand-petrol)]" />
                          <h3 className="text-sm font-bold text-[var(--brand-graphite)]">
                            {reel.title}
                          </h3>
                        </div>
                        <p className="whitespace-pre-line text-sm text-[var(--muted-foreground)]">
                          {reel.script}
                        </p>
                        <CopyButton text={reel.script} className="w-fit" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="emails">
                <div className="flex flex-col gap-4">
                  {emails.map((email) => (
                    <Card key={email.subject}>
                      <CardContent className="flex flex-col gap-3 pt-6">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[var(--brand-petrol)]" />
                          <h3 className="text-sm font-bold text-[var(--brand-graphite)]">
                            Assunto: {email.subject}
                          </h3>
                        </div>
                        <p className="whitespace-pre-line text-sm text-[var(--muted-foreground)]">
                          {email.body}
                        </p>
                        <CopyButton text={`Assunto: ${email.subject}\n\n${email.body}`} className="w-fit" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="community">
                <div className="flex flex-col gap-4">
                  {communityMessages.map((message, index) => (
                    <Card key={index}>
                      <CardContent className="flex flex-col gap-3 pt-6">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-[var(--brand-petrol)]" />
                          <h3 className="text-sm font-bold text-[var(--brand-graphite)]">
                            Mensagem {index + 1}
                          </h3>
                        </div>
                        <p className="whitespace-pre-line text-sm text-[var(--muted-foreground)]">
                          {message}
                        </p>
                        <CopyButton text={message} className="w-fit" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-24">
          <div className="container-app flex flex-col gap-10">
            <SectionTitle
              eyebrow="Perguntas e objeções"
              title="Como responder às dúvidas mais comuns sobre a divulgação"
            />
            <FAQAccordion items={objectionFaq} />
          </div>
        </section>

        <section className="bg-[var(--brand-graphite-dark)] py-16 text-white sm:py-24">
          <div className="container-app flex flex-col gap-10">
            <SectionTitle
              light
              eyebrow="Regras de divulgação"
              title="Leia antes de divulgar — é isso que protege você"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {disclosureRules.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-amber)]/15">
                    <Icon className="h-5 w-5 text-[var(--brand-amber)]" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{title}</h3>
                  <p className="text-sm text-white/70">{description}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8">
              <DisclaimerBrands />
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

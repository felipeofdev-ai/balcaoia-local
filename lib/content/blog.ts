export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  relatedProductSlug?: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ia-para-negocios-locais-2026",
    title: "IA para negócios locais em 2026: por onde começar sem gambiarra",
    description:
      "Guia prático para donos de salões, clínicas e lojas usarem IA com organização e revisão humana.",
    date: "2026-07-01",
    relatedProductSlug: "negocio-local-ia",
    content: `## O problema não é a ferramenta

Muitos negócios locais testam ChatGPT e desistem porque a resposta inventa preço ou tom. O problema raramente é o modelo — é a **falta de base organizada**.

## Três fundamentos

1. Catálogo e políticas por escrito
2. Roteiros de primeira resposta
3. Revisão humana antes de ir ao ar

## O que evitar

Automações não oficiais de WhatsApp, disparo em massa e promessas de renda. Isso gera risco e quebra confiança.

## Próximo passo

Faça o [diagnóstico gratuito](/diagnostico) e conheça o [Método BalcãoIA 7D](/vendas).`,
  },
  {
    slug: "organizar-atendimento-7-dias",
    title: "Como organizar o atendimento do seu negócio em 7 dias",
    description: "Roteiro dia a dia para transformar improviso em padrão claro.",
    date: "2026-07-05",
    relatedProductSlug: "desafio-7d-atendimento",
    content: `## Dia 1–2: Diagnóstico

Liste perguntas repetidas, tempo de resposta e onde o cliente some.

## Dia 3–4: Dados

Preços, prazos, trocas e FAQ em um único lugar.

## Dia 5–6: Discursos

Primeira resposta, objeções e handoff para humano.

## Dia 7: Teste

Simule conversas e ajuste. Sem prometer vendas garantidas — foque em clareza.

Produto relacionado: [Desafio 7 Dias](/produtos/desafio-7d-atendimento).`,
  },
  {
    slug: "afiliados-hotmart-compliance",
    title: "Hotmart para afiliados: compliance que protege sua conta",
    description:
      "Regras práticas para divulgar sem prometer renda e sem usar marcas indevidamente.",
    date: "2026-07-10",
    content: `## Não prometa renda

Promessa de faturamento/garantia de venda é o caminho mais curto para denúncia.

## Reproduza a oferta fielmente

Preço, garantia e entregáveis iguais à página oficial.

## Use o kit

Materiais prontos em [/afiliados](/afiliados) e por produto em \`/produtos/[slug]/afiliados\`.`,
  },
  {
    slug: "whatsapp-atendimento-com-consentimento",
    title: "WhatsApp no atendimento: consentimento, LGPD e clareza",
    description: "Boas práticas para negócios locais sem automação proibida.",
    date: "2026-07-12",
    relatedProductSlug: "whatsapp-etico-negocios",
    content: `## Consentimento primeiro

Só continue conversas com quem pediu ou já é cliente, respeitando opt-out.

## Respostas padronizadas ≠ robô ilegal

Roteiros humanos + IA assistida com revisão são o caminho seguro.

Veja o [disclaimer](/disclaimer) e o produto [WhatsApp Ético](/produtos/whatsapp-etico-negocios).`,
  },
  {
    slug: "marketing-local-sem-trafego-pago",
    title: "Marketing local sem depender só de anúncio",
    description: "Oferta clara, Google Meu Negócio e follow-up ético.",
    date: "2026-07-15",
    relatedProductSlug: "marketing-local",
    content: `## Oferta em uma frase

Se você não explica o que vende em 10 segundos, o anúncio não salva.

## Presença básica

Google Meu Negócio atualizado + prova social real.

## Follow-up

Mensagens com consentimento. Sem spam.

Produto relacionado: [Marketing Local](/produtos/marketing-local).`,
  },
  {
    slug: "ia-no-whatsapp-com-revisao-humana",
    title: "Como usar IA no WhatsApp com revisão humana (sem spam)",
    description:
      "Fluxo Prompt → Revisar → Registrar para negócios locais. Sem promessa de vendas e sem automação não oficial.",
    date: "2026-07-20",
    relatedProductSlug: "workshop-ia-atendimento",
    content: `## O que mudou em 2026

Com recursos nativos de IA no WhatsApp Business (disponibilidade gradual conforme a Meta), a tentação é “ligar e esquecer”. Na prática, a qualidade depende do **catálogo**, das **políticas** e da **revisão humana**.

## Loop seguro: Prompt → Revisar → Registrar

1. **Prompt**: peça rascunho com contexto (preço, prazo, tom).
2. **Revisar**: humano confere fatos antes de enviar.
3. **Registrar**: salve a versão boa no FAQ interno.

## O que NÃO fazer

- Listas compradas e disparo em massa
- Automações não oficiais (risco de ban e compliance)
- Deixar a IA inventar preço ou prazo

## Checklist de 20 minutos

- [ ] Catálogo com preços atualizados
- [ ] 10 perguntas frequentes respondidas
- [ ] Status com horários de atendimento
- [ ] Regra: IA rascunha, humano aprova

Continue no [Workshop IA no Atendimento](/produtos/workshop-ia-atendimento) ou no [Método 7D](/vendas).`,
  },
  {
    slug: "ferramentas-ia-uteis-negocio-local",
    title: "Ferramentas de IA úteis para negócio local (com critério)",
    description:
      "Como escolher ferramentas sem cair em hype. Organização primeiro, app depois.",
    date: "2026-07-22",
    relatedProductSlug: "sistema-balcao-proprietario",
    content: `## Critério de escolha

Pergunte: isso reduz retrabalho **depois** que eu organizei catálogo e respostas? Se a base está bagunçada, a ferramenta só acelera o erro.

## Categorias úteis

1. **Escrita assistida** — rascunhos de resposta e posts (sempre revisar)
2. **Organização** — notas, checklists, planilhas
3. **Imagem** — só quando a marca já tem diretrizes

## Armadilhas

- Assinar 5 apps e não usar nenhum
- Automatizar atendimento sem política
- Medir “tempo economizado” sem evidência do que saiu no dia

## Próximo passo

Monte um sistema mínimo com o [Sistema Balcão Proprietário](/produtos/sistema-balcao-proprietario) ou o diagnóstico em [/diagnostico](/diagnostico).`,
  },
  {
    slug: "foco-para-quem-empreende-sozinho",
    title: "Foco para quem empreende sozinho: 2 janelas e evidência diária",
    description:
      "Método realista para balcão e prestadores: proteger blocos e fechar o dia com output nomeável.",
    date: "2026-07-24",
    relatedProductSlug: "foco-14",
    content: `## Produtividade genérica falha no balcão

Pomodoro morre no primeiro “oi, tem um minutinho?”. O desenho do seu dia precisa aceitar interrupção como regra.

## Duas janelas + Lista 3

1. Bloqueie 2 períodos de 45–90 min
2. Defina só 3 prioridades
3. Feche o dia com 10 min de check-out (o que saiu / o que fica)

## Evidência > sensação

“Trabalhei o dia todo” não é métrica. Output nomeável (“orçamento X enviado”) é.

Pratique 14 dias com o [FOCO 14](/produtos/foco-14).`,
  },
  {
    slug: "catalogo-precos-claros-cliente",
    title: "Catálogo e preços claros: o cliente entende em 30 segundos?",
    description:
      "Estruture oferta, faixas e pacotes para reduzir atrito no atendimento.",
    date: "2026-07-25",
    relatedProductSlug: "guia-catalogo-precos",
    content: `## Sintoma clássico

O cliente pergunta “quanto fica?” e a resposta muda conforme quem atende. Isso gera retrabalho e desconfiança.

## Estrutura mínima

- Nome do serviço/produto
- O que inclui / o que não inclui
- Preço ou faixa
- Prazo típico
- Política de troca/cancelamento (se houver)

## Linguagem de preço

Treine frases curtas e honestas. Sem pressão indevida. Sem inventar desconto falso.

Use o [Guia Catálogo & Preços](/produtos/guia-catalogo-precos).`,
  },
  {
    slug: "business-ai-whatsapp-organizacao",
    title: "Business AI no WhatsApp: por que organização vem antes da automação",
    description:
      "Tendência 2026: IA nativa no WhatsApp Business. O que preparar no seu balcão (catálogo, FAQ, handoff).",
    date: "2026-07-27",
    relatedProductSlug: "whatsapp-etico-negocios",
    content: `## Contexto

Em 2026, a Meta ampliou recursos de IA no WhatsApp Business para PMEs (liberação gradual). Isso muda o jogo para quem já tem **dados e políticas** claros — e frustra quem ainda opera no improviso.

## O que preparar agora

1. Perfil e horário completos
2. Catálogo com itens reais
3. FAQ interno (o que a IA pode e não pode afirmar)
4. Regra de escalonamento para humano

## Limites honestos

IA nativa ajuda no primeiro nível. Operações com equipe, CRM e funis mais complexos ainda precisam de processo humano e ferramentas adequadas — sempre dentro das regras oficiais.

## Trilha BalcãoIA

Comece por [WhatsApp Ético](/produtos/whatsapp-etico-negocios) e o hub [/ecossistema](/ecossistema). Sem promessa de renda. Sem gambiarra.`,
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

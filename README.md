# BalcãoIA Studio

> ## ⚠️ Aviso importante (leia antes de usar)
>
> O **BalcãoIA Studio** é uma ferramenta **educacional e de produtividade** para ajudar
> negócios locais a organizar catálogo, base de conhecimento e scripts de atendimento
> com apoio de Inteligência Artificial.
>
> - **Não garantimos** resultados de vendas, faturamento, aprovação ou qualquer
>   resultado financeiro.
> - **Não fazemos** diagnósticos médicos, veterinários, jurídicos ou financeiros —
>   todo o conteúdo gerado por IA deve ser **revisado por um humano** antes de ser
>   usado com clientes reais.
> - **Não somos afiliados** a WhatsApp, Meta, Google, OpenAI, Anthropic, Hotmart ou
>   quaisquer outras marcas eventualmente citadas.
> - Este produto **não usa e não suporta** automações não oficiais de WhatsApp
>   (OpenWA, Baileys, Venom, Evolution API, WA-Automate, scraping via QR Code).
>   Veja [Regras de compliance](#regras-de-compliance) abaixo.
>
> Consulte também `/disclaimer`, `/termos-de-uso` e `/politica-de-privacidade` no app.

---

## Sumário

- [Stack](#stack)
- [Instalação](#instalação)
- [Configuração do Supabase](#configuração-do-supabase)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Rodando localmente](#rodando-localmente)
- [Testes](#testes)
- [Deploy na Vercel](#deploy-na-vercel)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como adicionar um novo nicho](#como-adicionar-um-novo-nicho)
- [Webhook da Hotmart](#webhook-da-hotmart)
- [Trocando o provedor de IA](#trocando-o-provedor-de-ia)
- [WhatsApp Cloud API (feature flag)](#whatsapp-cloud-api-feature-flag)
- [Regras de compliance](#regras-de-compliance)
- [Suporte](#suporte)

---

## Stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router, React 19, TypeScript, Turbopack)
- **Estilo:** Tailwind CSS 4
- **Banco de dados:** Supabase (Postgres + Auth), com **modo demo sem Supabase**
  (dados em `localStorage` no navegador / memória no servidor)
- **Validação:** Zod
- **IA:** provedor plugável — Mock (padrão, sem custo), OpenAI, Anthropic ou Gemini
- **E-mail transacional:** Resend (com modo "log" quando não configurado)
- **Exportação:** Markdown nativo e PDF via `jsPDF`
- **Testes:** Vitest

## Instalação

Pré-requisitos: Node.js 20+ e npm.

```bash
npm install
```

## Configuração do Supabase

O projeto funciona **sem Supabase configurado** (modo demo, com dados salvos no
navegador). Para persistência real, siga estes passos:

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No SQL Editor do projeto, execute o conteúdo de
   `supabase/migrations/001_initial_schema.sql` (cria tabelas, RLS e nichos
   iniciais).
3. Copie a **Project URL**, a **anon key** e a **service_role key** do painel
   (Settings → API) para o seu `.env.local` (veja abaixo).
4. Configure a autenticação (e-mail/senha ou o provedor de sua preferência) em
   Authentication → Providers.

Sem essas variáveis, as rotas de API (`/api/leads`, `/api/diagnostic`,
`/api/businesses`, `/api/webhooks/hotmart`, etc.) operam em modo **mock/local**,
retornando `{ mode: "local" }` ou `{ mode: "mock" }` e continuam funcionais para
demonstração e desenvolvimento.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha o que for usar:

```bash
cp .env.example .env.local
```

Nenhuma variável é obrigatória para rodar em modo demo. Principais grupos:

| Grupo | Variáveis | Efeito quando ausente |
| --- | --- | --- |
| Site | `NEXT_PUBLIC_SITE_URL` | usa `http://localhost:3000` |
| Supabase | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | modo demo (localStorage/memória) |
| IA | `AI_PROVIDER`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `*_MODEL` | usa `MockAIProvider` (determinístico, sem custo) |
| Hotmart | `HOTMART_HOTTOK` | webhook aceita qualquer chamada (uso só para teste local) |
| WhatsApp Cloud API | `ENABLE_OFFICIAL_WHATSAPP_CLOUD`, `WHATSAPP_CLOUD_*` | integração oficial desativada (padrão) |
| E-mail | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | e-mails apenas logados no console |

Veja o arquivo `.env.example` para a lista completa comentada.

## Rodando localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). A área logada fica em
`/app` (dashboard, negócios, wizard, simulador, exportações, configurações).
Sem Supabase configurado, a página `/app/login` cria uma sessão de demonstração
baseada em cookie local.

Outros comandos úteis:

```bash
npm run build   # build de produção (Turbopack)
npm run start   # sobe o build de produção
npm run lint    # ESLint
```

## Testes

Testes automatizados com [Vitest](https://vitest.dev), cobrindo o webhook da
Hotmart, os geradores de IA (mock), os adapters de canal (incluindo o bloqueio
de automações não oficiais) e as validações de formulário:

```bash
npm test          # roda a suíte uma vez (vitest run)
npm run test:watch  # modo watch
```

Os arquivos de teste ficam em `__tests__/`:

- `hotmart-webhook.test.ts` — validação de HOTTOK, parsing do payload e
  ativação/suspensão de workspace;
- `ai-generators.test.ts` — geradores de conteúdo com `MockAIProvider` e o
  negócio de exemplo `EXAMPLE_BEAUTY_SALON`;
- `channel-adapters.test.ts` — `ManualExportAdapter`, `SimulatorAdapter`,
  bloqueio de adapters proibidos e a feature flag da WhatsApp Cloud API;
- `validations.test.ts` — schemas Zod do wizard e da captura de leads;
- `export-and-compliance.test.ts` — exportação em Markdown/PDF e detecção de
  termos de automação não oficial em nomes de canais.

## Deploy na Vercel

1. Importe o repositório em [vercel.com/new](https://vercel.com/new).
2. Configure as variáveis de ambiente de produção (mesmas do `.env.example`).
3. Aponte o build command padrão do Next.js (`next build`) e o output padrão —
   nenhuma configuração extra é necessária.
4. Após o deploy, atualize `NEXT_PUBLIC_SITE_URL` com o domínio final (usado no
   `sitemap.xml`, `robots.txt` e metadados de SEO).
5. Configure a URL do webhook da Hotmart (veja abaixo) apontando para
   `https://SEU-DOMINIO/api/webhooks/hotmart`.

## Estrutura de pastas

```
app/
  (marketing)/          → landing page pública
  (legal)/               → disclaimer, termos, privacidade
  app/                    → área logada (dashboard, negócios, wizard, admin…)
  api/
    ai/generate/          → geração de ativos com IA
    simulate/              → simulador de conversa
    leads/                 → captura de leads
    diagnostic/            → diagnóstico de atendimento
    businesses/            → CRUD de negócios (mock-friendly)
    exports/markdown|pdf/  → exportação de pacotes gerados
    webhooks/hotmart/      → webhook oficial da Hotmart
  robots.ts, sitemap.ts    → SEO
components/               → componentes de UI (marketing, app, ui)
lib/
  ai/                     → providers de IA (mock/openai/anthropic/gemini) + geradores
  channels/               → adapters de canal (manual, simulador, webchat, WhatsApp Cloud API)
  hotmart/                → tipos e parser do webhook da Hotmart
  email/                  → wrapper do Resend + templates HTML
  utils/                  → exportação (Markdown/PDF) e regras de compliance
  analytics/              → tracking de eventos (mock-friendly)
  businesses/             → store em memória para o CRUD mock
  validations/            → schemas Zod (wizard, lead, negócio)
  supabase/               → clients Supabase (browser/server/service role)
types/                    → tipos compartilhados (business, database, ai, hotmart)
supabase/migrations/      → schema SQL + seed de nichos
__tests__/                → suíte Vitest
```

## Como adicionar um novo nicho

1. **Seed no banco (opcional, se usar Supabase):** adicione uma linha na tabela
   `niche_templates` (veja o `insert` no final de
   `supabase/migrations/001_initial_schema.sql`) com `niche`, `suggested_tone`
   e `compliance_alerts` específicos do segmento.
2. **Opções do wizard:** inclua o nome do nicho em `NICHE_OPTIONS`, em
   `types/business.ts`, para que apareça no seletor de segmento.
3. **Alertas de compliance específicos:** se o nicho tiver riscos particulares
   (ex.: saúde, jurídico, financeiro), documente-os em `compliance_alerts` —
   eles aparecem para o usuário durante o wizard/simulador.
4. **Sem Supabase (modo demo):** os templates de nicho também podem ser
   gerenciados via `/app/admin/templates`, persistidos em `localStorage`
   através de `lib/local-store.ts`.

## Webhook da Hotmart

Endpoint: `POST /api/webhooks/hotmart`.

1. No painel da Hotmart, vá em **Ferramentas → Webhook** e cadastre a URL
   `https://SEU-DOMINIO/api/webhooks/hotmart`.
2. Copie o **Hottok** exibido lá e defina `HOTMART_HOTTOK` no ambiente de
   produção. O token é validado tanto pelo header `X-Hotmart-Hottok` quanto
   pelo campo `hottok` do corpo (compatibilidade com versões antigas).
3. Eventos tratados:
   - `PURCHASE_APPROVED` / `PURCHASE_COMPLETE` → **ativa** o workspace do
     comprador;
   - `PURCHASE_REFUNDED`, `PURCHASE_CANCELED`/`PURCHASE_CANCELLED`,
     `PURCHASE_CHARGEBACK`, `PURCHASE_EXPIRED`, `PURCHASE_PROTEST` →
     **suspende** o workspace;
   - demais eventos são apenas registrados (sem ação de workspace).
4. Toda chamada é registrada (Supabase, se configurado, com fallback para um
   log em memória) e pode ser conferida na demo em `/app/admin/hotmart-events`.
5. Hottok inválido → resposta `401`. Processamento com sucesso → `200`.

A lógica pura fica em `lib/hotmart/webhook-parser.ts`
(`validateHottok`, `parseHotmartPayload`, `handleHotmartEvent`), testável sem
depender do runtime do Next.js — veja `__tests__/hotmart-webhook.test.ts`.

## Trocando o provedor de IA

Defina `AI_PROVIDER` como `mock` (padrão), `openai`, `anthropic` ou `gemini` e
preencha a respectiva chave de API (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY` ou
`GEMINI_API_KEY`). Cada provider implementa a interface `AIProvider`
(`lib/ai/provider.ts`) e, se a chave não estiver configurada, cai
automaticamente de volta para o `MockAIProvider` — o app nunca quebra por
falta de credencial de IA.

Todos os provedores recebem o mesmo bloco de `GUARDRAILS` (regras absolutas:
nunca inventar preços/prazos, nunca prometer resultado garantido, nunca pedir
dados sensíveis, sempre oferecer atendimento humano etc.), injetado no prompt
de sistema em `lib/ai/generators/index.ts`.

## WhatsApp Cloud API (feature flag)

A integração oficial (`lib/channels/whatsapp-cloud.ts`) fica **desativada por
padrão** (`ENABLE_OFFICIAL_WHATSAPP_CLOUD=false`). Enquanto desativada, todas
as chamadas lançam `FeatureDisabledError` com uma mensagem explicando como
ativar. Para habilitar em produção:

1. Configure um app WhatsApp Business Platform na Meta e obtenha token de
   acesso, ID do número e ID da conta.
2. Defina `ENABLE_OFFICIAL_WHATSAPP_CLOUD=true` e preencha
   `WHATSAPP_CLOUD_ACCESS_TOKEN`, `WHATSAPP_CLOUD_PHONE_NUMBER_ID`,
   `WHATSAPP_CLOUD_BUSINESS_ACCOUNT_ID` e `WHATSAPP_CLOUD_VERIFY_TOKEN`.
3. Implemente o envio real em `sendMessage`/`sendTemplate` respeitando a
   janela de 24h e templates aprovados pela Meta.

Sem a flag, use `ManualExportAdapter` (cola manual no WhatsApp Business App)
ou `SimulatorAdapter` (treino interno) — ambos oficiais e sem risco de
bloqueio de número.

## Regras de compliance

O BalcãoIA Studio **não implementa e não permite** integrações via bibliotecas
não oficiais de WhatsApp. Isso é reforçado em código, não apenas em
documentação:

- `ForbiddenChannelType` (`lib/channels/adapter.ts`) lista os tipos proibidos:
  `openwa`, `baileys`, `venom`, `evolution_api`, `wa_automate`,
  `qrcode_scraping`.
- `createForbiddenAdapter(type)` sempre lança `ComplianceError` — não existe
  implementação funcional para esses tipos no projeto, apenas o bloqueio.
- `lib/utils/compliance.ts` expõe `detectForbiddenChannelTerm` e
  `assertChannelNameIsCompliant` para impedir que integrações/canais
  criados pelo usuário usem nomes que sugiram esse tipo de automação (ex.:
  "Bot via Baileys", "QR Code Scraper").
- Nenhuma dependência de scraping/QR Code (OpenWA, Baileys, Venom, Evolution
  API, WA-Automate) está listada em `package.json` — e não deve ser
  adicionada.

Canais permitidos: `ManualExportAdapter`, `SimulatorAdapter`, `WebchatAdapter`
e, quando explicitamente habilitado, `WhatsAppCloudApiAdapter` (API oficial da
Meta).

## Suporte

Dúvidas sobre o produto, cobrança ou acesso: responda o e-mail de boas-vindas
recebido no cadastro ou entre em contato pelo canal de suporte informado na
página de checkout. Para questões técnicas do código-fonte, abra uma issue no
repositório do projeto.

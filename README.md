> **Live demo:** https://balcaoia-studio.vercel.app

# BalcÃ£oIA Studio

> ## âš ï¸ Aviso importante (leia antes de usar)
>
> O **BalcÃ£oIA Studio** Ã© uma ferramenta **educacional e de produtividade** para ajudar
> negÃ³cios locais a organizar catÃ¡logo, base de conhecimento e scripts de atendimento
> com apoio de InteligÃªncia Artificial.
>
> - **NÃ£o garantimos** resultados de vendas, faturamento, aprovaÃ§Ã£o ou qualquer
>   resultado financeiro.
> - **NÃ£o fazemos** diagnÃ³sticos mÃ©dicos, veterinÃ¡rios, jurÃ­dicos ou financeiros â€”
>   todo o conteÃºdo gerado por IA deve ser **revisado por um humano** antes de ser
>   usado com clientes reais.
> - **NÃ£o somos afiliados** a WhatsApp, Meta, Google, OpenAI, Anthropic, Hotmart ou
>   quaisquer outras marcas eventualmente citadas.
> - Este produto **nÃ£o usa e nÃ£o suporta** automaÃ§Ãµes nÃ£o oficiais de WhatsApp
>   (OpenWA, Baileys, Venom, Evolution API, WA-Automate, scraping via QR Code).
>   Veja [Regras de compliance](#regras-de-compliance) abaixo.
>
> Consulte tambÃ©m `/disclaimer`, `/termos-de-uso` e `/politica-de-privacidade` no app.

---

## SumÃ¡rio

- [Stack](#stack)
- [InstalaÃ§Ã£o](#instalaÃ§Ã£o)
- [ConfiguraÃ§Ã£o do Supabase](#configuraÃ§Ã£o-do-supabase)
- [VariÃ¡veis de ambiente](#variÃ¡veis-de-ambiente)
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
  (dados em `localStorage` no navegador / memÃ³ria no servidor)
- **ValidaÃ§Ã£o:** Zod
- **IA:** provedor plugÃ¡vel â€” Mock (padrÃ£o, sem custo), OpenAI, Anthropic ou Gemini
- **E-mail transacional:** Resend (com modo "log" quando nÃ£o configurado)
- **ExportaÃ§Ã£o:** Markdown nativo e PDF via `jsPDF`
- **Testes:** Vitest

## InstalaÃ§Ã£o

PrÃ©-requisitos: Node.js 20+ e npm.

```bash
npm install
```

## ConfiguraÃ§Ã£o do Supabase

O projeto funciona **sem Supabase configurado** (modo demo, com dados salvos no
navegador). Para persistÃªncia real, siga estes passos:

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No SQL Editor do projeto, execute o conteÃºdo de
   `supabase/migrations/001_initial_schema.sql` (cria tabelas, RLS e nichos
   iniciais).
3. Copie a **Project URL**, a **anon key** e a **service_role key** do painel
   (Settings â†’ API) para o seu `.env.local` (veja abaixo).
4. Configure a autenticaÃ§Ã£o (e-mail/senha ou o provedor de sua preferÃªncia) em
   Authentication â†’ Providers.

Sem essas variÃ¡veis, as rotas de API (`/api/leads`, `/api/diagnostic`,
`/api/businesses`, `/api/webhooks/hotmart`, etc.) operam em modo **mock/local**,
retornando `{ mode: "local" }` ou `{ mode: "mock" }` e continuam funcionais para
demonstraÃ§Ã£o e desenvolvimento.

## VariÃ¡veis de ambiente

Copie `.env.example` para `.env.local` e preencha o que for usar:

```bash
cp .env.example .env.local
```

Nenhuma variÃ¡vel Ã© obrigatÃ³ria para rodar em modo demo. Principais grupos:

| Grupo | VariÃ¡veis | Efeito quando ausente |
| --- | --- | --- |
| Site | `NEXT_PUBLIC_SITE_URL` | usa `http://localhost:3000` |
| Supabase | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | modo demo (localStorage/memÃ³ria) |
| IA | `AI_PROVIDER`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `*_MODEL` | usa `MockAIProvider` (determinÃ­stico, sem custo) |
| Hotmart | `HOTMART_HOTTOK` | webhook aceita qualquer chamada (uso sÃ³ para teste local) |
| WhatsApp Cloud API | `ENABLE_OFFICIAL_WHATSAPP_CLOUD`, `WHATSAPP_CLOUD_*` | integraÃ§Ã£o oficial desativada (padrÃ£o) |
| E-mail | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | e-mails apenas logados no console |

Veja o arquivo `.env.example` para a lista completa comentada.

## Rodando localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). A Ã¡rea logada fica em
`/app` (dashboard, negÃ³cios, wizard, simulador, exportaÃ§Ãµes, configuraÃ§Ãµes).
Sem Supabase configurado, a pÃ¡gina `/app/login` cria uma sessÃ£o de demonstraÃ§Ã£o
baseada em cookie local.

Outros comandos Ãºteis:

```bash
npm run build   # build de produÃ§Ã£o (Turbopack)
npm run start   # sobe o build de produÃ§Ã£o
npm run lint    # ESLint
```

## Testes

Testes automatizados com [Vitest](https://vitest.dev), cobrindo o webhook da
Hotmart, os geradores de IA (mock), os adapters de canal (incluindo o bloqueio
de automaÃ§Ãµes nÃ£o oficiais) e as validaÃ§Ãµes de formulÃ¡rio:

```bash
npm test          # roda a suÃ­te uma vez (vitest run)
npm run test:watch  # modo watch
```

Os arquivos de teste ficam em `__tests__/`:

- `hotmart-webhook.test.ts` â€” validaÃ§Ã£o de HOTTOK, parsing do payload e
  ativaÃ§Ã£o/suspensÃ£o de workspace;
- `ai-generators.test.ts` â€” geradores de conteÃºdo com `MockAIProvider` e o
  negÃ³cio de exemplo `EXAMPLE_BEAUTY_SALON`;
- `channel-adapters.test.ts` â€” `ManualExportAdapter`, `SimulatorAdapter`,
  bloqueio de adapters proibidos e a feature flag da WhatsApp Cloud API;
- `validations.test.ts` â€” schemas Zod do wizard e da captura de leads;
- `export-and-compliance.test.ts` â€” exportaÃ§Ã£o em Markdown/PDF e detecÃ§Ã£o de
  termos de automaÃ§Ã£o nÃ£o oficial em nomes de canais.

## Deploy na Vercel

1. Importe o repositÃ³rio em [vercel.com/new](https://vercel.com/new).
2. Configure as variÃ¡veis de ambiente de produÃ§Ã£o (mesmas do `.env.example`).
3. Aponte o build command padrÃ£o do Next.js (`next build`) e o output padrÃ£o â€”
   nenhuma configuraÃ§Ã£o extra Ã© necessÃ¡ria.
4. ApÃ³s o deploy, atualize `NEXT_PUBLIC_SITE_URL` com o domÃ­nio final (usado no
   `sitemap.xml`, `robots.txt` e metadados de SEO).
5. Configure a URL do webhook da Hotmart (veja abaixo) apontando para
   `https://SEU-DOMINIO/api/webhooks/hotmart`.

## Estrutura de pastas

```
app/
  (marketing)/          â†’ landing page pÃºblica
  (legal)/               â†’ disclaimer, termos, privacidade
  app/                    â†’ Ã¡rea logada (dashboard, negÃ³cios, wizard, adminâ€¦)
  api/
    ai/generate/          â†’ geraÃ§Ã£o de ativos com IA
    simulate/              â†’ simulador de conversa
    leads/                 â†’ captura de leads
    diagnostic/            â†’ diagnÃ³stico de atendimento
    businesses/            â†’ CRUD de negÃ³cios (mock-friendly)
    exports/markdown|pdf/  â†’ exportaÃ§Ã£o de pacotes gerados
    webhooks/hotmart/      â†’ webhook oficial da Hotmart
  robots.ts, sitemap.ts    â†’ SEO
components/               â†’ componentes de UI (marketing, app, ui)
lib/
  ai/                     â†’ providers de IA (mock/openai/anthropic/gemini) + geradores
  channels/               â†’ adapters de canal (manual, simulador, webchat, WhatsApp Cloud API)
  hotmart/                â†’ tipos e parser do webhook da Hotmart
  email/                  â†’ wrapper do Resend + templates HTML
  utils/                  â†’ exportaÃ§Ã£o (Markdown/PDF) e regras de compliance
  analytics/              â†’ tracking de eventos (mock-friendly)
  businesses/             â†’ store em memÃ³ria para o CRUD mock
  validations/            â†’ schemas Zod (wizard, lead, negÃ³cio)
  supabase/               â†’ clients Supabase (browser/server/service role)
types/                    â†’ tipos compartilhados (business, database, ai, hotmart)
supabase/migrations/      â†’ schema SQL + seed de nichos
__tests__/                â†’ suÃ­te Vitest
```

## Como adicionar um novo nicho

1. **Seed no banco (opcional, se usar Supabase):** adicione uma linha na tabela
   `niche_templates` (veja o `insert` no final de
   `supabase/migrations/001_initial_schema.sql`) com `niche`, `suggested_tone`
   e `compliance_alerts` especÃ­ficos do segmento.
2. **OpÃ§Ãµes do wizard:** inclua o nome do nicho em `NICHE_OPTIONS`, em
   `types/business.ts`, para que apareÃ§a no seletor de segmento.
3. **Alertas de compliance especÃ­ficos:** se o nicho tiver riscos particulares
   (ex.: saÃºde, jurÃ­dico, financeiro), documente-os em `compliance_alerts` â€”
   eles aparecem para o usuÃ¡rio durante o wizard/simulador.
4. **Sem Supabase (modo demo):** os templates de nicho tambÃ©m podem ser
   gerenciados via `/app/admin/templates`, persistidos em `localStorage`
   atravÃ©s de `lib/local-store.ts`.

## Webhook da Hotmart

Endpoint: `POST /api/webhooks/hotmart`.

1. No painel da Hotmart, vÃ¡ em **Ferramentas â†’ Webhook** e cadastre a URL
   `https://SEU-DOMINIO/api/webhooks/hotmart`.
2. Copie o **Hottok** exibido lÃ¡ e defina `HOTMART_HOTTOK` no ambiente de
   produÃ§Ã£o. O token Ã© validado tanto pelo header `X-Hotmart-Hottok` quanto
   pelo campo `hottok` do corpo (compatibilidade com versÃµes antigas).
3. Eventos tratados:
   - `PURCHASE_APPROVED` / `PURCHASE_COMPLETE` â†’ **ativa** o workspace do
     comprador;
   - `PURCHASE_REFUNDED`, `PURCHASE_CANCELED`/`PURCHASE_CANCELLED`,
     `PURCHASE_CHARGEBACK`, `PURCHASE_EXPIRED`, `PURCHASE_PROTEST` â†’
     **suspende** o workspace;
   - demais eventos sÃ£o apenas registrados (sem aÃ§Ã£o de workspace).
4. Toda chamada Ã© registrada (Supabase, se configurado, com fallback para um
   log em memÃ³ria) e pode ser conferida na demo em `/app/admin/hotmart-events`.
5. Hottok invÃ¡lido â†’ resposta `401`. Processamento com sucesso â†’ `200`.

A lÃ³gica pura fica em `lib/hotmart/webhook-parser.ts`
(`validateHottok`, `parseHotmartPayload`, `handleHotmartEvent`), testÃ¡vel sem
depender do runtime do Next.js â€” veja `__tests__/hotmart-webhook.test.ts`.

## Trocando o provedor de IA

Defina `AI_PROVIDER` como `mock` (padrÃ£o), `openai`, `anthropic` ou `gemini` e
preencha a respectiva chave de API (`OPENAI_API_KEY`, `ANTHROPIC_API_KEY` ou
`GEMINI_API_KEY`). Cada provider implementa a interface `AIProvider`
(`lib/ai/provider.ts`) e, se a chave nÃ£o estiver configurada, cai
automaticamente de volta para o `MockAIProvider` â€” o app nunca quebra por
falta de credencial de IA.

Todos os provedores recebem o mesmo bloco de `GUARDRAILS` (regras absolutas:
nunca inventar preÃ§os/prazos, nunca prometer resultado garantido, nunca pedir
dados sensÃ­veis, sempre oferecer atendimento humano etc.), injetado no prompt
de sistema em `lib/ai/generators/index.ts`.

## WhatsApp Cloud API (feature flag)

A integraÃ§Ã£o oficial (`lib/channels/whatsapp-cloud.ts`) fica **desativada por
padrÃ£o** (`ENABLE_OFFICIAL_WHATSAPP_CLOUD=false`). Enquanto desativada, todas
as chamadas lanÃ§am `FeatureDisabledError` com uma mensagem explicando como
ativar. Para habilitar em produÃ§Ã£o:

1. Configure um app WhatsApp Business Platform na Meta e obtenha token de
   acesso, ID do nÃºmero e ID da conta.
2. Defina `ENABLE_OFFICIAL_WHATSAPP_CLOUD=true` e preencha
   `WHATSAPP_CLOUD_ACCESS_TOKEN`, `WHATSAPP_CLOUD_PHONE_NUMBER_ID`,
   `WHATSAPP_CLOUD_BUSINESS_ACCOUNT_ID` e `WHATSAPP_CLOUD_VERIFY_TOKEN`.
3. Implemente o envio real em `sendMessage`/`sendTemplate` respeitando a
   janela de 24h e templates aprovados pela Meta.

Sem a flag, use `ManualExportAdapter` (cola manual no WhatsApp Business App)
ou `SimulatorAdapter` (treino interno) â€” ambos oficiais e sem risco de
bloqueio de nÃºmero.

## Regras de compliance

O BalcÃ£oIA Studio **nÃ£o implementa e nÃ£o permite** integraÃ§Ãµes via bibliotecas
nÃ£o oficiais de WhatsApp. Isso Ã© reforÃ§ado em cÃ³digo, nÃ£o apenas em
documentaÃ§Ã£o:

- `ForbiddenChannelType` (`lib/channels/adapter.ts`) lista os tipos proibidos:
  `openwa`, `baileys`, `venom`, `evolution_api`, `wa_automate`,
  `qrcode_scraping`.
- `createForbiddenAdapter(type)` sempre lanÃ§a `ComplianceError` â€” nÃ£o existe
  implementaÃ§Ã£o funcional para esses tipos no projeto, apenas o bloqueio.
- `lib/utils/compliance.ts` expÃµe `detectForbiddenChannelTerm` e
  `assertChannelNameIsCompliant` para impedir que integraÃ§Ãµes/canais
  criados pelo usuÃ¡rio usem nomes que sugiram esse tipo de automaÃ§Ã£o (ex.:
  "Bot via Baileys", "QR Code Scraper").
- Nenhuma dependÃªncia de scraping/QR Code (OpenWA, Baileys, Venom, Evolution
  API, WA-Automate) estÃ¡ listada em `package.json` â€” e nÃ£o deve ser
  adicionada.

Canais permitidos: `ManualExportAdapter`, `SimulatorAdapter`, `WebchatAdapter`
e, quando explicitamente habilitado, `WhatsAppCloudApiAdapter` (API oficial da
Meta).

## Suporte

DÃºvidas sobre o produto, cobranÃ§a ou acesso: responda o e-mail de boas-vindas
recebido no cadastro ou entre em contato pelo canal de suporte informado na
pÃ¡gina de checkout. Para questÃµes tÃ©cnicas do cÃ³digo-fonte, abra uma issue no
repositÃ³rio do projeto.

---

## Live demo

**Try it in the browser (no clone):** see badge / homepage above, or the [Labs hub](https://felipeofdev-ai.github.io/labs/).

## Constellation

| Project | Demo |
|---------|------|
| [CardOpsAI](https://github.com/felipeofdev-ai/CardOpsAI) | [lab](https://felipeofdev-ai.github.io/labs/cardopsai/) |
| [BridgeTrace-AI](https://github.com/felipeofdev-ai/BridgeTrace-AI) | [lab](https://felipeofdev-ai.github.io/labs/bridgetrace/) |
| [Meridian](https://github.com/felipeofdev-ai/Meridian) | [lab](https://felipeofdev-ai.github.io/labs/meridian/) |
| [TrustHire](https://github.com/felipeofdev-ai/trusthire) | [lab](https://felipeofdev-ai.github.io/labs/trusthire/) |
| [secure-ship-kit](https://github.com/felipeofdev-ai/secure-ship-kit) | [lab](https://felipeofdev-ai.github.io/labs/secure-ship-kit/) |
| [agentic-rag-cite](https://github.com/felipeofdev-ai/agentic-rag-cite) | [lab](https://felipeofdev-ai.github.io/labs/agentic-rag-cite/) |
| [hitl-langgraph-kit](https://github.com/felipeofdev-ai/hitl-langgraph-kit) | [lab](https://felipeofdev-ai.github.io/labs/hitl-langgraph-kit/) |
| [forge-mcp-server](https://github.com/felipeofdev-ai/forge-mcp-server) | [lab](https://felipeofdev-ai.github.io/labs/forge-mcp-server/) |
| [agent-eval-harness](https://github.com/felipeofdev-ai/agent-eval-harness) | [lab](https://felipeofdev-ai.github.io/labs/agent-eval-harness/) |
| [lgpd-checklist-agent](https://github.com/felipeofdev-ai/lgpd-checklist-agent) | [lab](https://felipeofdev-ai.github.io/labs/lgpd-checklist-agent/) |
| [hiring-packet](https://github.com/felipeofdev-ai/hiring-packet) | [lab](https://felipeofdev-ai.github.io/labs/hiring-packet/) |
| [philo-ai-os](https://github.com/felipeofdev-ai/philo-ai-os) | [lab](https://felipeofdev-ai.github.io/labs/philo-ai-os/) |
| [balcaoia-local](https://github.com/felipeofdev-ai/balcaoia-local) | [studio](https://balcaoia-studio.vercel.app) |

Portfolio: [felipeofdev-ai.github.io](https://felipeofdev-ai.github.io/) · Author: Felipe Fernandes · `felipe.of.dev@gmail.com`

> If this helped you, **star this repo** — organic only. No bots, no paid stars.
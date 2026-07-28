# VOID-9 — Integração Hotmart (Studio)

Pacote de integração Hotmart para o **BalcãoIA Studio** (Next.js App Router + Vercel).

## O que está pronto

| Camada | Caminho | Função |
|--------|---------|--------|
| OAuth2 + HTTP | `void-9/lib/token-manager.js`, `hotmart-client.js` + `lib/hotmart/client.ts` | Token cache, retry 401/5xx |
| Webhook prod | `POST /api/webhooks/hotmart` | HOTTOK timing-safe, rate limit, libera/revoga acesso |
| Alias webhook | `POST /api/webhook` | Mesmo handler |
| Admin API | `/api/hotmart/product\|checkout\|affiliate\|reports` | Header `x-void9-secret` |
| Managers | `void-9/api-integration/*` | Produto, checkout, afiliados, reports, e-mail |

## Honestidade da API Hotmart

- **Leitura de vendas** (`sales/history`, `sales/summary`) via Developers API — funcional com `CLIENT_ID` / `CLIENT_SECRET`.
- **Criar produto, order bump, upsell, cupom, comissão** — na prática no **painel Hotmart**. Os managers/rotas devolvem `PANEL_REQUIRED` + template (não inventamos endpoints de escrita).

## Variáveis de ambiente

Copie `void-9/.env.local.example` para a raiz `.env.local` (já gitignored).

Obrigatórias para API:

```
HOTMART_CLIENT_ID=
HOTMART_CLIENT_SECRET=
```

Obrigatórias para webhook em produção:

```
HOTMART_HOTTOK=   # ou HOTTOK=
```

Proteção das rotas admin:

```
APP_SECRET=       # ou HOTMART_API_SECRET=
```

Checkout público:

```
NEXT_PUBLIC_HOTMART_CHECKOUT_URL=https://pay.hotmart.com/XXXX
HOTMART_PRODUCT_ID=
```

## Como obter o HOTTOK

1. https://app.hotmart.com/tools/webhook  
2. Criar webhook `void9-webhook-prod`  
3. URL (escolha uma):
   - `https://balcaoia-studio.vercel.app/api/webhooks/hotmart`
   - `https://balcaoialocal.com.br/api/webhooks/hotmart` (após DNS Valid)
   - Alias: `.../api/webhook`
4. Versão **2.0.0**, eventos de compra/assinatura  
5. Copiar HOTTOK → Vercel + `.env.local` como `HOTMART_HOTTOK`

## Testar webhook local (ngrok)

```bash
npm run dev
ngrok http 3000
# URL pública: https://xxxx.ngrok.io/api/webhooks/hotmart
```

Envie um POST de teste:

```bash
curl -X POST http://localhost:3000/api/webhooks/hotmart \
  -H "Content-Type: application/json" \
  -H "x-hotmart-hottok: SEU_HOTTOK" \
  -d "{\"event\":\"PURCHASE_APPROVED\",\"data\":{\"buyer\":{\"email\":\"a@b.com\",\"name\":\"Teste\"},\"purchase\":{\"transaction\":\"HPTEST1\"},\"product\":{\"id\":1,\"name\":\"FOCO 14\"}}}"
```

## Endpoints admin (exemplos)

Header em todas: `x-void9-secret: <APP_SECRET>`

```bash
# Relatório
curl "https://SEU_DOMINIO/api/hotmart/reports?type=summary&days=30" \
  -H "x-void9-secret: $APP_SECRET"

# Checkout link (env)
curl "https://SEU_DOMINIO/api/hotmart/checkout" \
  -H "x-void9-secret: $APP_SECRET"

# Token CLI (void-9)
cd void-9/api-integration
node --env-file=../../.env.local hotmart-client.mjs token
node --env-file=../../.env.local hotmart-client.mjs sales
```

## Deploy Vercel

1. Variáveis Sensitive: `HOTMART_CLIENT_ID`, `HOTMART_CLIENT_SECRET`, `HOTMART_HOTTOK`, `APP_SECRET`  
2. Push em `main` (Git connected)  
3. Configurar webhook no painel apontando para a URL de produção  
4. Ver eventos em `/app/admin/hotmart-events`

## Troubleshooting

| Sintoma | Causa / fix |
|---------|-------------|
| `HOTTOK inválido` | Header `x-hotmart-hottok` ≠ `HOTMART_HOTTOK` na Vercel |
| OAuth 401 | Rotacione Client Secret; confira Basic/ID |
| Reports 502 | Escopo da credencial sem Payments; teste `sales` no CLI |
| `PANEL_REQUIRED` | Esperado — ação só no painel |
| Rate limit 429 | Muitos POSTs do mesmo IP |

## Estrutura

```
void-9/
├── lib/                 logger, token-manager, hotmart-client, webhook-validator
├── middleware/          webhook-security
├── api-integration/     managers + CLI hotmart-client.mjs
├── app/api/             espelhos documentais (rotas reais no Next raiz)
├── .env.local.example
└── README.md            ← este arquivo
```

Rotas Next (produção):

```
app/api/webhook/route.ts
app/api/webhooks/hotmart/route.ts
app/api/hotmart/{product,checkout,affiliate,reports}/route.ts
lib/hotmart/{client,admin-guard,webhook-parser}.ts
```

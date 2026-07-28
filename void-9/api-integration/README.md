# API Integration — Hotmart CLI

```bash
# a partir de balcaoia-studio/
node --env-file=.env.local void-9/api-integration/hotmart-client.mjs token
node --env-file=.env.local void-9/api-integration/hotmart-client.mjs sales
node --env-file=.env.local void-9/api-integration/hotmart-client.mjs template
```

Managers (ESM):

- `hotmart-auth.js` — OAuth
- `product-manager.js` — templates + leitura
- `checkout-manager.js` — templates + link env
- `affiliate-manager.js` — sales + templates
- `webhook-handler.js` — roteamento de eventos
- `email-automation.js` — fila de e-mails
- `reports-manager.js` — sales/summary reais

Webhook produção Studio: `/api/webhooks/hotmart` (alias `/api/webhook`).

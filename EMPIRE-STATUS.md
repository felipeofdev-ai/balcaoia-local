# VOID-9 SUPREME — Status

**Atualizado:** 2026-07-28

## Integração Hotmart (código)

- Webhook prod: `/api/webhooks/hotmart` + alias `/api/webhook`
- Admin API: `/api/hotmart/{product,checkout,affiliate,reports}` (header `x-void9-secret`)
- Lib: `lib/hotmart/client.ts` (OAuth + sales) · `void-9/` managers
- HOTTOK timing-safe · docs em `void-9/README.md`

**Ainda manual:** criar produto no painel, colar checkout URL, gerar HOTTOK, `APP_SECRET` na Vercel.

## Portfólio (15 produtos · repos privados)

| # | Repo | Tier |
|---|------|------|
| 1 | [foco-14](https://github.com/felipeofdev-ai/foco-14) | Entrada |
| 2 | [rotina-clareza-freelancer](https://github.com/felipeofdev-ai/rotina-clareza-freelancer) | Entrada |
| 3–15 | checklist, desafio, whatsapp, guia, cursos, bundle, mentoria, cert, mastermind… | ver GitHub |

Meta: [void9-balcaoia-portfolio](https://github.com/felipeofdev-ai/void9-balcaoia-portfolio)

## Próximos passos

1. DNS `balcaoialocal.com.br` → Valid
2. Painel Hotmart → produto + webhook HOTTOK
3. Rotacionar Client Secret (exposto em chat)
4. Aprofundar conteúdo SKU a SKU

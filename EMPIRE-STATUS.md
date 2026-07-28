# EMPIRE STATUS — BalcãoIA / VOID-9

**Atualizado:** 2026-07-28

## Infraestrutura

| Item | Status |
|------|--------|
| Webhook | ✅ online (`/api/webhook`) |
| HOTTOK | ✅ `hottok_configured: true` (domínio + Vercel) |
| APP_SECRET | ✅ |
| OAuth Hotmart | ✅ `access_token` HTTP 200 |
| Criar produto via API | ❌ **painel obrigatório** |
| Checkout URL | ❌ aguardando links do painel |

## Etapas desta operação

| Etapa | Status |
|-------|--------|
| 1 HOTTOK + deploy | ✅ |
| 2 Teste OAuth | ✅ access_token OK |
| 3 Guia 15 produtos | ✅ `docs/guia-criar-produtos-hotmart.md` |
| 4 Links reais nas páginas | ⏳ bloqueado até criar no painel |
| 5 FOCO 14 aprofundado | ✅ ~15.1k palavras + bônus + ads |
| 6 Commit/push/deploy | em andamento |

## Próximo passo humano

1. Abrir https://app.hotmart.com/products/add
2. Criar **FOCO 14** copiando de `docs/guia-criar-produtos-hotmart.md`
3. Colar o link de checkout no chat
4. Eu configuro `NEXT_PUBLIC_HOTMART_CHECKOUT_FOCO14` + redeploy

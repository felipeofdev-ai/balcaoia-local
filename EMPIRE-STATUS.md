# EMPIRE STATUS — BalcãoIA / VOID-9

**Atualizado:** 2026-07-28 (execução honesta)

## Etapa 1 — Estado verificado

| Item | Status |
|------|--------|
| Git Studio | `main` limpo / sync |
| Webhook | ✅ online |
| OAuth Hotmart | ✅ |
| APP_SECRET | ✅ Vercel |
| HOTTOK | ❌ **ausente** (não configurado — valor não fornecido) |
| Checkout URL | ❌ **ausente** |
| Logos FOCO 14 | ✅ `/public/logos/foco-14` |
| Ecossistema | ✅ `/ecossistema` |

## Etapa 2 — Vercel env

**Pausada.** Envie `HOTTOK` e `NEXT_PUBLIC_HOTMART_CHECKOUT_URL` para eu adicionar via CLI.

## Etapa 3 — FOCO 14 aprofundado

Repo privado `foco-14`:
- Ebook ~**16k palavras** (~60–80 pág. equivalentes a 200–250 wpp) + 18 módulos + 22 apêndices
- Sales page longa ~**5,9k palavras**
- VSL, headlines, 3 bônus, kit afiliados completo, 12 emails, checklist Hotmart
- *Honestidade:* densidade editorial forte; “90 páginas impressas” depende de formatação tipográfica.

## Etapas 4–6 — Studio

- Home com faixa Ecossistema → FOCO 14 / afiliados
- Product + FAQ JSON-LD nas páginas `/produtos/[slug]`
- 6 artigos longos (~5,2k palavras cada) em `content/blog/`
- Blog loader lê markdown longos

## Hotmart API create

Continua **PANEL_REQUIRED** (0 IDs reais). Cadastre FOCO 14 no painel.

## Próximo passo humano

1. Colar **HOTTOK**  
2. Criar FOCO 14 no painel → colar checkout  
3. Redeploy após env  

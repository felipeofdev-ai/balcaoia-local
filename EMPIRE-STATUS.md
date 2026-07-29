# EMPIRE STATUS — BalcãoIA / VOID-9

**Atualizado:** 2026-07-29 (operação qualidade Fortune 500)

## LOTE 1

| Item | Status |
|------|--------|
| 16 produtos Vendas ativas | ✅ |
| Checkouts reais no Studio | ✅ (`lib/config/lote1-checkouts.ts` + env) |
| Capas Fortune 500 (JPG 2x) | ✅ `hotmart-factory/assets/capas/*.jpg` (~500KB+) |
| Páginas `/produtos/[slug]` | ✅ sticky CTA + preço + aliases Hotmart |
| Blueprint PDF | ✅ |
| Preços no checkout Hotmart | ⚠️ parcial — ver abaixo |
| Cupons / order bump | ❌ pendente (CDP/VLC instável) |

## Correções de preço (painel)

| Produto | ID | Alvo | Status |
|---------|-----|------|--------|
| 30 Posts | 8210879 | R$ 12 | ⚠️ ainda precisa confirmar / criar oferta |
| Template Atendimento | 8210984 | R$ 14 | ✅ oferta criada via API (BRL:14) |
| Calculadora | 8210744 | R$ 9 | ✅ oferta criada via API (BRL:9) |

## Studio deploy

- Build: ✅ `npm run build`
- Capas preview: `hotmart-factory/logs/preview-capas/{a1,b1,j1}.html`

## Bloqueio técnico

Shell Hotmart (`app.hotmart.com`) está em loading infinito no conteúdo (iframe VLC). Reiniciar Chrome com `--remote-debugging-port=9222` para: subir capas no painel, cupons, order bumps e fechar oferta R$12 do 30 Posts.

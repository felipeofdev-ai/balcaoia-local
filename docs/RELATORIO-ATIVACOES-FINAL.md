# Relatório de Ativações de Conversão
Data: 2026-07-29

## Resumo

| Item | Status |
|------|--------|
| Cupons via API | **113 criados** / 0 erros (`logs/cupons-criados.json`) |
| Páginas `/upsell/[slug]` | ✅ 18 rotas (sem timer falso) |
| Obrigado com próximo passo | ✅ Tier Zero + ideias |
| Order Bump / Funil CDP | ⚠️ requer painel (Checkout Builder + Funil) |
| Recuperador | ⚠️ product-select manual (`hot-select`) |
| Hotmart Recomenda | ⚠️ verificar no painel |

## Cupons por tier

**Micros:** MICRO50, AFILIADO70, BEMVINDO, RESGATE, JULHO2026, MADRUGADA  
**Core:** LANCAMENTO50, AFILIADO30, ESPECIAL40, RESGATE25, PRIMEIRACOMPRA, VIP20, JULHO2026, FIMDESEMANA  
**Extras:** FOCO30, PRODUTIVIDADE35, CHATGPT30, INSTAGRAM35, GOOGLE30

## Mapa Order Bump / Upsell (produto real)

Ver `logs/funis-resultado.json` após CDP, ou `balcaoia-studio/lib/funis-data.ts`.

## Manual no Hotmart (P0)

1. Checkout Builder → Order Bump → produto sugerido no mapa
2. Funil de Vendas → upsell/downsell com ofertas existentes
3. Recuperador → selecionar produto no dropdown e ativar
4. Testar 1 cupom no checkout (ex.: `JULHO2026`)
5. Hotlinks preço: 30-posts R$12 · template R$14 · calculadora R$9

## Compliance

- Sem countdown de escassez falsa nas páginas de upsell
- Sem depoimentos inventados
- Upsell usa preço de referência do catálogo + checkout real

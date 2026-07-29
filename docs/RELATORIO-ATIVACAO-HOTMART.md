# Relatório de Ativação — Hotmart
Data: 28–29/07/2026

## Fase 1 — Pesquisa
Documento: `research/hotmart-features-completo-julho-2026.md`  
(também em `balcaoia-studio/docs/`)

## Fase 2 — Auditoria CDP
Fonte principal: **Ferramentas → Ver todas** (`tools/list/producer`, 5611 chars).

### Inventário real na conta (disponível)
- Order Bump · Aparência da página de pagamento · Funil de Vendas
- Recuperador automático / híbrido / assinaturas · Automações checkout
- Recomenda · Agente de vendas (IA) · Exit pop-up
- Pixel · Webhook · Criador de Páginas · Hotmart Club
- Programa de Afiliados · Material para divulgação · DRM Social
- Parcelado Hotmart · WhatsApp (Send) · Coproduções · eNotas …

### URLs descobertas
| Feature | URL |
|---------|-----|
| Recuperador (selecionar produto) | `/tools/product-select/automatic_sales_retriever` |
| Checkout Builder | `/products/manage/tools/checkout/custom/new` |
| Funil | `/tools/sales/funnel` |
| Webhook | `/tools/webhook` |
| Pixel | `/tools/pixel` |

Screenshots/text dumps: `logs/auditoria/`

## Fase 3 — Ativação automática
| Ação | Resultado |
|------|-----------|
| Inventário ferramentas | ✅ |
| Recuperador global (switches) | ⚠️ UI pede **produto** (product-select) — ativar oferta a oferta |
| Order Bump | ⚠️ só via Checkout Builder visual |
| Funil | ⚠️ página aberta; configurar etapas manualmente |
| Afiliados/cupons em massa | ⚠️ CDP instável em `/products/manage/{id}` nesta sessão |
| Cor checkout | Usar **#0F3D4A** (não roxo genérico) |

## Fase 4 — Checklist
`logs/CHECKLIST-BLUEPRINT-FINAL.md` + `balcaoia-studio/docs/CHECKLIST-BLUEPRINT-FINAL.md`

## P0 manual (ainda)
1. Hotlinks: 30 Posts R$12 · Template R$14 · Calculadora R$9  
2. Checkout Builder: Order Bump por trilha  
3. Recuperador por oferta  
4. Funil micro → flagship  
5. Pixel Meta/GA4 + validar webhook Studio  

## Compliance
Sem depoimento inventado · sem promessa de renda · WhatsApp ético apenas.

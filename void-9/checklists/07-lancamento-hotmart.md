# Checklist final — Lançamento FOCO 14 na Hotmart

## A. Conta
- [ ] Conta Hotmart verificada (docs + banco)
- [ ] 2FA ativado

## B. Produto principal
- [ ] Criar produto digital: **FOCO 14 — Rotina de Alta Clareza…**
- [ ] Preço **R$ 67**
- [ ] Garantia **7 dias**
- [ ] Descrição: colar de `docs/02-oferta.md` / `copy/01-pagina-vendas.md`
- [ ] Entrega: arquivos de `product/` (PDF gerado a partir do MD) **ou** link área membros
- [ ] Página de vendas: subir `landing/index.html` (Hotmart page / domínio / Vercel)
- [ ] Substituir `https://pay.hotmart.com/SEU_CHECKOUT` na landing

## C. Order bump
- [ ] Pack Interrupção Zero — R$ 27
- [ ] Arquivo: `product/order-bump-interrupcao-zero.md`

## D. Afiliados
- [ ] Ativar afiliação (sugestão 50%)
- [ ] Cookie 60–90 dias
- [ ] Kit: headlines + e-mails (pastas `copy/` e `emails/`)
- [ ] Regras: sem promessa de renda; oferta fiel

## E. Webhook → BalcãoIA Studio
- [ ] URL: `https://balcaoia-studio.vercel.app/api/webhooks/hotmart`
- [ ] HOTTOK na Vercel (`HOTMART_HOTTOK`)
- [ ] Eventos de compra/reembolso ativos
- [ ] Teste: compra sandbox / evento em `/app/admin/hotmart-events`

## F. Funil
- [ ] Checkout principal
- [ ] Bump
- [ ] Página obrigado → upsell Método 7D (`/vendas`)
- [ ] Downsell Express R$ 27 (opcional)

## G. E-mails
- [ ] Importar sequência `emails/sequencia-8-emails.md` (Hotmart / Resend / ESP)
- [ ] Testar links

## H. Lançamento simples (7 dias)
| Dia | Ação |
|-----|------|
| D-3 | E1 + post “dor do plantão” |
| D-1 | E2 + stories countdown |
| D0 | Abrir carrinho + E3 |
| D+1 | E4 + depoimento/processo |
| D+2 | E5 bump |
| D+3 | E6 fechamento |
| D+7 | Compradores → E8 ponte BalcãoIA |

## I. Compliance
- [ ] Remover qualquer claim de renda/resultado garantido
- [ ] Disclaimer: não é terapia
- [ ] Marcas Meta/WhatsApp só nominativas + disclaimer do site

## J. Pós-DNS
- [ ] Quando `balcaoialocal.com.br` estiver Valid, atualizar links e webhook

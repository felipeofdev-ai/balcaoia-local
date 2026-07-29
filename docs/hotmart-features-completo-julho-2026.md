# Hotmart — Features completas (julho 2026)

Pesquisa compilada em 28/07/2026 para o LOTE 1 BalcãoIA. Fontes: blog Hotmart, Central de Ajuda, campanhas oficiais.

## Mapa priorizado para conversão

| # | Feature | Onde ativar | Impacto | Status LOTE1 (alvo) |
|---|---------|-------------|---------|---------------------|
| 1 | Order Bump | Ferramentas → Aparência da Página de Pagamento (Checkout Builder) | Alto (ticket médio) | Configurar por SKU |
| 2 | Funil de Vendas (upsell/downsell/cross) | Ferramentas → Funil de Vendas | Alto | Trilha micro→flagship |
| 3 | Recuperador Automático | Precificação → Configurar recuperador / Ferramentas | Alto | Ativar em ofertas parceláveis |
| 4 | Hotmart Recomenda | Ferramentas → Recomenda (auto se ≥2 produtos) | Médio-Alto | Manter elegível + Club |
| 5 | Agente de Vendas (IA) | Ferramentas → Agente de Vendas | Alto (se liberado BR) | Verificar elegibilidade |
| 6 | Checkout Builder / Fast Buy | Aparência da Página de Pagamento | Alto | Logo, cor marca, bump |
| 7 | Pixel (Meta/GA4/Ads) | Ferramentas → Pixel de Rastreamento | Alto (mídia) | Meta CAPI + GA4 |
| 8 | Webhooks | Ferramentas → Webhook | Alto (ops) | Já apontar Studio |
| 9 | Afiliados + HotLeads + Marketplace | Produto → Programa de afiliados | Alto | 50%/70% · cookie 180d |
| 10 | Hotmart Club | Produtos → Club / área de membros | Médio (entrega + Recomenda) | Club BalcãoIA Local |
| 11 | Hotmart Pages | Marketing → Criação de páginas | Médio | Opcional vs site próprio |
| 12 | Hotmart Send | E-mail marketing | Médio | Nutrição pós-compra |
| 13 | Cupons | Produto → Cupons | Médio | LANCAMENTO50 / AFILIADO30 |
| 14 | Temperatura Marketplace | Mercado + vendas consistentes | Médio (afiliados) | 1+ venda/dia ideal |
| 15 | Blueprint | Completude do produto no painel | Alto (afiliados) | Meta ≥80% |
| 16 | Coprodução | Produto → Coproduções | Baixo agora | Só se necessário |
| 17 | Período grátis / assinatura | Ofertas recorrentes | N/A LOTE1 | eBooks à vista |
| 18 | Analytics / Relatórios | Relatórios / Minhas análises | Médio | Semanal |
| 19 | Tutor IA (Club) | Hotmart Club (se disponível) | Médio | Pós Club estável |
| 20 | Fast Buy / compra 1 clique | Checkout + Recomenda | Médio | Recompra |

---

## 1. Blueprint

Indicador de qualidade da estrutura do produto no Marketplace (página, materiais, dados). Afiliados filtram por **Blueprint > 80%**. Completar: capa, descrição longa, categoria, idioma, garantia, conteúdo, afiliados, página de vendas, materiais.

## 2. Order Bump

Oferta complementar **no checkout**, 1 clique.

- Caminho oficial: **Ferramentas → Aparência da Página de Pagamento (Checkout Builder)** → produto → Editar → componente Order Bump → selecionar produto → Publicar.
- Preço sugerido: ~10–30% do ticket principal (micros bumpam flagships; flagships bumpam micros).
- Formas: cartão, PIX, boleto, PayPal, etc. (ver help). Serviços online não entram como bump.

Fontes: [blog Order Bump](https://hotmart.com/pt-br/blog/order-bump-da-hotmart), [Help EN](https://help.hotmart.com/en/article/360019967392/what-is-an-order-bump-and-how-do-i-set-it-up-).

## 3. Cross-sell / Funil / Upsell-Downsell

**Funil de Vendas**: Ferramentas → Funil de Vendas → Novo Funil → etapas + widgets nas páginas → Ativar. Exige ≥2 produtos; páginas intermediárias externas em muitos setups.

Estratégias: upsell, downsell, cross-sell.

Fonte: [Funil de vendas](https://hotmart.com/pt-br/blog/funil-de-vendas-como-configurar).

## 4. Recuperação de vendas

- Recuperador Automático (grátis): tentativas quando cartão recusa / falta limite; ativar na oferta (Precificação) ou Ferramentas.
- Variante Parcelado Hotmart: beta, produtores elegíveis BR.
- Limitações: à vista puro, 2 cartões, alguns cupons podem ficar fora do fluxo.

Fontes: [Help recuperador](https://help.hotmart.com/pt-br/article/360057623272/como-usar-o-recuperador-automatico-de-vendas-), [campanha Smart Recovery](https://campaign.hotmart.com/smart-recovery).

## 5. Fast Buy / compra 1 clique

Associado a **Hotmart Recomenda** e recompra: cliente já autenticado compra complementar com 1 clique na Página de Obrigado / Club.

## 6. Hotmart Recomenda

Sugestões automáticas pós-compra e no Club. Com ≥2 produtos elegíveis, tende a ativar sozinho. Gerenciar em Ferramentas → Recomenda. Produto precisa estar ativo, vitrine, Club; formatos como combo/evento podem ser inelegíveis.

Fonte: [Recomenda help](https://suportehotmart.zendesk.com/hc/pt-br/articles/32203131544333-Como-usar-o-Recomenda-para-sugerir-produtos-e-aumentar-vendas).

## 7. Agente IA / WhatsApp / Agente de Vendas

**Agente de Vendas**: IA da Hotmart em página de vendas, abandono e pós-checkout (cross-sell). Ativar em Ferramentas → Agente de Vendas. Funil com Agente pode ser exclusivo BR.

Fonte: [Agente de Vendas](https://suportehotmart.zendesk.com/hc/pt-br/articles/40205270182029-O-que-%C3%A9-o-Agente-de-Vendas-e-como-utiliz%C3%A1-lo-para-aumentar-minhas-vendas).

> Compliance BalcãoIA: não confundir com Meta Business Agent; não ensinar automação não oficial de WhatsApp.

## 8. Temperatura Marketplace

Proxy de vendas recentes + engajamento. Sobe com vendas reais e estrutura (Blueprint). Sem “truque”: consistência de vendas + afiliados ativos.

## 9. Hotmart Pages

Criador de landing pages nativo (Marketing → Criação de páginas). Útil se não houver página externa; BalcãoIA já usa `balcaoialocal.com.br/produtos/[slug]`.

## 10. Hotmart Club

Área de membros: entrega, comunidade, pré-requisito forte para Recomenda elegível. LOTE1 já usa club BalcãoIA Local.

## 11. Tutor IA

Recursos de IA na experiência do aluno no Club (disponibilidade varia). Ativar só após Club estável.

## 12. Pixel / rastreamento

Ferramentas → Pixel de Rastreamento por produto: GA4, Google Ads, Meta. Checkout é domínio Hotmart → Pixel do site sozinho não basta; preferir integração nativa + **webhook → CAPI**.

Fontes: [GA4 Hotmart](https://suportehotmart.zendesk.com/hc/pt-br/articles/115002408208-Como-configurar-o-Pixel-do-Google-Analytics).

## 13. Afiliados / HotLeads / recrutamento

Programa por produto: comissão, cookie, aprovação automática, Marketplace, HotLeads (leads de afiliados conforme regras da conta), tags, kit de mídia. LOTE1: micros 70%, flagships 50%, cookie 180 dias.

## 14. Checkout personalizado

Checkout Builder: logo, cores (usar **petrol `#0F3D4A` + âmbar `#F5A623`**, não roxo genérico), Order Bump, textos. Evitar depoimentos inventados e promessas de renda.

## 15. Período grátis / assinatura

Para produtos recorrentes. LOTE1 = pagamento à vista eBook → N/A.

## 16. Coprodução

Split de receita com parceiro. Opcional.

## 17. HotLeads

Canal/recurso de leads no ecossistema de afiliados — ativar no programa se o switch existir na conta.

## 18. Cupons

Produto → Cupons. Atenção à máscara de % no painel (já houve bug de 0,5% em vez de 50%). Preferir API/`fix_cupons_lote1.py` validado.

## 19. Relatórios / Analytics

Relatórios → Vendas / Recorrências / Minhas análises. Cruzar com webhook Studio.

## 20. Blueprint máximo — ordem de execução BalcãoIA

1. Corrigir hotlinks/preços errados (30 Posts, Template, Calculadora).  
2. Checkout Builder + Order Bump por trilha.  
3. Recuperador nas ofertas elegíveis.  
4. Funis micro → flagship.  
5. Recomenda + Club.  
6. Pixels + webhook CAPI.  
7. Cupons corretos.  
8. Materiais afiliado + Blueprint ≥80%.  
9. Agente de Vendas se liberado.  
10. Temperatura via vendas reais (sem garantia de renda).

---

## Links úteis

- Ferramentas: https://app.hotmart.com/tools  
- Checkout Builder / Aparência: via Ferramentas  
- Funil: https://app.hotmart.com/tools (buscar Funil de Vendas)  
- Pixel: Ferramentas → Pixel de Rastreamento  
- Club: https://app.hotmart.com/club  
- Marketplace: https://app.hotmart.com/market  

*Documento interno BalcãoIA / VOID-9 — sem promessa de resultado financeiro.*

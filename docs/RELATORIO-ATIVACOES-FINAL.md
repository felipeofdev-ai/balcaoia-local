# Ativação Total de Conversão
Data: 2026-07-29T00:37:50.734449

## Recuperador: {'ok': False, 'notes': ['https://app.hotmart.com/tools/product-select/automatic_sales_retriever|switches=0', 'https://app-vlc.hotmart.com/tools/automatic-recovery|switches=0', 'https://app-vlc.hotmart.com/tools/recovery|switches=0']}
## Recomenda: {'ok': True, 'notes': ['https://app-vlc.hotmart.com/tools/recommend|switches=0']}
## Funil UI: {'url': 'https://app.hotmart.com/tools/sales/funnel', 'text_len': 563, 'has_funnel_word': False}

## Order Bumps (UI)
- UI `10-prompts-whatsapp-vendem` → bump **whatsapp-etico**
- UI `checklist-ia-1-hora` → bump **balcaoia-pro**
- UI `30-posts-prontos-ia` → bump **instagram-negocios-locais-ia**
- UI `template-atendimento-automatico` → bump **balcaoia-pro**
- UI `mini-guia-gmn-30min` → bump **google-meu-negocio-masterclass**
- UI `20-legendas-instagram` → bump **instagram-negocios-locais-ia**
- UI `calculadora-preco-rapida` → bump **foco-14**
- UI `15-ideias-reels-segmento` → bump **instagram-negocios-locais-ia**
- UI `template-bio-instagram` → bump **20-legendas-instagram**
- UI `pack-50-hashtags-nicho` → bump **15-ideias-reels-segmento**
- UI `whatsapp-etico` → bump **10-prompts-whatsapp-vendem**
- UI `balcaoia-pro` → bump **checklist-ia-1-hora**
- UI `foco-14` → bump **checklist-ia-1-hora**
- UI `chatgpt-empreendedores` → bump **balcaoia-pro**
- UI `instagram-negocios-locais-ia` → bump **15-ideias-reels-segmento**
- UI `google-meu-negocio-masterclass` → bump **mini-guia-gmn-30min**

## Funis (mapa real)

- `10-prompts-whatsapp-vendem` → upsell `whatsapp-etico` | downsell `template-atendimento-automatico`
- `checklist-ia-1-hora` → upsell `balcaoia-pro` | downsell `template-atendimento-automatico`
- `30-posts-prontos-ia` → upsell `instagram-negocios-locais-ia` | downsell `15-ideias-reels-segmento`
- `template-atendimento-automatico` → upsell `balcaoia-pro` | downsell `checklist-ia-1-hora`
- `mini-guia-gmn-30min` → upsell `google-meu-negocio-masterclass` | downsell `20-legendas-instagram`
- `20-legendas-instagram` → upsell `instagram-negocios-locais-ia` | downsell `15-ideias-reels-segmento`
- `calculadora-preco-rapida` → upsell `foco-14` | downsell `checklist-ia-1-hora`
- `15-ideias-reels-segmento` → upsell `instagram-negocios-locais-ia` | downsell `20-legendas-instagram`
- `template-bio-instagram` → upsell `instagram-negocios-locais-ia` | downsell `20-legendas-instagram`
- `pack-50-hashtags-nicho` → upsell `instagram-negocios-locais-ia` | downsell `15-ideias-reels-segmento`
- `whatsapp-etico` → upsell `balcaoia-pro` | downsell `10-prompts-whatsapp-vendem`
- `balcaoia-pro` → upsell `whatsapp-etico` | downsell `template-atendimento-automatico`
- `foco-14` → upsell `whatsapp-etico` | downsell `calculadora-preco-rapida`
- `chatgpt-empreendedores` → upsell `balcaoia-pro` | downsell `checklist-ia-1-hora`
- `instagram-negocios-locais-ia` → upsell `whatsapp-etico` | downsell `30-posts-prontos-ia`
- `google-meu-negocio-masterclass` → upsell `instagram-negocios-locais-ia` | downsell `mini-guia-gmn-30min`

## Manual
- No Checkout Builder: vincular Order Bump ao produto sugerido (bump_produto)
- No Funil de Vendas: criar etapas upsell/downsell com ofertas reais
- Recuperador: selecionar produto no hot-select e ativar por oferta
- Criar ofertas especiais de upsell só se quiser preço diferente do hotlink padrão
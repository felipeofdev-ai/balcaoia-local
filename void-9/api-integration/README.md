# Integração Hotmart API — FOCO 14 / BalcãoIA

> A Hotmart **não** permite criar 100% do produto só por API em todos os fluxos de UI. Use API para auth, consultas, webhooks e automação parcial. Cadastro visual do produto continua no checklist.

## Credenciais
1. Acesse Hotmart → **Ferramentas → Credenciais / Developer**
2. Crie aplicativo e copie:
   - `HOTMART_CLIENT_ID`
   - `HOTMART_CLIENT_SECRET`
3. Webhook: **Ferramentas → Webhook** → URL do Studio:
   - Produção: `https://balcaoia-studio.vercel.app/api/webhooks/hotmart`
   - (Depois do DNS) `https://balcaoialocal.com.br/api/webhooks/hotmart`
4. Copie `HOTMART_HOTTOK` para a Vercel / `.env.local`

Documentação oficial (hub): https://developers.hotmart.com/

## Auth (OAuth2 client_credentials)

`POST https://api-sec-vlc.hotmart.com/security/oauth/token`

Authorization Basic = base64(`client_id:client_secret`)  
Body/query: `grant_type=client_credentials`

Ver implementação: `hotmart-client.mjs`

## O que o código faz
- Obtém access token
- Lista vendas/produtos (endpoints de leitura — ajuste conforme doc atual do seu app)
- Exemplifica payload de webhook (já tratado no app em `app/api/webhooks/hotmart`)
- **Não** inventa endpoint de “criar produto” se o seu app não tiver escopo — o README deixa o create como **manual + template**

## Rodar
```bash
cd void-9/api-integration
cp .env.example .env   # preencha
node hotmart-client.mjs token
node hotmart-client.mjs sales
```

## Relação com o Studio
O webhook de liberação de acesso **já existe** no projeto Next.js. Não duplique lógica — aponte a Hotmart para a rota do Studio.

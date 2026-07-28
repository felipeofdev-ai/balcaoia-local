# DNS — Modo avançado já ativo (Registro.br)

Você já ativou o **Modo avançado**. Falta só criar **3 entradas** e clicar **Salvar alterações**.

Eu **não consigo** clicar no seu painel. A Vercel ainda vê `aValues: []` (zona vazia).

---

## Agora no Registro.br (2 minutos)

1. Abra **balcaoialocal.com.br**
2. **DNS** → **Configurar zona DNS** (não só “modo avançado”)
3. Clique **Nova entrada** três vezes:

| # | Tipo | Nome | Dados |
|---|------|------|--------|
| 1 | **A** | *(deixe em branco)* | `216.198.79.1` |
| 2 | **A** | *(deixe em branco)* | `64.29.17.1` |
| 3 | **CNAME** | `www` | `0aa115eeb83a6cac.vercel-dns-017.com.` |

4. Clique **Salvar alterações** (sem isso nada publica)
5. Responda aqui: **DNS salvo**

Eu valido na Vercel e atualizo as URLs oficiais automaticamente.

---

## Enquanto o domínio não aponta

Use o sistema já pronto:
- Site: https://balcaoia-studio.vercel.app  
- Vendas: https://balcaoia-studio.vercel.app/vendas  
- Login: https://balcaoia-studio.vercel.app/app/login  
  - `demo@balcaoialocal.com.br` / `BalcaoIA7D!`

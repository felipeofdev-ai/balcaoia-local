# DNS Registro.br → Vercel — balcaoialocal.com.br

**Status Vercel (agora):** Invalid Configuration  
**Causa:** nameservers ainda são `a.auto.dns.br` / `b.auto.dns.br` e **não há nenhum registro A** na zona.

Site já funciona em: https://balcaoia-studio.vercel.app  

---

## Método recomendado (manter DNS do Registro.br)

### 1. Abrir a zona
1. https://registro.br → login  
2. Clique em **balcaoialocal.com.br**  
3. Seção **DNS** → **Configurar endereçamento**  
4. Se pedir: ative **Modo avançado** → Confirmar (pode levar alguns minutos na 1ª vez)  
5. Depois: **Configurar zona DNS**

### 2. Apagar conflitos
Remova qualquer entrada **A**, **AAAA** ou **CNAME** da raiz (`@` / em branco) e de `www` que não sejam as abaixo.

### 3. Criar exatamente isto

#### Raiz `balcaoialocal.com.br` — dois registros **A**
| Tipo | Nome | Dados |
|------|------|--------|
| **A** | *(vazio)* ou `@` | `216.198.79.1` |
| **A** | *(vazio)* ou `@` | `64.29.17.1` |

#### `www` — um **CNAME**
| Tipo | Nome | Dados |
|------|------|--------|
| **CNAME** | `www` | `0aa115eeb83a6cac.vercel-dns-017.com.` |

> Se o painel reclamar do ponto final, use sem o ponto: `0aa115eeb83a6cac.vercel-dns-017.com`

### 4. Salvar alterações
Clique em **Salvar alterações** (obrigatório).

### 5. Me avise
Assim que salvar, diga **“DNS salvo”** — eu rodo `vercel domains verify` e confirmo quando ficar **Valid**.

Propagação típica: 5–60 minutos (às vezes até 2h).

---

## Alternativa (delegar DNS à Vercel)

Só use se preferir gerenciar DNS na Vercel:

No Registro.br → DNS → **alterar servidores DNS** para:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

A zona já existe na conta Vercel com ALIAS. Propagação de NS costuma ser mais lenta (até 24–48h).

**Preferência:** método dos registros A + CNAME acima (mais rápido e simples no .br).

---

## Depois que a Vercel mostrar Valid

URLs oficiais:
- https://balcaoialocal.com.br  
- https://balcaoialocal.com.br/vendas  
- https://www.balcaoialocal.com.br  

Na Hotmart, use a página de vendas: `https://balcaoialocal.com.br/vendas`  
Webhook: `https://balcaoialocal.com.br/api/webhooks/hotmart`

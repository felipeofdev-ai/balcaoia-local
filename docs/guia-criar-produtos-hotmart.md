# Guia — Criar produtos no painel Hotmart (BalcãoIA / VOID-9)

**Atualizado:** 2026-07-28
**URL criar produto:** https://app.hotmart.com/products/add

## Verdade sobre a API (honesto)

| Capacidade | Status |
|------------|--------|
| OAuth (`CLIENT_ID`/`CLIENT_SECRET`) | ✅ retorna `access_token` |
| HOTTOK no webhook | ✅ `hottok_configured: true` |
| Criar produto via POST | ❌ **não funciona** (200 vazio / 404) |
| Checkout links | ❌ só existem **depois** de criar no painel |

**Crie cada produto manualmente no painel.** Este guia é copy-paste.

## Webhook (já online)

- URL: `https://balcaoia-studio.vercel.app/api/webhook`
- Também: `https://balcaoialocal.com.br/api/webhook`
- Header: `x-hotmart-hottok`
- Vercel: `HOTTOK` + `HOTMART_HOTTOK` ✅

## Após criar cada produto

1. Copie o **link de checkout** Hotmart
2. Cole no chat OU rode: `vercel env add <ENV_KEY> production`
3. Ative afiliados com a % abaixo
4. Configure order bump + upsell na oferta
5. Redeploy: `vercel --prod`

## Compliance (obrigatório)

- Sem renda/lucro/vendas **garantidas**
- Sem automação não oficial de WhatsApp
- Sem “oficial Meta/WhatsApp/Hotmart” como endosso
- Marcas citadas de forma nominativa

---

## Produto 1 — FOCO 14 — Método de Foco Profissional

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `foco-14` |
| Página | https://balcaoialocal.com.br/produtos/foco-14 |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_FOCO14` |
| Preço | **R$ 47,00** |
| Garantia | **30 dias** |
| Formato | Ebook/Material Digital |
| Afiliados | **50%** |
| Order bump | Planner FOCO 14 — R$ 27,00 |
| Upsell | Clareza Semanal — R$ 67,00 |

### Nome (copiar)

```
FOCO 14 — Método de Foco Profissional
```

### Descrição (copiar)

```
Você já perdeu horas do seu dia sem conseguir terminar o que realmente importa? O FOCO 14 é o método definitivo para eliminar distrações e produzir resultados reais em apenas 14 dias.

Desenvolvido para profissionais e empreendedores que precisam de alta performance sem abrir mão da qualidade de vida, o FOCO 14 combina técnicas comprovadas de neurociência, gestão de tempo e produtividade em um sistema simples e poderoso.

O que você vai dominar:
→ Como eliminar as 7 principais fontes de distração
→ O protocolo de 14 dias para reconfigurar seu foco
→ Sistema de blocos de tempo que aumenta sua produção
→ Como dizer não sem culpa e sem perder oportunidades
→ A técnica dos 3 resultados diários que muda tudo
→ Como criar um ambiente de trabalho que favorece o foco
→ O método de revisão semanal que mantém você no trilho

Bônus inclusos:
✓ Planner Digital FOCO 14 (valor R$ 47)
✓ Áudios de Foco Profundo — 7 sessões (valor R$ 37)
✓ Checklist Diária de Alta Performance (valor R$ 27)

Conteúdo educativo. Resultados dependem da sua execução. Garantia de 30 dias conforme Hotmart.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 47,00
- [ ] Garantia 30 dias
- [ ] Formato: Ebook/Material Digital
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Planner FOCO 14 — R$ 27,00
- [ ] Upsell: Clareza Semanal — R$ 67,00
- [ ] Afiliados 50% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_FOCO14`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 2 — Clareza Semanal — Planejamento de Alta Performance

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `rotina-clareza-freelancer` |
| Página | https://balcaoialocal.com.br/produtos/rotina-clareza-freelancer |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_CLAREZA` |
| Preço | **R$ 37,00** |
| Garantia | **30 dias** |
| Formato | Ebook/Material Digital |
| Afiliados | **50%** |
| Order bump | Templates Premium Semana — R$ 17,00 |
| Upsell | BalcãoIA Pro — R$ 97,00 |

### Nome (copiar)

```
Clareza Semanal — Planejamento de Alta Performance
```

### Descrição (copiar)

```
Pare de começar cada semana no piloto automático. A Clareza Semanal é o sistema completo que transforma seu planejamento semanal em uma ferramenta poderosa de resultados consistentes.

Com o método de planejamento semanal de alta performance, você vai aprender a:
→ Definir as 3 prioridades que realmente movem a agulha
→ Bloquear tempo para o que importa antes que urgências apareçam
→ Fazer revisões semanais que garantem progresso real
→ Alinhar sua semana com seus objetivos de longo prazo
→ Eliminar a sensação de estar sempre ocupado mas nunca avançando
→ Criar rituais de início e encerramento de semana que funcionam
→ Usar o planejamento como ferramenta de clareza mental

Incluso no pacote:
✓ Sistema de Planejamento Semanal Completo
✓ 12 Templates de Semana prontos para usar
✓ Guia de Revisão Mensal
✓ Calendário de 90 dias de Alta Performance

Conteúdo educativo. Garantia de 30 dias conforme Hotmart.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 37,00
- [ ] Garantia 30 dias
- [ ] Formato: Ebook/Material Digital
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Templates Premium Semana — R$ 17,00
- [ ] Upsell: BalcãoIA Pro — R$ 97,00
- [ ] Afiliados 50% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_CLAREZA`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 3 — BalcãoIA Pro — Atendimento Inteligente com IA

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `checklist-atendimento-local` |
| Página | https://balcaoialocal.com.br/produtos/checklist-atendimento-local |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_BALCAOIA_PRO` |
| Preço | **R$ 97,00** |
| Garantia | **30 dias** |
| Formato | Ebook/Material Digital |
| Afiliados | **50%** |
| Order bump | Scripts de Atendimento Premium — R$ 37,00 |
| Upsell | Sistema BalcãoIA Completo — R$ 197,00 |

### Nome (copiar)

```
BalcãoIA Pro — Atendimento Inteligente com IA
```

### Descrição (copiar)

```
Seu concorrente já está usando inteligência artificial para atender clientes mais rápido, melhor e com menos custo. Você ainda está fazendo tudo na mão?

O BalcãoIA Pro é o guia completo para transformar o atendimento do seu negócio local usando IA de forma ética, simples e sem precisar saber programar.

O que você vai implementar:
→ Como configurar respostas assistidas no WhatsApp Business (oficial)
→ Os melhores prompts de IA para atendimento ao cliente
→ Triagem assistida de mensagens sem perder vendas
→ Sistema de follow-up ético que aumenta conversão
→ Como usar IA para rascunhar respostas a dúvidas frequentes
→ Integração simples com ferramentas gratuitas
→ Como escalar o atendimento sem contratar mais funcionários

Incluso:
✓ 50 Prompts de Atendimento prontos para usar
✓ Fluxogramas de Atendimento IA para copiar
✓ Lista das melhores ferramentas gratuitas
✓ Templates de mensagens para cada situação

Sem automação não oficial. Conteúdo educativo. Garantia de 30 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 97,00
- [ ] Garantia 30 dias
- [ ] Formato: Ebook/Material Digital
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Scripts de Atendimento Premium — R$ 37,00
- [ ] Upsell: Sistema BalcãoIA Completo — R$ 197,00
- [ ] Afiliados 50% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_BALCAOIA_PRO`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 4 — WhatsApp Ético — Como Vender Mais Sem Spam

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `whatsapp-etico-negocios` |
| Página | https://balcaoialocal.com.br/produtos/whatsapp-etico-negocios |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_WHATSAPP_ETICO` |
| Preço | **R$ 67,00** |
| Garantia | **30 dias** |
| Formato | Ebook/Material Digital |
| Afiliados | **50%** |
| Order bump | Biblioteca de 200 Mensagens — R$ 27,00 |
| Upsell | BalcãoIA Pro — R$ 97,00 |

### Nome (copiar)

```
WhatsApp Ético — Como Vender Mais Sem Spam
```

### Descrição (copiar)

```
98% das mensagens de WhatsApp são lidas. É o canal mais poderoso do Brasil para vendas. Mas a maioria das empresas usa errado e perde clientes.

O WhatsApp Ético ensina como usar o aplicativo mais popular do Brasil para vender mais sem incomodar, sem risco de bloqueio e sem parecer spam.

Você vai aprender:
→ As regras de ouro do WhatsApp Business para não ser banido
→ Como construir uma lista de contatos que quer receber suas mensagens
→ Estrutura de mensagens que geram resposta e venda
→ Como usar broadcast de forma ética e eficaz
→ Sequência de follow-up que converte sem pressionar
→ Como criar catálogo de produtos que vende sozinho
→ Estratégias de status do WhatsApp para engajar clientes

Incluso:
✓ 200 Mensagens Prontas para copiar e usar
✓ Calendário de Conteúdo para WhatsApp — 30 dias
✓ Guia de Configuração do WhatsApp Business
✓ Scripts de Vendas para cada etapa do funil

Sem spam e sem automação não oficial. Conteúdo educativo. Garantia de 30 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 67,00
- [ ] Garantia 30 dias
- [ ] Formato: Ebook/Material Digital
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Biblioteca de 200 Mensagens — R$ 27,00
- [ ] Upsell: BalcãoIA Pro — R$ 97,00
- [ ] Afiliados 50% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_WHATSAPP_ETICO`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 5 — Produtividade Local — Gestão Inteligente para Empreendedores

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `desafio-7d-atendimento` |
| Página | https://balcaoialocal.com.br/produtos/desafio-7d-atendimento |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_PRODUTIVIDADE` |
| Preço | **R$ 87,00** |
| Garantia | **30 dias** |
| Formato | Ebook/Material Digital |
| Afiliados | **50%** |
| Order bump | Kit Ferramentas Premium — R$ 27,00 |
| Upsell | Sistema BalcãoIA — R$ 197,00 |

### Nome (copiar)

```
Produtividade Local — Gestão Inteligente para Empreendedores
```

### Descrição (copiar)

```
Dono de negócio que faz tudo sozinho não tem negócio. Tem um emprego disfarçado.

A Produtividade Local é o sistema completo para você parar de apagar incêndios e começar a construir um negócio que funciona sem depender 100% de você.

O sistema cobre:
→ Como mapear e eliminar tarefas que não geram resultado
→ O método de delegação que funciona mesmo com equipes pequenas
→ Como criar processos simples que qualquer pessoa pode seguir
→ Ferramentas gratuitas para automatizar o operacional
→ Como recuperar 2 horas por dia para o que realmente importa
→ Sistema de metas e acompanhamento para negócios locais
→ Como organizar financeiro, estoque e atendimento de forma simples

Incluso:
✓ Mapa de Processos do Negócio Local
✓ Kit de Ferramentas Gratuitas com guia de uso
✓ Planilha de Gestão de Tarefas
✓ Checklists de Abertura e Fechamento do Negócio

Conteúdo educativo. Sem promessa de renda. Garantia de 30 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 87,00
- [ ] Garantia 30 dias
- [ ] Formato: Ebook/Material Digital
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Kit Ferramentas Premium — R$ 27,00
- [ ] Upsell: Sistema BalcãoIA — R$ 197,00
- [ ] Afiliados 50% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_PRODUTIVIDADE`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 6 — Sistema BalcãoIA — Curso Completo de IA para Negócios Locais

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `curso-organizacao-atendimento` |
| Página | https://balcaoialocal.com.br/produtos/curso-organizacao-atendimento |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_SISTEMA` |
| Preço | **R$ 197,00** |
| Garantia | **30 dias** |
| Formato | Curso digital |
| Afiliados | **40%** |
| Order bump | Suporte Premium 30 dias — R$ 47,00 |
| Upsell | Transformação Digital Local — R$ 297,00 |

### Nome (copiar)

```
Sistema BalcãoIA — Curso Completo de IA para Negócios Locais
```

### Descrição (copiar)

```
O guia mais completo do Brasil para implementar inteligência artificial no seu negócio local, do zero ao avançado, sem precisar saber programar.

O Sistema BalcãoIA é um curso estruturado em módulos práticos com implementação real em cada aula. Você sai com tudo funcionando no seu negócio.

Módulos do curso:
Módulo 1: Fundamentos de IA para Negócios Locais
Módulo 2: Atendimento Assistido no WhatsApp Business
Módulo 3: IA para Marketing e Conteúdo
Módulo 4: Automação de Processos Internos (ferramentas oficiais)
Módulo 5: IA para Vendas e Conversão
Módulo 6: Análise de Dados sem Ser Técnico
Módulo 7: Implementação e Escala

Incluso:
✓ Acesso vitalício a todos os módulos
✓ Atualizações gratuitas por 12 meses
✓ Comunidade exclusiva de alunos
✓ Templates e prompts prontos para usar
✓ Suporte por email

Sem automação não oficial. Conteúdo educativo. Garantia de 30 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 197,00
- [ ] Garantia 30 dias
- [ ] Formato: Curso digital
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Suporte Premium 30 dias — R$ 47,00
- [ ] Upsell: Transformação Digital Local — R$ 297,00
- [ ] Afiliados 40% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_SISTEMA`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 7 — Transformação Digital Local — Programa de 8 Semanas

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `programa-8-semanas-balcao` |
| Página | https://balcaoialocal.com.br/produtos/programa-8-semanas-balcao |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_TRANSFORMACAO` |
| Preço | **R$ 297,00** |
| Garantia | **30 dias** |
| Formato | Programa digital |
| Afiliados | **40%** |
| Order bump | Comunidade Premium — R$ 67,00 |
| Upsell | Método BalcãoIA — R$ 247,00 |

### Nome (copiar)

```
Transformação Digital Local — Programa de 8 Semanas
```

### Descrição (copiar)

```
Em 8 semanas, transforme seu negócio local em um negócio digital competitivo, eficiente e preparado para crescer com inteligência artificial.

O programa mais completo para digitalização de negócios locais no Brasil, com acompanhamento semana a semana e tarefas práticas com resultado mensurável.

Semana 1: Diagnóstico e Planejamento Digital
Semana 2: Presença Digital Profissional
Semana 3: Atendimento Digital Ético
Semana 4: Marketing Digital para Negócios Locais
Semana 5: Vendas Online e WhatsApp
Semana 6: IA no Dia a Dia do Negócio
Semana 7: Processos e Automações
Semana 8: Escala e Sustentabilidade

Incluso:
✓ 8 módulos com aulas práticas
✓ Tarefas semanais com checklist
✓ Templates prontos para cada semana
✓ Comunidade de apoio do programa
✓ Suporte durante as 8 semanas

Conteúdo educativo. Sem promessa de renda. Garantia de 30 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 297,00
- [ ] Garantia 30 dias
- [ ] Formato: Programa digital
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Comunidade Premium — R$ 67,00
- [ ] Upsell: Método BalcãoIA — R$ 247,00
- [ ] Afiliados 40% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_TRANSFORMACAO`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 8 — Método BalcãoIA — O Sistema Proprietário Completo

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `sistema-balcao-proprietario` |
| Página | https://balcaoialocal.com.br/produtos/sistema-balcao-proprietario |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_METODO` |
| Preço | **R$ 247,00** |
| Garantia | **30 dias** |
| Formato | Ebook + workbook |
| Afiliados | **40%** |
| Order bump | Licença Comercial — R$ 97,00 |
| Upsell | Workshop IA Local — R$ 197,00 |

### Nome (copiar)

```
Método BalcãoIA — O Sistema Proprietário Completo
```

### Descrição (copiar)

```
O método proprietário desenvolvido e validado com negócios locais brasileiros para dominar o atendimento digital com inteligência artificial.

Diferente de cursos genéricos, o Método BalcãoIA foi criado especificamente para a realidade do empreendedor local brasileiro.

O método em 4 pilares:
Pilar 1: Diagnóstico — Onde você está e onde quer chegar
Pilar 2: Estrutura — Montando a base digital do negócio
Pilar 3: Automação — Usando IA para escalar o atendimento (com humano no comando)
Pilar 4: Crescimento — Atraindo e retendo mais clientes

Incluso:
✓ Material completo do método (ebook + workbook)
✓ Mapas mentais de implementação
✓ Estudos de caso reais
✓ Templates exclusivos do método
✓ Checklist de implementação por fase

Conteúdo educativo. Garantia de 30 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 247,00
- [ ] Garantia 30 dias
- [ ] Formato: Ebook + workbook
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Licença Comercial — R$ 97,00
- [ ] Upsell: Workshop IA Local — R$ 197,00
- [ ] Afiliados 40% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_METODO`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 9 — Workshop IA para Negócios Locais — Implementação Prática

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `workshop-ia-atendimento` |
| Página | https://balcaoialocal.com.br/produtos/workshop-ia-atendimento |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_WORKSHOP` |
| Preço | **R$ 197,00** |
| Garantia | **30 dias** |
| Formato | Workshop gravado |
| Afiliados | **40%** |
| Order bump | Gravação HD + Extra — R$ 47,00 |
| Upsell | Bundle Master — R$ 397,00 |

### Nome (copiar)

```
Workshop IA para Negócios Locais — Implementação Prática
```

### Descrição (copiar)

```
Workshop gravado em formato intensivo com implementação prática de inteligência artificial no seu negócio local. Formato hands-on, sem teoria desnecessária.

Durante o workshop você implementa:
→ Fluxos básicos no WhatsApp Business (canais oficiais)
→ Respostas assistidas inteligentes
→ Sistema de triagem de clientes
→ IA para criação de conteúdo
→ Automação de follow-up ético
→ Relatório de atendimento

Incluso:
✓ Gravação completa do workshop em HD
✓ Acesso vitalício ao material
✓ Arquivos e templates do workshop
✓ Guia de implementação pós-workshop
✓ Suporte por 15 dias após o workshop

Sem automação não oficial. Conteúdo educativo. Garantia de 30 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 197,00
- [ ] Garantia 30 dias
- [ ] Formato: Workshop gravado
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Gravação HD + Extra — R$ 47,00
- [ ] Upsell: Bundle Master — R$ 397,00
- [ ] Afiliados 40% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_WORKSHOP`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 10 — Bundle Master BalcãoIA — Pacote Completo de Entrada

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `bundle-entrada-local` |
| Página | https://balcaoialocal.com.br/produtos/bundle-entrada-local |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_BUNDLE` |
| Preço | **R$ 197,00** |
| Garantia | **30 dias** |
| Formato | Bundle digital |
| Afiliados | **40%** |
| Order bump | Mentoria em Grupo 1 sessão — R$ 97,00 |
| Upsell | Sistema BalcãoIA — R$ 197,00 |

### Nome (copiar)

```
Bundle Master BalcãoIA — Pacote Completo de Entrada
```

### Descrição (copiar)

```
A forma mais inteligente de começar com inteligência artificial no seu negócio local. O Bundle Master reúne os 5 melhores produtos de entrada da BalcãoIA com um desconto exclusivo.

O que está incluso:
✓ FOCO 14 — Método de Foco Profissional (R$ 47)
✓ Clareza Semanal (R$ 37)
✓ BalcãoIA Pro (R$ 97)
✓ WhatsApp Ético (R$ 67)
✓ Produtividade Local (R$ 87)

Valor total separado: R$ 335,00
Você paga apenas: R$ 197,00

Bônus exclusivos do Bundle:
✓ Roadmap de Implementação Completo
✓ Sessão de perguntas e respostas gravada
✓ Comunidade exclusiva Bundle Master

Garantia de 30 dias em todos os produtos. Conteúdo educativo.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 197,00
- [ ] Garantia 30 dias
- [ ] Formato: Bundle digital
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Mentoria em Grupo 1 sessão — R$ 97,00
- [ ] Upsell: Sistema BalcãoIA — R$ 197,00
- [ ] Afiliados 40% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_BUNDLE`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 11 — Mentoria BalcãoIA em Grupo — Implementação Guiada

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `mentoria-grupo-gravada` |
| Página | https://balcaoialocal.com.br/produtos/mentoria-grupo-gravada |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_MENTORIA` |
| Preço | **R$ 997,00** |
| Garantia | **15 dias** |
| Formato | Mentoria gravada |
| Afiliados | **30%** |
| Order bump | Análise Individual do Negócio — R$ 197,00 |
| Upsell | Curso Avançado + Comunidade — R$ 1.497,00 |

### Nome (copiar)

```
Mentoria BalcãoIA em Grupo — Implementação Guiada
```

### Descrição (copiar)

```
Para quem quer implementar IA no negócio com acompanhamento especializado, sem errar no caminho e sem perder tempo com tentativa e erro.

A Mentoria BalcãoIA em Grupo oferece sessões gravadas de mentoria com implementação guiada e material exclusivo de alto nível.

O programa de mentoria inclui:
→ Sessões gravadas de implementação guiada
→ Diagnóstico personalizado do seu negócio
→ Plano de ação específico para sua realidade
→ Acesso a materiais exclusivos de mentoria
→ Comunidade privada de mentorados
→ Suporte especializado por email

Módulos da mentoria:
Mês 1: Diagnóstico e Estratégia
Mês 2: Implementação e Automação
Mês 3: Otimização e Escala

Conteúdo educativo. Garantia de 15 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 997,00
- [ ] Garantia 15 dias
- [ ] Formato: Mentoria gravada
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Análise Individual do Negócio — R$ 197,00
- [ ] Upsell: Curso Avançado + Comunidade — R$ 1.497,00
- [ ] Afiliados 30% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_MENTORIA`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 12 — Curso Avançado BalcãoIA + Comunidade de Alto Nível

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `curso-avancado-comunidade` |
| Página | https://balcaoialocal.com.br/produtos/curso-avancado-comunidade |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_AVANCADO` |
| Preço | **R$ 1.497,00** |
| Garantia | **15 dias** |
| Formato | Curso + comunidade |
| Afiliados | **30%** |
| Order bump | Revisão Mensal de Estratégia — R$ 297,00 |
| Upsell | Certificação BalcãoIA — R$ 1.997,00 |

### Nome (copiar)

```
Curso Avançado BalcãoIA + Comunidade de Alto Nível
```

### Descrição (copiar)

```
Para quem já tem base e quer levar o negócio local para o próximo nível usando inteligência artificial de forma avançada e estratégica.

O Curso Avançado BalcãoIA é o programa mais completo disponível no Brasil para implementação avançada de IA em negócios locais, com acesso à comunidade exclusiva de alto nível.

Conteúdo avançado:
→ Integração de múltiplas ferramentas de IA
→ Automações complexas sem código (ferramentas oficiais)
→ IA para análise e decisão estratégica
→ Escala de atendimento com IA assistida
→ Estratégias avançadas de marketing com IA
→ Criação de processos inteligentes
→ Métricas e otimização contínua

Incluso:
✓ Curso completo avançado (acesso vitalício)
✓ Comunidade exclusiva de alto nível
✓ Sessões mensais em grupo gravadas
✓ Templates avançados exclusivos
✓ Atualizações por 24 meses

Conteúdo educativo. Garantia de 15 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 1.497,00
- [ ] Garantia 15 dias
- [ ] Formato: Curso + comunidade
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Revisão Mensal de Estratégia — R$ 297,00
- [ ] Upsell: Certificação BalcãoIA — R$ 1.997,00
- [ ] Afiliados 30% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_AVANCADO`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 13 — Certificação BalcãoIA — Especialista em IA para Negócios Locais

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `certificado-conclusao-7d` |
| Página | https://balcaoialocal.com.br/produtos/certificado-conclusao-7d |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_CERTIFICACAO` |
| Preço | **R$ 1.997,00** |
| Garantia | **15 dias** |
| Formato | Certificação por portfólio |
| Afiliados | **30%** |
| Order bump | Kit de Prospecção Completo — R$ 197,00 |
| Upsell | Mastermind BalcãoIA — R$ 2.497,00 |

### Nome (copiar)

```
Certificação BalcãoIA — Especialista em IA para Negócios Locais
```

### Descrição (copiar)

```
Torne-se um especialista certificado em inteligência artificial para negócios locais e use essa credencial para atender clientes.

A Certificação BalcãoIA é o programa completo que transforma você em referência no mercado de IA para negócios locais no Brasil.

O programa de certificação:
Módulo 1: Fundamentos Avançados de IA Aplicada
Módulo 2: Consultoria para Negócios Locais
Módulo 3: Implementação e Entrega de Projetos
Módulo 4: Precificação e Captação de Clientes
Módulo 5: Gestão de Carteira de Clientes
Módulo 6: Provas e Certificação Final

Ao final você recebe:
✓ Certificado digital BalcãoIA
✓ Inclusão no diretório de especialistas
✓ Kit de prospecção de clientes
✓ Contrato e proposta comercial modelo
✓ Suporte pós-certificação por 6 meses

Certificação por evidência de implantação. Conteúdo educativo. Garantia de 15 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 1.997,00
- [ ] Garantia 15 dias
- [ ] Formato: Certificação por portfólio
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Kit de Prospecção Completo — R$ 197,00
- [ ] Upsell: Mastermind BalcãoIA — R$ 2.497,00
- [ ] Afiliados 30% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_CERTIFICACAO`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 14 — Mastermind BalcãoIA — Grupo Seleto de Alto Nível

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `mastermind-gravado-operadores` |
| Página | https://balcaoialocal.com.br/produtos/mastermind-gravado-operadores |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_MASTERMIND` |
| Preço | **R$ 2.497,00** |
| Garantia | **15 dias** |
| Formato | Mastermind gravado |
| Afiliados | **30%** |
| Order bump | Consultoria Individual 1h extra — R$ 497,00 |
| Upsell | Suite Completa — R$ 2.997,00 |

### Nome (copiar)

```
Mastermind BalcãoIA — Grupo Seleto de Alto Nível
```

### Descrição (copiar)

```
Você é o resultado da média das pessoas com quem convive. O Mastermind BalcãoIA reúne donos de negócios locais sérios, comprometidos e de alta performance.

Formato do Mastermind:
→ Sessões gravadas de estratégia em grupo
→ Troca de experiências entre membros
→ Análise de casos reais dos participantes
→ Acesso a especialistas convidados
→ Rede de relacionamento qualificada
→ Material exclusivo de alto nível

O que torna único:
→ Grupo reduzido e altamente qualificado
→ Foco em resultado real e mensurável
→ Ambiente de alto nível e sem ego
→ Membros comprometidos com crescimento

Incluso:
✓ Acesso ao grupo exclusivo gravado
✓ Material e sessões do mastermind
✓ Consultoria individual — 1 hora
✓ Acesso a toda biblioteca BalcãoIA

Conteúdo educativo. Garantia de 15 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 2.497,00
- [ ] Garantia 15 dias
- [ ] Formato: Mastermind gravado
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Consultoria Individual 1h extra — R$ 497,00
- [ ] Upsell: Suite Completa — R$ 2.997,00
- [ ] Afiliados 30% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_MASTERMIND`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Produto 15 — Suite Completa BalcãoIA — Acesso Total e Vitalício

| Campo | Valor |
|-------|-------|
| URL criar | https://app.hotmart.com/products/add |
| Slug Studio | `suite-completa-balcaoia` |
| Página | https://balcaoialocal.com.br/produtos/suite-completa-balcaoia |
| Env checkout | `NEXT_PUBLIC_HOTMART_CHECKOUT_SUITE` |
| Preço | **R$ 2.997,00** |
| Garantia | **30 dias** |
| Formato | Suite digital |
| Afiliados | **30%** |
| Order bump | Licença de Revenda — R$ 997,00 |
| Upsell | N/A (produto topo) |

### Nome (copiar)

```
Suite Completa BalcãoIA — Acesso Total e Vitalício
```

### Descrição (copiar)

```
Para quem quer o melhor, sem compromisso e sem precisar escolher qual produto comprar. A Suite Completa BalcãoIA é o acesso total e vitalício a todo o ecossistema.

O que está incluso na Suite:
✓ Todos os 14 produtos do ecossistema
✓ Todas as atualizações futuras
✓ Acesso a todos os cursos e materiais
✓ Comunidade exclusiva Suite Members
✓ Suporte prioritário vitalício
✓ Sessões em grupo gravadas mensalmente
✓ Acesso antecipado a novos produtos

Valor total de tudo separado: R$ 11.854,00
Investimento único na Suite: R$ 2.997,00

Nunca mais pague por nada do ecossistema BalcãoIA.

Conteúdo educativo. Garantia de 30 dias.
```

### Configurações de checkout (painel)

- [ ] Preço R$ 2.997,00
- [ ] Garantia 30 dias
- [ ] Formato: Suite digital
- [ ] Entrega / área de membros configurada
- [ ] Order bump: Licença de Revenda — R$ 997,00
- [ ] Upsell: N/A (produto topo)
- [ ] Afiliados 30% (aprovação automática sugerida)
- [ ] Copiar link de checkout → `NEXT_PUBLIC_HOTMART_CHECKOUT_SUITE`
- [ ] Webhook já aponta para `/api/webhook` (global)

---

## Ordem sugerida de criação

1. FOCO 14 (âncora de entrada)
2. Clareza Semanal + BalcãoIA Pro + WhatsApp Ético + Produtividade Local
3. Sistema / Transformação / Método / Workshop
4. Bundle Master (depois que os 5 de entrada existirem)
5. Mentoria → Avançado → Certificação → Mastermind → Suite

## Checklist final

- [ ] 15 produtos criados no painel
- [ ] 15 links de checkout colados nas env vars
- [ ] Afiliados ativos
- [ ] Bumps/upsells linkados
- [ ] `checkout_configured: true` no `/api/status` (após configurar checkout principal)

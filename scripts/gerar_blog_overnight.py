"""Gera artigos de blog SEO honestos (sem métricas inventadas de busca/renda)."""
from __future__ import annotations

from pathlib import Path

DIR = Path(r"c:\Users\Usuário\Desktop\BalcãoIA Local\balcaoia-studio\content\blog")

ARTICLES = [
    {
        "slug": "como-vender-pelo-whatsapp",
        "title": "Como vender pelo WhatsApp sem spam (guia prático para negócio local)",
        "desc": "Passo a passo ético para organizar conversas, follow-up e fechamento no WhatsApp Business — sem disparo em massa.",
        "related": "whatsapp-etico-negocios",
        "kw": "vender pelo WhatsApp",
        "sections": [
            (
                "Por que o WhatsApp importa no negócio local",
                "No Brasil, boa parte da conversa comercial já acontece no WhatsApp. O problema não é “usar WhatsApp”; é usar sem método: mensagens genéricas, follow-up inconsistente e pressão que parece spam.\n\nVender pelo WhatsApp com qualidade começa por clareza: o que você vende, para quem, em qual prazo e com quais regras. Sem isso, nenhum prompt ou automação salva a conversa.",
            ),
            (
                "Base antes da mensagem",
                "Antes de pensar em scripts:\n\n1. Catálogo curto (preços e condições reais)\n2. Política de resposta (ex.: dias úteis, 9h–18h)\n3. FAQ interno (prazo, entrega, garantia)\n4. Tom de voz do negócio (formal/informal)\n\nCom essa base, qualquer mensagem fica mais honesta e mais fácil de adaptar.",
            ),
            (
                "Estrutura de uma conversa que não incomoda",
                "Uma sequência ética costuma ter:\n\n- Confirmação do pedido/dúvida\n- Informação útil (não panfleto)\n- Pergunta aberta para avançar\n- Follow-up com valor (não “e aí?”)\n- Fechamento suave com próximos passos claros\n\nEvite: listas compradas, disparo em massa, pressão artificial e automação não oficial.",
            ),
            (
                "Follow-up sem vácuo constrangedor",
                "O follow-up ético lembra o contexto (“sobre o orçamento de terça”) e oferece uma saída (“se preferir, posso te mandar o PDF e você decide com calma”).\n\nDefina no máximo 2–3 toques úteis. Depois, respeite o silêncio. Persistência sem valor vira spam.",
            ),
            (
                "IA como rascunho, não como dona da conversa",
                "Use IA para rascunhar respostas longas. Você revisa fatos, preço e tom antes de enviar. Nunca deixe a IA inventar prazo ou estoque.\n\nSe usar recursos oficiais do WhatsApp Business / Meta, mantenha revisão humana em decisões comerciais.",
            ),
            (
                "Checklist de 7 dias",
                "Dia 1: escrever FAQ e horários\nDia 2: 5 respostas prontas das dúvidas mais comuns\nDia 3: template de orçamento\nDia 4: template de follow-up\nDia 5: revisar perfil Business\nDia 6: medir tempo médio de resposta\nDia 7: ajustar o que travou\n\nMétrica útil: tempo de primeira resposta e clareza do orçamento — não “garantia de vendas”.",
            ),
            (
                "Erros que destroem confiança",
                "- Prometer o que o estoque não entrega\n- Mensagens em horário inadequado sem acordo\n- Copiar texto genérico da internet sem adaptar\n- Usar ferramentas não oficiais de automação\n- Inventar urgência falsa (“última unidade” quando não é)",
            ),
            (
                "Quando aprofundar",
                "Se você quer um método organizado (templates + protocolo de toques éticos), veja o material BalcãoIA sobre WhatsApp Ético. É conteúdo educativo: resultados dependem da sua execução.",
            ),
        ],
        "faqs": [
            ("Preciso de WhatsApp Business pago?", "O app WhatsApp Business gratuito já cobre o básico. Avalie ferramentas oficiais só depois de ter processo."),
            ("Posso automatizar tudo?", "Não recomende automação total sem revisão. Comece por respostas assistidas e horários claros."),
            ("Isso garante mais vendas?", "Não. Organiza a conversa. Vendas dependem de oferta, demanda e execução."),
        ],
    },
    {
        "slug": "google-meu-negocio-como-funciona",
        "title": "Google Meu Negócio: como funciona na prática (sem milagre de ranking)",
        "desc": "Entenda perfil, categorias, fotos, avaliações e manutenção do Google Meu Negócio para negócios locais — sem promessa de 1º lugar.",
        "related": "google-meu-negocio-masterclass",
        "kw": "Google Meu Negócio",
        "sections": [
            (
                "O que é o Google Meu Negócio",
                "O Google Meu Negócio (perfil da empresa no Google) é a vitrine local: Maps, busca local e painel de informações. Ele não “vende sozinho”; ele reduz atrito quando alguém já busca o que você oferece na região.",
            ),
            (
                "Como o perfil ajuda de verdade",
                "Ajuda quando está completo, verdadeiro e atualizado: horário, telefone, site, fotos reais, categorias corretas e respostas a avaliações.\n\nNão ajuda quando está incompleto, com fotos genéricas ou categorias erradas.",
            ),
            (
                "Passo a passo de reivindicação e base",
                "1. Busque seu negócio no Google\n2. Reivindique ou crie o perfil\n3. Confirme dados oficiais\n4. Escolha categoria principal com cuidado\n5. Preencha descrição honesta\n6. Adicione fotos reais do espaço/produto\n7. Ative mensagens se for usar de verdade",
            ),
            (
                "Avaliações com ética",
                "Peça avaliação após entrega boa, sem comprar review e sem coagir. Responda críticas com calma e fato. Um perfil bem respondido transmite cuidado — não precisa inventar números de “47 avaliações em 30 dias”.",
            ),
            (
                "Posts e atualizações",
                "Use posts para novidades reais: horário especial, produto novo, aviso de férias. Frequência constante e verdadeira vale mais que volume vazio.",
            ),
            (
                "O que medir",
                "No painel, observe chamadas, rotas e cliques no site. Use isso para priorizar melhorias (foto? horário? categoria?). Não trate posição no Maps como garantia permanente.",
            ),
            (
                "Manutenção mensal",
                "Checklist curto:\n- Horário ainda correto?\n- Fotos novas do mês?\n- Avaliações respondidas?\n- Produtos/serviços atualizados?\n- Link do site funcionando?",
            ),
            (
                "Próximo passo",
                "Se quiser um roteiro mais completo de otimização (ainda sem promessa de ranking), veja a masterclass BalcãoIA de Google Meu Negócio.",
            ),
        ],
        "faqs": [
            ("Preciso de Google Ads?", "Não. O perfil orgânico já ajuda. Ads é decisão separada de mídia."),
            ("Em quanto tempo aparece?", "Varia. Foque em completude e verdade; o Google decide exibição."),
            ("Posso garantir o 1º lugar?", "Não. Ninguém honesto deve garantir posição."),
        ],
    },
    {
        "slug": "chatgpt-para-empresas-pequenas",
        "title": "ChatGPT para empresas pequenas: uso útil sem jargão",
        "desc": "Como usar ChatGPT no negócio local para rascunhos, FAQ e organização — com revisão humana e sem promessa de automação milagrosa.",
        "related": "chatgpt-empreendedores",
        "kw": "ChatGPT para empresas pequenas",
        "sections": [
            (
                "O que a IA faz bem (e o que não faz)",
                "ChatGPT é ótimo para rascunhar textos, estruturar checklists e reescrever com tom. É ruim para inventar preços, estoque, legislação específica do seu caso e “garantir resultado financeiro”.",
            ),
            (
                "Casos de uso reais para PME/local",
                "- FAQ de atendimento\n- Legendas a partir de um fato real do dia\n- Roteiro de Reels simples\n- Checklist de abertura/fechamento\n- Resumo de reunião\n- Tabela comparativa de opções (você valida números)",
            ),
            (
                "Estrutura mínima de prompt",
                "Inclua: papel, contexto do negócio, público, tom, formato de saída e restrições (“não invente preço”).\n\nExemplo: “Sou dono de oficina em cidade X. Escreva 5 respostas curtas para dúvida de prazo. Tom educado. Não invente dias — deixe [PRAZO] para eu preencher.”",
            ),
            (
                "Fluxo seguro de 30 minutos",
                "1. Liste 3 tarefas repetitivas de texto\n2. Peça rascunhos\n3. Revise fatos\n4. Salve em pasta de templates\n5. Use na próxima ocorrência real",
            ),
            (
                "Ferramentas e custo",
                "Dá para começar no plano gratuito. Versões pagas ajudam em volume/contexto maior — não são obrigatórias no dia 1.",
            ),
            (
                "Riscos de compliance",
                "Não cole dados sensíveis de clientes. Não publique texto jurídico sem revisão. Não use IA para spam.",
            ),
            (
                "Como medir se está ajudando",
                "Tempo economizado em tarefas de escrita e redução de retrabalho. Evite métricas fantasiosas de faturamento.",
            ),
            (
                "Aprofundar",
                "O material BalcãoIA de ChatGPT para empreendedores organiza prompts por área com método claro — conteúdo educativo.",
            ),
        ],
        "faqs": [
            ("Substitui funcionário?", "Não. Acelera rascunho. Você decide e revisa."),
            ("Funciona offline?", "Não. Precisa de acesso ao serviço."),
            ("Preciso saber programar?", "Não para uso de texto e prompts."),
        ],
    },
    {
        "slug": "instagram-para-vender-localmente",
        "title": "Como usar Instagram para vender localmente (clientes, não só seguidores)",
        "desc": "Estratégia simples de Instagram para negócio de bairro: bio, conteúdo local, Reels úteis e CTA claro — sem promessa de viral.",
        "related": "instagram-negocios-locais-ia",
        "kw": "Instagram para vender localmente",
        "sections": [
            (
                "Seguidor ≠ cliente",
                "Para negócio local, o Instagram serve para ser encontrado por quem está perto e precisa do que você oferece. Viralidade é bônus, não plano.",
            ),
            (
                "Perfil que reduz atrito",
                "Bio com o que você faz + para quem + cidade/bairro + CTA (WhatsApp/link). Destaques com preços, localização e provas reais (fotos do trabalho).",
            ),
            (
                "Conteúdo que atrai demanda local",
                "Tipos úteis:\n- Bastidores verdadeiros\n- Antes/depois com consentimento\n- FAQ em Stories\n- Oferta clara (sem urgência falsa)\n- Mapa/como chegar\n- Agenda/horários",
            ),
            (
                "Reels sem câmera profissional",
                "Celular + luz + roteiro de 3 frases. IA pode rascunhar o roteiro; você grava o fato real. Foque em utilidade local, não em trend vazia.",
            ),
            (
                "Hashtags e localização",
                "Use localização real e hashtags de cidade/bairro com moderação. Evite packs genéricos irrelevantes.",
            ),
            (
                "CTA e atendimento",
                "Toda peça útil termina com próximo passo: “mande DM com seu bairro” ou “chame no WhatsApp com o código X”. Atenda rápido o que a bio promete.",
            ),
            (
                "Rotina de 30 minutos",
                "10 min: responder mensagens\n10 min: 1 Story útil\n10 min: agendar ou gravar 1 Reels da semana",
            ),
            (
                "Próximo passo",
                "Se quiser templates e rotina com IA como rascunho, veja o produto BalcãoIA de Instagram para negócios locais.",
            ),
        ],
        "faqs": [
            ("Preciso postar todo dia?", "Consistência importa mais que volume. 3–4 posts úteis/semana já organizam presença."),
            ("Ads são obrigatórios?", "Não no começo. Organizar perfil e resposta já ajuda."),
            ("Garante clientes?", "Não. Melhora chance de ser encontrado e entendido."),
        ],
    },
    {
        "slug": "produtividade-para-empreendedores",
        "title": "Produtividade para empreendedores solo: foco com evidência",
        "desc": "Sistema simples de clareza, blocos de foco e check-out diário para quem toca o negócio sozinho — sem milagre de 4h de trabalho.",
        "related": "foco-14",
        "kw": "produtividade para empreendedores",
        "sections": [
            (
                "O problema não é preguiça",
                "Empreendedor solo vive interrupção: cliente, estoque, cobrança, conteúdo. Produtividade real é proteger blocos e definir evidência do dia.",
            ),
            (
                "Clareza antes de técnica",
                "Escreva a missão do dia em uma frase. Escolha 1–3 resultados nomeáveis (ex.: “orçamento enviado”, “cardápio atualizado”). O resto é suporte.",
            ),
            (
                "Blocos de foco",
                "45–90 minutos sem notificação para a tarefa principal. Depois, janela curta de mensagens. Alternar o dia inteiro entre chat e tarefa profunda destrói ambas.",
            ),
            (
                "Check-out de 10 minutos",
                "No fim do bloco: o que ficou pronto? O que bloqueou? Qual o próximo passo de amanhã? Sem isso, o dia “some”.",
            ),
            (
                "Ferramentas mínimas",
                "Lista única, calendário e timer. Trocar de app toda semana é procrastinação sofisticada.",
            ),
            (
                "Energia e limites",
                "Sono e pausa não são luxo. Produtividade sustentável respeita capacidade. Evite culto ao overwork.",
            ),
            (
                "Protocolo de 14 dias (ideia)",
                "Dias 1–3: diagnóstico e lista real\nDias 4–7: blocos protegidos\nDias 8–11: reduzir canais de interrupção\nDias 12–14: rotina de manutenção\n\nDetalhe estruturado: FOCO 14 da BalcãoIA.",
            ),
            (
                "Métricas honestas",
                "Tarefas concluídas com evidência e sensação de controle. Evite prometer “dobrar faturamento em 14 dias”.",
            ),
        ],
        "faqs": [
            ("Funciona com atendimento o dia todo?", "Sim, com janelas. Atendimento contínuo sem bloco vira apagar incêndio."),
            ("Preciso de app pago?", "Não."),
            ("E se eu falhar um dia?", "Recomece no próximo bloco. Sistema > perfeição."),
        ],
    },
    {
        "slug": "automacao-whatsapp-business",
        "title": "Automação no WhatsApp Business: o que é ético e útil",
        "desc": "Diferença entre resposta rápida útil e spam. Como pensar automação no WhatsApp Business com práticas oficiais e revisão humana.",
        "related": "template-atendimento-automatico",
        "kw": "automação WhatsApp Business",
        "sections": [
            (
                "Automação ≠ disparo",
                "Automatizar saudação, horário e FAQ é diferente de disparar lista comprada. O primeiro reduz atraso; o segundo queima reputação e pode violar regras.",
            ),
            (
                "O que automatizar primeiro",
                "1. Mensagem de ausência com horário\n2. Menu de opções (preço / endereço / humano)\n3. Confirmação de agendamento\n4. FAQ das 5 dúvidas mais comuns",
            ),
            (
                "O que nunca automatizar sem revisão",
                "Preço dinâmico, promessa de prazo, diagnóstico clínico/jurídico, cobrança agressiva.",
            ),
            (
                "Ferramentas oficiais vs gambiarras",
                "Prefira recursos oficiais do ecossistema Meta/WhatsApp Business. Evite soluções baseadas em clientes não oficiais.",
            ),
            (
                "Desenho de fluxo simples",
                "Cliente pergunta → triagem → resposta padrão OU humano. Sempre ofereça saída para pessoa real.",
            ),
            (
                "Teste em 1 hora",
                "Escreva 5 respostas. Configure ausência. Peça a um amigo para testar o fluxo. Ajuste tom.",
            ),
            (
                "Métricas",
                "Tempo de primeira resposta e taxa de transferência para humano. Não invente “conversão garantida”.",
            ),
            (
                "Material BalcãoIA",
                "Há micro-templates e guias éticos no catálogo BalcãoIA para organizar atendimento sem gambiarra.",
            ),
        ],
        "faqs": [
            ("Posso usar robô 24h?", "Pode para triagem. Venda e exceção precisam de humano."),
            ("API é obrigatória?", "Não no dia 1. Comece pelo Business App e processos."),
            ("É seguro?", "Seguro é seguir regras oficiais e não comprar listas."),
        ],
    },
    {
        "slug": "ia-para-pequenas-empresas",
        "title": "IA para pequenas empresas: por onde começar sem se perder",
        "desc": "Roteiro de 1 hora para aplicar IA em negócio local: organização, primeiro teste e revisão humana — sem hype.",
        "related": "checklist-ia-1-hora",
        "kw": "IA para pequenas empresas",
        "sections": [
            (
                "Comece pelo problema, não pela ferramenta",
                "Liste gargalos: atendimento lento, post inconsistente, orçamento demorado. IA só entra onde há texto/repetição.",
            ),
            (
                "Primeiro teste em 60 minutos",
                "Escolha UMA tarefa. Peça rascunho. Revise. Salve template. Use amanhã de verdade. Evite instalar 5 ferramentas no mesmo dia.",
            ),
            (
                "Áreas com ROI de tempo",
                "Atendimento (FAQ), marketing (legendas), operação (checklists), financeiro (organizadores — você valida números).",
            ),
            (
                "Governança simples",
                "Quem revisa? Onde ficam os templates? Quais dados não podem ir para o chat?",
            ),
            (
                "Equipe pequena",
                "Documente o “como usamos IA aqui” em uma página. Novos ajudantes seguem o mesmo padrão.",
            ),
            (
                "Armadilhas",
                "Hype de “funcionário IA”, compra de curso eterno sem aplicar, e copy-paste sem revisão.",
            ),
            (
                "Checklist BalcãoIA",
                "O Checklist IA em 1 Hora e o BalcãoIA Pro organizam o caminho com linguagem de negócio local.",
            ),
            (
                "Expectativa correta",
                "IA economiza tempo de rascunho. Não substitui oferta boa nem atendimento humano de verdade.",
            ),
        ],
        "faqs": [
            ("Quanto custa começar?", "Muitas vezes só tempo + ferramenta gratuita."),
            ("Preciso de TI?", "Não para casos de texto e prompts."),
            ("Garante lucro?", "Não."),
        ],
    },
    {
        "slug": "aumentar-vendas-negocio-local",
        "title": "Como aumentar vendas no negócio local (sem fórmula mágica)",
        "desc": "Alavancas reais: oferta clara, presença local, atendimento rápido e prova honesta. Sem promessa de renda.",
        "related": "foco-14",
        "kw": "aumentar vendas negócio local",
        "sections": [
            (
                "Venda local é sistema",
                "Aumentar vendas costuma ser combinação de: ser encontrado, ser entendido, ser confiável e ser fácil de comprar. Não é um truque isolado.",
            ),
            (
                "Oferta clara",
                "Se o cliente não entende preço/escopo em 20 segundos, a conversa trava. Reescreva a oferta principal em uma frase + 3 bullets.",
            ),
            (
                "Presença onde a busca acontece",
                "Google Meu Negócio, Instagram local e WhatsApp organizado. Escolha 2 canais e execute bem antes de abrir o terceiro.",
            ),
            (
                "Atendimento como conversão",
                "Tempo de resposta e clareza do orçamento movem mais do que post bonito sem follow-up.",
            ),
            (
                "Prova social honesta",
                "Fotos reais, avaliações pedidas eticamente, casos sem números inventados.",
            ),
            (
                "Operação que aguenta vender",
                "Se você vende mais do que entrega, queima reputação. Ajuste capacidade antes de empurrar demanda.",
            ),
            (
                "Plano de 14 dias",
                "Semana 1: oferta + FAQ + perfil Google\nSemana 2: WhatsApp templates + 4 posts úteis + pedir 5 avaliações honestas\nMeça: orçamentos enviados e tempo de resposta — não “renda garantida”.",
            ),
            (
                "Materiais BalcãoIA",
                "Micro-guias e métodos do catálogo cobrem WhatsApp, Google, Instagram e foco operacional — sempre como educação.",
            ),
        ],
        "faqs": [
            ("Qual canal é o melhor?", "O que seu cliente já usa. Teste e meça."),
            ("Preciso de anúncio pago?", "Não no dia 1. Organize orgânico primeiro."),
            ("Em quanto tempo vejo resultado?", "Varia. Foque evidências semanais, não milagre."),
        ],
    },
]


def expand_section(title: str, body: str, kw: str) -> str:
    extra = f"""
### Aplicação no dia a dia

Quando o tema é **{kw}**, a execução vence a teoria. Reserve um bloco de 45–90 minutos, defina uma evidência (algo que você consegue mostrar) e feche com um check-out de 10 minutos.

Escreva em uma frase o resultado desejado do bloco. Exemplos honestos: “FAQ de preço atualizado”, “perfil Google com horário correto”, “3 respostas prontas no WhatsApp”. Evite metas vagas como “explodir vendas”.

### Roteiro de 25 minutos (opcional)
1. 5 min — abrir o contexto (o que travou ontem)
2. 15 min — executar a tarefa principal sem notificação
3. 5 min — registrar evidência e próximo passo

### Erros comuns
- Querer fazer tudo em um dia
- Copiar método de outro segmento sem adaptar
- Medir só vaidade (curtidas) e ignorar resposta/orçamento
- Prometer resultado financeiro a si mesmo ou ao cliente
- Trocar de ferramenta toda semana sem processar o básico

### Mini-checklist
- [ ] Objetivo do bloco escrito
- [ ] Material base atualizado
- [ ] Evidência salva (print, arquivo ou link)
- [ ] Próximo passo agendado
- [ ] Nada de claim de renda

### Nota de compliance
BalcãoIA publica conteúdo educativo. Resultados dependem do seu contexto, oferta e disciplina. Não use este texto para prometer faturamento a clientes ou afiliados.
"""
    return f"## {title}\n\n{body}\n{extra}\n"


def build(article: dict) -> str:
    parts = [
        f"# {article['title']}",
        "",
        article["desc"],
        "",
        f"## Introdução",
        "",
        f"Este guia prático sobre **{article['kw']}** é para donos de negócio local e operação solo. Conteúdo educativo da BalcãoIA: sem promessa de renda, sem atalhos ilegais e sem métricas inventadas.",
        "",
    ]
    for title, body in article["sections"]:
        parts.append(expand_section(title, body, article["kw"]))
    parts.append("## FAQ\n")
    for q, a in article["faqs"]:
        parts.append(f"### {q}\n\n{a}\n")
    parts.append(
        f"## Próximo passo\n\nVeja o produto relacionado: [/produtos/{article['related']}](/produtos/{article['related']}) · Catálogo: [/vendas](/vendas) · Mais artigos: [/blog](/blog)\n"
    )
    parts.append(
        "\n---\n\n*BalcãoIA — educação para negócios locais. Resultados variam conforme execução e contexto.*\n"
    )
    return "\n".join(parts)


def main() -> None:
    DIR.mkdir(parents=True, exist_ok=True)
    for art in ARTICLES:
        path = DIR / f"{art['slug']}.md"
        text = build(art)
        path.write_text(text, encoding="utf-8")
        words = len(text.split())
        print(f"OK {art['slug']} ~{words} palavras")


if __name__ == "__main__":
    main()

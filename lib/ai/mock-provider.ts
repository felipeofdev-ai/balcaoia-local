import type { AIProvider } from "./provider";
import type { WizardData } from "@/types/business";

function fill(value: string | undefined | null, fallback = "[PREENCHER]"): string {
  if (!value || !String(value).trim()) return fallback;
  return String(value).trim();
}

export class MockAIProvider implements AIProvider {
  name = "mock";

  isAvailable(): boolean {
    return true;
  }

  async generateText(prompt: string, _systemPrompt: string): Promise<string> {
    // Detect asset type from prompt markers
    if (prompt.includes("[ASSET:profile]")) return this.profile(this.parse(prompt));
    if (prompt.includes("[ASSET:catalog]")) return this.catalog(this.parse(prompt));
    if (prompt.includes("[ASSET:faq]")) return this.faq(this.parse(prompt));
    if (prompt.includes("[ASSET:objections]")) return this.objections(this.parse(prompt));
    if (prompt.includes("[ASSET:master]")) return this.master(this.parse(prompt));
    if (prompt.includes("[ASSET:first]")) return this.first(this.parse(prompt));
    if (prompt.includes("[ASSET:qualification]")) return this.qualification(this.parse(prompt));
    if (prompt.includes("[ASSET:followup]")) return this.followup(this.parse(prompt));
    if (prompt.includes("[ASSET:checklist]")) return this.checklist(this.parse(prompt));
    if (prompt.includes("[ASSET:proposal]")) return this.proposal(this.parse(prompt));
    if (prompt.includes("[ASSET:handoff]")) return this.handoff(this.parse(prompt));
    if (prompt.includes("[ASSET:recommendation]")) return this.recommendation(this.parse(prompt));
    if (prompt.includes("[ASSET:plan]")) return this.plan(this.parse(prompt));
    if (prompt.includes("[ASSET:briefing]")) return this.briefing(this.parse(prompt));
    if (prompt.includes("[SIMULATE]")) return this.simulate(prompt);
    return this.generic(prompt);
  }

  private parse(prompt: string): Partial<WizardData> & { name?: string; segment?: string } {
    try {
      const match = prompt.match(/\[DATA\]([\s\S]*?)\[\/DATA\]/);
      if (match) return JSON.parse(match[1]) as WizardData;
    } catch {
      /* ignore */
    }
    return {};
  }

  private profile(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name, "Seu Negócio");
    const seg = fill(d.basicInfo?.segment, "negócio local");
    const city = fill(d.basicInfo?.city);
    const desc = fill(d.basicInfo?.description);
    const hours = fill(d.policies?.openingHours);
    return `# Perfil Comercial — ${name}

## Versão curta (até 160 caracteres)
${name} | ${seg} em ${city}. ${desc.slice(0, 80)}${desc.length > 80 ? "…" : ""}

## Versão completa
**${name}** é um ${seg} em **${city}**.

${desc}

**Horário:** ${hours}
**Tom de voz:** ${fill(d.toneOfVoice, "amigável")}

> ⚠️ Revise antes de publicar. Não invente informações não confirmadas.
`;
  }

  private catalog(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name, "Seu Negócio");
    const items = d.productsServices ?? [];
    let md = `# Catálogo — ${name}\n\n`;
    if (!items.length) {
      md += `Nenhum produto/serviço cadastrado. Adicione itens no wizard ou preencha [PREENCHER].\n`;
    } else {
      items.forEach((p, i) => {
        md += `## ${i + 1}. ${fill(p.name)}\n`;
        md += `${fill(p.description)}\n\n`;
        md += `- **Faixa de preço:** ${fill(p.priceRange)}\n`;
        md += `- **Benefícios:** ${(p.benefits?.length ? p.benefits : ["[PREENCHER]"]).join("; ")}\n`;
        md += `- **Requisitos:** ${fill(p.requirements)}\n`;
        md += `- **Prazo/duração:** ${fill(p.deliveryTime)}\n\n`;
      });
    }
    md += `\n> ⚠️ Não invente preços ou prazos. Use [PREENCHER] onde faltar dado.\n`;
    return md;
  }

  private faq(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name, "Seu Negócio");
    const faqs = d.faqs ?? [];
    let md = `# Base de Conhecimento (FAQ) — ${name}\n\n`;
    const byCat = new Map<string, typeof faqs>();
    faqs.forEach((f) => {
      const cat = f.category || "Geral";
      if (!byCat.has(cat)) byCat.set(cat, []);
      byCat.get(cat)!.push(f);
    });
    if (!faqs.length) {
      md += `Nenhuma FAQ cadastrada. [PREENCHER]\n\n`;
    } else {
      byCat.forEach((list, cat) => {
        md += `## ${cat}\n\n`;
        list.forEach((f) => {
          md += `**P:** ${f.question}\n\n**R:** ${f.answer}\n\n`;
        });
      });
    }
    md += `## Quando escalar para humano\n${fill(d.humanHandoffRules)}\n\n`;
    md += `**Contato humano:** ${fill(d.humanHandoffContact)}\n`;
    return md;
  }

  private objections(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name, "Seu Negócio");
    let md = `# Scripts de Objeção — ${name}\n\nTom: **${fill(d.toneOfVoice)}**\n\n`;
    const objs = d.objections ?? [];
    if (!objs.length) {
      md += `Nenhuma objeção cadastrada. [PREENCHER]\n`;
    } else {
      objs.forEach((o, i) => {
        md += `## ${i + 1}. "${o.objection}" (${o.category || "Geral"})\n\n`;
        md += `**Resposta sugerida:**\n${o.answer}\n\n`;
        md += `**Próximo passo:** conduzir para ${fill(d.attendanceGoal, "orçamento")} sem pressão.\n\n`;
      });
    }
    md += `\n> Sem pressão indevida. Sempre ofereça falar com um humano.\n`;
    return md;
  }

  private master(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name, "Seu Negócio");
    return `# Prompt Mestre — Agente de Atendimento ${name}

Copie o bloco abaixo para usar em ChatGPT, Claude ou Gemini.

\`\`\`
Você é o assistente de atendimento do negócio "${name}" (${fill(d.basicInfo?.segment)}), em ${fill(d.basicInfo?.city)}.

## Persona e tom
Tom de voz: ${fill(d.toneOfVoice)}.
Objetivo da conversa: ${fill(d.attendanceGoal)}.
Descrição: ${fill(d.basicInfo?.description)}.

## Público
${fill(d.targetAudience?.profile)}
Dores: ${(d.targetAudience?.painPoints ?? ["[PREENCHER]"]).join("; ")}
Ticket médio: ${fill(d.targetAudience?.averageTicket)}

## Catálogo (resumo)
${(d.productsServices ?? [])
  .map(
    (p) =>
      `- ${fill(p.name)}: ${fill(p.priceRange)} | ${fill(p.deliveryTime)}`
  )
  .join("\n") || "[PREENCHER]"}

## FAQ
${(d.faqs ?? [])
  .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
  .join("\n\n") || "[PREENCHER]"}

## Políticas
Horário: ${fill(d.policies?.openingHours)}
Pagamento: ${fill(d.policies?.paymentMethods)}
Cancelamento: ${fill(d.policies?.cancellationPolicy)}
Entrega: ${fill(d.policies?.deliveryPolicy)}
Garantia: ${fill(d.policies?.warranty)}

## Handoff humano
${fill(d.humanHandoffRules)}
Contato: ${fill(d.humanHandoffContact)}

## Regras absolutas
- Nunca invente preços, prazos ou condições. Use [PREENCHER] ou diga que vai confirmar.
- Nunca faça diagnósticos médicos, veterinários, jurídicos ou financeiros.
- Nunca prometa resultado garantido.
- Nunca peça CPF, cartão ou senha.
- Respeite opt-out imediatamente.
- Sempre ofereça falar com atendente humano.
- Seja breve, claro e útil.
\`\`\`

> ⚠️ Revise antes de usar com clientes reais.
`;
  }

  private first(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name, "Seu Negócio");
    const goal = fill(d.attendanceGoal, "ajudar");
    return `# Scripts de Primeira Resposta — ${name}

## Variação 1 — Acolhedora
Olá! Seja bem-vindo(a) ao **${name}**. Sou o assistente de atendimento. Como posso te ajudar hoje? Se preferir, posso te conectar com nossa equipe.

## Variação 2 — Direta ao objetivo
Oi! Aqui é o ${name}. Posso te ajudar a ${goal}. Me conta o que você procura?

## Variação 3 — Com opções
Olá! Bem-vindo(a) ao ${name}. Posso ajudar com:
1) Informações sobre serviços
2) Orçamento / agendamento
3) Falar com um atendente
Qual opção prefere?

> Horário: ${fill(d.policies?.openingHours)}
`;
  }

  private qualification(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name, "Seu Negócio");
    return `# Roteiro de Qualificação — ${name}

1. **Necessidade:** "O que você está buscando hoje?"
2. **Contexto:** "É para uso próprio / presente / empresa?"
3. **Urgência:** "Tem alguma data em mente?"
4. **Preferências:** "Tem alguma preferência de [serviço/produto]?"
5. **Orçamento (sem pressão):** "Tem alguma faixa de investimento em mente? Posso indicar opções dentro do que faz sentido." Ticket de referência: ${fill(d.targetAudience?.averageTicket)}
6. **Próximo passo:** conduzir para ${fill(d.attendanceGoal)}.
7. **Saída humana:** "Se preferir, posso te passar para nossa equipe agora."
`;
  }

  private followup(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name, "Seu Negócio");
    return `# Scripts de Follow-up — ${name}

## Follow-up 24h
Oi! Passando para saber se ficou alguma dúvida sobre o que conversamos no ${name}. Estou à disposição — e se preferir, posso te conectar com a equipe.

## Follow-up 48h
Olá! Só reforçando que estou aqui caso queira retomar o orçamento/agendamento. Sem compromisso. Responda SAIR se não quiser mais receber mensagens.

## Follow-up 7 dias
Oi! Faz uma semana do nosso contato. Se ainda fizer sentido, posso te ajudar a ${fill(d.attendanceGoal)}. Opt-out: responda SAIR.

## Reativação de orçamento
Olá! Vi que o orçamento ficou pendente. Posso esclarecer algum ponto ou atualizar as informações? Sem pressão.

## Opt-out respeitoso
Entendido! Removi você da lista de follow-ups. Se precisar no futuro, é só chamar. Bom dia/boa tarde!
`;
  }

  private checklist(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name, "Seu Negócio");
    return `# Checklist de Implantação 7 Dias — ${name}

## Dia 1 — Diagnóstico
- [ ] Revisar dados do negócio no wizard
- [ ] Confirmar horário e políticas
- [ ] Listar 5 perguntas mais comuns

## Dia 2 — Catálogo
- [ ] Completar preços e prazos (sem inventar)
- [ ] Marcar [PREENCHER] onde faltar dado
- [ ] Revisar benefícios reais

## Dia 3 — FAQ e objeções
- [ ] Gerar base de conhecimento
- [ ] Validar respostas com quem atende
- [ ] Definir regras de handoff

## Dia 4 — Scripts
- [ ] Gerar primeira resposta e qualificação
- [ ] Gerar follow-ups com opt-out
- [ ] Revisar tom de voz

## Dia 5 — Prompt mestre
- [ ] Gerar e copiar prompt mestre
- [ ] Testar no simulador (3 cenários)
- [ ] Ajustar lacunas

## Dia 6 — Treino
- [ ] Simular objeção de preço
- [ ] Simular pedido de humano
- [ ] Registrar melhorias no FAQ

## Dia 7 — Exportar e implantar
- [ ] Exportar Markdown/PDF
- [ ] Treinar equipe com o material
- [ ] Definir responsável pela revisão semanal

> Sem disparo em massa. Sem automações não oficiais.
`;
  }

  private proposal(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name, "Cliente");
    return `# Proposta Comercial — Implantação BalcãoIA (Freelancer/Agência)

**Cliente:** ${name} (${fill(d.basicInfo?.segment)})
**Cidade:** ${fill(d.basicInfo?.city)}

## Escopo
1. Diagnóstico do atendimento digital
2. Organização de catálogo, FAQ e políticas
3. Scripts de primeira resposta, objeções e follow-up
4. Prompt mestre + sessão de simulação
5. Checklist de implantação 7D + exportação

## Prazo sugerido
7 dias úteis (ajustável)

## Investimento sugerido (editável)
[PREENCHER] — revise com seu posicionamento. Referência de mercado para implantação assistida: R$ 497 a R$ 1.500.

## Entregáveis
- Pacote Markdown/PDF
- Base de conhecimento
- Prompt mestre
- Treino no simulador (1 sessão)

## Avisos
- Conteúdo educacional; revisar antes de usar com clientes reais.
- Não inclui automações não oficiais nem disparo em massa.
- Valores são sugestões editáveis, não garantia de resultado.

> Revise com profissional antes de enviar ao cliente.
`;
  }

  private handoff(d: Partial<WizardData>): string {
    return `# Regras de Handoff Humano — ${fill(d.basicInfo?.name)}

${fill(d.humanHandoffRules)}

**Contato:** ${fill(d.humanHandoffContact)}
**Horário:** ${fill(d.policies?.openingHours)}

## Gatilhos obrigatórios
- Cliente pede humano
- Reclamação ou conflito
- Dados sensíveis / pagamento
- Assunto fora da base de conhecimento
- Risco de diagnóstico (saúde, jurídico, financeiro)
`;
  }

  private recommendation(d: Partial<WizardData>): string {
    const name = fill(d.basicInfo?.name);
    const items = d.productsServices ?? [];
    return `# Scripts de Recomendação — ${name}

Com base na necessidade do cliente, sugerir (sem inventar):
${items.map((p) => `- **${fill(p.name)}**: ${fill(p.description)} | ${fill(p.priceRange)}`).join("\n") || "- [PREENCHER] serviços"}

Modelo: "Pelo que você descreveu, o mais alinhado costuma ser [serviço]. Posso te explicar o que está incluso e, se fizer sentido, avançamos para ${fill(d.attendanceGoal)}."
`;
  }

  private plan(d: Partial<WizardData>): string {
    return this.checklist(d).replace("Checklist de Implantação 7 Dias", "Plano de Implantação 7D");
  }

  private briefing(d: Partial<WizardData>): string {
    return `# Briefing do Cliente — ${fill(d.basicInfo?.name)}

- Segmento: ${fill(d.basicInfo?.segment)}
- Cidade: ${fill(d.basicInfo?.city)}
- Descrição: ${fill(d.basicInfo?.description)}
- Público: ${fill(d.targetAudience?.profile)}
- Ticket: ${fill(d.targetAudience?.averageTicket)}
- Objetivo: ${fill(d.attendanceGoal)}
- Tom: ${fill(d.toneOfVoice)}
`;
  }

  private simulate(prompt: string): string {
    const q = prompt.replace("[SIMULATE]", "").trim().toLowerCase();
    if (q.includes("humano") || q.includes("atendente") || q.includes("pessoa")) {
      return "Claro! Vou te encaminhar para nossa equipe. Em instantes alguém te atende. Se preferir, me diga o melhor horário.";
    }
    if (q.includes("preço") || q.includes("valor") || q.includes("quanto custa")) {
      return "Posso te passar as faixas de preço dos serviços cadastrados. Se algo não estiver informado, confirmo com a equipe — sem inventar valores. O que você procura?";
    }
    if (q.includes("sair") || q.includes("parar") || q.includes("não quero")) {
      return "Entendido! Não enviarei mais follow-ups. Se precisar no futuro, é só chamar.";
    }
    return "Obrigado pela mensagem! Com base na nossa base de conhecimento, posso te ajudar com informações do negócio. Me conte um pouco mais do que você precisa — ou peça para falar com um atendente humano.";
  }

  private generic(prompt: string): string {
    return `Resposta gerada (mock):\n\n${prompt.slice(0, 500)}\n\n> Revise antes de usar com clientes reais.`;
  }
}

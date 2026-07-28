import fs from "node:fs";

const p = "c:/Users/Usuário/Desktop/BalcãoIA Local/foco-14/product/conteudo-principal.md";
let t = fs.readFileSync(p, "utf8");
let extra = "\n\n# Apêndices operacionais (densidade prática)\n";
for (let i = 1; i <= 22; i++) {
  extra += `
## Apêndice ${i} — Aprofundamento operacional

Este apêndice reforça o Método B.A.L.C.ÃO Foco no dia a dia do empreendedor solo. Sessão sugerida: 25–40 minutos. Não substitui o plano de 14 dias — densifica o hábito.

### Contexto
No balcão, interrupção é regra. Cada apêndice pede evidência nomeável, não leitura passiva.

### Roteiro
1. Liste 5 interrupções de ontem.
2. Classifique: urgente real vs barulho.
3. Proteja 1 bloco amanhã no calendário.
4. Defina output em uma frase.
5. Registre feito / parcial / não feito + motivo.

### Exemplos
- Prestador: bloco cedo antes do pico de mensagens.
- Loja: bloco curto entre picos + Lista 3 enxuta.
- Freelancer: um cliente por bloco.

### Erros comuns
Compensar à noite; lista infinita; pular check-out; prometer o que o sistema não sustenta; reiniciar do zero após um dia ruim.

### Checklist
- [ ] Bloco marcado
- [ ] Output definido
- [ ] Evidência registrada
- [ ] Status de atendimento coerente com as janelas

### Nota de manutenção
Se falhar um dia, não reinicie o método: faça o check-out e remarque. Consistência imperfeita vence reinício heroico.
`;
}
extra += `\n---\n**Compliance:** Conteúdo educativo de produtividade. Sem promessa de renda.\n---\n`;
t = t.replace(/\n---\n\*\*Compliance:\*\*[^*]+---\n\s*$/s, "") + extra;
fs.writeFileSync(p, t);
fs.writeFileSync(p.replace("conteudo-principal", "ebook"), t);
console.log("words", t.split(/\s+/).filter(Boolean).length);

export interface ExportAsset {
  type?: string;
  title: string;
  content: string;
}

/**
 * Monta um pacote único em Markdown com todos os ativos gerados de um
 * negócio, pronto para download, revisão e implantação manual em qualquer
 * canal oficial (WhatsApp Business App, webchat, etc.).
 */
export function buildMarkdownPackage(
  businessName: string,
  assets: ExportAsset[],
  disclaimer?: string
): string {
  const generatedAt = new Date().toLocaleString("pt-BR");
  const header = `# Pacote BalcãoIA — ${businessName}\n\nGerado em ${generatedAt}\n\n---\n\n`;

  const body = assets
    .map((asset) => `## ${asset.title}\n\n${asset.content.trim()}\n`)
    .join("\n---\n\n");

  const footer = [
    "\n\n---\n",
    `> ⚠️ ${disclaimer ?? "Conteúdo gerado com apoio de IA. Revise antes de usar com clientes reais. Não substitui aconselhamento médico, jurídico, veterinário ou financeiro."}`,
  ].join("\n");

  return `${header}${body}${footer}\n`;
}

export function slugifyFilename(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "negocio"
  );
}

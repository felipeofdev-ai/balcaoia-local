export interface PdfExportAsset {
  title: string;
  content: string;
}

export interface PdfExportResult {
  ok: boolean;
  bytes?: Uint8Array;
  fallbackMessage?: string;
}

/** Mensagem padrão exibida quando a geração de PDF não está disponível no ambiente. */
export function pdfFallbackMessage(): string {
  return (
    "Exportação em PDF indisponível neste ambiente. Use a exportação em Markdown (.md) — " +
    "você pode abri-la em qualquer editor de texto ou navegador e gerar um PDF com " +
    '"Imprimir > Salvar como PDF".'
  );
}

const PAGE_MARGIN = 15;
const LINE_HEIGHT = 6;
const PAGE_HEIGHT = 297; // A4 em mm

/**
 * Gera um PDF simples (texto corrido, sem estilos avançados) com o pacote de
 * ativos do negócio. Tenta usar `jspdf`; se a biblioteca não estiver
 * disponível ou falhar no ambiente de execução, retorna uma mensagem de
 * fallback clara para o usuário optar pela exportação em Markdown.
 */
export async function buildPdfPackage(
  businessName: string,
  assets: PdfExportAsset[]
): Promise<PdfExportResult> {
  try {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    let y = PAGE_MARGIN;

    const addLine = (text: string, options?: { bold?: boolean; size?: number }) => {
      if (y > PAGE_HEIGHT - PAGE_MARGIN) {
        doc.addPage();
        y = PAGE_MARGIN;
      }
      doc.setFont("helvetica", options?.bold ? "bold" : "normal");
      doc.setFontSize(options?.size ?? 11);
      doc.text(text, PAGE_MARGIN, y);
      y += LINE_HEIGHT;
    };

    const addWrapped = (text: string, options?: { bold?: boolean; size?: number }) => {
      doc.setFont("helvetica", options?.bold ? "bold" : "normal");
      doc.setFontSize(options?.size ?? 11);
      const lines = doc.splitTextToSize(text, 210 - PAGE_MARGIN * 2) as string[];
      lines.forEach((line) => addLine(line, options));
    };

    addLine(`Pacote BalcãoIA — ${businessName}`, { bold: true, size: 16 });
    addLine(`Gerado em ${new Date().toLocaleString("pt-BR")}`, { size: 9 });
    y += 2;

    assets.forEach((asset) => {
      y += 2;
      addLine(asset.title, { bold: true, size: 13 });
      const plainText = asset.content
        .replace(/^#+\s*/gm, "")
        .replace(/\*\*/g, "")
        .replace(/`/g, "");
      plainText.split("\n").forEach((paragraph) => {
        if (!paragraph.trim()) {
          y += LINE_HEIGHT / 2;
          return;
        }
        addWrapped(paragraph);
      });
    });

    const arrayBuffer = doc.output("arraybuffer") as ArrayBuffer;
    return { ok: true, bytes: new Uint8Array(arrayBuffer) };
  } catch (error) {
    console.error("[pdf-export] falha ao gerar PDF", error);
    return { ok: false, fallbackMessage: pdfFallbackMessage() };
  }
}

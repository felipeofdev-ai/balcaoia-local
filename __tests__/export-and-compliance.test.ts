import { describe, expect, it } from "vitest";
import { buildMarkdownPackage, slugifyFilename } from "@/lib/utils/markdown-export";
import { buildPdfPackage, pdfFallbackMessage } from "@/lib/utils/pdf-export";
import {
  assertChannelNameIsCompliant,
  ComplianceError,
  detectForbiddenChannelTerm,
  isChannelNameCompliant,
} from "@/lib/utils/compliance";

describe("buildMarkdownPackage", () => {
  it("combines multiple assets into a single markdown document", () => {
    const md = buildMarkdownPackage("Salão Bella Arte", [
      { title: "Perfil Comercial", content: "Conteúdo do perfil." },
      { title: "Catálogo", content: "Conteúdo do catálogo." },
    ]);

    expect(md).toContain("Salão Bella Arte");
    expect(md).toContain("## Perfil Comercial");
    expect(md).toContain("## Catálogo");
    expect(md).toContain("Conteúdo do perfil.");
    expect(md).toContain("⚠️");
  });

  it("uses a custom disclaimer when provided", () => {
    const md = buildMarkdownPackage("Negócio X", [{ title: "FAQ", content: "..." }], "Aviso customizado.");
    expect(md).toContain("Aviso customizado.");
  });
});

describe("slugifyFilename", () => {
  it("removes accents and special characters", () => {
    expect(slugifyFilename("Salão Bella Arte & Cia!")).toBe("salao-bella-arte-cia");
  });

  it("falls back to 'negocio' for empty input", () => {
    expect(slugifyFilename("   ")).toBe("negocio");
  });
});

describe("pdf-export", () => {
  it("provides a clear fallback message", () => {
    expect(pdfFallbackMessage()).toContain("Markdown");
  });

  it("builds a PDF byte buffer for a simple asset package", async () => {
    const result = await buildPdfPackage("Negócio Teste", [
      { title: "Perfil", content: "Descrição de teste do negócio." },
    ]);
    expect(result.ok).toBe(true);
    expect(result.bytes?.length).toBeGreaterThan(0);
  });
});

describe("compliance — forbidden channel terms", () => {
  it("detects openwa/baileys/venom/evolution_api/wa_automate/qrcode variants", () => {
    expect(detectForbiddenChannelTerm("Bot via OpenWA")).toBe("openwa");
    expect(detectForbiddenChannelTerm("Integração Baileys")).toBe("baileys");
    expect(detectForbiddenChannelTerm("Venom Bot Atendimento")).toBe("venom");
    expect(detectForbiddenChannelTerm("Evolution API Connector")).toBe("evolution_api");
    expect(detectForbiddenChannelTerm("WA-Automate Runner")).toBe("wa_automate");
    expect(detectForbiddenChannelTerm("Leitor de QR Code")).toBe("qrcode_scraping");
  });

  it("does not flag compliant channel names", () => {
    expect(detectForbiddenChannelTerm("WhatsApp Cloud API")).toBeNull();
    expect(detectForbiddenChannelTerm("Webchat do site")).toBeNull();
    expect(isChannelNameCompliant("Exportação Manual")).toBe(true);
  });

  it("assertChannelNameIsCompliant throws ComplianceError for forbidden names", () => {
    expect(() => assertChannelNameIsCompliant("Automação via Baileys")).toThrow(ComplianceError);
  });

  it("assertChannelNameIsCompliant does not throw for compliant names", () => {
    expect(() => assertChannelNameIsCompliant("WhatsApp Cloud API oficial")).not.toThrow();
  });
});

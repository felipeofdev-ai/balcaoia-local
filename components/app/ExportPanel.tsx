"use client";

import * as React from "react";
import { Download, FileText, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ASSET_TYPE_LIST } from "@/lib/asset-types";
import type { LocalBusiness } from "@/lib/local-store";

export interface ExportPanelProps {
  business: LocalBusiness;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function downloadMarkdown(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ExportPanel({ business }: ExportPanelProps) {
  const availableTypes = ASSET_TYPE_LIST.filter((a) => business.assets?.[a.type]?.content);
  const [selected, setSelected] = React.useState<string[]>(() => availableTypes.map((a) => a.type));

  React.useEffect(() => {
    setSelected(availableTypes.map((a) => a.type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(business.assets ?? {}).length]);

  function toggle(type: string) {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function buildCombinedMarkdown(types: string[]) {
    const sections = types
      .map((type) => {
        const meta = ASSET_TYPE_LIST.find((a) => a.type === type);
        const asset = business.assets[type];
        if (!meta || !asset) return "";
        return `# ${meta.title}\n\n${asset.content}\n\n---\n`;
      })
      .filter(Boolean);
    return `# Pacote BalcãoIA — ${business.name}\n\nGerado em ${new Date().toLocaleString(
      "pt-BR"
    )}\n\n---\n\n${sections.join("\n")}`;
  }

  function handleExportSelected() {
    if (!selected.length) return;
    const content = buildCombinedMarkdown(selected);
    downloadMarkdown(`${slugify(business.name || "negocio")}-selecionados.md`, content);
  }

  function handleExportAll() {
    const allTypes = availableTypes.map((a) => a.type);
    if (!allTypes.length) return;
    const content = buildCombinedMarkdown(allTypes);
    downloadMarkdown(`${slugify(business.name || "negocio")}-completo.md`, content);
  }

  function handleExportSingle(type: string) {
    const meta = ASSET_TYPE_LIST.find((a) => a.type === type);
    const asset = business.assets[type];
    if (!meta || !asset) return;
    downloadMarkdown(
      `${slugify(business.name || "negocio")}-${slugify(meta.title)}.md`,
      `# ${meta.title} — ${business.name}\n\n${asset.content}\n`
    );
  }

  if (!availableTypes.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
          <Package className="h-8 w-8 text-[var(--muted-foreground)]" />
          <p className="text-sm text-[var(--muted-foreground)]">
            Gere pelo menos um script na página de Scripts para poder exportar.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selecionar conteúdos para exportar</CardTitle>
        <CardDescription>
          Escolha os materiais que deseja baixar em Markdown (.md) para revisar, imprimir ou colar
          em outra ferramenta.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)]">
          {availableTypes.map((meta) => (
            <li key={meta.type} className="flex items-center justify-between gap-3 px-4 py-3">
              <label className="flex flex-1 cursor-pointer items-center gap-3">
                <Checkbox
                  checked={selected.includes(meta.type)}
                  onChange={() => toggle(meta.type)}
                />
                <div>
                  <p className="text-sm font-medium text-[var(--brand-graphite)]">{meta.title}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{meta.description}</p>
                </div>
              </label>
              <div className="flex items-center gap-2">
                <Badge variant="petrol">Gerado</Badge>
                <Button variant="ghost" size="sm" onClick={() => handleExportSingle(meta.type)}>
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 pt-1">
          <Button onClick={handleExportSelected} disabled={!selected.length}>
            <Download className="h-4 w-4" />
            Baixar selecionados ({selected.length})
          </Button>
          <Button variant="outline" onClick={handleExportAll}>
            <Package className="h-4 w-4" />
            Baixar pacote completo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

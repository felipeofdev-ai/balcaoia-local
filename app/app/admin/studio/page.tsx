"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getAllEbookIdeas } from "@/lib/market-research/trends";

function StudioInner() {
  const search = useSearchParams();
  const ideas = getAllEbookIdeas();
  const [slug, setSlug] = React.useState(search.get("slug") || ideas[0]?.slug || "");
  const [mode, setMode] = React.useState<"outline" | "full">("outline");
  const [authorName, setAuthorName] = React.useState("BalcãoIA");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<{
    title: string;
    markdownPreview: string;
    metadata: Record<string, unknown>;
  } | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/ebooks/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, mode, authorName, format: "json" }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Falha");
      const chapters = (data.ebook.chapters as Array<{ title: string; content: string }>)
        .map((c) => `## ${c.title}\n\n${c.content.slice(0, 400)}…`)
        .join("\n\n");
      setResult({
        title: data.ebook.title,
        markdownPreview: `${data.ebook.introduction.slice(0, 600)}…\n\n${chapters}`,
        metadata: data.metadata,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao gerar");
    } finally {
      setLoading(false);
    }
  }

  async function downloadMarkdown() {
    const res = await fetch("/api/ebooks/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, mode, authorName, format: "markdown" }),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-[var(--brand-graphite)]">
          <Sparkles className="h-6 w-6 text-[var(--brand-amber-dark)]" />
          Studio de criação
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Gere ebooks em modo outline (rápido) ou full (IA — use com chave configurada).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gerar ebook</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="slug">Produto</Label>
            <select
              id="slug"
              className="mt-1.5 w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            >
              {ideas.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.title} — {formatPrice(i.price)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              className="mt-1.5"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={mode === "outline" ? "default" : "outline"}
              onClick={() => setMode("outline")}
            >
              Outline (recomendado)
            </Button>
            <Button
              type="button"
              variant={mode === "full" ? "default" : "outline"}
              onClick={() => setMode("full")}
            >
              Full IA
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="amber" loading={loading} onClick={handleGenerate}>
              Gerar
            </Button>
            <Button variant="outline" disabled={loading} onClick={downloadMarkdown}>
              Baixar Markdown
            </Button>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{result.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <pre className="overflow-auto rounded-lg bg-[var(--muted)] p-4 text-xs">
              {JSON.stringify(result.metadata, null, 2)}
            </pre>
            <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-lg border border-[var(--border)] p-4 text-xs">
              {result.markdownPreview}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function formatPrice(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function StudioAdminPage() {
  return (
    <React.Suspense fallback={null}>
      <StudioInner />
    </React.Suspense>
  );
}

"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Clock, RefreshCcw, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/CopyButton";
import { cn } from "@/lib/utils";

export interface AssetCardProps {
  title: string;
  description?: string;
  content?: string;
  modelUsed?: string;
  updatedAt?: string;
  loading?: boolean;
  onGenerate: () => void;
  className?: string;
}

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export function AssetCard({
  title,
  description,
  content,
  modelUsed,
  updatedAt,
  loading = false,
  onGenerate,
  className,
}: AssetCardProps) {
  const generated = Boolean(content);

  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {description && <CardDescription className="mt-1">{description}</CardDescription>}
        </div>
        <Badge variant={generated ? "petrol" : "secondary"} className="shrink-0">
          {generated ? "Gerado" : "Não gerado"}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {generated ? (
          <>
            <div className="markdown-body max-h-80 overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--muted)]/40 p-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                <Clock className="h-3.5 w-3.5" />
                {updatedAt ? `Atualizado em ${formatDate(updatedAt)}` : ""}
                {modelUsed ? ` · modelo: ${modelUsed}` : ""}
              </div>
              <div className="flex items-center gap-2">
                <CopyButton text={content ?? ""} />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onGenerate}
                  loading={loading}
                >
                  <RefreshCcw className="h-4 w-4" />
                  Gerar novamente
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[var(--border)] bg-[var(--muted)]/30 px-4 py-10 text-center">
            <p className="text-sm text-[var(--muted-foreground)]">
              Este conteúdo ainda não foi gerado.
            </p>
            <Button onClick={onGenerate} loading={loading}>
              <Sparkles className="h-4 w-4" />
              Gerar com IA
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

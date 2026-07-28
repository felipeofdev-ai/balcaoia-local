import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VSLPlaceholderProps {
  title?: string;
  caption?: string;
  duration?: string;
  /** URL de embed (YouTube/Vimeo/Panda). Se vazia, mostra placeholder premium. */
  embedUrl?: string;
  className?: string;
}

function toEmbedSrc(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${u.pathname.replace("/", "")}?rel=0`;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}?rel=0`;
      if (u.pathname.includes("/embed/")) return url;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  } catch {
    return url;
  }
}

/**
 * Player de VSL: usa embed real quando `embedUrl` estiver configurada
 * (NEXT_PUBLIC_VSL_*), senão exibe placeholder pronto para conversão.
 */
export function VSLPlaceholder({
  title = "Assista antes de continuar",
  caption,
  duration,
  embedUrl,
  className,
}: VSLPlaceholderProps) {
  if (embedUrl) {
    return (
      <div className={cn("mx-auto w-full max-w-3xl", className)}>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <iframe
            src={toEmbedSrc(embedUrl)}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {caption && (
          <p className="mt-3 text-center text-xs text-[var(--muted-foreground)]">{caption}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-3xl", className)}>
      <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-[var(--brand-graphite-dark)] shadow-2xl">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(15,76,117,0.55), transparent 60%), radial-gradient(circle at 80% 80%, rgba(245,166,35,0.25), transparent 55%)",
          }}
        />
        <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6 text-center text-white">
          <div
            role="img"
            aria-label="Área do vídeo"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-amber)] text-[var(--brand-graphite)] shadow-lg sm:h-20 sm:w-20"
          >
            <Play className="ml-1 h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" />
          </div>
          <p className="max-w-md text-balance text-sm font-semibold text-white/90 sm:text-base">
            {title}
          </p>
          {duration && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
              {duration}
            </span>
          )}
          <p className="max-w-sm text-xs text-white/50">
            Configure <code className="text-white/70">NEXT_PUBLIC_VSL_VENDAS_URL</code> com o link
            do seu vídeo (YouTube, Vimeo ou Panda) para ativar o player.
          </p>
        </div>
      </div>
      {caption && (
        <p className="mt-3 text-center text-xs text-[var(--muted-foreground)]">{caption}</p>
      )}
    </div>
  );
}

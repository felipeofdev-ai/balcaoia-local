import { cn } from "@/lib/utils";

export interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
            light
              ? "bg-white/10 text-[var(--brand-amber)]"
              : "bg-[var(--brand-amber)]/15 text-[var(--brand-amber-dark)]"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-bold tracking-tight sm:text-4xl",
          light ? "text-white" : "text-[var(--brand-graphite)]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-balance text-base sm:text-lg",
            light ? "text-white/70" : "text-[var(--muted-foreground)]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

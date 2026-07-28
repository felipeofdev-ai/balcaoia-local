import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[var(--border)] bg-[var(--muted)]/40 px-6 py-14 text-center",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-petrol)]/10">
        <Icon className="h-6 w-6 text-[var(--brand-petrol)]" />
      </div>
      <h3 className="text-base font-semibold text-[var(--brand-graphite)]">
        {title}
      </h3>
      {description && (
        <p className="max-w-sm text-sm text-[var(--muted-foreground)]">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

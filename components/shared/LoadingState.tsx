import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
}

const sizeMap = {
  sm: "h-4 w-4",
  default: "h-6 w-6",
  lg: "h-9 w-9",
};

export function LoadingState({
  message = "Carregando...",
  className,
  size = "default",
}: LoadingStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-center",
        className
      )}
    >
      <Loader2
        className={cn("animate-spin text-[var(--brand-petrol)]", sizeMap[size])}
      />
      {message && (
        <p className="text-sm text-[var(--muted-foreground)]">{message}</p>
      )}
    </div>
  );
}

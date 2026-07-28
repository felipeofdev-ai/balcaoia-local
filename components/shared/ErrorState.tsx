import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Algo deu errado",
  message = "Não foi possível concluir essa ação. Tente novamente em instantes.",
  onRetry,
  retryLabel = "Tentar novamente",
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 px-6 py-12 text-center",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="text-base font-semibold text-red-800">{title}</h3>
      <p className="max-w-sm text-sm text-red-700/80">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

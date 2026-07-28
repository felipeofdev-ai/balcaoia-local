import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-[100px] w-full rounded-lg border border-[var(--border)] bg-white px-3.5 py-2.5 text-sm text-[var(--brand-graphite)] shadow-sm transition-colors placeholder:text-[var(--muted-foreground)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--brand-petrol-light)] focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/30",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

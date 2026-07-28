import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-lg border border-[var(--border)] bg-white px-3.5 py-2 text-sm text-[var(--brand-graphite)] shadow-sm transition-colors placeholder:text-[var(--muted-foreground)]",
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
Input.displayName = "Input";

export { Input };

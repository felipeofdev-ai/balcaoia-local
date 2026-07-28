import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "flex h-11 w-full appearance-none rounded-lg border border-[var(--border)] bg-white px-3.5 pr-10 py-2 text-sm text-[var(--brand-graphite)] shadow-sm transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-[var(--brand-petrol-light)] focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/30",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };

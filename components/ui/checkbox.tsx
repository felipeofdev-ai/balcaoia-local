import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <span className={cn("relative inline-flex h-5 w-5 shrink-0", className)}>
        <input
          type="checkbox"
          ref={ref}
          className="peer absolute inset-0 h-5 w-5 cursor-pointer appearance-none rounded-md border border-[var(--border)] bg-white shadow-sm transition-colors checked:border-[var(--brand-petrol)] checked:bg-[var(--brand-petrol)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-petrol-light)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-500"
          {...props}
        />
        <Check
          className="pointer-events-none relative m-auto h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100"
          strokeWidth={3}
        />
      </span>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };

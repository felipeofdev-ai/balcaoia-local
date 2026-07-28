import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold leading-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--brand-petrol)] text-white",
        petrol: "border-transparent bg-[var(--brand-petrol)]/10 text-[var(--brand-petrol)]",
        amber: "border-transparent bg-[var(--brand-amber)]/15 text-[var(--brand-amber-dark)]",
        outline: "border-[var(--border)] text-[var(--brand-graphite)] bg-transparent",
        secondary: "border-transparent bg-[var(--muted)] text-[var(--muted-foreground)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

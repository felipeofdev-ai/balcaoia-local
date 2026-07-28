import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--brand-petrol-light)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--brand-petrol)] text-white hover:bg-[var(--brand-petrol-light)] shadow-sm",
        amber:
          "bg-[var(--brand-amber)] text-[var(--brand-graphite)] hover:bg-[var(--brand-amber-dark)] shadow-sm",
        outline:
          "border border-[var(--brand-petrol)] text-[var(--brand-petrol)] bg-transparent hover:bg-[var(--brand-petrol)] hover:text-white",
        ghost:
          "bg-transparent text-[var(--brand-graphite)] hover:bg-black/5",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        link: "bg-transparent text-[var(--brand-petrol)] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

import Image from "next/image";
import { cn } from "@/lib/utils";

export type BrandLogoSize = "sm" | "md" | "lg" | "xl" | "hero";

const SIZE_CLASS: Record<BrandLogoSize, string> = {
  sm: "h-11 w-auto sm:h-12",
  md: "h-12 w-auto sm:h-[3.75rem]",
  lg: "h-14 w-auto sm:h-16 md:h-[4.25rem]",
  xl: "h-[4.5rem] w-auto sm:h-20 md:h-24",
  hero: "h-16 w-auto sm:h-20 md:h-24",
};

const SIZE_DIMS: Record<BrandLogoSize, { width: number; height: number }> = {
  sm: { width: 280, height: 52 },
  md: { width: 340, height: 64 },
  lg: { width: 420, height: 78 },
  xl: { width: 520, height: 96 },
  hero: { width: 560, height: 104 },
};

export interface BrandLogoProps {
  size?: BrandLogoSize;
  /** Use opaque light background asset (better on dark surfaces). */
  variant?: "default" | "light";
  /** Icon-only mark for compact spots. */
  iconOnly?: boolean;
  className?: string;
  priority?: boolean;
  alt?: string;
}

export function BrandLogo({
  size = "md",
  variant = "default",
  iconOnly = false,
  className,
  priority = false,
  alt = "BalcãoIA Local",
}: BrandLogoProps) {
  const src = iconOnly
    ? "/logo-icon.png"
    : variant === "light"
      ? "/logo-light.png"
      : "/logo.png";

  const dims = iconOnly
    ? { width: 96, height: 96 }
    : SIZE_DIMS[size];

  return (
    <Image
      src={src}
      alt={alt}
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={cn(
        iconOnly ? "h-10 w-10 object-contain sm:h-11 sm:w-11" : SIZE_CLASS[size],
        "object-contain object-left",
        className
      )}
    />
  );
}

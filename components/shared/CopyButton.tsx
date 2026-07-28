"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  text: string;
  copyLabel?: string;
  copiedLabel?: string;
}

export function CopyButton({
  text,
  copyLabel = "Copiar",
  copiedLabel = "Copiado!",
  variant = "outline",
  size = "sm",
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn("min-w-[110px]", className)}
      {...props}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          {copiedLabel}
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          {copyLabel}
        </>
      )}
    </Button>
  );
}

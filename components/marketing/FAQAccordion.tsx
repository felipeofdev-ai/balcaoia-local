"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQAccordionItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  items: FAQAccordionItem[];
  defaultOpenIndex?: number | null;
  className?: string;
}

export function FAQAccordion({
  items,
  defaultOpenIndex = 0,
  className,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(defaultOpenIndex);

  return (
    <div className={cn("mx-auto flex w-full max-w-2xl flex-col gap-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-xl border border-[var(--border)] bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[var(--brand-graphite)] cursor-pointer"
            >
              {item.question}
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition-transform",
                  isOpen && "rotate-180 text-[var(--brand-petrol)]"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

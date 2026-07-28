"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* deve ser usado dentro de <Tabs>");
  return ctx;
}

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

function Tabs({ defaultValue, value, onValueChange, className, children }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = React.useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-[var(--muted)] p-1",
        className
      )}
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function TabsTrigger({ value, className, children, ...props }: TabsTriggerProps) {
  const { value: activeValue, setValue } = useTabsContext();
  const isActive = activeValue === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => setValue(value)}
      className={cn(
        "rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors cursor-pointer",
        isActive
          ? "bg-white text-[var(--brand-petrol)] shadow-sm"
          : "text-[var(--muted-foreground)] hover:text-[var(--brand-graphite)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsContent({ value, className, children, ...props }: TabsContentProps) {
  const { value: activeValue } = useTabsContext();
  if (activeValue !== value) return null;
  return (
    <div role="tabpanel" className={cn("mt-4 animate-fade-up", className)} {...props}>
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

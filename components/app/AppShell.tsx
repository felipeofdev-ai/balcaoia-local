"use client";

import * as React from "react";
import { Header } from "@/components/app/Header";
import { Sidebar } from "@/components/app/Sidebar";

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--muted)]">
      <Header onMenuClick={() => setMobileNavOpen(true)} />
      <div className="flex flex-1">
        <Sidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

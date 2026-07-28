"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { clearLocalUser, getLocalUser } from "@/lib/local-store";

export interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null);

  React.useEffect(() => {
    setUser(getLocalUser());
  }, []);

  function handleLogout() {
    clearLocalUser();
    router.push("/app/login");
  }

  const initials = (user?.name || user?.email || "?")
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 flex h-[4.75rem] items-center justify-between gap-4 border-b border-[var(--border)] bg-white/90 px-4 backdrop-blur-md sm:h-[5.25rem] sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[var(--brand-graphite)] hover:bg-black/5 md:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link
          href="/app/dashboard"
          className="flex min-w-0 items-center gap-2.5"
          aria-label="BalcãoIA Studio"
        >
          <BrandLogo size="md" priority className="max-w-[min(100%,240px)] sm:max-w-[min(100%,320px)]" />
          <span className="hidden rounded-md bg-[var(--brand-petrol)]/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[var(--brand-petrol)] lg:inline">
            Studio
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden items-center gap-2 sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand-petrol)] text-xs font-semibold text-white">
              {initials || "?"}
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-[var(--brand-graphite)]">
                {user.name || "Usuário demo"}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">{user.email}</p>
            </div>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={handleLogout} title="Sair">
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </header>
  );
}

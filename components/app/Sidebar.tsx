"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpenCheck,
  LayoutDashboard,
  LayoutTemplate,
  ListChecks,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users2,
  Webhook,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { clearLocalUser, isAdminDemo } from "@/lib/local-store";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MAIN_NAV: NavItem[] = [
  { label: "Meus Negócios", href: "/app/dashboard", icon: LayoutDashboard },
  { label: "Templates", href: "/app/templates", icon: LayoutTemplate },
  { label: "Aprendizado", href: "/app/learning", icon: BookOpenCheck },
  { label: "Configurações", href: "/app/settings", icon: Settings },
];

const ADMIN_NAV: NavItem[] = [
  { label: "Mercado", href: "/app/admin/mercado", icon: TrendingUp },
  { label: "Studio criação", href: "/app/admin/studio", icon: Sparkles },
  { label: "Setup Hotmart", href: "/app/admin/hotmart-setup", icon: ListChecks },
  { label: "Templates de nicho", href: "/app/admin/templates", icon: ShieldCheck },
  { label: "Leads", href: "/app/admin/leads", icon: Users2 },
  { label: "Eventos Hotmart", href: "/app/admin/hotmart-events", icon: Webhook },
];

export interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = React.useState(false);

  React.useEffect(() => {
    setAdmin(isAdminDemo());
  }, [pathname]);

  function handleLogout() {
    clearLocalUser();
    router.push("/app/login");
  }

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const content = (
    <nav className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <Link
        href="/app/dashboard"
        onClick={onClose}
        className="flex items-center rounded-xl border border-black/5 bg-white px-3 py-3"
        aria-label="BalcãoIA Studio"
      >
        <BrandLogo size="md" className="max-w-full" />
      </Link>

      <div>
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
          Estúdio
        </p>
        <ul className="space-y-1">
          {MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-[var(--brand-petrol)] text-white shadow-sm"
                    : "text-[var(--brand-graphite)] hover:bg-black/5"
                )}
              >
                <item.icon className="h-4.5 w-4.5 shrink-0" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {admin && (
        <div>
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
            Admin
          </p>
          <ul className="space-y-1">
            {ADMIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-[var(--brand-amber)]/20 text-[var(--brand-amber-dark)]"
                      : "text-[var(--brand-graphite)] hover:bg-black/5"
                  )}
                >
                  <item.icon className="h-4.5 w-4.5 shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto border-t border-[var(--border)] pt-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--brand-graphite)] transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          Sair
        </button>
      </div>
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-[var(--border)] bg-white md:block">
        {content}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <span className="text-sm font-semibold text-[var(--brand-graphite)]">Menu</span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-black/5"
                aria-label="Fechar menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}

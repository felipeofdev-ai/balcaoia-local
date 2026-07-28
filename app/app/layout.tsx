"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";

export default function AppSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/app/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return <AppShell>{children}</AppShell>;
}

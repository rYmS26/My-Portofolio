"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Database,
  FileText,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOutAdminAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

export interface AdminSidebarProps {
  adminEmail: string;
  authMode: "supabase" | "local_demo";
  counts: {
    projects: number;
    experiences: number;
    notes: number;
    unreadInquiries: number;
  };
}

export function AdminSidebar({
  adminEmail,
  authMode,
  counts,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = React.useState(false);

  const navItems: AdminNavItem[] = [
    {
      label: "Ringkasan Sistem",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Studi Kasus Proyek",
      href: "/admin/projects",
      icon: FolderKanban,
      count: counts.projects,
    },
    {
      label: "Catatan Teknis",
      href: "/admin/notes",
      icon: FileText,
      count: counts.notes,
    },
    {
      label: "Kotak Masuk (Hire)",
      href: "/admin/inquiries",
      icon: Inbox,
      count: counts.unreadInquiries,
    },
    {
      label: "Profil & Availability",
      href: "/admin/settings",
      icon: SlidersHorizontal,
    },
  ];

  const handleSignOut = async () => {
    setSigningOut(true);
    const res = await signOutAdminAction();
    router.push(res.data?.redirectTo ?? "/login");
    router.refresh();
  };

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-4">
      <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-4 space-y-4">
        <div className="space-y-1.5 border-b border-zinc-100 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              CMS Operator
            </span>
            <Badge
              tone={authMode === "supabase" ? "success" : "warning"}
              withDot
            >
              {authMode === "supabase" ? "Supabase" : "Demo"}
            </Badge>
          </div>
          <p className="text-sm font-medium text-zinc-900 truncate font-mono">
            {adminEmail}
          </p>
        </div>

        <nav aria-label="Menu Admin CMS" className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "h-9 px-3 rounded-lg flex items-center justify-between text-sm transition-[color,background-color] duration-150 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 font-medium"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                )}
              >
                <span className="inline-flex items-center gap-2.5">
                  <Icon className="size-4 text-zinc-500" aria-hidden="true" />
                  <span>{item.label}</span>
                </span>
                {typeof item.count === "number" && (
                  <span className="text-xs font-mono tabular-nums px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200/60">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="pt-3 border-t border-zinc-100 space-y-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500 px-1">
            <Database className="size-3.5 text-zinc-400" aria-hidden="true" />
            <span>5 Tabel RLS Aktif</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 px-1">
            <ShieldCheck className="size-3.5 text-emerald-700" aria-hidden="true" />
            <span>Auth Session Verified</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            isLoading={signingOut}
            loadingText="Keluar..."
            onClick={handleSignOut}
            className="w-full mt-2"
          >
            <LogOut className="size-4 text-zinc-500" aria-hidden="true" />
            <span>Akhiri Sesi Admin</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}

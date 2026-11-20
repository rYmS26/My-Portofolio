"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Lock,
  Menu,
  Terminal,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AvailabilityBadge } from "@/components/ui/badge";
import type { AvailabilityStatus } from "@/types/portfolio";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Ringkasan", href: "/" },
  { label: "Studi Kasus", href: "/projects" },
  { label: "Catatan Teknis", href: "/notes" },
  { label: "Diskusi & Hire", href: "/contact" },
];

export interface NavbarProps {
  availabilityStatus?: AvailabilityStatus;
  fullName?: string;
}

export function Navbar({
  availabilityStatus = "available",
  fullName = "Arif Pratama",
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 h-14 bg-white/80 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-zinc-900 rounded-lg py-1 px-1.5 -ml-1.5 transition-[color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            <span className="size-7 rounded-lg bg-zinc-900 text-white inline-flex items-center justify-center shadow-2xs">
              <Terminal className="size-4" aria-hidden="true" />
            </span>
            <span>{fullName}</span>
            <span className="text-xs font-mono font-normal text-zinc-400 hidden sm:inline tabular-nums">
              v2026.11
            </span>
          </Link>

          <div className="hidden md:block pl-2 border-l border-zinc-200/80">
            <AvailabilityBadge status={availabilityStatus} />
          </div>
        </div>

        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "h-9 px-3 rounded-lg inline-flex items-center text-sm transition-[color,background-color] duration-150 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 font-medium"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/admin"
            className="h-9 px-3 rounded-lg inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200/80 transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            <Lock className="size-3.5 text-zinc-500" aria-hidden="true" />
            <span>CMS Workspace</span>
          </Link>
          <Link
            href="/contact"
            className="h-9 px-3.5 rounded-lg inline-flex items-center gap-1.5 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            <span>Jadwalkan Diskusi</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center size-9 rounded-lg border border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-100 transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
          {mobileMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200/80 bg-white px-4 pt-3 pb-4 shadow-xs">
          <div className="mb-3">
            <AvailabilityBadge status={availabilityStatus} />
          </div>
          <nav aria-label="Navigasi Mobile" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "h-9 px-3 rounded-lg inline-flex items-center text-sm",
                    isActive
                      ? "bg-zinc-100 text-zinc-900 font-medium"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center gap-2">
            <Link
              href="/admin"
              className="flex-1 h-9 px-3 rounded-lg inline-flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80"
            >
              <Lock className="size-3.5" aria-hidden="true" />
              <span>CMS Workspace</span>
            </Link>
            <Link
              href="/contact"
              className="flex-1 h-9 px-3 rounded-lg inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800"
            >
              <span>Jadwalkan Diskusi</span>
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

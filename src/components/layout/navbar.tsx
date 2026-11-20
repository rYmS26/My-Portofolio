"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Terminal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/types/portfolio";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Portfolio", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Notes", href: "/notes" },
  { label: "Contact", href: "/contact" },
];

export interface NavbarProps {
  availabilityStatus?: AvailabilityStatus;
  fullName?: string;
}

export function Navbar({
  availabilityStatus = "available",
  fullName = "Royhan Muhammad Sabila",
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const statusDotColor =
    availabilityStatus === "available"
      ? "bg-emerald-500"
      : availabilityStatus === "open_to_selective"
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-3xl mx-auto border-x border-zinc-200/80 h-12 px-4 sm:px-5 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-tight text-zinc-900 rounded-md py-1 px-1 -ml-1 transition-[color] duration-150 ease-out hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
          <span className="size-5 rounded-md bg-zinc-900 text-white inline-flex items-center justify-center">
            <Terminal className="size-3" aria-hidden="true" />
          </span>
          <span className="font-mono">{fullName.split(",")[0]}</span>
          <span
            className={cn("size-1.5 rounded-full", statusDotColor)}
            title={`Status: ${availabilityStatus}`}
            aria-hidden="true"
          />
        </Link>

        <nav
          aria-label="Navigasi Utama"
          className="hidden sm:flex items-center gap-1"
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
                  "h-8 px-2.5 rounded-md inline-flex items-center text-xs transition-[color,background-color] duration-150 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 font-medium"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="sm:hidden inline-flex items-center justify-center size-8 rounded-md border border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-100 transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          {mobileMenuOpen ? (
            <X className="size-4" aria-hidden="true" />
          ) : (
            <Menu className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200/80 bg-white">
          <div className="max-w-3xl mx-auto border-x border-zinc-200/80 px-4 py-3 space-y-1">
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
                    "h-9 px-3 rounded-lg flex items-center text-sm",
                    isActive
                      ? "bg-zinc-100 text-zinc-900 font-medium"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

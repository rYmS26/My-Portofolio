import Link from "next/link";
import { ArrowUpRight, Terminal } from "lucide-react";
import type { ProfileSettings } from "@/types/portfolio";

function getInitials(fullName: string): string {
  const words = fullName
    .split(",")[0]
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "RM";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export function Footer({ profile }: { profile: ProfileSettings }) {
  const displayName = profile.full_name.split(",")[0].trim();
  const initials = getInitials(profile.full_name);

  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-auto">
      <div className="max-w-3xl mx-auto border-x border-zinc-200/80 dark:border-zinc-800">
        <div className="border-b border-zinc-200/80 dark:border-zinc-800 px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Brand
          </span>
          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 tabular-nums">
            ROYHAN.MS • PORTFOLIO
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 border-b border-zinc-200/80 dark:border-zinc-800">
          <div className="sm:col-span-5 py-8 px-6 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-zinc-200/80 dark:border-zinc-800 bg-dot-grid">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 px-4 py-2.5 rounded-xl shadow-xs">
              <span className="size-6 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 inline-flex items-center justify-center">
                <Terminal className="size-3.5" aria-hidden="true" />
              </span>
              <span className="font-mono text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {initials}
                <span className="text-emerald-600 dark:text-emerald-400">.</span>
              </span>
            </div>
          </div>

          <div className="sm:col-span-7 py-8 px-6 flex flex-col items-center justify-center gap-1.5 bg-white dark:bg-zinc-950">
            <div className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              <span className="font-mono text-xs px-1.5 py-0.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">
                {initials}
              </span>
              <span>{displayName}</span>
            </div>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              {profile.headline}
            </p>
          </div>
        </div>

        <div className="px-5 py-6 text-center space-y-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Dibangun dengan Next.js App Router, Tailwind CSS, TypeScript strict, & Supabase PostgreSQL.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <Link
              href="/#projects"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Projects
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <Link
              href="/notes"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Notes
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <Link
              href="/contact"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Hire Me
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <a
              href={profile.github_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              <span>GitHub</span>
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>

          <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 tabular-nums pt-1">
            © 2026 {profile.full_name} • {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

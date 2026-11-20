import Link from "next/link";
import { ArrowUpRight, Database, ShieldCheck, Terminal } from "lucide-react";
import { INITIAL_PROFILE_SETTINGS } from "@/lib/data/seed";

export function Footer() {
  const profile = INITIAL_PROFILE_SETTINGS;

  return (
    <footer className="border-t border-zinc-200/80 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-zinc-200/60">
          <div className="md:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
              <span className="size-6 rounded-md bg-zinc-900 text-white inline-flex items-center justify-center">
                <Terminal className="size-3.5" aria-hidden="true" />
              </span>
              <span>{profile.full_name}</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 text-pretty max-w-md">
              {profile.bio}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                <Database className="size-3.5 text-zinc-400" aria-hidden="true" />
                <span>PostgreSQL + Next.js App Router</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono tabular-nums">
                <ShieldCheck className="size-3.5 text-zinc-400" aria-hidden="true" />
                <span>RLS Verified Architecture</span>
              </span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Indeks Arsitektur
            </h2>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <Link
                  href="/projects"
                  className="hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm"
                >
                  Studi Kasus Sistem
                </Link>
              </li>
              <li>
                <Link
                  href="/notes"
                  className="hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm"
                >
                  Catatan Rekayasa (Notes)
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm"
                >
                  Konsultasi & Perekrutan
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm"
                >
                  Admin CMS Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Saluran Langsung
            </h2>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1 hover:text-zinc-900 transition-colors font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm"
                >
                  <span>{profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="size-3.5 text-zinc-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="size-3.5 text-zinc-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-zinc-500">
          <p className="tabular-nums">
            © 2026 {profile.full_name}. Dirancang dengan standar editorial monokromatik Zinc.
          </p>
          <p className="font-mono tabular-nums text-zinc-400">
            Lokasi: {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

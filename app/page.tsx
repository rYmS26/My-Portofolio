import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Database,
  FileText,
  Layers,
  MapPin,
  Server,
} from "lucide-react";
import {
  getProfileSettings,
  getPublishedNotes,
  getPublishedProjects,
  getWorkExperiences,
} from "@/lib/data/repository";
import { TECH_STACK_MATRIX } from "@/lib/data/seed";
import { AvailabilityBadge, Badge } from "@/components/ui/badge";
import { ProjectCatalog } from "@/components/portfolio/project-catalog";
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline";
import { formatIndonesianDate } from "@/lib/utils";

export default async function HomePage() {
  const [profile, projects, experiences, notes] = await Promise.all([
    getProfileSettings(),
    getPublishedProjects(),
    getWorkExperiences(),
    getPublishedNotes(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <section className="py-12 sm:py-16 border-b border-zinc-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <AvailabilityBadge
                status={profile.availability_status}
                customLabel={profile.availability_note}
              />
              <span className="inline-flex items-center gap-1 text-xs text-zinc-500">
                <MapPin className="size-3.5 text-zinc-400" aria-hidden="true" />
                <span>{profile.location}</span>
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 text-balance">
                {profile.headline} — Merancang Sistem Ledger, Infrastruktur Data & Aplikasi Web Skala Produksi.
              </h1>
              <p className="text-sm leading-relaxed text-zinc-600 text-pretty max-w-2xl">
                {profile.bio}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/projects"
                className="h-10 px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
              >
                <span>Baca Studi Kasus Arsitektur</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="h-10 px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm font-medium bg-white text-zinc-900 hover:bg-zinc-50 border border-zinc-300 shadow-2xs transition-[color,background-color,border-color,transform,box-shadow] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
              >
                <span>Jadwalkan Diskusi Teknis</span>
              </Link>
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                className="h-10 px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-[color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                <span>GitHub</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <Server className="size-4 text-zinc-500" aria-hidden="true" />
                  <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Metrik Rekayasa Terverifikasi
                  </h2>
                </div>
                <Badge tone="mono">Q4-2026</Badge>
              </div>

              <dl className="divide-y divide-zinc-200/60">
                <div className="py-2.5 flex items-baseline justify-between gap-4">
                  <dt className="text-xs text-zinc-500">
                    Pengalaman Produksi Full-Stack
                  </dt>
                  <dd className="text-sm font-semibold text-zinc-900 tabular-nums font-mono">
                    {profile.years_of_experience}+ Tahun
                  </dd>
                </div>
                <div className="py-2.5 flex items-baseline justify-between gap-4">
                  <dt className="text-xs text-zinc-500">
                    Sistem Kritis & Ledger Dirancang
                  </dt>
                  <dd className="text-sm font-semibold text-zinc-900 tabular-nums font-mono">
                    {profile.systems_architected} Sistem
                  </dd>
                </div>
                <div className="py-2.5 flex items-baseline justify-between gap-4">
                  <dt className="text-xs text-zinc-500">
                    Rata-Rata Penurunan Latensi P95
                  </dt>
                  <dd className="text-sm font-semibold text-emerald-700 tabular-nums font-mono">
                    -{profile.avg_latency_reduction_pct}%
                  </dd>
                </div>
                <div className="pt-2.5 flex items-baseline justify-between gap-4">
                  <dt className="text-xs text-zinc-500">Stack Spesialisasi</dt>
                  <dd className="text-xs font-medium text-zinc-900 font-mono">
                    Next.js 15 • PostgreSQL • Go
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b border-zinc-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-zinc-500" aria-hidden="true" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Production Case Studies
              </span>
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              Studi Kasus Arsitektur & Rekayasa Sistem Unggulan
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-md py-1"
          >
            <span>Buka Halaman Penuh Katalog ({projects.length})</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <ProjectCatalog projects={projects} showStateSimulator />
      </section>

      <section className="py-12 sm:py-16 border-b border-zinc-200/80 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Briefcase className="size-4 text-zinc-500" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Career Track Record
            </span>
          </div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Timeline Pengalaman Kerja & Kepemimpinan Teknis
          </h2>
        </div>

        <ExperienceTimeline experiences={experiences} />
      </section>

      <section className="py-12 sm:py-16 border-b border-zinc-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Database className="size-4 text-zinc-500" aria-hidden="true" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Technical Competency Matrix
              </span>
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              Matriks Spesialisasi Teknis & Jam Terbang Produksi
            </h2>
          </div>
          <Badge tone="neutral">
            <CheckCircle2
              className="size-3.5 text-emerald-700"
              aria-hidden="true"
            />
            <span>Production Audited Stack</span>
          </Badge>
        </div>

        <div className="overflow-x-auto border border-zinc-200/80 rounded-xl bg-white shadow-xs">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Teknologi & Runtime
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Domain Arsitektur
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Implementasi Produksi Utama
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Level
                </th>
                <th className="bg-zinc-50/80 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Pengalaman
                </th>
              </tr>
            </thead>
            <tbody>
              {TECH_STACK_MATRIX.flatMap((category) =>
                category.items.map((item) => (
                  <tr
                    key={`${category.id}-${item.name}`}
                    className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/60 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-zinc-900">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-xs text-zinc-500">
                      {category.domain}
                    </td>
                    <td className="py-3 px-4 text-sm text-zinc-600">
                      {item.use_case}
                    </td>
                    <td className="py-3 px-4 text-left">
                      <Badge
                        tone={
                          item.proficiency === "Principal"
                            ? "success"
                            : "neutral"
                        }
                      >
                        {item.proficiency}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-medium text-zinc-900 tabular-nums font-mono">
                      {item.production_years}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-12 sm:py-16 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-zinc-500" aria-hidden="true" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Engineering Notes Preview
              </span>
            </div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              Catatan Rekayasa & Tulisan Teknis Terbaru
            </h2>
          </div>

          <Link
            href="/notes"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900"
          >
            <span>Lihat Semua Catatan ({notes.length})</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl divide-y divide-zinc-200/60">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/60 transition-colors"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="mono">{note.code}</Badge>
                  <Badge tone="neutral">{note.category}</Badge>
                  <span className="text-xs text-zinc-500 tabular-nums">
                    {formatIndonesianDate(note.published_at)}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-zinc-900">
                  {note.title}
                </h3>
                <p className="text-xs text-zinc-600 line-clamp-1">
                  {note.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-zinc-500 tabular-nums">
                  {note.reading_time_minutes} mnt baca
                </span>
                <Link
                  href={`/notes/${note.slug}`}
                  className="h-8 px-3 rounded-lg inline-flex items-center gap-1 text-xs font-medium bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 transition-colors"
                >
                  <span>Baca</span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

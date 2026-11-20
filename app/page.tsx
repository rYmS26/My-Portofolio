import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Mail,
  MapPin,
  Send,
  Server,
  ShieldCheck,
  Terminal,
  UserCheck,
} from "lucide-react";
import {
  getProfileSettings,
  getPublishedNotes,
  getPublishedProjects,
  getWorkExperiences,
} from "@/lib/data/repository";
import { TECH_STACK_MATRIX } from "@/lib/data/seed";
import {
  ABOUT_HIGHLIGHTS,
  ACTIVITY_HEATMAP_WEEKS,
  PEER_TESTIMONIALS,
} from "@/lib/data/editorial";
import {
  ExperienceAccordion,
  FeaturedShowcaseGrid,
  ProjectsAccordion,
} from "@/components/portfolio/editorial-sections";
import { AvailabilityBadge } from "@/components/ui/badge";

function SectionHatchedDivider() {
  return (
    <div className="border-b border-zinc-200/80">
      <div className="max-w-3xl mx-auto border-x border-zinc-200/80 h-7 bg-hatched-divider" />
    </div>
  );
}

function getHeatmapCellClass(level: number): string {
  switch (level) {
    case 1:
      return "bg-emerald-100 border-emerald-200/60";
    case 2:
      return "bg-emerald-300 border-emerald-400/50";
    case 3:
      return "bg-emerald-500 border-emerald-600/40";
    case 4:
      return "bg-emerald-700 border-emerald-800/40";
    default:
      return "bg-zinc-100 border-zinc-200/60";
  }
}

export default async function HomePage() {
  const [profile, projects, experiences, notes] = await Promise.all([
    getProfileSettings(),
    getPublishedProjects(),
    getWorkExperiences(),
    getPublishedNotes(),
  ]);

  const flattenedStack = TECH_STACK_MATRIX.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      domain: category.domain,
      categoryId: category.id,
    }))
  );

  const initials = profile.full_name
    .split(",")[0]
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white">
      {/* 1. HERO BRANDING BOX (Unique Dot-Grid Architectural Canvas + Interactive Status) */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80 relative overflow-hidden bg-dot-grid">
          <div className="px-5 py-10 sm:py-14 flex flex-col items-center justify-center text-center gap-4 relative">
            <span
              className="hidden sm:block absolute top-3 left-3 text-[10px] font-mono text-zinc-400 tabular-nums"
              aria-hidden="true"
            >
              + 06.2615° S, 106.8106° E
            </span>
            <span
              className="hidden sm:block absolute top-3 right-3 text-[10px] font-mono text-zinc-400 tabular-nums"
              aria-hidden="true"
            >
              P95 &lt; 38ms • UTC+7
            </span>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-zinc-200/80 px-3 py-1 shadow-2xs hover:border-emerald-500/60 transition-[border-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <AvailabilityBadge
                status={profile.availability_status}
                customLabel="Available for Principal/Senior Roles & Advisory"
              />
              <ArrowUpRight className="size-3.5 text-zinc-400" aria-hidden="true" />
            </Link>

            <div className="bg-white border border-zinc-200/80 rounded-xl px-5 py-3 shadow-xs inline-flex items-center gap-3">
              <span className="size-8 rounded-lg bg-zinc-900 text-white inline-flex items-center justify-center">
                <Terminal className="size-4" aria-hidden="true" />
              </span>
              <div className="text-left">
                <p className="font-mono text-lg font-semibold tracking-tight text-zinc-900 leading-none">
                  DEVFOLIO<span className="text-emerald-600">.ID</span>
                </p>
                <p className="font-mono text-[11px] text-zinc-500 mt-1">
                  SYSTEMS • LEDGER • NEXT.JS ARCHITECTURE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROFILE / HEADER INFO (Avatar, Verified Name, 2-Col Quick Info, 2x2 Social Grid) */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5 border-b border-zinc-200/80">
            <div className="relative shrink-0">
              <div className="size-20 rounded-full bg-zinc-900 text-white border-2 border-white ring-1 ring-zinc-200 flex flex-col items-center justify-center select-none shadow-xs">
                <span className="font-mono text-xl font-semibold tracking-tight">
                  {initials || "DF"}
                </span>
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                  ENG
                </span>
              </div>
              <span
                className="absolute bottom-0.5 right-0.5 size-4 rounded-full bg-emerald-500 ring-2 ring-white"
                title="Online & Available for Collaboration"
              />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900">
                  {profile.full_name}
                </h1>
                <BadgeCheck
                  className="size-5 text-emerald-600 shrink-0"
                  aria-label="Verified Senior Full-Stack Engineer"
                />
              </div>
              <p className="text-sm text-zinc-600">{profile.headline}</p>
              <p className="text-xs font-mono text-zinc-500 tabular-nums">
                {profile.years_of_experience}+ thn produksi •{" "}
                {profile.systems_architected} sistem kritis • -
                {profile.avg_latency_reduction_pct}% avg P95 latency
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 border-b border-zinc-200/80 text-xs">
            <div className="divide-y divide-zinc-100 px-5 py-2">
              <div className="py-2 flex items-center gap-2.5 text-zinc-600">
                <Code2 className="size-4 text-zinc-400 shrink-0" aria-hidden="true" />
                <span>Lead Full-Stack Engineer @ Nusantara Finansial</span>
              </div>
              <div className="py-2 flex items-center gap-2.5 text-zinc-600">
                <MapPin className="size-4 text-zinc-400 shrink-0" aria-hidden="true" />
                <span>{profile.location}</span>
              </div>
              <div className="py-2 flex items-center gap-2.5 text-zinc-600">
                <Mail className="size-4 text-zinc-400 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono hover:text-zinc-900 transition-colors"
                >
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="divide-y divide-zinc-100 px-5 py-2">
              <div className="py-2 flex items-center gap-2.5 text-zinc-600">
                <Globe className="size-4 text-zinc-400 shrink-0" aria-hidden="true" />
                <span className="font-mono">devfolio.id</span>
              </div>
              <div className="py-2 flex items-center gap-2.5 text-zinc-600">
                <Briefcase className="size-4 text-zinc-400 shrink-0" aria-hidden="true" />
                <span className="tabular-nums">
                  {profile.years_of_experience}+ Tahun • B2B SaaS & FinTech Ledger
                </span>
              </div>
              <div className="py-2 flex items-center gap-2.5 text-emerald-700 font-medium">
                <ShieldCheck className="size-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Tersedia untuk Hire & Architecture Advisory</span>
              </div>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={profile.github_url}
              target="_blank"
              rel="noreferrer"
              className="group p-3 rounded-xl border border-zinc-200/80 bg-white hover:border-emerald-500/50 hover:bg-zinc-50/50 flex items-center justify-between gap-3 transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="size-9 rounded-lg bg-zinc-900 text-white inline-flex items-center justify-center shrink-0">
                  <Terminal className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900">GitHub</p>
                  <p className="text-xs font-mono text-zinc-500 truncate">
                    @arifpratama-eng
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="size-4 text-zinc-400 group-hover:text-emerald-600 transition-colors shrink-0"
                aria-hidden="true"
              />
            </a>

            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="group p-3 rounded-xl border border-zinc-200/80 bg-white hover:border-emerald-500/50 hover:bg-zinc-50/50 flex items-center justify-between gap-3 transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="size-9 rounded-lg bg-zinc-100 border border-zinc-200/80 text-zinc-900 inline-flex items-center justify-center shrink-0">
                  <UserCheck className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900">LinkedIn</p>
                  <p className="text-xs font-mono text-zinc-500 truncate">
                    in/arifpratama-eng
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="size-4 text-zinc-400 group-hover:text-emerald-600 transition-colors shrink-0"
                aria-hidden="true"
              />
            </a>

            <Link
              href="/notes"
              className="group p-3 rounded-xl border border-zinc-200/80 bg-white hover:border-emerald-500/50 hover:bg-zinc-50/50 flex items-center justify-between gap-3 transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="size-9 rounded-lg bg-zinc-100 border border-zinc-200/80 text-zinc-900 inline-flex items-center justify-center shrink-0">
                  <BookOpen className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900">
                    Engineering Notes
                  </p>
                  <p className="text-xs font-mono text-zinc-500 truncate tabular-nums">
                    {notes.length} Artikel SQL & Next.js
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="size-4 text-zinc-400 group-hover:text-emerald-600 transition-colors shrink-0"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/contact"
              className="group p-3 rounded-xl border border-emerald-200/70 bg-emerald-50/40 hover:border-emerald-500/60 hover:bg-emerald-50/80 flex items-center justify-between gap-3 transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="size-9 rounded-lg bg-emerald-600 text-white inline-flex items-center justify-center shrink-0">
                  <Send className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900">
                    Hire Me / Konsultasi
                  </p>
                  <p className="text-xs font-mono text-emerald-700 truncate tabular-nums">
                    SLA Respons &lt; 6 Jam Kerja
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="size-4 text-emerald-600 shrink-0"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      <SectionHatchedDivider />

      {/* 3. SECTION ABOUT */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="px-5 py-3 border-b border-zinc-200/80 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-zinc-900">
              About
            </h2>
            <span className="text-[11px] font-mono text-zinc-400">
              PROFILE SUMMARY
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            <p className="text-sm leading-relaxed text-zinc-600 text-pretty">
              {profile.bio}
            </p>
            <ul className="space-y-2.5 list-disc pl-5 text-sm leading-relaxed text-zinc-600 marker:text-emerald-600">
              {ABOUT_HIGHLIGHTS.map((item) => (
                <li key={item} className="text-pretty">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SectionHatchedDivider />

      {/* 4. SECTION HIGHLIGHT / ACTIVITY HEATMAP & TESTIMONI */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="px-5 py-3 border-b border-zinc-200/80 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-zinc-900">
              Activity & Endorsements
            </h2>
            <span className="text-[11px] font-mono text-emerald-700 tabular-nums">
              1.428 commits in 2026
            </span>
          </div>

          <div className="p-5 border-b border-zinc-200/80 space-y-3">
            <div className="overflow-x-auto pb-1">
              <div className="inline-flex gap-1 min-w-max">
                {ACTIVITY_HEATMAP_WEEKS.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((level, dIdx) => (
                      <span
                        key={`${wIdx}-${dIdx}`}
                        className={`size-3 rounded-[3px] border ${getHeatmapCellClass(
                          level
                        )}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500 tabular-nums">
              <span>Produksi: Core Ledger, Inventory Sync, & Clinical EHR</span>
              <div className="inline-flex items-center gap-1">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <span
                    key={lvl}
                    className={`size-2.5 rounded-[2px] border ${getHeatmapCellClass(
                      lvl
                    )}`}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-zinc-200/80">
            {PEER_TESTIMONIALS.map((item, idx) => (
              <figure
                key={item.id}
                className={`p-5 flex flex-col justify-between gap-4 bg-white ${
                  idx % 2 === 0 ? "sm:border-r border-zinc-200/80" : ""
                } ${idx < 2 ? "sm:border-b border-zinc-200/80" : ""}`}
              >
                <blockquote className="text-xs sm:text-sm leading-relaxed text-zinc-600 text-pretty">
                  “{item.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-2.5 pt-1">
                  <span className="size-7 rounded-full bg-zinc-100 border border-zinc-200/80 text-zinc-800 text-[11px] font-mono font-semibold inline-flex items-center justify-center shrink-0">
                    {item.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-zinc-900 truncate">
                        {item.author}
                      </span>
                      {item.verified && (
                        <BadgeCheck
                          className="size-3.5 text-emerald-600 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 truncate">
                      {item.role} • {item.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SectionHatchedDivider />

      {/* 5. SECTION TECH STACK */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="px-5 py-3 border-b border-zinc-200/80 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-zinc-900">
              Stack
            </h2>
            <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
              {flattenedStack.length} CORE TECHNOLOGIES
            </span>
          </div>

          <div className="p-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {flattenedStack.map((item) => {
              const Icon =
                item.categoryId === "frontend-arch"
                  ? Layers
                  : item.categoryId === "backend-data"
                  ? Database
                  : Server;

              return (
                <div
                  key={item.name}
                  className="p-3 rounded-lg border border-zinc-200/80 bg-white hover:border-emerald-500/50 transition-[border-color] duration-150 ease-out flex items-start gap-2.5"
                >
                  <span className="size-7 rounded-md bg-zinc-50 border border-zinc-200/80 text-zinc-700 inline-flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="size-3.5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500 tabular-nums mt-0.5">
                      {item.proficiency} • {item.production_years}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionHatchedDivider />

      {/* 6. SECTION FEATURED CARDS (2x2 Grid with Filter + Show More Pill) */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="px-5 py-3 border-b border-zinc-200/80 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-zinc-900">
              Featured Work & Notes
            </h2>
            <span className="text-[11px] font-mono text-zinc-400">
              CASE STUDIES + BLOG
            </span>
          </div>

          <div className="p-5">
            <FeaturedShowcaseGrid projects={projects} notes={notes} />
          </div>
        </div>
      </section>

      <SectionHatchedDivider />

      {/* 7. SECTION EXPERIENCE (Expandable Vertical Accordion) */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="px-5 py-3 border-b border-zinc-200/80 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-zinc-900">
              Experience
            </h2>
            <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
              {experiences.length} ROLES • EXPANDABLE
            </span>
          </div>

          <ExperienceAccordion experiences={experiences} />
        </div>
      </section>

      <SectionHatchedDivider />

      {/* 7B. SECTION PROJECTS (Expandable Vertical Accordion) */}
      <section>
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="px-5 py-3 border-b border-zinc-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold tracking-tight text-zinc-900">
                Projects
              </h2>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-600 tabular-nums">
                {projects.length}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400">
              <Cpu className="size-3" aria-hidden="true" />
              <span>PRODUCTION SYSTEMS</span>
            </span>
          </div>

          <ProjectsAccordion projects={projects} />
        </div>
      </section>
    </div>
  );
}

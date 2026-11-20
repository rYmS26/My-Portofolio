import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Code2,
  Cpu,
  Database,
  Globe,
  GraduationCap,
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
  CERTIFICATION_ENTRIES,
  EDUCATION_ENTRIES,
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

  const currentRole =
    experiences.find((exp) => exp.is_current) ?? experiences[0];
  const githubHandle = profile.github_url
    .replace(/^https?:\/\/(www\.)?github\.com\//i, "@")
    .replace(/\/$/, "");
  const linkedinHandle = profile.linkedin_url
    .replace(/^https?:\/\/(www\.)?linkedin\.com\//i, "")
    .replace(/\/$/, "");

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
      {/* 1. HERO BRANDING BOX */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80 relative overflow-hidden bg-dot-grid">
          <div className="px-5 py-10 sm:py-14 flex flex-col items-center justify-center text-center gap-4 relative">
            <span
              className="hidden sm:block absolute top-3 left-3 text-[10px] font-mono text-zinc-400 tabular-nums"
              aria-hidden="true"
            >
              + CIAMIS, ID • UTC+7
            </span>
            <span
              className="hidden sm:block absolute top-3 right-3 text-[10px] font-mono text-zinc-400 tabular-nums"
              aria-hidden="true"
            >
              BACKEND • WEB DEV
            </span>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-zinc-200/80 px-3 py-1 shadow-2xs hover:border-emerald-500/60 transition-[border-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <AvailabilityBadge
                status={profile.availability_status}
                customLabel={profile.availability_note}
              />
              <ArrowUpRight
                className="size-3.5 text-zinc-400"
                aria-hidden="true"
              />
            </Link>

            <div className="bg-white border border-zinc-200/80 rounded-xl px-5 py-3 shadow-xs inline-flex items-center gap-3">
              <span className="size-8 rounded-lg bg-zinc-900 text-white inline-flex items-center justify-center">
                <Terminal className="size-4" aria-hidden="true" />
              </span>
              <div className="text-left">
                <p className="font-mono text-lg font-semibold tracking-tight text-zinc-900 leading-none">
                  ROYHAN<span className="text-emerald-600">.MS</span>
                </p>
                <p className="font-mono text-[11px] text-zinc-500 mt-1">
                  BACKEND DEVELOPER • WEBSITE DEVELOPER
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROFILE / HEADER INFO */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5 border-b border-zinc-200/80">
            <div className="relative shrink-0">
              <div className="size-20 rounded-full bg-zinc-900 text-white border-2 border-white ring-1 ring-zinc-200 flex flex-col items-center justify-center select-none shadow-xs">
                <span className="font-mono text-xl font-semibold tracking-tight">
                  {initials || "RM"}
                </span>
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                  DEV
                </span>
              </div>
              <span
                className="absolute bottom-0.5 right-0.5 size-4 rounded-full bg-emerald-500 ring-2 ring-white"
                title="Open to Work — Back End Developer"
              />
            </div>

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900">
                  {profile.full_name}
                </h1>
                <BadgeCheck
                  className="size-5 text-emerald-600 shrink-0"
                  aria-label="Verified Developer Profile"
                />
              </div>
              <p className="text-sm text-zinc-600">{profile.headline}</p>
              <p className="text-xs font-mono text-zinc-500 tabular-nums">
                {profile.years_of_experience}+ thn pemrograman •{" "}
                {CERTIFICATION_ENTRIES.length} sertifikasi Dicoding • Sistem Informasi UNIGAL
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80 border-b border-zinc-200/80 text-xs">
            <div className="divide-y divide-zinc-100 px-5 py-2">
              <div className="py-2 flex items-center gap-2.5 text-zinc-600">
                <Code2
                  className="size-4 text-zinc-400 shrink-0"
                  aria-hidden="true"
                />
                <span>
                  {currentRole
                    ? `${currentRole.role_title} @ ${currentRole.company_name}`
                    : profile.headline}
                </span>
              </div>
              <div className="py-2 flex items-center gap-2.5 text-zinc-600">
                <MapPin
                  className="size-4 text-zinc-400 shrink-0"
                  aria-hidden="true"
                />
                <span>{profile.location}</span>
              </div>
              <div className="py-2 flex items-center gap-2.5 text-zinc-600">
                <Mail
                  className="size-4 text-zinc-400 shrink-0"
                  aria-hidden="true"
                />
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
                <GraduationCap
                  className="size-4 text-zinc-400 shrink-0"
                  aria-hidden="true"
                />
                <span>Universitas Galuh (UNIGAL) — Sistem Informasi</span>
              </div>
              <div className="py-2 flex items-center gap-2.5 text-zinc-600">
                <Briefcase
                  className="size-4 text-zinc-400 shrink-0"
                  aria-hidden="true"
                />
                <span className="tabular-nums">
                  Top Skills: Laravel • JavaScript • PHP • MySQL
                </span>
              </div>
              <div className="py-2 flex items-center gap-2.5 text-emerald-700 font-medium">
                <ShieldCheck
                  className="size-4 text-emerald-600 shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate">{profile.availability_note}</span>
              </div>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="group p-3 rounded-xl border border-zinc-200/80 bg-white hover:border-emerald-500/50 hover:bg-zinc-50/50 flex items-center justify-between gap-3 transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="size-9 rounded-lg bg-zinc-900 text-white inline-flex items-center justify-center shrink-0">
                  <UserCheck className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900">LinkedIn</p>
                  <p className="text-xs font-mono text-zinc-500 truncate">
                    {linkedinHandle}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="size-4 text-zinc-400 group-hover:text-emerald-600 transition-colors shrink-0"
                aria-hidden="true"
              />
            </a>

            <a
              href={profile.github_url}
              target="_blank"
              rel="noreferrer"
              className="group p-3 rounded-xl border border-zinc-200/80 bg-white hover:border-emerald-500/50 hover:bg-zinc-50/50 flex items-center justify-between gap-3 transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="size-9 rounded-lg bg-zinc-100 border border-zinc-200/80 text-zinc-900 inline-flex items-center justify-center shrink-0">
                  <Terminal className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900">GitHub</p>
                  <p className="text-xs font-mono text-zinc-500 truncate">
                    {githubHandle}
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
                    {notes.length > 0
                      ? `${notes.length} Artikel Teknis`
                      : "Arsip Catatan Teknis"}
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
                    Hire Me / Kontak
                  </p>
                  <p className="text-xs font-mono text-emerald-700 truncate">
                    Back End & Web Developer
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

      {/* 4. SECTION EDUCATION */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="px-5 py-3 border-b border-zinc-200/80 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-zinc-900">
              Education
            </h2>
            <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
              {EDUCATION_ENTRIES.length} INSTITUTIONS
            </span>
          </div>

          <div className="divide-y divide-zinc-200/80">
            {EDUCATION_ENTRIES.map((edu) => (
              <div key={edu.id} className="p-5 bg-white space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <span className="size-8 rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 inline-flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-900">
                        {edu.institution}
                      </h3>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        {edu.degree_and_field}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right pl-11 sm:pl-0">
                    <span className="block text-[11px] font-mono text-zinc-500 tabular-nums">
                      {edu.period}
                    </span>
                    {edu.grade && (
                      <span className="inline-block mt-1 text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md tabular-nums">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pl-11">
                  {edu.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono bg-zinc-50 text-zinc-700 border border-zinc-200/80 px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
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
              Stack & Skills
            </h2>
            <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
              {flattenedStack.length} LINKEDIN SKILLS
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
                    <p className="text-[11px] font-mono text-zinc-500 mt-0.5">
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

      {/* 6. SECTION EXPERIENCE (Expandable Vertical Accordion) */}
      <section className="border-b border-zinc-200/80">
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="px-5 py-3 border-b border-zinc-200/80 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-zinc-900">
              Experience
            </h2>
            <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
              {experiences.length} ROLE • EXPANDABLE
            </span>
          </div>

          <ExperienceAccordion experiences={experiences} />
        </div>
      </section>

      <SectionHatchedDivider />

      {/* 7. SECTION PROJECTS (Homepage Only — Empty until added via CMS) */}
      <section id="projects" className="border-b border-zinc-200/80 scroll-mt-14">
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
              <span>CMS MANAGED</span>
            </span>
          </div>

          {projects.length > 0 && (
            <div className="p-5 border-b border-zinc-200/80">
              <FeaturedShowcaseGrid projects={projects} notes={notes} />
            </div>
          )}

          <div className={projects.length === 0 ? "p-5" : ""}>
            <ProjectsAccordion projects={projects} />
          </div>
        </div>
      </section>

      <SectionHatchedDivider />

      {/* 8. SECTION LICENSES & CERTIFICATIONS (Real Dicoding Indonesia Credentials) */}
      <section>
        <div className="max-w-3xl mx-auto border-x border-zinc-200/80">
          <div className="px-5 py-3 border-b border-zinc-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold tracking-tight text-zinc-900">
                Certifications
              </h2>
              <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-600 tabular-nums">
                {CERTIFICATION_ENTRIES.length}
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              DICODING INDONESIA
            </span>
          </div>

          <div className="divide-y divide-zinc-200/80">
            {CERTIFICATION_ENTRIES.map((cert) => (
              <a
                key={cert.id}
                href={cert.credential_url}
                target="_blank"
                rel="noreferrer"
                className="group px-5 py-4 bg-white hover:bg-zinc-50/80 flex items-center justify-between gap-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="size-8 rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 group-hover:border-emerald-500/50 group-hover:text-emerald-700 inline-flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    <Award className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-zinc-900 group-hover:text-emerald-700 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {cert.issuer} •{" "}
                      <span className="font-mono tabular-nums">
                        {cert.issued} — {cert.expires}
                      </span>
                    </p>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5 tabular-nums">
                      Credential ID: {cert.credential_id}
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  className="size-4 text-zinc-400 group-hover:text-emerald-600 shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

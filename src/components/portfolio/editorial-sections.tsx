"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  Clock,
  FileText,
  FolderGit2,
  GitBranch,
  Layers,
  Terminal,
} from "lucide-react";
import type {
  EngineeringNote,
  ProjectCaseStudy,
  WorkExperience,
} from "@/types/portfolio";
import { formatIndonesianDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/ui-states";

type FeaturedFilter = "all" | "projects" | "notes";

interface FeaturedItem {
  id: string;
  kind: "project" | "note";
  href: string;
  code: string;
  title: string;
  subtitle: string;
  metaRight: string;
  tag: string;
  metricLabel: string;
  metricValue: string;
}

export function FeaturedShowcaseGrid({
  projects,
  notes,
}: {
  projects: ProjectCaseStudy[];
  notes: EngineeringNote[];
}) {
  const [filter, setFilter] = React.useState<FeaturedFilter>("all");

  const items = React.useMemo<FeaturedItem[]>(() => {
    const projectItems: FeaturedItem[] = projects.map((project) => ({
      id: project.id,
      kind: "project",
      href: `/#project-${project.slug}`,
      code: project.code,
      title: project.title,
      subtitle: project.client_or_company,
      metaRight: project.period,
      tag: project.tech_stack[0] ?? "System",
      metricLabel: project.key_metrics[0]?.label ?? "Production",
      metricValue: project.key_metrics[0]?.value ?? "Verified",
    }));

    const noteItems: FeaturedItem[] = notes.map((note) => ({
      id: note.id,
      kind: "note",
      href: `/notes/${note.slug}`,
      code: note.code,
      title: note.title,
      subtitle: note.category,
      metaRight: formatIndonesianDate(note.published_at),
      tag: `${note.reading_time_minutes} mnt baca`,
      metricLabel: "Topik",
      metricValue: note.category,
    }));

    if (filter === "projects") return projectItems.slice(0, 4);
    if (filter === "notes") return noteItems.slice(0, 4);

    return [
      ...projectItems.slice(0, 2),
      ...noteItems.slice(0, 2),
    ];
  }, [projects, notes, filter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Filter karya unggulan"
          className="inline-flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/80"
        >
          {(
            [
              { id: "all", label: "Semua (4)" },
              { id: "projects", label: `Studi Kasus (${projects.length})` },
              { id: "notes", label: `Catatan Teknis (${notes.length})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              onClick={() => setFilter(tab.id)}
              className={`h-7 px-2.5 rounded-md text-xs font-medium transition-[color,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                filter === tab.id
                  ? "bg-white text-zinc-900 shadow-2xs"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-mono text-zinc-400 tabular-nums">
          GRID 2×2 • SUPABASE SYNCED
        </span>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="Belum Ada Item Unggulan"
          description="Tambahkan studi kasus atau catatan teknis melalui Admin CMS Workspace."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group bg-white border border-zinc-200/80 hover:border-emerald-500/50 shadow-xs rounded-xl overflow-hidden flex flex-col justify-between transition-[border-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <div className="aspect-[16/9] bg-zinc-50 border-b border-zinc-200/80 overflow-hidden relative p-4 flex flex-col justify-between">
                <div className="absolute inset-0 bg-dot-grid opacity-70 transition-transform duration-300 ease-out group-hover:scale-[1.03]" />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-zinc-200/80 text-[11px] font-mono font-medium text-zinc-800 tabular-nums shadow-2xs">
                    {item.kind === "project" ? (
                      <Layers className="size-3 text-emerald-600" aria-hidden="true" />
                    ) : (
                      <FileText className="size-3 text-zinc-500" aria-hidden="true" />
                    )}
                    <span>{item.code}</span>
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-white tabular-nums">
                    {item.tag}
                  </span>
                </div>

                <div className="relative z-10 bg-white/95 border border-zinc-200/80 rounded-lg p-2.5 shadow-2xs transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-zinc-500 truncate">
                      {item.metricLabel}
                    </span>
                    <span className="font-mono font-semibold text-zinc-900 tabular-nums shrink-0">
                      {item.metricValue}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-medium text-zinc-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <div className="pt-2 flex items-center justify-between gap-2 text-xs text-zinc-500">
                  <span className="truncate">{item.subtitle}</span>
                  <span className="font-mono text-[11px] tabular-nums shrink-0">
                    {item.metaRight}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="pt-2 flex items-center justify-center gap-2.5">
        <Link
          href={filter === "notes" ? "/notes" : "/#projects"}
          className="h-9 px-4 rounded-full inline-flex items-center gap-1.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
        >
          <span>
            {filter === "notes" ? "Semua Catatan Teknis" : "Lihat Detail Projects"}
          </span>
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
        {filter !== "notes" && (
          <Link
            href="/notes"
            className="h-9 px-4 rounded-full inline-flex items-center gap-1.5 text-xs font-medium bg-white text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 border border-zinc-200/80 transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            <Clock className="size-3.5 text-zinc-400" aria-hidden="true" />
            <span>Arsip Notes</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export function ExperienceAccordion({
  experiences,
}: {
  experiences: WorkExperience[];
}) {
  const [openIds, setOpenIds] = React.useState<string[]>(
    experiences[0] ? [experiences[0].id] : []
  );

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (experiences.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="Belum Ada Riwayat Pengalaman"
        description="Data pengalaman kerja belum diisi di database."
      />
    );
  }

  return (
    <div className="divide-y divide-zinc-200/80">
      {experiences.map((exp) => {
        const isOpen = openIds.includes(exp.id);
        return (
          <div key={exp.id} className="bg-white">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleItem(exp.id)}
              className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-zinc-50/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="size-8 rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 inline-flex items-center justify-center shrink-0 mt-0.5">
                  <Briefcase className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-zinc-900">
                      {exp.company_name}
                    </span>
                    {exp.is_current && (
                      <span
                        className="size-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100"
                        title="Posisi Aktif Saat Ini"
                      />
                    )}
                  </div>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    {exp.role_title}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-400 mt-1 tabular-nums">
                    {exp.employment_type} • {exp.start_date} —{" "}
                    {exp.is_current ? "Sekarang" : exp.end_date} • {exp.location}
                  </p>
                </div>
              </div>

              <ChevronDown
                className={`size-4 text-zinc-400 shrink-0 mt-1.5 transition-transform duration-150 ease-out ${
                  isOpen ? "rotate-180 text-zinc-900" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 pl-16 space-y-3 border-t border-zinc-100 bg-zinc-50/40">
                <ul className="space-y-2 list-disc pl-4 text-xs sm:text-sm leading-relaxed text-zinc-600 marker:text-zinc-400">
                  {exp.highlights.map((bullet) => (
                    <li key={bullet} className="text-pretty">
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tech_used.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono bg-white text-zinc-700 border border-zinc-200/80 px-2 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ProjectsAccordion({
  projects,
}: {
  projects: ProjectCaseStudy[];
}) {
  const [openIds, setOpenIds] = React.useState<string[]>(
    projects[0] ? [projects[0].id] : []
  );

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (projects.length === 0) {
    return (
      <EmptyState
        icon={FolderGit2}
        title="Belum Ada Studi Kasus Proyek"
        description="Tambahkan proyek melalui CMS Workspace untuk menampilkannya di sini."
      />
    );
  }

  return (
    <div>
      <div className="divide-y divide-zinc-200/80">
        {projects.map((project) => {
          const isOpen = openIds.includes(project.id);
          return (
            <div
              key={project.id}
              id={`project-${project.slug}`}
              className="bg-white scroll-mt-16"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleItem(project.id)}
                className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-zinc-50/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="size-8 rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 inline-flex items-center justify-center shrink-0 mt-0.5">
                    <Terminal className="size-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-zinc-900">
                        {project.title}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5 tabular-nums">
                      {project.code} • {project.period} • {project.client_or_company}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={`size-4 text-zinc-400 shrink-0 mt-1.5 transition-transform duration-150 ease-out ${
                    isOpen ? "rotate-180 text-zinc-900" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 pl-16 space-y-3.5 border-t border-zinc-100 bg-zinc-50/40">
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 text-pretty">
                    {project.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed text-zinc-600">
                    <div className="bg-white border border-zinc-200/80 rounded-lg p-3 space-y-1">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                        Arsitektur Sistem
                      </span>
                      <p className="text-pretty">{project.architecture_overview}</p>
                    </div>
                    <div className="bg-white border border-zinc-200/80 rounded-lg p-3 space-y-1">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                        Tantangan Teknis
                      </span>
                      <p className="text-pretty">{project.technical_challenges}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {project.key_metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-white border border-zinc-200/80 rounded-lg px-3 py-2"
                      >
                        <span className="block text-[11px] text-zinc-500">
                          {metric.label}
                        </span>
                        <span className="text-xs font-mono font-semibold text-zinc-900 tabular-nums">
                          {metric.value}{" "}
                          {metric.delta && (
                            <span className="text-emerald-700 font-normal">
                              ({metric.delta})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono bg-white text-zinc-700 border border-zinc-200/80 px-2 py-0.5 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1 flex flex-wrap items-center gap-3 text-xs">
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-zinc-900 hover:text-emerald-700 transition-colors"
                      >
                        <GitBranch className="size-3.5" aria-hidden="true" />
                        <span>Repository</span>
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors"
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

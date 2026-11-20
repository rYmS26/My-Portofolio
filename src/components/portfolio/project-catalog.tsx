"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FileCode2,
  GitBranch,
  Layers,
  RotateCcw,
} from "lucide-react";
import type { ProjectCaseStudy } from "@/types/portfolio";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CardSkeleton,
  EmptyState,
  ErrorState,
} from "@/components/ui/ui-states";

export interface ProjectCatalogProps {
  projects: ProjectCaseStudy[];
  showStateSimulator?: boolean;
}

type UIViewState = "ideal" | "loading" | "empty" | "error";

export function ProjectCatalog({
  projects,
  showStateSimulator = true,
}: ProjectCatalogProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTech, setSelectedTech] = React.useState<string>("ALL");
  const [viewState, setViewState] = React.useState<UIViewState>("ideal");

  const allTechTags = React.useMemo(() => {
    const set = new Set<string>();
    projects.forEach((project) => {
      project.tech_stack.forEach((tech) => set.add(tech));
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      const matchesTech =
        selectedTech === "ALL" || project.tech_stack.includes(selectedTech);
      const query = searchQuery.trim().toLowerCase();
      if (!query) {
        return matchesTech;
      }

      const matchesText =
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.client_or_company.toLowerCase().includes(query) ||
        project.code.toLowerCase().includes(query) ||
        project.tech_stack.some((t) => t.toLowerCase().includes(query));

      return matchesTech && matchesText;
    });
  }, [projects, searchQuery, selectedTech]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTech("ALL");
    setViewState("ideal");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-6">
            <Input
              label="Cari Studi Kasus (Nama Sistem, Kode, Klien, atau Stack)"
              placeholder="Ketik misal: SYS-2026-01, Ledger, PostgreSQL, MediSync..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="md:col-span-6 flex flex-wrap items-center justify-between md:justify-end gap-2">
            {(searchQuery || selectedTech !== "ALL") && (
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleResetFilters}
              >
                <RotateCcw className="size-4 text-zinc-600" aria-hidden="true" />
                <span>Reset Filter</span>
              </Button>
            )}

            {showStateSimulator && (
              <div
                role="group"
                aria-label="Simulasi 4 Mandatory UI States"
                className="inline-flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200/80"
              >
                {(
                  [
                    { id: "ideal", label: "Ideal" },
                    { id: "loading", label: "Skeleton" },
                    { id: "empty", label: "Empty" },
                    { id: "error", label: "Error" },
                  ] as const
                ).map((state) => (
                  <button
                    key={state.id}
                    type="button"
                    onClick={() => setViewState(state.id)}
                    className={`h-7 px-2.5 rounded-md text-xs font-medium transition-[color,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                      viewState === state.id
                        ? "bg-white text-zinc-900 shadow-2xs"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    {state.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-100">
          <span className="text-xs font-medium text-zinc-500 mr-1">
            Filter Teknologi:
          </span>
          <button
            type="button"
            onClick={() => setSelectedTech("ALL")}
            className={`h-7 px-2.5 rounded-md text-xs font-medium transition-[color,background-color,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
              selectedTech === "ALL"
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/70"
            }`}
          >
            Semua ({projects.length})
          </button>
          {allTechTags.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => setSelectedTech(tech)}
              className={`h-7 px-2.5 rounded-md text-xs font-mono transition-[color,background-color,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                selectedTech === tech
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/70"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {viewState === "loading" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}

      {viewState === "empty" && (
        <EmptyState
          icon={FileCode2}
          title="Katalog Studi Kasus Kosong"
          description="Belum ada studi kasus sistem yang dipublikasikan pada kategori ini."
          actionLabel="Tampilkan Katalog Ideal"
          onAction={handleResetFilters}
        />
      )}

      {viewState === "error" && (
        <ErrorState
          title="Gagal Memuat Katalog Studi Kasus (PostgreSQL Error 57014)"
          message="Eksekusi kueri katalog proyek melewati ambang batas waktu statement_timeout."
          solution="Klik tombol di bawah untuk memuat ulang data dari snapshot repository."
          retryLabel="Muat Ulang Katalog"
          onRetry={() => setViewState("ideal")}
        />
      )}

      {viewState === "ideal" && (
        <>
          {filteredProjects.length === 0 ? (
            <EmptyState
              icon={Layers}
              title="Tidak Ada Proyek yang Sesuai Filter"
              description={`Tidak ditemukan studi kasus untuk kata kunci "${searchQuery}" dengan filter teknologi "${selectedTech}".`}
              actionLabel="Reset Semua Filter"
              onAction={handleResetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const primaryMetric = project.key_metrics[0];

                return (
                  <article
                    key={project.id}
                    className="group bg-white border border-zinc-200/80 hover:border-zinc-300 shadow-xs rounded-xl p-5 flex flex-col justify-between gap-4 transition-[border-color,box-shadow] duration-150 ease-out"
                  >
                    <div className="space-y-3.5">
                      <div className="aspect-video bg-zinc-100 rounded-lg overflow-hidden ring-1 ring-inset ring-black/5 p-3.5 flex flex-col justify-between group-hover:scale-[1.01] transition-transform duration-300 ease-out">
                        <div className="flex items-center justify-between gap-2">
                          <Badge tone="mono">{project.code}</Badge>
                          <span className="font-mono text-xs text-zinc-500 tabular-nums">
                            {project.period}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <p className="text-xs font-mono text-zinc-500 truncate">
                            {project.client_or_company}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.tech_stack.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                className="text-[11px] font-mono bg-white/90 text-zinc-800 border border-zinc-200/80 px-1.5 py-0.5 rounded-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <p className="text-xs text-zinc-500">{project.role}</p>
                        <h3 className="text-sm font-medium text-zinc-900 line-clamp-2">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm"
                          >
                            {project.title}
                          </Link>
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-600 line-clamp-2">
                          {project.summary}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="block text-xs text-zinc-500">
                            {primaryMetric?.label}
                          </span>
                          <span className="text-sm font-semibold text-zinc-900 tabular-nums font-mono">
                            {primaryMetric?.value}{" "}
                            {primaryMetric?.delta && (
                              <span className="text-xs font-normal text-emerald-700">
                                ({primaryMetric.delta})
                              </span>
                            )}
                          </span>
                        </div>

                        <Link
                          href={`/projects/${project.slug}`}
                          className="h-9 px-3 rounded-lg inline-flex items-center gap-1.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                        >
                          <span>Studi Kasus</span>
                          <ArrowRight className="size-3.5" aria-hidden="true" />
                        </Link>
                      </div>

                      <div className="flex items-center justify-between text-xs text-zinc-500 pt-1">
                        {project.repo_url ? (
                          <a
                            href={project.repo_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-zinc-900 transition-colors"
                          >
                            <GitBranch className="size-3.5" aria-hidden="true" />
                            <span>Arsitektur Repo</span>
                          </a>
                        ) : (
                          <span>Internal Repo</span>
                        )}

                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-zinc-900 transition-colors"
                          >
                            <span>Live Preview</span>
                            <ArrowUpRight className="size-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

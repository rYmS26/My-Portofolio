"use client";

import * as React from "react";
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import type { EmploymentType, WorkExperience } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/ui-states";

export interface ExperienceTimelineProps {
  experiences: WorkExperience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const [selectedType, setSelectedType] = React.useState<"ALL" | EmploymentType>(
    "ALL"
  );
  const [selectedId, setSelectedId] = React.useState<string>(
    experiences[0]?.id ?? ""
  );

  const filtered = React.useMemo(() => {
    if (selectedType === "ALL") {
      return experiences;
    }
    return experiences.filter((item) => item.employment_type === selectedType);
  }, [experiences, selectedType]);

  React.useEffect(() => {
    if (
      filtered.length > 0 &&
      !filtered.some((item) => item.id === selectedId)
    ) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const activeExperience =
    filtered.find((item) => item.id === selectedId) ?? filtered[0];

  if (experiences.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="Belum Ada Riwayat Pengalaman Kerja"
        description="Data riwayat karir belum ditambahkan ke dalam tabel experiences."
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-zinc-500">
          Pilih posisi pada daftar di kiri untuk meninjau kontribusi arsitektur & dampak produksi.
        </p>
        <div
          role="tablist"
          aria-label="Filter tipe pekerjaan"
          className="inline-flex items-center gap-1 bg-zinc-100 p-1 rounded-lg border border-zinc-200/80"
        >
          {(["ALL", "Full-time", "Contract", "Advisory"] as const).map(
            (type) => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={selectedType === type}
                onClick={() => setSelectedType(type)}
                className={`h-8 px-3 rounded-md text-xs font-medium transition-[color,background-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                  selectedType === type
                    ? "bg-white text-zinc-900 shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                {type === "ALL" ? "Semua Peran" : type}
              </button>
            )
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={`Tidak Ada Riwayat dengan Tipe "${selectedType}"`}
          description="Silakan pilih filter tipe peran lain untuk melihat riwayat karir yang tercatat."
          actionLabel="Tampilkan Semua Peran"
          onAction={() => setSelectedType("ALL")}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 bg-white border border-zinc-200/80 shadow-xs rounded-xl divide-y divide-zinc-200/60 overflow-hidden">
            {filtered.map((exp, index) => {
              const isSelected = activeExperience?.id === exp.id;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setSelectedId(exp.id)}
                  className={`w-full text-left p-4 transition-[background-color,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900 ${
                    isSelected
                      ? "bg-zinc-100/90 text-zinc-900"
                      : "bg-white hover:bg-zinc-50/80 text-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono text-zinc-500 tabular-nums">
                      0{index + 1} • {exp.start_date} —{" "}
                      {exp.is_current ? "Sekarang" : exp.end_date}
                    </span>
                    {exp.is_current && (
                      <Badge tone="success" withDot>
                        Aktif
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium text-zinc-900">
                    {exp.role_title}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {exp.company_name}
                  </p>
                </button>
              );
            })}
          </div>

          {activeExperience && (
            <article className="lg:col-span-7 bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-zinc-100 pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                      {activeExperience.role_title}
                    </h3>
                    <Badge tone="neutral">
                      {activeExperience.employment_type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1">
                      <Building2
                        className="size-3.5 text-zinc-400"
                        aria-hidden="true"
                      />
                      <span>{activeExperience.company_name}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin
                        className="size-3.5 text-zinc-400"
                        aria-hidden="true"
                      />
                      <span>{activeExperience.location}</span>
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-700 bg-zinc-50 border border-zinc-200/80 px-2.5 py-1 rounded-md tabular-nums shrink-0">
                  <Calendar
                    className="size-3.5 text-zinc-400"
                    aria-hidden="true"
                  />
                  <span>
                    {activeExperience.start_date} —{" "}
                    {activeExperience.is_current
                      ? "Sekarang"
                      : activeExperience.end_date}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Kontribusi & Dampak Rekayasa Utama
                </h4>
                <ul className="space-y-2.5">
                  {activeExperience.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 text-pretty"
                    >
                      <CheckCircle2
                        className="size-4 text-zinc-900 shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-zinc-100 space-y-2">
                <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Stack & Infrastruktur Produksi
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeExperience.tech_used.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono bg-zinc-100 text-zinc-800 border border-zinc-200/80 px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          )}
        </div>
      )}
    </div>
  );
}

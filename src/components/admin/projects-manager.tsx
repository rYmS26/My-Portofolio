"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  FolderKanban,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import type { ProjectCaseStudy } from "@/types/portfolio";
import {
  projectFormSchema,
  type ProjectFormValues,
} from "@/lib/validations/cms";
import {
  createProjectAction,
  deleteProjectAction,
  toggleProjectPublishAction,
} from "@/lib/actions/cms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/ui-states";

export function ProjectsManager({
  initialProjects,
}: {
  initialProjects: ProjectCaseStudy[];
}) {
  const [projects, setProjects] =
    React.useState<ProjectCaseStudy[]>(initialProjects);
  const [search, setSearch] = React.useState("");
  const [showForm, setShowForm] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);
  const [busyId, setBusyId] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      code: "SYS-2026-05",
      slug: "",
      client_or_company: "",
      role: "Lead Full-Stack Engineer",
      period: "Sep 2026 — Nov 2026",
      summary: "",
      tech_stack_csv: "Next.js 16, TypeScript, PostgreSQL, Supabase",
      architecture_overview: "",
      technical_challenges: "",
      primary_metric_label: "P95 Latency",
      primary_metric_value: "32 ms",
      published: true,
      is_featured: true,
    },
  });

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.client_or_company.toLowerCase().includes(q)
    );
  }, [projects, search]);

  const onCreate = async (values: ProjectFormValues) => {
    setFeedback(null);
    const res = await createProjectAction(values);
    if (!res.success || !res.data) {
      setFeedback({
        tone: "error",
        text: res.error ?? "Gagal menambahkan studi kasus.",
      });
      return;
    }

    setProjects((prev) => [res.data!, ...prev]);
    setFeedback({
      tone: "success",
      text: `Studi kasus "${res.data.title}" (${res.data.code}) berhasil ditambahkan.`,
    });
    reset();
    setShowForm(false);
  };

  const handleTogglePublish = async (project: ProjectCaseStudy) => {
    setBusyId(project.id);
    setFeedback(null);
    const res = await toggleProjectPublishAction(project.id, !project.published);
    setBusyId(null);

    if (!res.success) {
      setFeedback({
        tone: "error",
        text: res.error ?? "Gagal mengubah status publikasi.",
      });
      return;
    }

    setProjects((prev) =>
      prev.map((item) =>
        item.id === project.id ? { ...item, published: !item.published } : item
      )
    );
    setFeedback({
      tone: "success",
      text: `Status publikasi ${project.code} diperbarui menjadi ${
        !project.published ? "Published" : "Draft"
      }.`,
    });
  };

  const handleDelete = async (project: ProjectCaseStudy) => {
    setBusyId(project.id);
    setFeedback(null);
    const res = await deleteProjectAction(project.id);
    setBusyId(null);

    if (!res.success) {
      setFeedback({
        tone: "error",
        text: res.error ?? "Gagal menghapus studi kasus.",
      });
      return;
    }

    setProjects((prev) => prev.filter((item) => item.id !== project.id));
    setFeedback({
      tone: "success",
      text: `Studi kasus ${project.code} telah dihapus dari daftar.`,
    });
  };

  return (
    <div className="space-y-5">
      <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            Manajemen Studi Kasus Proyek (`public.projects`)
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5 tabular-nums">
            Total {projects.length} proyek •{" "}
            {projects.filter((p) => p.published).length} aktif dipublikasikan
          </p>
        </div>

        <Button
          type="button"
          variant={showForm ? "outline" : "primary"}
          size="md"
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? (
            <>
              <X className="size-4" aria-hidden="true" />
              <span>Tutup Formulir</span>
            </>
          ) : (
            <>
              <Plus className="size-4" aria-hidden="true" />
              <span>Tambah Studi Kasus</span>
            </>
          )}
        </Button>
      </div>

      {feedback && (
        <div
          role="status"
          className={`rounded-xl border p-3.5 text-xs flex items-center gap-2 ${
            feedback.tone === "success"
              ? "bg-emerald-50 border-emerald-200/60 text-emerald-800"
              : "bg-red-50 border-red-200/60 text-red-800"
          }`}
        >
          {feedback.tone === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit(onCreate)}
          noValidate
          className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-4"
        >
          <div className="border-b border-zinc-100 pb-3">
            <h2 className="text-sm font-semibold text-zinc-900">
              Tambah Studi Kasus Arsitektur Baru
            </h2>
            <p className="text-xs text-zinc-500">
              Data tervalidasi Zod sebelum ditulis melalui Server Action.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Judul Studi Kasus"
                placeholder="Contoh: ArthaGate Real-Time Fraud Scoring Engine"
                error={errors.title?.message}
                {...register("title")}
              />
            </div>
            <Input
              label="Kode Sistem"
              placeholder="SYS-2026-05"
              error={errors.code?.message}
              {...register("code")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Slug URL"
              placeholder="arthagate-fraud-scoring-engine"
              error={errors.slug?.message}
              {...register("slug")}
            />
            <Input
              label="Klien / Perusahaan"
              placeholder="PT Artha Digital"
              error={errors.client_or_company?.message}
              {...register("client_or_company")}
            />
            <Input
              label="Periode Pengerjaan"
              placeholder="Sep 2026 — Nov 2026"
              error={errors.period?.message}
              {...register("period")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Peran Teknis"
              error={errors.role?.message}
              {...register("role")}
            />
            <Input
              label="Label Metrik Utama"
              placeholder="P95 Latency"
              error={errors.primary_metric_label?.message}
              {...register("primary_metric_label")}
            />
            <Input
              label="Nilai Metrik Utama"
              placeholder="32 ms"
              error={errors.primary_metric_value?.message}
              {...register("primary_metric_value")}
            />
          </div>

          <Input
            label="Tech Stack (pisahkan dengan koma)"
            error={errors.tech_stack_csv?.message}
            {...register("tech_stack_csv")}
          />

          <div>
            <label
              htmlFor="project-summary"
              className="block text-xs font-medium text-zinc-700 mb-1.5"
            >
              Ringkasan Proyek
            </label>
            <textarea
              id="project-summary"
              rows={2}
              className="w-full p-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 shadow-2xs focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none"
              placeholder="Ringkasan singkat dampak bisnis dan skala teknis sistem..."
              {...register("summary")}
            />
            {errors.summary?.message && (
              <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.summary.message}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="project-arch"
                className="block text-xs font-medium text-zinc-700 mb-1.5"
              >
                Tinjauan Arsitektur (Architecture Overview)
              </label>
              <textarea
                id="project-arch"
                rows={3}
                className="w-full p-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 shadow-2xs focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none"
                {...register("architecture_overview")}
              />
              {errors.architecture_overview?.message && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5">
                  <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.architecture_overview.message}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="project-challenges"
                className="block text-xs font-medium text-zinc-700 mb-1.5"
              >
                Tantangan Teknis & Mitigasi
              </label>
              <textarea
                id="project-challenges"
                rows={3}
                className="w-full p-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 shadow-2xs focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none"
                {...register("technical_challenges")}
              />
              {errors.technical_challenges?.message && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5">
                  <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.technical_challenges.message}</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-5 text-xs text-zinc-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                  {...register("published")}
                />
                <span>Langsung Publikasikan</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                  {...register("is_featured")}
                />
                <span>Tampilkan di Featured Grid</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              loadingText="Menyimpan Proyek..."
            >
              <span>Simpan Studi Kasus</span>
            </Button>
          </div>
        </form>
      )}

      <div className="max-w-sm">
        <Input
          label="Cari Proyek di Tabel"
          placeholder="Cari kode, judul, atau klien..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="Tidak Ada Studi Kasus Ditemukan"
          description="Tambahkan studi kasus baru atau bersihkan kata kunci pencarian Anda."
          actionLabel="Reset Pencarian"
          onAction={() => setSearch("")}
        />
      ) : (
        <div className="overflow-x-auto border border-zinc-200/80 rounded-xl bg-white shadow-xs">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Kode
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Judul & Klien
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Status
                </th>
                <th className="bg-zinc-50/80 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Metrik Utama
                </th>
                <th className="bg-zinc-50/80 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/60 transition-colors"
                >
                  <td className="py-3 px-4 text-xs font-mono text-zinc-700 tabular-nums whitespace-nowrap">
                    {project.code}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-sm font-medium text-zinc-900 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight className="size-3.5 text-zinc-400" aria-hidden="true" />
                    </Link>
                    <p className="text-xs text-zinc-500">
                      {project.client_or_company} • {project.period}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      tone={project.published ? "success" : "warning"}
                      withDot
                    >
                      {project.published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right text-sm font-medium text-zinc-900 tabular-nums font-mono whitespace-nowrap">
                    {project.key_metrics[0]?.value ?? "—"}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={busyId === project.id}
                        onClick={() => handleTogglePublish(project)}
                      >
                        {project.published ? "Unpublish" : "Publish"}
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        aria-label={`Hapus ${project.title}`}
                        disabled={busyId === project.id}
                        onClick={() => handleDelete(project)}
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

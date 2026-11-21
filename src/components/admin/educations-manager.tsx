"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import type { EducationRecord } from "@/types/portfolio";
import {
  educationFormSchema,
  type EducationFormValues,
} from "@/lib/validations/cms";
import {
  createEducationAction,
  deleteEducationAction,
} from "@/lib/actions/cms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/ui-states";

export function EducationsManager({
  initialEducations,
}: {
  initialEducations: EducationRecord[];
}) {
  const router = useRouter();
  const [educations, setEducations] =
    React.useState<EducationRecord[]>(initialEducations);
  const [showForm, setShowForm] = React.useState(false);
  const [busyId, setBusyId] = React.useState<string | null>(null);
  const [feedback, setFeedback] = React.useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      institution: "",
      degree_and_field: "",
      period: "Sep 2025 — Sep 2029",
      grade: "",
      skills_csv: "Sistem Informasi, Pengembangan Web, Laravel",
      display_order: educations.length + 1,
    },
  });

  const onCreate = async (values: EducationFormValues) => {
    setFeedback(null);
    const res = await createEducationAction(values);

    if (!res.success || !res.data) {
      setFeedback({
        tone: "error",
        text: res.error ?? "Gagal menambahkan riwayat pendidikan.",
      });
      return;
    }

    setEducations((prev) =>
      [...prev, res.data!].sort((a, b) => a.display_order - b.display_order)
    );
    setFeedback({
      tone: "success",
      text: `Pendidikan "${res.data.institution}" berhasil disimpan ke Supabase.`,
    });
    reset();
    setShowForm(false);
    router.refresh();
  };

  const handleDelete = async (edu: EducationRecord) => {
    setBusyId(edu.id);
    setFeedback(null);
    const res = await deleteEducationAction(edu.id);
    setBusyId(null);

    if (!res.success) {
      setFeedback({
        tone: "error",
        text: res.error ?? "Gagal menghapus riwayat pendidikan.",
      });
      return;
    }

    setEducations((prev) => prev.filter((item) => item.id !== edu.id));
    setFeedback({
      tone: "success",
      text: `Riwayat pendidikan "${edu.institution}" telah dihapus.`,
    });
    router.refresh();
  };

  return (
    <div className="space-y-5">
      <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            Manajemen Pendidikan (`public.educations`)
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5 tabular-nums">
            Total {educations.length} institusi pendidikan terdaftar
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
              <span>Tambah Pendidikan</span>
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
              Tambah Riwayat Pendidikan Baru
            </h2>
            <p className="text-xs text-zinc-500">
              Data akan langsung tampil pada section Education di homepage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nama Institusi / Kampus / Sekolah"
              placeholder="Contoh: Universitas Galuh (UNIGAL)"
              error={errors.institution?.message}
              {...register("institution")}
            />
            <Input
              label="Jenjang & Jurusan"
              placeholder="Contoh: S1 Sistem Informasi"
              error={errors.degree_and_field?.message}
              {...register("degree_and_field")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Periode"
              placeholder="Sep 2025 — Sep 2029"
              error={errors.period?.message}
              {...register("period")}
            />
            <Input
              label="IPK / Nilai (Opsional)"
              placeholder="IPK / Nilai: 87,91"
              error={errors.grade?.message}
              {...register("grade")}
            />
            <Input
              label="Urutan Tampil"
              type="number"
              error={errors.display_order?.message}
              {...register("display_order", { valueAsNumber: true })}
            />
          </div>

          <Input
            label="Keahlian / Mata Kuliah Utama (pisahkan dengan koma)"
            placeholder="Laravel, PHP, JavaScript, MySQL, React.js"
            error={errors.skills_csv?.message}
            {...register("skills_csv")}
          />

          <div className="pt-2 border-t border-zinc-100 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              loadingText="Menyimpan..."
            >
              <span>Simpan Pendidikan</span>
            </Button>
          </div>
        </form>
      )}

      {educations.length === 0 ? (
        <EmptyState
          icon={GraduationCap}
          title="Belum Ada Riwayat Pendidikan"
          description="Tambahkan riwayat pendidikan Anda menggunakan tombol Tambah Pendidikan."
          actionLabel="Tambah Pendidikan"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div className="overflow-x-auto border border-zinc-200/80 rounded-xl bg-white shadow-xs">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Institusi & Jurusan
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Periode
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Nilai / IPK
                </th>
                <th className="bg-zinc-50/80 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Urutan
                </th>
                <th className="bg-zinc-50/80 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {educations.map((edu) => (
                <tr
                  key={edu.id}
                  className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/60 transition-colors"
                >
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-zinc-900">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {edu.degree_and_field}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-zinc-700 tabular-nums whitespace-nowrap">
                    {edu.period}
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-emerald-700 tabular-nums whitespace-nowrap">
                    {edu.grade ?? "—"}
                  </td>
                  <td className="py-3 px-4 text-right text-sm font-mono font-medium text-zinc-900 tabular-nums">
                    {edu.display_order}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <Button
                      type="button"
                      variant="danger"
                      size="sm"
                      aria-label={`Hapus ${edu.institution}`}
                      disabled={busyId === edu.id}
                      onClick={() => handleDelete(edu)}
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                    </Button>
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

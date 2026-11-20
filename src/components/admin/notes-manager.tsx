"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Plus,
  X,
} from "lucide-react";
import type { EngineeringNote } from "@/types/portfolio";
import {
  NOTE_CATEGORIES,
  noteFormSchema,
  type NoteFormValues,
} from "@/lib/validations/cms";
import { createNoteAction, toggleNotePublishAction } from "@/lib/actions/cms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/ui-states";
import { formatIndonesianDate } from "@/lib/utils";

export function NotesManager({
  initialNotes,
}: {
  initialNotes: EngineeringNote[];
}) {
  const [notes, setNotes] = React.useState<EngineeringNote[]>(initialNotes);
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
  } = useForm<NoteFormValues>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: "",
      code: "NOTE-2026-09",
      slug: "",
      category: "Database & SQL",
      reading_time_minutes: 6,
      excerpt: "",
      content: "## Ringkasan Masalah\n\nTuliskan analisis arsitektur dan contoh kode teknis Anda di sini.",
      published: true,
    },
  });

  const onCreate = async (values: NoteFormValues) => {
    setFeedback(null);
    const res = await createNoteAction(values);
    if (!res.success || !res.data) {
      setFeedback({
        tone: "error",
        text: res.error ?? "Gagal menerbitkan catatan teknis.",
      });
      return;
    }

    setNotes((prev) => [res.data!, ...prev]);
    setFeedback({
      tone: "success",
      text: `Catatan "${res.data.title}" (${res.data.code}) berhasil disimpan.`,
    });
    reset();
    setShowForm(false);
  };

  const handleTogglePublish = async (note: EngineeringNote) => {
    setBusyId(note.id);
    setFeedback(null);
    const res = await toggleNotePublishAction(note.id, !note.published);
    setBusyId(null);

    if (!res.success) {
      setFeedback({
        tone: "error",
        text: res.error ?? "Gagal mengubah status artikel.",
      });
      return;
    }

    setNotes((prev) =>
      prev.map((item) =>
        item.id === note.id ? { ...item, published: !item.published } : item
      )
    );
    setFeedback({
      tone: "success",
      text: `Status catatan ${note.code} diperbarui menjadi ${
        !note.published ? "Published" : "Draft"
      }.`,
    });
  };

  return (
    <div className="space-y-5">
      <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            Manajemen Catatan Rekayasa (`public.posts`)
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5 tabular-nums">
            Total {notes.length} artikel teknis •{" "}
            {notes.filter((n) => n.published).length} dipublikasikan
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
              <span>Tutup Editor</span>
            </>
          ) : (
            <>
              <Plus className="size-4" aria-hidden="true" />
              <span>Tulis Catatan Baru</span>
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
              Editor Catatan Rekayasa (Markdown + Code Fence)
            </h2>
            <p className="text-xs text-zinc-500">
              Gunakan `##` untuk subjudul daftar isi otomatis dan blok ```sql / ```ts untuk cuplikan kode.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Judul Artikel Teknis"
                placeholder="Contoh: Desain Idempotent Webhook Consumer di PostgreSQL"
                error={errors.title?.message}
                {...register("title")}
              />
            </div>
            <Input
              label="Kode Artikel"
              placeholder="NOTE-2026-09"
              error={errors.code?.message}
              {...register("code")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Slug URL"
              placeholder="idempotent-webhook-consumer-postgresql"
              error={errors.slug?.message}
              {...register("slug")}
            />

            <div>
              <label
                htmlFor="note-category"
                className="block text-xs font-medium text-zinc-700 mb-1.5"
              >
                Kategori Teknis
              </label>
              <select
                id="note-category"
                className="w-full h-9 px-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 shadow-2xs focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none"
                {...register("category")}
              >
                {NOTE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Estimasi Baca (Menit)"
              type="number"
              error={errors.reading_time_minutes?.message}
              {...register("reading_time_minutes", { valueAsNumber: true })}
            />
          </div>

          <div>
            <label
              htmlFor="note-excerpt"
              className="block text-xs font-medium text-zinc-700 mb-1.5"
            >
              Ringkasan (Excerpt)
            </label>
            <textarea
              id="note-excerpt"
              rows={2}
              className="w-full p-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 shadow-2xs focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none"
              {...register("excerpt")}
            />
            {errors.excerpt?.message && (
              <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.excerpt.message}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="note-content"
              className="block text-xs font-medium text-zinc-700 mb-1.5"
            >
              Konten Artikel (Markdown)
            </label>
            <textarea
              id="note-content"
              rows={7}
              className="w-full p-3 rounded-lg border border-zinc-300 bg-white text-xs font-mono text-zinc-900 shadow-2xs focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none"
              {...register("content")}
            />
            {errors.content?.message && (
              <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5">
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.content.message}</span>
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
            <label className="inline-flex items-center gap-2 text-xs text-zinc-700 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                {...register("published")}
              />
              <span>Publikasikan ke Halaman Notes</span>
            </label>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              loadingText="Menyimpan Catatan..."
            >
              <span>Simpan Catatan Teknis</span>
            </Button>
          </div>
        </form>
      )}

      {notes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Belum Ada Catatan Rekayasa"
          description="Mulai menulis catatan teknis pertama Anda menggunakan tombol Tulis Catatan Baru."
          actionLabel="Tulis Catatan Baru"
          onAction={() => setShowForm(true)}
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
                  Judul & Kategori
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Status
                </th>
                <th className="bg-zinc-50/80 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Durasi Baca
                </th>
                <th className="bg-zinc-50/80 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr
                  key={note.id}
                  className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/60 transition-colors"
                >
                  <td className="py-3 px-4 text-xs font-mono text-zinc-700 tabular-nums whitespace-nowrap">
                    {note.code}
                  </td>
                  <td className="py-3 px-4">
                    <Link
                      href={`/notes/${note.slug}`}
                      className="text-sm font-medium text-zinc-900 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{note.title}</span>
                      <ArrowUpRight className="size-3.5 text-zinc-400" aria-hidden="true" />
                    </Link>
                    <p className="text-xs text-zinc-500 tabular-nums">
                      {note.category} • {formatIndonesianDate(note.published_at)}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <Badge tone={note.published ? "success" : "warning"} withDot>
                      {note.published ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right text-sm font-medium text-zinc-900 tabular-nums font-mono whitespace-nowrap">
                    {note.reading_time_minutes} mnt
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={busyId === note.id}
                      onClick={() => handleTogglePublish(note)}
                    >
                      {note.published ? "Set Draft" : "Publish"}
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

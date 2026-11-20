"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  FileText,
  RotateCcw,
} from "lucide-react";
import type { EngineeringNote, NoteCategory } from "@/types/portfolio";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  EmptyState,
  ErrorState,
  Skeleton,
} from "@/components/ui/ui-states";
import { formatIndonesianDate } from "@/lib/utils";

const CATEGORIES: ("ALL" | NoteCategory)[] = [
  "ALL",
  "System Architecture",
  "Database & SQL",
  "Frontend Performance",
  "DevOps & Cloud",
];

type UIViewState = "ideal" | "loading" | "empty" | "error";

export interface NotesCatalogProps {
  notes: EngineeringNote[];
}

function NotesListSkeleton() {
  return (
    <div
      role="status"
      aria-label="Memuat daftar catatan teknis"
      className="bg-white border border-zinc-200/80 shadow-xs rounded-xl divide-y divide-zinc-200/60"
    >
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}

export function NotesCatalog({ notes }: NotesCatalogProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<
    "ALL" | NoteCategory
  >("ALL");
  const [viewState, setViewState] = React.useState<UIViewState>("ideal");

  const filteredNotes = React.useMemo(() => {
    return notes.filter((note) => {
      const matchesCategory =
        selectedCategory === "ALL" || note.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) {
        return matchesCategory;
      }

      const matchesText =
        note.title.toLowerCase().includes(query) ||
        note.excerpt.toLowerCase().includes(query) ||
        note.code.toLowerCase().includes(query) ||
        note.category.toLowerCase().includes(query);

      return matchesCategory && matchesText;
    });
  }, [notes, searchQuery, selectedCategory]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setViewState("ideal");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-6">
            <Input
              label="Cari Catatan Rekayasa (Judul, Topik SQL/RLS, atau Kode Artikel)"
              placeholder="Contoh: Double-Spend, Serializable, RLS, Waterfall..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="md:col-span-6 flex flex-wrap items-center justify-between md:justify-end gap-2">
            {(searchQuery || selectedCategory !== "ALL") && (
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleReset}
              >
                <RotateCcw className="size-4 text-zinc-600" aria-hidden="true" />
                <span>Reset Filter</span>
              </Button>
            )}

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
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-100">
          <span className="text-xs font-medium text-zinc-500 mr-1">
            Domain Teknis:
          </span>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`h-7 px-2.5 rounded-md text-xs font-medium transition-[color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                selectedCategory === category
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/70"
              }`}
            >
              {category === "ALL" ? `Semua (${notes.length})` : category}
            </button>
          ))}
        </div>
      </div>

      {viewState === "loading" && <NotesListSkeleton />}

      {viewState === "empty" && (
        <EmptyState
          icon={FileText}
          title="Belum Ada Catatan Rekayasa yang Dipublikasikan"
          description="Arsip tulisan teknis masih kosong atau sedang dalam peninjauan di CMS Workspace."
          actionLabel="Kembali ke Ideal State"
          onAction={handleReset}
        />
      )}

      {viewState === "error" && (
        <ErrorState
          title="Gagal Memuat Indeks Artikel Teknis"
          message="Tidak dapat membaca tabel public.posts dari koneksi server saat ini."
          solution="Klik tombol di bawah untuk memulihkan daftar catatan dari repositori lokal."
          retryLabel="Pulihkan Daftar Catatan"
          onRetry={() => setViewState("ideal")}
        />
      )}

      {viewState === "ideal" && (
        <>
          {filteredNotes.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="Catatan Teknis Tidak Ditemukan"
              description={`Tidak ada artikel dengan kata kunci "${searchQuery}" pada kategori "${selectedCategory}".`}
              actionLabel="Tampilkan Semua Catatan"
              onAction={handleReset}
            />
          ) : (
            <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl divide-y divide-zinc-200/60">
              {filteredNotes.map((note) => (
                <article
                  key={note.id}
                  className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-zinc-50/60 transition-colors"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="mono">{note.code}</Badge>
                      <Badge tone="neutral">{note.category}</Badge>
                      <span className="text-xs text-zinc-500 tabular-nums">
                        Dipublikasikan {formatIndonesianDate(note.published_at)}
                      </span>
                    </div>

                    <h2 className="text-base font-semibold tracking-tight text-zinc-900">
                      <Link
                        href={`/notes/${note.slug}`}
                        className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-sm"
                      >
                        {note.title}
                      </Link>
                    </h2>

                    <p className="text-sm leading-relaxed text-zinc-600 text-pretty">
                      {note.excerpt}
                    </p>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 tabular-nums">
                      <Clock className="size-3.5 text-zinc-400" aria-hidden="true" />
                      <span>{note.reading_time_minutes} menit baca</span>
                    </span>

                    <Link
                      href={`/notes/${note.slug}`}
                      className="h-9 px-3.5 rounded-lg inline-flex items-center gap-1.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                    >
                      <span>Baca Artikel</span>
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

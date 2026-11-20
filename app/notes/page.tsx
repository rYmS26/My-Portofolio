import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Terminal } from "lucide-react";
import { getPublishedNotes } from "@/lib/data/repository";
import { NotesCatalog } from "@/components/notes/notes-catalog";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Catatan Rekayasa Perangkat Lunak (Engineering Notes)",
  description:
    "Artikel teknis mendalam seputar desain buku besar PostgreSQL, optimasi Row Level Security (RLS), dan arsitektur Next.js App Router.",
};

export default async function NotesPage() {
  const notes = await getPublishedNotes();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <section className="border-b border-zinc-200/80 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="mono">ENGINEERING-NOTES</Badge>
              <Badge tone="neutral">
                <BookOpen className="size-3.5 text-zinc-500" aria-hidden="true" />
                <span>{notes.length} Artikel Teknis</span>
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 text-balance">
              Catatan Rekayasa, Bedah Query SQL & Pola Arsitektur Produksi
            </h1>
            <p className="text-sm leading-relaxed text-zinc-600 text-pretty max-w-2xl">
              Dokumentasi pembelajaran praktis dari insiden produksi nyata, eksperimen isolasi transaksi PostgreSQL, hingga teknik menghilangkan *network waterfall* pada aplikasi React Server Components.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href="/contact"
              className="h-10 px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              <span>Undang Diskusi Arsitektur</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Daftar Artikel Teknis">
        <NotesCatalog notes={notes} />
      </section>

      <section className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Terminal className="size-4 text-zinc-500" aria-hidden="true" />
            <span>REPLIKASI KODE & BENCHMARK</span>
          </div>
          <h2 className="text-sm font-medium text-zinc-900">
            Seluruh potongan SQL dan TypeScript telah diuji pada PostgreSQL 16 & Next.js 16
          </h2>
          <p className="text-sm text-zinc-600">
            Gunakan potongan kode pada artikel dengan bebas untuk memperkuat idempotensi dan performa sistem Anda.
          </p>
        </div>
        <Badge tone="mono">PostgreSQL 16.4 • Node 22 LTS</Badge>
      </section>
    </div>
  );
}

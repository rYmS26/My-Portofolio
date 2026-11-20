import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  ListTree,
  UserCheck,
} from "lucide-react";
import {
  getNoteBySlug,
  getProfileSettings,
  getPublishedNotes,
} from "@/lib/data/repository";
import {
  extractHeadings,
  NoteContentRenderer,
} from "@/components/notes/note-content-renderer";
import { Badge } from "@/components/ui/badge";
import { formatIndonesianDate } from "@/lib/utils";

interface NoteDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const notes = await getPublishedNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({
  params,
}: NoteDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    return {
      title: "Catatan Teknis Tidak Ditemukan",
    };
  }

  return {
    title: `${note.title} (${note.code})`,
    description: note.excerpt,
  };
}

export default async function NoteDetailPage({ params }: NoteDetailPageProps) {
  const { slug } = await params;
  const [note, allNotes, profile] = await Promise.all([
    getNoteBySlug(slug),
    getPublishedNotes(),
    getProfileSettings(),
  ]);

  if (!note) {
    notFound();
  }

  const headings = extractHeadings(note.content);
  const relatedNotes = allNotes.filter((item) => item.slug !== note.slug);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <div>
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-md py-1"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>Kembali ke Indeks Catatan Rekayasa</span>
        </Link>
      </div>

      <header className="border-b border-zinc-200/80 pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="mono">{note.code}</Badge>
          <Badge tone="neutral">{note.category}</Badge>
          <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 tabular-nums">
            <Clock className="size-3.5 text-zinc-400" aria-hidden="true" />
            <span>{note.reading_time_minutes} menit baca</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-zinc-500 tabular-nums">
            <Calendar className="size-3.5 text-zinc-400" aria-hidden="true" />
            <span>{formatIndonesianDate(note.published_at)}</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 text-balance max-w-4xl">
          {note.title}
        </h1>

        <p className="text-sm leading-relaxed text-zinc-600 text-pretty max-w-3xl">
          {note.excerpt}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <article className="lg:col-span-8 bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 sm:p-8">
          <NoteContentRenderer content={note.content} />
        </article>

        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
          {headings.length > 0 && (
            <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
                <ListTree className="size-4 text-zinc-500" aria-hidden="true" />
                <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Struktur Pembahasan
                </h2>
              </div>
              <ul className="space-y-2 text-xs">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="text-zinc-600 hover:text-zinc-900 transition-colors block py-0.5"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-2.5">
              <UserCheck className="size-4 text-zinc-500" aria-hidden="true" />
              <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Penulis Teknis
              </h2>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900">
                {profile.full_name}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">{profile.headline}</p>
            </div>
            <p className="text-xs leading-relaxed text-zinc-600">
              Memiliki pertanyaan seputar implementasi pola ini di arsitektur produksi tim Anda?
            </p>
            <Link
              href="/contact"
              className="w-full h-9 px-3.5 rounded-lg inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <span>Diskusikan Topik Ini</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </aside>
      </div>

      {relatedNotes.length > 0 && (
        <section className="pt-8 border-t border-zinc-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-zinc-500" aria-hidden="true" />
              <h2 className="text-sm font-medium text-zinc-900">
                Catatan Rekayasa Lainnya
              </h2>
            </div>
            <Link
              href="/notes"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedNotes.slice(0, 2).map((item) => (
              <Link
                key={item.id}
                href={`/notes/${item.slug}`}
                className="group bg-white border border-zinc-200/80 hover:border-zinc-300 shadow-xs rounded-xl p-5 flex flex-col justify-between gap-3 transition-[border-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                <div className="flex items-center justify-between">
                  <Badge tone="mono">{item.code}</Badge>
                  <span className="text-xs font-mono text-zinc-500 tabular-nums">
                    {item.reading_time_minutes} mnt baca
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 group-hover:underline">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

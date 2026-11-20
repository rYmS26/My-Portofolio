import Link from "next/link";
import { FileText } from "lucide-react";
import { EmptyState } from "@/components/ui/ui-states";

export default function NoteNotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <EmptyState
        icon={FileText}
        title="Artikel Teknis Tidak Ditemukan (404)"
        description="Slug catatan rekayasa yang Anda cari tidak ditemukan atau belum dipublikasikan."
        actionLabel="Kembali ke Indeks Catatan Teknis"
        actionHref="/notes"
      />
      <div className="mt-4 text-center">
        <Link
          href="/"
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900"
        >
          Atau kembali ke halaman utama
        </Link>
      </div>
    </div>
  );
}

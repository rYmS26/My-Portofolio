import Link from "next/link";
import { FileCode2 } from "lucide-react";
import { EmptyState } from "@/components/ui/ui-states";

export default function ProjectNotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <EmptyState
        icon={FileCode2}
        title="Studi Kasus Arsitektur Tidak Ditemukan (404)"
        description="Slug studi kasus yang Anda akses tidak terdaftar atau belum dipublikasikan di database."
        actionLabel="Kembali ke Katalog Studi Kasus"
        actionHref="/projects"
      />
      <div className="mt-4 text-center">
        <Link
          href="/"
          className="text-xs font-medium text-zinc-500 hover:text-zinc-900"
        >
          Atau kembali ke halaman ringkasan utama
        </Link>
      </div>
    </div>
  );
}

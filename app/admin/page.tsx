import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Database,
  FileCode2,
  ShieldCheck,
} from "lucide-react";
import {
  getAllInquiriesForAdmin,
  getAllProjectsForAdmin,
  getProfileSettings,
  getPublishedNotes,
  getWorkExperiences,
} from "@/lib/data/repository";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { AvailabilityBadge, Badge } from "@/components/ui/badge";
import { formatIndonesianDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "CMS Workspace — Ringkasan Sistem & Skema Database",
};

export default async function AdminDashboardPage() {
  const [profile, projects, experiences, notes, inquiries] = await Promise.all([
    getProfileSettings(),
    getAllProjectsForAdmin(),
    getWorkExperiences(),
    getPublishedNotes(),
    getAllInquiriesForAdmin(),
  ]);

  const supabaseConfigured = isSupabaseConfigured();

  const schemaTables = [
    {
      tableName: "public.profile_settings",
      description: "Konfigurasi profil utama & status ketersediaan kerja",
      rlsPolicy: "SELECT public • ALL authenticated",
      recordCount: 1,
    },
    {
      tableName: "public.projects",
      description: "Studi kasus proyek, arsitektur, tantangan, & metrik JSONB",
      rlsPolicy: "SELECT published=true • ALL authenticated",
      recordCount: projects.length,
    },
    {
      tableName: "public.experiences",
      description: "Riwayat pengalaman kerja & highlight kontribusi teknis",
      rlsPolicy: "SELECT public • ALL authenticated",
      recordCount: experiences.length,
    },
    {
      tableName: "public.posts",
      description: "Catatan rekayasa perangkat lunak (Technical Blog)",
      rlsPolicy: "SELECT published=true • ALL authenticated",
      recordCount: notes.length,
    },
    {
      tableName: "public.inquiries",
      description: "Kotak masuk pesan perekrutan & konsultasi arsitektur",
      rlsPolicy: "INSERT public • ALL authenticated",
      recordCount: inquiries.length,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
              CMS Workspace & Status Skema Database
            </h1>
            <AvailabilityBadge status={profile.availability_status} />
          </div>
          <p className="text-xs text-zinc-500">
            Pembaruan terakhir: {formatIndonesianDate(profile.updated_at)} •{" "}
            {supabaseConfigured
              ? "Terhubung ke instance Supabase PostgreSQL"
              : "Berjalan dengan Repository Fallback Mode (Siap migrasi SQL)"}
          </p>
        </div>

        <Link
          href="/"
          className="h-9 px-3.5 rounded-lg inline-flex items-center gap-1.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
        >
          <span>Lihat Portofolio Publik</span>
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-4 space-y-1">
          <span className="text-xs text-zinc-500">Total Studi Kasus</span>
          <p className="text-2xl font-semibold text-zinc-900 tabular-nums font-mono">
            {projects.length}
          </p>
          <span className="text-xs text-emerald-700 font-medium">
            {projects.filter((p) => p.published).length} Dipublikasikan
          </span>
        </div>

        <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-4 space-y-1">
          <span className="text-xs text-zinc-500">Riwayat Pengalaman</span>
          <p className="text-2xl font-semibold text-zinc-900 tabular-nums font-mono">
            {experiences.length}
          </p>
          <span className="text-xs text-zinc-500 tabular-nums">
            {profile.years_of_experience}+ Tahun Karir
          </span>
        </div>

        <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-4 space-y-1">
          <span className="text-xs text-zinc-500">Catatan Rekayasa</span>
          <p className="text-2xl font-semibold text-zinc-900 tabular-nums font-mono">
            {notes.length}
          </p>
          <span className="text-xs text-zinc-500">Artikel Teknis</span>
        </div>

        <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-4 space-y-1">
          <span className="text-xs text-zinc-500">Pesan Hire Masuk</span>
          <p className="text-2xl font-semibold text-zinc-900 tabular-nums font-mono">
            {inquiries.length}
          </p>
          <span className="text-xs text-amber-700 font-medium tabular-nums">
            {inquiries.filter((i) => i.status === "unread").length} Belum Dibaca
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="size-4 text-zinc-500" aria-hidden="true" />
            <h2 className="text-sm font-medium text-zinc-900">
              Status Tabel PostgreSQL & Kebijakan Row Level Security (RLS)
            </h2>
          </div>
          <Badge tone="mono">supabase/schema.sql</Badge>
        </div>

        <div className="overflow-x-auto border border-zinc-200/80 rounded-xl bg-white shadow-xs">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Nama Tabel
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Peran Data
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Kebijakan RLS
                </th>
                <th className="bg-zinc-50/80 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Jumlah Baris
                </th>
              </tr>
            </thead>
            <tbody>
              {schemaTables.map((table) => (
                <tr
                  key={table.tableName}
                  className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/60 transition-colors"
                >
                  <td className="py-3 px-4 text-xs font-mono font-medium text-zinc-900">
                    {table.tableName}
                  </td>
                  <td className="py-3 px-4 text-sm text-zinc-600">
                    {table.description}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                      <ShieldCheck className="size-3.5" aria-hidden="true" />
                      <span>{table.rlsPolicy}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-sm font-medium text-zinc-900 tabular-nums font-mono">
                    {table.recordCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode2 className="size-4 text-zinc-500" aria-hidden="true" />
            <h2 className="text-sm font-medium text-zinc-900">
              Kotak Masuk Klien & Perekrutan Terbaru (`public.inquiries`)
            </h2>
          </div>
          <Badge tone="neutral">
            <CheckCircle2 className="size-3.5 text-emerald-700" aria-hidden="true" />
            <span>Phase 2 Connected</span>
          </Badge>
        </div>

        <div className="overflow-x-auto border border-zinc-200/80 rounded-xl bg-white shadow-xs">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Kode Referensi
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Pengirim & Perusahaan
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Tipe Kolaborasi
                </th>
                <th className="bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Status
                </th>
                <th className="bg-zinc-50/80 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80">
                  Estimasi Kompensasi
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/60 transition-colors"
                >
                  <td className="py-3 px-4 text-xs font-mono text-zinc-700 tabular-nums">
                    {inquiry.reference_code}
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-zinc-900">
                      {inquiry.sender_name}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {inquiry.company} • {inquiry.sender_email}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-xs text-zinc-600">
                    {inquiry.inquiry_type}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      tone={
                        inquiry.status === "unread"
                          ? "warning"
                          : inquiry.status === "replied"
                          ? "success"
                          : "neutral"
                      }
                      withDot
                    >
                      {inquiry.status === "unread"
                        ? "Belum Dibaca"
                        : inquiry.status === "replied"
                        ? "Dibalas"
                        : inquiry.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right text-sm font-medium text-zinc-900 tabular-nums font-mono">
                    {inquiry.budget_or_comp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

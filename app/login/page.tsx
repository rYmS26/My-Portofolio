import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Database, Terminal } from "lucide-react";
import { getAuthenticatedAdmin } from "@/lib/actions/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { LoginForm } from "@/components/auth/login-form";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/ui-states";

export const metadata: Metadata = {
  title: "Admin Login — CMS Workspace",
  description:
    "Halaman otorisasi administrator portofolio untuk mengelola studi kasus arsitektur, artikel teknis, dan kotak masuk klien.",
};

function LoginFormSkeleton() {
  return (
    <div
      role="status"
      aria-label="Memuat formulir login"
      className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-5"
    >
      <div className="space-y-2 border-b border-zinc-100 pb-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3.5 w-64" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-9 w-full rounded-lg" />
        <Skeleton className="h-9 w-full rounded-lg" />
        <Skeleton className="h-9 w-36 rounded-lg ml-auto" />
      </div>
    </div>
  );
}

async function LoginGuardAndForm({
  supabaseReady,
}: {
  supabaseReady: boolean;
}) {
  const currentAdmin = await getAuthenticatedAdmin();
  if (currentAdmin) {
    redirect("/admin");
  }

  return <LoginForm supabaseConfigured={supabaseReady} />;
}

export default function LoginPage() {
  const supabaseReady = isSupabaseConfigured();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2">
            <Badge tone="mono">AUTH-GATEWAY-01</Badge>
            <Badge tone="neutral">Supabase PostgreSQL RLS</Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 text-balance">
            Portal Administrasi & Headless CMS DevFolio Studio
          </h1>

          <p className="text-sm leading-relaxed text-zinc-600 text-pretty">
            Gunakan portal ini untuk memperbarui status ketersediaan kerja (Availability Status), mempublikasikan studi kasus sistem baru, menulis catatan rekayasa perangkat lunak, serta meninjau pesan tawaran kerja yang masuk.
          </p>

          <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-zinc-500" aria-hidden="true" />
                <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Konfigurasi Lingkungan & Akses
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500 tabular-nums">
                Phase 2 Ready
              </span>
            </div>

            <dl className="divide-y divide-zinc-200/60 text-xs">
              <div className="py-2 flex items-center justify-between gap-4">
                <dt className="text-zinc-500">Mode Penyimpanan</dt>
                <dd className="font-mono font-medium text-zinc-900">
                  {supabaseReady
                    ? "Supabase PostgreSQL (Live)"
                    : "Fallback Seed + Cookie Session"}
                </dd>
              </div>
              <div className="py-2 flex items-center justify-between gap-4">
                <dt className="text-zinc-500">Email Admin Demo</dt>
                <dd className="font-mono font-medium text-zinc-900 select-all">
                  arif.pratama@devfolio.id
                </dd>
              </div>
              <div className="py-2 flex items-center justify-between gap-4">
                <dt className="text-zinc-500">Kata Sandi Demo</dt>
                <dd className="font-mono font-medium text-zinc-900 select-all tabular-nums">
                  DevFolio#2026
                </dd>
              </div>
              <div className="pt-2 flex items-center justify-between gap-4">
                <dt className="text-zinc-500">Skema SQL & RLS</dt>
                <dd className="font-mono text-zinc-700 inline-flex items-center gap-1">
                  <Database className="size-3.5 text-zinc-400" aria-hidden="true" />
                  <span>supabase/schema.sql (5 Tabel)</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="lg:col-span-6">
          <Suspense fallback={<LoginFormSkeleton />}>
            <LoginGuardAndForm supabaseReady={supabaseReady} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  Cpu,
  GitBranch,
  Layers,
  Server,
  ShieldAlert,
  UserCheck,
} from "lucide-react";
import {
  getProjectBySlug,
  getPublishedProjects,
} from "@/lib/data/repository";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/ui-states";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Studi Kasus Tidak Ditemukan",
    };
  }

  return {
    title: `${project.title} (${project.code})`,
    description: project.summary,
  };
}

function ProjectDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-6">
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  );
}

async function ProjectDetailContent({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getPublishedProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const otherProjects = allProjects.filter((item) => item.slug !== project.slug);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-md py-1"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>Kembali ke Katalog Studi Kasus</span>
        </Link>
      </div>

      <header className="border-b border-zinc-200/80 pb-10 space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="mono">{project.code}</Badge>
          <Badge tone="success" withDot>
            Production System
          </Badge>
          <span className="text-xs font-mono text-zinc-500 tabular-nums">
            {project.period}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-3">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 text-balance">
              {project.title}
            </h1>
            <p className="text-sm leading-relaxed text-zinc-600 text-pretty">
              {project.summary}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-2.5">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="h-9 px-3.5 rounded-lg inline-flex items-center gap-1.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                <span>Buka Live System</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noreferrer"
                className="h-9 px-3.5 rounded-lg inline-flex items-center gap-1.5 text-xs font-medium bg-white text-zinc-900 hover:bg-zinc-50 border border-zinc-300 shadow-2xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                <GitBranch className="size-3.5 text-zinc-600" aria-hidden="true" />
                <span>Dokumentasi Repo</span>
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {project.key_metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-4 flex items-baseline justify-between gap-4"
            >
              <div>
                <span className="block text-xs text-zinc-500">
                  {metric.label}
                </span>
                <span className="mt-1 block text-xl font-semibold text-zinc-900 tabular-nums font-mono">
                  {metric.value}
                </span>
              </div>
              {metric.delta && (
                <Badge tone="success" className="tabular-nums font-mono">
                  {metric.delta}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <Server className="size-4 text-zinc-500" aria-hidden="true" />
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                1. Tinjauan Arsitektur Sistem (Architecture Overview)
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 text-pretty">
              {project.architecture_overview}
            </p>

            <div className="bg-zinc-50/80 border border-zinc-200/80 rounded-lg p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>SYSTEM PIPELINE & DATA FLOW</span>
                <span className="tabular-nums">{project.code}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                <div className="bg-white border border-zinc-200/80 rounded-md p-2.5">
                  <span className="text-zinc-400 block">INGRESS / UI</span>
                  <span className="text-zinc-900 font-medium">
                    Next.js RSC + Zod Contract
                  </span>
                </div>
                <div className="bg-white border border-zinc-200/80 rounded-md p-2.5">
                  <span className="text-zinc-400 block">EXECUTION ENGINE</span>
                  <span className="text-zinc-900 font-medium">
                    Idempotent Worker & Locks
                  </span>
                </div>
                <div className="bg-white border border-zinc-200/80 rounded-md p-2.5">
                  <span className="text-zinc-400 block">STORAGE & AUDIT</span>
                  <span className="text-zinc-900 font-medium">
                    PostgreSQL 16 + Strict RLS
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
              <ShieldAlert className="size-4 text-zinc-500" aria-hidden="true" />
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                2. Tantangan Teknis & Mitigasi Bottleneck
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600 text-pretty">
              {project.technical_challenges}
            </p>
            <ul className="space-y-2 pt-1">
              <li className="flex items-start gap-2.5 text-sm text-zinc-600">
                <CheckCircle2
                  className="size-4 text-emerald-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  Eliminasi *race condition* menggunakan penguncian baris deterministik dan *unique constraint* pada kunci idempotensi.
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-zinc-600">
                <CheckCircle2
                  className="size-4 text-emerald-700 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  Validasi skema input-output secara ketat tanpa tipe `any` dari boundary HTTP hingga lapisan kueri database.
                </span>
              </li>
            </ul>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 space-y-4">
            <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500 border-b border-zinc-100 pb-2.5">
              Spesifikasi Proyek
            </h2>
            <dl className="divide-y divide-zinc-200/60 text-xs">
              <div className="py-2.5 flex items-center justify-between gap-2">
                <dt className="text-zinc-500 inline-flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-zinc-400" aria-hidden="true" />
                  <span>Organisasi</span>
                </dt>
                <dd className="font-medium text-zinc-900 text-right">
                  {project.client_or_company}
                </dd>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-2">
                <dt className="text-zinc-500 inline-flex items-center gap-1.5">
                  <UserCheck className="size-3.5 text-zinc-400" aria-hidden="true" />
                  <span>Peran</span>
                </dt>
                <dd className="font-medium text-zinc-900 text-right">
                  {project.role}
                </dd>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-2">
                <dt className="text-zinc-500 inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-zinc-400" aria-hidden="true" />
                  <span>Periode</span>
                </dt>
                <dd className="font-mono text-zinc-900 tabular-nums text-right">
                  {project.period}
                </dd>
              </div>
            </dl>

            <div className="pt-2 border-t border-zinc-100 space-y-2">
              <span className="block text-xs font-medium uppercase tracking-wider text-zinc-500">
                Tech Stack Produksi
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono bg-zinc-100 text-zinc-800 border border-zinc-200/80 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="size-4 text-zinc-500" aria-hidden="true" />
              <h3 className="text-sm font-medium text-zinc-900">
                Membangun Sistem Serupa?
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-zinc-600">
              Jadwalkan sesi diskusi teknis 30 menit untuk membedah kebutuhan skalabilitas atau arsitektur database tim Anda.
            </p>
            <Link
              href="/contact"
              className="w-full h-9 px-3.5 rounded-lg inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <span>Hubungi untuk Konsultasi</span>
            </Link>
          </div>
        </aside>
      </div>

      {otherProjects.length > 0 && (
        <section className="pt-8 border-t border-zinc-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="size-4 text-zinc-500" aria-hidden="true" />
              <h2 className="text-sm font-medium text-zinc-900">
                Studi Kasus Sistem Lainnya
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-xs font-medium text-zinc-600 hover:text-zinc-900"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.slice(0, 2).map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.slug}`}
                className="group bg-white border border-zinc-200/80 hover:border-zinc-300 shadow-xs rounded-xl p-5 flex flex-col justify-between gap-3 transition-[border-color,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                <div className="flex items-center justify-between">
                  <Badge tone="mono">{item.code}</Badge>
                  <span className="text-xs font-mono text-zinc-500 tabular-nums">
                    {item.period}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 group-hover:underline">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {item.summary}
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

export default function ProjectDetailPage(props: ProjectDetailPageProps) {
  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectDetailContent {...props} />
    </Suspense>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu, Layers, ShieldCheck } from "lucide-react";
import { getPublishedProjects } from "@/lib/data/repository";
import { ProjectCatalog } from "@/components/portfolio/project-catalog";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Studi Kasus Arsitektur & Sistem Produksi",
  description:
    "Daftar mendalam studi kasus rekayasa perangkat lunak, desain skema PostgreSQL, mesin settlement pembayaran, dan optimasi latensi aplikasi web.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <section className="border-b border-zinc-200/80 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="mono">CASE-STUDIES-INDEX</Badge>
              <Badge tone="neutral">
                <Layers className="size-3.5 text-zinc-500" aria-hidden="true" />
                <span>{projects.length} Sistem Terdokumentasi</span>
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 text-balance">
              Studi Kasus Arsitektur, Keputusan Teknis & Metrik Produksi
            </h1>
            <p className="text-sm leading-relaxed text-zinc-600 text-pretty max-w-2xl">
              Setiap studi kasus membedah permasalahan bisnis nyata, desain arsitektur end-to-end, penanganan konkurensi database, serta dampak kuantitatif terhadap latensi dan reliabilitas sistem.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <Link
              href="/contact"
              className="h-10 px-4 py-2 rounded-lg inline-flex items-center gap-2 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              <span>Diskusikan Arsitektur Anda</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Katalog Studi Kasus">
        <ProjectCatalog projects={projects} showStateSimulator />
      </section>

      <section className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Cpu className="size-4 text-zinc-500" aria-hidden="true" />
            <span>STANDAR AUDIT ARSITEKTUR</span>
          </div>
          <h2 className="text-sm font-medium text-zinc-900">
            Butuh telaah lebih dalam terhadap kode sumber atau skema migrasi SQL?
          </h2>
          <p className="text-sm text-zinc-600">
            Seluruh metrik P95 latency dan throughput diambil dari pemantauan OpenTelemetry dan `EXPLAIN (ANALYZE, BUFFERS)` di lingkungan produksi.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge tone="success" withDot>
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            <span>Production Verified</span>
          </Badge>
        </div>
      </section>
    </div>
  );
}

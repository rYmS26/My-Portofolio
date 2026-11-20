import type { Metadata } from "next";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { getProfileSettings } from "@/lib/data/repository";
import { HireMeForm } from "@/components/contact/hire-me-form";
import { AvailabilityBadge, Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Jadwalkan Diskusi Teknis & Perekrutan (Hire Me)",
  description:
    "Hubungi Arif Pratama untuk peran Principal/Senior Full-Stack Engineer, konsultasi arsitektur PostgreSQL, atau rekayasa sistem Next.js.",
};

export default async function ContactPage() {
  const profile = await getProfileSettings();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="mono">COLLABORATION-DESK</Badge>
              <AvailabilityBadge status={profile.availability_status} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 text-balance">
              Diskusikan Peran Engineering atau Arsitektur Sistem Anda
            </h1>

            <p className="text-sm leading-relaxed text-zinc-600 text-pretty">
              {profile.availability_note}. Silakan isi spesifikasi singkat di samping atau hubungi melalui saluran langsung di bawah ini.
            </p>
          </div>

          <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="size-4 text-zinc-500" aria-hidden="true" />
                <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Parameter Ketersediaan & SLA
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500 tabular-nums">
                UTC+7
              </span>
            </div>

            <dl className="divide-y divide-zinc-200/60 text-xs">
              <div className="py-2.5 flex items-center justify-between gap-4">
                <dt className="text-zinc-500 inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-zinc-400" aria-hidden="true" />
                  <span>Domisili</span>
                </dt>
                <dd className="font-medium text-zinc-900">{profile.location}</dd>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-4">
                <dt className="text-zinc-500 inline-flex items-center gap-1.5">
                  <Clock className="size-3.5 text-zinc-400" aria-hidden="true" />
                  <span>Waktu Respons Rata-Rata</span>
                </dt>
                <dd className="font-mono font-medium text-zinc-900 tabular-nums">
                  &lt; 6 Jam Kerja
                </dd>
              </div>
              <div className="py-2.5 flex items-center justify-between gap-4">
                <dt className="text-zinc-500 inline-flex items-center gap-1.5">
                  <Mail className="size-3.5 text-zinc-400" aria-hidden="true" />
                  <span>Email Langsung</span>
                </dt>
                <dd className="font-mono font-medium text-zinc-900">
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:underline"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div className="pt-2.5 flex items-center justify-between gap-4">
                <dt className="text-zinc-500 inline-flex items-center gap-1.5">
                  <ShieldCheck
                    className="size-3.5 text-emerald-700"
                    aria-hidden="true"
                  />
                  <span>Preferensi Kontrak</span>
                </dt>
                <dd className="font-medium text-zinc-900">
                  Full-time • Sprint Advisory
                </dd>
              </div>
            </dl>

            <div className="pt-2 border-t border-zinc-100 flex items-center gap-2">
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 h-9 px-3 rounded-lg inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
              <a
                href={profile.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 h-9 px-3 rounded-lg inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <HireMeForm />
        </div>
      </div>
    </div>
  );
}

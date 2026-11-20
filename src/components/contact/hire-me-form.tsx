"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Send,
} from "lucide-react";
import {
  BUDGET_OPTIONS,
  hireInquirySchema,
  INQUIRY_TYPES,
  type HireInquiryFormValues,
} from "@/lib/validations/inquiry";
import { submitHireInquiryAction } from "@/lib/actions/inquiry";
import type { HireInquiry } from "@/types/portfolio";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatIndonesianDate } from "@/lib/utils";

export function HireMeForm() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] =
    React.useState<HireInquiry | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<HireInquiryFormValues>({
    resolver: zodResolver(hireInquirySchema),
    defaultValues: {
      sender_name: "",
      sender_email: "",
      company: "",
      inquiry_type: "Project Consultation",
      budget_or_comp: BUDGET_OPTIONS[1],
      message: "",
    },
  });

  const selectedInquiryType = watch("inquiry_type");

  const onSubmit = async (values: HireInquiryFormValues) => {
    setServerError(null);
    const response = await submitHireInquiryAction(values);

    if (!response.success || !response.data) {
      setServerError(
        response.error ??
          "Gagal mengirim pesan. Periksa kembali isian formulir Anda."
      );
      return;
    }

    setSubmittedRecord(response.data);
    reset();
  };

  if (submittedRecord) {
    return (
      <div
        role="status"
        className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-5"
      >
        <div className="flex items-start justify-between gap-4 border-b border-zinc-100 pb-4">
          <div className="flex items-start gap-3">
            <span className="size-9 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-700 inline-flex items-center justify-center shrink-0">
              <CheckCircle2 className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-semibold tracking-tight text-zinc-900">
                Permintaan Diskusi Teknis Berhasil Diterima
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Tercatat pada sistem inbox dengan SLA respons maksimal 1×24 jam kerja.
              </p>
            </div>
          </div>
          <Badge tone="mono">{submittedRecord.reference_code}</Badge>
        </div>

        <dl className="divide-y divide-zinc-200/60 text-xs">
          <div className="py-2 flex items-center justify-between gap-4">
            <dt className="text-zinc-500">Pengirim & Organisasi</dt>
            <dd className="font-medium text-zinc-900">
              {submittedRecord.sender_name} ({submittedRecord.company})
            </dd>
          </div>
          <div className="py-2 flex items-center justify-between gap-4">
            <dt className="text-zinc-500">Tipe Kolaborasi</dt>
            <dd className="font-medium text-zinc-900">
              {submittedRecord.inquiry_type}
            </dd>
          </div>
          <div className="py-2 flex items-center justify-between gap-4">
            <dt className="text-zinc-500">Estimasi Kompensasi / Anggaran</dt>
            <dd className="font-mono font-medium text-zinc-900 tabular-nums">
              {submittedRecord.budget_or_comp}
            </dd>
          </div>
          <div className="py-2 flex items-center justify-between gap-4">
            <dt className="text-zinc-500">Waktu Pencatatan</dt>
            <dd className="font-mono text-zinc-700 tabular-nums">
              {formatIndonesianDate(submittedRecord.created_at)}
            </dd>
          </div>
        </dl>

        <div className="pt-2 flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setSubmittedRecord(null)}
          >
            <RotateCcw className="size-4 text-zinc-600" aria-hidden="true" />
            <span>Kirim Pesan Lainnya</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Formulir Inisiasi Proyek & Perekrutan
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Data terkirim langsung ke tabel `public.inquiries` dan tervalidasi dengan skema Zod.
          </p>
        </div>
        <Badge tone="success" withDot>
          Direct Inbox
        </Badge>
      </div>

      {serverError && (
        <div
          role="alert"
          className="border border-red-200/60 bg-red-50 text-red-700 rounded-lg p-3.5 text-xs flex items-start gap-2.5"
        >
          <AlertCircle className="size-4 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">Gagal Mengirim Pesan</p>
            <p className="mt-0.5 text-red-600">{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nama Lengkap Anda"
            placeholder="Contoh: Hendra Wijaya"
            error={errors.sender_name?.message}
            {...register("sender_name")}
          />

          <Input
            label="Email Korporat / Aktif"
            type="email"
            placeholder="hendra.wijaya@perusahaan.co.id"
            error={errors.sender_email?.message}
            {...register("sender_email")}
          />
        </div>

        <Input
          label="Perusahaan / Organisasi"
          placeholder="Contoh: PT Nusantara Finansial Teknologi"
          error={errors.company?.message}
          {...register("company")}
        />

        <div>
          <span className="block text-xs font-medium text-zinc-700 mb-1.5">
            Skema Kolaborasi yang Diinginkan
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {INQUIRY_TYPES.map((type) => {
              const active = selectedInquiryType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setValue("inquiry_type", type, { shouldValidate: true })
                  }
                  className={`h-9 px-3 rounded-lg border text-xs font-medium text-left flex items-center justify-between transition-[color,background-color,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                    active
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <span>{type}</span>
                </button>
              );
            })}
          </div>
          {errors.inquiry_type?.message && (
            <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5">
              <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.inquiry_type.message}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="budget_or_comp"
            className="block text-xs font-medium text-zinc-700 mb-1.5"
          >
            Estimasi Kompensasi Bulanan atau Anggaran Proyek (IDR)
          </label>
          <select
            id="budget_or_comp"
            className="w-full h-9 px-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 font-mono tabular-nums shadow-2xs focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none"
            {...register("budget_or_comp")}
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.budget_or_comp?.message && (
            <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5">
              <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.budget_or_comp.message}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="inquiry_message"
            className="block text-xs font-medium text-zinc-700 mb-1.5"
          >
            Konteks Arsitektur, Target Sistem, & Linimasa
          </label>
          <textarea
            id="inquiry_message"
            rows={4}
            placeholder="Jelaskan konteks sistem saat ini, target skala transaksi/pengguna, atau posisi peran yang sedang dibutuhkan..."
            className="w-full p-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 shadow-2xs focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none"
            {...register("message")}
          />
          {errors.message?.message && (
            <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5">
              <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.message.message}</span>
            </p>
          )}
        </div>

        <div className="pt-2 flex items-center justify-between gap-4 border-t border-zinc-100">
          <span className="text-xs text-zinc-500">
            Kerahasiaan arsitektur (NDA) dijamin sejak pesan pertama.
          </span>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            loadingText="Mengirim ke Inbox..."
          >
            <Send className="size-4" aria-hidden="true" />
            <span>Kirim Rencana Diskusi</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </div>
  );
}

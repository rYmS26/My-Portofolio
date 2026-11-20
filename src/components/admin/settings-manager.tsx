"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Save } from "lucide-react";
import type { AvailabilityStatus, ProfileSettings } from "@/types/portfolio";
import {
  profileSettingsSchema,
  type ProfileSettingsFormValues,
} from "@/lib/validations/cms";
import { updateProfileSettingsAction } from "@/lib/actions/cms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvailabilityBadge } from "@/components/ui/badge";

const STATUS_OPTIONS: {
  value: AvailabilityStatus;
  title: string;
  description: string;
}[] = [
  {
    value: "available",
    title: "Available for Hire",
    description: "Terbuka untuk peran Principal/Senior Full-Stack & proyek baru.",
  },
  {
    value: "open_to_selective",
    title: "Selective Advisory & Roles",
    description: "Hanya menerima diskusi konsultasi arsitektur tertentu.",
  },
  {
    value: "unavailable",
    title: "Currently Fully Booked",
    description: "Sedang fokus penuh pada komitmen produksi aktif saat ini.",
  },
];

export function SettingsManager({
  initialProfile,
}: {
  initialProfile: ProfileSettings;
}) {
  const router = useRouter();
  const [feedback, setFeedback] = React.useState<{
    tone: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSettingsFormValues>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      full_name: initialProfile.full_name,
      headline: initialProfile.headline,
      bio: initialProfile.bio,
      location: initialProfile.location,
      email: initialProfile.email,
      github_url: initialProfile.github_url,
      linkedin_url: initialProfile.linkedin_url,
      availability_status: initialProfile.availability_status,
      availability_note: initialProfile.availability_note,
    },
  });

  const currentStatus = watch("availability_status");

  const onSubmit = async (values: ProfileSettingsFormValues) => {
    setFeedback(null);
    const res = await updateProfileSettingsAction(values);

    if (!res.success) {
      setFeedback({
        tone: "error",
        text: res.error ?? "Gagal memperbarui pengaturan profil.",
      });
      return;
    }

    setFeedback({
      tone: "success",
      text: "Pengaturan profil & status ketersediaan kerja berhasil disimpan ke database Supabase.",
    });
    router.refresh();
  };

  return (
    <div className="space-y-5">
      <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
            Pengaturan Profil & Status Ketersediaan (`public.profile_settings`)
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Perubahan status langsung memengaruhi indikator di Navbar, Hero Banner, dan Halaman Kontak.
          </p>
        </div>
        <AvailabilityBadge status={currentStatus} />
      </div>

      {feedback && (
        <div
          role="status"
          className={`rounded-xl border p-3.5 text-xs flex items-center gap-2 ${
            feedback.tone === "success"
              ? "bg-emerald-50 border-emerald-200/60 text-emerald-800"
              : "bg-red-50 border-red-200/60 text-red-800"
          }`}
        >
          {feedback.tone === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
          ) : (
            <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-5"
      >
        <div className="space-y-2">
          <span className="block text-xs font-medium text-zinc-700">
            Status Ketersediaan Kerja (Availability Status)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {STATUS_OPTIONS.map((option) => {
              const selected = currentStatus === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setValue("availability_status", option.value, {
                      shouldValidate: true,
                    })
                  }
                  className={`p-3.5 rounded-xl border text-left transition-[border-color,background-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                    selected
                      ? "border-zinc-900 bg-zinc-50"
                      : "border-zinc-200/80 bg-white hover:border-zinc-300"
                  }`}
                >
                  <p className="text-xs font-semibold text-zinc-900">
                    {option.title}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <Input
          label="Catatan Ketersediaan (Tampil di Hero & Halaman Kontak)"
          error={errors.availability_note?.message}
          {...register("availability_note")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nama Lengkap"
            error={errors.full_name?.message}
            {...register("full_name")}
          />
          <Input
            label="Headline Spesialisasi"
            error={errors.headline?.message}
            {...register("headline")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Lokasi Domisili"
            error={errors.location?.message}
            {...register("location")}
          />
          <Input
            label="Email Utama"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="URL GitHub"
            type="url"
            placeholder="https://github.com/username"
            error={errors.github_url?.message}
            {...register("github_url")}
          />
          <Input
            label="URL LinkedIn"
            type="url"
            placeholder="https://linkedin.com/in/username"
            error={errors.linkedin_url?.message}
            {...register("linkedin_url")}
          />
        </div>

        <div>
          <label
            htmlFor="profile-bio"
            className="block text-xs font-medium text-zinc-700 mb-1.5"
          >
            Bio Ringkas (Tampil di Section About & Metadata SEO)
          </label>
          <textarea
            id="profile-bio"
            rows={3}
            className="w-full p-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 shadow-2xs focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none"
            {...register("bio")}
          />
          {errors.bio?.message && (
            <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5">
              <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.bio.message}</span>
            </p>
          )}
        </div>

        <div className="pt-3 border-t border-zinc-100 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            loadingText="Menyimpan Perubahan..."
          >
            <Save className="size-4" aria-hidden="true" />
            <span>Simpan Perubahan Profil</span>
          </Button>
        </div>
      </form>
    </div>
  );
}

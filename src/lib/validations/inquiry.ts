import { z } from "zod";

export const INQUIRY_TYPES = [
  "Full-time Role",
  "Project Consultation",
  "Technical Advisory",
] as const;

export const BUDGET_OPTIONS = [
  "Rp 35.000.000 — Rp 50.000.000 / bulan (Full-time)",
  "Rp 50.000.000 — Rp 100.000.000 (Sprint / Proyek)",
  "Rp 100.000.000 — Rp 250.000.000 (End-to-End Architecture)",
  "Retainer Advisory Teknis Bulanan",
] as const;

export const hireInquirySchema = z.object({
  sender_name: z
    .string()
    .trim()
    .min(2, "Nama lengkap minimal 2 karakter.")
    .max(80, "Nama lengkap maksimal 80 karakter."),
  sender_email: z
    .string()
    .trim()
    .min(1, "Alamat email korporat/aktif wajib diisi.")
    .email("Format alamat email tidak valid."),
  company: z
    .string()
    .trim()
    .min(2, "Nama perusahaan atau organisasi wajib diisi.")
    .max(100, "Nama perusahaan maksimal 100 karakter."),
  inquiry_type: z.enum(INQUIRY_TYPES, {
    message: "Pilih salah satu tipe kolaborasi.",
  }),
  budget_or_comp: z
    .string()
    .trim()
    .min(3, "Pilih atau tulis estimasi kompensasi/anggaran."),
  message: z
    .string()
    .trim()
    .min(
      25,
      "Ringkasan kebutuhan teknis minimal 25 karakter agar diskusi terarah."
    )
    .max(2000, "Pesan maksimal 2.000 karakter."),
});

export type HireInquiryFormValues = z.infer<typeof hireInquirySchema>;

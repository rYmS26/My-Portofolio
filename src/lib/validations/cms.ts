import { z } from "zod";

export const NOTE_CATEGORIES = [
  "System Architecture",
  "Database & SQL",
  "Frontend Performance",
  "DevOps & Cloud",
] as const;

export const AVAILABILITY_STATUSES = [
  "available",
  "open_to_selective",
  "unavailable",
] as const;

export const INQUIRY_STATUSES = [
  "unread",
  "read",
  "replied",
  "archived",
] as const;

export const projectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Judul studi kasus minimal 5 karakter.")
    .max(120, "Judul maksimal 120 karakter."),
  code: z
    .string()
    .trim()
    .min(3, "Kode sistem wajib diisi (misal: SYS-2026-05).")
    .max(24, "Kode sistem maksimal 24 karakter."),
  slug: z
    .string()
    .trim()
    .min(3, "Slug URL minimal 3 karakter.")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)."
    ),
  client_or_company: z
    .string()
    .trim()
    .min(2, "Nama klien atau perusahaan wajib diisi."),
  role: z.string().trim().min(2, "Peran teknis wajib diisi."),
  period: z
    .string()
    .trim()
    .min(4, "Periode pengerjaan wajib diisi (misal: Agu 2026 — Nov 2026)."),
  summary: z
    .string()
    .trim()
    .min(20, "Ringkasan proyek minimal 20 karakter.")
    .max(500, "Ringkasan maksimal 500 karakter."),
  tech_stack_csv: z
    .string()
    .trim()
    .min(2, "Masukkan minimal 1 teknologi dipisahkan koma."),
  architecture_overview: z
    .string()
    .trim()
    .min(20, "Penjelasan arsitektur minimal 20 karakter."),
  technical_challenges: z
    .string()
    .trim()
    .min(20, "Tantangan teknis minimal 20 karakter."),
  primary_metric_label: z
    .string()
    .trim()
    .min(2, "Label metrik utama wajib diisi (misal: P95 Latency)."),
  primary_metric_value: z
    .string()
    .trim()
    .min(1, "Nilai metrik utama wajib diisi (misal: 32 ms)."),
  published: z.boolean(),
  is_featured: z.boolean(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

export const noteFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(8, "Judul artikel teknis minimal 8 karakter.")
    .max(140, "Judul artikel maksimal 140 karakter."),
  code: z
    .string()
    .trim()
    .min(3, "Kode catatan wajib diisi (misal: NOTE-2026-09)."),
  slug: z
    .string()
    .trim()
    .min(3, "Slug URL minimal 3 karakter.")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)."
    ),
  category: z.enum(NOTE_CATEGORIES),
  reading_time_minutes: z
    .number()
    .int()
    .min(1, "Estimasi baca minimal 1 menit.")
    .max(60, "Estimasi baca maksimal 60 menit."),
  excerpt: z
    .string()
    .trim()
    .min(20, "Ringkasan artikel minimal 20 karakter.")
    .max(320, "Ringkasan maksimal 320 karakter."),
  content: z
    .string()
    .trim()
    .min(40, "Isi konten teknis minimal 40 karakter."),
  published: z.boolean(),
});

export type NoteFormValues = z.infer<typeof noteFormSchema>;

export const profileSettingsSchema = z.object({
  full_name: z.string().trim().min(2, "Nama lengkap wajib diisi."),
  headline: z.string().trim().min(5, "Headline peran wajib diisi."),
  bio: z.string().trim().min(20, "Bio ringkas minimal 20 karakter."),
  location: z.string().trim().min(3, "Lokasi domisili wajib diisi."),
  email: z.string().trim().email("Format email tidak valid."),
  github_url: z.string().trim().url("Format URL GitHub tidak valid."),
  linkedin_url: z.string().trim().url("Format URL LinkedIn tidak valid."),
  availability_status: z.enum(AVAILABILITY_STATUSES),
  availability_note: z
    .string()
    .trim()
    .min(10, "Catatan ketersediaan minimal 10 karakter."),
});

export type ProfileSettingsFormValues = z.infer<typeof profileSettingsSchema>;

export const educationFormSchema = z.object({
  institution: z
    .string()
    .trim()
    .min(2, "Nama institusi pendidikan wajib diisi."),
  degree_and_field: z
    .string()
    .trim()
    .min(2, "Jenjang & jurusan wajib diisi (misal: S1 Sistem Informasi)."),
  period: z
    .string()
    .trim()
    .min(4, "Periode wajib diisi (misal: Sep 2025 — Sep 2029)."),
  grade: z.string().trim().optional(),
  skills_csv: z
    .string()
    .trim()
    .min(2, "Masukkan minimal 1 keahlian dipisahkan koma."),
  display_order: z.number().int().min(1).max(99),
});

export type EducationFormValues = z.infer<typeof educationFormSchema>;

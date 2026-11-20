import type {
  EngineeringNote,
  HireInquiry,
  ProfileSettings,
  ProjectCaseStudy,
  TechStackCategory,
  WorkExperience,
} from "@/types/portfolio";

export const INITIAL_PROFILE_SETTINGS: ProfileSettings = {
  id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  full_name: "Arif Pratama, S.Kom.",
  headline: "Senior Full-Stack & Distributed Systems Engineer",
  bio: "Merancang arsitektur aplikasi web berkinerja tinggi, sistem pembayaran konkurensi tinggi, dan infrastruktur data berbasis PostgreSQL & Next.js. Berpengalaman lebih dari 6 tahun membangun produk B2B SaaS serta fintech di Asia Tenggara.",
  location: "Jakarta Selatan, Indonesia (UTC+7)",
  email: "arif.pratama@devfolio.id",
  github_url: "https://github.com/arifpratama-eng",
  linkedin_url: "https://linkedin.com/in/arifpratama-eng",
  resume_url: "/cv-arif-pratama-2026.pdf",
  availability_status: "available",
  availability_note: "Tersedia untuk peran Principal/Senior Full-Stack & konsultasi arsitektur Q4 2026",
  years_of_experience: 6,
  systems_architected: 14,
  avg_latency_reduction_pct: 64,
  updated_at: "2026-11-19T14:30:00+07:00",
};

export const INITIAL_PROJECTS: ProjectCaseStudy[] = [
  {
    id: "1c7d2f30-1122-4a8e-9b31-01a2b3c4d5e6",
    slug: "nusantarapay-core-ledger-settlement",
    code: "SYS-2026-01",
    title: "NusantaraPay Core Ledger & Real-Time Settlement Engine",
    summary:
      "Rekonstruksi mesin buku besar (double-entry ledger) dan rekonsiliasi pembayaran instan untuk memproses lebih dari 1,2 juta transaksi harian tanpa selisih saldo.",
    role: "Lead Full-Stack & Systems Architect",
    period: "Jan 2026 — Agu 2026",
    client_or_company: "PT Nusantara Finansial Teknologi",
    tech_stack: [
      "Next.js 15",
      "TypeScript",
      "PostgreSQL 16",
      "Supabase",
      "Redis Streams",
      "Go Worker",
      "Tailwind CSS",
    ],
    architecture_overview:
      "Menggunakan pola Idempotent Command Handler di atas PostgreSQL Serializable Snapshot Isolation untuk mutasi saldo kritis, dipadukan dengan dashboard observabilitas real-time berbasis Next.js Server Components dan Server Actions.",
    technical_challenges:
      "Menghilangkan race condition pada penarikan dana bersamaan (double-spend) saat jam puncak gajian serta memangkas waktu proses rekonsiliasi bank dari 4 jam batch malam menjadi 1,8 detik streaming.",
    key_metrics: [
      { label: "P95 API Latency", value: "38 ms", delta: "-68%" },
      { label: "Peak Throughput", value: "14.200 req/s", delta: "+310%" },
      { label: "Ledger Accuracy", value: "99,9998%", delta: "Zero Drift" },
    ],
    thumbnail_url: "/images/projects/nusantarapay-ledger.svg",
    live_url: "https://ledger-demo.devfolio.id",
    repo_url: "https://github.com/arifpratama-eng/core-ledger-architecture",
    is_featured: true,
    published: true,
    display_order: 1,
    created_at: "2026-08-20T09:00:00+07:00",
  },
  {
    id: "2d8e3a41-2233-4b9f-8c42-12b3c4d5e6f7",
    slug: "katalogin-multi-warehouse-inventory-sync",
    code: "SYS-2025-04",
    title: "Katalogin Distributed Multi-Warehouse Inventory Engine",
    summary:
      "Platform sinkronisasi stok omnichannel real-time yang menghubungkan 42 gudang fisik dengan ribuan toko marketplace tanpa overselling saat kampanye tanggal kembar.",
    role: "Senior Full-Stack Engineer",
    period: "Mei 2025 — Des 2025",
    client_or_company: "Katalogin Commerce Hub",
    tech_stack: [
      "Next.js App Router",
      "TypeScript",
      "Supabase PostgreSQL",
      "pg_cron",
      "Webhooks",
      "Tailwind CSS",
    ],
    architecture_overview:
      "Memisahkan jalur baca dan tulis (CQRS ringan) dengan materialized views di PostgreSQL dan antrean webhook terdistribusi untuk meredam lonjakan 85.000 pembaruan SKU per menit.",
    technical_challenges:
      "Menangani webhook duplikat dan out-of-order dari lima API marketplace berbeda menggunakan versi vektor (optimistic concurrency control) pada level baris database.",
    key_metrics: [
      { label: "Sync Propagation", value: "420 ms", delta: "-82%" },
      { label: "Oversell Rate", value: "0,01%", delta: "Dari 4,7%" },
      { label: "Active SKUs", value: "1.450.000", delta: "42 Gudang" },
    ],
    thumbnail_url: "/images/projects/katalogin-inventory.svg",
    live_url: "https://katalogin-ops.devfolio.id",
    repo_url: "https://github.com/arifpratama-eng/omnichannel-stock-engine",
    is_featured: true,
    published: true,
    display_order: 2,
    created_at: "2025-12-15T10:30:00+07:00",
  },
  {
    id: "3e9f4b52-3344-4c0a-9d53-23c4d5e6f7a8",
    slug: "medisync-clinical-ehr-analytics",
    code: "SYS-2025-01",
    title: "MediSync Clinical EHR & Diagnostic Triage Workspace",
    summary:
      "Sistem rekam medis elektronik terenkripsi dengan antarmuka input klinis berbasis keyboard-first yang memangkas waktu administrasi dokter spesialis sebesar 47%.",
    role: "Full-Stack Product Engineer",
    period: "Sep 2024 — Apr 2025",
    client_or_company: "RSIA & Klinik Jaringan Medika Nusantara",
    tech_stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL RLS",
      "React Hook Form",
      "Zod",
      "Radix UI",
    ],
    architecture_overview:
      "Isolasi data multi-klinik berbasis PostgreSQL Row Level Security (RLS) ketat dengan audit log otomatis melalui database triggers dan form klinis cepat bebas re-render berlebih.",
    technical_challenges:
      "Memastikan pencarian 3,8 juta riwayat pasien tetap di bawah 50 ms menggunakan indeks GIN trigram (`pg_trgm`) sekaligus mematuhi standar enkripsi data kesehatan.",
    key_metrics: [
      { label: "Query Search P95", value: "29 ms", delta: "3,8 Juta Baris" },
      { label: "Waktu Input Dokter", value: "2,4 mnt", delta: "-47%" },
      { label: "Uptime SLA", value: "99,98%", delta: "18 Klinik" },
    ],
    thumbnail_url: "/images/projects/medisync-ehr.svg",
    live_url: "https://medisync-preview.devfolio.id",
    repo_url: "https://github.com/arifpratama-eng/clinical-workspace-rls",
    is_featured: true,
    published: true,
    display_order: 3,
    created_at: "2025-04-10T16:15:00+07:00",
  },
];

export const INITIAL_EXPERIENCES: WorkExperience[] = [
  {
    id: "exp-01",
    company_name: "PT Nusantara Finansial Teknologi",
    role_title: "Lead Full-Stack Engineer",
    employment_type: "Full-time",
    location: "Jakarta, Indonesia (Hybrid)",
    start_date: "Jan 2025",
    end_date: null,
    is_current: true,
    highlights: [
      "Memimpin tim 7 engineer merancang ulang dashboard settlement B2B dan mesin core ledger berkapasitas Rp 4,2 triliun per bulan.",
      "Memangkas waktu build CI/CD monorepo Next.js dari 14 menit menjadi 3 menit 20 detik serta menurunkan Core Web Vitals LCP ke 1,1 detik.",
      "Mengimplementasikan standar Row Level Security (RLS) dan skema validasi end-to-end dengan TypeScript ketat & Zod.",
    ],
    tech_used: ["Next.js 15", "TypeScript", "PostgreSQL", "Supabase", "Go", "Redis"],
    display_order: 1,
    created_at: "2025-01-10T08:00:00+07:00",
  },
  {
    id: "exp-02",
    company_name: "Katalogin Commerce Hub",
    role_title: "Senior Full-Stack Engineer",
    employment_type: "Full-time",
    location: "Bandung, Indonesia (Remote)",
    start_date: "Mar 2023",
    end_date: "Des 2024",
    is_current: false,
    highlights: [
      "Merancang pipeline sinkronisasi inventaris multi-gudang yang menangani 1,45 juta SKU aktif di 5 kanal e-commerce besar.",
      "Membangun sistem komponen internal monokromatik berbasis Radix UI & Tailwind CSS yang digunakan oleh 4 produk dashboard operasional.",
      "Mengoptimalkan query laporan analitik penjual menggunakan composite index dan partitioned tables, menurunkan beban CPU DB hingga 58%.",
    ],
    tech_used: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS", "Docker"],
    display_order: 2,
    created_at: "2023-03-01T08:00:00+07:00",
  },
  {
    id: "exp-03",
    company_name: "Sagara Digital Labs",
    role_title: "Full-Stack Software Engineer",
    employment_type: "Full-time",
    location: "Jakarta, Indonesia",
    start_date: "Jul 2020",
    end_date: "Feb 2023",
    is_current: false,
    highlights: [
      "Mengembangkan 9 aplikasi web enterprise dari tahap perancangan skema database hingga rilis produksi untuk klien logistik dan kesehatan.",
      "Membangun modul autentikasi RBAC, pelaporan faktur PDF otomatis, dan integrasi payment gateway Virtual Account & QRIS.",
    ],
    tech_used: ["React", "Node.js", "TypeScript", "PostgreSQL", "REST API"],
    display_order: 3,
    created_at: "2020-07-15T08:00:00+07:00",
  },
];

export const INITIAL_NOTES: EngineeringNote[] = [
  {
    id: "note-01",
    slug: "preventing-double-spend-postgresql-serializable-ledger",
    code: "NOTE-2026-08",
    title: "Mencegah Double-Spend pada Sistem Ledger dengan PostgreSQL Serializable & Advisory Locks",
    excerpt:
      "Bedah arsitektur mutasi saldo konkurensi tinggi: kapan harus menggunakan SELECT FOR UPDATE, Optimistic Locking, atau Serializable Snapshot Isolation.",
    category: "Database & SQL",
    reading_time_minutes: 9,
    published: true,
    published_at: "2026-10-28T10:00:00+07:00",
    created_at: "2026-10-28T10:00:00+07:00",
    content: `## Masalah Klasik Mutasi Saldo Konkurensi Tinggi

Saat dua request penarikan dana masuk pada milidetik yang sama untuk akun yang sama, pembacaan saldo biasa (\`SELECT balance FROM accounts\`) di dalam level isolasi default \`READ COMMITTED\` akan menghasilkan *lost update* atau saldo negatif.

### Strategi 1: Pessimistic Row-Level Locking

Pendekatan paling deterministik untuk akun dengan frekuensi mutasi menengah adalah mengunci baris akun secara eksplisit dalam urutan ID yang konsisten agar terhindar dari *deadlock*:

\`\`\`sql
BEGIN;

-- Kunci baris akun secara eksplisit sebelum memeriksa saldo
SELECT account_id, available_balance
FROM ledger_accounts
WHERE account_id = 'acc_01J9Z8K4M2'
FOR UPDATE NOWAIT;

-- Sisipkan entri jurnal double-entry
INSERT INTO ledger_entries (entry_id, account_id, direction, amount_idr, idempotency_key)
VALUES ('ent_99201', 'acc_01J9Z8K4M2', 'DEBIT', 1500000, 'idem_tx_20261028_01');

-- Perbarui saldo teragregasi
UPDATE ledger_accounts
SET available_balance = available_balance - 1500000,
    updated_at = NOW()
WHERE account_id = 'acc_01J9Z8K4M2'
  AND available_balance >= 1500000;

COMMIT;
\`\`\`

### Strategi 2: Idempotency Key di Level Constraint

Jangan pernah mengandalkan pengecekan aplikasi semata untuk mendeteksi retry jaringan. Pasang \`UNIQUE INDEX\` pada kolom \`idempotency_key\` sehingga retry otomatis dari worker hanya mengembalikan status transaksi sebelumnya tanpa mengeksekusi ulang potongan saldo.`,
  },
  {
    id: "note-02",
    slug: "zero-waterfall-nextjs-server-components-patterns",
    code: "NOTE-2026-05",
    title: "Menghilangkan Network Waterfall di Next.js App Router dengan Preload & Parallel RSC",
    excerpt:
      "Teknik praktis memangkas Time-to-First-Byte (TTFB) dan LCP pada halaman dashboard padat data menggunakan React cache(), Promise.all, dan Suspense boundaries.",
    category: "Frontend Performance",
    reading_time_minutes: 7,
    published: true,
    published_at: "2026-09-14T14:20:00+07:00",
    created_at: "2026-09-14T14:20:00+07:00",
    content: `## Mengapa Server Components Masih Bisa Lambat?

Memindahkan pengambilan data ke server tidak otomatis membuat halaman cepat jika setiap komponen anak melakukan \`await\` secara berurutan (*sequential waterfall*).

### Pola Eksekusi Paralel Terstruktur

Gunakan \`Promise.all\` pada batas halaman utama atau gunakan pola *preload* dengan \`React.cache\` agar kueri dimulai sedini mungkin sebelum pohon komponen selesai dirender:

\`\`\`ts
import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const getProjectBySlug = cache(async (slug: string) => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
});
\`\`\`

Dengan memisahkan bagian statis halaman dari metrik dinamis menggunakan \`<Suspense>\`, browser dapat langsung merender kerangka navigasi dan judul dalam waktu kurang dari 45 milidetik.`,
  },
  {
    id: "note-03",
    slug: "multi-tenant-rls-performance-pitfalls-supabase",
    code: "NOTE-2026-02",
    title: "Optimasi Performa Row Level Security (RLS) Supabase pada Tabel Jutaan Baris",
    excerpt:
      "Mengapa pemanggilan auth.uid() langsung di dalam policy RLS dapat memperlambat query hingga 20x lipat, dan bagaimana membungkusnya dengan subselect initplan.",
    category: "System Architecture",
    reading_time_minutes: 8,
    published: true,
    published_at: "2026-07-03T09:15:00+07:00",
    created_at: "2026-07-03T09:15:00+07:00",
    content: `## Jebakan Evaluasi Per-Baris pada Policy RLS

Saat kita menulis policy RLS seperti \`USING (user_id = auth.uid())\`, planner PostgreSQL sering kali mengevaluasi fungsi \`auth.uid()\` berulang kali untuk setiap baris yang dipindai.

### Solusi: Membungkus dengan Scalar Subquery \`(SELECT auth.uid())\`

Dengan membungkus fungsi di dalam tanda kurung \`(SELECT auth.uid())\`, PostgreSQL mengeksekusinya satu kali sebagai *initPlan* dan menggunakan hasilnya untuk pencarian indeks B-Tree:

\`\`\`sql
CREATE POLICY "Admins can manage own records"
ON public.projects
FOR ALL
TO authenticated
USING ((SELECT auth.uid()) IS NOT NULL);
\`\`\`

Pada pengujian tabel dengan 1,2 juta baris, perubahan satu baris ini menurunkan waktu eksekusi query dari 340 ms menjadi 4,2 ms.`,
  },
];

export const INITIAL_INQUIRIES: HireInquiry[] = [
  {
    id: "inq-01",
    reference_code: "INQ-2026-0104",
    sender_name: "Hendra Wijaya",
    sender_email: "hendra.wijaya@veritascapital.co.id",
    company: "Veritas FinTech Ventures",
    inquiry_type: "Project Consultation",
    budget_or_comp: "Rp 120.000.000 — Rp 180.000.000",
    message:
      "Halo Arif, kami sedang merancang ulang modul settlement B2B dan membutuhkan arsitek utama selama 3 bulan untuk review skema PostgreSQL serta dashboard Next.js.",
    status: "unread",
    created_at: "2026-11-18T16:40:00+07:00",
  },
  {
    id: "inq-02",
    reference_code: "INQ-2026-0103",
    sender_name: "Nadia Kusuma",
    sender_email: "nadia.kusuma@lokadata.id",
    company: "PT Lokadata Cloud Nusantara",
    inquiry_type: "Full-time Role",
    budget_or_comp: "Rp 42.000.000 / bulan",
    message:
      "Kami tertarik mengundang Anda untuk diskusi posisi Principal Full-Stack Engineer memimpin tim Core Platform kami di Jakarta.",
    status: "replied",
    created_at: "2026-11-15T11:20:00+07:00",
  },
];

export const TECH_STACK_MATRIX: TechStackCategory[] = [
  {
    id: "frontend-arch",
    domain: "Frontend & UI Architecture",
    description: "Server-first rendering, sistem desain presisi tinggi, dan aksesibilitas keyboard.",
    items: [
      {
        name: "Next.js 15+ (App Router)",
        proficiency: "Principal",
        production_years: "5,5 thn",
        use_case: "RSC, Server Actions, Streaming, Edge Caching",
      },
      {
        name: "TypeScript (Strict Mode)",
        proficiency: "Principal",
        production_years: "6,0 thn",
        use_case: "Type-safe contracts, Zod schema inference",
      },
      {
        name: "Tailwind CSS & Radix UI",
        proficiency: "Senior",
        production_years: "4,5 thn",
        use_case: "Design system monokromatik, A11y primitives",
      },
    ],
  },
  {
    id: "backend-data",
    domain: "Backend, Database & Distributed Data",
    description: "Pemodelan relasional konsistensi tinggi, optimasi query, dan keamanan level baris.",
    items: [
      {
        name: "PostgreSQL & Supabase",
        proficiency: "Principal",
        production_years: "6,0 thn",
        use_case: "RLS, Serializable Ledger, Indexing, Triggers",
      },
      {
        name: "Node.js & Go Services",
        proficiency: "Senior",
        production_years: "4,0 thn",
        use_case: "High-concurrency webhook workers & settlement",
      },
      {
        name: "Redis & Message Queues",
        proficiency: "Senior",
        production_years: "4,0 thn",
        use_case: "Idempotency locks, rate limiting, stream consumers",
      },
    ],
  },
  {
    id: "infra-quality",
    domain: "Infrastructure, Observability & Quality",
    description: "Deployment deterministik, pengujian otomatis, dan pemantauan metrik produksi.",
    items: [
      {
        name: "Vercel & Docker Containers",
        proficiency: "Senior",
        production_years: "5,0 thn",
        use_case: "Zero-downtime preview & multi-region edge deploy",
      },
      {
        name: "OpenTelemetry & SQL Explain",
        proficiency: "Senior",
        production_years: "3,5 thn",
        use_case: "P95 latency profiling & query plan auditing",
      },
      {
        name: "Playwright & Vitest",
        proficiency: "Senior",
        production_years: "4,0 thn",
        use_case: "E2E checkout/ledger verification & contract tests",
      },
    ],
  },
];

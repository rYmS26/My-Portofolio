# Product Requirements Document (PRD) & AI Execution Instructions
**Project Name:** DevFolio Studio — Full-Stack Engineering Portfolio & Headless CMS

## 0. AI EXECUTION RULES (WAJIB DIBACA OLEH AI CODER)
- **TUGAS KAMU:** Bertindak sebagai Senior Full-Stack Engineer & Principal UI/UX Architect.
- **ALUR KERJA:** Dokumen ini dibagi menjadi beberapa Fase (Phases).
- **ATURAN BERHENTI (CRITICAL):** KERJAKAN HANYA FASE YANG DIMINTA OLEH USER. Jika user meminta `"Start Phase 1"`, kerjakan **HANYA Phase 1**. Setelah Phase 1 selesai, kamu **WAJIB BERHENTI** dan menunggu instruksi user selanjutnya (misal: `"Continue Phase 2"`). **JANGAN PERNAH** melompat atau mengerjakan fase berikutnya tanpa diinstruksikan.
- **PENGUJIAN & SELF-AUDIT:** Setiap kali selesai mengerjakan satu fase, pastikan tidak ada *error* (`tsc --noEmit` / build check) dan wajib lolos pemeriksaan **Pre-Flight Self-Audit Checklist (Section 5.8)** sebelum melaporkan bahwa fase tersebut selesai.

---

## 1. Project Overview & Vibe
- **Vision:** Platform portofolio profesional dan Engineering Blog berstandar produksi untuk seorang **Senior Full-Stack Engineer**, dilengkapi dengan **Dynamic Admin CMS Dashboard** terintegrasi Supabase untuk mengelola studi kasus proyek (arsitektur, metrik performa, tantangan teknis), riwayat karir (*work experience timeline*), matriks keahlian teknis, catatan rekayasa perangkat lunak (*Technical Blog / Engineering Notes*), serta kotak masuk pesan perekrutan/klien (*Hire Me Inbox*) beserta status ketersediaan kerja (*Availability Status*).
- **Target Audience:**
  1. **Public Visitors (Tech Recruiters, CTO, Engineering Managers, Klien):** Membaca studi kasus arsitektur sistem, melihat rekam jejak pengalaman kerja, menguji keahlian lewat catatan teknis, dan mengirim tawaran kerja/proyek.
  2. **Portfolio Owner / Admin (Authenticated via Supabase Auth):** Mengelola seluruh konten portofolio secara dinamis tanpa mengubah kode (*CRUD Projects, Experience Timeline, Technical Articles, Profile Availability Status, & Inbox Management*).
- **Design Vibe:** **Editorial Monokromatik Terang (Zinc-First)**. Bersih, tajam, berorientasi tipografi & kepadatan informasi teknis ala **Vercel, Linear, dan Stripe Docs**. Permukaan utama menggunakan `bg-white` di atas kanvas `bg-zinc-50/80`, struktur *hairline border* (`border-zinc-200/80 shadow-xs`), tombol utama hitam pekat (`bg-zinc-900 hover:bg-zinc-800 text-white`), angka dan metrik selalu `tabular-nums`, serta bebas dari teks gradasi, *aurora blobs*, atau emoji.

---

## 2. Tech Stack & Core Tools
- **Frontend:** Next.js (App Router, React 19, Server Components), Tailwind CSS v4, TypeScript (`strict: true`).
- **UI Components:** Shadcn UI / Radix UI Primitives, Lucide Icons (`lucide-react`).
- **Backend & Database:** Next.js Server Actions, Supabase (`@supabase/supabase-js` & `@supabase/ssr` — PostgreSQL, Auth, Storage).
- **Form & Validation:** React Hook Form + Zod (`@hookform/resolvers`).
- **AI Integration:** Opsional / Modular (Tidak digunakan di fase inti agar tetap fokus pada kecepatan & keringkasan arsitektur).

---

## 3. Global Architecture Standards
- **TypeScript:** DILARANG menggunakan `any`. Selalu definisikan `interface` atau `type` di folder `src/types/`.
- **Frontend:** Utamakan *Server Components*. Gunakan `'use client'` HANYA untuk *hooks* atau interaktivitas. DILARANG membuat file `.css` kustom di luar `globals.css` bawaan Tailwind.
- **Backend Response:** Semua Server Actions WAJIB merespons dengan format:
  ```ts
  export type ActionResponse<T = undefined> = {
    success: boolean;
    data?: T;
    error?: string;
  };
  ```
- **UI States:** Wajib menerapkan **4 Mandatory UI States** (*Ideal State, Skeleton Loader, Empty State, Error State*) di setiap halaman/komponen yang memuat data.

---

## 4. Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=[ISI_NANTI]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ISI_NANTI]
SUPABASE_SERVICE_ROLE_KEY=[ISI_NANTI]
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 5. THE "ANTI-AI SLOP" UI/UX MANIFESTO (CRITICAL)

> [!IMPORTANT]
> **Instruksi Sistem untuk AI Coder:** AI cenderung menghasilkan desain yang kaku, generik, penuh klise visual, dan membosankan (*AI Slop*). Saat menulis kode Frontend & Tailwind CSS, kamu **WAJIB** mematuhi seluruh aturan desain visual, arsitektur komponen, dan larangan keras (*hard bans*) di bawah ini tanpa terkecuali.

### 5.1. Color, Gradients & Atmospheric Restraint (Warna & Efek Visual)
- **DON'T (HARD BAN):**
  - Jangan gunakan warna bawaan default AI seperti `blue-600`, `indigo-600`, atau `violet-600` untuk tombol utama atau *brand color* tanpa instruksi eksplisit.
  - Jangan gunakan background `bg-gray-100` atau `bg-gray-200` yang terlihat kusam dan kotor.
  - **DILARANG KERAS** membuat teks gradasi (`bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600`), tombol gradasi warna-warni, atau *glowing aurora blobs* (`absolute -top-40 blur-3xl opacity-30`) di latar belakang.
  - Jangan gunakan efek kaca (*glassmorphism* `backdrop-blur-md bg-white/10`) secara berlebihan di atas dekorasi abstrak; gunakan `backdrop-blur` **hanya** untuk *sticky header/navbar* atau *modal overlay*.
- **DO:**
  - Gunakan palet monokromatik modern dengan kontras tajam berbasis `zinc` atau `slate`.
  - **Surface Hierarchy:** Gunakan `bg-white` untuk permukaan utama/card, `bg-zinc-50/80` untuk latar belakang halaman (*canvas*) atau area sekunder, dan `bg-zinc-100` untuk elemen *muted/hover*.
  - **Primary CTA:** Gunakan warna hitam pekat (`bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs`) atau maksimal **1 warna aksen spesifik** yang digunakan secara hemat (kurang dari 10% area layar).
  - **Semantic Status Colors:** Gunakan warna status secara disiplin hanya untuk indikator fungsional (bukan dekorasi):
    - Sukses/Aktif/Available: `bg-emerald-50 text-emerald-700 border-emerald-200/60`
    - Peringatan/Pending/Selective: `bg-amber-50 text-amber-700 border-amber-200/60`
    - Error/Destruktif/Unavailable: `bg-red-50 text-red-700 border-red-200/60`

### 5.2. Layout, Spacing & Borders (Tata Letak, Spasi & Garis)
- **DON'T:**
  - Jangan membuat UI yang sempit (*cramped*) atau sebaliknya terlalu boros ruang (`p-10` di dalam *card* data biasa).
  - Jangan menggunakan bayangan tebal yang norak (`shadow-lg`, `shadow-xl`, `shadow-2xl`) atau sudut membulat ekstrem (`rounded-3xl`) pada *card* standar.
  - **DILARANG membuat "Card di dalam Card"** (*nested bordered containers* lebih dari 1 level) atau *card* dengan aksen garis samping tebal (`border-l-4 border-indigo-500`) yang menjadi ciri khas template AI.
  - Hindari pola layout malas khas AI: *Judul Rata Tengah + Pill Badge di atasnya + 3 Kolom Card Identik dengan Ikon di Tengah*.
- **DO:**
  - **Rhythm & White Space:** Gunakan `py-12` atau `py-16` untuk pemisah seksi halaman (*landing*), dan `gap-6` atau `gap-8` untuk *grid layout* utama. Untuk komponen internal (*dashboard/form*), jaga kepadatan informasi (*information density*) dengan `p-4`, `p-5`, atau `p-6` dan `gap-4`.
  - **Border & Shadow Formula:** Untuk *Card* atau kontainer, gunakan *hairline border* super tipis dengan bayangan lembut:
    `bg-white border border-zinc-200/80 shadow-xs rounded-xl`
  - **Border Radius Consistency:** Terapkan skala radius yang konsisten (aturan *concentric radius*):
    - Kontainer luar / Card / Modal: `rounded-xl`
    - Elemen di dalamnya (Tombol, Input, Select, Image): `rounded-lg` atau `rounded-md`
    - Badge / Tag kecil: `rounded-md` atau `rounded-full` (khusus indikator status dengan *dot*)
  - **Variasi Struktur Layout:** Gunakan *asymmetric split-screen*, *sidebar + workspace*, *data tables*, atau daftar baris (*list rows*) yang dipisahkan oleh garis tipis (`divide-y divide-zinc-200/60`) alih-alih membungkus setiap item dalam *card* terpisah.

### 5.3. Typography & Realistic Copywriting (Tipografi & Konteks Data)
- **DON'T:**
  - Jangan biarkan semua teks memiliki ketebalan dan kontras yang seragam (misal: memasang `font-medium` dan `text-gray-700` di semua elemen).
  - **DILARANG KERAS** menggunakan teks placeholder malas: `"Lorem Ipsum"`, `"Test"`, `"John Doe"`, `"jane@example.com"`, `"Click Here"`, `"Learn More"`, atau `"Welcome to my website"`.
  - **DILARANG KERAS** mengarang jargon pemasaran kosong khas AI: `"Unlock the power of..."`, `"Supercharge your workflow"`, `"Revolutionizing the industry"`, atau metrik palsu tanpa konteks (`"10x Faster"`, `"99.9% Uptime"`, `"+240% Growth"`).
- **DO:**
  - **Hierarki Tipografi Tegas:**
    - Page Title / Hero: `text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 text-balance`
    - Section Heading: `text-lg font-semibold tracking-tight text-zinc-900`
    - Card / Item Title: `text-sm font-medium text-zinc-900`
    - Body Copy: `text-sm leading-relaxed text-zinc-600 text-pretty`
    - Secondary / Metadata / Caption: `text-xs font-normal text-zinc-500`
  - **Angka & Data (`tabular-nums`):** Setiap elemen yang menampilkan harga, kuantitas, persentase, metrik latensi, tanggal, durasi baca, atau angka di dalam tabel **WAJIB** menggunakan kelas `tabular-nums` (dan `font-mono` untuk kode/ID seperti `PRJ-2026-01`) agar digit angka sejajar secara vertikal.
  - **Contextual & Realistic Copy:** Gunakan *dummy data* yang masuk akal dan sesuai konteks Senior Full-Stack Engineer Indonesia:
    - Contoh Proyek: `" NusantaraPay Core Ledger — High-Throughput Settlement Engine"`, `"Katalogin Distributed Inventory Sync"`
    - Contoh Metrik & Format: `"P95 Latency: 38 ms"`, `"Throughput: 14.200 req/dtk"`, `"19 Nov 2026, 14:30 WIB"`
    - Contoh CTA Spesifik: `"Baca Studi Kasus Arsitektur"`, `"Jadwalkan Diskusi Teknis"`, `"Unduh CV (PDF)"`

### 5.4. Iconography & Visual Assets (Ikon & Media)
- **DON'T:**
  - **DILARANG KERAS** menggunakan emoji (🚀, ✨, ⚡, 💡, 🎉, 🔥, 📈) sebagai pengganti ikon UI, di dalam tombol, di dalam *badge*, sebagai *bullet points*, atau di samping judul seksi.
  - Jangan membungkus setiap ikon fitur dengan lingkaran warna-warni (`bg-blue-100 text-blue-600 p-3 rounded-full`) di setiap *card*.
  - Jangan menampilkan gambar tanpa `aspect-ratio` yang jelas atau membiarkan gambar gepeng (*stretched*).
- **DO:**
  - Gunakan *icon library* SVG monoline yang bersih dan konsisten (`lucide-react`).
  - Ukuran ikon harus proporsional: `size-4` (`w-4 h-4`) untuk di dalam tombol, input, atau *badge*; `size-5` (`w-5 h-5`) untuk navigasi utama atau *header*. Gunakan warna yang tenang (`text-zinc-500` atau `text-current`).
  - Semua elemen gambar/preview wajib memiliki `object-cover`, rasio aspek eksplisit (`aspect-square`, `aspect-video`, atau `aspect-[4/3]`), latar belakang cadangan (`bg-zinc-100`), dan *subtle inner border* (`ring-1 ring-inset ring-black/5 rounded-lg`).

### 5.5. Micro-Interactions, UI States & Accessibility (Interaktivitas & State)
- **DON'T:**
  - **Jangan gunakan `transition-all`** karena membebani performa browser dengan menganimasikan properti layout (*width/height/padding*).
  - Jangan gunakan animasi hover yang berlebihan seperti `hover:scale-105` atau `hover:-translate-y-2` pada seluruh permukaan *card*.
  - Jangan pernah melupakan *state* saat tombol sedang memproses (*loading*), saat data kosong (*empty*), atau saat terjadi *error*.
- **DO:**
  - **Targeted Transitions:** Gunakan transisi spesifik dengan durasi cepat:
    `transition-[color,background-color,border-color,transform,opacity,box-shadow] duration-150 ease-out`
  - **Tactile Click Feedback:** Tambahkan efek tekan halus pada semua tombol aktif: `active:scale-[0.98]`.
  - **Keyboard & Focus Accessibility (A11y):** Setiap elemen interaktif (Button, Link, Input, Checkbox, Tab) **WAJIB** memiliki cincin fokus yang jelas:
    `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2`
  - **Disabled State:** Wajib sertakan `disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed`.
  - **4 Mandatory UI States (Wajib Disediakan pada Komponen Data):**
    1. **Ideal State:** Data tampil rapi dengan paginasi atau batasan baris yang jelas.
    2. **Loading State:** Dilarang hanya menulis teks `"Loading..."`. Gunakan *Skeleton Loader* (`animate-pulse bg-zinc-200/70 rounded-md`) yang meniru dimensi asli elemen, serta *spinner icon* (`animate-spin size-4`) di dalam tombol yang sedang *submitting*.
    3. **Empty State:** Kotak terstruktur dengan `border border-dashed border-zinc-300 rounded-xl p-8 text-center`, ikon `size-8 text-zinc-400 mx-auto mb-3`, judul singkat alasan kosong, dan 1 tombol CTA untuk memulai aksi.
    4. **Error State:** Kotak peringatan atau pesan *inline* (`text-xs text-red-600 mt-1.5 flex items-center gap-1.5`) yang menjelaskan penyebab masalah dan cara memperbaikinya.

### 5.6. Component-Specific Standards (Aturan Spesifik Komponen Utama)

#### A. Forms & Inputs (Formulir)
- **DON'T:** Jangan mengandalkan `placeholder` sebagai pengganti `<label>`. Jangan buat input dengan tinggi yang tidak seragam dibanding tombol di sebelahnya.
- **DO:**
  - Selalu pasang `<label className="block text-xs font-medium text-zinc-700 mb-1.5">` di atas input.
  - Samakan tinggi input dan tombol standar (misal: `h-9` atau `h-10` dengan `px-3 py-2 text-sm`).
  - Gaya Input Standar: `w-full h-9 px-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 shadow-2xs focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none`.

#### B. Data Tables & Lists (Tabel Data & Dashboard)
- **DON'T:** Jangan buat tabel dengan garis vertikal dan horizontal tebal seperti spreadsheet Excel kuno, atau warna belang-belang (*zebra striping*) yang terlalu kontras.
- **DO:**
  - Bungkus tabel dengan kontainer `overflow-x-auto border border-zinc-200/80 rounded-xl bg-white shadow-xs`.
  - Header Tabel (`<th>`): `bg-zinc-50/80 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider py-3 px-4 border-b border-zinc-200/80`.
  - Baris Tabel (`<tr>`): `border-b border-zinc-100 last:border-0 hover:bg-zinc-50/60 transition-colors`.
  - Alignment: Teks rata kiri (`text-left`), status/badge rata tengah atau kiri, sedangkan **nominal uang, metrik angka, dan durasi WAJIB rata kanan (`text-right tabular-nums font-medium`)**.

#### C. Cards & Item Containers (Kartu Proyek/Artikel)
- **DON'T:** Jangan menjejalkan deskripsi panjang, 5 tombol sekaligus, dan elemen dekoratif mencolok di dalam satu kartu kecil.
- **DO:**
  - Tampilkan maksimal 4 informasi inti: Identifier/Preview (`aspect-video bg-zinc-100 rounded-lg overflow-hidden` atau kode sistem), Kategori/Periode (`text-xs text-zinc-500`), Judul Proyek (`text-sm font-medium text-zinc-900 line-clamp-2`), dan Metrik Teknis Utama (`text-sm font-semibold text-zinc-900 tabular-nums`).
  - Efek hover pada kartu cukup pada zoom gambar yang sangat halus (`group-hover:scale-[1.03] transition-transform duration-300 ease-out`) dan perubahan warna border (`hover:border-zinc-300`).

#### D. Navigation, Modals & Overlays (Navigasi & Dialog)
- **DON'T:** Jangan membuat *navbar* dengan lebih dari 5–6 item tingkat atas atau warna latar belakang mencolok yang mengalihkan perhatian dari konten utama.
- **DO:**
  - *Sticky Header*: Gunakan `sticky top-0 z-30 h-14 bg-white/80 backdrop-blur-md border-b border-zinc-200/80`.
  - Indikator menu aktif harus jelas (misal: `bg-zinc-100 text-zinc-900 font-medium` pada sidebar, atau garis bawah `border-b-2 border-zinc-900 text-zinc-900` pada tab).

### 5.7. Code Cleanliness & Semantic Architecture (Kebersihan Kode)
- **DON'T:**
  - **DILARANG** menulis komentar konyol yang hanya mengulang kode, seperti `// This is the header`, `// Loop through projects`, atau `<!-- Card container -->`.
  - **DILARANG** meninggalkan potongan kode mati atau komentar pemalas seperti `// TODO: add logic here` atau `// ... rest of items`.
  - Jangan membuat `<div>` bersarang tanpa arti (*div soup*) atau menggunakan `<div onClick={...}>` untuk elemen yang seharusnya berupa `<button>` atau `<a>`.
- **DO:**
  - Gunakan tag HTML5 semantik (`<header>`, `<main>`, `<section>`, `<nav>`, `<article>`, `<aside>`, `<footer>`).
  - Gunakan `<button type="button">` untuk aksi di halaman, `<button type="submit">` untuk form, dan `<a href="...">` / `<Link>` untuk perpindahan halaman.
  - Tulis komentar **HANYA** untuk menjelaskan *mengapa* (*business rule*, *edge-case workaround*, atau rumus kalkulasi kompleks), bukan *apa* yang sedang dilakukan kode.

### 5.8. Pre-Flight Self-Audit Checklist (Wajib Dicek Sebelum Output Kode)
Sebelum mengirimkan kode akhir kepada pengguna di setiap fase, AI Coder **WAJIB** memverifikasi daftar periksa ini:
- [ ] Apakah ada warna `indigo-*`, `purple-*`, `violet-*`, atau gradasi pelangi? *(Jika ya, ganti ke `zinc` atau warna aksen yang disepakati).*
- [ ] Apakah ada emoji (🚀, ✨, ⚡, dll.) di dalam kode JSX/HTML? *(Jika ya, hapus dan ganti dengan ikon SVG `lucide-react`).*
- [ ] Apakah ada teks `"Lorem ipsum"`, `"Click here"`, atau `"John Doe"`? *(Jika ya, ganti dengan data kontekstual yang realistis).*
- [ ] Apakah semua harga, angka, metrik latensi, tanggal, dan tabel sudah menggunakan `tabular-nums`?
- [ ] Apakah semua tombol dan input sudah memiliki *focus-visible ring*, *active scale*, dan tinggi (`h-9` / `h-10`) yang konsisten?
- [ ] Apakah masih ada kelas `transition-all` atau `shadow-2xl` pada kartu biasa? *(Jika ya, perbaiki ke transisi spesifik dan `shadow-xs`).*

---

## 6. Database Schema Blueprint (Supabase PostgreSQL)

1. **Tabel `profile_settings` (Konfigurasi Profil & Status Ketersediaan Kerja)**
   - `id` (`uuid`, PK), `full_name` (`text`), `headline` (`text`), `bio` (`text`), `location` (`text`), `email` (`text`), `github_url` (`text`), `linkedin_url` (`text`), `resume_url` (`text`), `availability_status` (`text`: `'available' | 'open_to_selective' | 'unavailable'`), `availability_note` (`text`), `updated_at` (`timestamptz`).
2. **Tabel `projects` (Case Study Proyek Mendalam)**
   - `id` (`uuid`, PK), `slug` (`text`, unique), `code` (`text` — misal `SYS-01`), `title` (`text`), `summary` (`text`), `role` (`text`), `period` (`text`), `client_or_company` (`text`), `tech_stack` (`text[]`), `architecture_overview` (`text`), `technical_challenges` (`text`), `key_metrics` (`jsonb` — misal: `[{"label": "P95 Latency", "value": "38 ms"}, {"label": "Throughput", "value": "14.200 req/s"}]`), `thumbnail_url` (`text`), `live_url` (`text`), `repo_url` (`text`), `is_featured` (`boolean`), `published` (`boolean`), `display_order` (`int`), `created_at` (`timestamptz`).
3. **Tabel `experiences` (Interactive Timeline Pengalaman Kerja)**
   - `id` (`uuid`, PK), `company_name` (`text`), `role_title` (`text`), `employment_type` (`text` — `'Full-time' | 'Contract' | 'Advisory'`), `location` (`text`), `start_date` (`text`), `end_date` (`text`, null jika *Present*), `is_current` (`boolean`), `highlights` (`text[]`), `tech_used` (`text[]`), `display_order` (`int`), `created_at` (`timestamptz`).
4. **Tabel `posts` (Technical Blog / Engineering Notes)**
   - `id` (`uuid`, PK), `slug` (`text`, unique), `title` (`text`), `excerpt` (`text`), `content` (`text` — konten artikel teknis beserta blok kode), `category` (`text` — `'System Architecture' | 'Database & SQL' | 'Frontend Performance' | 'DevOps & Cloud'`), `reading_time_minutes` (`int`), `published` (`boolean`), `published_at` (`timestamptz`), `created_at` (`timestamptz`).
5. **Tabel `inquiries` (Form Kontak / Hire Me Inbox)**
   - `id` (`uuid`, PK), `reference_code` (`text` — misal `INQ-2026-0104`), `sender_name` (`text`), `sender_email` (`text`), `company` (`text`), `inquiry_type` (`text` — `'Full-time Role' | 'Project Consultation' | 'Technical Advisory'`), `budget_or_comp` (`text`), `message` (`text`), `status` (`text` — `'unread' | 'read' | 'replied' | 'archived'`), `created_at` (`timestamptz`).

*(Dilengkapi dengan Fallback/Seed Data realistis tingkat Senior Engineer Indonesia sehingga aplikasi tetap berfungsi penuh dengan data nyata sekalipun kredensial Supabase belum diisi di `.env.local`).*

---

## 7. Execution Phases (Tahapan Pengerjaan)

### Phase 1: Project Initialization, Design System & Base Layout
- **Tujuan:** Setup dependensi inti (`lucide-react`, `react-hook-form`, `zod`, `@hookform/resolvers`, `@supabase/supabase-js`, `@supabase/ssr`, `clsx`, `tailwind-merge`), konfigurasi Tailwind CSS sesuai **Anti-AI Slop Manifesto (Section 5)**, tipe data global (`src/types/`), serta pembuatan *App Shell* publik (Sticky Navbar dengan indikator *Availability Status* + Footer teknis) dan komponen **4 Mandatory UI States** global (`EmptyState`, `SkeletonLoader`, `ErrorState`, `StatusBadge`).
- **Deliverables:**
  1. Definisi TypeScript lengkap di `src/types/portfolio.ts` (termasuk `ActionResponse<T>`).
  2. Komponen UI Dasar & 4 Mandatory UI States (`Button`, `Input`, `Badge`, `EmptyState`, `ErrorState`, `Skeleton`).
  3. Layout Utama (`Navbar` dengan indikator status kerja live, `Footer`, dan struktur dasar halaman beranda editorial).

### Phase 2: Database Schema, Supabase Setup & Authentication
- **Tujuan:** Konfigurasi Supabase Client/Server (`src/lib/supabase/`), file migrasi SQL lengkap beserta Row Level Security (RLS) di `supabase/schema.sql`, *Realistic Engineering Seed Data* sebagai fallback/initial state, serta halaman Login Admin (`/login`) dan proteksi rute Admin (`/admin`).
- **Deliverables:**
  1. File SQL skema lengkap & RLS (`supabase/schema.sql`) untuk 5 tabel utama + contoh file `.env.example`.
  2. Supabase client/server utilities + Repository/Data Access Layer dengan *graceful fallback* ke data realistis.
  3. Halaman `/login` dengan React Hook Form + Zod, Server Action autentikasi, dan layout Sidebar `/admin`.

### Phase 3: Core Feature 1 — Case Study Showcase, Experience Timeline & Tech Matrix
- **Tujuan:** Membangun halaman utama portofolio publik (`/`, `/projects`, `/projects/[slug]`) yang menampilkan Hero profil engineer, metrik sistem (`tabular-nums`), Interactive Experience Timeline, Tech Stack Matrix berdasarkan domain arsitektur, serta halaman detail Case Study proyek (Arsitektur, Tantangan Teknis, Metrik Performa, Live Demo & Repo).
- **Deliverables:**
  1. Landing Page (`/`) dengan Asymmetric Editorial Hero, Featured Case Studies, Interactive Experience Timeline, dan Categorized Tech Stack Matrix.
  2. Halaman Katalog Proyek (`/projects`) dengan filter teknologi & halaman Detail Case Study (`/projects/[slug]`).
  3. Penerapan 4 Mandatory UI States di seluruh komponen katalog proyek dan timeline.

### Phase 4: Core Feature 2 — Technical Blog (Engineering Notes) & Hire Me Contact Flow
- **Tujuan:** Membangun sistem **Technical Blog / Engineering Notes** (`/notes` dan `/notes/[slug]`) dengan tampilan blok kode yang rapi (`font-mono`), estimasi waktu baca (`tabular-nums`), filter kategori teknis, serta halaman/seksi **Hire Me / Contact Form** (`/contact`) terintegrasi Server Action + validasi Zod yang menyimpan pesan ke tabel `inquiries`.
- **Deliverables:**
  1. Halaman daftar artikel teknis (`/notes`) dan halaman baca artikel (`/notes/[slug]`) dengan renderer kode blok monokromatik & daftar isi.
  2. Formulir interaktif **Hire Me / Contact** (`/contact`) dengan pilihan tipe kolaborasi, estimasi kompensasi/budget, validasi Zod, serta *loading/error/success state* presisi.

### Phase 5: Admin CMS Dashboard, Final Integration & Pre-Flight Audit
- **Tujuan:** Menyelesaikan halaman **Dynamic Admin CMS Dashboard** (`/admin`, `/admin/projects`, `/admin/notes`, `/admin/inquiries`, `/admin/settings`) untuk menambah/mengedit proyek, menulis artikel teknis, mengubah status *Available for Hire*, dan membaca pesan masuk dalam format tabel data padat (`tabular-nums`), diikuti dengan audit penuh **Pre-Flight Self-Audit Checklist (Section 5.8)** dan pemeriksaan `tsc --noEmit` / `next build`.
- **Deliverables:**
  1. Dashboard Admin lengkap dengan Data Table berstandar Section 5.6.B, form CRUD Proyek & Artikel, toggle Availability Status, dan manajemen pesan masuk (*Inquiries*).
  2. Verifikasi penuh `tsc --noEmit`, build check, dan lulus seluruh checklist Section 5.8.

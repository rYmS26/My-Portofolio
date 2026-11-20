export interface PeerTestimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  quote: string;
  verified: boolean;
}

export const ABOUT_HIGHLIGHTS: string[] = [
  "Merancang mesin buku besar (double-entry ledger) berisolasi Serializable di PostgreSQL yang memproses 1,2 juta transaksi harian tanpa selisih saldo.",
  "Membangun arsitektur Next.js App Router (Server Components & Server Actions) yang memangkas P95 latency hingga 64% pada dashboard B2B padat data.",
  "Menegakkan standar TypeScript strict mode, validasi skema Zod end-to-end, serta isolasi multi-tenant Row Level Security (RLS) di Supabase.",
];

export const PEER_TESTIMONIALS: PeerTestimonial[] = [
  {
    id: "testi-01",
    author: "Rizky Darmawan",
    role: "VP of Engineering",
    company: "Nusantara Finansial",
    initials: "RD",
    quote:
      "Arif merekonstruksi mesin settlement kami dari nol. Waktu rekonsiliasi turun dari 4 jam menjadi di bawah 2 detik dengan nol insiden double-spend.",
    verified: true,
  },
  {
    id: "testi-02",
    author: "Dimas Prawira",
    role: "Head of Product",
    company: "Katalogin Commerce",
    initials: "DP",
    quote:
      "Kombinasi langka antara ketajaman arsitektur database PostgreSQL dan kepekaan tinggi terhadap detail antarmuka dashboard operasional.",
    verified: true,
  },
  {
    id: "testi-03",
    author: "dr. Ratna Wulandari",
    role: "Clinical Operations Director",
    company: "Jaringan Medika Nusantara",
    initials: "RW",
    quote:
      "Workspace rekam medis yang dirancang Arif memangkas waktu input dokter spesialis hampir separuhnya tanpa mengorbankan audit keamanan data.",
    verified: true,
  },
  {
    id: "testi-04",
    author: "Budi Santoso",
    role: "Principal Cloud Architect",
    company: "Lokadata Cloud",
    initials: "BS",
    quote:
      "Kode yang ditulis Arif selalu bersih, terdokumentasi dengan baik, dan tahan banting saat lonjakan trafik puncak terjadi di produksi.",
    verified: true,
  },
];

// Deterministic 32-week x 7-day engineering activity matrix (values 0..4)
export const ACTIVITY_HEATMAP_WEEKS: number[][] = Array.from(
  { length: 32 },
  (_, weekIdx) =>
    Array.from({ length: 7 }, (_, dayIdx) => {
      const seed = (weekIdx * 13 + dayIdx * 7 + (weekIdx % 5) * 3) % 11;
      if (seed <= 2) return 0;
      if (seed <= 4) return 1;
      if (seed <= 6) return 2;
      if (seed <= 8) return 3;
      return 4;
    })
);

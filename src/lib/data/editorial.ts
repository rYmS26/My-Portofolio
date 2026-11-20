export interface EducationEntry {
  id: string;
  institution: string;
  degree_and_field: string;
  period: string;
  grade?: string;
  skills: string[];
}

export interface CertificationEntry {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  expires: string;
  credential_id: string;
  credential_url: string;
}

export const ABOUT_HIGHLIGHTS: string[] = [
  "Berpengalaman mengembangkan proyek website E-commerce menggunakan framework modern serta manajemen database CRUD berbasis MySQL.",
  "Menyelesaikan Praktik Kerja Lapangan (PKL) selama 4 bulan sebagai Back End Developer di BBPPMPV BMTI Kemdikbud, Cimahi.",
  "Aktif memperdalam rekayasa perangkat lunak melalui pendidikan Sistem Informasi di Universitas Galuh (UNIGAL) dan sertifikasi Dicoding Indonesia.",
];

export const EDUCATION_ENTRIES: EducationEntry[] = [
  {
    id: "edu-unigal",
    institution: "Universitas Galuh (UNIGAL)",
    degree_and_field: "S1 Sistem Informasi",
    period: "Sep 2025 — Sep 2029",
    skills: ["Sistem Informasi", "Pengembangan Web", "Back-End Architecture"],
  },
  {
    id: "edu-smkn1-ciamis",
    institution: "SMKN 1 Ciamis",
    degree_and_field: "Computer Programming / Rekayasa Perangkat Lunak",
    period: "Jul 2022 — Mei 2025",
    grade: "IPK / Nilai: 87,91",
    skills: [
      "Back-End Web Development",
      "Laravel",
      "PHP",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "MySQL",
    ],
  },
];

export const CERTIFICATION_ENTRIES: CertificationEntry[] = [
  {
    id: "cert-dicoding-backend",
    title: "Belajar Back-End Pemula dengan JavaScript",
    issuer: "Dicoding Indonesia",
    issued: "Sep 2025",
    expires: "Sep 2028",
    credential_id: "L4PQ2G092ZO1",
    credential_url: "https://www.dicoding.com/certificates/L4PQ2G092ZO1",
  },
  {
    id: "cert-dicoding-prompt",
    title: "Prompt Engineering untuk Software Developer",
    issuer: "Dicoding Indonesia",
    issued: "Sep 2025",
    expires: "Sep 2028",
    credential_id: "53XEKN8NVXRN",
    credential_url: "https://www.dicoding.com/certificates/53XEKN8NVXRN",
  },
  {
    id: "cert-dicoding-js",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    issued: "Sep 2025",
    expires: "Sep 2028",
    credential_id: "JMZVE6K83PN9",
    credential_url: "https://www.dicoding.com/certificates/JMZVE6K83PN9",
  },
  {
    id: "cert-dicoding-ai",
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    issued: "Sep 2025",
    expires: "Sep 2028",
    credential_id: "JMZVEKRN3PN9",
    credential_url: "https://www.dicoding.com/certificates/JMZVEKRN3PN9",
  },
];

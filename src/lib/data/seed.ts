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
  full_name: "Royhan Muhammad Sabila",
  headline: "Backend Developer | Website Developer",
  bio: "Mahasiswa Sistem Informasi di Universitas Galuh (UNIGAL) dan lulusan Computer Programming SMKN 1 Ciamis. Berpengalaman membangun proyek website E-commerce berbasis framework dan manajemen database CRUD menggunakan Laravel, PHP, JavaScript, Node.js, React.js, serta MySQL.",
  location: "Ciamis, Jawa Barat, Indonesia",
  email: "royhanms12@gmail.com",
  github_url: "https://github.com/rYmS26",
  linkedin_url: "https://www.linkedin.com/in/royhan-ms26/",
  resume_url: "https://www.linkedin.com/in/royhan-ms26/",
  availability_status: "available",
  availability_note: "Open to Work — Back End Developer & Website Developer",
  years_of_experience: 2,
  systems_architected: 4,
  avg_latency_reduction_pct: 0,
  updated_at: "2026-11-20T13:55:00+07:00",
};

export const INITIAL_PROJECTS: ProjectCaseStudy[] = [];

export const INITIAL_EXPERIENCES: WorkExperience[] = [
  {
    id: "exp-bbppmpv-bmti",
    company_name: "BBPPMPV BMTI Kemdikbud",
    role_title: "Back End Developer",
    employment_type: "Internship",
    location: "Cimahi, Jawa Barat, Indonesia (On-site)",
    start_date: "Okt 2024",
    end_date: "Jan 2025",
    is_current: false,
    highlights: [
      "Menyelesaikan Praktik Kerja Lapangan (PKL) selama 4 bulan sebagai Back End Developer dengan Sertifikat Praktik Kerja Lapangan resmi.",
      "Terlibat dalam pengembangan aplikasi web dan logika back-end menggunakan Laravel, PHP, serta integrasi antarmuka React.js.",
    ],
    tech_used: ["Laravel", "PHP", "React.js", "Pengembangan Web"],
    display_order: 1,
    created_at: "2024-10-01T08:00:00+07:00",
  },
];

export const INITIAL_NOTES: EngineeringNote[] = [];

export const INITIAL_INQUIRIES: HireInquiry[] = [];

export const TECH_STACK_MATRIX: TechStackCategory[] = [
  {
    id: "backend-data",
    domain: "Back-End & Database",
    description: "Pengembangan server-side, REST API, framework PHP, dan manajemen basis data relasional.",
    items: [
      {
        name: "Laravel",
        proficiency: "Top Skill",
        production_years: "Back-End",
        use_case: "MVC framework, E-commerce CRUD & API",
      },
      {
        name: "PHP",
        proficiency: "Core",
        production_years: "Back-End",
        use_case: "Server-side web application development",
      },
      {
        name: "Node.js",
        proficiency: "Endorsed",
        production_years: "Back-End",
        use_case: "JavaScript runtime & RESTful back-end",
      },
      {
        name: "Go (Golang)",
        proficiency: "Core",
        production_years: "Back-End",
        use_case: "High-performance back-end services",
      },
      {
        name: "MySQL",
        proficiency: "Core",
        production_years: "Database",
        use_case: "Relational schema & CRUD database management",
      },
      {
        name: "Java",
        proficiency: "Core",
        production_years: "Programming",
        use_case: "Object-oriented programming fundamentals",
      },
    ],
  },
  {
    id: "frontend-arch",
    domain: "Web & Front-End Development",
    description: "Antarmuka web responsif menggunakan JavaScript modern, React, dan utility-first CSS.",
    items: [
      {
        name: "JavaScript",
        proficiency: "Top Skill",
        production_years: "Full-Stack",
        use_case: "Modern ES6+, web interactivity & back-end",
      },
      {
        name: "React.js",
        proficiency: "Core",
        production_years: "Front-End",
        use_case: "Component-based user interfaces",
      },
      {
        name: "Tailwind CSS",
        proficiency: "Core",
        production_years: "Styling",
        use_case: "Responsive utility-first UI styling",
      },
      {
        name: "Bootstrap",
        proficiency: "Core",
        production_years: "Styling",
        use_case: "Rapid responsive web layouts",
      },
      {
        name: "HTML & CSS",
        proficiency: "Core",
        production_years: "Web",
        use_case: "Semantic web structure & layouting",
      },
    ],
  },
  {
    id: "infra-quality",
    domain: "Design & Creative Tools",
    description: "Pendukung desain antarmuka visual, grafis vektor, dan konten multimedia.",
    items: [
      {
        name: "Adobe Illustrator",
        proficiency: "Design",
        production_years: "Visual",
        use_case: "Vector graphics & brand assets",
      },
      {
        name: "Canva",
        proficiency: "Design",
        production_years: "Visual",
        use_case: "Presentation & digital layout design",
      },
      {
        name: "CapCut",
        proficiency: "Media",
        production_years: "Video",
        use_case: "Video editing & product showcase",
      },
    ],
  },
];

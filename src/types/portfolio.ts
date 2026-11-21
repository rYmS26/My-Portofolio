export type ActionResponse<T = undefined> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type AvailabilityStatus =
  | "available"
  | "open_to_selective"
  | "unavailable";

export interface ProfileSettings {
  id: string;
  full_name: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  resume_url: string;
  availability_status: AvailabilityStatus;
  availability_note: string;
  years_of_experience: number;
  systems_architected: number;
  avg_latency_reduction_pct: number;
  updated_at: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  delta?: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  code: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  client_or_company: string;
  tech_stack: string[];
  architecture_overview: string;
  technical_challenges: string;
  key_metrics: ProjectMetric[];
  thumbnail_url: string;
  live_url?: string;
  repo_url?: string;
  is_featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
}

export type EmploymentType = "Full-time" | "Contract" | "Advisory" | "Internship";

export interface WorkExperience {
  id: string;
  company_name: string;
  role_title: string;
  employment_type: EmploymentType;
  location: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  highlights: string[];
  tech_used: string[];
  display_order: number;
  created_at: string;
}

export interface EducationRecord {
  id: string;
  institution: string;
  degree_and_field: string;
  period: string;
  grade: string | null;
  skills: string[];
  display_order: number;
  created_at: string;
}

export type NoteCategory =
  | "System Architecture"
  | "Database & SQL"
  | "Frontend Performance"
  | "DevOps & Cloud";

export interface EngineeringNote {
  id: string;
  slug: string;
  code: string;
  title: string;
  excerpt: string;
  content: string;
  category: NoteCategory;
  reading_time_minutes: number;
  published: boolean;
  published_at: string;
  created_at: string;
}

export type InquiryType =
  | "Full-time Role"
  | "Project Consultation"
  | "Technical Advisory";

export type InquiryStatus = "unread" | "read" | "replied" | "archived";

export interface HireInquiry {
  id: string;
  reference_code: string;
  sender_name: string;
  sender_email: string;
  company: string;
  inquiry_type: InquiryType;
  budget_or_comp: string;
  message: string;
  status: InquiryStatus;
  created_at: string;
}

export interface TechStackCategory {
  id: string;
  domain: string;
  description: string;
  items: {
    name: string;
    proficiency: string;
    production_years: string;
    use_case: string;
  }[];
}

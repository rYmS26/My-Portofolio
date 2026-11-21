import { cacheTag } from "next/cache";
import {
  INITIAL_EXPERIENCES,
  INITIAL_INQUIRIES,
  INITIAL_NOTES,
  INITIAL_PROFILE_SETTINGS,
  INITIAL_PROJECTS,
} from "@/lib/data/seed";
import { EDUCATION_ENTRIES } from "@/lib/data/editorial";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  EducationRecord,
  EngineeringNote,
  HireInquiry,
  ProfileSettings,
  ProjectCaseStudy,
  WorkExperience,
} from "@/types/portfolio";

const FALLBACK_EDUCATIONS: EducationRecord[] = EDUCATION_ENTRIES.map(
  (entry, idx) => ({
    id: entry.id,
    institution: entry.institution,
    degree_and_field: entry.degree_and_field,
    period: entry.period,
    grade: entry.grade ?? null,
    skills: entry.skills,
    display_order: idx + 1,
    created_at: "2025-09-01T00:00:00+07:00",
  })
);

export async function getProfileSettings(): Promise<ProfileSettings> {
  "use cache";
  cacheTag("profile");

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return INITIAL_PROFILE_SETTINGS;
  }

  try {
    const { data, error } = await supabase
      .from("profile_settings")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return INITIAL_PROFILE_SETTINGS;
    }

    return data as ProfileSettings;
  } catch {
    return INITIAL_PROFILE_SETTINGS;
  }
}

export async function getPublishedProjects(): Promise<ProjectCaseStudy[]> {
  "use cache";
  cacheTag("projects");

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return INITIAL_PROJECTS.filter((project) => project.published);
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return INITIAL_PROJECTS.filter((project) => project.published);
    }

    return data as ProjectCaseStudy[];
  } catch {
    return INITIAL_PROJECTS.filter((project) => project.published);
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectCaseStudy | null> {
  "use cache";
  cacheTag("projects");

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return (
      INITIAL_PROJECTS.find(
        (project) => project.slug === slug && project.published
      ) ?? null
    );
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return (
        INITIAL_PROJECTS.find(
          (project) => project.slug === slug && project.published
        ) ?? null
      );
    }

    return data as ProjectCaseStudy;
  } catch {
    return (
      INITIAL_PROJECTS.find(
        (project) => project.slug === slug && project.published
      ) ?? null
    );
  }
}

export async function getAllProjectsForAdmin(): Promise<ProjectCaseStudy[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return INITIAL_PROJECTS;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return INITIAL_PROJECTS;
    }

    return data as ProjectCaseStudy[];
  } catch {
    return INITIAL_PROJECTS;
  }
}

export async function getWorkExperiences(): Promise<WorkExperience[]> {
  "use cache";
  cacheTag("experiences");

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return INITIAL_EXPERIENCES;
  }

  try {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return INITIAL_EXPERIENCES;
    }

    return data as WorkExperience[];
  } catch {
    return INITIAL_EXPERIENCES;
  }
}

export async function getPublishedNotes(): Promise<EngineeringNote[]> {
  "use cache";
  cacheTag("notes");

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return INITIAL_NOTES.filter((note) => note.published);
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_NOTES.filter((note) => note.published);
    }

    return data as EngineeringNote[];
  } catch {
    return INITIAL_NOTES.filter((note) => note.published);
  }
}

export async function getAllNotesForAdmin(): Promise<EngineeringNote[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return INITIAL_NOTES;
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_NOTES;
    }

    return data as EngineeringNote[];
  } catch {
    return INITIAL_NOTES;
  }
}

export async function getNoteBySlug(
  slug: string
): Promise<EngineeringNote | null> {
  "use cache";
  cacheTag("notes");

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return (
      INITIAL_NOTES.find((note) => note.slug === slug && note.published) ?? null
    );
  }

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) {
      return (
        INITIAL_NOTES.find((note) => note.slug === slug && note.published) ??
        null
      );
    }

    return data as EngineeringNote;
  } catch {
    return (
      INITIAL_NOTES.find((note) => note.slug === slug && note.published) ?? null
    );
  }
}

export async function getAllInquiriesForAdmin(): Promise<HireInquiry[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return INITIAL_INQUIRIES;
  }

  try {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return INITIAL_INQUIRIES;
    }

    return data as HireInquiry[];
  } catch {
    return INITIAL_INQUIRIES;
  }
}

export async function getEducations(): Promise<EducationRecord[]> {
  "use cache";
  cacheTag("educations");

  const supabase = createSupabasePublicClient();
  if (!supabase) {
    return FALLBACK_EDUCATIONS;
  }

  try {
    const { data, error } = await supabase
      .from("educations")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_EDUCATIONS;
    }

    return data as EducationRecord[];
  } catch {
    return FALLBACK_EDUCATIONS;
  }
}

export async function getAllEducationsForAdmin(): Promise<EducationRecord[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return FALLBACK_EDUCATIONS;
  }

  try {
    const { data, error } = await supabase
      .from("educations")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_EDUCATIONS;
    }

    return data as EducationRecord[];
  } catch {
    return FALLBACK_EDUCATIONS;
  }
}

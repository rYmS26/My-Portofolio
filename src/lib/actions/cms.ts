"use server";

import { revalidatePath, updateTag } from "next/cache";
import { getAuthenticatedAdmin } from "@/lib/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  educationFormSchema,
  noteFormSchema,
  profileSettingsSchema,
  projectFormSchema,
  type EducationFormValues,
  type NoteFormValues,
  type ProfileSettingsFormValues,
  type ProjectFormValues,
} from "@/lib/validations/cms";
import type {
  ActionResponse,
  EducationRecord,
  EngineeringNote,
  InquiryStatus,
  ProfileSettings,
  ProjectCaseStudy,
} from "@/types/portfolio";
import { INITIAL_PROFILE_SETTINGS } from "@/lib/data/seed";

async function requireAdmin(): Promise<ActionResponse<never> | null> {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return {
      success: false,
      error: "Sesi administrator tidak valid atau telah kedaluwarsa.",
    };
  }
  return null;
}

export async function createProjectAction(
  values: ProjectFormValues
): Promise<ActionResponse<ProjectCaseStudy>> {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = projectFormSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ?? "Data studi kasus tidak valid.",
    };
  }

  const techStack = parsed.data.tech_stack_csv
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const newProject: ProjectCaseStudy = {
    id: crypto.randomUUID(),
    slug: parsed.data.slug,
    code: parsed.data.code.toUpperCase(),
    title: parsed.data.title,
    summary: parsed.data.summary,
    role: parsed.data.role,
    period: parsed.data.period,
    client_or_company: parsed.data.client_or_company,
    tech_stack: techStack.length > 0 ? techStack : ["Next.js", "PostgreSQL"],
    architecture_overview: parsed.data.architecture_overview,
    technical_challenges: parsed.data.technical_challenges,
    key_metrics: [
      {
        label: parsed.data.primary_metric_label,
        value: parsed.data.primary_metric_value,
      },
    ],
    thumbnail_url: "/images/projects/default.svg",
    is_featured: parsed.data.is_featured,
    published: parsed.data.published,
    display_order: 10,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .insert({
          slug: newProject.slug,
          code: newProject.code,
          title: newProject.title,
          summary: newProject.summary,
          role: newProject.role,
          period: newProject.period,
          client_or_company: newProject.client_or_company,
          tech_stack: newProject.tech_stack,
          architecture_overview: newProject.architecture_overview,
          technical_challenges: newProject.technical_challenges,
          key_metrics: newProject.key_metrics,
          thumbnail_url: newProject.thumbnail_url,
          is_featured: newProject.is_featured,
          published: newProject.published,
          display_order: newProject.display_order,
        })
        .select("*")
        .single();

      if (error) {
        return {
          success: false,
          error: `Gagal menyimpan studi kasus ke Supabase: ${error.message}`,
        };
      }

      updateTag("projects");
      revalidatePath("/");
      revalidatePath("/projects");
      revalidatePath("/admin/projects");
      return { success: true, data: data as ProjectCaseStudy };
    }
  }

  updateTag("projects");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true, data: newProject };
}

export async function toggleProjectPublishAction(
  id: string,
  nextPublished: boolean
): Promise<ActionResponse<{ id: string; published: boolean }>> {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase
        .from("projects")
        .update({ published: nextPublished })
        .eq("id", id);

      if (error) {
        return {
          success: false,
          error: `Gagal memperbarui status publikasi: ${error.message}`,
        };
      }
    }
  }

  updateTag("projects");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true, data: { id, published: nextPublished } };
}

export async function deleteProjectAction(
  id: string
): Promise<ActionResponse<{ id: string }>> {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) {
        return {
          success: false,
          error: `Gagal menghapus studi kasus: ${error.message}`,
        };
      }
    }
  }

  updateTag("projects");
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  return { success: true, data: { id } };
}

export async function createNoteAction(
  values: NoteFormValues
): Promise<ActionResponse<EngineeringNote>> {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = noteFormSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ?? "Data catatan teknis tidak valid.",
    };
  }

  const now = new Date().toISOString();
  const newNote: EngineeringNote = {
    id: crypto.randomUUID(),
    slug: parsed.data.slug,
    code: parsed.data.code.toUpperCase(),
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    category: parsed.data.category,
    reading_time_minutes: parsed.data.reading_time_minutes,
    published: parsed.data.published,
    published_at: now,
    created_at: now,
  };

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("posts")
        .insert({
          slug: newNote.slug,
          code: newNote.code,
          title: newNote.title,
          excerpt: newNote.excerpt,
          content: newNote.content,
          category: newNote.category,
          reading_time_minutes: newNote.reading_time_minutes,
          published: newNote.published,
          published_at: newNote.published_at,
        })
        .select("*")
        .single();

      if (error) {
        return {
          success: false,
          error: `Gagal menyimpan catatan ke Supabase: ${error.message}`,
        };
      }

      updateTag("notes");
      revalidatePath("/");
      revalidatePath("/notes");
      revalidatePath("/admin/notes");
      return { success: true, data: data as EngineeringNote };
    }
  }

  updateTag("notes");
  revalidatePath("/");
  revalidatePath("/notes");
  revalidatePath("/admin/notes");
  return { success: true, data: newNote };
}

export async function toggleNotePublishAction(
  id: string,
  nextPublished: boolean
): Promise<ActionResponse<{ id: string; published: boolean }>> {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase
        .from("posts")
        .update({ published: nextPublished })
        .eq("id", id);

      if (error) {
        return {
          success: false,
          error: `Gagal mengubah status catatan: ${error.message}`,
        };
      }
    }
  }

  updateTag("notes");
  revalidatePath("/");
  revalidatePath("/notes");
  revalidatePath("/admin/notes");
  return { success: true, data: { id, published: nextPublished } };
}

export async function updateInquiryStatusAction(
  id: string,
  status: InquiryStatus
): Promise<ActionResponse<{ id: string; status: InquiryStatus }>> {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase
        .from("inquiries")
        .update({ status })
        .eq("id", id);

      if (error) {
        return {
          success: false,
          error: `Gagal memperbarui status pesan: ${error.message}`,
        };
      }
    }
  }

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  return { success: true, data: { id, status } };
}

export async function updateProfileSettingsAction(
  values: ProfileSettingsFormValues
): Promise<ActionResponse<ProfileSettings>> {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = profileSettingsSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ?? "Pengaturan profil tidak valid.",
    };
  }

  const updatedProfile: ProfileSettings = {
    ...INITIAL_PROFILE_SETTINGS,
    ...parsed.data,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data: existing, error: selectError } = await supabase
        .from("profile_settings")
        .select("id")
        .limit(1)
        .maybeSingle();

      if (selectError) {
        return {
          success: false,
          error: `Gagal membaca tabel profile_settings: ${selectError.message}`,
        };
      }

      if (existing?.id) {
        const { data, error } = await supabase
          .from("profile_settings")
          .update({
            full_name: parsed.data.full_name,
            headline: parsed.data.headline,
            bio: parsed.data.bio,
            location: parsed.data.location,
            email: parsed.data.email,
            github_url: parsed.data.github_url,
            linkedin_url: parsed.data.linkedin_url,
            availability_status: parsed.data.availability_status,
            availability_note: parsed.data.availability_note,
            updated_at: updatedProfile.updated_at,
          })
          .eq("id", existing.id)
          .select("*")
          .single();

        if (error) {
          return {
            success: false,
            error: `Gagal memperbarui profil di Supabase: ${error.message}`,
          };
        }

        updateTag("profile");
        revalidatePath("/", "layout");
        revalidatePath("/contact");
        revalidatePath("/admin");
        revalidatePath("/admin/settings");
        return { success: true, data: data as ProfileSettings };
      }

      const { data: inserted, error: insertError } = await supabase
        .from("profile_settings")
        .insert({
          full_name: parsed.data.full_name,
          headline: parsed.data.headline,
          bio: parsed.data.bio,
          location: parsed.data.location,
          email: parsed.data.email,
          github_url: parsed.data.github_url,
          linkedin_url: parsed.data.linkedin_url,
          resume_url: INITIAL_PROFILE_SETTINGS.resume_url,
          availability_status: parsed.data.availability_status,
          availability_note: parsed.data.availability_note,
          years_of_experience: INITIAL_PROFILE_SETTINGS.years_of_experience,
          systems_architected: INITIAL_PROFILE_SETTINGS.systems_architected,
          avg_latency_reduction_pct:
            INITIAL_PROFILE_SETTINGS.avg_latency_reduction_pct,
          updated_at: updatedProfile.updated_at,
        })
        .select("*")
        .single();

      if (insertError) {
        return {
          success: false,
          error: `Gagal membuat profil di Supabase: ${insertError.message}`,
        };
      }

      updateTag("profile");
      revalidatePath("/", "layout");
      revalidatePath("/contact");
      revalidatePath("/admin");
      revalidatePath("/admin/settings");
      return { success: true, data: inserted as ProfileSettings };
    }
  }

  updateTag("profile");
  revalidatePath("/", "layout");
  revalidatePath("/contact");
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
  return { success: true, data: updatedProfile };
}

export async function createEducationAction(
  values: EducationFormValues
): Promise<ActionResponse<EducationRecord>> {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = educationFormSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ?? "Data pendidikan tidak valid.",
    };
  }

  const skills = parsed.data.skills_csv
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const newEducation: EducationRecord = {
    id: crypto.randomUUID(),
    institution: parsed.data.institution,
    degree_and_field: parsed.data.degree_and_field,
    period: parsed.data.period,
    grade: parsed.data.grade?.trim() ? parsed.data.grade.trim() : null,
    skills,
    display_order: parsed.data.display_order,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("educations")
        .insert({
          institution: newEducation.institution,
          degree_and_field: newEducation.degree_and_field,
          period: newEducation.period,
          grade: newEducation.grade,
          skills: newEducation.skills,
          display_order: newEducation.display_order,
        })
        .select("*")
        .single();

      if (error) {
        return {
          success: false,
          error: `Gagal menyimpan pendidikan ke Supabase (pastikan tabel public.educations sudah dibuat): ${error.message}`,
        };
      }

      updateTag("educations");
      revalidatePath("/");
      revalidatePath("/admin");
      revalidatePath("/admin/education");
      return { success: true, data: data as EducationRecord };
    }
  }

  updateTag("educations");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/education");
  return { success: true, data: newEducation };
}

export async function deleteEducationAction(
  id: string
): Promise<ActionResponse<{ id: string }>> {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase
        .from("educations")
        .delete()
        .eq("id", id);

      if (error) {
        return {
          success: false,
          error: `Gagal menghapus data pendidikan: ${error.message}`,
        };
      }
    }
  }

  updateTag("educations");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/education");
  return { success: true, data: { id } };
}

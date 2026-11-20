"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import type { ActionResponse } from "@/types/portfolio";

export interface AuthenticatedAdmin {
  email: string;
  authMode: "supabase";
  signedInAt: string;
}

export async function signInAdminAction(
  values: LoginFormValues
): Promise<ActionResponse<{ redirectTo: string }>> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      error: "Email atau kata sandi tidak valid.",
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Layanan autentikasi belum dikonfigurasi pada server.",
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return {
      success: false,
      error: "Layanan autentikasi tidak tersedia.",
    };
  }

  const { email, password } = parsed.data;
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      error: "Email atau kata sandi tidak valid.",
    };
  }

  return {
    success: true,
    data: { redirectTo: "/admin" },
  };
}

export async function signOutAdminAction(): Promise<
  ActionResponse<{ redirectTo: string }>
> {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
  }

  return {
    success: true,
    data: { redirectTo: "/login" },
  };
}

export async function getAuthenticatedAdmin(): Promise<AuthenticatedAdmin | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user?.email) {
      return null;
    }

    return {
      email: user.email,
      authMode: "supabase",
      signedInAt: user.last_sign_in_at ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

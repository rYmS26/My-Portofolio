"use server";

import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import type { ActionResponse } from "@/types/portfolio";

const DEMO_SESSION_COOKIE = "devfolio_admin_session";

export interface AuthenticatedAdmin {
  email: string;
  authMode: "supabase" | "local_demo";
  signedInAt: string;
}

export async function signInAdminAction(
  values: LoginFormValues
): Promise<ActionResponse<{ redirectTo: string }>> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      success: false,
      error: firstIssue?.message ?? "Data kredensial tidak valid.",
    };
  }

  const { email, password } = parsed.data;

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: `Autentikasi Supabase ditolak: ${error.message}`,
        };
      }

      return {
        success: true,
        data: { redirectTo: "/admin" },
      };
    }
  }

  const expectedEmail =
    process.env.ADMIN_DEMO_EMAIL ?? "arif.pratama@devfolio.id";
  const expectedPassword =
    process.env.ADMIN_DEMO_PASSWORD ?? "DevFolio#2026";

  if (
    email.toLowerCase() !== expectedEmail.toLowerCase() ||
    password !== expectedPassword
  ) {
    return {
      success: false,
      error:
        "Email atau kata sandi tidak cocok. Gunakan kredensial Admin Demo yang tertera pada panel samping.",
    };
  }

  const cookieStore = await cookies();
  const payload: AuthenticatedAdmin = {
    email: expectedEmail,
    authMode: "local_demo",
    signedInAt: new Date().toISOString(),
  };

  cookieStore.set(DEMO_SESSION_COOKIE, JSON.stringify(payload), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

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

  const cookieStore = await cookies();
  cookieStore.delete(DEMO_SESSION_COOKIE);

  return {
    success: true,
    data: { redirectTo: "/login" },
  };
}

export async function getAuthenticatedAdmin(): Promise<AuthenticatedAdmin | null> {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email) {
          return {
            email: user.email,
            authMode: "supabase",
            signedInAt: user.last_sign_in_at ?? new Date().toISOString(),
          };
        }
      } catch {
        // Lanjut ke pemeriksaan cookie demo lokal
      }
    }
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(DEMO_SESSION_COOKIE)?.value;
  if (!sessionCookie) {
    return null;
  }

  try {
    const parsed = JSON.parse(sessionCookie) as AuthenticatedAdmin;
    if (parsed && typeof parsed.email === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAuthenticatedAdmin } from "@/lib/actions/auth";
import { LoginForm } from "@/components/auth/login-form";
import { Skeleton } from "@/components/ui/ui-states";

export const metadata: Metadata = {
  title: "Sign In",
  robots: {
    index: false,
    follow: false,
  },
};

function LoginFormSkeleton() {
  return (
    <div
      role="status"
      aria-label="Memuat formulir login"
      className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-5"
    >
      <div className="space-y-2 border-b border-zinc-100 pb-4">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-3.5 w-56" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-9 w-full rounded-lg" />
        <Skeleton className="h-9 w-full rounded-lg" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}

async function LoginGuardAndForm() {
  const currentAdmin = await getAuthenticatedAdmin();
  if (currentAdmin) {
    redirect("/admin");
  }

  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginGuardAndForm />
      </Suspense>
    </div>
  );
}

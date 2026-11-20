"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Lock } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { signInAdminAction } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    const result = await signInAdminAction(values);

    if (!result.success) {
      setServerError(
        result.error ?? "Email atau kata sandi tidak valid."
      );
      return;
    }

    router.push(result.data?.redirectTo ?? "/admin");
    router.refresh();
  };

  return (
    <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-5">
      <div className="flex items-center gap-2.5 border-b border-zinc-100 pb-4">
        <span className="size-8 rounded-lg bg-zinc-900 text-white inline-flex items-center justify-center shrink-0">
          <Lock className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-base font-semibold tracking-tight text-zinc-900">
            Sign In
          </h1>
          <p className="text-xs text-zinc-500">
            Masukkan kredensial terotorisasi untuk melanjutkan.
          </p>
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="border border-red-200/60 bg-red-50 text-red-700 rounded-lg p-3 text-xs flex items-center gap-2"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="nama@domain.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Kata Sandi"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          loadingText="Memverifikasi..."
          className="w-full"
        >
          <span>Masuk</span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </form>
    </div>
  );
}

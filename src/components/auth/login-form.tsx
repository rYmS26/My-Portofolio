"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ArrowRight,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { signInAdminAction } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface LoginFormProps {
  supabaseConfigured: boolean;
}

export function LoginForm({ supabaseConfigured }: LoginFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFillDemoCredentials = () => {
    setValue("email", "arif.pratama@devfolio.id", { shouldValidate: true });
    setValue("password", "DevFolio#2026", { shouldValidate: true });
    setServerError(null);
  };

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    const result = await signInAdminAction(values);

    if (!result.success) {
      setServerError(
        result.error ?? "Terjadi kesalahan saat memverifikasi sesi login."
      );
      return;
    }

    router.push(result.data?.redirectTo ?? "/admin");
    router.refresh();
  };

  return (
    <div className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
            Masuk ke CMS Workspace
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Otorisasi pengelolaan studi kasus, catatan teknis, dan pesan klien.
          </p>
        </div>
        <Badge tone={supabaseConfigured ? "success" : "warning"} withDot>
          {supabaseConfigured ? "Supabase Auth" : "Local Demo Auth"}
        </Badge>
      </div>

      {serverError && (
        <div
          role="alert"
          className="border border-red-200/60 bg-red-50 text-red-700 rounded-lg p-3.5 text-xs flex items-start gap-2.5"
        >
          <AlertCircle className="size-4 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-0.5">
            <p className="font-medium">Otorisasi Gagal</p>
            <p className="text-red-600 leading-relaxed">{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          label="Alamat Email Administrator"
          type="email"
          autoComplete="email"
          placeholder="arif.pratama@devfolio.id"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Kata Sandi"
          type="password"
          autoComplete="current-password"
          placeholder="Minimal 8 karakter"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {!supabaseConfigured && (
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={handleFillDemoCredentials}
            >
              <KeyRound className="size-4 text-zinc-600" aria-hidden="true" />
              <span>Isi Kredensial Demo</span>
            </Button>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            loadingText="Memverifikasi Sesi..."
            className="sm:ml-auto"
          >
            <span>Otorisasi & Masuk</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </form>

      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-emerald-700" aria-hidden="true" />
          <span>Sesi dilindungi HTTP-Only Cookie & RLS</span>
        </span>
        <span className="font-mono tabular-nums">TLS 1.3</span>
      </div>
    </div>
  );
}

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, FolderOpen, RefreshCw, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse bg-zinc-200/70 rounded-md", className)}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Memuat data proyek"
      className="bg-white border border-zinc-200/80 shadow-xs rounded-xl p-5 flex flex-col gap-4"
    >
      <Skeleton className="w-full aspect-video rounded-lg" />
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-zinc-100 last:border-0">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="py-3.5 px-4">
          <Skeleton className="h-4 w-full max-w-[140px]" />
        </td>
      ))}
    </tr>
  );
}

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = FolderOpen,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border border-dashed border-zinc-300 dark:border-zinc-800 rounded-xl p-8 text-center bg-white dark:bg-zinc-900/50",
        className
      )}
    >
      <Icon
        className="size-8 text-zinc-400 dark:text-zinc-500 mx-auto mb-3"
        aria-hidden="true"
      />
      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 text-pretty max-w-md mx-auto">
        {description}
      </p>
      {actionLabel && (actionHref || onAction) && (
        <div className="mt-4 flex justify-center">
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center justify-center h-9 px-3.5 py-2 text-sm font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 shadow-xs transition-[color,background-color,border-color,transform,opacity,box-shadow] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              {actionLabel}
            </Link>
          ) : (
            <Button onClick={onAction} size="md" variant="primary">
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export interface ErrorStateProps {
  title?: string;
  message: string;
  solution?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  title = "Gagal Memuat Data Sistem",
  message,
  solution = "Periksa koneksi jaringan atau konfigurasi environment Supabase Anda, lalu muat ulang komponen ini.",
  onRetry,
  retryLabel = "Muat Ulang Data",
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "border border-red-200/60 bg-red-50/70 rounded-xl p-6 text-left",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="size-5 text-red-700 shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-900">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-red-800 text-pretty">
            {message}
          </p>
          <p className="mt-1.5 text-xs text-red-700">{solution}</p>
          {onRetry && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="border-red-300 text-red-800 hover:bg-red-100/70"
              >
                <RefreshCw className="size-4" aria-hidden="true" />
                <span>{retryLabel}</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

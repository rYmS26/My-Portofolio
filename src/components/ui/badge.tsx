import * as React from "react";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/types/portfolio";

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "mono";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  withDot?: boolean;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-zinc-100 text-zinc-700 border-zinc-200/80",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  warning: "bg-amber-50 text-amber-700 border-amber-200/60",
  danger: "bg-red-50 text-red-700 border-red-200/60",
  mono: "bg-zinc-50 text-zinc-800 border-zinc-200/80 font-mono tabular-nums",
};

const dotClasses: Record<BadgeTone, string> = {
  neutral: "bg-zinc-500",
  success: "bg-emerald-600",
  warning: "bg-amber-600",
  danger: "bg-red-600",
  mono: "bg-zinc-700",
};

export function Badge({
  className,
  tone = "neutral",
  withDot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium border",
        withDot ? "rounded-full" : "rounded-md",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn("size-1.5 rounded-full shrink-0", dotClasses[tone])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export function AvailabilityBadge({
  status,
  customLabel,
}: {
  status: AvailabilityStatus;
  customLabel?: string;
}) {
  const config: Record<
    AvailabilityStatus,
    { tone: BadgeTone; defaultLabel: string }
  > = {
    available: {
      tone: "success",
      defaultLabel: "Available for Hire",
    },
    open_to_selective: {
      tone: "warning",
      defaultLabel: "Selective Advisory & Roles",
    },
    unavailable: {
      tone: "danger",
      defaultLabel: "Currently Fully Booked",
    },
  };

  const current = config[status];

  return (
    <Badge tone={current.tone} withDot>
      {customLabel ?? current.defaultLabel}
    </Badge>
  );
}

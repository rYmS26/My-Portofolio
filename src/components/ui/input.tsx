import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, error, hint, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-zinc-700 mb-1.5"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          className={cn(
            "w-full h-9 px-3 rounded-lg border border-zinc-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 shadow-2xs",
            "transition-[color,background-color,border-color,box-shadow] duration-150 ease-out",
            "focus-visible:border-zinc-900 focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:outline-none",
            "disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
            error && "border-red-500 focus-visible:border-red-600 focus-visible:ring-red-600",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="mt-1.5 text-xs text-zinc-500">{hint}</p>
        )}
        {error && (
          <p
            role="alert"
            className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5"
          >
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/**
 * ToastViewport.tsx
 * ------------------------------------------------------------------
 * Renders top-right notifications from the toast store. Mounted once
 * in the root layout so toasts appear above every page.
 * ------------------------------------------------------------------
 */
"use client";

import { useToastStore } from "@/lib/stores/toast-store";
import { cn } from "@/lib/utils";
import { X, AlertCircle, CheckCircle2, Info } from "lucide-react";

const iconByType = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
};

const accentByType: Record<string, string> = {
  error: "border-red-500/40 text-red-400",
  success: "border-green-500/40 text-green-400",
  info: "border-[rgba(244,166,193,0.4)] text-[#f4a6c1]",
};

export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[100] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((t) => {
        const Icon = iconByType[t.type];
        return (
          <div
            key={t.id}
            role="status"
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-lg border bg-card px-4 py-3 shadow-lg",
              accentByType[t.type]
            )}
          >
            <Icon size={18} className="mt-0.5 shrink-0" />
            <p className="flex-1 text-sm leading-snug text-foreground">
              {t.message}
            </p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="shrink-0 text-faint transition-colors hover:text-foreground"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

/**
 * toast-store.ts
 * ------------------------------------------------------------------
 * Lightweight top-right notification store.
 *
 * push({ type, message }) adds a toast; it auto-dismisses after a few
 * seconds. Used to surface failed-login notices for deleted accounts.
 * ------------------------------------------------------------------
 */
"use client";

import { create } from "zustand";

export type ToastType = "error" | "success" | "info";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastState {
  toasts: Toast[];
  push: (type: ToastType, message: string) => void;
  dismiss: (id: number) => void;
}

let nextId = 1;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  push: (type, message) => {
    const id = nextId++;
    set((s) => ({ toasts: [...s.toasts, { id, type, message }] }));
    // Auto-dismiss after 4 seconds.
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },

  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

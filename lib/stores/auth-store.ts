/**
 * auth-store.ts
 * ------------------------------------------------------------------
 * Client-side role-based auth state for the Billing page.
 *
 * Users pick a role (customer | owner) on the login/signup pages.
 * Owners additionally verify a phone number + OTP before the role is
 * granted. This is persisted in localStorage so the role survives
 * refreshes and the Billing page can show/hide the Billing History
 * section based on it.
 * ------------------------------------------------------------------
 */
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "customer" | "owner";

/** The only phone number that may authenticate as an owner. */
export const OWNER_PHONE = "9790933818";

interface AuthState {
  /** Logged-in role. `null` while not authenticated. */
  role: Role | null;
  /** Whether the owner has passed phone + OTP verification. */
  ownerVerified: boolean;
  /** Set the authenticated role. */
  setRole: (role: Role) => void;
  /** Flag that owner phone+OTP verification succeeded. */
  setOwnerVerified: (verified: boolean) => void;
  /** Clear auth state (sign out). */
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      ownerVerified: false,

      setRole: (role) => set({ role }),
      setOwnerVerified: (verified) => set({ ownerVerified: verified }),
      clearAuth: () => set({ role: null, ownerVerified: false }),
    }),
    { name: "bytecraft-auth" }
  )
);

/**
 * billing-store.ts
 * ------------------------------------------------------------------
 * Global UI state for the Billing page (Zustand).
 *
 * Zustand stores live OUTSIDE React's render cycle, so selecting a
 * plan or toggling a payment method from anywhere (e.g. a component
 * deep in the tree) updates every subscriber instantly.
 * ------------------------------------------------------------------
 */
"use client";

import { create } from "zustand";

/** Which payment method the user has selected. */
export type PaymentMethod = "upi" | "card";

/** A single billing-history row. */
export type BillingHistoryStatus = "paid" | "pending" | "failed";

export interface BillingHistory {
  id: string;
  date: string;
  plan: string;
  amount: number;
  status: BillingHistoryStatus;
}

interface BillingState {
  /** Currently chosen plan id (see /services pricing ids). */
  selectedPlan: string | null;
  /** Chosen payment method. */
  paymentMethod: PaymentMethod;
  /** Billing interval chosen by the user. */
  billingCycle: "monthly" | "yearly";
  /** Persisted billing history rows. */
  history: BillingHistory[];

  // Actions – each simply patches the matching slice of state.
  setSelectedPlan: (plan: string | null) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setBillingCycle: (cycle: "monthly" | "yearly") => void;
  addHistory: (entry: BillingHistory) => void;
  updateHistory: (id: string, entry: BillingHistory) => void;
  deleteHistory: (id: string) => void;
}

export const useBillingStore = create<BillingState>((set) => ({
  // Defaults
  selectedPlan: "professional",
  paymentMethod: "upi",
  billingCycle: "monthly",
  history: [],

  // Actions
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setBillingCycle: (cycle) => set({ billingCycle: cycle }),
  addHistory: (entry) => set((state) => ({ history: [entry, ...state.history] })),
  updateHistory: (id, entry) =>
    set((state) => ({
      history: state.history.map((h) => (h.id === id ? entry : h)),
    })),
  deleteHistory: (id) =>
    set((state) => ({ history: state.history.filter((h) => h.id !== id) })),
}));

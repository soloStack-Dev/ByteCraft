"use client";

import { create } from "zustand";

export type PaymentMethod = "upi" | "card";

interface BillingState {
  selectedPlan: string | null;
  paymentMethod: PaymentMethod;
  billingCycle: "monthly" | "yearly";
  setSelectedPlan: (plan: string | null) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setBillingCycle: (cycle: "monthly" | "yearly") => void;
}

export const useBillingStore = create<BillingState>((set) => ({
  selectedPlan: "professional",
  paymentMethod: "upi",
  billingCycle: "monthly",
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setBillingCycle: (cycle) => set({ billingCycle: cycle }),
}));

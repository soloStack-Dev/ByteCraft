/**
 * Billing page
 * ------------------------------------------------------------------
 * Plan selection + payment flow.
 *
 * Layout: billing image (left) beside plan/UPI-card payment controls
 * (right), then a payment-history table below.
 *
 * Selection state lives in the global useBillingStore so it persists
 * across page visits.
 * ------------------------------------------------------------------
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, CreditCard, QrCode, Plus, X, Pencil, Trash2 } from "lucide-react";
import { useScrollReveal, useEntrance } from "@/lib/animations";
import { useAuthStore } from "@/lib/stores/auth-store";
import {
  useBillingStore,
  type BillingHistory,
  type BillingHistoryStatus,
} from "@/lib/stores/billing-store";
import { cn } from "@/lib/utils";
import { inputClassName } from "@/lib/styles";

/** Available subscription plans. */
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "₹1,000",
    period: "/month",
    features: ["1 project", "Community support", "Basic analytics", "Landing pages"],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "₹2,500",
    period: "/month",
    features: [
      "Unlimited projects",
      "Priority support",
      "Advanced analytics",
      "AI automation",
      "Secure deployment",
    ],
    popular: true,
  },
];

/** Colour styles for each payment status badge. */
const statusStyles: Record<string, string> = {
  paid: "bg-[rgba(34,197,94,0.1)] text-[#22c55e]",
  pending: "bg-[rgba(234,179,8,0.1)] text-[#eab308]",
  failed: "bg-[rgba(239,68,68,0.1)] text-[#ef4444]",
};

/**
 * Card-form inputs intentionally use `bg-background` (a slightly darker
 * shade than the surrounding card) so they read as recessed fields.
 * We reuse the shared input style and only override the background.
 */
const paymentInputClassName = cn(inputClassName, "bg-background");

export default function BillingPage() {
  const revealRef = useScrollReveal();
  const entranceRef = useEntrance();
  const {
    selectedPlan,
    paymentMethod,
    setPaymentMethod,
    history,
    addHistory,
    updateHistory,
    deleteHistory,
  } = useBillingStore();
  const role = useAuthStore((s) => s.role);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<BillingHistoryStatus>("paid");

  // The currently selected plan object (defaults to the first plan).
  const selected = PLANS.find((p) => p.id === selectedPlan) || PLANS[0];

  const openModal = () => {
    setEditingId(null);
    setDate("");
    setPlan("");
    setAmount("");
    setStatus("paid");
    setShowModal(true);
  };

  const openEditModal = (row: BillingHistory) => {
    setEditingId(row.id);
    setDate(row.date);
    setPlan(row.plan);
    setAmount(String(row.amount));
    setStatus(row.status);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: BillingHistory = {
      id: editingId ?? `${Date.now()}`,
      date,
      plan,
      amount: Number(amount) || 0,
      status,
    };
    if (editingId) {
      updateHistory(editingId, entry);
    } else {
      addHistory(entry);
    }
    setShowModal(false);
  };

  return (
    <div ref={revealRef}>
      {/* Header */}
      <section
        ref={entranceRef}
        className="mx-auto w-full max-w-[1280px] px-6 py-16 text-center"
      >
        <h1
          data-entrance
          className="text-[34px] font-bold tracking-[-0.02em] text-foreground sm:text-[38px]"
        >
          Billing &amp; Plans
        </h1>
        <p
          data-entrance
          data-reveal-delay="0.1"
          className="mx-auto mt-3 max-w-[500px] text-base leading-[1.5] text-muted-foreground"
        >
          Select the plan that fits your workflow. Upgrade, downgrade, or cancel
          anytime.
        </p>
      </section>

      {/* Main billing layout: image left + payment right */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left: large decorative image */}
          <div
            data-reveal
            className="relative min-h-[300px] overflow-hidden rounded-xl border border-border lg:min-h-full"
          >
            <Image
              src="/assets/Billing-asserts/billing-image.png"
              alt="Billing"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right: plan + payment selection */}
          <div data-reveal data-reveal-delay="0.15" className="flex flex-col gap-6">
            {/* Payment method toggle: UPI vs Credit Card */}
            <div className="flex gap-3">
              {(
                [
                  { method: "upi" as const, label: "UPI", icon: QrCode },
                  { method: "card" as const, label: "Credit Card", icon: CreditCard },
                ] as const
              ).map(({ method, label, icon: Icon }) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-md border py-3 text-[12px] font-semibold uppercase tracking-[0.08em] transition-all",
                    paymentMethod === method
                      ? "cta-gradient border-transparent text-[#0f0f11]"
                      : "border-border-strong text-foreground hover:bg-surface"
                  )}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>

            {/* Payment area depends on the chosen method */}
            {paymentMethod === "upi" ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-lg font-semibold text-foreground">
                  Scan to pay via UPI
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Paying for {selected.name} — {selected.price}
                </p>
                {/* Placeholder QR code image */}
                <div className="relative mx-auto mt-6 h-48 w-48 overflow-hidden rounded-lg border border-border-strong">
                  <Image
                    src="/assets/Billing-asserts/billing-image.png"
                    alt="UPI QR code"
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                </div>
                <button className="mt-6 w-full rounded-lg cta-gradient py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110">
                  I&apos;ve Completed the Payment
                </button>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-faint">
                  <Lock size={12} /> Payments secured by Stripe
                </p>
              </div>
            ) : (
              /* Card payment form */
              <div className="rounded-xl border border-border bg-card p-8">
                <p className="text-lg font-semibold text-foreground">
                  Payment Details
                </p>
                <p className="mt-1 mb-6 text-sm text-muted-foreground">
                  Paying for {selected.name} — {selected.price}
                </p>

                {/* Card number */}
                <div className="relative">
                  <CreditCard
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-faint"
                  />
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className={paymentInputClassName}
                  />
                </div>

                {/* Expiry + CVC */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className={paymentInputClassName}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className={paymentInputClassName}
                  />
                </div>

                {/* Cardholder + billing address */}
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className={cn(paymentInputClassName, "mt-4")}
                />
                <input
                  type="text"
                  placeholder="Billing Address"
                  className={cn(paymentInputClassName, "mt-4")}
                />

                <button className="mt-6 w-full rounded-lg cta-gradient py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110">
                  Complete Payment
                </button>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-faint">
                  <Lock size={12} /> Payments secured by Stripe
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {role === "owner" && (
        <>
          {/* Billing history table */}
          <section className="mx-auto w-full max-w-[1280px] px-6 pb-20">
        <div data-reveal className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Billing History</h2>
          <button
            onClick={openModal}
            className="flex items-center gap-2 rounded-lg cta-gradient px-4 py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110"
          >
            <Plus size={14} /> New
          </button>
        </div>
        <div
          data-reveal
          data-reveal-delay="0.1"
          className="overflow-x-auto rounded-xl border border-border bg-card"
        >
          {history.length === 0 ? (
            <p className="px-6 py-10 text-sm text-muted-foreground">
              No billing history yet. Click &quot;New&quot; to add an entry.
            </p>
          ) : (
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-border text-[11px] uppercase tracking-[0.08em] text-faint">
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Plan</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border text-sm text-muted-foreground last:border-0"
                  >
                    <td className="px-6 py-4">{row.date}</td>
                    <td className="px-6 py-4">{row.plan}</td>
                    <td className="px-6 py-4">
                      ₹{row.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-[11px] font-medium capitalize",
                          statusStyles[row.status]
                        )}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(row)}
                          className="text-faint transition-colors hover:text-foreground"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => deleteHistory(row.id)}
                          className="text-faint transition-colors hover:text-red-500"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* New billing-history modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">
                {editingId ? "Edit Billing Entry" : "Add Billing Entry"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-faint transition-colors hover:text-foreground"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-foreground">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className={inputClassName}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-foreground">
                  Plan (Description)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Professional"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  required
                  className={inputClassName}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-foreground">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 2500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className={inputClassName}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold uppercase tracking-wider text-foreground">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as BillingHistoryStatus)
                  }
                  className={cn(inputClassName, "bg-background")}
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg cta-gradient py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110"
              >
                {editingId ? "Save Changes" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}

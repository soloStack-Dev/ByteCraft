"use client";

import Image from "next/image";
import { Check, Lock, CreditCard, QrCode, ShieldCheck } from "lucide-react";
import { useScrollReveal, useEntrance } from "@/lib/animations";
import { useBillingStore } from "@/lib/stores/billing-store";
import { cn } from "@/lib/utils";

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

const HISTORY = [
  { date: "OCT 12, 2024", plan: "Professional", amount: "₹2,500", status: "paid" },
  { date: "SEP 12, 2024", plan: "Professional", amount: "₹2,500", status: "paid" },
  { date: "AUG 12, 2024", plan: "Starter", amount: "₹1,000", status: "pending" },
  { date: "JUL 12, 2024", plan: "Starter", amount: "₹1,000", status: "failed" },
];

const statusStyles: Record<string, string> = {
  paid: "bg-[rgba(34,197,94,0.1)] text-[#22c55e]",
  pending: "bg-[rgba(234,179,8,0.1)] text-[#eab308]",
  failed: "bg-[rgba(239,68,68,0.1)] text-[#ef4444]",
};

export default function BillingPage() {
  const revealRef = useScrollReveal();
  const entranceRef = useEntrance();
  const { selectedPlan, setSelectedPlan, paymentMethod, setPaymentMethod } =
    useBillingStore();

  const selected =
    PLANS.find((p) => p.id === selectedPlan) || PLANS[0];

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
          {/* Left: large image */}
          <div data-reveal className="relative min-h-[300px] overflow-hidden rounded-xl border border-border lg:min-h-full">
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
            {/* Payment method toggle */}
            <div className="flex gap-3">
              <button
                onClick={() => setPaymentMethod("upi")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-md border py-3 text-[12px] font-semibold uppercase tracking-[0.08em] transition-all",
                  paymentMethod === "upi"
                    ? "cta-gradient border-transparent text-[#0f0f11]"
                    : "border-border-strong text-foreground hover:bg-surface"
                )}
              >
                <QrCode size={16} />
                UPI
              </button>
              <button
                onClick={() => setPaymentMethod("card")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-md border py-3 text-[12px] font-semibold uppercase tracking-[0.08em] transition-all",
                  paymentMethod === "card"
                    ? "cta-gradient border-transparent text-[#0f0f11]"
                    : "border-border-strong text-foreground hover:bg-surface"
                )}
              >
                <CreditCard size={16} />
                Credit Card
              </button>
            </div>

            {/* Plan selection */}
            <div className="grid gap-6 sm:grid-cols-2">
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={cn(
                    "relative rounded-xl border bg-card p-8 text-left transition-all duration-300 hover:-translate-y-1",
                    selectedPlan === plan.id
                      ? "border-[rgba(244,166,193,0.3)]"
                      : "border-border"
                  )}
                  style={{
                    boxShadow:
                      selectedPlan === plan.id
                        ? "0 0 40px rgba(244,166,193,0.08)"
                        : "0 4px 20px rgba(0,0,0,0.2)",
                  }}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full cta-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#0f0f11]">
                      Most Popular
                    </span>
                  )}
                  <p className="text-[22px] font-bold text-foreground">{plan.name}</p>
                  <p className="mt-2 text-[30px] font-bold tracking-[-0.02em] text-foreground">
                    {plan.price}
                    <span className="ml-1 text-[12px] font-normal text-faint">
                      {plan.period}
                    </span>
                  </p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check size={14} className="mt-0.5 shrink-0 text-[#f4a6c1]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>

            {/* Payment area based on selection */}
            {paymentMethod === "upi" ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-lg font-semibold text-foreground">
                  Scan to pay via UPI
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Paying for {selected.name} — {selected.price}
                </p>
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
              <div className="rounded-xl border border-border bg-card p-8">
                <p className="text-lg font-semibold text-foreground">Payment Details</p>
                <p className="mt-1 mb-6 text-sm text-muted-foreground">
                  Paying for {selected.name} — {selected.price}
                </p>

                <div className="relative">
                  <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full rounded-lg border border-border-strong bg-background py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-faint outline-none transition-all focus:border-[rgba(244,166,193,0.5)] focus:shadow-[0_0_0_3px_rgba(244,166,193,0.1)]"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full rounded-lg border border-border-strong bg-background px-4 py-3 text-sm text-foreground placeholder:text-faint outline-none transition-all focus:border-[rgba(244,166,193,0.5)] focus:shadow-[0_0_0_3px_rgba(244,166,193,0.1)]"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full rounded-lg border border-border-strong bg-background px-4 py-3 text-sm text-foreground placeholder:text-faint outline-none transition-all focus:border-[rgba(244,166,193,0.5)] focus:shadow-[0_0_0_3px_rgba(244,166,193,0.1)]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="mt-4 w-full rounded-lg border border-border-strong bg-background px-4 py-3 text-sm text-foreground placeholder:text-faint outline-none transition-all focus:border-[rgba(244,166,193,0.5)] focus:shadow-[0_0_0_3px_rgba(244,166,193,0.1)]"
                />
                <input
                  type="text"
                  placeholder="Billing Address"
                  className="mt-4 w-full rounded-lg border border-border-strong bg-background px-4 py-3 text-sm text-foreground placeholder:text-faint outline-none transition-all focus:border-[rgba(244,166,193,0.5)] focus:shadow-[0_0_0_3px_rgba(244,166,193,0.1)]"
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

      {/* Billing history */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20">
        <h2 data-reveal className="mb-6 text-xl font-bold text-foreground">
          Billing History
        </h2>
        <div data-reveal data-reveal-delay="0.1" className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-border text-[11px] uppercase tracking-[0.08em] text-faint">
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Plan</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((row) => (
                <tr
                  key={row.date + row.amount}
                  className="border-b border-border text-sm text-muted-foreground last:border-0"
                >
                  <td className="px-6 py-4">{row.date}</td>
                  <td className="px-6 py-4">{row.plan}</td>
                  <td className="px-6 py-4">{row.amount}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

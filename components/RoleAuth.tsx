/**
 * RoleAuth.tsx
 * ------------------------------------------------------------------
 * Role-based auth gate for the Login and Signup pages.
 *
 * Two roles: `customer` and `owner`.
 *   - Customer → renders the passed-in `children` (normal username/email
 *     + password form). Billing History is hidden for this role.
 *   - Owner → phone number + OTP verification flow. The phone must equal
 *     OWNER_PHONE (9790933818) to continue; any 6-digit OTP completes
 *     verification. Any other phone shows an access-denied message.
 *
 * On a successful owner verification the role is stored in the client
 * auth store so the Billing page can show the Billing History section.
 * ------------------------------------------------------------------
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Smartphone,
  MessageSquare,
} from "lucide-react";
import { OWNER_PHONE, useAuthStore } from "@/lib/stores/auth-store";
import { cn } from "@/lib/utils";
import { inputClassName, formErrorClassName, gradientButtonClassName } from "@/lib/styles";

type Role = "customer" | "owner";

const roleTabs: { role: Role; label: string }[] = [
  { role: "customer", label: "Customer" },
  { role: "owner", label: "Owner" },
];

/**
 * Inner pill-styled input that reuses the site's input look but without
 * the `pl-11` icon offset (OwnerAuth inputs use a different icon layout).
 */
const phoneInputClassName = cn(
  inputClassName,
  "pl-11"
);

export default function RoleAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { role, setRole, setOwnerVerified } = useAuthStore();

  // Which role tab is active. Defaults to customer when no role yet.
  const [activeRole, setActiveRole] = useState<Role>(role ?? "customer");

  // Owner flow state.
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /** Choosing a role tab: customer shows the normal form, owner shows phone/OTP. */
  const selectRole = (r: Role) => {
    setActiveRole(r);
    setError(null);
    setPhone("");
    setOtp("");
    setOtpSent(false);
  };

  /** Step 1: submit the phone number. */
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Only the owner phone number is allowed to proceed.
    if (phone !== OWNER_PHONE) {
      setError(
        "Access denied: this authentication is only allowed for owners, not customers."
      );
      setPhone("");
      return;
    }

    setOtpSent(true);
    setError(null);
  };

  /** Step 2: submit the OTP (any 6-digit code completes verification). */
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    // Simulate OTP verification latency.
    setTimeout(() => {
      setRole("owner");
      setOwnerVerified(true);
      setLoading(false);
      router.push("/");
      router.refresh();
    }, 700);
  };

  return (
    <div className="w-full">
      {/* Role selector */}
      <div className="mb-8 flex gap-3">
        {roleTabs.map(({ role: r, label }) => (
          <button
            key={r}
            type="button"
            onClick={() => selectRole(r)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md border py-3 text-[12px] font-semibold uppercase tracking-[0.08em] transition-all",
              activeRole === r
                ? "cta-gradient border-transparent text-[#0f0f11]"
                : "border-border-strong text-foreground hover:bg-surface"
            )}
          >
            {r === "owner" ? <ShieldCheck size={16} /> : <Smartphone size={16} />}
            {label}
          </button>
        ))}
      </div>

      {activeRole === "customer" ? (
        <>
          {children}
          <p className="mt-4 rounded-md border border-border bg-surface px-4 py-3 text-[12px] leading-[1.5] text-faint">
            You&apos;re signing in as a <b className="text-foreground">customer</b>.
            Billing History is only visible to owners.
          </p>
        </>
      ) : (
        <OwnerFlow
          phone={phone}
          setPhone={setPhone}
          otp={otp}
          setOtp={setOtp}
          otpSent={otpSent}
          error={error}
          loading={loading}
          onPhoneSubmit={handlePhoneSubmit}
          onOtpSubmit={handleOtpSubmit}
        />
      )}
    </div>
  );
}

/** Owner phone + OTP verification flow. */
function OwnerFlow({
  phone,
  setPhone,
  otp,
  setOtp,
  otpSent,
  error,
  loading,
  onPhoneSubmit,
  onOtpSubmit,
}: {
  phone: string;
  setPhone: (v: string) => void;
  otp: string;
  setOtp: (v: string) => void;
  otpSent: boolean;
  error: string | null;
  loading: boolean;
  onPhoneSubmit: (e: React.FormEvent) => void;
  onOtpSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="w-full">
      {!otpSent ? (
        /* Step 1: phone number */
        <form onSubmit={onPhoneSubmit} className="mt-10 flex flex-col gap-4">
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter owner phone number"
              required
              className={phoneInputClassName}
            />
          </div>

          {error && <p className={formErrorClassName}>{error}</p>}

          <button type="submit" className={cn(gradientButtonClassName, "mt-2 flex items-center justify-center gap-2")}>
            Send OTP
            <ArrowRight size={16} />
          </button>

          <p className="text-center text-[12px] text-faint">
            Owner access requires phone verification.
          </p>
        </form>
      ) : (
        /* Step 2: OTP */
        <form onSubmit={onOtpSubmit} className="mt-10 flex flex-col gap-4">
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MessageSquare size={15} className="text-[#f4a6c1]" />
            We sent a 6-digit OTP to <b className="text-foreground">{phone}</b>
          </p>

          <div className="relative">
            <ShieldCheck
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit OTP"
              required
              className={phoneInputClassName}
            />
          </div>

          {error && <p className={formErrorClassName}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={cn(gradientButtonClassName, "mt-2 flex items-center justify-center gap-2 disabled:opacity-70")}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify &amp; Continue
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setOtp("")}
            className="mt-1 text-center text-[12px] text-faint hover:text-foreground"
          >
            Resend OTP
          </button>
        </form>
      )}
    </div>
  );
}

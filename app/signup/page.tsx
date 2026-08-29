/**
 * Signup page
 * ------------------------------------------------------------------
 * Account-creation form for new users.
 *
 * Flow:
 *   1. Call the oRPC `signup` procedure (validates + creates the user,
 *      returning [error, data]).
 *   2. Map specific error codes to friendly messages.
 *   3. On success, start a NextAuth session and go home.
 * ------------------------------------------------------------------
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, User, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useSignup } from "@/lib/orpc/client";
import { useEntrance } from "@/lib/animations";
import { useAuthStore } from "@/lib/stores/auth-store";
import RoleAuth from "@/components/RoleAuth";
import { inputClassName, formErrorClassName } from "@/lib/styles";

export default function SignupPage() {
  const entranceRef = useEntrance();
  const router = useRouter();
  const signup = useSignup();
  const { setRole } = useAuthStore();

  // Form field state.
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  /** Handle form submission. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1) Try to create the account via oRPC.
    const result = await signup.execute({
      username,
      email,
      password,
      confirmPassword,
    });
    if (result[0]) {
      setError(result[0].message || "An unexpected error occurred.");
      return;
    }

    // 2) Translate machine-friendly error codes into human messages.
    const data = result[1];
    if (data && "error" in data) {
      if (data.error === "USERNAME_TAKEN")
        setError("That username is already taken.");
      else if (data.error === "EMAIL_TAKEN")
        setError("That email is already registered.");
      else setError("Something went wrong. Please try again.");
      return;
    }

    // 3) Registration succeeded – sign in and go home.
    await signIn("credentials", { username, password, redirect: false });
    setRole("customer");
    router.push("/");
    router.refresh();
  };

  return (
    <div
      ref={entranceRef}
      className="mx-auto flex w-full max-w-[440px] flex-col items-center px-6 py-24"
    >
      <div data-entrance className="w-full">
        <h1 className="text-center text-[28px] font-bold tracking-[-0.02em] text-foreground sm:text-[34px]">
          Create your account
        </h1>
        <p className="mt-3 text-center text-sm leading-[1.6] text-muted-foreground">
          Start automating the mundane with ByteCraft.
        </p>

        <RoleAuth>
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
            {/* Username */}
            <div className="relative">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-faint"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className={inputClassName}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-faint"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className={inputClassName}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-faint"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 6 characters)"
                required
                className={inputClassName}
              />
            </div>

            {/* Confirm password */}
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-faint"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                className={inputClassName}
              />
            </div>

            {/* Error banner (if any) */}
            {error && <p className={formErrorClassName}>{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={signup.isPending}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg cta-gradient py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110 disabled:opacity-70"
            >
              {signup.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Link to the login page */}
          <p className="mt-8 text-center text-sm text-faint">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#f4a6c1] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </RoleAuth>
      </div>
    </div>
  );
}

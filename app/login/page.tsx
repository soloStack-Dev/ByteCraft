/**
 * Login page
 * ------------------------------------------------------------------
 * Sign-in form for existing users.
 *
 * Flow:
 *   1. Call the oRPC `login` procedure to validate credentials against
 *      the DB (returns [error, data]).
 *   2. If that passes, sign the user in via NextAuth "credentials".
 *   3. Refresh the session + redirect to the home page.
 * ------------------------------------------------------------------
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useLogin } from "@/lib/orpc/client";
import { useEntrance } from "@/lib/animations";
import { useAuthStore } from "@/lib/stores/auth-store";
import RoleAuth from "@/components/RoleAuth";
import { inputClassName, formErrorClassName } from "@/lib/styles";

export default function LoginPage() {
  const entranceRef = useEntrance();
  const router = useRouter();
  const { status, update } = useSession();
  const login = useLogin();
  const { setRole } = useAuthStore();

  // Form field state.
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  /** Handle form submission. */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1) Validate credentials through the oRPC login procedure.
    const result = await login.execute({ usernameOrEmail, password });
    if (result[0]) {
      setError(result[0].message || "An unexpected error occurred.");
      return;
    }
    const data = result[1];
    if (data && "error" in data) {
      setError("Invalid username or password.");
      return;
    }

    // 2) Actually start the NextAuth session.
    const res = await signIn("credentials", {
      username: usernameOrEmail,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error);
      return;
    }

    // 3) Mark the signed-in role as a customer.
    setRole("customer");

    // 4) Refresh the client session, then go home.
    await update();
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
          Welcome back
        </h1>
        <p className="mt-3 text-center text-sm leading-[1.6] text-muted-foreground">
          Sign in to continue building your freelance workflow.
        </p>

        <RoleAuth>
          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
            {/* Username or email */}
            <div className="relative">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-faint"
              />
              <input
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Username or email"
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
                placeholder="Password"
                required
                className={inputClassName}
              />
            </div>

            {/* Error banner (if any) */}
            {error && <p className={formErrorClassName}>{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={login.isPending || status === "loading"}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg cta-gradient py-3.5 text-[12px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110 disabled:opacity-70"
            >
              {login.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Link to the signup page */}
          <p className="mt-8 text-center text-sm text-faint">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#f4a6c1] hover:underline"
            >
              Create one
            </Link>
          </p>
        </RoleAuth>
      </div>
    </div>
  );
}

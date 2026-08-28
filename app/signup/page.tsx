"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, User, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useSignup } from "@/lib/orpc/client";
import { useEntrance } from "@/lib/animations";

export default function SignupPage() {
  const entranceRef = useEntrance();
  const router = useRouter();
  const signup = useSignup();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await signup.execute({ username, email, password, confirmPassword });
    if (result[0]) {
      setError(result[0].message || "An unexpected error occurred.");
      return;
    }

    const data = result[1];
    if (data && "error" in data) {
      if (data.error === "USERNAME_TAKEN") setError("That username is already taken.");
      else if (data.error === "EMAIL_TAKEN") setError("That email is already registered.");
      else setError("Something went wrong. Please try again.");
      return;
    }

    await signIn("credentials", { username, password, redirect: false });
    router.push("/");
    router.refresh();
  };

  return (
    <div ref={entranceRef} className="mx-auto flex w-full max-w-[440px] flex-col items-center px-6 py-24">
      <div data-entrance className="w-full">
        <h1 className="text-center text-[28px] font-bold tracking-[-0.02em] text-foreground sm:text-[34px]">
          Create your account
        </h1>
        <p className="mt-3 text-center text-sm leading-[1.6] text-muted-foreground">
          Start automating the mundane with ByteCraft.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full rounded-lg border border-border-strong bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-faint outline-none transition-all focus:border-[rgba(244,166,193,0.5)] focus:shadow-[0_0_0_3px_rgba(244,166,193,0.1)]"
            />
          </div>

          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full rounded-lg border border-border-strong bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-faint outline-none transition-all focus:border-[rgba(244,166,193,0.5)] focus:shadow-[0_0_0_3px_rgba(244,166,193,0.1)]"
            />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 6 characters)"
              required
              className="w-full rounded-lg border border-border-strong bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-faint outline-none transition-all focus:border-[rgba(244,166,193,0.5)] focus:shadow-[0_0_0_3px_rgba(244,166,193,0.1)]"
            />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="w-full rounded-lg border border-border-strong bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-faint outline-none transition-all focus:border-[rgba(244,166,193,0.5)] focus:shadow-[0_0_0_3px_rgba(244,166,193,0.1)]"
            />
          </div>

          {error && (
            <p className="rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

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

        <p className="mt-8 text-center text-sm text-faint">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#f4a6c1] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

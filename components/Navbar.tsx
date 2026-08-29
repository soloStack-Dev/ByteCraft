/**
 * Navbar.tsx
 * ------------------------------------------------------------------
 * Fixed top navigation shared by every page.
 *
 * Contains: logo, desktop links, auth actions (or session info),
 * a theme toggle, and a responsive mobile menu.
 *
 * Small sub-components (ThemeToggle, BorderedAuthButton) exist so the
 * same button is not duplicated between desktop/mobile markup.
 * ------------------------------------------------------------------
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { gsap } from "@/lib/animations";
import { useTheme } from "@/components/theme-provider";
import { useAuthStore } from "@/lib/stores/auth-store";

/** All top-level routes shown in the navigation. */
const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "BILLING", href: "/billing" },
  { label: "BLOG", href: "/blog" },
];

/** Sun/Moon button that flips the active theme. */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex h-8 w-8 items-center justify-center rounded-md border border-border-strong text-foreground transition-colors hover:bg-surface"
    >
      {/* Show the "other" icon so the action direction is obvious. */}
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

/**
 * Bordered, uppercase auth button (Login / Sign out).
 * `mobile` just makes it stretch full-width for the mobile menu.
 */
function BorderedAuthButton({
  onClick,
  children,
  mobile = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  mobile?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-md border border-border-strong text-foreground transition-colors " +
        "text-[12px] font-medium uppercase tracking-[0.08em] hover:bg-surface " +
        (mobile ? "flex-1 px-4 py-2" : "px-4 py-1.5")
      }
    >
      {children}
    </button>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Track the previous path so we can react to route changes below.
  const [previousPath, setPreviousPath] = useState(pathname);

  /** Sign out of NextAuth and clear the local role store. */
  const handleSignOut = () => {
    clearAuth();
    signOut();
  };

  // Close the mobile menu whenever the route changes.
  // (Adjusting state during render is React's recommended replacement
  // for a setState-in-effect here.)
  if (previousPath !== pathname) {
    setPreviousPath(pathname);
    setMobileOpen(false);
  }

  // Gentle slide-in of the whole bar on first paint.
  useEffect(() => {
    gsap.fromTo(
      "#bytecraft-nav",
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  /** True when `href` matches the current route (root needs an exact match). */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Whether the user is signed in.
  const authenticated = status === "authenticated";

  return (
    <header
      id="bytecraft-nav"
      className="fixed top-0 left-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-[12px]"
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="gradient-text">ByteCraft</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-[12px] font-medium uppercase tracking-[0.08em] transition-colors duration-150 ${
                isActive(link.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {/* Active-link gradient underline */}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-full cta-gradient" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {authenticated ? (
            <>
              <span className="text-sm text-muted-foreground">
                {session?.user?.name}
              </span>
              <BorderedAuthButton onClick={handleSignOut}>
                Sign out
              </BorderedAuthButton>
            </>
          ) : (
            <>
              <BorderedAuthButton onClick={() => signIn()}>Login</BorderedAuthButton>
              <Link
                href="/signup"
                className="rounded-md cta-gradient px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0f0f11] transition-all hover:brightness-110"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu (rendered only when open) */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 px-6 py-6 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-5">
            {/* Row holding the menu label + theme toggle */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Menu
              </span>
              <ThemeToggle />
            </div>

            {/* Vertical nav links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between text-[13px] font-medium uppercase tracking-[0.08em] ${
                  isActive(link.href) ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
                <ChevronRight size={16} className="text-faint" />
              </Link>
            ))}

            {/* Auth actions */}
            <div className="mt-2 flex gap-3 border-t border-border pt-5">
              {authenticated ? (
                <BorderedAuthButton mobile onClick={handleSignOut}>
                  Sign out
                </BorderedAuthButton>
              ) : (
                <>
                  <BorderedAuthButton mobile onClick={() => signIn()}>
                    Login
                  </BorderedAuthButton>
                  <Link
                    href="/signup"
                    className="flex-1 rounded-md cta-gradient px-4 py-2 text-center text-[12px] font-semibold uppercase tracking-[0.08em] text-[#0f0f11]"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

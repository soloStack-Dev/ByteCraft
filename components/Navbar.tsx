"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { gsap } from "@/lib/animations";
import { useTheme } from "@/components/theme-provider";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "BILLING", href: "/billing" },
  { label: "BLOG", href: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      "#bytecraft-nav",
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const { theme, toggleTheme } = useTheme();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-full cta-gradient" />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border-strong text-foreground transition-colors hover:bg-surface"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          {status === "authenticated" ? (
            <>
              <span className="text-sm text-muted-foreground">
                {session?.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="rounded-md border border-border-strong px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-surface"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="rounded-md border border-border-strong px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors hover:bg-surface"
              >
                Login
              </button>
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 px-6 py-6 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Menu
              </span>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border-strong text-foreground transition-colors hover:bg-surface"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
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
            <div className="mt-2 flex gap-3 border-t border-border pt-5">
              {status === "authenticated" ? (
                <button
                  onClick={() => signOut()}
                  className="flex-1 rounded-md border border-border-strong px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-foreground"
                >
                  Sign out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => signIn()}
                    className="flex-1 rounded-md border border-border-strong px-4 py-2 text-[12px] font-medium uppercase tracking-[0.08em] text-foreground"
                  >
                    Login
                  </button>
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

import Link from "next/link";
import { Code2, Mail } from "lucide-react";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-12">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-10 px-6 md:flex-row md:items-center">
        {/* Left: Logo + tagline */}
        <div>
          <p className="text-xl font-bold tracking-tight">
            <span className="gradient-text">ByteCraft</span>
          </p>
          <p className="mt-3 max-w-[280px] text-sm leading-relaxed text-faint">
            Building the underlying architecture for the modern freelance
            technical workflow.
          </p>
        </div>

        {/* Center: Legal */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Legal &amp; Info
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-faint transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Copyright + social */}
        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="text-sm text-faint">
            © 2024 ByteCraft. Engineered for precision.
          </p>
          <div className="flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-surface text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Source code"
            >
              <Code2 size={16} />
            </a>
            <a
              href="mailto:hello@bytecraft.dev"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-surface text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

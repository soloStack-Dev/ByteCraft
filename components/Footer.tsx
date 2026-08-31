/**
 * Footer.tsx
 * ------------------------------------------------------------------
 * Site-wide footer shown on every page.
 *
 * Three columns: logo/tagline, legal links, and copyright + social
 * buttons. Stacks into a single column on mobile.
 * ------------------------------------------------------------------
 */
import Link from "next/link";
import { Mail } from "lucide-react";

/** SimpleInstagram – brand glyph (lucide dropped brand icons). */
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/** XIcon – brand glyph. */
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** LinkedInIcon – brand glyph. */
function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/** Legal / info links rendered in the centre column. */
const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

/**
 * Reusable square icon button (GitHub / email).
 * `label` is used for accessibility and `children` for the icon.
 */
function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-surface text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}

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

        {/* Centre: Legal */}
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
            2026 ByteCraft. Engineered for precision.
          </p>
          <div className="flex gap-3">
            <SocialButton href="mailto:hello@bytecraft.dev" label="Email">
              <Mail size={16} />
            </SocialButton>
            <SocialButton href="https://www.instagram.com/bytefoundry__?igsi=Y2w5YXQzOW44aDIz" label="Instagram">
              <InstagramIcon size={16} />
            </SocialButton>
            <SocialButton href="https://x.com/bytefoundry__" label="X">
              <XIcon size={16} />
            </SocialButton>
            <SocialButton href="https://www.linkedin.com/in/faleel-h-b772a1416?utm_source=share_via&utm_content=profile&utm_medium=member_android" label="LinkedIn">
              <LinkedInIcon size={16} />
            </SocialButton>
          </div>
        </div>
      </div>
    </footer>
  );
}

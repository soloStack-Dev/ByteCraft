/**
 * layout.tsx
 * ------------------------------------------------------------------
 * Root layout applied to every route.
 *
 * Responsibilities:
 *  - Load the Geist fonts.
 *  - Apply the theme class to <html> BEFORE first paint (inline script)
 *    to avoid a flash of the wrong theme.
 *  - Wrap the app in the theme + session/query providers, then render
 *    the shared Navbar, page content, and Footer.
 * ------------------------------------------------------------------
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastViewport } from "@/components/ToastViewport";

// Load Geist (sans + mono) and expose them as CSS variables.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://byte-craft-service.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ByteCraft — AI SaaS for Technical Freelancers",
    template: "%s | ByteCraft",
  },
  description:
    "ByteCraft is the AI SaaS workspace for technical freelancers — automate, deploy securely, and scale your freelance operation with precision.",
  keywords: [
    "AI SaaS",
    "SaaS for technical freelancers",
    "freelance software tools",
    "AI automation",
    "secure deployment",
    "freelance SaaS platform",
    "ByteCraft",
  ],
  authors: [{ name: "ByteCraft" }],
  creator: "ByteCraft",
  publisher: "ByteCraft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ByteCraft",
    title: "ByteCraft — AI SaaS for Technical Freelancers",
    description:
      "One workspace for your entire freelance operation. ByteCraft automates the mundane, secures your deployments, and scales your engineering practice with precision.",
    images: [
      {
        url: "/assets/About-asserts/main-section-backgroud-image.png",
        alt: "ByteCraft AI SaaS platform for technical freelancers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ByteCraft — AI SaaS for Technical Freelancers",
    description:
      "AI SaaS tools built for technical freelancers. Automate the mundane, secure every deployment, and scale with precision.",
    images: ["/assets/About-asserts/main-section-backgroud-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      // `dark` is the default class; ThemeProvider switches to `light`.
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      {/* ThemeProvider applies the saved/OS theme via an effect on mount. */}
      <head />
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* ThemeProvider controls the .dark/.light class; Providers adds contexts. */}
        <ThemeProvider>
          <Providers>
            <Navbar />
            {/* pt-16 clears the fixed 64px-high navbar. */}
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <ToastViewport />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

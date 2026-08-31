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

export const metadata: Metadata = {
  title: {
    default: "ByteCraft — AI SaaS for Technical Freelancers",
    template: "%s | ByteCraft",
  },
  description:
    "ByteCraft provides AI-driven SaaS tools designed exclusively for technical freelancers. Automate the mundane, secure your deployments, and scale your operations with precision.",
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

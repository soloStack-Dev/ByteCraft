import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://byte-craft-service.vercel.app";

export const metadata: Metadata = {
  title: "Contact ByteCraft — Get In Touch",
  description:
    "Share your project with ByteCraft and get a fixed price from our AI and full-stack developers for your SaaS, web, or mobile build.",
  keywords: [
    "contact ByteCraft",
    "hire freelance developers",
    "SaaS development contact",
    "about ByteCraft services",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    siteName: "ByteCraft",
    title: "Contact ByteCraft — Get In Touch",
    description:
      "Share your project with ByteCraft and get a fixed price from our AI and full-stack developers for your SaaS, web, or mobile build.",
    images: [
      {
        url: "/assets/Blog-asserts/blog-main-image.png",
        alt: "Get in touch with ByteCraft",
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
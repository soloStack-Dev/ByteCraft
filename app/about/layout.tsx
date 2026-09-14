import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://byte-craft-service.vercel.app";

export const metadata: Metadata = {
  title: "About ByteCraft — AI SaaS for Freelancers",
  description:
    "The story behind ByteCraft, an AI SaaS platform built to help technical freelancers launch, automate, and scale their own software businesses.",
  keywords: [
    "about ByteCraft",
    "AI SaaS for freelancers",
    "freelance software story",
    "technical freelancers",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    siteName: "ByteCraft",
    title: "About ByteCraft — AI SaaS for Freelancers",
    description:
      "The story behind ByteCraft, an AI SaaS platform built to help technical freelancers launch and scale their own software businesses.",
    images: [
      {
        url: "/assets/About-asserts/about-section-image.png",
        alt: "ByteCraft founder story",
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://byte-craft-service.vercel.app";

export const metadata: Metadata = {
  title: "Services & Pricing — AI SaaS for Freelancers",
  description:
    "Explore ByteCraft service tiers and pricing for technical freelancers: portfolio builds, AI automation, secure deployment, SaaS foundations, and agentic AI pipelines.",
  keywords: [
    "AI SaaS pricing",
    "freelancer services",
    "SaaS development",
    "web application pricing",
    "AI automation services",
    "technical freelancers",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services`,
    siteName: "ByteCraft",
    title: "Services & Pricing — AI SaaS for Freelancers",
    description:
      "AI SaaS solutions and transparent pricing for technical freelancers, from portfolios and web applications to agentic AI and mobile ecosystems.",
    images: [
      {
        url: "/assets/Service-asserts/main-section-backgroud-image.png",
        alt: "ByteCraft services and pricing tiers",
      },
    ],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
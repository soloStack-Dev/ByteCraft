import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://byte-craft-service.vercel.app";

export const metadata: Metadata = {
  title: "Contact ByteCraft — Get In Touch",
  description:
    "Get in touch with ByteCraft about your project. Share your requirements and our team of AI and full-stack developers will reply with a plan for your SaaS or web application.",
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
      "Share your project details with ByteCraft and get a reply from our AI and full-stack development team.",
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
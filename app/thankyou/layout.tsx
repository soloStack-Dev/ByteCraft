import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://byte-craft-service.vercel.app";

export const metadata: Metadata = {
  title: "Thank You — Message Received",
  description:
    "Thank you for reaching out to ByteCraft. Your message is in, and our AI and full-stack developers will reply within two working days with a fixed scope and price.",
  keywords: [
    "thank you ByteCraft",
    "ByteCraft message received",
    "AI SaaS development reply",
    "freelance developer response",
    "ByteCraft next steps",
  ],
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
  alternates: {
    canonical: "/thankyou",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/thankyou`,
    siteName: "ByteCraft",
    title: "Thank You — Message Received",
    description:
      "Thank you for reaching out to ByteCraft. Your message is in, and the development team will reply within two working days.",
    images: [
      {
        url: "/assets/Blog-asserts/blog-main-image.png",
        alt: "Thank you for contacting ByteCraft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thank You — Message Received",
    description:
      "Thank you for reaching out to ByteCraft. The development team will reply within two working days.",
    images: ["/assets/Blog-asserts/blog-main-image.png"],
  },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
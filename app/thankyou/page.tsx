/**
 * Thank You page
 * ------------------------------------------------------------------
 * Silent landing page reached from advertisement campaigns and post-
 * submission redirects. It is NOT part of the site navigation.
 *
 * SEO considerations:
 *  - Static server component, so the full semantic HTML ships in every
 *    response for crawlers.
 *  - Dedicated metadata (title/description/OG/Twitter) via layout.tsx,
 *    a canonical URL, and JSON-LD structured data below.
 * ------------------------------------------------------------------
 */
import Link from "next/link";
import { CheckCircle2, ArrowRight, Mail, FileText, Rocket } from "lucide-react";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://byte-craft-service.vercel.app";

const NEXT_STEPS = [
  {
    icon: Mail,
    step: "01",
    title: "We read your brief",
    body: "Your message lands directly with the ByteCraft development team. We review your goals, timeline, and budget in plain language — no jargon required.",
  },
  {
    icon: FileText,
    step: "02",
    title: "You get a fixed plan & price",
    body: "Within two working days you receive a concrete scope, a fixed price, and a delivery date for your portfolio, web app, or AI SaaS build.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "We build, secure & launch",
    body: "Our developers ship your product, run security and SEO checks, and deploy it to your domain with monitoring and support included.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/thankyou`,
      url: `${SITE_URL}/thankyou`,
      name: "Thank You — Message Received",
      description:
        "Thank you for reaching out to ByteCraft. Your message is in, and the development team will reply within two working days.",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "ByteCraft",
      },
      inLanguage: "en",
      about: {
        "@type": "Organization",
        name: "ByteCraft",
        url: SITE_URL,
        description:
          "ByteCraft is an AI SaaS workspace for technical freelancers.",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Thank You",
          item: `${SITE_URL}/thankyou`,
        },
      ],
    },
  ],
};

function NextStepCard({
  icon: Icon,
  step,
  title,
  body,
}: (typeof NEXT_STEPS)[number]) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-elevated p-8">
      <div className="flex flex-row items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong bg-surface">
          <Icon size={20} className="text-[#f4a6c1]" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
          {step}
        </span>
      </div>
      <div>
        <h3 className="text-[17px] font-semibold leading-[1.3] text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">
          {body}
        </p>
      </div>
    </article>
  );
}

export default function ThankYouPage() {
  return (
    <div>
      {/* JSON-LD structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* HERO — confirmation the message was received */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 pb-16">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full cta-gradient text-[#0f0f11]">
            <CheckCircle2 size={30} />
          </div>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f4a6c1]">
            Message Received
          </p>
          <h1 className="mt-3 text-[34px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[46px]">
            Thank You for Contacting{" "}
            <span className="gradient-text">ByteCraft</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] text-[15px] leading-[1.7] text-muted-foreground">
            Your message is in — a member of the ByteCraft team will personally
            read it and reply within two working days. No bots, no sales
            funnels, just a clear next step for your project.
          </p>
        </div>
      </section>

      {/* NEXT STEPS — what happens after the message is sent */}
      <section
        aria-labelledby="next-steps-heading"
        className="mx-auto w-full max-w-[1280px] px-6 pb-16"
      >
        <div className="mb-10 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#f4a6c1]">
            What Happens Next
          </p>
          <h2
            id="next-steps-heading"
            className="mt-2 text-[28px] font-bold tracking-[-0.01em] text-foreground"
          >
            Your project is on the board
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {NEXT_STEPS.map((step) => (
            <NextStepCard key={step.step} {...step} />
          ))}
        </div>
      </section>

      {/* WAYS FORWARD — keep exploring ByteCraft */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20">
        <div className="rounded-xl border border-border bg-elevated p-8 md:p-10">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#f4a6c1]">
                While You Wait
              </p>
              <h2 className="mt-2 text-[28px] font-bold tracking-[-0.01em] text-foreground">
                Explore what we build
              </h2>
              <p className="mt-3 max-w-[520px] text-[14px] leading-[1.6] text-muted-foreground">
                See our transparent pricing and the services behind every
                ByteCraft build, or send a follow-up message if anything else
                comes to mind before we reply.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="cta-gradient inline-flex items-center justify-center gap-2 rounded-md px-8 py-3 text-[11px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110"
              >
                Explore Services
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md border border-border-strong px-8 py-3 text-[11px] font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-surface"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
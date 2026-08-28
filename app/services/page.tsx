"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useScrollReveal, useEntrance } from "@/lib/animations";
import { useBlogPosts } from "@/lib/hooks/use-blog";

const TIER_ROW_ONE = [
  {
    tier: "STARTER",
    name: "Portfolio Build",
    price: "₹1,000",
    features: [
      "Building personal portfolio",
      "Deploy & domain setup",
      "Simple blog websites",
      "Email support setup",
      "External basic auth",
    ],
    cta: "SELECT PLAN",
    gradient: false,
  },
  {
    tier: "GROWTH",
    name: "Security & Scale",
    price: "₹950",
    features: [
      "Advanced security protocols",
      "Payment gateway integration",
      "Technical SEO improvement",
      "Custom authentication",
      "Basic load balancing",
    ],
    cta: "SELECT PLAN",
    gradient: false,
  },
  {
    tier: "PROFESSIONAL",
    name: "SaaS Foundation",
    price: "₹2,500",
    features: [
      "Full SaaS application build",
      "AI smart feature integration",
      "Secured database setup",
      "Auth0 security authentication",
      "Payment & external services",
    ],
    cta: "SELECT PLAN",
    gradient: true,
  },
];

const TIER_ROW_TWO = [
  {
    tier: "ADVANCED",
    name: "Agentic AI",
    price: "₹5,000",
    features: [
      "Agentic AI software build",
      "RAG software pipelines",
      "Vector database integration",
      "MCP integration & deploy",
      "Rate limiting & balancing",
    ],
    cta: "SELECT PLAN",
    gradient: false,
  },
  {
    tier: "ENTERPRISE",
    name: "Data Management",
    price: "₹8,000",
    features: [
      "Data entry software",
      "Custom admin dashboards",
      "AI smart features",
      "Complex MCP integration",
      "Full deployment pipeline",
    ],
    cta: "SELECT PLAN",
    gradient: false,
  },
  {
    tier: "ULTIMATE",
    name: "Mobile Ecosystem",
    price: "₹10,000",
    features: [
      "Native mobile app build",
      "Playstore deployment",
      "Embedded AI features",
      "Distributed databases",
      "Global load balancing",
    ],
    cta: "SELECT PLAN",
    gradient: false,
  },
  {
    tier: "ESSENTIAL",
    name: "Web Application",
    price: "₹600",
    features: [
      "Build web application (personal site, blog site)",
      "Setup database",
      "Setup domain",
      "Deploy in Hostinger",
    ],
    cta: "SELECT PLAN",
    gradient: false,
  },
];

const TERMINAL_LINES = [
  "Set up load balancing...",
  "Deploy personal portfolios...",
  "Integrate Auth0 security...",
  "Build RAG software pipelines...",
];

function PricingCard({ plan }: { plan: (typeof TIER_ROW_ONE)[0] }) {
  return (
    <div
      className="flex min-h-[420px] flex-col justify-between rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
          {plan.tier}
        </p>
        <p className="mt-2 text-[22px] font-bold text-foreground">{plan.name}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check size={14} className="mt-0.5 shrink-0 text-[#f4a6c1]" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 border-t border-border pt-6">
        <p className="text-[34px] font-bold tracking-[-0.02em] text-foreground">
          {plan.price}
        </p>
        <button className="cta-gradient mt-4 w-full rounded-md py-3 text-[11px] font-bold uppercase tracking-wider text-[#0f0f11] shadow-[0_4px_20px_rgba(244,166,193,0.2)] transition-all hover:brightness-110">
          {plan.cta}
        </button>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const revealRef = useScrollReveal();
  const entranceRef = useEntrance();
  const { data: posts = [] } = useBlogPosts("all");
  const blogCards = posts.slice(0, 3);

  return (
    <div ref={revealRef}>
      {/* HERO with terminal */}
      <section
        ref={entranceRef}
        className="mx-auto w-full max-w-[1280px] px-6 py-20"
      >
        <div
          data-entrance
          className="grid gap-12 rounded-xl border border-border bg-elevated p-12 lg:grid-cols-2 lg:p-16"
        >
          <div className="max-w-[400px]">
            <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[48px]">
              Welcome to
            </h1>
            <p className="mt-6 text-[15px] leading-[1.6] text-muted-foreground">
              We build precision software solutions for the modern web. From
              simple landing pages to complex AI-driven SaaS applications, our
              focus is on performance, security, and scalability.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background p-6">
            {TERMINAL_LINES.map((line, i) => (
              <p
                key={line}
                className="font-mono text-[13px] leading-[1.5] text-muted-foreground"
              >
                <span className="text-[#f4a6c1]">&gt; </span>
                {line}
              </p>
            ))}
            <p className="mt-4 font-mono text-[13px] text-muted-foreground">
              <span className="text-[#f4a6c1]">&gt; </span>
              <span className="terminal-cursor" />
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Row 1 */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <h2
          data-reveal
          className="mb-12 text-center text-[32px] font-bold tracking-[-0.01em] text-foreground"
        >
          Service Tiers
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TIER_ROW_ONE.map((plan, i) => (
            <div key={plan.name} data-reveal data-reveal-delay={String(0.1 * i)}>
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TIER_ROW_TWO.map((plan, i) => (
            <div key={plan.name} data-reveal data-reveal-delay={String(0.1 * i)}>
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Blog */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <div
          data-reveal
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#f4a6c1]">
              Latest Insights
            </p>
            <h2 className="mt-2 text-[32px] font-bold tracking-[-0.01em] text-foreground">
              Engineering Blog
            </h2>
          </div>
          <a
            href="/blog"
            className="text-[11px] uppercase tracking-wider text-[#f4a6c1] transition-transform hover:translate-x-0.5"
          >
            View All Articles &gt;
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogCards.map((post, i) => (
            <div
              key={post.id}
              data-reveal
              data-reveal-delay={String(0.1 * i)}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-border-strong"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-[10px] lowercase text-[#f4a6c1]">{post.tag}</p>
                <h3 className="mt-2 text-[17px] font-semibold leading-[1.3] text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-faint">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * Home page
 * ------------------------------------------------------------------
 * Landing page with:
 *   1. Hero (background image + dark gradient overlay + headline).
 *   2. Core Infrastructure (three feature cards).
 *   3. Latest Transmissions (featured blog posts).
 * ------------------------------------------------------------------
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Cpu, Shield, Code2 } from "lucide-react";
import { useScrollReveal, useEntrance } from "@/lib/animations";
import { cardShadow } from "@/lib/styles";
import { LatestTransmissions } from "@/components/LatestTransmissions";
import homeData from "@/JsonDB/home.json";

/** Core feature cards shown in the "Core Infrastructure" section. */
const FEATURES = [
  {
    icon: Clock,
    color: "#F4A6C1",
    title: "Time Management",
    description:
      "Good time management to deliver the product perfectly on schedule. Track cycles, optimize sprints, and forecast delivery timelines effortlessly.",
  },
  {
    icon: Cpu,
    color: "#C8A8E9",
    title: "AI Automation",
    description:
      "Leverage machine learning models to automate repetitive coding tasks, generate boilerplate, and analyze code quality in real-time.",
  },
  {
    icon: Shield,
    color: "#F4A6C1",
    title: "Secure Deployment",
    description:
      "End-to-end encrypted pipelines ensuring your freelance projects are deployed securely with zero-trust architecture built-in.",
  },
];

/** Shared section heading (title + optional subtitle). */
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <h2 data-reveal className="text-[32px] font-bold tracking-[-0.01em] text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p data-reveal data-reveal-delay="0.1" className="mt-2 text-base text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** Renders a `**bold**`-marked string into <strong> segments. */
function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-white">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function HomePage() {
  const revealRef = useScrollReveal();
  const entranceRef = useEntrance();

  return (
    <div ref={revealRef}>
      {/* HERO */}
      <section
        ref={entranceRef}
        className="relative flex min-h-[480px] w-full min-w-full flex-col items-center justify-center overflow-hidden px-6"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/About-asserts/main-section-backgroud-image.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Dark overlay so white text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,15,17,0.92) 0%, rgba(15,15,17,0.55) 45%, rgba(15,15,17,0.92) 100%)",
          }}
        />
        {/* Subtle pink radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(244,166,193,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Content sits above the overlays */}
        <div className="relative z-10 flex max-w-[700px] flex-col items-center gap-6 text-center">
          <h1
            data-entrance
            className="text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[52px]"
            style={{ textShadow: "0 0 80px rgba(244,166,193,0.15)" }}
          >
            {homeData.hero.titleLineOne} <br />
            <span className="gradient-text">{homeData.hero.titleLineTwo}</span>
          </h1>
          <p data-entrance className="max-w-[600px] text-center text-base leading-[1.6] text-white/85">
            {renderBold(homeData.hero.description)}
          </p>
          <div data-entrance className="flex flex-col gap-4 sm:flex-row">
            <Link
              href={homeData.hero.primaryCtaHref}
              className="group flex items-center justify-center gap-2 rounded-md cta-gradient px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110"
            >
              {homeData.hero.primaryCta}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href={homeData.hero.secondaryCtaHref}
              className="flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20"
            >
              {homeData.hero.secondaryCta}
              <Code2 size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CORE INFRASTRUCTURE */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <SectionHeader
          title="Core Infrastructure"
          subtitle="Built for speed, reliability, and precision execution."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              data-reveal
              className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong"
              style={{ boxShadow: cardShadow }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                <feature.icon size={20} style={{ color: feature.color, opacity: 0.8 }} />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
                {feature.description}
              </p>
              <a
                href="/services"
                className="mt-6 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f4a6c1] transition-transform group-hover:translate-x-1"
              >
                Explore Module
                <ArrowRight size={13} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST TRANSMISSIONS */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <SectionHeader
          title="Latest Transmissions"
          subtitle="Insights and engineering logs from the ByteCraft team."
        />

        <LatestTransmissions />
      </section>
    </div>
  );
}

/**
 * About page
 * ------------------------------------------------------------------
 * Brand story page with:
 *   1. MISSION – background image + dark gradient overlay + the H1.
 *   2. FOUNDER STORY – personal write-up + portrait image + external
 *      "Preview Platform" link.
 *   3. VALUES – the principles that guide every ByteCraft decision.
 *   4. LATEST DISPATCHES – a small grid of article cards.
 * ------------------------------------------------------------------
 */
"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, useEntrance } from "@/lib/animations";
import { cardShadow } from "@/lib/styles";
import aboutData from "@/JsonDB/about.json";

/** Static dispatch cards rendered in the "Latest Dispatches" grid. */
const DISPATCHES = [
  {
    image: "/assets/About-asserts/about-blog-one.png",
    tag: "ARCHITECTURE",
    title: "Scaling the Monolith",
  },
  {
    image: "/assets/About-asserts/about-blog-two.png",
    tag: "PERFORMANCE",
    title: "Zero-Latency State",
  },
  {
    image: "/assets/About-asserts/about-blog-three.png",
    tag: "WORKFLOW",
    title: "The Ideal IDE Setup",
  },
];

/** A single dispatch card in the grid. */
function DispatchCard({
  post,
  index,
}: {
  post: (typeof DISPATCHES)[number];
  index: number;
}) {
  return (
    <div
      data-reveal
      data-reveal-delay={String(0.1 * index)}
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
        <span className="inline-block rounded border border-border-strong px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          {post.tag}
        </span>
        <h3 className="mt-3 text-base font-semibold text-foreground">
          {post.title}
        </h3>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const revealRef = useScrollReveal();
  const entranceRef = useEntrance();

  return (
    <div ref={revealRef}>
      {/* MISSION */}
      <section
        ref={entranceRef}
        className="relative flex min-h-[480px] w-full min-w-full flex-col items-center justify-center overflow-hidden px-6 py-32"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/About-asserts/main-section-backgroud-image.png"
            alt="Abstract geometric background for the ByteCraft about section"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Dark overlay so the white text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,15,17,0.92) 0%, rgba(15,15,17,0.55) 45%, rgba(15,15,17,0.92) 100%)",
          }}
        />
        {/* Manifesto text sits above the overlays */}
        <div className="relative z-10 flex max-w-[720px] flex-col items-center gap-5 text-center">
          <p
            data-entrance
            className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f4a6c1]"
          >
            {aboutData.mission.eyebrow}
          </p>
          <h1
            data-entrance
            className="text-[38px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[52px]"
            style={{ textShadow: "0 0 80px rgba(244,166,193,0.15)" }}
          >
            The ByteCraft Story
          </h1>
          <p
            data-entrance
            data-entrance-delay="0.1"
            className="max-w-[680px] text-center text-[17px] leading-[1.7] text-white/90"
          >
            {aboutData.mission.text}
          </p>
          <p
            data-entrance
            data-entrance-delay="0.2"
            className="max-w-[680px] text-center text-[14px] leading-[1.7] text-white/70"
          >
            {aboutData.mission.tagline}
          </p>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: story text */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f4a6c1]">
              The Founder
            </p>
            <h2
              data-reveal
              className="mt-2 max-w-[500px] text-[30px] font-bold leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[38px]"
            >
              {aboutData.founderStory.title}
            </h2>
            <p data-reveal className="mt-6 text-[15px] leading-[1.7] text-muted-foreground">
              {aboutData.founderStory.intro}
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {aboutData.founderStory.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  data-reveal
                  data-reveal-delay={String(0.1 + 0.05 * i)}
                  className="text-sm leading-[1.6] text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div data-reveal className="mt-8 flex flex-col gap-4">
              <div className="flex flex-row items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface text-[13px] font-semibold text-foreground">
                  F
                </div>
                <div>
                  <p className="text-[14px] font-medium text-foreground">
                    {aboutData.founderStory.author}
                  </p>
                  <p className="text-[12px] text-faint">{aboutData.founderStory.role}</p>
                </div>
              </div>
            </div>

            {/* External preview link */}
            <a
              data-reveal
              data-reveal-delay="0.35"
              href={aboutData.founderStory.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f4a6c1] transition-transform hover:translate-x-1"
            >
              {aboutData.founderStory.ctaText}
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Right: portrait image */}
          <div data-reveal className="group overflow-hidden rounded-xl border border-border">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={aboutData.founderStory.image}
                alt={aboutData.founderStory.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <p data-reveal className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f4a6c1]">
          {aboutData.values.eyebrow}
        </p>
        <h2 data-reveal className="mt-2 max-w-[560px] text-[28px] font-bold tracking-[-0.01em] text-foreground sm:text-[32px]">
          {aboutData.values.title}
        </h2>
        <p data-reveal className="mt-3 max-w-[680px] text-[15px] leading-[1.6] text-muted-foreground">
          {aboutData.values.description}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {aboutData.values.items.map((item, i) => (
            <div
              key={item.title}
              data-reveal
              data-reveal-delay={String(0.05 * i)}
              className="rounded-xl border border-border bg-card p-8"
              style={{ boxShadow: cardShadow }}
            >
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.6] text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* THE JOURNEY */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <p data-reveal className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f4a6c1]">
          {aboutData.journey.eyebrow}
        </p>
        <h2 data-reveal className="mt-2 max-w-[560px] text-[28px] font-bold tracking-[-0.01em] text-foreground sm:text-[32px]">
          {aboutData.journey.title}
        </h2>
        <p data-reveal className="mt-3 max-w-[680px] text-[15px] leading-[1.6] text-muted-foreground">
          {aboutData.journey.intro}
        </p>
        <div className="mt-12 flex flex-col gap-8">
          {aboutData.journey.milestones.map((milestone, i) => (
            <div
              key={milestone.title}
              data-reveal
              data-reveal-delay={String(0.05 * i)}
              className="flex flex-col gap-2 border-l-2 border-[#f4a6c1]/40 pl-6 sm:flex-row sm:gap-8"
            >
              <p className="w-24 shrink-0 text-[12px] font-bold uppercase tracking-[0.12em] text-[#f4a6c1]">
                {milestone.phase}
              </p>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {milestone.title}
                </h3>
                <p className="mt-1 max-w-[760px] text-sm leading-[1.6] text-muted-foreground">
                  {milestone.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST DISPATCHES */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <h2 data-reveal className="mb-12 text-[28px] font-bold tracking-[-0.01em] text-foreground sm:text-[32px]">
          {aboutData.dispatches.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DISPATCHES.map((post, i) => (
            <DispatchCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
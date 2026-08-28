"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Cpu, Shield, Code2 } from "lucide-react";
import { useScrollReveal, useEntrance } from "@/lib/animations";
import { useBlogPosts } from "@/lib/hooks/use-blog";

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

export default function HomePage() {
  const revealRef = useScrollReveal();
  const entranceRef = useEntrance();
  const { data: posts = [] } = useBlogPosts("all");

  const largePost = posts[0];
  const topPost = posts.find((p) => p.id === 7);
  const bottomPosts = posts.filter((p) => p.id === 8 || p.id === 9);

  return (
    <div ref={revealRef}>
      {/* HERO */}
      <section
        ref={entranceRef}
        className="relative flex min-h-[480px] w-full min-w-full flex-col items-center justify-center overflow-hidden px-6"
      >
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
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,15,17,0.92) 0%, rgba(15,15,17,0.55) 45%, rgba(15,15,17,0.92) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(244,166,193,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 flex max-w-[700px] flex-col items-center gap-6 text-center">
          <span
            data-entrance
            className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/80"
          >
            Version 2.0 is live
          </span>
          <h1
            data-entrance
            className="text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[52px]"
            style={{ textShadow: "0 0 80px rgba(244,166,193,0.15)" }}
          >
            Engineer Your <br />
            <span className="gradient-text">Freelance Workflow</span>
          </h1>
          <p data-entrance className="max-w-[600px] text-center text-base leading-[1.6] text-white/85">
            ByteCraft provides AI-driven SaaS tools designed exclusively for
            technical freelancers. Automate the mundane, secure your
            deployments, and scale your operations with precision.
          </p>
          <div data-entrance className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/services"
              className="group flex items-center justify-center gap-2 rounded-md cta-gradient px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110"
            >
              Our Services
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/blog"
              className="flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20"
            >
              View Documentation
              <Code2 size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <div className="mb-12">
          <h2 data-reveal className="text-[32px] font-bold tracking-[-0.01em] text-foreground">
            Core Infrastructure
          </h2>
          <p data-reveal data-reveal-delay="0.1" className="mt-2 text-base text-muted-foreground">
            Built for speed, reliability, and precision execution.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              data-reveal
              className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
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

      {/* BLOG */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <div className="mb-12">
          <h2 data-reveal className="text-[32px] font-bold tracking-[-0.01em] text-foreground">
            Latest Transmissions
          </h2>
          <p data-reveal data-reveal-delay="0.1" className="mt-2 text-base text-muted-foreground">
            Insights and engineering logs from the ByteCraft team.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Large left card */}
          {largePost && (
            <div
              data-reveal
              className="relative overflow-hidden rounded-xl border border-border lg:row-span-2"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={largePost.image}
                  alt={largePost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(15,15,17,0.95) 0%, rgba(15,15,17,0.4) 50%, transparent 100%)",
                  }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="inline-block rounded border border-white/30 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white">
                  Engineering
                </span>
                <h3 className="mt-3 text-[22px] font-bold leading-[1.3] tracking-tight text-white">
                  {largePost.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-[1.6] text-[#c7c7cf]">
                  {largePost.excerpt}
                </p>
              </div>
            </div>
          )}

          {/* Right column stacked */}
          {topPost && (
            <div
              data-reveal
              data-reveal-delay="0.1"
              className="rounded-xl border border-border bg-card p-6"
            >
              <span className="rounded bg-chip px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-foreground">
                Update
              </span>
              <h3 className="mt-3 text-base font-semibold text-foreground">
                {topPost.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{topPost.excerpt}</p>
              <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.05em] text-faint">
                {topPost.date}
              </p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            {bottomPosts.map((post) => (
              <div
                key={post.id}
                data-reveal
                data-reveal-delay="0.15"
                className="rounded-xl border border-border bg-card p-6"
              >
                <span className="inline-block rounded border border-border-strong px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  {post.tag}
                </span>
                <h3 className="mt-3 text-base font-semibold text-foreground">
                  {post.title}
                </h3>
                <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.05em] text-faint">
                  {post.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

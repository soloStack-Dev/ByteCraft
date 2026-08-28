"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollReveal, useEntrance } from "@/lib/animations";
import { useFeaturedPost } from "@/lib/hooks/use-blog";

export default function AboutPage() {
  const revealRef = useScrollReveal();
  const entranceRef = useEntrance();
  const { data: featured } = useFeaturedPost();

  return (
    <div ref={revealRef}>
      {/* MISSION */}
      <section
        ref={entranceRef}
        className="relative flex min-h-[480px] w-full min-w-full flex-col items-center justify-center overflow-hidden px-6 py-32"
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
        <div className="relative z-10">
          <p
            data-entrance
            className="max-w-[680px] text-center text-[17px] leading-[1.7] text-white/90"
          >
            We build the infrastructure that powers the next generation of SaaS.
            High-fidelity, developer-centric, and fiercely independent.
          </p>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1
              data-reveal
              className="max-w-[500px] text-[30px] font-bold leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[38px]"
            >
              I build this saas product for starting own freelancing journey
              because AI can do all repetitive task so don&apos;t abandoned our
              interested career so I planning to move my career this but I am
              currently work in non developer field
            </h1>

            <div className="mt-8 flex flex-col gap-4">
              <p data-reveal data-reveal-delay="0.1" className="text-sm leading-[1.6] text-muted-foreground">
                The genesis of this tool was born from necessity, bridging the
                gap between ambition and current reality.
              </p>
              <p data-reveal data-reveal-delay="0.15" className="text-sm leading-[1.6] text-muted-foreground">
                By automating the mundane, we free up cognitive load for
                complex, creative problem-solving.
              </p>
              <p data-reveal data-reveal-delay="0.2" className="text-sm leading-[1.6] text-muted-foreground">
                This platform serves as the foundational scaffolding for
                transitioning into technical domains.
              </p>
              <p data-reveal data-reveal-delay="0.25" className="text-sm leading-[1.6] text-muted-foreground">
                It&apos;s designed for resilience, allowing you to architect
                solutions regardless of your background.
              </p>
              <p data-reveal data-reveal-delay="0.3" className="text-sm leading-[1.6] text-muted-foreground">
                We are democratizing the tooling previously reserved for elite
                engineering teams.
              </p>
            </div>

            <a
              data-reveal
              data-reveal-delay="0.35"
              href="https://personal-mission-mu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f4a6c1] transition-transform hover:translate-x-1"
            >
              Preview Platform
              <ArrowRight size={14} />
            </a>
          </div>

          <div
            data-reveal
            className="group overflow-hidden rounded-xl border border-border"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/assets/About-asserts/about-section-image.png"
                alt="Founder story"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LATEST DISPATCHES */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-20">
        <h2 data-reveal className="mb-12 text-[28px] font-bold tracking-[-0.01em] text-foreground sm:text-[32px]">
          Latest Dispatches
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
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
          ].map((post, i) => (
            <div
              key={post.title}
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
                <span className="inline-block rounded border border-border-strong px-3 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                  {post.tag}
                </span>
                <h3 className="mt-3 text-base font-semibold text-foreground">
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

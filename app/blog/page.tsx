/**
 * Blog page
 * ------------------------------------------------------------------
 * Engineering insights & articles.
 *
 * Sections:
 *   1. Featured article hero.
 *   2. Topic filter tabs (drives which posts are shown).
 *   3. Responsive 3-column article grid.
 *   4. Pagination.
 *
 * Filter state lives in useBlogStore; data comes from useBlogPosts /
 * useFeaturedPost (React Query).
 * ------------------------------------------------------------------
 */
"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal, useEntrance } from "@/lib/animations";
import { useBlogPosts, useFeaturedPost } from "@/lib/hooks/use-blog";
import { useBlogStore, type BlogTopic } from "@/lib/stores/blog-store";
import { blogTopics, type BlogPost } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

/** Number of posts shown on a single page. */
const PER_PAGE = 6;

/** Filter tabs: "ALL POSTS" + the individual topics. */
const TOPIC_TABS: { label: string; value: BlogTopic }[] = [
  { label: "ALL POSTS", value: "all" },
  ...blogTopics,
];

/** Accent colour per tag. Pink for engineering/security/culture, muted else. */
const tagClass: Record<string, string> = {
  ENGINEERING: "text-[#f4a6c1]",
  SECURITY: "text-[#f4a6c1]",
  CULTURE: "text-[#f4a6c1]",
  UPDATES: "text-muted-foreground",
};

/**
 * BlogCard – a single article in the grid. Hover scales the image
 * (1.03) and brightens the border, per the design spec.
 */
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <article
      data-reveal
      data-reveal-delay={String(0.08 * index)}
      className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-border-strong"
      style={{
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* 16:9 cover image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* Meta + title + excerpt */}
      <div className="p-5">
        <div className="flex flex-row items-center gap-2">
          <span
            className={cn(
              "text-[10px] font-medium uppercase tracking-[0.1em]",
              tagClass[post.tag] ?? "text-muted-foreground"
            )}
          >
            {post.tag}
          </span>
          <span className="text-[10px] text-faint">|</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.05em] text-faint">
            {post.date}
          </span>
        </div>
        <h3 className="mt-3 text-[17px] font-semibold leading-[1.3] text-foreground">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-[1.5] text-faint">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const revealRef = useScrollReveal();
  const entranceRef = useEntrance();
  const { data: featured } = useFeaturedPost();
  const { activeTopic, setActiveTopic } = useBlogStore();
  const { data: posts = [] } = useBlogPosts(activeTopic);
  const [page, setPage] = useState(1);

  // The featured post is shown in the hero, so exclude it from the grid.
  const gridPosts = posts.filter((post) => post.id !== featured?.id);

  // Pagination math (clamp the page so it stays valid when filtering).
  const totalPages = Math.max(1, Math.ceil(gridPosts.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pagePosts = gridPosts.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div ref={revealRef}>
      {/* FEATURED ARTICLE */}
      <section
        ref={entranceRef}
        className="mx-auto w-full max-w-[1280px] px-6 py-16"
      >
        {featured && (
          <div
            data-entrance
            className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]"
          >
            {/* Left: meta + content */}
            <div>
              <div className="flex flex-row items-center gap-3">
                <span className="rounded-sm border border-border-strong px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#f4a6c1]">
                  {featured.tag}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-faint">
                  {featured.date}
                </span>
              </div>
              <h1 className="mt-4 text-[34px] font-bold leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[36px]">
                {featured.title}
              </h1>
              <p className="mt-4 max-w-[480px] text-[15px] leading-[1.6] text-muted-foreground">
                {featured.excerpt}
              </p>

              {/* Author */}
              <div className="mt-8 flex flex-row items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface text-[13px] font-semibold text-foreground">
                  SC
                </div>
                <div>
                  <p className="text-[14px] font-medium text-foreground">
                    Sarah Chen
                  </p>
                  <p className="text-[12px] text-faint">Lead Systems Engineer</p>
                </div>
              </div>
            </div>

            {/* Right: featured image with overlay label */}
            <div className="relative overflow-hidden rounded-xl border border-border">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-black/40 px-2.5 py-1 text-[12px] font-medium uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                  Engineering Logs
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* TOPIC FILTER TABS */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-8">
        <div className="flex flex-row flex-wrap items-center gap-6">
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-faint">
            Filter by Topic:
          </span>
          <div className="flex flex-row flex-wrap gap-6">
            {TOPIC_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTopic(tab.value);
                  setPage(1); // reset to page 1 when the filter changes
                }}
                className={cn(
                  "text-[11px] uppercase tracking-[0.08em] transition-colors duration-200",
                  activeTopic === tab.value
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pagePosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* PAGINATION */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-12">
        <div className="flex flex-row items-center justify-center gap-2">
          {/* Previous */}
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label="Previous page"
            className="text-faint transition-colors duration-200 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page numbers */}
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={cn(
                "text-[14px] transition-colors duration-200",
                num === safePage
                  ? "font-bold text-foreground"
                  : "text-faint hover:text-foreground"
              )}
            >
              {num}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            aria-label="Next page"
            className="text-faint transition-colors duration-200 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}

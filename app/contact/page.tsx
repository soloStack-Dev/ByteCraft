/**
 * Contact page
 * ------------------------------------------------------------------
 * Engineering insights & articles, plus a contact form.
 *
 * Sections:
 *   1. Featured article hero.
 *   2. Topic filter tabs (drives which posts are shown).
 *   3. Contact information form (stored in Convex + emailed via Resend).
 *   4. Responsive 3-column article grid.
 *   5. Pagination.
 *
 * Filter state lives in useBlogStore; data comes from useBlogPosts /
 * useFeaturedPost (React Query).
 * ------------------------------------------------------------------
 */
"use client";

import Image from "next/image";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChevronLeft, ChevronRight, AtSign, Check } from "lucide-react";
import { useScrollReveal, useEntrance } from "@/lib/animations";
import { useBlogPosts, useFeaturedPost } from "@/lib/hooks/use-blog";
import { useBlogStore, type BlogTopic } from "@/lib/stores/blog-store";
import { blogTopics, type BlogPost } from "@/lib/blog-data";
import { useToastStore } from "@/lib/stores/toast-store";
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

/** Shared input styling for the contact form. */
const inputClass =
  "w-full rounded-md border border-border-strong bg-background px-4 py-3 text-[14px] text-foreground outline-none transition-colors placeholder:text-faint focus:border-[#f4a6c1]";

/**
 * ContactForm – submissions are stored in Convex (submitContact) and an
 * email is fired to the owner through the /api/contact Resend route.
 * The email field doubles as the primary "email-style" submit input.
 */
function ContactForm() {
  const submitContact = useMutation(api.contacts.submitContact);
  const push = useToastStore((s) => s.push);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    message: "",
  });

  const update =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // All fields must be filled before anything is sent.
    if (!form.username.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) {
      push("error", "Please fill in all the fields before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Persist the submission in Convex.
      await submitContact({
        username: form.username.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      });
      // 2. Fire the email to the owner via Resend.
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ username: "", email: "", phone: "", message: "" });
      push("success", "Message sent — we'll get back to you shortly.");
    } catch {
      push("error", "Something went wrong while sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-reveal
      className="mt-10 overflow-hidden rounded-xl border border-border bg-elevated"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
    >
      <div className="grid gap-6 p-8 md:grid-cols-2 md:p-10">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#f4a6c1]">
            Get In Touch
          </p>
          <h2 className="mt-2 text-[28px] font-bold tracking-[-0.01em] text-foreground">
            Contact information
          </h2>
          <p className="mt-3 max-w-[440px] text-[14px] leading-[1.6] text-muted-foreground">
            Tell us about your project — share your details and we&apos;ll
            reply as soon as possible. Whether you need a portfolio, a SaaS
            build, or AI automation, the ByteCraft team reads every message
            personally.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {[1, 2, 3].map((step) => (
              <p
                key={step}
                className="max-w-[440px] text-[13px] leading-[1.6] text-muted-foreground"
              >
                <span className="font-semibold text-foreground">
                  {step === 1 && "1. Share your brief. "}
                  {step === 2 && "2. Get a plan & quote. "}
                  {step === 3 && "3. We build, secure, and launch. "}
                </span>
                {step === 1 &&
                  "Send a few lines about your goals, timeline, and budget. No jargon required — plain language is perfect."}
                {step === 2 &&
                  "Within two working days you receive a fixed scope, a fixed price from our services page, and a delivery date."}
                {step === 3 &&
                  "Our developers build the product, run security and SEO checks, and deploy it to your domain with support included."}
              </p>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">
              Typical projects
            </p>
            <ul className="mt-3 max-w-[440px] flex flex-col gap-2">
              {[
                "Portfolio and personal brand sites",
                "AI SaaS builds and AI-powered features",
                "Stripe and payment gateway integration",
                "Load balancing and zero-trust security",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[13px] leading-[1.5] text-muted-foreground"
                >
                  <Check size={13} className="mt-0.5 shrink-0 text-[#f4a6c1]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={form.username}
            onChange={update("username")}
            placeholder="Username"
            aria-label="Username"
            className={inputClass}
          />
          <input
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="Phone number"
            aria-label="Phone number"
            className={inputClass}
          />
        </div>

        <textarea
          value={form.message}
          onChange={update("message")}
          placeholder="Message"
          aria-label="Message"
          rows={4}
          className={cn(inputClass, "md:col-span-2 resize-none")}
        />

        {/* Email-style input with inline submit button */}
        <div className="flex flex-row items-center gap-2 md:col-span-2">
          <div className="relative flex-1">
            <AtSign
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"
            />
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="Your email address"
              aria-label="Email address"
              className={cn(inputClass, "rounded-full pl-11")}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="cta-gradient shrink-0 rounded-full px-8 py-3 text-[11px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

/**
 * FeedbackSection – let visitors send feedback straight to the owner's
 * inbox through the /api/feedback Resend route.
 */
function FeedbackSection() {
  const push = useToastStore((s) => s.push);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting || !message.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });
      if (!res.ok) throw new Error("feedback request failed");
      setMessage("");
      push("success", "Thanks — your feedback has been sent.");
    } catch {
      push(
        "error",
        "Something went wrong while sending your feedback. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 py-12">
      <form
        onSubmit={handleSubmit}
        data-reveal
        className="overflow-hidden rounded-xl border border-border bg-elevated"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
      >
        <div className="p-8 md:p-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#f4a6c1]">
            We Value Your Input
          </p>
          <h2 className="mt-2 text-[28px] font-bold tracking-[-0.01em] text-foreground">
            Feedback
          </h2>
          <p className="mt-3 max-w-[420px] text-[14px] leading-[1.6] text-muted-foreground">
            Tell us how we&apos;re doing — your feedback helps us improve.
            Found a bug in a core feature or a typo in the docs? We read every
            note and ship fixes quickly, and admissions like that are exactly
            the kind of feedback that shapes the roadmap.
          </p>

          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            aria-label="Feedback message"
            rows={5}
            className={cn(inputClass, "mt-6 resize-none")}
          />

          <button
            type="submit"
            disabled={submitting || !message.trim()}
            className="cta-gradient mt-4 rounded-md px-8 py-3 text-[11px] font-bold uppercase tracking-wider text-[#0f0f11] transition-all hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default function ContactPage() {
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
      {/* PAGE INTRO */}
      <section className="mx-auto w-full max-w-[1280px] px-6 pt-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f4a6c1]">
          Talk To ByteCraft
        </p>
        <h1 className="mt-3 max-w-[760px] text-[34px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[44px]">
          Contact ByteCraft — Get In Touch
        </h1>
        <div className="mt-6 flex flex-col gap-3">
          <p className="max-w-[720px] text-[15px] leading-[1.7] text-muted-foreground">
            This page is where ByteCraft and its readers meet. Browse the latest
            engineering insights below, filter by topic, or send a message about
            your own project — a portfolio, a web application, an AI SaaS build,
            or a full mobile ecosystem. Every inquiry lands directly with the
            development team, not a sales funnel.
          </p>
          <p className="max-w-[720px] text-[15px] leading-[1.7] text-muted-foreground">
            Prefer email? Reach us any time at hello@bytecraft.dev and we will
            reply within two working days. Whichever way you write to us,
            include a sentence about your goal and your rough timeline so we can
            respond with something useful straight away.
          </p>
          <p className="max-w-[720px] text-[15px] leading-[1.7] text-muted-foreground">
            We take on a limited number of builds each month so every project
            gets real attention: new products, migrations, AI features, and
            performance rescue work. If the scope is bigger than a single
            message, we will ask for a short call and confirm the details before
            anything is billed.
          </p>
        </div>
      </section>

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
              <h2 className="mt-4 text-[34px] font-bold leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[36px]">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-[480px] text-[15px] leading-[1.6] text-muted-foreground">
                {featured.excerpt}
              </p>

              {/* Author */}
              <div className="mt-8 flex flex-row items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-surface text-[13px] font-semibold text-foreground">
                  F
                </div>
                <div>
                  <p className="text-[14px] font-medium text-foreground">
                    Faleel H
                  </p>
                  <p className="text-[12px] text-faint">AI + Full Stack Developer</p>
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

      {/* CONTACT FORM */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-8">
        <ContactForm />
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

      {/* COMMON QUESTIONS */}
      <section className="mx-auto w-full max-w-[1280px] px-6 py-12">
        <div className="rounded-xl border border-border bg-elevated p-8 md:p-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#f4a6c1]">
            Before You Ask
          </p>
          <h2 className="mt-2 text-[28px] font-bold tracking-[-0.01em] text-foreground">
            Common Questions
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                q: "How quickly will I hear back?",
                a: "Messages are answered within two working days. Urgent launch requests should mention a deadline so we can prioritise you.",
              },
              {
                q: "Do you work with non-technical founders?",
                a: "Yes. ByteCraft exists for people moving into technical careers from any background, so we handle the engineering details for you.",
              },
              {
                q: "What happens after my product launches?",
                a: "Every build ships with deployment support, monitoring, and clear documentation, plus optional maintenance if you want us to keep iterating.",
              },
            ].map((item) => (
              <div key={item.q} className="rounded-lg border border-border-strong bg-background p-6">
                <h3 className="text-[15px] font-semibold text-foreground">{item.q}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-muted-foreground">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDBACK */}
      <FeedbackSection />
    </div>
  );
}
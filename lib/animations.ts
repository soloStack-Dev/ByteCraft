"use client";

/**
 * animations.ts
 * ------------------------------------------------------------------
 * GSAP + ScrollTrigger helpers used by every page.
 *
 * - useScrollReveal(): animate `[data-reveal]` elements in as the user
 *   scrolls (used for page sections).
 * - useEntrance():   animate `[data-entrance]` elements on first load
 *   (used for hero content).
 *
 * Each hook returns a ref that you spread onto the page's top-level
 * <div>. GSAP scopes all selectors to that ref, so animations never
 * leak into other parts of the document.
 * ------------------------------------------------------------------
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger must be registered before first use.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * useScrollReveal – reveal sections as they scroll into view.
 *
 * Elements marked with `data-reveal` start hidden (opacity 0, nudged
 * down) and animate to visible when their top hits 85% of the viewport.
 * An optional `data-reveal-delay="0.1"` attribute staggers each item.
 */
export function useScrollReveal() {
  const scope = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // gsap.context scopes every selector to `scope` and auto-cleans up.
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (items.length === 0) return;

      items.forEach((el) => {
        const delay = el.dataset.revealDelay
          ? parseFloat(el.dataset.revealDelay)
          : 0;

        gsap.fromTo(
          el,
          { opacity: 0, y: 24 }, // start: hidden + slide up
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // fire when element top crosses 85% of viewport
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, scope);

    // revert() removes all animations/triggers when the component unmounts.
    return () => ctx.revert();
  }, []);

  return scope;
}

/**
 * useEntrance – staggered entrance animation for the page hero.
 *
 * Elements with `data-entrance` fade + slide in one after another
 * (0.1s stagger) as soon as the page loads.
 */
export function useEntrance() {
  const scope = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-entrance]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  return scope;
}


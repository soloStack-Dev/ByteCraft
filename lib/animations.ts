"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Scroll reveal hook. Adds `data-reveal` registered elements to a GSAP +
 * ScrollTrigger batch animation when they enter the viewport.
 */
export function useScrollReveal() {
  const scope = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (items.length === 0) return;

      items.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            delay: (el.dataset.revealDelay ? parseFloat(el.dataset.revealDelay) : 0),
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return scope;
}

/**
 * Staggered entrance animation for initial page load.
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

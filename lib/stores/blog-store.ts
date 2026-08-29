/**
 * blog-store.ts
 * ------------------------------------------------------------------
 * Global state for the active blog filter topic (Zustand).
 *
 * The Blog page reads `activeTopic` to know which filter tab is
 * selected and which posts to fetch. Keeping it in a store means the
 * filter survives component re-mounts and is trivial to share.
 * ------------------------------------------------------------------
 */
"use client";

import { create } from "zustand";

/** The selectable blog topics (plus "all" for no filter). */
export type BlogTopic = "all" | "engineering" | "security" | "culture" | "updates";

interface BlogState {
  /** Currently selected filter topic. */
  activeTopic: BlogTopic;
  /** Change the selected topic. */
  setActiveTopic: (topic: BlogTopic) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  activeTopic: "all", // default: show every post
  setActiveTopic: (topic) => set({ activeTopic: topic }),
}));

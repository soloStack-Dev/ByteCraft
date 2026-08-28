"use client";

import { create } from "zustand";

export type BlogTopic = "all" | "engineering" | "security" | "culture" | "updates";

interface BlogState {
  activeTopic: BlogTopic;
  setActiveTopic: (topic: BlogTopic) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  activeTopic: "all",
  setActiveTopic: (topic) => set({ activeTopic: topic }),
}));

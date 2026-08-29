/**
 * use-blog.ts
 * ------------------------------------------------------------------
 * React Query hooks that supply blog data to any page.
 *
 * Keeping the data access behind these hooks means the pages never
 * touch the data source directly and get caching/loading states for
 * free.
 * ------------------------------------------------------------------
 */
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  blogPosts,
  getFeaturedPost,
  getPostsByTopic,
  type BlogPost,
} from "@/lib/blog-data";

/** Simulate a network round-trip so the loading UX is realistic. */
const simulateLatency = () => new Promise((r) => setTimeout(r, 300));

/**
 * Fetch posts, optionally filtered by a topic.
 * @param topic - "all" or a specific BlogTopic value.
 */
export function useBlogPosts(topic: string) {
  return useQuery<BlogPost[]>({
    // Cache per topic so switching filters doesn't refetch everything.
    queryKey: ["blog-posts", topic],
    queryFn: async () => {
      await simulateLatency();
      return getPostsByTopic(topic);
    },
    // For "all" we can show data instantly while a refresh is pending.
    placeholderData: topic === "all" ? blogPosts : undefined,
  });
}

/** Fetch the single featured (hero) post. */
export function useFeaturedPost() {
  return useQuery<BlogPost | undefined>({
    queryKey: ["blog-featured"],
    queryFn: async () => {
      await simulateLatency();
      return getFeaturedPost();
    },
    placeholderData: getFeaturedPost(),
  });
}

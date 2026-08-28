"use client";

import { useQuery } from "@tanstack/react-query";
import {
  blogPosts,
  getFeaturedPost,
  getPostsByTopic,
  type BlogPost,
} from "@/lib/blog-data";

const simulateLatency = () => new Promise((r) => setTimeout(r, 300));

export function useBlogPosts(topic: string) {
  return useQuery<BlogPost[]>({
    queryKey: ["blog-posts", topic],
    queryFn: async () => {
      await simulateLatency();
      return getPostsByTopic(topic);
    },
    placeholderData: topic === "all" ? blogPosts : undefined,
  });
}

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

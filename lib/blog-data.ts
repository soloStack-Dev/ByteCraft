/**
 * blog-data.ts
 * ------------------------------------------------------------------
 * Static blog content for the entire app (no backend yet).
 *
 * Exposes:
 *  - BlogPost type + a blogPosts array.
 *  - blogTopics list for filter tabs.
 *  - getFeaturedPost() / getPostsByTopic() helpers.
 *
 * Images live in /assets/Blog-asserts/ under the public folder.
 * ------------------------------------------------------------------
 */
export type BlogTopic =
  | "engineering"
  | "security"
  | "culture"
  | "updates";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  topic: BlogTopic;
  date: string;
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 2,
    slug: "scaling-rag-systems",
    title: "Scaling RAG Systems for Enterprise SaaS",
    excerpt:
      "Deep dive into implementing resilient Retrieval-Augmented Generation pipelines using vector databases and...",
    tag: "ENGINEERING",
    topic: "engineering",
    date: "OCT 18, 2024",
    image: "/assets/Blog-asserts/sub-blog-one.png",
    featured: true,
  },
  {
    id: 3,
    slug: "zero-trust-architecture",
    title: "Zero Trust Architecture Implementation Guide",
    excerpt:
      "Practical steps for migrating legacy systems to a strict Zero Trust model...",
    tag: "SECURITY",
    topic: "security",
    date: "OCT 18, 2024",
    image: "/assets/Blog-asserts/sub-blog-two.png",
  },
  {
    id: 4,
    slug: "remote-first-teams",
    title: "Building Remote-First Engineering Teams",
    excerpt:
      "How we maintain alignment, foster innovation, and prevent burnout in a...",
    tag: "CULTURE",
    topic: "culture",
    date: "OCT 12, 2024",
    image: "/assets/Blog-asserts/sub-blog-three.png",
  },
  {
    id: 6,
    slug: "optimizing-ai-pipelines",
    title: "Optimizing AI Pipelines for Freelance Scale",
    excerpt:
      "A deep dive into how we restructured our neural network deployment models to reduce latency by 40% for individual...",
    tag: "ENGINEERING",
    topic: "engineering",
    date: "OCT 12, 2024",
    image: "/assets/Blog-asserts/blog-main-image.png",
  },
];

export const blogTopics: { label: string; value: BlogTopic }[] = [
  { label: "ENGINEERING", value: "engineering" },
  { label: "SECURITY", value: "security" },
  { label: "CULTURE", value: "culture" },
  { label: "UPDATES", value: "updates" },
];

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((p) => p.featured);
}

export function getPostsByTopic(topic: string): BlogPost[] {
  if (!topic || topic === "all") return blogPosts;
  return blogPosts.filter((p) => p.topic === topic);
}

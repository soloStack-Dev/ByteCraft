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
    id: 1,
    slug: "architecting-hyper-scale",
    title: "Architecting for Hyper-Scale: Lessons from the Edge",
    excerpt:
      "Deep dive into the infrastructure choices, distributed systems patterns, and observability tools required to maintain 99.999% uptime during massive traffic spikes.",
    tag: "ENGINEERING",
    topic: "engineering",
    date: "OCT 24, 2024",
    image: "/assets/Blog-asserts/blog-main-image.png",
    featured: true,
  },
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
    id: 5,
    slug: "bytecraft-v24-release",
    title: "ByteCraft v2.4 Release Notes",
    excerpt:
      "Introducing the new GraphQL API, enhanced Webhook delivery guarantees...",
    tag: "UPDATES",
    topic: "updates",
    date: "OCT 05, 2024",
    image: "/assets/Blog-asserts/sub-blog-one.png",
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
  {
    id: 7,
    slug: "bytecraft-v20-release",
    title: "ByteCraft v2.0 Release Notes",
    excerpt: "Major architectural changes and new API endpoints.",
    tag: "UPDATE",
    topic: "updates",
    date: "OCT 12, 2024",
    image: "/assets/Blog-asserts/sub-blog-two.png",
  },
  {
    id: 8,
    slug: "zero-trust-workflows",
    title: "Zero-Trust Workflows",
    excerpt: "How to implement robust zero-trust models using Auth0 and edge...",
    tag: "SECURITY",
    topic: "security",
    date: "OCT 08, 2024",
    image: "/assets/Blog-asserts/sub-blog-three.png",
  },
  {
    id: 9,
    slug: "freelance-dev-ethos",
    title: "The Freelance Dev Ethos",
    excerpt: "What drives independent engineers in the modern web era.",
    tag: "CULTURE",
    topic: "culture",
    date: "SEP 29, 2024",
    image: "/assets/Blog-asserts/sub-blog-one.png",
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

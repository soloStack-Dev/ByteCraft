/**
 * convex-client.ts
 * ------------------------------------------------------------------
 * Shared Convex React client.
 *
 * The deployment URL comes from NEXT_PUBLIC_CONVEX_URL (set by `npx convex dev`).
 * The client is provided to the tree via ConvexProvider in <Providers>.
 * ------------------------------------------------------------------
 */
"use client";

import { ConvexReactClient } from "convex/react";

export const convex = new ConvexReactClient(
      process.env.NEXT_PUBLIC_CONVEX_URL ??
        "https://your-project-1234.convex.cloud"
);

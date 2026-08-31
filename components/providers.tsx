/**
 * providers.tsx
 * ------------------------------------------------------------------
 * Root context providers that the whole app depends on.
 *
 * - ConvexProvider         : Convex client for database access
 *                           (contact submissions, blog data).
 * - QueryClientProvider    : TanStack Query for server-like data fetching.
 *
 * Nesting order matters: the QueryClient is created once per mount and
 * shared by every page that queries blog data.
 * ------------------------------------------------------------------
 */
"use client";

import { ConvexProvider } from "convex/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { convex } from "@/lib/convex-client";

export function Providers({ children }: { children: ReactNode }) {
  // The QueryClient is created only once.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Keep data "fresh" for 60s to avoid redundant refetches.
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ConvexProvider>
  );
}
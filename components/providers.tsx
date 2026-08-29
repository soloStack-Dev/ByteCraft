/**
 * providers.tsx
 * ------------------------------------------------------------------
 * Root context providers that the whole app depends on.
 *
 * - SessionProvider      : NextAuth session state for useSession().
 * - QueryClientProvider  : TanStack Query for server-like data fetching.
 *
 * Nesting order matters: the QueryClient is created once per mount and
 * shared by every page that queries blog data.
 * ------------------------------------------------------------------
 */
"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  // useRef-like state: the QueryClient is created only once.
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
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}

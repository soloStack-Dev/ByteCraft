/**
 * next-auth.d.ts
 * ------------------------------------------------------------------
 * Extends the TypeScript types that NextAuth ships with so the rest
 * of the app can safely read the custom fields we store.
 *
 * We add an optional `id` to both the session user and the JWT, as
 * set in lib/auth.ts callbacks.
 * ------------------------------------------------------------------
 */
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // user id added in the `session` callback
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // persisted id from the `jwt` callback
  }
}

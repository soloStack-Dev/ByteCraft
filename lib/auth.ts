/**
 * auth.ts
 * ------------------------------------------------------------------
 * NextAuth configuration for ByteCraft.
 *
 * - "Credentials" provider: validates username/email + password
 *   against the database (see lib/auth-db.ts).
 * - Google + GitHub: OAuth providers for social login.
 * - JWT session strategy with a persisted user id.
 * ------------------------------------------------------------------
 */

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { z } from "zod";
import { authenticateUser, getUserByEmail } from "@/lib/auth-db";

/** Minimal validation before we hit the database. */
const credentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // stateless sessions via a signed JWT cookie
  },
  pages: {
    signIn: "/login", // point NextAuth's built-in sign-in to our page
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      /**
       * authorize is called when a user submits the login form.
       * Returns a user object on success, or `null` to reject.
       */
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        // The form lets people log in with EITHER a username OR an email.
        // First try treating the input as a username...
        let user = await authenticateUser({
          username: parsed.data.username,
          password: parsed.data.password,
        });

        // ...if that fails, resolve the input as an email and retry.
        if (!user) {
          const byEmail = await getUserByEmail(parsed.data.username);
          if (byEmail) {
            user = await authenticateUser({
              username: byEmail.username,
              password: parsed.data.password,
            });
          }
        }

        if (!user) return null;

        // Shape the object NextAuth puts into the session token.
        return {
          id: String(user.id),
          name: user.name || user.username,
          email: user.email,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // Persist the user id on the JWT so it survives across requests.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Expose the id on the client-accessible session object.
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

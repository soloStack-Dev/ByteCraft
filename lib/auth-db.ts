/**
 * auth-db.ts
 * ------------------------------------------------------------------
 * User persistence + password handling on top of the database.
 *
 * Responsibility breakdown:
 *  - Zod schemas validate incoming signup/login data.
 *  - Passwords are hashed (scrypt + salt) and verified using a
 *    constant-time comparison.
 *  - registerUser / authenticateUser are the two higher-level
 *    operations the rest of the app calls.
 * ------------------------------------------------------------------
 */

import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users, type NewUser } from "@/db/schema";
import { z } from "zod";

// scrypt uses a callback API; promisify lets us use async/await.
const scryptAsync = promisify(scrypt);

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

/** Rules for creating a new account (used by the signup form). */
export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50)
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, underscores"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(128),
    confirmPassword: z.string(),
  })
  // Cross-field rule: password and confirmation must match.
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/** Rules for logging in. */
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

/* ------------------------------------------------------------------ */
/* Password hashing                                                    */
/* ------------------------------------------------------------------ */

/**
 * Hash a plain-text password using scrypt with a random per-user salt.
 * Stored format: `salt:hash` (both hex) so we can verify later.
 */
async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${buf.toString("hex")}`;
}

/**
 * Verify a plain-text password against a stored `salt:hash` value.
 * timingSafeEqual avoids leaking timing information about the hash.
 */
async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, "hex");
  const inputBuf = (await scryptAsync(password, salt, 64)) as Buffer;
  return timingSafeEqual(hashBuf, inputBuf);
}

/* ------------------------------------------------------------------ */
/* Single-row lookups                                                  */
/* ------------------------------------------------------------------ */

/** Find a user by their unique username. */
export async function getUserByUsername(username: string) {
  const db = await getDb();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return user;
}

/** Find a user by their unique email address. */
export async function getUserByEmail(email: string) {
  const db = await getDb();
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}

/** Insert a brand-new user row. */
export async function createUser(data: NewUser) {
  const db = await getDb();
  const [result] = await db.insert(users).values(data);
  return result;
}

/* ------------------------------------------------------------------ */
/* High-level auth operations                                          */
/* ------------------------------------------------------------------ */

/**
 * Create a new account.
 *
 * Guards against duplicate usernames/emails first, then hashes the
 * password, writes the row, and returns the persisted user.
 * Returns a discriminated `{ error }` result on failure so callers
 * can show friendly messages.
 */
export async function registerUser(input: {
  username: string;
  email: string;
  password: string;
}) {
  // Reject if the username is already taken.
  if (await getUserByUsername(input.username)) {
    return { error: "USERNAME_TAKEN" as const };
  }
  // Reject if the email is already registered.
  if (await getUserByEmail(input.email)) {
    return { error: "EMAIL_TAKEN" as const };
  }

  // Hash + persist the new user.
  const passwordHash = await hashPassword(input.password);
  await createUser({
    username: input.username,
    email: input.email,
    passwordHash,
    name: input.username,
  });

  // Re-read the row so the caller gets the full persisted user object.
  const user = await getUserByUsername(input.username);
  if (!user) return { error: "CREATION_FAILED" as const };

  return { user };
}

/**
 * Validate a username/password pair and return the matching user
 * (or `null` if the credentials are wrong).
 */
export async function authenticateUser(input: {
  username: string;
  password: string;
}) {
  const user = await getUserByUsername(input.username);
  if (!user) return null;

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) return null;

  return user;
}

export { hashPassword, verifyPassword };

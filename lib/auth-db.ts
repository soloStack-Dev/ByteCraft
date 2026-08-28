import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users, type NewUser } from "@/db/schema";
import { z } from "zod";

const scryptAsync = promisify(scrypt);

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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${buf.toString("hex")}`;
}

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

export async function getUserByUsername(username: string) {
  const db = await getDb();
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));
  return user;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}

export async function createUser(data: NewUser) {
  const db = await getDb();
  const [result] = await db.insert(users).values(data);
  return result;
}

export async function registerUser(input: {
  username: string;
  email: string;
  password: string;
}) {
  const existingUsername = await getUserByUsername(input.username);
  if (existingUsername) {
    return { error: "USERNAME_TAKEN" as const };
  }
  const existingEmail = await getUserByEmail(input.email);
  if (existingEmail) {
    return { error: "EMAIL_TAKEN" as const };
  }

  const passwordHash = await hashPassword(input.password);
  await createUser({
    username: input.username,
    email: input.email,
    passwordHash,
    name: input.username,
  });

  const user = await getUserByUsername(input.username);
  if (!user) return { error: "CREATION_FAILED" as const };

  return { user };
}

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

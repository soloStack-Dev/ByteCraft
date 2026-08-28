import { os } from "@orpc/server";
import { z } from "zod";
import { registerUser, authenticateUser, getUserByEmail } from "@/lib/auth-db";
import type { User } from "@/db/schema";

export interface PublicUser {
  id: number;
  username: string;
  email: string;
  name: string | null;
}

function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
  };
}

export const signupInputSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50)
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, underscores"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginInputSchema = z.object({
  usernameOrEmail: z.string().min(1, "Username or email is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignupResult =
  | { user: PublicUser }
  | { error: "USERNAME_TAKEN" | "EMAIL_TAKEN" | "CREATION_FAILED" };

export type LoginResult =
  | { user: PublicUser }
  | { error: "INVALID_CREDENTIALS" };

export const signupProcedure = os
  .input(signupInputSchema)
  .handler(async ({ input }): Promise<SignupResult> => {
    const result = await registerUser({
      username: input.username,
      email: input.email,
      password: input.password,
    });
    if ("error" in result) return result;
    return { user: toPublicUser(result.user) };
  });

export const loginProcedure = os
  .input(loginInputSchema)
  .handler(async ({ input }): Promise<LoginResult> => {
    const user = await authenticateUser({
      username: input.usernameOrEmail,
      password: input.password,
    });
    if (user) return { user: toPublicUser(user) };

    const byEmail = await getUserByEmail(input.usernameOrEmail);
    if (byEmail) {
      const valid = await authenticateUser({ username: byEmail.username, password: input.password });
      if (valid) return { user: toPublicUser(valid) };
    }

    return { error: "INVALID_CREDENTIALS" };
  });

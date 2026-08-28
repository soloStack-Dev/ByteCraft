"use client";

import { useServerFunction } from "@orpc/next/hooks";
import { signup as signupAction, login as loginAction } from "./actions";
import type { SignupResult, LoginResult } from "./contract";

export function useSignup() {
  return useServerFunction(signupAction);
}

export function useLogin() {
  return useServerFunction(loginAction);
}

export type { SignupResult, LoginResult } from "./contract";

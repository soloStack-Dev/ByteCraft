"use server";

import { createServerFunction } from "@orpc/next";
import { signupProcedure, loginProcedure } from "./contract";

export const signup = createServerFunction(signupProcedure);
export const login = createServerFunction(loginProcedure);

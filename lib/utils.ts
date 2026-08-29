import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn – tiny class-name combiner used everywhere.
 *
 * 1. clsx:   joins conditional class names into a single string.
 * 2. twMerge: resolves conflicting Tailwind utilities (e.g. keeps the
 *             LAST `p-*`/`text-*` instead of emitting both).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


/**
 * styles.ts
 * ------------------------------------------------------------------
 * Central store for reusable Tailwind class strings.
 *
 * WHY THIS FILE EXISTS
 * The same long class strings were previously copy-pasted across many
 * pages/forms (e.g. the input styling appeared 11+ times). Keeping them
 * in ONE place means:
 *   1. A visual change only needs to be made here, not in 10 files.
 *   2. Look & feel stays consistent across the whole app.
 * ------------------------------------------------------------------
 */

/**
 * Base styling for every text input (auth forms + billing card fields).
 * Icon sits on the left, hence the `pl-11` (44px) left padding.
 * A pink focus ring signals the user the field is active.
 */
export const inputClassName =
  "w-full rounded-lg border border-border-strong bg-card py-3 pl-11 pr-4 text-sm " +
  "text-foreground placeholder:text-faint outline-none transition-all " +
  "focus:border-[rgba(244,166,193,0.5)] focus:shadow-[0_0_0_3px_rgba(244,166,193,0.1)]";

/**
 * Styling for the shared "something went wrong" alert box
 * used by both the Login and Signup forms.
 */
export const formErrorClassName =
  "rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400";

/**
 * Soft drop shadow shared by cards (features, blog, pricing).
 * Keeps the raised-card look consistent site-wide.
 */
export const cardShadow = "0 4px 20px rgba(0,0,0,0.2)";

/**
 * Signature pink/lavender gradient Call-To-Action button.
 * The dark (#0f0f11) text is intentional and works on both themes.
 */
export const gradientButtonClassName =
  "cta-gradient rounded-lg py-3.5 text-[12px] font-bold uppercase tracking-wider " +
  "text-[#0f0f11] transition-all hover:brightness-110 disabled:opacity-70";

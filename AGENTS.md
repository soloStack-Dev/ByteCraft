<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Package manager

**bun** — `packageManager: "bun@1.3.14"` in package.json. Use `bun` for all installs/scripts (not npm/yarn/pnpm).

## Commands

| Task | Command |
|---|---|
| Dev server | `bun run dev` |
| Build | `bun run build` |
| Lint | `bun run lint` |
| Typecheck | `bunx tsc --noEmit` |
| Docker build & run | `docker compose up --build` |

No test suite is configured.

## Architecture

- **Next.js 16.3.3** App Router with `output: "standalone"`.
- **Convex** is the hosted database (schema at `convex/schema.ts`). No local database runs — `NEXT_PUBLIC_CONVEX_URL` and `CONVEX_DEPLOYMENT` are the only DB config needed.
- **Resend** sends transactional email (`RESEND_API_KEY`). API routes `app/api/contact/route.ts` and `app/api/feedback/route.ts` call Resend lazily (instantiated inside the handler, not at module scope — see Docker section).
- **Tailwind CSS v4** — config lives in `app/globals.css` (`@theme inline`), not in a JS config file. PostCSS uses `@tailwindcss/postcss`.
- **shadcn/ui** components at `components/ui/`. Style: `base-nova`, icons: `lucide`.
- Static data lives in `JsonDB/*.json`. Route pages read these at build time.
- Path alias: `@/*` maps to project root.

## Routes

| Path | Type | Notes |
|---|---|---|
| `/` | static | Home page |
| `/about` | static | |
| `/services` | static | Pricing tiers |
| `/contact` | static | Blog feed + contact form + feedback form |
| `/api/contact` | dynamic | Resend email for contact submissions |
| `/api/feedback` | dynamic | Resend email for feedback |

## Docker gotchas

- **`NEXT_PUBLIC_*` vars must be available at build time** — Next.js inlines them into client bundles. The Dockerfile passes them as `ARG`/`ENV` in the builder stage. `docker-compose.yml` forwards them as both `build.args` and `environment`.
- **Resend init must be lazy** — `new Resend(process.env.RESEND_API_KEY)` must be inside the request handler, not at module scope. Next.js evaluates route modules during `next build` (page data collection) and the env var is absent, causing a build failure.
- **Bun 1.3.14 segfaults on exit inside Docker** (WSL2, Linux x64 baseline). The `next build` output is written to disk before the crash. If this blocks you, change the builder stage `FROM` to `node:22-alpine` and replace `bun run build` with `npx next build`.
- `.env` (not `.env.local`) is what `docker compose` reads. Copy `.env.local` to `.env` before composing.
- The runner uses `node:22-alpine` with a non-root `nextjs` user on port 3000.

## Deprecation notes

Several legacy dependencies remain in package.json but are not used in the active codebase: `@clerk/nextjs`, `next-auth`, `drizzle-orm`, `drizzle-kit`, `mysql2`, `@orpc/*`. They can be removed when convenient.

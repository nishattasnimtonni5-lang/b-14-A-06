# AGENTS.md

Single Next.js 16 (App Router) app: "Fit Log", a workout library. Not a monorepo. No tests, no CI, no formatter.

## Commands

- Install: `npm ci`.
- Lint: `npm run lint` (bare `eslint`, flat config in `eslint.config.mjs`) — expected clean, 0 problems.
- Typecheck: `npm run typecheck` (`tsc --noEmit`) only passes **after** `next dev` or `next build` has generated `next-env.d.ts` and `.next/types`. On a fresh clone it fails with `Cannot find name 'LayoutProps'` and `Cannot find module '@/assets/*.png'`.
- Tests: `npm test` (Vitest + Testing Library, jsdom) — colocated `src/**/*.test.{ts,tsx}`; mocks for `next/link`, `next/image`, `react-toastify` live in each test.
- Real verification: `npm run build` — compiles **and** runs Next's own TypeScript pass. Use this as lint+typecheck combined before claiming done.
- Dev server: `npm run dev`.
- npm 12 blocks git dependencies (`allow-git=none`, fails `EALLOWGIT`) and install scripts by default. Adding a `git+ssh` dep to `package.json` will break `npm ci` for everyone — the `unrs-resolver` postinstall warning is harmless (lint and build pass without it).

## How it's wired

- Routes in `src/app`: `/` library (server component, statically prerendered), `/apps` My Plan (client component), `/apps/[id]` details (server component, `await params` — params is a Promise), `not-found.tsx`.
- The My Plan tab is URL-driven (`/apps?tab=saved`, read with `useSearchParams`). It must stay inside a `<Suspense>` boundary or `next build` fails on the prerendered `/apps` route; new tabs need matching `<Link>`s in `NavBar.tsx`.
- Data layer: `src/lib/Apps.ts` → `https://api.api-store.workers.dev/api/fitlog`. Both fetchers throw on `!res.ok` and failures surface through `src/app/error.tsx`. `getAllCategory` revalidates every 5 min (so `/` is ISR, not frozen), `getWorkoutDetails` every 60s. `npm run build` still needs the API reachable because `/` prerenders.
- State: `src/app/context/planStore.ts` keeps `todayPlan`/`savedPlan` in a localStorage-backed external store; `PlanContext.tsx` exposes it through `useSyncExternalStore` (provider mounted in `src/app/layout.tsx`). Keep that shape: `react-hooks/set-state-in-effect` rejects setState-in-effect hydration, and the store's server snapshot must stay empty or prerendered HTML mismatches. Consumers bail with `if (!context) return null`.
- Toasts: `react-toastify`, `<ToastContainer/>` rendered in the root layout (outside the provider). Don't reach for react-hot-toast.
- Path alias `@/*` → `src/*`. Shared type is `Iworkout` (lowercase `w`) in `src/types/workout.type.ts`.

## Styling

- Tailwind v4 CSS-first: config lives in `src/app/globals.css` (`@import "tailwindcss"`, `@plugin "daisyui"`) plus `postcss.config.mjs`. There is no `tailwind.config.*` — don't create one.
- Dark theme, accent `#C2F800` via arbitrary values, `md:` breakpoint for desktop layouts.
- Font: `next/font` Oswald exposed as `--font-oswald`, applied to `body`.
- `next.config.ts` allows images from any https host (`hostname: '**'`), so remote `workout.image` URLs work as-is.

## Gotchas

- `README.md` is stale: it claims Redux and `react-hot-toast`; the code uses React context and `react-toastify`. Trust the code.
- Icons come from `react-icons` only — don't add icon libraries, and never add a `git+ssh` dependency (npm 12 blocks it, `npm ci` fails `EALLOWGIT`). `@iconify-react/bx` and `@lineiconshq/react-lineicons` were removed for exactly this reason.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

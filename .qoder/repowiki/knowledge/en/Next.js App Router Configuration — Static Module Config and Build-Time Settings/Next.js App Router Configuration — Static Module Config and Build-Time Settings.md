---
kind: configuration_system
name: Next.js App Router Configuration — Static Module Config and Build-Time Settings
category: configuration_system
scope:
    - '**'
source_files:
    - next.config.ts
    - app/config/emailjs.ts
    - package.json
    - postcss.config.mjs
    - tsconfig.json
    - eslint.config.mjs
---

## What system/approach is used

This repository uses a minimal, code-first configuration approach centered on Next.js's built-in configuration files. There are no external configuration libraries (e.g., dotenv, config, convict), no `.env` files committed to the repo, and no runtime config loader. All application-level settings are declared as TypeScript `const` objects or exported from dedicated module files that are imported where needed.

## Key files and packages

- `next.config.ts` — Next.js build-time configuration: image optimization formats (`image/avif`, `image/webp`), device/image size breakpoints, cache TTL, response compression, and removal of the `X-Powered-By` header.
- `app/config/emailjs.ts` — Centralized EmailJS credentials and template IDs exposed as a typed `as const` object (`EMAILJS_CONFIG`) plus a `CONTACT_EMAIL` constant. This is the only place EmailJS service/template/public-key values live.
- `package.json` — Declares runtime dependencies (`next`, `react`, `@emailjs/browser`, `framer-motion`, etc.) and dev dependencies; scripts define the standard `dev` / `build` / `start` / `lint` entry points.
- `postcss.config.mjs` — PostCSS plugin configuration for Tailwind CSS v4.
- `tsconfig.json` — TypeScript compiler options for the project.
- `eslint.config.mjs` — ESLint configuration (references `next-env.d.ts` in rules).
- `scripts/compress-images.mjs` — One-off utility script (not part of the runtime config system).

## Architecture and conventions

1. **Single source of truth per concern** — Each configuration domain lives in its own file:
   - Next.js build behavior → `next.config.ts`
   - EmailJS integration keys/templates → `app/config/emailjs.ts`
   - Styling pipeline → `postcss.config.mjs`
   - Language/tooling → `tsconfig.json`, `eslint.config.mjs`

2. **TypeScript `as const` exports** — The EmailJS config is exported as a frozen literal type (`export const EMAILJS_CONFIG = { ... } as const`), giving consumers full compile-time inference of the shape and values. This prevents accidental mutation and enables strict typing across the app.

3. **No environment variable loading at runtime** — A grep for `process.env` / `NEXT_PUBLIC_` / `env` finds no usage in application code. Secrets and service identifiers are embedded directly in `app/config/emailjs.ts`. There is no `.env` file in the repository root or `app/` directory. This means secrets are checked into version control alongside source code — a notable security consideration.

4. **Build-time vs. runtime split** — Only Next.js build flags (`next.config.ts`) are configured via the framework's config mechanism. Application behavior flags (e.g., whether to enable a feature) are not present; the codebase appears feature-flag-free.

5. **Config consumption pattern** — Components import configuration modules directly (e.g., importing `EMAILJS_CONFIG` from `@/config/emailjs` or a relative path). There is no config context provider, store, or middleware layer — configs are consumed as plain constants.

## Conventions and constraints

- **Configuration is static and immutable**: All config objects use `as const` assertions, enforcing immutability at the type level.
- **No runtime env var resolution**: The app does not read `process.env` or any environment-loading library. Values are hard-coded in source files.
- **Next.js-only build configuration**: All build-time customization goes through `next.config.ts`; there are no custom webpack loaders or external build tool configs beyond PostCSS.
- **EmailJS keys are centralized**: Service ID, template IDs, public key, and recipient email are all defined in one module (`app/config/emailjs.ts`) rather than scattered across components.
- **Image optimization is pre-tuned**: Device sizes, image sizes, and cache TTL are explicitly set in `next.config.ts`, indicating a deliberate performance tuning decision rather than defaults.
- **No secret management strategy observed**: Because there is no `.env` file or secret injection mechanism visible, this repo relies on developers managing sensitive values outside of version control (e.g., by replacing placeholder values before deployment).
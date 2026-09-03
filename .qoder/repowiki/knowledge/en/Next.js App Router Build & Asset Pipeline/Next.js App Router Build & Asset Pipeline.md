---
kind: build_system
name: Next.js App Router Build & Asset Pipeline
category: build_system
scope:
    - '**'
source_files:
    - package.json
    - next.config.ts
    - scripts/compress-images.mjs
    - postcss.config.mjs
    - tsconfig.json
    - eslint.config.mjs
---

This repository is a single Next.js 16 (App Router) portfolio site. The build system is intentionally minimal — it relies on the framework's built-in toolchain rather than custom Makefiles, Dockerfiles, or CI pipelines.

**Build toolchain and scripts**
- `package.json` defines four npm scripts: `dev` (`next dev`), `build` (`next build`), `start` (`next start`), and `lint` (`eslint`). There are no separate packaging or release scripts; the production artifact is produced by `next build`, which generates an optimized static/bundle output in `.next/`.
- TypeScript compilation is configured via `tsconfig.json` and driven by Next's own compiler; a generated `tsconfig.tsbuildinfo` confirms incremental builds are used.
- Linting uses ESLint 9 with `eslint-config-next`; there is no pre-commit hook or CI step enforcing linting at commit time.

**Image optimization pipeline**
- `next.config.ts` configures Next's built-in image optimizer to serve AVIF/WebP variants from PNG/JPG sources, with responsive breakpoints (`deviceSizes`: 640–1920px) and small icon sizes (`imageSizes`: 16–384px). Optimized images are cached for 60 days (`minimumCacheTTL`).
- A standalone Node script `scripts/compress-images.mjs` uses `sharp` to losslessly re-compress large assets (>200 KB threshold) in `public/` before committing them. It writes to a temporary file and atomically replaces the original, reporting bytes saved per image.

**Runtime configuration**
- Response compression is enabled globally (`compress: true`).
- The `X-Powered-By` header is stripped (`poweredByHeader: false`) as a minor security hardening measure.

**Deployment model**
- No Dockerfile, Makefile, shell build scripts, or CI/CD YAML files exist in the repo.
- The README explicitly recommends deploying via Vercel (the creators of Next.js) and links to Next.js deployment docs. This indicates the intended deployment surface is Vercel's managed build, which consumes the same `next build` artifact.

**Conventions observed**
- All build logic lives in `package.json` scripts plus `next.config.ts`; there is no custom webpack/postcss override beyond what Tailwind v4 + `@tailwindcss/postcss` provides.
- Static assets live under `public/` and are expected to be pre-optimized by the `scripts/compress-images.mjs` utility before being committed.
- Versioning is conventional semver in `package.json` (`"version": "0.1.0"`) but there is no automated version bumping or changelog generation in the build scripts.
---
kind: dependency_management
name: NPM-based Dependency Management for Next.js Portfolio
category: dependency_management
scope:
    - '**'
source_files:
    - package.json
    - package-lock.json
    - next.config.ts
    - postcss.config.mjs
    - eslint.config.mjs
    - tsconfig.json
---

## System / Approach

This project uses npm as its package manager, declared via the presence of `package.json` and a committed `package-lock.json` (lockfileVersion 3). All third-party dependencies are resolved from the public npm registry (`https://registry.npmjs.org`) — no private registry, `.npmrc`, or vendored `node_modules` is present in the repository.

## Key Files

- `package.json` — declares runtime and dev dependencies, plus npm scripts (`dev`, `build`, `start`, `lint`).
- `package-lock.json` — deterministic lockfile pinning every transitive dependency with exact versions and integrity hashes; committed to version control so installs are reproducible across environments.
- `next.config.ts` — Next.js build-time config that pulls in framework-specific tooling (images, compression) but does not declare additional dependencies.
- `postcss.config.mjs` and `eslint.config.mjs` — configuration files for Tailwind CSS v4 and ESLint v9 respectively, which are installed as devDependencies.
- `tsconfig.json` — TypeScript compiler options consumed by `typescript` (devDependency).

## Architecture and Conventions Observed

- Single-source-of-truth manifest: all dependencies live in `package.json`; nothing is manually copied into the repo.
- Lockfile-driven installs: the committed `package-lock.json` ensures that `npm ci` produces an identical tree on CI and local machines.
- Semantic version ranges: runtime dependencies use caret ranges (`^4.4.1`, `^2.1.1`, `^12.38.0`, etc.), allowing patch/minor updates while keeping major-version compatibility. Dev dependencies follow the same pattern (`^5`, `^9`, `^19`, `^20`).
- Peer/compatible versions: framework packages are pinned to exact versions where required by the ecosystem — `next: 16.2.4`, `react: 19.2.4`, `react-dom: 19.2.4`, `eslint-config-next: 16.2.4` — matching the Next.js 16 / React 19 stack.
- No vendoring: there is no `vendor/`, `third_party/`, or checked-in `node_modules`. Dependencies are always fetched at install time.
- Public registry only: no `.npmrc`, `yarn.lock`, `pnpm-lock.yaml`, or alternative lockfile exists; all packages resolve from the default npm registry.
- Scripts as entry points: the npm scripts in `package.json` (`dev`, `build`, `start`, `lint`) are the documented way to interact with the dependency graph; no Makefile, custom build script, or CI-only tooling is used.

## Constraints and Rules

- The lockfile is tracked in version control, so any change to `package.json` should be followed by regenerating `package-lock.json` to keep the tree deterministic.
- Because runtime deps use `^` ranges, automated update tools (e.g., Dependabot, Renovate) would bump minor/patch versions automatically; major version bumps require manual review since they can break the Next.js 16 + React 19 pairing.
- There is no mechanism in this repo for installing private/internal packages (no private registry URL, no auth tokens, no scoped private packages declared).

## Notable Dependencies

| Category | Packages | Purpose |
|---|---|---|
| Framework | `next` 16.2.4, `react` 19.2.4, `react-dom` 19.2.4 | App Router site runtime |
| UI / Animation | `framer-motion` ^12.38.0, `lucide-react` ^1.8.0, `clsx` ^2.1.1, `tailwind-merge` ^3.5.0 | Animations, icons, class merging, styling |
| Styling pipeline | `tailwindcss` ^4, `@tailwindcss/postcss` ^4, PostCSS config | Tailwind CSS v4 build integration |
| Email | `@emailjs/browser` ^4.4.1 | Client-side email sending via EmailJS |
| Tooling (dev) | `typescript` ^5, `eslint` ^9, `eslint-config-next` 16.2.4, `@types/*` | TS compilation, linting, type definitions |

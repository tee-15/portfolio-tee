---
kind: frontend_style
name: Tailwind CSS v4 Design Tokens + Dark Portfolio Theme
category: frontend_style
scope:
    - '**'
source_files:
    - app/globals.css
    - app/layout.tsx
    - postcss.config.mjs
    - package.json
    - next.config.ts
    - app/components/Hero.tsx
    - app/components/Work.tsx
    - app/components/ContactModal.tsx
    - app/hooks/useReducedMotion.ts
    - app/hooks/useMouseParallax.ts
---

## Styling System Overview

The portfolio uses **Tailwind CSS v4** (via `@tailwindcss/postcss`) with the new `@theme` directive to define a centralized design token system, combined with **Framer Motion** for animations and **Lucide React** icons. There is no separate CSS framework or component library — styling is composed entirely from Tailwind utility classes and a small set of custom CSS variables.

## Design Tokens (`app/globals.css`)

All visual tokens live in an inline `@theme` block at the top of `globals.css`, making them available as both CSS variables and Tailwind utilities:

- **Colors**: `--color-background` (#0a0a0a), `--color-foreground` (#f5f0e8), `--color-surface` (#141414), `--color-surface-light` (#1e1e1e), `--color-accent` (#c45c3e), `--color-accent-hover` (#d4714f), `--color-accent-secondary` (#d4a574), `--color-accent-tertiary` (#5a9e8f), `--color-muted` (#8a8a8a), `--color-border` (#2a2a2a).
- **Fonts**: `--font-sans` → Outfit, `--font-mono` → Geist Mono, `--font-cursive` → Dancing Script (loaded via `next/font/google` in `layout.tsx`).
- These map directly to Tailwind's `bg-*`, `text-*`, `border-*`, `font-*` utilities throughout components.

## Typography & Layout Conventions

- The root `<html>` element applies `antialiased` and injects font variable classes from `next/font/google` (Outfit, Geist_Mono, Dancing_Script) so they are available as CSS custom properties.
- The `<body>` uses semantic token classes: `bg-background text-foreground`.
- Global styles include smooth scrolling, selection color (`accent`), and a custom scrollbar styled with `::-webkit-scrollbar` pseudo-elements.
- A `.gradient-text` utility class provides a brand gradient (foreground → accent → accent-secondary) using `background-clip: text`.

## Visual Effects Layer

A global noise overlay and cursor spotlight are applied via fixed-position classes defined in `globals.css`:
- `.noise-overlay`: SVG-based fractal noise at 2.5% opacity across the viewport.
- `.cursor-spotlight`: radial gradient following mouse position via CSS `var(--mouse-x, --mouse-y)`.
- `.glow-orb`: blurred circular decorative elements used by the shared `Decorations.tsx` component.

## Responsive Strategy

- Mobile-first breakpoints follow Tailwind defaults (sm, md, lg, xl). Components use responsive prefixes extensively (e.g., `px-6 lg:px-8`, `hidden lg:block`, `lg:grid-cols-2`).
- The `useReducedMotion` hook reads `prefers-reduced-motion` and disables Framer Motion animations; a matching `@media (prefers-reduced-motion: reduce)` block in `globals.css` forces all transitions/animations to near-zero duration site-wide.
- Fine-pointer detection via `@media (pointer: fine)` hides the default cursor when the custom cursor is active.

## Animation & Interaction Model

- All motion is declarative via **Framer Motion** (`motion.div`, `AnimatePresence`, `whileInView`, `initial/animate/transition`).
- Mouse-driven parallax is abstracted into a shared `useMouseParallax` hook (`hooks/useMouseParallax.ts`) and a value helper `useMouseParallaxValue`, reused across Hero and Work sections.
- Decorative floating elements (rings, dots, plus signs, diagonal lines) are provided by the shared `Decorations.tsx` component and composited per section.

## Component-Level Styling Pattern

Components compose layout purely from Tailwind utilities — no per-component CSS files. Common patterns observed:
- Section containers: `relative py-32 px-6 lg:px-8 overflow-hidden` with decorative children layered absolutely behind content.
- Cards and interactive surfaces: `group` modifier for hover states, `hover:bg-surface/50`, `hover:border-accent`, `transition-colors duration-300/500`.
- Accent-driven state: buttons use `bg-accent hover:bg-accent-hover`, disabled variants use `disabled:bg-accent/50 disabled:cursor-not-allowed`.
- Modal overlays: `fixed inset-0 z-[100]` with `backdrop-blur-sm` and `bg-black/80`.
- Forms: consistent input styling via `bg-background border border-border text-foreground placeholder:text-muted/50 focus:border-accent transition-colors duration-300`.

## Build & PostCSS Pipeline

- `postcss.config.mjs` registers only `@tailwindcss/postcss` — no additional preprocessors (Sass, Less) or plugins.
- `next.config.ts` configures Next.js image optimization (AVIF/WebP output, device sizes, 60-day cache TTL) and enables response compression.
- Fonts are loaded at build time via `next/font/google` with `display: swap` to prevent FOIT.

## Constraints Observed

- No external UI kit (no shadcn, MUI, etc.) — every visual element is built from Tailwind utilities and custom CSS variables.
- All colors must come from the central `@theme` token set; hardcoded hex values appear only in data objects (per-project `color` fields) that drive dynamic accent accents.
- Animations must respect `prefers-reduced-motion`; any new motion should be gated through the existing `useReducedMotion` hook pattern.
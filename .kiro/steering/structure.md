# Project Structure & Organization

## Directory Layout

```
portfolio-tee/
├── .kiro/                          # Kiro configuration
│   └── steering/                   # Steering documents
├── app/                            # Next.js App Router directory
│   ├── components/                 # Reusable React components
│   │   ├── ContactModal.tsx        # Contact form modal
│   │   ├── CustomCursor.tsx        # Custom cursor implementation
│   │   ├── Decorations.tsx         # Decorative elements (orbs, rings, brackets)
│   │   ├── GlobalEffects.tsx       # Global visual effects
│   │   ├── Hero.tsx                # Hero section with parallax
│   │   ├── Navigation.tsx          # Navigation bar
│   │   ├── ProjectModal.tsx        # Project details modal
│   │   └── Work.tsx                # Work/projects section
│   ├── config/                     # Configuration files
│   │   └── emailjs.ts              # EmailJS service setup
│   ├── hooks/                      # Custom React hooks
│   │   ├── useMouseParallax.ts     # Parallax effect hook
│   │   └── useReducedMotion.ts     # Accessibility hook for motion preferences
│   ├── layout.tsx                  # Root layout wrapper
│   ├── page.tsx                    # Main page (home)
│   ├── globals.css                 # Global styles & theme definitions
│   └── favicon.ico                 # Favicon
├── public/                         # Static assets
│   ├── cartoon-woman-wearing-glasses.jpg  # Hero image
│   ├── hugo-ride.png               # Project image
│   ├── hugo-ride-gallery-*.png     # Project gallery images
│   └── *.svg                       # Icon assets
├── .gitignore                      # Git ignore rules
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies & scripts
├── package-lock.json               # Dependency lock file
├── postcss.config.mjs              # PostCSS configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

## Component Organization

### Page Components (in `app/`)
- **page.tsx**: Main entry point containing About, Services, and Contact sections
- **layout.tsx**: Root layout with metadata and global providers

### Feature Components (in `app/components/`)

**Layout & Navigation**
- `Navigation.tsx`: Header navigation with links to sections

**Sections**
- `Hero.tsx`: Hero section with parallax effects and CTA
- `Work.tsx`: Projects/work showcase section
- `ContactModal.tsx`: Modal for contact form

**Visual Effects & Decorations**
- `Decorations.tsx`: Reusable decorative elements (GlowOrb, FloatingRing, FloatingDot, FloatingPlus, SectionNumber, DottedGrid, CornerBrackets, DiagonalLine)
- `CustomCursor.tsx`: Custom cursor implementation
- `GlobalEffects.tsx`: Global visual effects (noise overlay, cursor spotlight)
- `ProjectModal.tsx`: Modal for displaying project details

### Hooks (in `app/hooks/`)
- `useMouseParallax.ts`: Manages mouse tracking and parallax calculations
- `useReducedMotion.ts`: Detects and respects user's motion preferences

### Configuration (in `app/config/`)
- `emailjs.ts`: EmailJS service initialization and configuration

## Styling Architecture

**Global Styles** (`app/globals.css`)
- Tailwind CSS imports
- Custom theme variables (colors, fonts)
- Utility classes (`.gradient-text`, `.noise-overlay`, `.cursor-spotlight`)
- CSS resets and scrollbar styling
- Reduced motion media queries

**Component Styles**
- Inline Tailwind classes in JSX
- Framer Motion inline styles for animations
- No separate CSS files per component (co-located with JSX)

## Code Style & Conventions

### TypeScript
- Strict mode enabled
- Type annotations for all function parameters and returns
- Use `interface` for component props
- Use `type` for utility types

### React Components
- Functional components with hooks
- `"use client"` directive for client-side components
- Props destructuring in function parameters
- Memoization with `motion.div` for animated elements

### Naming Conventions
- **Components**: PascalCase (e.g., `Hero.tsx`, `ContactModal.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useMouseParallax.ts`)
- **Files**: Match component/export name
- **CSS Classes**: kebab-case (Tailwind default)
- **Variables/Functions**: camelCase

### Animation Patterns
- Use Framer Motion's `motion` components
- Define animation variants as objects (e.g., `fadeInUp`, `staggerContainer`)
- Use `whileInView` for scroll-triggered animations
- Use `whileHover` and `whileTap` for interaction animations

### Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Respect `prefers-reduced-motion` via `useReducedMotion` hook
- Keyboard navigation support
- Color contrast compliance

## Asset Organization

**Images** (`public/`)
- Hero image: `cartoon-woman-wearing-glasses.jpg`
- Project images: `hugo-ride.png` and gallery variants
- SVG icons: `file.svg`, `globe.svg`, `window.svg`, etc.

**Fonts**
- Defined via CSS variables in `globals.css`
- `--font-outfit`: Main sans-serif font
- `--font-geist-mono`: Monospace font
- `--font-cursive`: Decorative cursive font

## Build & Deployment

- **Build Output**: `.next/` directory (generated)
- **Node Modules**: `node_modules/` (generated)
- **Source Control**: `.git/` directory with `.gitignore` rules

## Key Patterns

### Section Structure
Each major section (About, Services, Contact) follows this pattern:
1. Container with `useMouseParallax` for tracking
2. Background decorations (GlowOrb, FloatingRing, etc.)
3. Content grid with Framer Motion animations
4. Staggered children animations

### Modal Pattern
- State management with `useState`
- Conditional rendering based on `isOpen` prop
- Close handler passed as callback

### Parallax Pattern
- Use `useMouseParallax` hook for mouse tracking
- Use `useMouseParallaxValue` for individual element parallax
- Apply via Framer Motion's `style` prop

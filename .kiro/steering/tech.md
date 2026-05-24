# Tech Stack & Build System

## Framework & Runtime

- **Next.js 16.2.4**: React framework with App Router (using `"use client"` for client components)
- **React 19.2.4**: UI library
- **TypeScript 5**: Strict type checking enabled
- **Node.js**: Runtime environment

## Styling & UI

- **Tailwind CSS 4**: Utility-first CSS framework with custom theme
- **PostCSS 4**: CSS processing
- **Tailwind Merge 3.5.0**: Utility class merging to prevent conflicts
- **clsx 2.1.1**: Conditional className utility

## Animation & Interaction

- **Framer Motion 12.38.0**: React animation library for smooth transitions and parallax effects
- **Lucide React 1.8.0**: Icon library (used for service icons and UI elements)

## External Services

- **EmailJS 4.4.1**: Email service for contact form submissions (configured in `app/config/emailjs.ts`)

## Development Tools

- **ESLint 9**: Code linting with Next.js config
- **TypeScript Compiler**: Strict mode enabled

## Build & Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## TypeScript Configuration

- **Target**: ES2017
- **Strict Mode**: Enabled
- **Module Resolution**: Bundler
- **Path Aliases**: `@/*` maps to project root
- **JSX**: React 17+ transform

## Custom Theme (Tailwind)

Color palette defined in `globals.css`:
- **Background**: `#0a0a0a` (dark)
- **Foreground**: `#f5f0e8` (light cream)
- **Surface**: `#141414` (slightly lighter dark)
- **Accent**: `#c45c3e` (rust/terracotta)
- **Accent Secondary**: `#d4a574` (warm tan)
- **Accent Tertiary**: `#5a9e8f` (teal)
- **Muted**: `#8a8a8a` (gray)
- **Border**: `#2a2a2a` (dark gray)

## Key CSS Features

- **Gradient Text**: `.gradient-text` utility for multi-color text effects
- **Noise Overlay**: Subtle texture overlay for visual depth
- **Cursor Spotlight**: Dynamic radial gradient following mouse position
- **Reduced Motion Support**: Respects `prefers-reduced-motion` media query
- **Custom Scrollbar**: Styled for dark theme

## Project Structure

```
app/
├── components/        # React components
├── config/           # Configuration files (EmailJS)
├── hooks/            # Custom React hooks
├── layout.tsx        # Root layout
├── page.tsx          # Main page
└── globals.css       # Global styles & theme
```

## Performance Considerations

- Next.js Image optimization for responsive images
- Framer Motion for GPU-accelerated animations
- Lazy loading with `whileInView` for section animations
- Parallax effects use `useMouseParallax` hook to minimize re-renders

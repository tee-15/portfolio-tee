# Getting Started

<cite>
**Referenced Files in This Document**
- [package.json](file://package.json)
- [README.md](file://README.md)
- [next.config.ts](file://next.config.ts)
- [tsconfig.json](file://tsconfig.json)
- [postcss.config.mjs](file://postcss.config.mjs)
- [eslint.config.mjs](file://eslint.config.mjs)
- [.gitignore](file://.gitignore)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Development Server](#running-the-development-server)
5. [Building for Production](#building-for-production)
6. [Accessing the Local Site](#accessing-the-local-site)
7. [Verification Steps](#verification-steps)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Next Steps](#next-steps)

## Introduction
This guide helps you set up and run the portfolio website locally. It covers prerequisites, installation using npm or yarn, starting the development server, building for production, and verifying that everything works correctly. The project is a Next.js application with TypeScript, Tailwind CSS v4, ESLint, and PostCSS configured for modern web performance.

## Prerequisites
- Node.js: Use a recent LTS release (Node 18+). The project uses Next.js 16.x and modern tooling; an LTS version ensures compatibility and stability.
- A package manager: npm (comes with Node), yarn, pnpm, or bun are all supported by the scripts.
- A modern browser to view the site locally.

Notes:
- The repository does not include an .env file by default. Environment variables are optional and only needed if you add features that require them later.
- The project uses strict TypeScript settings and Tailwind CSS v4 via PostCSS.

**Section sources**
- [package.json:1-32](file://package.json#L1-L32)
- [tsconfig.json:1-35](file://tsconfig.json#L1-L35)
- [postcss.config.mjs:1-8](file://postcss.config.mjs#L1-L8)
- [.gitignore:1-42](file://.gitignore#L1-L42)

## Installation
Follow these steps to install dependencies and prepare the project for development.

1. Open your terminal and navigate to the project root directory.
2. Install dependencies using your preferred package manager:
   - npm: npm install
   - yarn: yarn install
   - pnpm: pnpm install
   - bun: bun install
3. Wait for the installation to complete. Dependencies will be installed into node_modules.

What this installs:
- Next.js framework and React runtime
- TypeScript and type definitions
- Tailwind CSS v4 and PostCSS integration
- ESLint configuration for Next.js and TypeScript
- Additional libraries used by the site (e.g., animation and UI utilities)

**Section sources**
- [package.json:1-32](file://package.json#L1-L32)
- [postcss.config.mjs:1-8](file://postcss.config.mjs#L1-L8)
- [eslint.config.mjs:1-19](file://eslint.config.mjs#L1-L19)

## Running the Development Server
Start the local development server with hot reloading enabled so changes appear instantly.

- Using npm: npm run dev
- Using yarn: yarn dev
- Using pnpm: pnpm dev
- Using bun: bun dev

After starting:
- The server typically runs on http://localhost:3000
- Any edits to source files will automatically refresh in the browser

You can also start the production server after building (see next section).

**Section sources**
- [package.json:1-32](file://package.json#L1-L32)
- [README.md:1-37](file://README.md#L1-L37)

## Building for Production
Create an optimized production build before deployment or testing the final output.

- Using npm: npm run build
- Using yarn: yarn build
- Using pnpm: pnpm build
- Using bun: bun build

After a successful build:
- Start the production server with npm start (or equivalent)
- The production build is optimized for performance and caching

Optional optimizations applied in this project:
- Image formats and sizes configured for efficient delivery
- Response compression enabled
- Security header minimized

**Section sources**
- [package.json:1-32](file://package.json#L1-L32)
- [next.config.ts:1-20](file://next.config.ts#L1-L20)

## Accessing the Local Site
- Open your browser and visit http://localhost:3000 to view the running site.
- If you started the production server, use the same URL after running the start script.
- The app includes responsive design and accessibility metadata for better cross-device experiences.

**Section sources**
- [README.md:1-37](file://README.md#L1-L37)

## Verification Steps
Use these checks to confirm your setup is working correctly:

- Dev server starts without errors and opens at http://localhost:3000
- Editing any page or component updates the browser automatically
- Build completes successfully with no TypeScript or lint errors
- Linting passes: npm run lint (or equivalent)
- Optional: Run ESLint to verify code quality rules are satisfied

If you see errors during build or dev, check the troubleshooting section below.

**Section sources**
- [package.json:1-32](file://package.json#L1-L32)
- [eslint.config.mjs:1-19](file://eslint.config.mjs#L1-L19)

## Troubleshooting Guide
Common issues and how to resolve them:

- Node.js version mismatch
  - Symptom: Errors when installing or running scripts
  - Fix: Use a recent LTS Node.js version (18+) as recommended by modern Next.js projects

- Missing or stale dependencies
  - Symptom: Module not found or unexpected behavior
  - Fix: Delete node_modules and reinstall dependencies, then restart the dev server

- Port already in use
  - Symptom: Dev server fails to start due to port conflict
  - Fix: Stop other processes using port 3000 or change the port in your environment

- TypeScript or ESLint errors blocking build
  - Symptom: Build fails with type or lint errors
  - Fix: Resolve reported issues in your code or disable specific rules temporarily while debugging

- Tailwind or PostCSS issues
  - Symptom: Styles not applied or build warnings
  - Fix: Ensure dependencies are installed and PostCSS config is present; reinstall if necessary

- Environment variables not loading
  - Symptom: Features relying on env vars fail
  - Fix: Create a .env file in the project root if required by your feature; ensure it is not committed to version control

- Large images or slow initial load
  - Symptom: Slow performance or large bundle size
  - Fix: Optimize images and leverage built-in image optimization configured in the project

- Cache-related issues
  - Symptom: Stale assets or unexpected behavior after updates
  - Fix: Clear .next and build caches, then rebuild

**Section sources**
- [package.json:1-32](file://package.json#L1-L32)
- [next.config.ts:1-20](file://next.config.ts#L1-L20)
- [postcss.config.mjs:1-8](file://postcss.config.mjs#L1-L8)
- [eslint.config.mjs:1-19](file://eslint.config.mjs#L1-L19)
- [.gitignore:1-42](file://.gitignore#L1-L42)

## Next Steps
- Explore the app structure under the app directory to understand pages and components
- Customize content, styles, and configuration as needed
- Deploy to Vercel or another hosting provider following Next.js deployment guidelines

[No sources needed since this section provides general guidance]
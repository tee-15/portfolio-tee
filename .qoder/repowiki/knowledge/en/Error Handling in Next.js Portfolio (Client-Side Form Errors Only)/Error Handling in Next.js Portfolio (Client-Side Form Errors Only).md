---
kind: error_handling
name: Error Handling in Next.js Portfolio (Client-Side Form Errors Only)
category: error_handling
scope:
    - '**'
source_files:
    - app/components/ContactModal.tsx
    - app/config/emailjs.ts
---

## What system/approach is used

This repository is a client-side Next.js portfolio site with **no centralized error-handling framework**. There are no custom error types, no `errors/` directory, no global error boundary files (`error.tsx`, `not-found.tsx`, `global-error.tsx`), no middleware, and no server-side error propagation. The only error handling present is localized to the contact form's EmailJS submission.

## Key files and packages

- `app/components/ContactModal.tsx` — the sole location of runtime error handling in the codebase.
- `app/config/emailjs.ts` — configuration constants; contains no validation or error logic.

## Architecture and conventions

The only error-handling pattern is a simple try/catch around an asynchronous EmailJS call inside the `handleSubmit` handler:

1. A local `error` state string is initialized empty and cleared on input change and before each submit.
2. The form submission wraps the EmailJS calls in a `try { ... } catch { setError("Failed to send message. Please try again or email me directly."); }` block.
3. On success, the notification email to the owner is sent as fire-and-forget via `.catch(() => {})` so that a missing notify template does not fail the user experience.
4. The error string is rendered inline as a styled div with red borders and background when non-empty.
5. A `submitted` success state replaces the form with a confirmation message after successful send.

There is no distinction between network errors, template errors, or validation errors — all failures collapse into one generic user-facing message.

## Conventions and constraints

Observed conventions (descriptive):

- Errors are surfaced as plain strings stored in React component state, not as typed error objects or sentinel values.
- Asynchronous side effects (EmailJS) are wrapped in try/catch at the call site; there is no shared utility or interceptor.
- Non-critical side effects (owner notification email) use `.catch()` with an empty handler to degrade gracefully without blocking the primary action.
- No `throw` statements, no `Promise.reject`, no `console.error` usage, no `process.env` error codes, and no logging library is used anywhere in the codebase.
- There are no React Error Boundaries (`componentDidCatch` / `useEffect`-based boundaries) to catch rendering errors.
- Server routes do not exist in this App Router project beyond static route helpers (`robots.ts`, `sitemap.ts`), so there is no server-side error handling to observe.

Constraints enforced by the implementation:

- The contact form requires HTML5 `required` attributes on inputs, so client-side validation is delegated to the browser rather than application logic.
- The submit button is disabled while `isSubmitting` is true, preventing duplicate submissions during a pending request.
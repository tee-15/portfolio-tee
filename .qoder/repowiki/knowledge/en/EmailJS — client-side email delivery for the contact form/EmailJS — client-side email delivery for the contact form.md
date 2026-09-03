---
kind: external_dependency
name: EmailJS — client-side email delivery for the contact form
slug: emailjs
category: external_dependency
category_hints:
    - vendor_identity
    - auth_protocol
scope:
    - '**'
---

### EmailJS
- Role: Sends the visitor auto-reply and (when configured) a notification to the owner via Gmail templates.
- Integration point: `app/config/emailjs.ts` exports `EMAILJS_CONFIG` (`SERVICE_ID`, `TEMPLATE_ID`, `NOTIFY_TEMPLATE_ID`, `PUBLIC_KEY`) consumed by `ContactModal.tsx`; recipient address is `temitopedml@gmail.com`.
- Auth model: Public-key based init from the browser; no server-side secret required. The `PUBLIC_KEY` is intentionally client-exposed.
- Known gap: `NOTIFY_TEMPLATE_ID` is still the placeholder `'YOUR_NOTIFY_TEMPLATE_ID'`, so the owner never receives submission notifications — only the visitor auto-reply fires. A real template ID must be pasted in before launch.
- Verify exact template IDs and service wiring against the EmailJS dashboard.
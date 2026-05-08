// EmailJS Configuration
// Replace these with your actual EmailJS credentials from https://dashboard.emailjs.com/

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',      // e.g., 'service_abc123'
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',    // e.g., 'template_xyz789'
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',      // e.g., 'user_def456'
} as const;

// Template variables expected by EmailJS:
// - from_name: Sender's name
// - from_email: Sender's email
// - subject: Email subject
// - message: Email message content
// - to_email: Recipient email (set in EmailJS template or here)
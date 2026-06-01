// EmailJS Configuration
// Service:   Gmail service connected to temitopedml@gmail.com
// Template 1 (TEMPLATE_ID):        auto-reply sent to the person who filled the form
// Template 2 (NOTIFY_TEMPLATE_ID): notification sent to you with the form contents

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_a2lh92f',
  TEMPLATE_ID: 'template_5wbre9r',       // auto-reply to sender
  NOTIFY_TEMPLATE_ID: 'YOUR_NOTIFY_TEMPLATE_ID', // ← paste your new template ID here
  PUBLIC_KEY: 'Amq1OqDRF9uWz1cJm',
} as const;

// Recipient — all notifications go here
export const CONTACT_EMAIL = 'temitopedml@gmail.com';

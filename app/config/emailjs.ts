// EmailJS Configuration
// Setup steps:
// 1. Go to https://dashboard.emailjs.com and sign in / create a free account
// 2. Add an Email Service (Gmail recommended) → copy the Service ID
// 3. Create an Email Template with these variables:
//      {{from_name}}  — sender's name
//      {{from_email}} — sender's email
//      {{subject}}    — message subject
//      {{message}}    — message body
//      {{to_email}}   — set to temitopedml@gmail.com in the template "To Email" field
// 4. Copy the Template ID
// 5. Go to Account → copy your Public Key
// 6. Replace the placeholders below with your real values

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_a2lh92f',
  TEMPLATE_ID: 'template_5wbre9r',
  PUBLIC_KEY: 'Amq1OqDRF9uWz1cJm',
} as const;

// Recipient email — all contact form submissions go here
export const CONTACT_EMAIL = 'temitopedml@gmail.com';

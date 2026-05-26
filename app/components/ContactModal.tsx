"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, CONTACT_EMAIL } from "../config/emailjs";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

function ContactForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: CONTACT_EMAIL,
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
        onSubmitted();
      }, 2500);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full min-h-[400px] flex flex-col items-center justify-center border border-accent bg-accent/5 p-8"
      >
        <div className="w-16 h-16 bg-accent flex items-center justify-center mb-6">
          <Send className="w-6 h-6 text-background" />
        </div>
        <h3 className="text-2xl font-light mb-2">Message Sent</h3>
        <p className="text-muted text-center">
          Thank you for reaching out. I&apos;ll get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="modal-name" className="text-sm text-muted block mb-2">
          Name
        </label>
        <input
          id="modal-name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-300"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="modal-email" className="text-sm text-muted block mb-2">
          Email
        </label>
        <input
          id="modal-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-300"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="modal-subject" className="text-sm text-muted block mb-2">
          Subject
        </label>
        <input
          id="modal-subject"
          name="subject"
          type="text"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-300"
          placeholder="Project inquiry"
        />
      </div>

      <div>
        <label htmlFor="modal-message" className="text-sm text-muted block mb-2">
          Message
        </label>
        <textarea
          id="modal-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      {error && (
        <div className="p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
          {error}
        </div>
      )}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className="w-full inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-hover disabled:bg-accent/50 disabled:cursor-not-allowed text-background px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </form>
  );
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-surface border border-border shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 border border-border flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-muted hover:text-foreground transition-colors" />
            </button>

            <div className="p-8 md:p-12">
              {/* Header */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="mb-10"
              >
                <motion.span
                  variants={fadeInUp}
                  className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-3 block"
                >
                  Get in Touch
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl font-light tracking-tight"
                >
                  Let&apos;s start a{" "}
                  <span className="font-medium">conversation</span>
                </motion.h2>
              </motion.div>

              {/* Content grid */}
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left — Contact Details */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="space-y-8"
                >
                  <motion.p
                    variants={fadeInUp}
                    className="text-muted leading-relaxed"
                  >
                    Have a project in mind? I&apos;d love to hear about it. Reach
                    out directly and I&apos;ll get back to you within 24 hours.
                  </motion.p>

                  <motion.div variants={fadeInUp} className="space-y-5">
                    <a
                      href="mailto:temitopedml@gmail.com"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                        <Mail className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                      </div>
                      <div>
                        <span className="text-xs text-muted block">Email</span>
                        <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                          temitopedml@gmail.com
                        </span>
                      </div>
                    </a>

                    <a
                      href="tel:+233598822108"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-11 h-11 border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                        <Phone className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                      </div>
                      <div>
                        <span className="text-xs text-muted block">Phone</span>
                        <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                          +233 598 822 108
                        </span>
                      </div>
                    </a>

                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 border border-border flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-muted" />
                      </div>
                      <div>
                        <span className="text-xs text-muted block">Location</span>
                        <span className="text-sm text-foreground">Remote — Ghana / Nigeria</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <span className="text-xs text-muted block mb-3">Find me on</span>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "LinkedIn", href: "https://www.linkedin.com/in/temitope-williams-21855a1b2/" },
                        { label: "GitHub",   href: "https://github.com/tee-15/portfolio-tee" },
                        { label: "Behance",  href: "https://www.behance.net/devtemi" },
                      ].map(({ label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 border border-border text-xs text-muted hover:text-foreground hover:border-accent transition-all duration-300"
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right — Contact Form */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <ContactForm onSubmitted={onClose} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

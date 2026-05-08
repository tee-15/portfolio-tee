"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  PenTool,
  Code2,
  ExternalLink,
  Calendar,
  User,
  Layers,
  ArrowUpRight,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

export interface ProjectDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  year: string;
  color: string;
  tag: string;
  role: string;
  timeline: string;
  techStack: string[];
  outcomes: string[];
  links: {
    figma?: string;
    github?: string;
    playStore?: string;
    appStore?: string;
    website?: string;
  };
  images: string[];
}

interface ProjectModalProps {
  project: ProjectDetail | null;
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
    transition: { staggerChildren: 0.08 },
  },
};

function LinkButton({
  href,
  icon: Icon,
  label,
  color,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  color?: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, x: 4 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 px-5 py-3 border border-border hover:border-accent transition-all duration-300 group bg-background"
    >
      <Icon className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
      <span className="text-sm text-foreground">{label}</span>
      <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-accent transition-colors ml-auto" />
    </motion.a>
  );
}

function ImagePlaceholder({ color, label }: { color: string; label?: string }) {
  return (
    <div
      className="w-full aspect-[16/10] flex items-center justify-center border border-border relative overflow-hidden group"
      style={{ backgroundColor: `${color}08` }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}20, transparent 50%)`,
        }}
      />
      <div className="text-center relative z-10">
        <Layers className="w-8 h-8 mx-auto mb-2" style={{ color: `${color}40` }} />
        {label && (
          <span className="text-xs tracking-wider uppercase" style={{ color: `${color}60` }}>
            {label}
          </span>
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ backgroundColor: `${color}30` }}
      />
    </div>
  );
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
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
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-start justify-center p-0 md:p-8 overflow-y-auto"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.97 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl bg-surface border-x md:border border-border shadow-2xl my-0 md:my-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="fixed md:absolute top-4 right-4 z-50 w-10 h-10 border border-border bg-surface flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-300"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-muted hover:text-foreground transition-colors" />
            </button>

            {/* Hero Image Area */}
            <div className="relative">
              {project.images.length > 0 ? (
                <div className="relative w-full aspect-[21/9] overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                </div>
              ) : (
                <ImagePlaceholder color={project.color} label="Project Preview" />
              )}

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs tracking-wider uppercase px-3 py-1 border"
                      style={{
                        borderColor: `${project.color}40`,
                        color: project.color,
                      }}
                    >
                      {project.tag}
                    </span>
                    <span className="text-xs text-muted font-mono">{project.year}</span>
                  </motion.div>
                  <motion.h2
                    variants={fadeInUp}
                    className="text-3xl md:text-5xl font-light tracking-tight"
                  >
                    {project.title}
                  </motion.h2>
                </motion.div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
                {/* Main Content */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  {/* Overview */}
                  <motion.div variants={fadeInUp} className="mb-10">
                    <h3 className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-4">
                      Overview
                    </h3>
                    <p className="text-muted text-lg leading-relaxed">
                      {project.fullDescription}
                    </p>
                  </motion.div>

                  {/* Key Outcomes */}
                  {project.outcomes.length > 0 && (
                    <motion.div variants={fadeInUp} className="mb-10">
                      <h3 className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-4">
                        Key Outcomes
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {project.outcomes.map((outcome, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-4 border border-border bg-background"
                          >
                            <div
                              className="w-1.5 h-1.5 mt-2 shrink-0"
                              style={{ backgroundColor: project.color }}
                            />
                            <span className="text-sm text-foreground leading-relaxed">
                              {outcome}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Gallery */}
                  {project.images.length > 1 && (
                    <motion.div variants={fadeInUp} className="mb-10">
                      <h3 className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-4">
                        Gallery
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {project.images.slice(1).map((img, i) => (
                          <div key={i} className="relative aspect-[4/3] overflow-hidden border border-border">
                            <Image
                              src={img}
                              alt={`${project.title} screenshot ${i + 2}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Placeholder gallery if no images */}
                  {project.images.length <= 1 && (
                    <motion.div variants={fadeInUp} className="mb-10">
                      <h3 className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-4">
                        Gallery
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3].map((i) => (
                          <ImagePlaceholder
                            key={i}
                            color={project.color}
                            label={`Screen ${i}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Sidebar */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="space-y-8"
                >
                  {/* Meta Info */}
                  <motion.div variants={fadeInUp} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-muted" />
                      <div>
                        <span className="text-xs text-muted block">Role</span>
                        <span className="text-sm text-foreground">{project.role}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted" />
                      <div>
                        <span className="text-xs text-muted block">Timeline</span>
                        <span className="text-sm text-foreground">{project.timeline}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4 text-muted" />
                      <div>
                        <span className="text-xs text-muted block">Category</span>
                        <span className="text-sm text-foreground">{project.category}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div variants={fadeInUp}>
                    <h4 className="text-xs tracking-[0.15em] uppercase text-muted font-medium mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs border border-border text-muted hover:border-accent hover:text-foreground transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Links */}
                  {Object.keys(project.links).length > 0 && (
                    <motion.div variants={fadeInUp} className="space-y-3">
                      <h4 className="text-xs tracking-[0.15em] uppercase text-muted font-medium mb-3">
                        Links
                      </h4>
                      {project.links.figma && (
                        <LinkButton
                          href={project.links.figma}
                          icon={PenTool}
                          label="View on Figma"
                        />
                      )}
                      {project.links.github && (
                        <LinkButton
                          href={project.links.github}
                          icon={Code2}
                          label="View on GitHub"
                        />
                      )}
                      {project.links.playStore && (
                        <LinkButton
                          href={project.links.playStore}
                          icon={Smartphone}
                          label="Google Play Store"
                        />
                      )}
                      {project.links.appStore && (
                        <LinkButton
                          href={project.links.appStore}
                          icon={Smartphone}
                          label="Apple App Store"
                        />
                      )}
                      {project.links.website && (
                        <LinkButton
                          href={project.links.website}
                          icon={ExternalLink}
                          label="Live Website"
                        />
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

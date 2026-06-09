"use client";

import React, { useEffect, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
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
  designProcess?: { phase: string; items: string[] }[];
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
}: {
  href: string;
  icon: React.ElementType;
  label: string;
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
      className="w-full aspect-[16/10] flex items-center justify-center border border-border relative overflow-hidden"
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

// Zoom levels cycle: 1x → 1.5x → 2x → 1x
const ZOOM_LEVELS = [1, 1.5, 2];

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevelIndex, setZoomLevelIndex] = useState(0);

  const zoomScale = ZOOM_LEVELS[zoomLevelIndex];

  // Reset zoom when switching images or closing lightbox
  useEffect(() => {
    const timer = setTimeout(() => setZoomLevelIndex(0), 0);
    return () => clearTimeout(timer);
  }, [currentImageIndex, lightboxOpen]);

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
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "ArrowLeft") setCurrentImageIndex((prev) => project ? (prev - 1 + project.images.length) % project.images.length : prev);
        if (e.key === "ArrowRight") setCurrentImageIndex((prev) => project ? (prev + 1) % project.images.length : prev);
        if (e.key === "+") setZoomLevelIndex((prev) => Math.min(prev + 1, ZOOM_LEVELS.length - 1));
        if (e.key === "-") setZoomLevelIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, lightboxOpen, project]);

  const handleNextImage = () => {
    if (project) setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const handlePrevImage = () => {
    if (project) setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleZoomIn = () => {
    setZoomLevelIndex((prev) => Math.min(prev + 1, ZOOM_LEVELS.length - 1));
  };

  const handleZoomOut = () => {
    setZoomLevelIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleZoomReset = () => {
    setZoomLevelIndex(0);
  };

  return (
    <AnimatePresence mode="wait">
      {/* ── Lightbox ── */}
      {isOpen && project && lightboxOpen && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[110] flex flex-col bg-black/96 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          {/* ── Top toolbar ── */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-surface/60 backdrop-blur-sm flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <span className="text-sm text-muted font-mono tracking-wide">
              {project.title} &mdash; {currentImageIndex + 1} / {project.images.length}
            </span>

            {/* Zoom controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevelIndex === 0}
                className="w-9 h-9 flex items-center justify-center border border-border bg-surface/80 hover:border-accent hover:bg-accent/10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4 text-muted" />
              </button>

              <button
                onClick={handleZoomReset}
                className="px-3 h-9 text-xs font-mono border border-border bg-surface/80 hover:border-accent hover:bg-accent/10 transition-all duration-200 text-muted min-w-[52px]"
                aria-label="Reset zoom"
              >
                {Math.round(zoomScale * 100)}%
              </button>

              <button
                onClick={handleZoomIn}
                disabled={zoomLevelIndex === ZOOM_LEVELS.length - 1}
                className="w-9 h-9 flex items-center justify-center border border-border bg-surface/80 hover:border-accent hover:bg-accent/10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4 text-muted" />
              </button>

              <div className="w-px h-5 bg-border mx-1" />

              <button
                onClick={() => setLightboxOpen(false)}
                className="w-9 h-9 flex items-center justify-center border border-border bg-surface/80 hover:border-accent hover:bg-accent/10 transition-all duration-200"
                aria-label="Close lightbox"
              >
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>
          </div>

          {/* ── Main image area ── */}
          <div
            className="flex-1 flex items-center justify-center overflow-auto relative"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Prev button */}
            {project.images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-border bg-surface/80 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-muted" />
              </button>
            )}

            <motion.div
              animate={{ scale: zoomScale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-5xl w-full mx-16"
              style={{ cursor: zoomScale > 1 ? "zoom-out" : "zoom-in" }}
              onClick={(e) => {
                e.stopPropagation();
                if (zoomScale > 1) { handleZoomOut(); } else { handleZoomIn(); }
              }}
            >
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} — image ${currentImageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-contain select-none"
                  priority
                  draggable={false}
                />
              </div>
            </motion.div>

            {/* Next button */}
            {project.images.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-border bg-surface/80 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-muted" />
              </button>
            )}
          </div>

          {/* ── Thumbnail strip ── */}
          <div
            className="flex-shrink-0 border-t border-border/40 bg-surface/60 backdrop-blur-sm px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-2 justify-center overflow-x-auto">
              {project.images.map((img, idx) => (
                <motion.button
                  key={`thumb-${idx}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`relative w-20 h-14 border-2 flex-shrink-0 overflow-hidden transition-all duration-200 ${
                    idx === currentImageIndex
                      ? "border-accent"
                      : "border-border/50 hover:border-accent/60 opacity-60 hover:opacity-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View image ${idx + 1}`}
                >
                  {/* Show the top (hero) portion of the image */}
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="80px"
                    loading="lazy"
                    className="object-cover object-top"
                  />
                  {idx === currentImageIndex && (
                    <div className="absolute inset-0 ring-1 ring-inset ring-accent/40" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Main Modal ── */}
      {isOpen && project && !lightboxOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-start justify-center p-0 md:p-8 overflow-y-auto"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.97 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
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

            {/* Hero Image */}
            <div className="relative">
              {project.images.length > 0 ? (
                <div className="relative w-full aspect-[21/9] overflow-hidden group">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1152px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

                  {/* Expand / zoom-in hint */}
                  <button
                    onClick={() => openLightbox(0)}
                    className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 border border-white/20 bg-black/40 backdrop-blur-sm text-white/80 text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-white/50 hover:bg-black/60"
                    aria-label="View full image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    View full
                  </button>
                </div>
              ) : (
                <ImagePlaceholder color={project.color} label="Project Preview" />
              )}

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 pointer-events-none">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs tracking-wider uppercase px-3 py-1 border"
                      style={{ borderColor: `${project.color}40`, color: project.color }}
                    >
                      {project.tag}
                    </span>
                    <span className="text-xs text-muted font-mono">{project.year}</span>
                  </motion.div>
                  <motion.h2
                    variants={fadeInUp}
                    id="project-modal-title"
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
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  {/* Overview */}
                  <motion.div variants={fadeInUp} className="mb-10">
                    <h3 className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-4">
                      Overview
                    </h3>
                    <p className="text-muted text-lg leading-relaxed">{project.fullDescription}</p>
                  </motion.div>

                  {/* Design Process */}
                  {project.designProcess && project.designProcess.length > 0 && (
                    <motion.div variants={fadeInUp} className="mb-10">
                      <h3 className="text-sm tracking-[0.2em] uppercase text-accent font-medium mb-8">
                        My Design Process
                      </h3>
                      <div className="relative">
                        {/* Connecting line */}
                        <div
                          className="absolute top-5 left-0 right-0 h-px hidden md:block"
                          style={{ backgroundColor: `${project.color}20` }}
                        />
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                          {project.designProcess.map((step, i) => (
                            <motion.div
                              key={step.phase}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: i * 0.08 }}
                              className="relative flex flex-col"
                            >
                              {/* Phase number node */}
                              <div className="flex items-center gap-3 mb-4 md:flex-col md:items-start md:gap-0">
                                <div
                                  className="relative z-10 flex-shrink-0 w-10 h-10 border-2 flex items-center justify-center text-xs font-mono font-semibold md:mb-3"
                                  style={{
                                    borderColor: project.color,
                                    color: project.color,
                                    backgroundColor: `${project.color}10`,
                                  }}
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </div>
                                <h4
                                  className="text-xs font-semibold tracking-[0.1em] uppercase"
                                  style={{ color: project.color }}
                                >
                                  {step.phase}
                                </h4>
                              </div>
                              {/* Items */}
                              <ul className="space-y-1.5 md:pl-0">
                                {step.items.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-1.5 text-[11px] text-muted leading-snug"
                                  >
                                    <span
                                      className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: `${project.color}60` }}
                                    />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Key Outcomes */}
                  {project.outcomes.length > 0 && (                    <motion.div variants={fadeInUp} className="mb-10">
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
                            <span className="text-sm text-foreground leading-relaxed">{outcome}</span>
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
                          <motion.button
                            key={`gallery-${img}`}
                            onClick={() => openLightbox(i + 1)}
                            className="relative aspect-[4/3] overflow-hidden border border-border group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Image
                              src={img}
                              alt={`${project.title} screenshot ${i + 2}`}
                              fill
                              loading="lazy"
                              sizes="(max-width: 640px) 50vw, 300px"
                              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </motion.button>
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
                          <ImagePlaceholder key={i} color={project.color} label={`Screen ${i}`} />
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
                        <LinkButton href={project.links.figma} icon={PenTool} label="View on Figma" />
                      )}
                      {project.links.github && (
                        <LinkButton href={project.links.github} icon={Code2} label="View on GitHub" />
                      )}
                      {project.links.playStore && (
                        <LinkButton href={project.links.playStore} icon={Smartphone} label="Google Play Store" />
                      )}
                      {project.links.appStore && (
                        <LinkButton href={project.links.appStore} icon={Smartphone} label="Apple App Store" />
                      )}
                      {project.links.website && (
                        <LinkButton href={project.links.website} icon={ExternalLink} label="Live Website" />
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

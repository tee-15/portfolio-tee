"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Code2,
  Smartphone,
  Lightbulb,
} from "lucide-react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Work from "./components/Work";
import ContactModal from "./components/ContactModal";
import GlobalEffects from "./components/GlobalEffects";
import CustomCursor from "./components/CustomCursor";
import CountUp from "./components/CountUp";
import Magnetic from "./components/Magnetic";
import BreakoutGame from "./components/BreakoutGame";
import {
  GlowOrb,
  FloatingRing,
  FloatingDot,
  FloatingPlus,
  SectionNumber,
  DottedGrid,
  CornerBrackets,
  DiagonalLine,
} from "./components/Decorations";
import { useMouseParallax } from "./hooks/useMouseParallax";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AboutSection() {
  const {
    ref,
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax({ intensity: 20 });

  const stats = [
    { value: 8,  suffix: "+", label: "Years of Experience",  sub: "FinTech, SaaS, Enterprise & EdTech",  color: "#c45c3e" },
    { value: 50, suffix: "+", label: "Products Shipped",      sub: "Designed & built for web and mobile",  color: "#d4a574" },
  ];

  const competencies = [
    {
      label: "Frontend Development",
      color: "#c45c3e",
      items: ["React & Next.js", "TypeScript", "Responsive & Accessible UI", "State Management", "REST & GraphQL APIs", "Performance Optimization"],
    },
    {
      label: "Mobile Development",
      color: "#d4a574",
      items: ["React Native & Expo", "iOS & Android", "Cross-Platform UI", "Navigation & Routing", "Push Notifications", "App Store Deployment"],
    },
    {
      label: "UI Engineering",
      color: "#5a9e8f",
      items: ["Design Systems", "Component Libraries", "Tailwind CSS", "Framer Motion & Animation", "Accessibility (WCAG)", "Cross-Browser Testing"],
    },
    {
      label: "Product & UX Design",
      color: "#8a6fc7",
      items: ["User-Centered Design", "Wireframing & Prototyping", "Usability Testing", "Customer Journey Mapping", "Interaction Design", "Figma · Adobe XD"],
    },
    {
      label: "Quality & Workflow",
      color: "#c45c3e",
      items: ["Clean, Maintainable Code", "Git & Version Control", "Code Reviews", "Cross-Functional Collaboration", "Responsive Testing", "Technical Documentation"],
    },
  ];

  const toolCategories = [
    {
      label: "Design & Prototyping",
      color: "#c45c3e",
      tools: [
        { name: "Figma",       icon: "https://cdn.simpleicons.org/figma/ffffff" },
        {
          name: "Adobe XD",
          icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' rx='4' fill='%23FF61F6'/><path fill='white' d='M14.5 7L19 12l-4.5 5h-2.8l4.2-5-4.2-5h2.8zM9.5 7L5 12l4.5 5H6.7L2.5 12 6.7 7H9.5z'/></svg>`,
        },
        {
          name: "Illustrator",
          icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' rx='4' fill='%23FF9A00'/><path fill='%231a1a1a' d='M8.4 15.5H6.1l-.5 1.8H4l2.4-7.6h1.9l2.4 7.6H8.9l-.5-1.8zm-2-1.4h1.6l-.8-2.9-.8 2.9zm6.6-5.8c.3 0 .5.1.7.3.2.2.3.4.3.7s-.1.5-.3.7c-.2.2-.4.3-.7.3s-.5-.1-.7-.3c-.2-.2-.3-.4-.3-.7s.1-.5.3-.7c.2-.2.4-.3.7-.3zm.7 2.7v5.8h-1.4v-5.8h1.4z'/></svg>`,
        },
        {
          name: "Photoshop",
          icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect width='24' height='24' rx='4' fill='%2331A8FF'/><path fill='%231a1a1a' d='M5 7.3h3.2c.7 0 1.3.1 1.8.4.5.3.9.6 1.1 1.1.3.5.4 1 .4 1.6 0 .9-.3 1.6-.8 2.1-.6.5-1.4.8-2.5.8H6.4v3.4H5V7.3zm1.4 4.7h1.7c.7 0 1.2-.2 1.5-.5.3-.3.5-.7.5-1.2 0-.5-.2-.9-.5-1.2-.3-.3-.8-.5-1.5-.5H6.4v3.4zm7.1 1.2c0-.5.1-.9.4-1.3.3-.4.6-.7 1.1-.9.5-.2 1-.3 1.6-.3.3 0 .6 0 .9.1v-.3c0-.4-.1-.7-.4-.9-.2-.2-.6-.3-1-.3-.3 0-.6.1-.9.2-.3.1-.5.3-.7.5l-.8-.8c.3-.3.6-.6 1.1-.8.4-.2.9-.3 1.4-.3.9 0 1.6.2 2 .7.5.5.7 1.1.7 2v3.5h-1.3v-.7c-.2.3-.5.5-.8.6-.3.1-.7.2-1.1.2-.4 0-.8-.1-1.1-.3-.3-.2-.6-.4-.8-.7-.2-.3-.3-.7-.3-1.1zm1.3-.1c0 .3.1.6.4.8.2.2.5.3.9.3.5 0 .9-.1 1.2-.4.3-.3.5-.6.5-1.1v-.4c-.3-.1-.6-.1-.9-.1-.5 0-.9.1-1.2.3-.3.2-.5.4-.5.7l-.4-.1z'/></svg>`,
        },
      ],
    },
    {
      label: "Frontend",
      color: "#5a9e8f",
      tools: [
        { name: "React",        icon: "https://cdn.simpleicons.org/react/ffffff" },
        { name: "Next.js",      icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
        { name: "TypeScript",   icon: "https://cdn.simpleicons.org/typescript/ffffff" },
        { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/ffffff" },
      ],
    },
    {
      label: "Mobile",
      color: "#d4a574",
      tools: [
        { name: "React Native", icon: "https://cdn.simpleicons.org/react/ffffff" },
        { name: "Expo",         icon: "https://cdn.simpleicons.org/expo/ffffff" },
        { name: "Android",      icon: "https://cdn.simpleicons.org/android/ffffff" },
        { name: "iOS",          icon: "https://cdn.simpleicons.org/apple/ffffff" },
      ],
    },
    {
      label: "Tools & Workflow",
      color: "#8a6fc7",
      tools: [
        { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/ffffff" },
        { name: "VS Code", icon: "https://cdn.simpleicons.org/visualstudiocode/ffffff" },
        { name: "Git",     icon: "https://cdn.simpleicons.org/git/ffffff" },
        { name: "GitHub",  icon: "https://cdn.simpleicons.org/github/ffffff" },
      ],
    },
  ];

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="about"
      className="relative py-32 px-6 lg:px-8 bg-surface overflow-hidden"
    >
      <SectionNumber number="01" className="top-8 right-8 md:right-20" />
      <DottedGrid className="inset-0 w-full h-full" />
      <GlowOrb mouseX={mouseX} mouseY={mouseY} color="accent-secondary" size={400} intensity={12} className="-top-20 -left-20" />
      <FloatingRing mouseX={mouseX} mouseY={mouseY} intensity={20} size={80} className="top-24 right-24" />
      <FloatingDot mouseX={mouseX} mouseY={mouseY} intensity={25} size={8} className="bottom-32 left-24" />
      <FloatingPlus mouseX={mouseX} mouseY={mouseY} intensity={18} className="top-40 left-40" />
      <DiagonalLine className="bottom-20 right-40" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.span variants={fadeInUp} className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
            About Me
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl lg:text-6xl font-light tracking-tight max-w-4xl">
            Where design meets
            <br />
            <span className="font-semibold gradient-text">code and craft</span>
          </motion.h2>
        </motion.div>

        {/* ── Bio + Stats ── */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 mb-24">
          {/* Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.p variants={fadeInUp} className="text-foreground/90 text-xl leading-relaxed font-light">
              Product Designer and Frontend Developer with 8+ years of experience crafting digital products across FinTech, SaaS, enterprise, and education-adjacent sectors.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-muted text-base leading-relaxed">
              I own the full product journey — from user research, wireframing, and high-fidelity UI/UX design to building responsive, accessible web and mobile applications with React, Next.js, and React Native.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-muted text-base leading-relaxed">
              Passionate about User-Centered Design and clean, performant code, I turn complex requirements into intuitive interfaces and ship them to production — building design systems and component libraries that bridge the gap between Figma and real, working products.
            </motion.p>
            <motion.div variants={fadeInUp} className="pt-2">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">Sectors</p>
              <div className="flex flex-wrap gap-2">
                {["FinTech", "SaaS", "Enterprise", "EdTech", "E-Commerce", "Logistics", "Social Impact"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 border border-border text-muted hover:border-accent hover:text-foreground transition-all duration-200">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col border border-border bg-background relative self-start lg:sticky lg:top-32"
          >
            <CornerBrackets className="inset-0" />
            {stats.map((s, i) => (
              <div key={s.label} className={`p-8 ${i < stats.length - 1 ? "border-b border-border" : ""} hover:bg-surface/50 transition-colors duration-300`}>
                <span className="text-6xl font-light leading-none block mb-2" style={{ color: s.color }}>
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
                <p className="text-sm font-medium text-foreground mb-1">{s.label}</p>
                <p className="text-xs text-muted">{s.sub}</p>
              </div>
            ))}
            <div className="p-6 border-t border-border bg-surface/30">
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3">Currently Available</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-accent">Open to new projects</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Core Competencies ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-muted font-medium whitespace-nowrap">Core Competencies</span>
            <div className="flex-1 h-px bg-border" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {competencies.map((comp) => (
              <motion.div
                key={comp.label}
                variants={fadeInUp}
                className="border border-border bg-background p-6 group hover:bg-surface/40 transition-all duration-300 relative"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: comp.color }} />
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: comp.color }} />
                  <h4 className="text-xs tracking-[0.12em] uppercase font-semibold" style={{ color: comp.color }}>{comp.label}</h4>
                </div>
                <ul className="space-y-2">
                  {comp.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted leading-relaxed group-hover:text-foreground/70 transition-colors duration-200">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-border group-hover:bg-accent/50 transition-colors duration-200" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            {/* Availability CTA card */}
            <motion.div
              variants={fadeInUp}
              className="border border-accent/20 bg-accent/5 p-6 flex flex-col justify-between group hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
            >
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-accent font-medium mb-3">Currently Available</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Open to product design, web, and mobile development engagements across FinTech, SaaS, and enterprise.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-accent">Available for new projects</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Tools & Stack ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-10">
            <span className="text-xs tracking-[0.2em] uppercase text-muted font-medium whitespace-nowrap">Tools & Stack</span>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {toolCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.label}
                variants={fadeInUp}
                custom={catIdx * 0.1}
                className="border border-border bg-background p-6 transition-all duration-300 group relative"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-[11px] tracking-[0.15em] uppercase font-semibold" style={{ color: cat.color }}>
                    {cat.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {cat.tools.map((tool) => (
                    <motion.div
                      key={tool.name}
                      whileHover={{ y: -3, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="flex flex-col items-center gap-2 group/tool"
                    >
                      <div className="w-12 h-12 border border-border bg-surface/80 flex items-center justify-center group-hover/tool:border-accent/30 transition-all duration-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tool.icon}
                          alt={tool.name}
                          width={26}
                          height={26}
                          className="w-6 h-6 object-contain"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      </div>
                      <span className="text-[10px] text-muted text-center leading-tight group-hover/tool:text-foreground transition-colors duration-200">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function ServicesSection() {
  const {
    ref,
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax({ intensity: 18 });

  const services = [
    {
      title: "Product Design",
      description:
        "End-to-end product design from user research and strategy to high-fidelity prototypes and scalable design systems.",
      icon: Palette,
      color: "text-accent",
      borderHover: "hover:border-accent",
    },
    {
      title: "Web Development",
      description:
        "Building fast, responsive, and accessible web applications with React and Next.js — from marketing sites to complex SaaS dashboards.",
      icon: Code2,
      color: "text-accent-secondary",
      borderHover: "hover:border-accent-secondary",
    },
    {
      title: "Mobile Development",
      description:
        "Crafting performant, intuitive cross-platform mobile apps for iOS and Android with React Native that users love and businesses rely on.",
      icon: Smartphone,
      color: "text-accent-tertiary",
      borderHover: "hover:border-accent-tertiary",
    },
    {
      title: "Consultation",
      description:
        "Strategic guidance on product direction, UX audits, frontend architecture, and design-to-code workflows.",
      icon: Lightbulb,
      color: "text-accent",
      borderHover: "hover:border-accent",
    },
  ];

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="services"
      className="relative py-32 px-6 lg:px-8 overflow-hidden"
    >
      <SectionNumber number="02" className="top-4 left-4 md:left-16" />
      <DottedGrid className="inset-0 w-full h-full" />
      <GlowOrb mouseX={mouseX} mouseY={mouseY} color="accent-tertiary" size={300} intensity={10} className="top-0 right-0" />
      <FloatingRing mouseX={mouseX} mouseY={mouseY} intensity={16} size={100} className="bottom-20 right-20" />
      <FloatingDot mouseX={mouseX} mouseY={mouseY} intensity={22} size={10} className="top-32 left-16" />
      <FloatingPlus mouseX={mouseX} mouseY={mouseY} intensity={20} className="bottom-40 right-40" />
      <DiagonalLine className="top-24 left-32" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4 block"
          >
            Services
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-light tracking-tight"
          >
            What I <span className="font-medium gradient-text">do best</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`relative p-8 border border-border ${service.borderHover} transition-colors duration-300 bg-background group`}
              >
                <CornerBrackets className="inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className={`w-12 h-12 border border-border flex items-center justify-center mb-6 ${service.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-medium mb-4">{service.title}</h3>
                <p className="text-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function PlaygroundSection() {
  const {
    ref,
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax({ intensity: 18 });

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="playground"
      className="relative py-32 px-6 lg:px-8 overflow-hidden"
    >
      <SectionNumber number="03" className="top-8 left-8 md:left-20" />
      <DottedGrid className="inset-0 w-full h-full" />
      <GlowOrb mouseX={mouseX} mouseY={mouseY} color="accent-secondary" size={340} intensity={12} className="top-10 right-0" />
      <FloatingRing mouseX={mouseX} mouseY={mouseY} intensity={20} size={90} className="bottom-24 left-16" />
      <FloatingDot mouseX={mouseX} mouseY={mouseY} intensity={26} size={8} className="top-32 right-24" />
      <FloatingPlus mouseX={mouseX} mouseY={mouseY} intensity={16} className="bottom-40 right-40" />
      <DiagonalLine className="top-24 left-24" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
              Playground
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-light tracking-tight">
              Breakout — <span className="font-medium gradient-text">smash the stack</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-muted text-lg mt-6 leading-relaxed">
              A canvas arcade built with React and the HTML5 Canvas API — bounce the ball, break every tech brick, catch power-ups, and chase a high score. No game engine, just requestAnimationFrame and math.
            </motion.p>
          </motion.div>

          {/* Small framed "cabinet" panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full max-w-sm mx-auto border border-border bg-surface p-4 group"
          >
            <CornerBrackets className="inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <BreakoutGame />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onOpen }: { onOpen: () => void }) {
  const {
    ref,
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax({ intensity: 22 });

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="contact"
      className="relative py-32 px-6 lg:px-8 bg-surface overflow-hidden"
    >
      <SectionNumber number="04" className="bottom-8 right-8 md:right-20" />
      <DottedGrid className="inset-0 w-full h-full" />
      <GlowOrb mouseX={mouseX} mouseY={mouseY} color="accent" size={400} intensity={14} className="-bottom-32 -left-32" />
      <FloatingRing mouseX={mouseX} mouseY={mouseY} intensity={24} size={70} className="top-24 left-24" />
      <FloatingDot mouseX={mouseX} mouseY={mouseY} intensity={28} size={6} className="top-16 right-32" />
      <FloatingPlus mouseX={mouseX} mouseY={mouseY} intensity={16} className="bottom-32 left-48" />
      <DiagonalLine className="top-20 right-20" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        <motion.span
          variants={fadeInUp}
          className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4 block"
        >
          Contact
        </motion.span>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl lg:text-5xl font-light tracking-tight mb-8"
        >
          Let&apos;s build something
          <br />
          <span className="font-medium gradient-text">extraordinary</span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-muted text-lg max-w-md mx-auto mb-12"
        >
          Have a project in mind? I&apos;d love to hear about it. Let&apos;s
          discuss how we can work together.
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Magnetic className="inline-block" strength={0.4}>
            <motion.button
              onClick={onOpen}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-background px-10 py-5 text-sm font-medium tracking-wide transition-colors duration-300"
            >
              Get in Touch
            </motion.button>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <GlobalEffects />
      <CustomCursor />
      <Navigation />
      <Hero />
      <Work />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <AboutSection />
      <ServicesSection />
      <PlaygroundSection />
      <ContactSection onOpen={() => setIsModalOpen(true)} />

      {/* Footer */}
      <footer className="relative py-12 px-6 lg:px-8 border-t border-border overflow-hidden">
        <DottedGrid className="inset-0 w-full h-full" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <span className="font-[family-name:var(--font-cursive)] text-2xl sm:text-3xl font-semibold tracking-normal">
            Temitope Williams
          </span>
          <span className="text-sm text-muted">
            © {new Date().getFullYear()} Temitope Williams. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

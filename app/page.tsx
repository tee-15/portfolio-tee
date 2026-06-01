"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Users,
  Smartphone,
  Lightbulb,
} from "lucide-react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Work from "./components/Work";
import ContactModal from "./components/ContactModal";
import GlobalEffects from "./components/GlobalEffects";
import CustomCursor from "./components/CustomCursor";
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
import { useMouseParallax, useMouseParallaxValue } from "./hooks/useMouseParallax";

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
    { value: "8+",  label: "Years of Experience",  sub: "FinTech, SaaS, Enterprise & EdTech",  color: "#c45c3e" },
    { value: "50+", label: "Projects Delivered",    sub: "End-to-end, on time & on scope",       color: "#d4a574" },
  ];

  const competencies = [
    {
      label: "Product Strategy & Execution",
      color: "#c45c3e",
      items: ["Product Vision & Roadmap", "GTM Strategy", "Product-Market Fit", "Feature Prioritization (MoSCoW)", "PRD Authoring", "Release Planning"],
    },
    {
      label: "Analytics & Metrics",
      color: "#d4a574",
      items: ["KPIs & OKRs", "A/B Testing", "Conversion Rate Optimization", "Churn Reduction", "Data-Driven Decision Making", "Mixpanel · Amplitude · Tableau"],
    },
    {
      label: "Agile & Collaboration",
      color: "#5a9e8f",
      items: ["Agile / Scrum / Kanban", "Sprint Planning", "Cross-Functional Leadership", "Stakeholder Management", "Jira · Confluence · Notion"],
    },
    {
      label: "User Research & Design",
      color: "#8a6fc7",
      items: ["User-Centered Design", "Customer Journey Mapping", "Usability Testing", "Wireframing & Prototyping", "Design Systems", "Figma · Adobe XD · InVision"],
    },
    {
      label: "Leadership & Operations",
      color: "#c45c3e",
      items: ["Team Leadership & Mentoring", "Resource Allocation", "Timeline Management", "Risk Mitigation", "Workshop Facilitation", "Strategic Planning"],
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
      label: "Product & Project Mgmt",
      color: "#5a9e8f",
      tools: [
        { name: "Jira",       icon: "https://cdn.simpleicons.org/jira/ffffff" },
        { name: "Confluence", icon: "https://cdn.simpleicons.org/confluence/ffffff" },
        { name: "Notion",     icon: "https://cdn.simpleicons.org/notion/ffffff" },
        {
          name: "Slack",
          icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23E01E5A' d='M6 15a2 2 0 1 1 0-4h2v2a2 2 0 0 1-2 2z'/><path fill='%2336C5F0' d='M9 6a2 2 0 1 1 4 0v2H9V6z'/><path fill='%232EB67D' d='M18 9a2 2 0 1 1 0 4h-2V9h2z'/><path fill='%23ECB22E' d='M15 18a2 2 0 1 1-4 0v-2h4v2z'/><path fill='%2336C5F0' d='M6 9h6v6H6z' opacity='.15'/><path fill='%23E01E5A' d='M9 6h2v6H9z'/><path fill='%232EB67D' d='M13 9h2v6h-2z'/><path fill='%23ECB22E' d='M9 13h6v2H9z'/></svg>`,
        },
      ],
    },
    {
      label: "Analytics",
      color: "#d4a574",
      tools: [
        { name: "Mixpanel",  icon: "https://cdn.simpleicons.org/mixpanel/ffffff" },
        {
          name: "Amplitude",
          icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'><path d='M12 2L2 19.5h4.5L12 9l5.5 10.5H22L12 2z' fill='white'/><path d='M7.5 19.5h9l-4.5-8.5-4.5 8.5z' fill='white' opacity='0.4'/></svg>`,
        },
        {
          name: "Tableau",
          icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M11.14 4.588V0h1.72v4.588h4.588v1.72h-4.588V10.9h-1.72V6.308H6.552v-1.72h4.588zm6.862 8.274v-3.45h1.376v3.45H23v1.376h-3.608v3.45h-1.376v-3.45H14.41v-1.376h3.592zM6.552 14.24V10.9H7.93v3.34H11.27v1.376H7.93v3.34H6.552v-3.34H3.21V14.24h3.342zM0 19.412v-3.45h1.376v3.45H4.07v1.376H1.376V24H0v-3.212h-2.694v-1.376H0z'/></svg>`,
        },
        { name: "GitHub",    icon: "https://cdn.simpleicons.org/github/ffffff" },
      ],
    },
    {
      label: "Office & Collaboration",
      color: "#8a6fc7",
      tools: [
        {
          name: "MS Word",
          icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%232B579A' d='M23.5 2H8.5A.5.5 0 0 0 8 2.5v3H0v14h8v2.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5z'/><path fill='white' d='M9 6h13v12H9z'/><path fill='%232B579A' d='M11 8l1.5 5 1.5-4 1.5 4 1.5-5h1l-2 7h-1l-1.5-4-1.5 4h-1l-2-7z'/></svg>`,
        },
        {
          name: "MS Excel",
          icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23217346' d='M23.5 2H8.5A.5.5 0 0 0 8 2.5v3H0v14h8v2.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5z'/><path fill='white' d='M9 6h13v12H9z'/><path fill='%23217346' d='M11 8l2 3-2 3h1.5l1.25-2 1.25 2H14.5l-2-3 2-3H13l-1.25 2L10.5 8z'/></svg>`,
        },
        {
          name: "PowerPoint",
          icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23B7472A' d='M23.5 2H8.5A.5.5 0 0 0 8 2.5v3H0v14h8v2.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5z'/><path fill='white' d='M9 6h13v12H9z'/><path fill='%23B7472A' d='M11 8h3c1.1 0 2 .9 2 2s-.9 2-2 2h-1.5v2H11V8zm1.5 3H14c.55 0 1-.45 1-1s-.45-1-1-1h-1.5v2z'/></svg>`,
        },
        {
          name: "MS Teams",
          icon: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%235059C9' d='M14.5 9A2.5 2.5 0 1 0 14.5 4a2.5 2.5 0 0 0 0 5zm3.5 1h4a1 1 0 0 1 1 1v5a3 3 0 0 1-3 3 3 3 0 0 1-3-3v-5.5a.5.5 0 0 1 .5-.5H18z'/><path fill='%237B83EB' d='M9.5 10A3.5 3.5 0 1 0 9.5 3a3.5 3.5 0 0 0 0 7z'/><path fill='%234B53BC' d='M15 11H4a1 1 0 0 0-1 1v6a5 5 0 0 0 10 0v-6a1 1 0 0 0-1-1z'/><path fill='white' opacity='.5' d='M9.5 12v7'/></svg>`,
        },
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
            Where strategy meets
            <br />
            <span className="font-semibold gradient-text">design and delivery</span>
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
              Results-driven Product Designer and Product Manager with 8+ years of experience delivering digital products across FinTech, SaaS, enterprise, and education-adjacent sectors.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-muted text-base leading-relaxed">
              I have a proven track record of owning end-to-end Product Strategy & Execution — from defining Product Vision & Roadmap and authoring PRDs, to driving Go-To-Market strategy and achieving Product-Market Fit. Expert in Feature Prioritization using MoSCoW frameworks, Agile / Scrum delivery, and Cross-Functional Leadership.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-muted text-base leading-relaxed">
              Passionate about User-Centered Design, I conduct User Research, Customer Journey Mapping, and Usability Testing to transform complex requirements into intuitive, high-impact digital experiences. Demonstrated success in Stakeholder Management, defining KPIs & OKRs, and leveraging A/B Testing and data analytics to optimize Conversion Rates and reduce Churn — operating across both commercial product and social impact dimensions.
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
                <span className="text-6xl font-light leading-none block mb-2" style={{ color: s.color }}>{s.value}</span>
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
                  Open to product design, product management, and consulting engagements across FinTech, SaaS, and enterprise.
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
    x: decorX,
    y: decorY,
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax({ intensity: 18 });

  const { x: decorX2, y: decorY2 } = useMouseParallaxValue(mouseX, mouseY, {
    intensity: -12,
  });

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
      title: "Project Management",
      description:
        "Leading cross-functional teams with agile methodologies to deliver projects on time, within scope, and above expectations.",
      icon: Users,
      color: "text-accent-secondary",
      borderHover: "hover:border-accent-secondary",
    },
    {
      title: "Mobile App Development",
      description:
        "Building performant, intuitive mobile applications for iOS and Android that users love and businesses rely on.",
      icon: Smartphone,
      color: "text-accent-tertiary",
      borderHover: "hover:border-accent-tertiary",
    },
    {
      title: "Consultation",
      description:
        "Strategic guidance on product direction, UX audits, process optimization, and digital transformation initiatives.",
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

function ContactSection({ onOpen }: { onOpen: () => void }) {
  const {
    ref,
    x: decorX,
    y: decorY,
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax({ intensity: 22 });

  const { x: decorX2, y: decorY2 } = useMouseParallaxValue(mouseX, mouseY, {
    intensity: -16,
  });

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="contact"
      className="relative py-32 px-6 lg:px-8 bg-surface overflow-hidden"
    >
      <SectionNumber number="03" className="bottom-8 right-8 md:right-20" />
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
          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-background px-10 py-5 text-sm font-medium tracking-wide transition-colors duration-300"
          >
            Get in Touch
          </motion.button>
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

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMouseParallax, useMouseParallaxValue } from "../hooks/useMouseParallax";
import ProjectModal, { type ProjectDetail } from "./ProjectModal";
import {
  SectionNumber,
  DottedGrid,
  GlowOrb,
  FloatingRing,
  FloatingDot,
  FloatingPlus,
  DiagonalLine,
} from "./Decorations";

const projects: ProjectDetail[] = [
  {
    id: "01",
    title: "Meridian Finance",
    category: "Fintech / Product Design",
    description:
      "A complete redesign of a trading platform serving 2M+ users. Focused on clarity, speed, and trust.",
    fullDescription:
      "Meridian Finance is a comprehensive trading platform redesign aimed at democratizing access to financial markets. The project involved extensive user research with both novice and experienced traders, resulting in a streamlined interface that reduces cognitive load while maintaining powerful functionality. I led the end-to-end design process from discovery through to high-fidelity prototypes and design system creation. The new interface introduced a modular dashboard system, real-time data visualization components, and a simplified onboarding flow that increased user activation by 35%.",
    year: "2024",
    color: "#c45c3e",
    tag: "Product Design",
    role: "Lead Product Designer",
    timeline: "6 months",
    techStack: ["Figma", "Miro", "Principle", "React", "TypeScript"],
    outcomes: [
      "Increased user activation by 35% with simplified onboarding",
      "Reduced task completion time by 28% through UX improvements",
      "Design system adopted across 3 product teams",
      "Accessibility score improved from 62 to 94",
    ],
    links: {
      figma: "#",
      website: "#",
    },
    images: [],
  },
  {
    id: "02",
    title: "Atelier Studio",
    category: "E-Commerce / Development",
    description:
      "Boutique furniture brand with an immersive shopping experience and real-time 3D visualization.",
    fullDescription:
      "Atelier Studio is a premium e-commerce platform for a boutique furniture brand that blurs the line between digital and physical retail. The standout feature is a real-time 3D product configurator that lets customers visualize furniture in their space using AR. I handled both the product design and full-stack development, creating a seamless experience from discovery to checkout. The platform features a custom CMS for the brand team, advanced filtering, and a wishlist system that drove significant engagement.",
    year: "2024",
    color: "#d4a574",
    tag: "Development",
    role: "Product Designer & Developer",
    timeline: "4 months",
    techStack: ["Next.js", "Three.js", "Stripe", "Sanity CMS", "Tailwind CSS"],
    outcomes: [
      "3D configurator increased time-on-site by 4.2x",
      "AR feature drove 18% conversion rate lift",
      "Mobile-first approach achieved 98 Lighthouse score",
      "Average order value increased by 24%",
    ],
    links: {
      github: "#",
      website: "#",
    },
    images: [],
  },
  {
    id: "03",
    title: "Nova Health",
    category: "Healthcare / Full Stack",
    description:
      "Patient-centric telehealth platform with appointment scheduling, video consultations, and health tracking.",
    fullDescription:
      "Nova Health is a comprehensive telehealth platform designed to make healthcare accessible and personal. The app connects patients with healthcare providers through video consultations, while offering robust health tracking features including symptom logging, medication reminders, and vitals monitoring. As the full-stack developer and project manager, I coordinated a team of 5 across design, frontend, backend, and QA to deliver the platform on an aggressive timeline. The architecture prioritizes HIPAA compliance, real-time data sync, and offline capability.",
    year: "2023",
    color: "#5a9e8f",
    tag: "Full Stack",
    role: "Project Manager & Lead Developer",
    timeline: "8 months",
    techStack: ["React Native", "Node.js", "PostgreSQL", "WebRTC", "AWS"],
    outcomes: [
      "10,000+ consultations in first 3 months",
      "92% patient satisfaction rating",
      "Provider efficiency improved by 40%",
      "App store rating of 4.8 stars",
    ],
    links: {
      github: "#",
      playStore: "#",
      appStore: "#",
    },
    images: [],
  },
  {
    id: "04",
    title: "Kinetic Labs",
    category: "SaaS / Product Design",
    description:
      "Analytics dashboard for logistics companies. Reduced data processing time by 40% with optimized UX.",
    fullDescription:
      "Kinetic Labs is an enterprise analytics dashboard that transforms complex logistics data into actionable insights. The platform processes millions of data points daily from fleet tracking, warehouse operations, and supply chain management. The core challenge was presenting dense data in a digestible format for operations managers who needed quick decision-making capabilities. I designed and developed a customizable widget-based dashboard with smart defaults, automated reporting, and alert systems that proactively surface anomalies.",
    year: "2023",
    color: "#c45c3e",
    tag: "Product Design",
    role: "Product Designer & Frontend Lead",
    timeline: "5 months",
    techStack: ["Figma", "React", "D3.js", "Python", "FastAPI"],
    outcomes: [
      "Data processing time reduced by 40%",
      "Report generation automated saving 15hrs/week",
      "Dashboard customization reduced support tickets by 60%",
      "Onboarded 12 enterprise clients in first quarter",
    ],
    links: {
      figma: "#",
      github: "#",
      website: "#",
    },
    images: [],
  },
];

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: ProjectDetail;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="grid lg:grid-cols-[1fr_2fr_1fr] gap-6 lg:gap-12 items-start py-10 border-b border-border hover:bg-surface/50 transition-colors duration-500 px-4 -mx-4 relative">
        {/* Color accent line on hover */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: project.color }}
        />

        <div className="flex items-center gap-4 pl-2">
          <span className="text-accent text-sm font-mono">{project.id}</span>
          <span className="text-muted text-sm">{project.year}</span>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-2xl lg:text-3xl font-light tracking-tight group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            <span
              className="text-[10px] tracking-wider uppercase px-2 py-1 border hidden sm:inline-block"
              style={{
                borderColor: `${project.color}30`,
                color: project.color,
              }}
            >
              {project.tag}
            </span>
          </div>
          <p className="text-muted leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-4">
          <span className="text-sm text-muted tracking-wide">
            {project.category}
          </span>
          <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 group-hover:text-background transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProject = (project: ProjectDetail) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const {
    ref,
    x: decorX,
    y: decorY,
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax({ intensity: 16 });

  const { x: decorX2, y: decorY2 } = useMouseParallaxValue(mouseX, mouseY, {
    intensity: -10,
  });

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="work"
      className="relative py-32 px-6 lg:px-8 overflow-hidden"
    >
      <SectionNumber number="00" className="top-4 right-4 md:right-16" />
      <DottedGrid className="inset-0 w-full h-full" />
      <GlowOrb
        mouseX={mouseX}
        mouseY={mouseY}
        color="accent"
        size={250}
        intensity={10}
        className="top-0 left-1/4"
      />
      <FloatingRing
        mouseX={mouseX}
        mouseY={mouseY}
        intensity={16}
        size={60}
        className="top-24 right-16"
      />
      <FloatingDot
        mouseX={mouseX}
        mouseY={mouseY}
        intensity={20}
        size={5}
        className="bottom-32 left-20"
      />
      <FloatingPlus
        mouseX={mouseX}
        mouseY={mouseY}
        intensity={14}
        className="top-48 left-48"
      />
      <DiagonalLine className="bottom-24 right-32" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
            Selected Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight">
            Projects that define
            <br />
            <span className="font-medium gradient-text">craft and purpose</span>
          </h2>
        </motion.div>

        <div>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => handleOpenProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

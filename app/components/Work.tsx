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
    title: "Hugo Ride",
    category: "Logistics / Subscription",
    description:
      "A subscription-based transportation and delivery platform designed specifically for school children.",
    fullDescription:
      "Hugo Ride is a specialized logistics platform that provides safe and reliable transportation for school children. Built on a subscription-based model, it offers parents peace of mind through real-time tracking and verified drivers. Beyond school runs, the platform also handles child-focused delivery services, ensuring that essential items reach students efficiently. I led the product strategy and design, focusing on building trust through intuitive safety features and a seamless subscription management interface.",
    year: "2026",
    color: "#c45c3e",
    tag: "Product Design",
    role: "Lead Product Designer",
    timeline: "6 months",
    techStack: ["React Native", "Node.js", "PostgreSQL", "Google Maps API", "Stripe"],
    outcomes: [
      "Streamlined school commute for over 500 families",
      "99.9% on-time pickup and delivery rate",
      "Integrated real-time GPS tracking for parental peace of mind",
      "Simplified subscription billing system with 95% retention",
    ],
    links: {
      figma: "https://www.figma.com/design/th5Pijmqf0prdP8Eu6kuGr/Hogo-Ride?node-id=623-2317&t=DqvoR2mZuNaSe6wD-1",
      website: "#",
    },
    images: [
      "/hugo-ride.png",
      "/hugo-ride-gallery-1.png",
      "/hugo-ride-gallery-2.png",
      "/hugo-ride-gallery-3.png",
    ],
  },
  {
    id: "02",
    title: "Celoxx",
    category: "EdTech / AI",
    description:
      "AI-powered educational platform that transforms textbooks into interactive quizzes and summaries.",
    fullDescription:
      "Celoxx is an innovative EdTech platform that leverages artificial intelligence to revolutionize how students interact with their study materials. By processing complex textbooks, Celoxx breaks down dense information into digestible summaries and automatically generates personalized quizzes to reinforce learning. Operating on a subscription model, the platform provides a customized learning path for every student. I handled the end-to-end design and development, integrating advanced AI models with a user-friendly learning management system.",
    year: "2026",
    color: "#d4a574",
    tag: "Product Design",
    role: "Product Designer & Developer",
    timeline: "4 months",
    techStack: ["Next.js", "OpenAI API", "Python", "Tailwind CSS", "Supabase"],
    outcomes: [
      "Reduced study time by 40% through automated summarization",
      "Increased quiz engagement by 65% compared to traditional methods",
      "Successfully processed over 10,000 textbook chapters",
      "Highly scalable architecture supporting 50k+ active students",
    ],
    links: {
      figma: "https://www.figma.com/design/4eTlVwTkZJUpZQqLQ9VEZD/Celoxx?node-id=110-2508&m=dev",
      website: "#",
    },
    images: [
      "/Celoxx-Image 1.png",
      "/Celoxx-Image 2.png",
      "/Celoxx-Image 3.png",
      "/Celoxx-Image 4.png",
    ],
  },
  {
    id: "03",
    title: "Priceet",
    category: "E-Commerce / SaaS",
    description:
      "An e-commerce SaaS platform connecting users with retailers for high-quality products at competitive prices.",
    fullDescription:
      "Priceet is a unique e-commerce SaaS solution designed to bridge the gap between retailers and value-conscious consumers. The platform allows users to purchase goods from various retailers while leveraging a collective bargaining model to secure products at significantly lower prices. It functions as a SaaS product for retailers, providing them with powerful tools to manage inventory and sales while offering users a premium shopping experience. As the lead developer, I focused on creating a robust marketplace architecture and a seamless checkout experience.",
    year: "2026",
    color: "#5a9e8f",
    tag: "Full Stack",
    role: "Project Manager & Lead Developer",
    timeline: "8 months",
    techStack: ["React", "Next.js", "Node.js", "MongoDB", "Redis"],
    outcomes: [
      "Onboarded 200+ retailers in the first quarter",
      "Average user savings of 25% on essential products",
      "Implemented high-performance search and filtering",
      "Built a scalable multi-tenant SaaS architecture",
    ],
    links: {
      figma: "https://www.figma.com/design/Os5d80oYW9g39CSJMuQWQb/Priceet-Design?node-id=1-5&t=nBJfEfHOvTzqxU9a-1",
      playStore: "#",
      appStore: "#",
    },
    images: [
      "/Priceet Image 1.png",
      "/Priceet image 2.png",
      "/Priceet image 3.png",
      "/Priceet Image 4.png",
    ],
  },
  {
    id: "04",
    title: "Lacrate",
    category: "Environmental / Logistics",
    description:
      "Smart waste management solution for on-demand collection and efficient disposal scheduling.",
    fullDescription:
      "Lacrate is a modern waste management platform that simplifies the process of waste collection for urban residents and businesses. Through the application, users can easily book waste pickups, track collection vehicles in real-time, and manage their disposal schedules. The platform aims to improve urban sanitation by optimizing collection routes and providing a reliable link between users and waste management services. I designed and developed the frontend and backend systems, ensuring a responsive and intuitive user experience.",
    year: "2026",
    color: "#c45c3e",
    tag: "Product Design",
    role: "Product Designer & Frontend Lead",
    timeline: "5 months",
    techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Google Maps"],
    outcomes: [
      "Optimized collection routes, reducing fuel consumption by 20%",
      "Increased waste collection efficiency in 3 major districts",
      "98% user satisfaction rate for on-demand booking",
      "Automated scheduling and billing for enterprise clients",
    ],
    links: {
      figma: "https://www.figma.com/design/RAX8E2J9Kj7CweCsKO66Pc/Lacarte?node-id=7-2965&t=SOyxoh2NEs7yh2td-1",
      website: "#",
    },
    images: [
      "/Lacarte image 1.png",
      "/Lacarte image 2.png",
      "/Lacarte image 3.png",
      "/Lacarte image 4.png",
    ],
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useMouseParallax } from "../hooks/useMouseParallax";
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

// ── Featured projects — shown by default ──────────────────────────────────────
const featuredProjects: ProjectDetail[] = [
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
    },
    images: [
      "/Lacarte image 1.png",
      "/Lacarte image 2.png",
      "/Lacarte image 3.png",
      "/Lacarte image 4.png",
    ],
  },
];

// ── Additional projects — revealed on "View All" ───────────────────────────────
// Add your extra projects here. Copy the structure above and fill in the details.
const additionalProjects: ProjectDetail[] = [
  {
    id: "05",
    title: "FacilityBill",
    category: "FinTech / PropTech",
    description:
      "A smart bill payment platform for estates and facilities — covering electricity, DSTV, internet, and micro-loans for utility purchases.",
    fullDescription:
      "FacilityBill is a comprehensive utility management and payment platform built for estates and facility managers. It enables residents to pay electricity bills, DSTV subscriptions, and internet services from a single dashboard. A standout feature is the micro-loan facility, which allows users to borrow funds to purchase electricity tokens or cover other utility costs — making essential services accessible even when funds are low. I led the product design and strategy, focusing on simplifying complex billing workflows into an intuitive, trust-building experience for both estate managers and residents.",
    year: "2025",
    color: "#5a9e8f",
    tag: "Product Design",
    role: "Lead Product Designer",
    timeline: "5 months",
    techStack: ["React Native", "Node.js", "PostgreSQL", "Paystack", "Firebase"],
    outcomes: [
      "Reduced bill payment friction for 1,000+ estate residents",
      "Micro-loan feature achieved 80% repayment rate in pilot",
      "Consolidated 4 utility payment types into one platform",
      "Onboarded 15+ estates within the first two months",
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.facilitybill&hl=en",
    },
    images: [
      "/FacilityBill-Image.png",
      "/FacilityBill-Image 1.png",
      "/FacilityBill-Image 2.png",
      "/FacilityBill-Image 3.png",
    ],
  },
  {
    id: "06",
    title: "ELS",
    category: "Mobility / Luxury",
    description:
      "A premium chauffeur-driven ride platform offering a luxury Uber-style experience for discerning passengers.",
    fullDescription:
      "ELS (Executive Luxury Service) is a high-end mobility platform that connects passengers with professional chauffeurs for a premium, white-glove travel experience. Unlike standard ride-hailing apps, ELS focuses on comfort, discretion, and reliability — catering to executives, high-net-worth individuals, and anyone who values a superior ride experience. The platform features advance booking, real-time tracking, curated vehicle categories, and a seamless in-app payment flow. I owned the end-to-end product design, crafting a visual language and UX that reflects the luxury positioning of the brand.",
    year: "2025",
    color: "#d4a574",
    tag: "Product Design",
    role: "Lead Product Designer",
    timeline: "4 months",
    techStack: ["Flutter", "Node.js", "Google Maps API", "Stripe", "Firebase"],
    outcomes: [
      "Designed a premium booking flow with under 3 taps to confirm a ride",
      "Achieved 4.9/5 average driver rating in beta launch",
      "Reduced cancellation rate by 35% through advance scheduling",
      "Built a driver onboarding flow that cut verification time by 60%",
    ],
    links: {
      figma: "https://www.figma.com/design/GpAuYiHO7o9MBr0rNHRG11/Els?node-id=1-3&t=1jmZUlfWMHgiZjjw-1",
    },
    images: [
      "/ELS-Image1.png",
      "/ELS-Image 2.png",
      "/ELS-Image 3.png",
      "/ELS-Image 4.png",
    ],
  },
  {
    id: "07",
    title: "BuzzMap",
    category: "Events / Social Discovery",
    description:
      "A location-based event discovery platform that helps users find exciting events happening near them in real time.",
    fullDescription:
      "BuzzMap is a social event discovery platform that uses geolocation to surface relevant events happening in a user's immediate vicinity. Whether it's a concert, pop-up market, networking event, or community gathering — BuzzMap surfaces it on an interactive map in real time. Users can RSVP, share events, and follow organisers, while event hosts get powerful tools to promote and manage attendance. I led the product design and UX strategy, focusing on making discovery feel effortless and the map interface intuitive across both mobile and web.",
    year: "2025",
    color: "#8a6fc7",
    tag: "Product Design",
    role: "Product Designer & Product Manager",
    timeline: "6 months",
    techStack: ["React Native", "Next.js", "Google Maps API", "Node.js", "MongoDB"],
    outcomes: [
      "Mapped 500+ events across 3 cities in the first month",
      "70% of users discovered at least one new event per week",
      "Event host tools reduced setup time from 20 mins to under 5",
      "Achieved 4.7/5 app store rating in beta",
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.nodescale.buzzmap",
    },
    images: [
      "/BuzzMap-Image.png",
      "/BuzzMap-Image 1.png",
      "/BuzzMap-Image 2.png",
      "/BuzzMap-Image 3.png",
    ],
  },
];

const allProjects = [...featuredProjects, ...additionalProjects];

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
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="grid lg:grid-cols-[1fr_2fr_1fr] gap-6 lg:gap-12 items-start py-10 border-b border-border hover:bg-surface/50 transition-colors duration-500 px-4 -mx-4 relative">
        {/* Accent line */}
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
              style={{ borderColor: `${project.color}30`, color: project.color }}
            >
              {project.tag}
            </span>
          </div>
          <p className="text-muted leading-relaxed max-w-xl">{project.description}</p>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-4">
          <span className="text-sm text-muted tracking-wide">{project.category}</span>
          <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 group-hover:text-background transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

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
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax({ intensity: 16 });

  const visibleProjects = showAll ? allProjects : featuredProjects;
  const hasMore = additionalProjects.length > 0;

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
      <GlowOrb mouseX={mouseX} mouseY={mouseY} color="accent" size={250} intensity={10} className="top-0 left-1/4" />
      <FloatingRing mouseX={mouseX} mouseY={mouseY} intensity={16} size={60} className="top-24 right-16" />
      <FloatingDot mouseX={mouseX} mouseY={mouseY} intensity={20} size={5} className="bottom-32 left-20" />
      <FloatingPlus mouseX={mouseX} mouseY={mouseY} intensity={14} className="top-48 left-48" />
      <DiagonalLine className="bottom-24 right-32" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20"
        >
          <div>
            <span className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
              Selected Work
            </span>
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight">
              Projects that define
              <br />
              <span className="font-medium gradient-text">craft and purpose</span>
            </h2>
          </div>

          {/* Project count badge */}
          <div className="flex items-center gap-3 self-start sm:self-end pb-1">
            <span className="text-xs text-muted font-mono tracking-wider">
              {allProjects.length} projects
            </span>
            <div className="w-8 h-px bg-border" />
          </div>
        </motion.div>

        {/* Project list */}
        <div>
          {/* Featured — always visible */}
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => handleOpenProject(project)}
            />
          ))}

          {/* Additional — revealed on expand */}
          <AnimatePresence>
            {showAll && additionalProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                style={{ overflow: "hidden" }}
              >
                <ProjectCard
                  project={project}
                  index={featuredProjects.length + index}
                  onClick={() => handleOpenProject(project)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All / Show Less button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-16"
          >
            <motion.button
              onClick={() => setShowAll((prev) => !prev)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 border border-border hover:border-accent px-8 py-4 text-sm text-muted hover:text-foreground tracking-wide transition-all duration-300 relative"
            >
              {/* Animated accent underline */}
              <span className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-all duration-500" />
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  View All Projects
                  <span className="text-xs font-mono text-accent">
                    +{additionalProjects.length}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

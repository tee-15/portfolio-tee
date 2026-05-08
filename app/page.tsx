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
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function AboutSection() {
  const {
    ref,
    x: decorX,
    y: decorY,
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax({ intensity: 20 });

  const { x: decorX2, y: decorY2 } = useMouseParallaxValue(mouseX, mouseY, {
    intensity: -14,
  });

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
      <GlowOrb mouseX={mouseX} mouseY={mouseY} color="accent-secondary" size={350} intensity={12} className="-top-20 -left-20" />
      <FloatingRing mouseX={mouseX} mouseY={mouseY} intensity={20} size={80} className="top-24 right-24" />
      <FloatingDot mouseX={mouseX} mouseY={mouseY} intensity={25} size={8} className="bottom-32 left-24" />
      <FloatingPlus mouseX={mouseX} mouseY={mouseY} intensity={18} className="top-40 left-40" />
      <DiagonalLine className="bottom-20 right-40" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.span
            variants={fadeInUp}
            className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4 block"
          >
            About
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-light tracking-tight mb-8"
          >
            Design-driven
            <br />
            <span className="font-medium gradient-text">problem solver</span>
          </motion.h2>
          <motion.div variants={fadeInUp} className="flex gap-8 mt-10">
            <div>
              <span className="text-3xl lg:text-4xl font-light text-accent">8+</span>
              <p className="text-sm text-muted mt-1">Years Experience</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <span className="text-3xl lg:text-4xl font-light text-accent-secondary">50+</span>
              <p className="text-sm text-muted mt-1">Projects Delivered</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <span className="text-3xl lg:text-4xl font-light text-accent-tertiary">30+</span>
              <p className="text-sm text-muted mt-1">Happy Clients</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-6 text-muted text-lg leading-relaxed"
        >
          <motion.p variants={fadeInUp}>
            With extensive experience spanning product design, project management,
            and mobile app development, I bring ideas to life with a focus on
            user experience and technical excellence.
          </motion.p>
          <motion.p variants={fadeInUp}>
            I believe the best digital products are born at the intersection of
            beautiful design and robust execution. Every project is an opportunity
            to create something meaningful.
          </motion.p>
          <motion.div variants={fadeInUp} className="pt-4">
            <div className="flex flex-wrap gap-3">
              {["Figma", "React", "Next.js", "TypeScript", "Node.js", "Flutter", "Agile", "Scrum"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 text-sm border border-border text-muted hover:border-accent hover:text-foreground transition-all duration-300"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </motion.div>
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

"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useMouseParallax, useMouseParallaxValue } from "../hooks/useMouseParallax";
import Image from "next/image";
import { CornerBrackets, DottedGrid } from "./Decorations";

export default function Hero() {
  const {
    ref: heroRef,
    x: decorX,
    y: decorY,
    mouseX,
    mouseY,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseParallax({ intensity: 25 });

  const { x: decorX2, y: decorY2 } = useMouseParallaxValue(mouseX, mouseY, {
    intensity: -18,
  });
  const { x: decorX3, y: decorY3 } = useMouseParallaxValue(mouseX, mouseY, {
    intensity: 12,
  });
  const { x: decorX4, y: decorY4 } = useMouseParallaxValue(mouseX, mouseY, {
    intensity: -8,
  });
  const { x: textX, y: textY } = useMouseParallaxValue(mouseX, mouseY, {
    intensity: 8,
  });

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 overflow-hidden"
    >
      <DottedGrid className="inset-0 w-full h-full" />

      {/* Background glow orbs */}
      <motion.div
        style={{ x: decorX4, y: decorY4 }}
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ x: decorX3, y: decorY3 }}
        className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-accent-secondary/5 blur-[100px] pointer-events-none"
      />

      {/* Floating decorative elements */}
      <motion.div
        style={{ x: decorX, y: decorY }}
        className="absolute top-20 left-20 w-3 h-3 rounded-full bg-accent/40 hidden lg:block"
      />
      <motion.div
        style={{ x: decorX2, y: decorY2 }}
        className="absolute bottom-32 right-32 w-2 h-2 rounded-full bg-accent-secondary/40 hidden lg:block"
      />
      <motion.div
        style={{ x: decorX3, y: decorY }}
        className="absolute top-40 right-40 hidden lg:block"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <line x1="10" y1="0" x2="10" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-accent/20" />
          <line x1="0" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-accent/20" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            style={{ x: textX, y: textY }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block text-accent text-sm tracking-[0.2em] uppercase font-medium mb-6">
                Product Designer & Project Manager
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[0.95] mb-8"
            >
              Driving
              <br />
              <span className="font-medium gradient-text">Product</span>
              <br />
              <span className="font-medium">Strategy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-muted text-lg lg:text-xl max-w-md leading-relaxed mb-10"
            >
              Bridging the gap between user-centric design and strategic project execution. I build scalable digital solutions with a focus on precision and delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-6"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-background px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300"
              >
                View Work
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="text-sm text-muted hover:text-foreground transition-colors duration-300 tracking-wide border-b border-border hover:border-foreground pb-1"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]">
              <motion.div
                style={{ x: decorX, y: decorY }}
                className="absolute inset-0 bg-surface-light border border-border"
              />
              <motion.div
                style={{ x: decorX2, y: decorY2 }}
                className="absolute inset-4 bg-surface border border-border flex items-center justify-center overflow-hidden"
              >
                <Image
                  src="/cartoon-woman-wearing-glasses.jpg"
                  alt="Temitope Williams - Product Designer & Project Manager"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                style={{ x: decorX3, y: decorY3 }}
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent"
              />
              <motion.div
                style={{ x: decorX2, y: decorY }}
                className="absolute -top-4 -left-4 w-16 h-16 border border-accent"
              />
              <CornerBrackets className="-inset-6" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}

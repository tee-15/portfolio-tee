"use client";

import { motion } from "framer-motion";
import { useMouseParallaxValue } from "../hooks/useMouseParallax";
import type { MotionValue } from "framer-motion";

export function GlowOrb({
  mouseX,
  mouseY,
  color = "accent",
  size = 300,
  intensity = 15,
  className = "",
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  color?: "accent" | "accent-secondary" | "accent-tertiary";
  size?: number;
  intensity?: number;
  className?: string;
}) {
  const { x, y } = useMouseParallaxValue(mouseX, mouseY, { intensity });

  const colorMap = {
    accent: "bg-accent/15",
    "accent-secondary": "bg-accent-secondary/10",
    "accent-tertiary": "bg-accent-tertiary/10",
  };

  return (
    <motion.div
      style={{ x, y }}
      className={`glow-orb ${colorMap[color]} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
    >
      <div
        className="rounded-full"
        style={{ width: size, height: size }}
      />
    </motion.div>
  );
}

export function FloatingRing({
  mouseX,
  mouseY,
  intensity = 20,
  size = 60,
  className = "",
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  intensity?: number;
  size?: number;
  className?: string;
}) {
  const { x, y } = useMouseParallaxValue(mouseX, mouseY, { intensity });

  return (
    <motion.div
      style={{ x, y, width: size, height: size }}
      className={`absolute rounded-full border border-accent/10 hidden lg:block ${className}`}
    />
  );
}

export function FloatingDot({
  mouseX,
  mouseY,
  intensity = 25,
  size = 6,
  className = "",
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  intensity?: number;
  size?: number;
  className?: string;
}) {
  const { x, y } = useMouseParallaxValue(mouseX, mouseY, { intensity });

  return (
    <motion.div
      style={{ x, y, width: size, height: size }}
      className={`absolute rounded-full bg-accent/30 hidden lg:block ${className}`}
    />
  );
}

export function FloatingPlus({
  mouseX,
  mouseY,
  intensity = 18,
  size = 16,
  className = "",
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  intensity?: number;
  size?: number;
  className?: string;
}) {
  const { x, y } = useMouseParallaxValue(mouseX, mouseY, { intensity });

  return (
    <motion.div
      style={{ x, y }}
      className={`absolute hidden lg:block ${className}`}
    >
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1" className="text-accent/25" />
        <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1" className="text-accent/25" />
      </svg>
    </motion.div>
  );
}

export function SectionNumber({
  number,
  className = "",
}: {
  number: string;
  className?: string;
}) {
  return (
    <span
      className={`absolute font-mono text-[12rem] md:text-[16rem] font-light leading-none select-none pointer-events-none ${className}`}
      style={{
        background: "linear-gradient(180deg, rgba(196, 92, 62, 0.06) 0%, rgba(196, 92, 62, 0.02) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {number}
    </span>
  );
}

export function DottedGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none opacity-[0.04] ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, #f5f0e8 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />
  );
}

export function CornerBrackets({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      {/* Top left */}
      <div className="absolute -top-2 -left-2 w-4 h-4">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-accent/30" />
        <div className="absolute top-0 left-0 w-[1px] h-full bg-accent/30" />
      </div>
      {/* Top right */}
      <div className="absolute -top-2 -right-2 w-4 h-4">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent/30" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent/30" />
      </div>
      {/* Bottom left */}
      <div className="absolute -bottom-2 -left-2 w-4 h-4">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-accent/30" />
        <div className="absolute bottom-0 left-0 w-[1px] h-full bg-accent/30" />
      </div>
      {/* Bottom right */}
      <div className="absolute -bottom-2 -right-2 w-4 h-4">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-accent/30" />
        <div className="absolute bottom-0 right-0 w-[1px] h-full bg-accent/30" />
      </div>
    </div>
  );
}

export function DiagonalLine({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute hidden lg:block ${className}`}>
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
        <line x1="0" y1="60" x2="60" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-accent/15" />
      </svg>
    </div>
  );
}

"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element is pulled toward the cursor (0–1). */
  strength?: number;
  className?: string;
}

/**
 * Wraps a child (usually a button or link) and gently pulls it toward the
 * cursor on hover, springing back on leave. Respects reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 200, mass: 0.4 });
  const springY = useSpring(y, { damping: 20, stiffness: 200, mass: 0.4 });

  const handleMouseMove = (e: MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

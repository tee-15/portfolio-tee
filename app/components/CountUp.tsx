"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Animates a number from 0 → value the first time it scrolls into view.
 * Falls back to the final value instantly when reduced-motion is preferred.
 */
export default function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className = "",
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, prefersReducedMotion]);

  const shown = prefersReducedMotion ? value : display;

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

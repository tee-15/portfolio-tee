"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

interface ParallaxConfig {
  intensity?: number;
  damping?: number;
  stiffness?: number;
}

export function useMouseParallax(config: ParallaxConfig = {}) {
  const { intensity = 20, damping = 25, stiffness = 150 } = config;
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping, stiffness };
  const x = useSpring(
    useTransform(mouseX, (v) => v * intensity),
    springConfig
  );
  const y = useSpring(
    useTransform(mouseY, (v) => v * intensity),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return { ref, x, y, mouseX, mouseY, handleMouseMove, handleMouseLeave };
}

export function useMouseParallaxValue(
  mouseX: MotionValue<number>,
  mouseY: MotionValue<number>,
  config: ParallaxConfig = {}
) {
  const { intensity = 20, damping = 25, stiffness = 150 } = config;
  const springConfig = { damping, stiffness };

  const x = useSpring(
    useTransform(mouseX, (v) => v * intensity),
    springConfig
  );
  const y = useSpring(
    useTransform(mouseY, (v) => v * intensity),
    springConfig
  );

  return { x, y };
}

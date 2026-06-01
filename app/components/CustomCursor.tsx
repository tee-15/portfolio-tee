"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Initialise off-screen — no setState inside effect needed
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 400 });
  const ringXSpring = useSpring(cursorX, { damping: 20, stiffness: 200 });
  const ringYSpring = useSpring(cursorY, { damping: 20, stiffness: 200 });

  // Detect touch/reduced-motion before rendering
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      )) setIsHovering(true);
    };

    const handleOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
      )) setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY, prefersReducedMotion, isTouchDevice]);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{ width: isHovering ? 8 : 6, height: isHovering ? 8 : 6 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ x: ringXSpring, y: ringYSpring, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-accent/60"
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            borderColor: isHovering ? "rgba(196,92,62,0.9)" : "rgba(196,92,62,0.4)",
            backgroundColor: isHovering ? "rgba(196,92,62,0.08)" : "rgba(196,92,62,0)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}

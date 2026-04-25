import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const GridBackground = () => {
  const { scrollYProgress } = useScroll();

  // Parallax speeds
  const slowY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), {
    stiffness: 40,
    damping: 20,
  });

  const mediumY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 40,
    damping: 20,
  });

  const fastY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 140]), {
    stiffness: 40,
    damping: 20,
  });

  const gridOpacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 0]);

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">

      {/* GRID LAYERS (supporting only) */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(circle at center, black 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 45%, transparent 100%)",
        }}
      >
        {/* Background grid (soft + blurred) */}
        <motion.div style={{ y: slowY, opacity: gridOpacity }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,220,120,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,220,120,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "90px 80px",
              filter: "blur(1.2px)",
            }}
          />
        </motion.div>

        {/* Mid grid */}
        <motion.div style={{ y: mediumY, opacity: gridOpacity }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,174,0,0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,174,0,0.12) 1px, transparent 1px)
              `,
              backgroundSize: "44px 40px",
              filter: "blur(0.6px)",
            }}
          />
        </motion.div>

        {/* Foreground grid (slightly rotated for imperfection) */}
        <motion.div style={{ y: fastY, opacity: gridOpacity }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,200,50,0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,200,50,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "55px 48px",
              transform: "rotate(1.5deg) translate(12px, 8px)",
              filter: "blur(0.3px)",
            }}
          />
        </motion.div>
      </div>

      {/* VIGNETTE (focus control) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* NOISE (alive, subtle) */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        animate={{ opacity: [0.02, 0.035, 0.02] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/noise.png')",
          mixBlendMode: "soft-light",
        }}
      />

    </div>
  );
};

export default GridBackground;
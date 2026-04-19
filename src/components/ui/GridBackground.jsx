import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const GridBackground = () => {
  const { scrollYProgress } = useScroll();

  // Grid movement (slow drift)
  const gridYRaw = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const gridY = useSpring(gridYRaw, { stiffness: 40, damping: 20 });

  // Grid fade out
  const gridOpacity = useTransform(scrollYProgress, [0, 0.6], [0.25, 0]);

  // Glow fade
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [0.25, 0]);

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">

      {/* Glow Layer */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0"
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.18),transparent_60%)]" />
      </motion.div>

      {/* Grid Layer */}
      <motion.div
        style={{ y: gridY, opacity: gridOpacity }}
        className="absolute inset-0"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 174, 0, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(252, 186, 3, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            filter: "blur(0.3px)"
          }}
        />
      </motion.div>

    </div>
  );
};

export default GridBackground;
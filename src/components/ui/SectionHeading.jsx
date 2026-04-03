import React from 'react';
import { motion } from 'framer-motion';

/**
 * Unified SectionHeading — matches the "Batch Soundtrack" aesthetic:
 *   eyebrow label (optional) · large serif title · animated underline · subtitle
 *
 * Props:
 *   title      {string}  — required
 *   subtitle   {string}  — optional
 *   eyebrow    {string}  — optional small uppercase label above title
 *   className  {string}  — extra classes on the wrapper
 */
const SectionHeading = ({ title, subtitle, eyebrow, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`text-center mb-12 ${className}`}
    >
      {/* Eyebrow / superscript label */}
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-amber-500/60 uppercase tracking-[0.32em] text-xs font-sans mb-3"
        >
          {eyebrow}
        </motion.p>
      )}

      {/* Main title */}
      <h2
        className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-amber-100 inline-block relative"
        style={{ textShadow: '0 2px 28px rgba(200,140,50,0.22)' }}
      >
        {title}

        {/* Animated underline gradient */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -bottom-2 left-0 w-full h-[2px] origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.7), transparent)',
          }}
        />
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-amber-500/65 max-w-2xl mx-auto mt-6 text-base md:text-lg font-sans"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Upgraded SectionHeading:
 *   • eyebrow with amber dot + tracking animation
 *   • large serif title with text-shadow glow
 *   • animated handwritten brush-stroke SVG underline (draws on scroll)
 *   • subtitle fade-up
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
      {/* Eyebrow label with decorative amber dot */}
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          {/* Small amber wax dot */}
          <span
            className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #fcd34d, #b45309)',
              boxShadow: '0 0 6px rgba(245,158,11,0.5)',
            }}
          />
          <p className="text-amber-500/60 uppercase tracking-[0.32em] text-xs font-sans">
            {eyebrow}
          </p>
          <span
            className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #fcd34d, #b45309)',
              boxShadow: '0 0 6px rgba(245,158,11,0.5)',
            }}
          />
        </motion.div>
      )}

      {/* Main title with glow + brush-stroke underline */}
      <h2
        className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-amber-100 inline-block relative"
        style={{ textShadow: '0 2px 32px rgba(200,140,50,0.28), 0 0 60px rgba(245,158,11,0.1)' }}
      >
        {title}

        {/* Animated brush-stroke SVG underline */}
        <motion.svg
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          viewBox="0 0 200 12"
          className="absolute -bottom-3 left-0 w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ overflow: 'visible' }}
        >
          <motion.path
            d="M2,8 Q25,3 50,8 T100,6 T150,9 T198,5"
            fill="none"
            stroke="url(#brushGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="brushGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="transparent" />
              <stop offset="25%"  stopColor="rgba(245,158,11,0.7)" />
              <stop offset="75%"  stopColor="rgba(245,158,11,0.85)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </motion.svg>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-amber-500/65 max-w-2xl mx-auto mt-7 text-base md:text-lg font-sans"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

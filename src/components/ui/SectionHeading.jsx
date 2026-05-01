import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ title, subtitle, eyebrow, className = '' }) => {
  const titleWords = title ? title.split(' ') : [];
  const lastWord = titleWords.length > 0 ? titleWords.pop() : '';
  const firstPart = titleWords.join(' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`text-center relative z-10 ${className}`}
      style={{ willChange: "transform, opacity" }}
    >
      {eyebrow && (
        <h2 className="text-sm md:text-base font-sans font-semibold tracking-[0.3em] text-amber-500 uppercase mb-6 flex items-center justify-center gap-4">
          <span className="w-12 h-[1px] bg-amber-500/50 block"></span>
          {eyebrow}
          <span className="w-12 h-[1px] bg-amber-500/50 block"></span>
        </h2>
      )}
      
      {title && (
        <h3 className="text-6xl md:text-7xl lg:text-[6rem] font-['Caveat'] text-white/90 leading-tight mb-6 tracking-wide drop-shadow-md">
          {firstPart} <span className="text-amber-500/90">{lastWord}</span>
        </h3>
      )}
      
      {subtitle && (
        <p className="text-lg md:text-xl text-white/50 font-sans leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

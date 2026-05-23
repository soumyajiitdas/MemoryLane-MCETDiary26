import React from 'react';
import { motion } from 'framer-motion';

/* ── Typewriter letter-by-letter reveal ──────────────────────────────
   Splits the title into individual characters, each animating in
   with a stagger — like a typewriter printing each letter.
   ───────────────────────────────────────────────────────────────── */
const TypewriterTitle = ({ text, highlightLast = true }) => {
  const words = text ? text.split(' ') : [];
  const lastWord = highlightLast && words.length > 0 ? words.pop() : '';
  const firstPart = words.join(' ');

  const charVariants = {
    hidden: { opacity: 0, x: -4, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      }
    }
  };

  const renderChars = (str, isHighlight = false) =>
    str.split('').map((char, i) => (
      <motion.span
        key={i}
        variants={charVariants}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={isHighlight ? 'text-amber-500/90' : ''}
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));

  return (
    <motion.h3
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-6xl md:text-7xl lg:text-[6rem] font-['Caveat'] text-amber-50/90 leading-tight mb-6 tracking-wide drop-shadow-md"
    >
      {renderChars(firstPart + (lastWord ? ' ' : ''))}
      {lastWord && renderChars(lastWord, true)}
    </motion.h3>
  );
};

/* ── SectionHeading ─────────────────────────────────────────────────
   Props:
     title        — main large title (typewriter animated)
     subtitle     — smaller paragraph below
     eyebrow      — small ALL-CAPS label above
     className    — extra wrapper classes
     sectionNum   — optional "§ II" section number string
   ─────────────────────────────────────────────────────────────────── */
const SectionHeading = ({ title, subtitle, eyebrow, className = '', sectionNum = '' }) => {
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
        <div className="flex items-center justify-center gap-3 mb-2 relative">
          {/* Press rule above eyebrow */}
          <div className="flex-1 max-w-[50px] sm:max-w-[100px] flex flex-col gap-[3px] opacity-80">
            <div className="h-[2px] w-full" style={{ background: 'rgba(200,168,80,0.3)' }} />
            <div className="h-px w-full" style={{ background: 'rgba(200,168,80,0.15)' }} />
          </div>

          <h2 className="font-['Special_Elite'] text-[0.6rem] sm:text-[0.7rem] tracking-[0.4em] sm:tracking-[0.3em] text-amber-500/70 uppercase">
            {eyebrow}
          </h2>

          {/* Optional section number */}
          {sectionNum && (
            <span className="absolute right-0 top-0 font-['Special_Elite'] text-[0.5rem] tracking-widest text-amber-700/30 uppercase">
              {sectionNum}
            </span>
          )}

          <div className="flex-1 max-w-[50px] sm:max-w-[100px] flex flex-col gap-[3px] opacity-80">
            <div className="h-[2px] w-full" style={{ background: 'rgba(200,168,80,0.3)' }} />
            <div className="h-px w-full" style={{ background: 'rgba(200,168,80,0.15)' }} />
          </div>
        </div>
      )}

      {/* Ornamental separator between eyebrow and title */}
      {eyebrow && (
        <div className="flex items-center justify-center mb-4">
          <span className="font-serif text-amber-500/25 text-xs tracking-[0.5em]">✦ · ✦</span>
        </div>
      )}

      {title && <TypewriterTitle text={title} />}

      {subtitle && (
        <p className="text-lg md:text-xl text-amber-100/40 font-['Playfair_Display'] italic leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

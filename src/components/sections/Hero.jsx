import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { DoodleArrow, DoodleSparkle, DoodleCrown } from '../ui/VintageDoodles';

// Polaroids scattered in the background
const bgPolaroids = [
  { id: 1, rot: -12, x: '-30vw', y: '-10vh', img: '/images/scrapbook/24.webp', bg: 'linear-gradient(to right, #f68084, #a6c0fe)', delay: 0,   note: "We lived our moments, without worrying about the rest.", date: "Mar 2026" },
  { id: 2, rot: 8,   x: '25vw',  y: '-15vh', img: '/images/scrapbook/31.jpg', bg: 'linear-gradient(to right, #4facfe, #00f2fe)', delay: 0.2, note: "In every moment, we found our own perfection.", date: "Oct 2023" },
  { id: 3, rot: -5,  x: '-20vw', y: '25vh',  img: '/images/scrapbook/40.jpg', bg: 'linear-gradient(to right, #ff0844, #ffb199)', delay: 0.4, note: "Good times never go to waste.", date: "Feb 2026" },
  { id: 4, rot: 15,  x: '35vw',  y: '20vh',  img: '/images/scrapbook/04.jpg', bg: 'linear-gradient(to right, #f83600, #f9d423)', delay: 0.6, note: "From first steps to forever memories.", date: "Mar 2023" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">

      {/* ── Radial spotlight behind hero text ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 55%, rgba(245,158,11,0.07) 0%, transparent 70%)' }}
      />
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: '600px', height: '500px',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(180, 83, 9, 0.06) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Scattered Polaroids Background ── */}
      {bgPolaroids.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.8, x: p.x, y: p.y }}
          animate={{ opacity: 0.22, scale: 1, x: p.x, y: p.y }}
          transition={{ duration: 1.5, delay: p.delay, ease: 'easeOut' }}
          className="absolute z-0 group"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            initial={{ rotate: p.rot }}
            whileHover={{
              rotateY: 180, rotate: 0, scale: 1.1, opacity: 1, zIndex: 50,
              transition: { duration: 0.6, type: 'spring', damping: 18 }
            }}
            className="relative w-40 h-48 md:w-56 md:h-64 bg-white p-3 shadow-2xl border border-black/10 cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div className="absolute inset-0 p-3 backface-hidden">
              <div className="w-full h-[80%] shadow-inner bg-black/5 overflow-hidden">
                <div
                  
                  className="w-full h-full mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                  style={{ background: p.img ? `url(${p.img}) center/cover no-repeat` : p.bg }}
                />
              </div>
              <div className="mt-2 h-[15%] border-t border-black/5 flex items-center justify-end">
                <span className="text-[10px] uppercase tracking-tighter text-black/60 font-serif">#MCETDiary'26</span>
              </div>
            </div>
            {/* Back */}
            <div
              data-photo="true"
              className="absolute inset-0 p-6 backface-hidden bg-[#fdfaf3] flex flex-col items-center justify-center text-center border border-black/5"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/textures/paper.png')]" />
              <p className="text-amber-900 font-['Caveat'] text-xl md:text-2xl leading-tight">"{p.note}"</p>
              <div className="mt-4 pt-4 border-t border-amber-900/10 w-full">
                <span className="text-amber-700/60 font-['Caveat'] text-sm">— {p.date}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* ── Main Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto space-y-6"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Cursive "Our" with animated scribble underline */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20, rotate: -5 },
            visible: { opacity: 1, y: 0, rotate: -5, transition: { duration: 0.8, ease: 'easeOut' } }
          }}
          className="relative inline-block text-amber-500 font-['Caveat'] text-4xl md:text-5xl -mb-6 mr-32 z-20"
        >
          Our
          <motion.svg
            viewBox="0 0 80 10"
            className="absolute -bottom-2 left-0 w-full"
            aria-hidden="true"
            style={{ overflow: 'visible' }}
          >
            <motion.path
              d="M2,6 Q10,2 20,6 T38,5 T56,7 T78,4"
              fill="none"
              stroke="rgba(245,158,11,0.7)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.7, ease: 'easeInOut' }}
            />
          </motion.svg>
        </motion.div>

        {/* Hero Title — shimmer animated gradient */}
        <motion.div variants={itemVariants} className="relative inline">
          {/* Sketch Sparkle Doodle floating near the title */}
          <DoodleSparkle className="w-16 h-16 top-[-30px] right-[-40px] opacity-80" />
          <DoodleCrown className="w-12 h-12 sm:w-20 sm:h-20 absolute -top-2 -left-65 sm:-top-5 sm:-left-106 -rotate-15 mix-blend-screen opacity-60" color="rgba(245, 158, 11, 0.8)" />
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-['Caveat'] text-white tracking-tighter drop-shadow-lg"
          >
            MCET{' '}
            <span
              className="font-serif relative text-gradient-animate"
            >
              Diary'26
            </span>
          </h1>
        </motion.div>

        {/* Cursive Quote */}
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-4xl text-[var(--color-text-muted)] mt-6 font-['Caveat'] italic font-medium pt-4"
        >
          "The days we'll never forget..."
        </motion.p>

        {/* Batch subtitle */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut', delay: 0.4 } }
          }}
          className="uppercase tracking-[0.3em] text-xs md:text-sm text-gray-500 mt-6 pt-6"
        >
          Batch of 2022 — 2026
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut', delay: 0.5 } }
          }}
          className="relative flex flex-col sm:flex-row gap-4 items-center justify-center mt-12 pt-8 font-serif"
        >
          {/* Sketch Arrow pointing outwards */}
          <DoodleArrow className="hidden md:block w-24 h-24 absolute left-[-180px] top-[-20px] opacity-80 transform -scale-x-100 rotate-45" />

          <Button size="lg" variant="primary" onClick={() => window.location.href = '/chapters'}>
            Read The Chapters →
          </Button>
          <Button size="lg" variant="secondary" onClick={() => window.location.href = '/the-cast'}>
            ✦ Meet The Cast
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;

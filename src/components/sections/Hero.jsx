import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

// Dummy list of polaroids to scatter in the background
const bgPolaroids = [
  { id: 1, rot: -12, x: '-30vw', y: '-10vh', bg: 'linear-gradient(to right, #f68084, #a6c0fe)', delay: 0 },
  { id: 2, rot: 8, x: '25vw', y: '-15vh', bg: 'linear-gradient(to right, #4facfe, #00f2fe)', delay: 0.2 },
  { id: 3, rot: -5, x: '-20vw', y: '25vh', bg: 'linear-gradient(to right, #ff0844, #ffb199)', delay: 0.4 },
  { id: 4, rot: 15, x: '35vw', y: '20vh', bg: 'linear-gradient(to right, #f83600, #f9d423)', delay: 0.6 },
];

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Scattered Polaroids Background */}
      {bgPolaroids.map((p) => (
         <motion.div
           key={p.id}
           initial={{ opacity: 0, scale: 0.5, rotate: 0, x: p.x, y: p.y }}
           animate={{ opacity: 0.15, scale: 1, rotate: p.rot, x: p.x, y: p.y }}
           transition={{ duration: 1.5, delay: p.delay, type: 'spring' }}
           className="absolute w-40 h-48 md:w-56 md:h-64 bg-white p-3 shadow-2xl z-0 pointer-events-none border border-black/10"
         >
            <div className="w-full h-[80%] shadow-inner" style={{ background: p.bg }}>
              <div className="w-full h-full bg-black/5 mix-blend-multiply"></div>
            </div>
         </motion.div>
      ))}

      {/* Main Content Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
        
        {/* Cursive Annotation */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-amber-500 font-['Caveat'] text-4xl md:text-5xl -mb-6 mr-32 inline-block z-20"
        >
          Our
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-['Caveat'] text-white tracking-tighter shadow-black/50 drop-shadow-lg"
        >
          MCET <span className="text-gradient font-serif">Diary'26</span> 
        </motion.h1>

        {/* Cursive Quote */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-4xl text-[var(--color-text-muted)] mt-6 font-['Caveat'] italic font-medium pt-4"
        >
          "The best days we'll never forget..."
        </motion.p>

        {/* Small subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="uppercase tracking-[0.3em] text-xs md:text-sm text-gray-500 mt-6 pt-6"
        >
           Batch of 2022 — 2026
        </motion.p>
        
        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12 pt-8 font-serif"
        >
          <Button size="lg" variant="primary" onClick={() => window.location.href='/chapters'}>
            Read The Chapters
          </Button>
          <Button size="lg" variant="secondary" onClick={() => window.location.href='/the-cast'}>
             Meet The Cast
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

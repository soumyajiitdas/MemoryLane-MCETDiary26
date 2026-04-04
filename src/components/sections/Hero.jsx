import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

// Dummy list of polaroids to scatter in the background with "Back of Polaroid" notes
const bgPolaroids = [
  { id: 1, rot: -12, x: '-30vw', y: '-10vh', img: '/images/scrapbook/16.jpg', bg: 'linear-gradient(to right, #f68084, #a6c0fe)', delay: 0, note: "The first day we met at the canteen.", date: "Aug 2023" },
  { id: 2, rot: 8, x: '25vw', y: '-15vh', img: '/images/scrapbook/17.jpg', bg: 'linear-gradient(to right, #4facfe, #00f2fe)', delay: 0.2, note: "Library sessions or just library naps?", date: "Oct 2023" },
  { id: 3, rot: -5, x: '-20vw', y: '25vh', img: '/images/scrapbook/18.jpg', bg: 'linear-gradient(to right, #ff0844, #ffb199)', delay: 0.4, note: "That record-breaking hackathon night.", date: "Feb 2024" },
  { id: 4, rot: 15, x: '35vw', y: '20vh', img: '/images/scrapbook/01.jpg', bg: 'linear-gradient(to right, #f83600, #f9d423)', delay: 0.6, note: "Finally, the senior trip we promised.", date: "Mar 2025" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Scattered Polaroids Background */}
      {bgPolaroids.map((p) => (
         <motion.div
           key={p.id}
           initial={{ opacity: 0, scale: 0.8, x: p.x, y: p.y }}
           animate={{ opacity: 0.15, scale: 1, x: p.x, y: p.y }}
           transition={{ duration: 1.5, delay: p.delay, ease: "easeOut" }}
           className="absolute z-0 group"
           style={{ perspective: '1000px' }}
         >
            <motion.div
              initial={{ rotate: p.rot }}
              whileHover={{ 
                rotateY: 180, 
                rotate: 0,
                scale: 1.4, 
                opacity: 1,
                zIndex: 50,
                transition: { duration: 0.6, type: 'spring', damping: 20 }
              }}
              className="relative w-40 h-48 md:w-56 md:h-64 bg-white p-3 shadow-2xl border border-black/10 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Side */}
              <div className="absolute inset-0 p-3 backface-hidden">
                <div className="w-full h-[80%] shadow-inner bg-black/5 overflow-hidden">
                  <div 
                    className="w-full h-full mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                    style={{
                      background: p.img ? `url(${p.img}) center/cover no-repeat` : p.bg
                    }}
                  ></div>
                </div>
                <div className="mt-2 h-[15%] border-t border-black/5 flex items-center justify-end">
                   <span className="text-[10px] uppercase tracking-tighter text-black/60 font-serif">#MemoryLane</span>
                </div>
              </div>

              {/* Back Side (Handwritten Note) */}
              <div 
                className="absolute inset-0 p-6 backface-hidden bg-[#fdfaf3] flex flex-col items-center justify-center text-center border border-black/5"
                style={{ transform: 'rotateY(180deg)' }}
              >
                {/* Vintage paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]"></div>
                
                <p className="text-amber-900 font-['Caveat'] text-xl md:text-2xl leading-tight">
                  "{p.note}"
                </p>
                <div className="mt-4 pt-4 border-t border-amber-900/10 w-full">
                  <span className="text-amber-700/60 font-['Caveat'] text-sm">
                    — {p.date}
                  </span>
                </div>
              </div>
            </motion.div>
         </motion.div>
      ))}

      {/* Main Content Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto space-y-6"
      >
        
        {/* Cursive Annotation */}
        <motion.div
           variants={{
            hidden: { opacity: 0, y: 20, rotate: -5 },
            visible: { opacity: 1, y: 0, rotate: -5, transition: { duration: 0.8, ease: "easeOut" } }
          }}
          className="text-amber-500 font-['Caveat'] text-4xl md:text-5xl -mb-6 mr-32 inline-block z-20"
        >
          Our
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-9xl font-['Caveat'] text-white tracking-tighter shadow-black/50 drop-shadow-lg"
        >
          MCET <span className="text-gradient font-serif">Diary'26</span> 
        </motion.h1>

        {/* Cursive Quote */}
        <motion.p 
          variants={itemVariants}
          className="text-2xl md:text-4xl text-[var(--color-text-muted)] mt-6 font-['Caveat'] italic font-medium pt-4"
        >
          "The best days we'll never forget..."
        </motion.p>

        {/* Small subtitle */}
        <motion.p
           variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", delay: 0.4 } }
          }}
          className="uppercase tracking-[0.3em] text-xs md:text-sm text-gray-500 mt-6 pt-6"
        >
           Batch of 2022 — 2026
        </motion.p>
        
        {/* Buttons */}
        <motion.div
           variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", delay: 0.5 } }
          }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12 pt-8 font-serif"
        >
          <Button size="lg" variant="primary" onClick={() => window.location.href='/chapters'}>
            Read The Chapters
          </Button>
          <Button size="lg" variant="secondary" onClick={() => window.location.href='/the-cast'}>
             Meet The Cast
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;

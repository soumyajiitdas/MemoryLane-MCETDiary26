import React from 'react';
import { motion } from 'framer-motion';

const DiaryLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
      {/* Book Container */}
      <div className="relative w-24 h-16" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>

        {/* Right Cover (Back Cover when open) */}
        <div className="absolute right-0 w-1/2 h-full bg-[#3d291a] rounded-r-md shadow-lg border border-[#2b1d13]" />

        {/* Left Cover */}
        <div className="absolute left-0 w-1/2 h-full bg-[#3d291a] rounded-l-md shadow-lg border border-[#2b1d13]" />

        {/* Right Page Stack */}
        <div className="absolute right-1 top-1 bottom-1 left-[50%] bg-[#E3D1BC] rounded-r-sm border border-black/10 shadow-inner" style={{ backgroundImage: "url('/textures/paper-grain.png')" }} />

        {/* Left Page Stack */}
        <div className="absolute left-1 top-1 bottom-1 right-[50%] bg-[#E3D1BC] rounded-l-sm border border-black/10 shadow-inner" style={{ backgroundImage: "url('/textures/paper-grain.png')" }} />

        {/* Flipping Pages */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute right-1 top-1 bottom-1 left-[50%] bg-[#E3D1BC] border border-black/10 rounded-r-sm shadow-[inset_2px_0_5px_rgba(0,0,0,0.05)] origin-left"
            style={{ backgroundImage: "url('/textures/paper-grain.png')", backfaceVisibility: 'hidden' }}
            animate={{
              rotateY: [0, -180],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Flipping Pages Backface (The back of the page when turned) */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`back-${i}`}
            className="absolute right-1 top-1 bottom-1 left-[50%] bg-[#E3D1BC] border border-black/10 rounded-l-sm shadow-[inset_-2px_0_5px_rgba(0,0,0,0.05)] origin-left"
            style={{ backgroundImage: "url('/textures/paper-grain.png')", backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            animate={{
              rotateY: [180, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Spine Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-[#2b1d13] shadow-md z-30 opacity-80" />
      </div>

      <p className="font-['Caveat'] text-amber-500/80 text-2xl tracking-widest animate-pulse">
        Opening Diary...
      </p>
      <div className="flex gap-2.5">
        <motion.div animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
        <motion.div animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
        <motion.div animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
      </div>
    </div>
  );
};

export default DiaryLoader;

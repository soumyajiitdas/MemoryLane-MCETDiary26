import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CapsOverlay = ({ show, onComplete }) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => {
            const startX = Math.random() * 100;
            const delay = Math.random() * 0.4;
            const duration = 2 + Math.random() * 1.5;
            const rotation = Math.random() * 720 - 360;
            const endX = startX + (Math.random() * 30 - 15);
            
            return (
              <motion.div
                key={`cap-${i}`}
                initial={{ opacity: 1, y: "110vh", x: `${startX}vw`, rotate: 0, scale: Math.random() * 0.5 + 0.8 }}
                animate={{ 
                  y: ["110vh", "30vh", "-20vh"], 
                  x: [`${startX}vw`, `${endX}vw`], 
                  rotate: rotation,
                  opacity: [1, 1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: duration, 
                  delay: delay, 
                  ease: "easeOut",
                  times: [0, 0.7, 1], // Slows down near the top before falling/fading
                }}
                className="absolute bottom-0 text-5xl sm:text-6xl drop-shadow-2xl"
              >
                🎓
              </motion.div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  const [showCaps, setShowCaps] = useState(false);

  const handleTriggerToss = () => {
    if (!showCaps) {
      setShowCaps(true);
      setTimeout(() => setShowCaps(false), 4000); // Reset after animation
    }
  };

  return (
    <>
      <CapsOverlay show={showCaps} />
      <footer className="relative mt-auto pt-8 pb-8 border-t z-10 border-[var(--color-glass-border)] overflow-hidden text-center">
        {/* Subtle vintage texture layer */}
        <div className="absolute inset-0 bg-amber-900/10 z-0" />
        <div 
          className="absolute inset-0 opacity-[0.15] z-0 pointer-events-none mix-blend-screen"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
        />
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center relative z-10">
          
          {/* Decorative Divider */}
          <div className="w-full max-w-sm flex items-center justify-center gap-4 mb-4 opacity-60">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
            <span className="text-amber-600/50 text-xl font-serif">✦</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-600/50 to-transparent"></div>
          </div>

          <button 
            onClick={handleTriggerToss}
            className="mb-8 hover:scale-110 transition-transform active:scale-95 duration-300"
            title="Toss Caps!"
          >
            <span className="text-2xl opacity-60 hover:opacity-100 transition-opacity">🎓</span>
          </button>

          {/* Branding */}
          <p className="text-2xl font-serif tracking-wider mb-2 text-gradient">
            MCET <span className="font-['Caveat'] text-amber-500 text-4xl font-normal tracking-normal ml-1">Batch</span>'26
          </p>
          
          {/* Tagline */}
          <p className="text-[var(--color-text-muted)] font-['Caveat'] text-2xl tracking-wide mb-10 opacity-80">
            " A repository of memories, friendship, and unforgettable journeys. "
          </p>

          {/* Built With - Pill badge style */}
          <div className="px-6 py-2.5 rounded-full border border-amber-900/30 bg-black/40 backdrop-blur-sm">
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-[0.2em] font-medium flex items-center gap-2">
              Curated with <span className="text-amber-600 animate-pulse text-sm">❤️</span> by Batch 2023–2026
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

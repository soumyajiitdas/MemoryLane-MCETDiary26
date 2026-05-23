import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DoodleArrow, DoodleSparkle, DoodleCrown } from '../ui/VintageDoodles';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

// 4 Polaroids data
const polaroids = [
  { id: 1, rot: -8, img: '/images/scrapbook/04.jpg', bg: 'linear-gradient(to right, #f68084, #a6c0fe)', delay: 0.6, note: "Feeling lost wasn’t failure - it was the start of finding direction.”", date: "Mar 2023" },
  { id: 2, rot: 12, img: '/images/scrapbook/31.jpg', bg: 'linear-gradient(to right, #4facfe, #00f2fe)', delay: 0.8, note: "In trying to fit in, we learned what was worth keeping.", date: "Oct 2023" },
  { id: 3, rot: 6, img: '/images/scrapbook/40.jpg', bg: 'linear-gradient(to right, #ff0844, #ffb199)', delay: 1.0, note: "We didn’t become perfect - we just became more ourselves.", date: "Mar 2026" },
  { id: 4, rot: -15, img: '/images/scrapbook/24.webp', bg: 'linear-gradient(to right, #f83600, #f9d423)', delay: 1.2, note: "Not every effort paid off - but it shaped who kept going.", date: "Feb 2026" },
];

const InteractivePolaroid = ({ p, containerRef, updateZIndex }) => {
  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.1}
      onDragStart={() => updateZIndex(p.id)}
      initial={{ opacity: 0, scale: 0.8, rotate: p.rot - 20 }}
      animate={{ opacity: 0.8, scale: 1, rotate: p.rot }}
      transition={{ duration: 1, delay: p.delay, ease: 'easeOut' }}
      className="group cursor-grab active:cursor-grabbing"
      style={{
        perspective: '1200px',
        zIndex: p.zIndex || 10
      }}
    >
      <motion.div
        whileHover={{
          rotateY: 180, rotate: 0, scale: 1.15, zIndex: 50, opacity: 1,
          transition: { duration: 0.6, type: 'spring', damping: 18 }
        }}
        className="relative w-46 h-52 md:w-56 md:h-64 lg:w-64 lg:h-72 bg-[#FDFBF7] p-3 md:p-4 shadow-[0_15px_40px_rgba(0,0,0,0.4)] border border-black/10"
        style={{ transformStyle: 'preserve-3d', backgroundImage: "url('/textures/rice-paper.png')" }}
      >
        {/* Front */}
        <div className="absolute inset-0 p-2 sm:p-3 backface-hidden flex flex-col">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 md:w-16 h-5 bg-white/40 backdrop-blur-sm rotate-[-4deg] border border-black/5 z-20" />

          <div className="w-full flex-1 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] bg-black/5 overflow-hidden relative border border-black/10">
            <div
              className="w-full h-full mix-blend-multiply pointer-events-none"
              style={{ background: p.img ? `url(${p.img}) center/cover no-repeat` : p.bg }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Bottom section */}
          <div className="h-[10%] min-h-[1.5rem] sm:min-h-[2rem] flex items-center justify-end">
            <span className="text-[13px] text-black/60 font-serif opacity-70">#MCETDiary'26</span></div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 p-5 md:p-6 backface-hidden bg-[#FDFBF7] flex flex-col border border-black/5"
          style={{ transform: 'rotateY(180deg)', backgroundImage: "url('/textures/rice-paper.png')" }}
        >
          {/* Ruled lines */}
          <div className="absolute inset-0 opacity-[0.3] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #4A90E2 27px, #4A90E2 28px)', backgroundSize: '100% 28px' }} />

          {/* Text Container: Expanding to fill space, text aligned to lines */}
          <div className="flex-1 relative z-10 w-full pt-5" data-photo="true">
            <p className="text-[#2c3e50] font-['Caveat'] text-[1.3rem] md:text-2xl leading-[28px] pointer-events-none text-left">
              "{p.note}"
            </p>
          </div>

          {/* Date moved to bottom right */}
          <div className="relative z-10 w-full flex justify-end mt-6">
            <span className="text-[10px] md:text-xs text-amber-900/60 font-serif tracking-[0.2em] uppercase font-bold pointer-events-none">
              {p.date}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Track only z-index in state to avoid caching the polaroids array across HMR
  const [zIndices, setZIndices] = useState({});
  const [maxZ, setMaxZ] = useState(10);

  const bringToFront = (id) => {
    setMaxZ(prev => prev + 1);
    setZIndices(prev => ({ ...prev, [id]: maxZ + 1 }));
  };

  return (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden w-full pt-6 sm:pt-0 bg-transparent" ref={containerRef}>

      {/* ── Ambient Background Glows ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle at 30% 50%, rgba(245,158,11,0.06) 0%, transparent 60%)' }}
      />

      {/* ── Main Editorial Split Layout ── */}
      <div className="max-w-[1500px] w-full mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 h-full">

        {/* Left Column: Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 flex flex-col justify-center items-start pt-12 lg:pt-0 z-20 pointer-events-none"
        >
          {/* Subtle Background Typography */}
          <div className="absolute -top-11 sm:top-13 -left-5 sm:-left-8 text-[10rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter mix-blend-overlay">
            <span className='hidden sm:block'>Batch'26</span>
            <span className='inline sm:hidden'>'22-'26</span>
          </div>

          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 pointer-events-auto">
            {/* Press rule above eyebrow */}
            <div className="flex-1 w-12 flex flex-col gap-[3px] opacity-80">
              <div className="h-[2px] w-full" style={{ background: 'rgba(200,168,80,0.3)' }} />
              <div className="h-px w-full" style={{ background: 'rgba(200,168,80,0.15)' }} />
            </div>

            <h2 className="font-['Special_Elite'] text-[0.6rem] sm:text-[0.7rem] tracking-[0.4em] sm:tracking-[0.3em] text-amber-500/70 uppercase">
              First Year to Farewell
            </h2>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants} className="relative w-full pointer-events-auto">
            <DoodleCrown className="w-16 h-16 md:w-20 md:h-20 absolute -top-12 -left-8 -rotate-12 mix-blend-screen opacity-50 pointer-events-none" color="#F59E0B" />

            {/* Subtle Background Typography */}
            <div className="absolute top-90 -left-13 sm:-top-48 sm:left-165 text-[8rem] md:text-[14rem] opacity-35 font-serif text-white/5 text-left sm:text-right leading-none select-none pointer-events-none tracking-tighter">
              <span className='hidden sm:inline'>...</span>Our Memory Lane<span className='inline sm:hidden'>...</span>
            </div>

            <h1 className="text-[5.5rem] sm:text-[8rem] lg:text-[9rem] font-serif text-white/95 uppercase leading-[0.85] tracking-tighter drop-shadow-lg">
              MCET
            </h1>
            <h2 className="text-[4rem] sm:text-[6.5rem] lg:text-[7.5rem] font-['Caveat'] text-gradient-animate -mt-6 sm:-mt-10 lg:-mt-12 ml-12 sm:ml-24 lg:ml-24 leading-[0.8] drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] whitespace-nowrap">
              Diary '26
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mt-12 lg:mt-16 relative pointer-events-auto">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 to-transparent"></div>
            <div className="pl-6 md:pl-8">
              <p className="text-lg md:text-2xl text-white/70 font-serif italic max-w-lg leading-relaxed">
                <span className='text-amber-600/50 text-md sm:text-2xl'>❝</span> The days we'll never forget, written in the stars and etched in our hearts...<span className='text-amber-600/50 text-md sm:text-2xl'>❞</span>
              </p>
            </div>
            <DoodleSparkle className="w-8 h-8 absolute -top-4 -left-4 opacity-50 mix-blend-screen pointer-events-none" color="#F59E0B" />
          </motion.div>

          {/* Call To Actions */}
          <motion.div variants={itemVariants} className="mt-14 flex flex-wrap items-center gap-8 md:gap-10 relative pointer-events-auto">
            <button
              onClick={() => navigate('/chapters')}
              className="group relative flex items-center gap-4 text-white font-serif tracking-wider uppercase text-xs md:text-sm font-semibold"
            >
              <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center bg-amber-500/10 group-hover:bg-amber-600 transition-colors duration-500">
                <span className="text-amber-500 group-hover:text-black transition-colors duration-500 text-xl group-hover:translate-x-1">→</span>
              </div>
              <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-amber-600 after:transition-all after:duration-500 group-hover:after:w-full pb-1">
                Read Chapters
              </span>
            </button>

            <button
              onClick={() => navigate('/the-cast')}
              className="group flex items-center gap-3 text-white/60 hover:text-amber-600 transition-colors"
            >
              <span className="text-amber-500 text-2xl group-hover:rotate-90 transition-transform duration-500">✦</span>
              <span className="font-['Special_Elite'] text-xs md:text-sm tracking-widest uppercase">
                Meet the Cast
              </span>
            </button>
            <DoodleArrow className="hidden md:block w-12 h-12 absolute -bottom-6 left-32 opacity-40 rotate-[160deg] mix-blend-screen pointer-events-none" color="#F59E0B" />
          </motion.div>
        </motion.div>

        {/* Right Column: Perfect 4-Spot Grid for Polaroids */}
        <div className="lg:col-span-7 h-[600px] lg:h-[800px] w-full mt-6 mb-8 sm:mb-4 lg:mt-0 pointer-events-auto flex items-center justify-center">
          {/* Using a 2x2 grid ensures they have 4 perfectly separated spots */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full max-w-[600px] max-h-[700px] py-10">
            {polaroids.map(p => (
              <div key={p.id} className="flex items-center justify-center relative">
                <InteractivePolaroid
                  p={{ ...p, zIndex: zIndices[p.id] || 10 }}
                  containerRef={containerRef}
                  updateZIndex={bringToFront}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ChapterNav from '../components/ui/ChapterNav';
import { timelineData } from '../data/chapters';
import Fireflies from '../components/ui/Fireflies';
import { DoodleHeart, DoodleSparkle, DoodleCrown } from '../components/ui/VintageDoodles';

// Ensure each data object has a placeholder image array
const journeyData = timelineData.map((d, i) => ({
  ...d,
  image: d.photos[0] || `linear-gradient(135deg, hsl(${i * 60 + 20}, 40%, 40%), hsl(${i * 60 + 80}, 30%, 30%))`
}));

const JourneyNode = ({ data, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center w-full mb-32 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Center Track Line */}
      <div
        className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(245,158,11,0.4) 10%, rgba(245,158,11,0.3) 85%, transparent)',
          boxShadow: '0 0 12px rgba(245,158,11,0.15)',
        }}
      />

      {/* Year badge desktop, pulsing amber ring */}
      <div
        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 rounded-full border items-center justify-center z-10"
        style={{
          background: '#0A0A0A',
          borderColor: 'rgba(245,158,11,0.7)',
          boxShadow: '0 0 20px rgba(245,158,11,0.2), 0 0 0 0 rgba(245,158,11,0.4)',
          animation: 'amber-ring-pulse 2.5s ease-out infinite',
        }}
      >
        <span className="text-amber-500 font-serif font-bold text-sm" style={{ position: 'relative' }}>
          {data.year}
        </span>
      </div>

      {/* Year badge mobile */}
      <div
        className="md:hidden w-18 h-18 mb-6 rounded-full border flex items-center justify-center z-10 mx-auto"
        style={{
          background: '#0A0A0A',
          borderColor: 'rgba(245,158,11,0.7)',
          boxShadow: '0 0 16px rgba(245,158,11,0.2), 0 4px 12px rgba(0,0,0,0.5)',
          animation: 'amber-ring-pulse 2.5s ease-out infinite',
        }}
      >
        <span className="text-amber-500 font-serif font-bold text-sm relative">{data.year}</span>
      </div>

      {/* Text Side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring" }}
        className={`relative w-full md:w-1/2 px-4 md:px-16 flex flex-col justify-center text-center md:text-left ${!isEven && 'md:text-right'}`}
        style={{ willChange: "transform, opacity" }}
      >
        {/* Random scattered doodle on text side */}
        {index % 2 === 0 && <DoodleSparkle className={`w-14 h-14 absolute -top-8 ${isEven ? 'left-4' : 'right-4'} opacity-80 rotate-12 mix-blend-screen`} color="rgba(200, 200, 200, 0.8)" />}
        {index % 2 === 1 && <DoodleHeart className={`w-12 h-12 absolute -top-6 ${isEven ? 'left-8' : 'right-8'} opacity-80 -rotate-12 mix-blend-screen`} color="rgba(245, 50, 50, 0.8)" />}
        <h3 className={`text-4xl md:text-6xl font-['Caveat'] text-white/90 mb-4 leading-tight max-w-lg mx-auto md:mx-0 tracking-wide drop-shadow-md ${!isEven ? 'md:ml-auto' : ''}`}>{data.title}</h3>
        <p className={`font-serif mb-4 text-xl text-amber-500 italic font-light ${!isEven ? 'md:ml-auto' : ''}`}>
          ~ {data.subtitle}
        </p>
        <p className={`text-white/50 text-lg leading-relaxed font-sans max-w-md mx-auto md:mx-0 ${!isEven ? 'md:ml-auto' : ''}`}>
          {data.description}
        </p>
      </motion.div>

      {/* Photograph/Polaroid Side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", delay: 0.1 }}
        className={`w-full md:w-1/2 px-4 md:px-16 mt-12 md:mt-0 flex flex-col items-center flex justify-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
        style={{ perspective: '1200px', willChange: "transform, opacity" }}
      >
        <motion.div
          whileHover={{
            rotateY: 180,
            rotate: 0,
            scale: 1.05,
            zIndex: 50
          }}
          whileTap={{
            rotateY: 180,
            rotate: 0,
            scale: 1.05,
            zIndex: 50
          }}
          transition={{ duration: 0.6, type: 'spring', damping: 20 }}
          className="relative w-full max-w-[450px] aspect-[12/13] cursor-pointer"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotate(${isEven ? 2 : -2}deg)`
          }}
        >
          {/* Front Side */}
          <div className="absolute inset-0 bg-[url('/textures/rice-paper.png')] bg-white p-3 md:p-4 pb-12 md:pb-12 shadow-2xl backface-hidden flex flex-col border border-black/5">
            <div className={`w-full h-[90%] shadow-[inset_0_0_15px_rgba(0,0,0,0.1)] border border-gray-100 bg-gray-50 overflow-hidden relative ${index === timelineData.length - 1 ? 'grayscale-[30%]' : 'grayscale-[90%]'}`}>
              {data.image.startsWith('/') || data.image.startsWith('http') ? (
                <img src={data.image} alt={data.title} className="w-full h-full object-contain" loading="lazy" />
              ) : (
                <div className="w-full h-full" style={{ background: data.image }} />
              )}
              {/* Subtle glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex-1 flex items-center justify-center pt-2">
              <p className="font-['Caveat'] text-2xl text-amber-950 text-center px-2">
                {data.caption}
              </p>
            </div>
          </div>

          {/* Back Side (Diary Note) */}
          <div
            className="absolute inset-0 bg-[url('/textures/rice-paper.png')] bg-[#FDFBF7] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backface-hidden flex flex-col items-center justify-center text-center border border-black/10"
            style={{ transform: 'rotateY(180deg)' }}
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #4A90E2 27px, #4A90E2 28px)', backgroundSize: '100% 28px' }} />

            <div className="relative z-10 space-y-4" data-photo="true">
              <p className="text-[#2c3e50] font-['Caveat'] text-2xl md:text-3xl leading-relaxed mt-4">
                "{data.note}"
              </p>
              <div className="w-16 h-[1px] bg-amber-900/30 mx-auto pt-4 border-b border-amber-900/30"></div>
              <p className="text-amber-900/70 font-sans tracking-[0.2em] text-xs uppercase font-bold mt-2">
                Chapter entry: {data.year}
              </p>
            </div>
            {/* Vintage Round Stamp */}
            <div className="absolute top-4 right-4 w-[80px] h-[80px] border-[3px] border-red-800/40 rounded-full flex items-center justify-center rotate-[-15deg] z-20 mix-blend-multiply opacity-70 shadow-sm pointer-events-none">
              <div className="border-[1.5px] border-dashed border-red-800/40 rounded-full w-[68px] h-[68px] flex items-center justify-center text-center leading-none pointer-events-none">
                <span className="text-[11px] font-bold text-red-800/60 uppercase tracking-tighter block mt-0.5">
                  MCET<br />Diary'26<br />★
                </span>
              </div>
            </div>

            {/* Decorative corner detail */}
            <div className="absolute bottom-4 right-4 text-amber-900/50 italic font-serif text-[10px] uppercase tracking-[0.3em] pointer-events-none">
              Diary '26
            </div>
          </div>
        </motion.div>

        {/* Mobile-only hint */}
        <div className="md:hidden font-['Special_Elite'] mt-6 text-white/30 tracking-wide text-xs  flex items-center gap-4 font-medium pointer-events-none">
          <span className="w-8 h-px bg-white/20"></span>
          Hold photo to read
          <span className="w-8 h-px bg-white/20"></span>
        </div>
      </motion.div>
    </div>
  );
};

const Chapters = () => {
  useEffect(() => { document.title = "MCET Diary '26 | Four Year Stories"; }, []);

  return (
    <PageTransition>
      <div className="relative overflow-hidden w-full min-h-screen">
        {/* Subtle background texture for the entire page overlaying global bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: "url('/textures/paper-grain.png')", mixBlendMode: "overlay", zIndex: 1 }}></div>

        {/* Firefly Particles */}
        <div><Fireflies count={35} /></div>

        {/* Subtle Background Typography */}
        <div className="absolute top-5 sm:-top-4 right-3 sm:right-135 text-[10rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter">
          Phases
        </div>

        <div className="py-24 pb-30 relative z-20">
          <div className="max-w-[1400px] mx-auto px-4 relative z-10">

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16 relative"
            >
              <DoodleSparkle className="w-24 h-24 absolute -top-10 left-10 md:left-40 opacity-30 mix-blend-screen hidden md:block" color="#F59E0B" />
              <DoodleCrown className="w-20 h-20 absolute top-0 right-10 md:right-40 opacity-30 rotate-12 mix-blend-screen hidden md:block" color="#F59E0B" />

              <SectionHeading
                title="The Chapters"
                subtitle="The story we lived, not just remembered."
                eyebrow="Four Year Stories"
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-center font-serif italic font-light text-2xl md:text-3xl text-white/60 mb-24 max-w-2xl mx-auto"
            >
              <span className='text-amber-600/50 text-md sm:text-3xl'>❝</span> Here's to the nights that turned into mornings, with the friends that turned into family... <span className='text-amber-600/50 text-md sm:text-3xl'>❞</span>
            </motion.p>

            <div className="mt-12 w-full max-w-6xl mx-auto relative pt-12">
              {/* Radial gradient glow in background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none"></div>

              {journeyData.map((data, index) => (
                <JourneyNode
                  key={index}
                  data={data}
                  index={index}
                />
              ))}
            </div>

            <div className="flex justify-between items-center w-full mt-16 sm:mt-32 sm:border-t border-amber-900/40 pt-0 sm:pt-12 relative z-20">
              <ChapterNav direction="prev" chapterName="Prologue" path="/" />
              <ChapterNav direction="next" chapterName="The Cast" path="/the-cast" />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Chapters;

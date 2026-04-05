import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ChapterNav from '../components/ui/ChapterNav';
import { timelineData } from '../data/chapters';

// Ensure each data object has a placeholder image array
const journeyData = timelineData.map((d, i) => ({
  ...d,
  image: d.photos[0] || `linear-gradient(135deg, hsl(${i * 60 + 20}, 40%, 40%), hsl(${i * 60 + 80}, 30%, 30%))`
}));

const JourneyNode = ({ data, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col md:flex-row items-center w-full mb-32 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      
      {/* Center Track Line & Year Badge for Desktop */}
      <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-white/10" />
      
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 rounded-full border border-amber-500/80 bg-[var(--color-midnight)] items-center justify-center z-10 shadow-lg shadow-black/50">
         <span className="text-amber-500 font-serif font-bold text-sm">{data.year}</span>
      </div>

      {/* Date badge for Mobile */}
      <div className="md:hidden w-18 h-18 mb-6 rounded-full border border-amber-500/80 bg-[var(--color-midnight)] flex items-center justify-center z-10 shadow-lg shadow-black/50 mx-auto">
         <span className="text-amber-500 font-serif font-bold text-sm">{data.year}</span>
      </div>

      {/* Text Side */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring" }}
        className={`w-full md:w-1/2 px-4 md:px-16 flex flex-col justify-center text-center md:text-left ${!isEven && 'md:text-right'}`}
      >
        <h3 className={`text-3xl md:text-5xl font-serif text-[#f4ecd8] mb-6 leading-tight max-w-lg mx-auto md:mx-0 ${!isEven ? 'md:ml-auto' : ''}`}>{data.title}</h3>
        <p className={`text-gray-400 text-lg leading-relaxed font-sans font-light max-w-md mx-auto md:mx-0 ${!isEven ? 'md:ml-auto' : ''}`}>
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
        style={{ perspective: '1200px' }}
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
           <div className="absolute inset-0 bg-white p-3 md:p-4 pb-12 md:pb-12 shadow-2xl backface-hidden flex flex-col">
              <div className="w-full h-[90%] shadow-inner border border-gray-100 bg-gray-50 overflow-hidden">
                {data.image.startsWith('/') || data.image.startsWith('http') ? (
                   <img src={data.image} alt={data.title} className="w-full h-full object-contain" loading="lazy" />
                ) : (
                   <div className="w-full h-full" style={{ background: data.image }} />
                ) }
              </div>
              <div className="flex-1 flex items-center justify-center pt-2">
                <p className="font-['Caveat'] text-xl md:text-2xl text-gray-800 text-center px-2">
                  {data.caption}
                </p>
              </div>
           </div>

           {/* Back Side (Diary Note) */}
           <div 
             className="absolute inset-0 bg-[#fdfaf3] p-6 shadow-2xl backface-hidden flex flex-col items-center justify-center text-center border border-black/5"
             style={{ transform: 'rotateY(180deg)' }}
           >
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-px bg-amber-900/20 mx-auto"></div>
                <p className="text-amber-900 font-['Caveat'] text-2xl leading-relaxed">
                  "{data.note}"
                </p>
                <div className="w-12 h-px bg-amber-900/20 mx-auto pt-4"></div>
                <p className="text-amber-700/50 font-['Caveat'] text-lg">
                  Chapter entry: {data.year}
                </p>
              </div>

              {/* Decorative corner detail */}
              <div className="absolute bottom-4 right-4 text-amber-900/10 italic font-serif text-xs uppercase tracking-widest">
                Diary '26
              </div>
           </div>
        </motion.div>
        
        {/* Mobile-only hint */}
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="md:hidden mt-4 text-gray-500 text-xs flex items-center gap-2"
        >
          <span className="w-4 h-px bg-gray-600"></span>
          Hold photo to read note
          <span className="w-4 h-px bg-gray-600"></span>
        </motion.div>
      </motion.div>
    </div>
  );
};

const Chapters = () => {
  return (
    <PageTransition>
      <div className="min-h-[100vh] py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading
            title="Chapters"
            subtitle="The story we lived, not just remembered. 🍻"
            eyebrow="Our Timeline"
          />
          <p className="text-center font-['Caveat'] text-3xl text-[var(--color-text-muted)] -mt-12 mb-32 italic">
             " Here's to the nights that turned into mornings, with the friends that turned into family. "
          </p>

          <div className="mt-12 w-full max-w-6xl mx-auto relative pt-12">
             {journeyData.map((data, index) => (
                <JourneyNode 
                  key={index} 
                  data={data} 
                  index={index} 
                />
             ))}
          </div>
          
          <div className="flex justify-between items-center w-full mt-20">
            <ChapterNav direction="prev" chapterName="Prologue" path="/" />
            <ChapterNav direction="next" chapterName="The Cast" path="/the-cast" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Chapters;

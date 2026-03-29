import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import { timelineData } from '../data/timeline';

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
      
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-amber-500/80 bg-[var(--color-midnight)] items-center justify-center z-10 shadow-lg shadow-black/50">
         <span className="text-amber-500 font-serif font-bold text-sm">{data.year}</span>
      </div>

      {/* Date badge for Mobile */}
      <div className="md:hidden w-16 h-16 mb-6 rounded-full border border-amber-500/80 bg-[var(--color-midnight)] flex items-center justify-center z-10 shadow-lg shadow-black/50 mx-auto">
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
        className={`w-full md:w-1/2 px-4 md:px-16 mt-12 md:mt-0 flex justify-center ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
      >
        <div 
          className="bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-2xl relative"
          style={{ 
             transform: `rotate(${isEven ? 2 : -2}deg)`,
             boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}
        >
           {/* Image container */}
           <div 
             className="w-full aspect-[4/3] max-w-[400px] shadow-inner border border-gray-200 bg-gray-200 overflow-hidden"
           >
              {data.image.startsWith('http') ? (
                 <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
              ) : (
                 <div className="w-full h-full" style={{ background: data.image }} />
              )}
           </div>
           {/* Handwritten Caption */}
           <p className="absolute bottom-4 left-0 right-0 text-center font-['Caveat'] text-xl md:text-2xl text-gray-800">
             {data.caption}
           </p>
        </div>
      </motion.div>
    </div>
  );
};

const TheJourney = () => {
  return (
    <PageTransition>
      <div className="min-h-[100vh] py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading 
            title="The Journey" 
            subtitle="Four years of framing memories. Step into the past and relive how it all unfolded."
          />
          <p className="text-center font-['Caveat'] text-3xl text-[var(--color-text-muted)] -mt-12 mb-32 italic">
             "Here's to the nights that turned into mornings, with the friends that turned into family."
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
        </div>
      </div>
    </PageTransition>
  );
};

export default TheJourney;

import React from 'react';
import { motion } from 'framer-motion';

const TimelineSection = ({ data, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative mb-24 last:mb-0 w-full flex flex-col md:flex-row items-center justify-between">
      {/* Center Line Marker (Desktop) */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-0.5 h-full bg-[var(--color-glass-border)] -z-10"></div>
      
      {/* Node Marker */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[var(--color-amber)] shadow-[0_0_15px_rgba(245,158,11,0.6)] z-10"
      ></motion.div>

      {/* Content Card area */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12 text-left'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="glass p-6 md:p-8 rounded-2xl relative group hover:border-[var(--color-amber-glow)] transition-colors"
        >
          {/* Year floating label */}
          <div className={`absolute -top-5 ${isEven ? 'md:right-8 right-auto left-6 md:left-auto' : 'left-6'} bg-[var(--color-surface-light)] px-4 py-1 rounded-full border border-[var(--color-glass-border)] shadow-lg`}>
            <span className="text-amber-400 font-bold font-serif">{data.year}</span>
          </div>

          <h3 className="text-2xl font-serif text-white mt-2 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-200 group-hover:to-amber-500 transition-all duration-300 w-fit">
            {data.title}
          </h3>
          <h4 className="text-lg text-amber-500/80 mb-4">{data.subtitle}</h4>
          
          <ul className={`list-none space-y-2 mb-0 flex flex-col ${isEven ? 'md:items-end items-start' : 'items-start'}`}>
            {data.highlights.map((highlight, i) => (
              <li key={i} className="text-gray-300 text-sm md:text-base flex items-center gap-2">
                {!isEven && <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></span>}
                {highlight}
                {isEven && <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 hidden md:block"></span>}
                {isEven && <span className="w-1.5 h-1.5 rounded-full bg-amber-500/50 block md:hidden"></span>}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

    </div>
  );
};

export default TimelineSection;

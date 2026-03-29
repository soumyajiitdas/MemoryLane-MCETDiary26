import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChapterNav = ({ 
  direction = 'next', 
  chapterName, 
  path, 
  labelOverride 
}) => {
  const navigate = useNavigate();
  const isNext = direction === 'next';
  
  const defaultLabel = isNext ? 'Next Chapter' : 'Previous Chapter';
  const label = labelOverride || defaultLabel;

  return (
    <div className={`w-full flex ${isNext ? 'justify-end' : 'justify-start'} pt-6 pb-4 ${isNext ? 'pr-4 md:pr-12' : 'pl-4 md:pl-12'}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        whileHover={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className={`group relative cursor-pointer px-4 py-1 flex flex-col ${isNext ? 'items-end' : 'items-start'}`}
        onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate(path);
        }}
      >
        <span className="uppercase tracking-[0.3em] text-[7px] text-gray-500 font-bold opacity-40 group-hover:opacity-100 transition-opacity duration-700">
          {label}
        </span>
        
        <div className={`flex items-center gap-2 ${isNext ? 'flex-row' : 'flex-row-reverse'}`}>
           {!isNext && <ArrowLeft size={14} className="text-gray-600 group-hover:text-amber-500 group-hover:-translate-x-1 transition-all duration-700" />}
           <h4 className="text-2xl md:text-3xl font-['Caveat'] text-white/50 group-hover:text-amber-500/80 transition-all duration-700 leading-none">
             {chapterName}
           </h4>
           {isNext && <ArrowRight size={14} className="text-gray-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-all duration-700" />}
        </div>

        {/* Unique minimal line flourish */}
        <div className={`h-[1px] w-6 group-hover:w-full transition-all duration-1000 ease-out mt-1 ${
          isNext 
            ? 'bg-gradient-to-l from-amber-500/40 to-transparent' 
            : 'bg-gradient-to-r from-amber-500/40 to-transparent'
        }`}></div>
        
        {/* Barely visible glow */}
        <div className="absolute inset-0 bg-amber-500/2 blur-xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-1000 pointer-events-none"></div>
      </motion.div>
    </div>
  );
};

export default ChapterNav;

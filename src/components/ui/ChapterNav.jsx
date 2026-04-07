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
        whileInView={{ opacity: 0.35 }}
        whileHover={{ opacity: 1, x: isNext ? 4 : -4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`group relative cursor-pointer px-4 py-2 flex flex-col ${isNext ? 'items-end' : 'items-start'}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          navigate(path);
        }}
      >
        <span className="uppercase tracking-[0.3em] text-[7px] text-amber-700/50 font-bold opacity-40 group-hover:opacity-100 transition-opacity duration-500">
          {label}
        </span>

        <div className={`flex items-center gap-2 mt-0.5 ${isNext ? 'flex-row' : 'flex-row-reverse'}`}>
          {!isNext && (
            <motion.span
              className="text-gray-600 group-hover:text-amber-500 transition-colors duration-400"
              animate={{ x: 0 }}
              whileHover={{ x: -3 }}
            >
              <ArrowLeft size={14} />
            </motion.span>
          )}
          <h4 className="text-2xl md:text-3xl font-['Caveat'] text-white/50 group-hover:text-amber-400/90 transition-all duration-500 leading-none">
            {chapterName}
          </h4>
          {isNext && (
            <motion.span
              className="text-gray-600 group-hover:text-amber-500 transition-colors duration-400"
              animate={{ x: 0 }}
              whileHover={{ x: 3 }}
            >
              <ArrowRight size={14} />
            </motion.span>
          )}
        </div>

        {/* Expanding amber line */}
        <motion.div
          className={`h-[1px] mt-1.5 origin-${isNext ? 'right' : 'left'}`}
          initial={{ width: '1.5rem' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: isNext
              ? 'linear-gradient(to left, rgba(245,158,11,0.6), transparent)'
              : 'linear-gradient(to right, rgba(245,158,11,0.6), transparent)',
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04), transparent)' }}
        />
      </motion.div>
    </div>
  );
};

export default ChapterNav;

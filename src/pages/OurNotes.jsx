import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ChapterNav from '../components/ui/ChapterNav';
import { memoriesData } from '../data/notes';

const StickyNote = ({ post }) => {
  const hasTape   = post.id % 2 === 0;
  const rotateDeg = (post.id * 3) % 6 - 3;
  const len       = post.content?.length ?? 0;

  // Shrink font for longer content so it stays readable without blowing up the card
  const textSize = 'text-2xl';

  // Cap card height and allow scroll for very long notes (>303 chars)
  const contentStyle = len > 303
    ? { maxHeight: '260px', overflowY: 'auto', paddingRight: '4px' }
    : {};

  return (
    <div className="break-inside-avoid-column mb-8 perspective-1000">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03, zIndex: 10, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`sticky-note paper-lift p-6 md:p-8 flex flex-col w-full ${hasTape ? 'tape' : ''}`}
        style={{
          transform: `rotate(${rotateDeg}deg)`,
          backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper.png')",
          transformOrigin: 'center top',
          boxShadow: '4px 8px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Ruled lines overlay */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #6098cc 27px, #6098cc 28px)",
            backgroundSize: "100% 28px",
          }}
        />
        {/* Vintage Round Stamp */}
        <div className="absolute bottom-3 right-3 w-[72px] h-[72px] border-[2.5px] border-red-800/40 rounded-full flex items-center justify-center rotate-[-15deg] z-20 mix-blend-multiply opacity-70 shadow-sm pointer-events-none">
           <div className="border-[1.5px] border-dashed border-red-800/40 rounded-full w-[60px] h-[60px] flex items-center justify-center text-center leading-none">
             <span className="text-[10px] font-bold text-red-800/60 uppercase tracking-tighter block mt-0.5">
               MCET<br/>Diary'26<br/>★
             </span>
           </div>
        </div>
        {!hasTape && <div className="push-pin -top-3" />}

        {/* Content — scrollable when very long */}
        <div
          className={`font-['Caveat'] ${textSize} mt-4 mb-4 leading-relaxed text-[#2c3e50] w-full text-center styling-scrollbar`}
          style={contentStyle}
        >
          "{post.content}"
        </div>

        {post.image && (
          <div className="w-full mb-6 z-10">
            <img
              src={post.image.startsWith('linear') ? '' : post.image}
              style={post.image.startsWith('linear') ? { background: post.image } : {}}
              alt="Memory"
              className="w-full object-cover border border-[#d1d5db] shadow-sm max-h-64"
            />
          </div>
        )}

        <div className="mt-auto w-full flex justify-between items-end border-t border-[#e5e7eb] pt-4">
          <span className="font-['Caveat'] text-2xl font-bold text-[#1e3a8a]">
            {post.author}
          </span>
          <span className="text-[11px] text-[#5D6574] font-sans tracking-widest uppercase font-medium">
            {new Date(post.timestamp).toLocaleDateString()}
          </span>
        </div>
      </motion.div>
    </div>
  );
};


const OurNotes = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const shuffledPosts = [...memoriesData].sort(() => 0.5 - Math.random());
    setPosts(shuffledPosts);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-[100vh] py-24 pb-32">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center mb-16 relative">
            <SectionHeading 
              title="Our Notes" 
              subtitle="Few lines for the days we didn’t want to end. 📜"
              eyebrow="Final Goodbyes"
            />
          </div>

          <p className="text-center font-['Caveat'] text-3xl text-[var(--color-text-muted)] -mt-12 mb-32 italic">
             " It’s strange how endings don’t feel like endings at first. "
          </p>

          {/* Masonry Board */}
          <div
            className="mb-24 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-6 md:p-10 bg-corkboard rounded-2xl relative min-h-[60vh] styling-scrollbar"
            style={{
              columnFill: 'balance',
              border: '5px solid #2d1f10',
              boxShadow: 'inset 0 20px 60px rgba(0,0,0,0.85), inset 0 -10px 30px rgba(0,0,0,0.4), 0 12px 40px rgba(0,0,0,0.6), 0 4px 0 #1a0f05',
              outline: '1px solid rgba(255,255,255,0.03)',
            }}
          >
             <AnimatePresence>
                {posts.map(post => (
                  <StickyNote key={post.id} post={post} />
                ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center w-full mt-20">
            <ChapterNav direction="prev" chapterName="Scrapbook" path="/scrapbook" />
            <ChapterNav direction="next" chapterName="Last Pages" path="/last-pages" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OurNotes;

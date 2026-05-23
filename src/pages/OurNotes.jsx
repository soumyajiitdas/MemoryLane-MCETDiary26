import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ChapterNav from '../components/ui/ChapterNav';
import Fireflies from '../components/ui/Fireflies';
import { DoodleCrown, DoodleHeart, DoodleSparkle, DoodleArrow } from '../components/ui/VintageDoodles';
import { memoriesData } from '../data/notes';

const PremiumStickyNote = ({ post, index }) => {
  const len = post.content?.length ?? 0;
  const textSize = len < 120 ? 'text-2xl' : 'text-xl';
  const contentStyle = len > 330 ? { maxHeight: '200px', overflowY: 'auto', paddingRight: '8px' } : {};
  const rotation = useMemo(() => Math.floor(Math.random() * 6) - 3, []);

  // Determine if we show doodles based on index
  const showHeart = index % 5 === 0;
  const showCrown = index % 6 === 2;

  return (
    <div className="break-inside-avoid-column mb-10 perspective-1000 inline-block w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: (index % 10) * 0.08, ease: [0.23, 1, 0.32, 1] }}
        whileHover={{ scale: 1.05, zIndex: 30, rotate: 0, y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        className="relative w-full mx-auto flex flex-col cursor-pointer transition-shadow duration-500"
        style={{ willChange: "transform, opacity", transform: `rotate(${rotation}deg)` }}
      >
        {/* Note Body */}
        <div
          className="p-8 pb-6 flex flex-col bg-[#FDFBF7] shadow-[2px_4px_15px_rgba(0,0,0,0.08)] relative overflow-hidden"
          style={{
            backgroundImage: "url('/textures/rice-paper.png')",
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2px))'
          }}
        >
          {/* Pin */}
          <div className="push-pin -top-3" />

          {/* Ruled Lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #4A90E2 27px, #4A90E2 28px)', backgroundSize: '100% 28px' }} />

          {/* Red vertical margin line for classical notebook effect */}
          <div className="absolute left-[28px] top-0 bottom-0 w-[1px] bg-red-800/20 pointer-events-none"></div>
          <div className="absolute left-[26px] top-0 bottom-0 w-[1px] bg-red-800/10 pointer-events-none"></div>

          {/* Doodles inside note */}
          {showHeart && <DoodleHeart className="absolute top-4 left-2 w-10 h-10 opacity-40 -rotate-[15deg] mix-blend-multiply" color="#8B2323" />}
          {showCrown && <DoodleCrown className="absolute top-2 right-2 w-10 h-10 rotate-12 opacity-40 mix-blend-multiply" color="#1e3a8a" />}

          {/* Content */}
          <div className="relative mt-2 z-10">
            <div className={`font-['Caveat'] ${textSize} leading-[28px] text-[#2c3e50] w-full text-center opacity-95 styling-scrollbar`} style={contentStyle} data-photo="true">
              "{post.content}"
            </div>
            {/* Bottom fade — only on scrollable notes (content > 330 chars) */}
            {len > 330 && (
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#342A14] via-[#342A14]/30 to-transparent opacity-10" />
            )}
          </div>

          {/* Image (if exists) */}
          {post.image && (
            <div className="w-full mt-6 mb-2 z-10 relative" data-photo="true">
              <div className="relative w-full bg-white overflow-hidden border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-2 pb-6">
                <div
                  className="w-full h-48 sm:h-56 transition-transform duration-700 hover:scale-105"
                  style={{
                    background: post.image.startsWith('linear') ? post.image : `url(${post.image}) center/cover no-repeat`
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-8 w-full flex justify-between items-end border-t border-black/5 pt-2 relative z-10">
            <span className="font-['Caveat'] text-2xl font-bold text-[#1e3a8a] opacity-90">{post.author}</span>
            <span className="text-[10px] text-[#8b95a5] font-sans tracking-[0.15em] uppercase font-semibold">{new Date(post.timestamp).toLocaleDateString()}</span>
          </div>

          {/* Vintage Round Stamp */}
          <div
            className="absolute bottom-3 right-3 w-[72px] h-[72px] border-[2.5px] border-red-800/50 rounded-full flex items-center justify-center rotate-[-15deg] z-30 opacity-40 shadow-sm pointer-events-none"
          >
            <div className="border-[1.5px] border-dashed border-red-800/50 rounded-full w-[60px] h-[60px] flex items-center justify-center text-center leading-none">
              <span className="text-[10px] font-bold text-red-800/70 uppercase tracking-tighter block mt-0.5">
                MCET<br />Diary'26<br />★
              </span>
            </div>
          </div>



        </div>
        {/* Curling shadow effect */}
        <div className="absolute -bottom-2 left-4 right-4 h-4 shadow-[0_15px_15px_rgba(0,0,0,0.15)] -z-10 rounded-[100%]"></div>


      </motion.div>
    </div>
  );
};

const OurNotes = () => {
  useEffect(() => { document.title = "MCET Diary '26 | Words We Left"; }, []);
  const [posts, setPosts] = useState(() => [...memoriesData].sort(() => 0.5 - Math.random()));

  return (
    <PageTransition>
      <div className="relative overflow-hidden w-full min-h-screen">
        {/* Subtle background texture for the entire page overlaying global bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: "url('/textures/paper-grain.png')", mixBlendMode: "overlay", zIndex: 1 }}></div>

        {/* Subtle Background Typography */}
        <div className="absolute top-5 sm:-top-4 -right-20 sm:right-109 text-[10rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter">
          Imprints
        </div>

        {/* Firefly Particles */}
        <div className="absolute inset-0 pointer-events-none z-10"><Fireflies count={30} /></div>

        <div className="py-24 pb-30 relative z-20">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8">

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16 relative"
            >
              <DoodleSparkle className="w-24 h-24 absolute -top-10 left-10 md:left-40 opacity-30 mix-blend-screen hidden md:block" color="#F59E0B" />
              <DoodleArrow className="w-20 h-20 absolute top-10 right-10 md:right-40 opacity-30 rotate-45 mix-blend-screen hidden md:block" color="#F59E0B" />

              <SectionHeading
                title="Our Notes"
                subtitle="Few lines for the days we didn’t want to end."
                eyebrow="Words We Left"
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-center font-serif italic font-light text-2xl md:text-3xl text-white/60 mb-20 max-w-2xl mx-auto"
            >
              "It’s strange how endings don’t feel like endings at first..."
            </motion.p>

            {/* Masonry Board - Refined styling matching Prologue */}
            <div className="relative w-full">
              {/* Radial gradient glow in background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none"></div>

              <div
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 relative z-10 styling-scrollbar"
                style={{ columnFill: 'balance' }}
              >
                <AnimatePresence>
                  {posts.map((post, idx) => (
                    <PremiumStickyNote key={post.id} post={post} index={idx} />
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-between items-center w-full mt-16 sm:mt-32 sm:border-t sm:border-amber-900/40 pt-0 sm:pt-12 relative z-20">
              <ChapterNav direction="prev" chapterName="Scrapbook" path="/scrapbook" />
              <ChapterNav direction="next" chapterName="Last Pages" path="/last-pages" />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default OurNotes;

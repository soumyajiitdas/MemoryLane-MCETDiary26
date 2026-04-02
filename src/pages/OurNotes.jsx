import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ChapterNav from '../components/ui/ChapterNav';
import { memoriesData } from '../data/notes';

// New Component for Text Notes (Colored Sticky Notes)
// Unified Sticky Note Component
const StickyNote = ({ post }) => {
  const hasTape = post.id % 2 === 0;
  // Reduced rotation for better readability and to avoid extreme column clipping
  const rotateDeg = (post.id * 3) % 6 - 3; 

  return (
    <div className="break-inside-avoid-column mb-8 perspective-1000">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, zIndex: 10, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`sticky-note p-6 md:p-8 flex flex-col shadow-[4px_8px_15px_rgba(0,0,0,0.3)] hover:shadow-[8px_15px_25px_rgba(0,0,0,0.4)] transition-shadow duration-300 w-full ${hasTape ? 'tape' : ''}`}
        style={{
          transform: `rotate(${rotateDeg}deg)`,
          transformOrigin: 'center top'
        }}
      >
        {!hasTape && <div className="push-pin -top-3"></div>}
        
        <p className={`font-['Caveat'] ${post.image ? 'text-2xl mt-4 mb-6' : 'text-3xl mt-6 mb-8'} leading-relaxed text-[#2c3e50] w-full text-center px-2`}>
           "{post.content}"
        </p>
        
        {post.image && (
          <div className="w-full mb-6">
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
           <span className="text-[11px] text-[#9ca3af] font-sans tracking-widest uppercase font-medium">
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
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-white/70 text-xs font-bold tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full font-serif bg-amber-500 animate-pulse"></span>
              Final Goodbyes
            </span>
            <SectionHeading 
            title="Our Notes" 
            subtitle="Few lines for the days we didn’t want to end. 📜"
          />
          </div>

          <p className="text-center font-['Caveat'] text-3xl text-[var(--color-text-muted)] -mt-12 mb-32 italic">
             " It’s strange how endings don’t feel like endings at first. "
          </p>

          {/* Masonry Board */}
          <div className="mb-24 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 p-6 md:p-10 bg-corkboard rounded-xl border-4 border-[#3d3126] shadow-[inset_0_20px_50px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.5)] relative min-h-[60vh] styling-scrollbar" style={{ columnFill: 'balance' }}>
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

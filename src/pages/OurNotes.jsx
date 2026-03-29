import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import { memoriesData } from '../data/memories';

// Custom Sticky Note Component
const StickyNote = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      layout
      className="sticky-note p-6 break-inside-avoid mb-6 flex flex-col items-center"
      style={{
        transform: `rotate(${Math.floor(Math.random() * 6) - 3}deg)`
      }}
    >
      <p className="font-['Caveat'] text-2xl leading-relaxed text-[#2c3e50] w-full text-center mt-4">
         "{post.content}"
      </p>
      
      {post.image && (
        <div 
          className="w-full h-40 mt-6 shadow-inner border border-gray-200 bg-cover bg-center"
          style={{ backgroundImage: post.image?.startsWith('http') ? `url(${post.image})` : post.image }}
        />
      )}
      
      <div className="mt-8 w-full flex justify-between items-end border-t border-black/5 pt-4">
         <span className="font-['Caveat'] text-xl font-bold text-gray-800">
           {post.author}
         </span>
         <span className="text-xs text-gray-400 font-sans tracking-widest uppercase">
           {new Date(post.timestamp).toLocaleDateString()}
         </span>
      </div>
    </motion.div>
  );
};


const MemoryWall = () => {
  const [posts, setPosts] = useState(memoriesData);

  return (
    <PageTransition>
      <div className="min-h-[100vh] py-24 pb-32">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="text-center mb-16 relative">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-white/70 text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              FINAL GOODBYES
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
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 p-4 md:p-8 bg-black/20 rounded-3xl border border-[var(--color-glass-border)] shadow-2xl relative min-h-[60vh]">
             {/* Subtle pinboard grid pattern placeholder if wanted, keeping it clean via glassmorphism */}
             <AnimatePresence>
                {posts.map(post => (
                  <StickyNote key={post.id} post={post} />
                ))}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default MemoryWall;

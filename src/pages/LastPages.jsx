import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, ChevronLeft, ChevronRight, Flower2 } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ChapterNav from '../components/ui/ChapterNav';
import { phoenixData } from '../data/phoenix';

// 1. Organize data into a flat array of pages
const bookPages = [
  { type: 'cover', src: '/phoenix-cover.webp' },
  ...phoenixData.images.map(i => ({ type: 'image', ...i })),
  ...phoenixData.stories.map(s => ({ type: 'story', ...s })),
  ...phoenixData.poems.map(p => ({ type: 'poem', ...p })),
];

const FlipbookPage = ({ page, index, totalPages }) => {
  if (page.type === 'cover') {
    return (
      <div 
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${page.src})` }}
      />
    );
  }

  return (
    <div className="w-full h-full bg-[#fcf9f2] text-[#3e3222] relative flex flex-col overflow-hidden px-6 py-6 md:px-10 md:py-8">
      
      {/* Subtle Noise Texture representing paper */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Header Ribbon (Fixed) */}
      <div className="relative z-20 w-full flex-shrink-0 pb-2 border-b border-[#3e3222]/20 mb-4">
         <div className="flex justify-between items-center">
            <span className="uppercase tracking-[0.2em] font-bold text-[8px] md:text-[10px] text-[#7d6b52]">Phoenix Magazine</span>
            <span className="uppercase tracking-[0.2em] font-bold text-[8px] md:text-[10px] text-[#b94a4a]">Vol: I</span>
         </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="relative z-10 w-full flex-grow overflow-y-auto styling-scrollbar pr-1">
        {page.type === 'story' && (
          <div className="flex flex-col">
            <h3 className="text-4xl font-serif text-[#2a2217] mb-2 leading-tight drop-shadow-sm">{page.title}</h3>
            <span className="text-xs uppercase tracking-widest text-[#b94a4a] font-semibold block mb-4">By {page.author}</span>
            {page.excerpt.map((line, i) => {
              const isFirst = i === 0;

              return (
                <p
                  key={i}
                  className={`font-serif text-md leading-relaxed text-[#4a3f32] mb-4 last:mb-0 ${
                    isFirst
                      ? "first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:-mt-2 first-letter:text-[#b94a4a]"
                      : ""
                  }`}
                >
                  {line}
                </p>
              );
            })}
          </div>
        )}

        {page.type === 'image' && (
          <div className="flex flex-col items-center justify-center min-h-full">
            <div className="w-full aspect-square max-w-[350px] bg-cover bg-center shadow-inner border border-[#d4c3a3]" style={{ backgroundImage: `url(${page.src})` }}></div>
            <p className="font-['Caveat'] text-2xl text-center text-[#5c4a35] mt-4 px-4 tracking-tight">
              "{page.caption}"
            </p>
          </div>
        )}

        {page.type === 'poem' && (
          <div className="flex flex-col justify-center items-center min-h-full text-center py-4">
            <h3 className="font-['Caveat'] text-5xl md:text-4xl text-[#b94a4a] mb-4">{page.title}</h3>
            <div className="space-y-2">
              {page.content.map((line, i) => (
                 <p key={i} className="font-serif text-md text-[#5c4a35] tracking-wide relative">
                   {line}
                 </p>
              ))}
            </div>
            <span className="text-xs uppercase tracking-widest text-[#b94a4a] mt-6 block">~ {page.author}</span>
          </div>
        )}
      </div>

      {/* Footer Page Number (Fixed) */}
      <div className="relative z-20 w-full flex-shrink-0 mt-4 border-t border-[#3e3222]/20 pt-2 flex justify-between items-center text-[#7d6b52] font-serif text-xs">
         <span>Batch '26</span>
         <span className="font-bold">Page {index}</span>
      </div>
    </div>
  );
};

const LastPages = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const handleNext = () => {
    if (currentPage < bookPages.length - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  };

  // Flip Animation Variants for realistic stiff book turn
  const pageVariants = {
    initial: (dir) => ({
      rotateY: dir === 1 ? 0 : -90,
      zIndex: dir === 1 ? 0 : 20,
      opacity: dir === 1 ? 0.5 : 1,
    }),
    animate: {
      rotateY: 0,
      zIndex: 10,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
    },
    exit: (dir) => ({
      rotateY: dir === 1 ? -95 : 0, // slight over-rotation to hide it fully
      zIndex: dir === 1 ? 20 : 0,
      opacity: dir === 1 ? 1 : 0.5,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
    })
  };

  return (
    <PageTransition>
      <div className="min-h-[100vh] py-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center relative z-10">
          
          <SectionHeading 
            title="Last Pages" 
            subtitle="What remained when the story found its end. 🦋"
          />
          <p className="text-center font-['Caveat'] text-3xl text-[var(--color-text-muted)] -mt-12 mb-16 italic">
             " For the memories we couldn't fit into the margins... "
          </p>

          {/* FLIPBOOK CONTAINER */}
          {/* We use perspective to give the 3D rotation depth */}
          <div className="w-full max-w-[500px] aspect-[2/3] md:aspect-[3/4] relative perspective-[1500px] mt-8 mb-12">
            
            {/* The Book's back cover / edge (simulated depth) */}
            <div className="absolute inset-0 bg-[#2a2217] shadow-xl rounded-sm translate-x-1 translate-y-1"></div>
            
            <AnimatePresence custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ 
                   transformOrigin: 'left center',
                   backfaceVisibility: 'hidden',
                }}
                className="absolute inset-0 w-full h-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/10 rounded-sm overflow-hidden"
              >
                 <FlipbookPage 
                   page={bookPages[currentPage]} 
                   index={currentPage} 
                   totalPages={bookPages.length} 
                 />
              </motion.div>
            </AnimatePresence>

          </div>

          {/* Flipbook Controls */}
          <div className="flex items-center gap-6 mb-24">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-amber-500/50 disabled:opacity-30 disabled:hover:bg-white/5 transition-all text-sm flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline font-serif font-medium tracking-wide">Previous</span>
            </button>
            
            <span className="font-serif text-[var(--color-text-muted)] tracking-widest text-sm">
               {currentPage + 1} / {bookPages.length}
            </span>

            <button 
              onClick={handleNext}
              disabled={currentPage === bookPages.length - 1}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-amber-500/50 disabled:opacity-30 disabled:hover:bg-white/5 transition-all text-sm flex items-center gap-2"
            >
              <span className="hidden sm:inline font-serif font-medium tracking-wide">Next</span>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* The Final CTA Download Section Redesigned as a Postcard */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="pt-20 mt-12 border-t border-[#3e3222]/20 w-full max-w-3xl flex flex-col items-center text-center relative"
          >
             <Flower2 size={32} className="text-[#b94a4a] absolute top-0 -translate-y-1/2 bg-[var(--color-midnight)] px-4 box-content" />
             
             <div className="text-[#3e3222] p-8 md:p-14 shadow-2xl relative w-full border border-[#d4c3a3]/30 rounded-2xl max-w-2xl mx-auto flex flex-col items-center mb-12">
                
                {/* Vintage Postmark Decor */}
                <div className="absolute top-4 right-4 w-16 h-16 border-[1.5px] border-dashed border-white/50 rounded-full pointer-events-none mix-blend-multiply opacity-60"></div>
                <div className="absolute top-8 right-0 w-24 h-[1px] border-t border-wavy border-white/50 pointer-events-none mix-blend-multiply opacity-60"></div>

                <h3 className="font-['Caveat'] text-4xl md:text-5xl text-white/80 mb-6">A Final Word...</h3>
                <p className="font-serif italic text-xl md:text-2xl text-[#eaddc5] leading-relaxed mb-10 max-w-lg">
                  No matter how many pages we turn, the truest parts of the story will always remain unwritten. Take this piece of history with you, wherever the next chapter leads.
                </p>
                
                <a 
                  href="/phoenix-magazine.pdf" 
                  download
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#2a2217] text-[#f4ecd8] font-serif tracking-widest uppercase text-sm font-bold hover:bg-[#b94a4a] transition-all duration-500 overflow-hidden shadow-lg rounded-sm"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FileText size={18} />
                    Download Full Magazine
                    <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                  </span>
                  {/* Vintage hover swoosh */}
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-150 group-hover:bg-white/10 z-0"></div>
                </a>
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#7d6b52] mt-6 font-semibold">Draft Archive • PDF Size 27 MB</span>
             </div>

             <div className="flex justify-between items-center w-full mt-12">
               <ChapterNav direction="prev" chapterName="Our Notes" path="/our-notes" />
               <ChapterNav direction="next" chapterName="Prologue" path="/" labelOverride="Return to" />
             </div>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};

export default LastPages;

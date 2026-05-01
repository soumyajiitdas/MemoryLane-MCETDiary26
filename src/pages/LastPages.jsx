import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, ChevronLeft, ChevronRight, Flower2, Play } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ChapterNav from '../components/ui/ChapterNav';
import Fireflies from '../components/ui/Fireflies';
import { phoenixPages } from '../data/phoenix';
import { DoodleCrown, DoodleArrow, DoodleHeart, DoodleCircle, DoodleSparkle } from '../components/ui/VintageDoodles';
import EndCredits from '../components/ui/EndCredits';
import { noSleep } from '../utils/noSleep';

// Cover is always pinned first; remaining pages are sorted by id.
const cover = phoenixPages.find(p => p.type === 'cover');
const rest  = phoenixPages.filter(p => p.type !== 'cover').sort((a, b) => a.id - b.id);
const bookPages = cover ? [cover, ...rest] : rest;

// Doodle sets — one per content type, rendered as absolute pencil sketches on each page
const pageDoodles = [
  { type: 'image', doodles: [
    { C: DoodleHeart,   pos: 'top-2 right-2',    size: 'w-10 h-10', rotate: 'rotate-12'       },
    { C: DoodleSparkle, pos: 'bottom-8 left-2',   size: 'w-8 h-8',  rotate: '-rotate-6'       },
  ]},
  { type: 'story', doodles: [
    { C: DoodleArrow,   pos: 'top-2 right-2',    size: 'w-12 h-12', rotate: 'rotate-[130deg]' },
    { C: DoodleCircle,  pos: 'bottom-6 right-8',  size: 'w-10 h-10', rotate: 'rotate-6'       },
  ]},
  { type: 'poem', doodles: [
    { C: DoodleCrown,   pos: 'top-2 left-2',     size: 'w-10 h-10', rotate: '-rotate-12'      },
    { C: DoodleHeart,   pos: 'bottom-6 right-2',  size: 'w-8 h-8',  rotate: 'rotate-12'       },
  ]},
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

  // Pick the doodle config for this page type
  const doodleConfig = pageDoodles.find(d => d.type === page.type)?.doodles ?? [];

  return (
    <div className="w-full h-full bg-[#fcf9f2] text-[#3e3222] relative flex flex-col overflow-hidden px-6 py-6 md:px-10 md:py-8">
      
      {/* Subtle Noise Texture representing paper */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Pencil Sketch Doodles — unique per page type */}
      {doodleConfig.map(({ C, pos, size, rotate }, i) => (
        <C
          key={i}
          className={`${size} absolute ${pos} ${rotate} opacity-60 mix-blend-multiply pointer-events-none z-30`}
          color="rgba(100, 80, 60, 0.8)"
        />
      ))}

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
            <div data-photo="true" className="w-full aspect-square max-w-[350px] bg-cover bg-center shadow-inner border border-[#d4c3a3]" style={{ backgroundImage: `url(${page.src})` }}></div>
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
  useEffect(() => { document.title = "MCET Diary'26 | Last Pages - The Final Chapter"; }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [showCredits, setShowCredits] = useState(false);

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
    <>
    <PageTransition>
      <div className="relative overflow-hidden w-full min-h-screen">
        {/* Subtle background texture for the entire page overlaying global bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: "url('/textures/paper-grain.png')", mixBlendMode: "overlay", zIndex: 1 }}></div>

          {/* Subtle Background Typography */}
          <div className="absolute top-5 sm:-top-4 -right-2 sm:right-125 text-[10rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter">
            Closure
          </div>

        {/* Firefly Particles */}
        <div className="absolute inset-0 pointer-events-none z-10"><Fireflies count={30}/></div>

        <div className="py-24 pb-30 relative z-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center relative z-10">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16 relative"
            >
              <DoodleSparkle className="w-24 h-24 absolute -top-10 left-10 md:-left-85 opacity-30 mix-blend-screen hidden md:block" color="#F59E0B" />
              <DoodleArrow className="w-20 h-20 absolute top-10 right-10 md:-right-85 opacity-30 rotate-45 mix-blend-screen hidden md:block" color="#F59E0B" />

              <SectionHeading
                title="Last Pages"
                subtitle="What remained when the story found its end."
                eyebrow="The Final Chapter"
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-center font-serif italic font-light text-2xl md:text-3xl text-white/60 -mt-10 mb-16 max-w-2xl mx-auto"
            >
               "For the memories we couldn't fit into the margins..."
            </motion.p>

            {/* FLIPBOOK CONTAINER */}
            <div className="w-full max-w-[500px] aspect-[2/3] md:aspect-[3/4] relative mt-8 mb-12" style={{ perspective: '1500px' }}>

              {/* Book spine / back cover depth */}
              <div
                className="absolute inset-0 rounded-sm"
                style={{
                  background: 'linear-gradient(135deg, #1a1209, #2a1a0a)',
                  boxShadow: '4px 4px 20px rgba(0,0,0,0.7), -1px 0 0 rgba(245,158,11,0.05)',
                  transform: 'translate(4px, 5px)',
                }}
              />
              {/* Book left spine edge */}
              <div
                className="absolute left-0 top-0 bottom-0 w-4 rounded-l-sm"
                style={{
                  background: 'linear-gradient(to right, rgba(180,83,9,0.4), transparent)',
                  zIndex: 2,
                  transform: 'translate(2px, 2px)',
                }}
              />

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
                  className="absolute inset-0 w-full h-full shadow-[0_0_30px_rgba(0,0,0,0.6),4px_4px_0_rgba(0,0,0,0.3)] border border-white/5 rounded-sm overflow-hidden"
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-6 mb-24"
            >
              <motion.button
                onClick={handlePrev}
                disabled={currentPage === 0}
                whileHover={{ scale: 1.08, x: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full transition-all text-sm flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                }}
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline font-serif font-medium tracking-wide">Previous</span>
              </motion.button>

              <span className="font-serif tracking-widest text-sm" style={{ color: 'rgba(245,158,11,0.6)' }}>
                {currentPage + 1} / {bookPages.length}
              </span>

              <motion.button
                onClick={handleNext}
                disabled={currentPage === bookPages.length - 1}
                whileHover={{ scale: 1.08, x: 2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full transition-all text-sm flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(180,83,9,0.1))',
                  border: '1px solid rgba(245,158,11,0.3)',
                  color: '#fcd34d',
                }}
              >
                <span className="hidden sm:inline font-serif font-medium tracking-wide">Next</span>
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>

            {/* The Final CTA Download Section Redesigned as a Postcard */}
            <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="pt-20 mt-12 border-t border-[#3e3222]/40 w-full max-w-3xl flex flex-col items-center text-center relative"
          >
             <Flower2 size={32} className="text-[#b94a4a] absolute top-0 -translate-y-1/2 bg-[var(--color-midnight)] px-4 box-content" />
             
             <div className="text-[#3e3222] p-8 md:p-14 shadow-2xl relative w-full border border-[#d4c3a3]/30 rounded-2xl max-w-2xl mx-auto flex flex-col items-center mb-12">
                
                {/* Vintage Postmark Decor */}
                <div className="absolute top-4 right-4 w-16 h-16 border-[1.5px] border-dashed border-white/50 rounded-full pointer-events-none mix-blend-multiply opacity-60"></div>
                <div className="absolute top-8 right-0 w-24 h-[1px] border-t border-wavy border-white/50 pointer-events-none mix-blend-multiply opacity-60"></div>

                {/* Doodle Crown */}
                <DoodleCrown className="w-16 h-16 absolute -top-8 -left-6 opacity-80 -rotate-12 mix-blend-screen" color="rgba(245, 158, 11, 0.8)" />
                
                  <h3 className="font-['Caveat'] text-4xl md:text-5xl text-white/80 mb-6 relative z-10">A Final <span className="text-amber-500/90">Word...</span></h3>
                <p className="font-serif italic text-xl md:text-2xl text-[#eaddc5] leading-relaxed mb-10 max-w-lg relative z-10">
                  No matter how many pages we turn, the truest parts of the story will always remain unwritten. Take this piece of history with you, wherever the next chapter leads.
                </p>
                
                <div className="relative inline-block z-10">
                  <a 
                    href="/magazine/phoenix-magazine.pdf" 
                    download
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#2a2217] text-[#f4ecd8] font-serif tracking-widest uppercase text-sm font-bold hover:bg-[#b94a4a] transition-all duration-500 overflow-hidden shadow-lg rounded-sm"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                       <FileText size={18} />
                       <span className='hidden sm:inline'>Download Full</span><span className='inline sm:hidden'>Phoenix</span>Magazine
                       <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                    </span>
                    {/* Vintage hover swoosh */}
                    <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-150 group-hover:bg-white/10 z-0"></div>
                  </a>
                  {/* Arrow pointing to download */}
                  <DoodleArrow className="hidden md:block w-16 h-16 absolute top-1/2 -right-24 -translate-y-1/2 opacity-80" color="rgba(245, 158, 11, 0.8)" />
                </div>

                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#7d6b52] mt-6 font-semibold">Draft Archive • PDF Size 27 MB</span>
             </div>

               {/* ── Credits trigger — premium ── */}
               <motion.div
                 initial={{ opacity: 0, y: 16 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
                 className="mt-10 mb-6 flex flex-col items-center gap-5"
               >
                 {/* Decorative divider */}
                 <div className="flex items-center gap-4 w-64">
                   <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.25))' }} />
                   <span className="font-sans text-[0.6rem] tracking-[0.32em] uppercase font-semibold whitespace-nowrap" style={{ color: 'rgba(245,158,11,0.5)' }}>One Last Look</span>
                   <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, rgba(245,158,11,0.25))' }} />
                 </div>

                 {/* The button */}
                 <div className="relative group cursor-pointer mt-4" onClick={() => {
                   noSleep.enable();
                   setShowCredits(true);
                 }}>
                   {/* Outer glow ring — appears on hover */}
                   <div
                     className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                     style={{
                       boxShadow: '0 0 32px rgba(245,158,11,0.14)',
                       background: 'transparent',
                     }}
                   />
                   {/* Button surface */}
                   <button
                     className="relative flex items-center gap-3.5 px-10 py-3.5 rounded-full font-sans font-bold tracking-[0.22em] uppercase text-xs transition-all duration-500"
                     style={{
                       background: 'linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(180,83,9,0.04) 100%)',
                       border: '1px solid rgba(245,158,11,0.22)',
                       color: 'rgba(245,158,11,0.6)',
                       letterSpacing: '0.28em',
                     }}
                     onMouseEnter={e => {
                       e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245,158,11,0.13) 0%, rgba(180,83,9,0.08) 100%)';
                       e.currentTarget.style.borderColor = 'rgba(245,158,11,0.45)';
                       e.currentTarget.style.color = 'rgba(245,158,11,0.92)';
                     }}
                     onMouseLeave={e => {
                       e.currentTarget.style.background = 'linear-gradient(135deg, rgba(245,158,11,0.07) 0%, rgba(180,83,9,0.04) 100%)';
                       e.currentTarget.style.borderColor = 'rgba(245,158,11,0.22)';
                       e.currentTarget.style.color = 'rgba(245,158,11,0.6)';
                     }}
                   >
                     <Play size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                     Roll Credits
                   </button>
                 </div>

                 {/* Subtitle */}
                 <p className="font-serif italic text-md mt-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                   "Not an end - just a beginning of something new..."
                 </p>
               </motion.div>
            </motion.div>
            
              <div className="flex justify-between items-center w-full pt-12">
                <ChapterNav direction="prev" chapterName="Our Notes" path="/our-notes" />
                <ChapterNav direction="next" chapterName="Prologue" path="/" labelOverride="Return to" />
              </div>
          </div>
        </div>
      </div>
    </PageTransition>

    {/* End Credits — full screen overlay, mounted outside PageTransition */}
    <EndCredits isOpen={showCredits} onClose={() => setShowCredits(false)} />
    </>
  );
};

export default LastPages;

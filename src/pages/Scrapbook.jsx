import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, SlidersHorizontal } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import GalleryGrid from '../components/sections/ScrapbookGrid';
import Lightbox from '../components/ui/Lightbox';
import ChapterNav from '../components/ui/ChapterNav';
import Fireflies from '../components/ui/Fireflies';
import { DoodleSparkle, DoodleArrow } from '../components/ui/VintageDoodles';
import { galleryData } from '../data/scrapbook';

const years = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year"];

// Derive album cycle list from data, always starting with "All"
const albums = ["All", ...Array.from(new Set(galleryData.map(img => img.album))).sort()];

const albumEmoji = {
  Moments:  '📸',
  Events:   '🎉',
  Hangouts: '☕',
  Trips:    '🗺️',
};

const yearMapping = {
  "1st Year": "1st",
  "2nd Year": "2nd",
  "3rd Year": "3rd",
  "4th Year": "4th",
};

const Scrapbook = () => {
  useEffect(() => { document.title = "MCET Diary'26 | Scrapbook - Scattered Memories"; }, []);

  const [activeYear,    setActiveYear]    = useState("All");
  const [albumIndex,    setAlbumIndex]    = useState(0);   // cycles through albums[]
  const [sortOrder,     setSortOrder]     = useState("random");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const [shuffledBase] = useState(() => [...galleryData].sort(() => Math.random() - 0.5));

  const activeAlbum = albums[albumIndex];

  // Cycle to next album on every click
  const cycleAlbum = () => setAlbumIndex(prev => (prev + 1) % albums.length);

  const cycleSort = () =>
    setSortOrder(prev =>
      prev === "random" ? "newest" : prev === "newest" ? "oldest" : "random"
    );

  const filteredImages = useMemo(() => {
    let imgs = [...shuffledBase];

    if (activeYear !== "All") {
      imgs = imgs.filter(img => img.year === yearMapping[activeYear]);
    }
    if (activeAlbum !== "All") {
      imgs = imgs.filter(img => img.album === activeAlbum);
    }
    if (sortOrder === "newest") {
      imgs.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (sortOrder === "oldest") {
      imgs.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    }

    return imgs;
  }, [shuffledBase, activeYear, activeAlbum, sortOrder]);

  return (
    <PageTransition>
      <div className="relative overflow-hidden w-full min-h-screen">
        {/* Subtle background texture for the entire page overlaying global bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: "url('/textures/paper-grain.png')", mixBlendMode: "overlay", zIndex: 1 }}></div>

        {/* Subtle Background Typography */}
        <div className="absolute top-5 sm:-top-4 right-12 sm:right-146 text-[10rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter">
          Relics
        </div>

        {/* Firefly Particles */}
        <div className="absolute inset-0 pointer-events-none z-10"><Fireflies count={20}/></div>

        <div className="py-24 pb-30 relative z-20">
          <div className="max-w-[1400px] mx-auto px-4 relative z-10">

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16 relative"
            >
              <DoodleArrow className="w-24 h-24 absolute -top-10 left-10 md:left-40 opacity-30 -rotate-[135deg] mix-blend-screen hidden md:block" color="#F59E0B" />
              <DoodleSparkle className="w-20 h-20 absolute top-10 right-10 md:right-40 opacity-30 mix-blend-screen hidden md:block" color="#F59E0B" />
              
              <SectionHeading
                title="Scrapbook"
                subtitle="Fragments of time we chose to keep."
                eyebrow="Scattered Memories"
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-center font-serif italic font-light text-2xl md:text-3xl text-white/60 mb-20 max-w-2xl mx-auto"
            >
               "Photographs are tickets to moments that would otherwise be gone..."
            </motion.p>

            {/* Top bar with filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8 border-b border-white/5 pb-8 relative z-20"
            >
              {/* Left: Year filters */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 font-sans">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => setActiveYear(year)}
                      className={`px-6 py-2 rounded-full text-xs tracking-widest font-semibold uppercase transition-all duration-300 ${
                        activeYear === year
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                          : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Sort + Album cycle button */}
              <div className="flex items-center gap-4 flex-shrink-0 self-start lg:self-end">
                {/* Sort */}
                <button
                  onClick={cycleSort}
                  className="flex items-center gap-2 px-6 py-2 rounded-full text-xs font-sans tracking-widest uppercase font-semibold text-white/60 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
                >
                  <ArrowDownUp size={16} />
                  {sortOrder === "random" ? "Random" : sortOrder === "newest" ? "Newest" : "Oldest"}
                </button>

                {/* Album cycle button */}
                <motion.button
                  onClick={cycleAlbum}
                  whileTap={{ scale: 0.93 }}
                  className="relative flex items-center gap-2 px-6 py-2 rounded-full text-xs font-sans tracking-widest uppercase font-semibold transition-all duration-300 overflow-hidden bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                >
                  <SlidersHorizontal size={16} />

                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeAlbum}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center gap-1.5"
                    >
                      <span>{activeAlbum === "All" ? "All Albums" : activeAlbum}</span>
                      {activeAlbum === "All" ? "" : albumEmoji[activeAlbum]}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            <div className="relative">
              {/* Radial gradient glow in background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-amber-500/5 to-transparent pointer-events-none"></div>

              <GalleryGrid
                images={filteredImages}
                onImageClick={(visibleIdx, visibleImages) => {
                  const clickedId = visibleImages[visibleIdx]?.id;
                  const trueIdx = filteredImages.findIndex(img => img.id === clickedId);
                  setLightboxIndex(trueIdx >= 0 ? trueIdx : visibleIdx);
                }}
              />
            </div>

            {filteredImages.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-white/40"
              >
                <p className="text-5xl mb-4">📭</p>
                <p className="text-xl font-serif font-light">
                  No photos in <span className="text-amber-400">{activeAlbum}</span>
                  {activeYear !== "All" && ` for ${activeYear}`}.
                </p>
                <button
                  onClick={() => { setAlbumIndex(0); setActiveYear("All"); }}
                  className="mt-6 text-sm text-amber-500 hover:text-amber-400 transition-colors underline font-sans tracking-widest uppercase"
                >
                  Clear filters
                </button>
              </motion.div>
            )}

            <div className="flex justify-between items-center w-full mt-16 sm:mt-32 sm:border-t border-amber-900/40 pt-0 sm:pt-12 relative z-20">
              <ChapterNav direction="prev" chapterName="The Cast" path="/the-cast" />
              <ChapterNav direction="next" chapterName="Our Notes" path="/our-notes" />
            </div>
          </div>
        </div>

        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex >= 0}
          onClose={() => setLightboxIndex(-1)}
          onNavigate={setLightboxIndex}
        />
      </div>
    </PageTransition>
  );
};

export default Scrapbook;

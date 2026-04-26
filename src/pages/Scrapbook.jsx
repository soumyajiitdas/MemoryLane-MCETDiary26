import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, SlidersHorizontal } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import GalleryGrid from '../components/sections/ScrapbookGrid';
import Lightbox from '../components/ui/Lightbox';
import ChapterNav from '../components/ui/ChapterNav';
import Fireflies from '../components/ui/Fireflies';
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
  "1st Year": "2023",
  "2nd Year": "2024",
  "3rd Year": "2025",
  "4th Year": "2026",
};

const Scrapbook = () => {
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
      <div className="min-h-screen py-24">
        <div className="max-w-7xl mx-auto px-4">

          {/* Top bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">

            {/* Left: Title + Year filters */}
            <div className="flex-1">
              <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="mb-8"
                  >
                    {/* Eyebrow label with decorative amber dot */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="flex items-center justify-left gap-2 mb-3"
                      >
                        {/* Small amber wax dot */}
                        <span
                          className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
                          style={{
                            background: 'radial-gradient(circle at 35% 35%, #fcd34d, #b45309)',
                            boxShadow: '0 0 6px rgba(245,158,11,0.5)',
                          }}
                        />
                        <p className="text-amber-500/60 uppercase tracking-[0.32em] text-xs font-sans">
                          Frames of Us
                        </p>
                        <span
                          className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0"
                          style={{
                            background: 'radial-gradient(circle at 35% 35%, #fcd34d, #b45309)',
                            boxShadow: '0 0 6px rgba(245,158,11,0.5)',
                          }}
                        />
                      </motion.div>
              
                    {/* Main title with glow + brush-stroke underline */}
                    <h2
                      className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-amber-100 inline-block relative"
                      style={{ textShadow: '0 2px 32px rgba(200,140,50,0.28), 0 0 60px rgba(245,158,11,0.1)' }}
                    >
                      Scrapbook
                      {/* Animated brush-stroke SVG underline */}
                      <motion.svg
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        viewBox="0 0 200 12"
                        className="absolute -bottom-3 left-0 w-full"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        style={{ overflow: 'visible' }}
                      >
                        <motion.path
                          d="M2,8 Q25,3 50,8 T100,6 T150,9 T198,5"
                          fill="none"
                          stroke="url(#brushGrad)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <defs>
                          <linearGradient id="brushGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stopColor="transparent" />
                            <stop offset="25%"  stopColor="rgba(245,158,11,0.7)" />
                            <stop offset="75%"  stopColor="rgba(245,158,11,0.85)" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      </motion.svg>
                    </h2>
              
                    {/* Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-amber-500/65 max-w-2xl mt-6 text-base md:text-lg font-sans"
                      >
                        Fragments of time we chose to keep. ✨
                      </motion.p>
                  </motion.div>

              {/* Firefly particles */}
              <Fireflies count={30}/>

              <div className="flex flex-wrap gap-2 font-serif">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeYear === year
                        ? 'bg-[var(--color-amber)] text-black'
                        : 'glass text-gray-400 hover:text-white hover:bg-[var(--color-glass)]'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Sort + Album cycle button (where Upload was) */}
            <div className="flex items-center gap-4 flex-shrink-0 self-start lg:self-end pb-2">

              {/* Sort */}
              <button
                onClick={cycleSort}
                className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-[var(--color-text-muted)] hover:text-white font-serif transition-colors"
              >
                <ArrowDownUp size={16} />
                {sortOrder === "random" ? "Shuffle (Random)" : sortOrder === "newest" ? "Newest First" : "Oldest First"}
              </button>

              {/* Album cycle button — exact position of the old Upload button */}
              <motion.button
                onClick={cycleAlbum}
                whileTap={{ scale: 0.93 }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-serif transition-all duration-300 overflow-hidden ${
                  activeAlbum !== "All"
                    ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300'
                    : 'bg-[var(--color-amber)] text-black'
                }`}
              >
                <SlidersHorizontal size={16} />

                {/* Animated label swap */}
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
          </div>

          {/* Quote */}
          <div className="mb-12 border-l-4 border-amber-500/50 pl-6 py-2">
            <p className="font-['Caveat'] text-3xl text-gray-300 italic">
              " Photographs are tickets to moments that would otherwise be gone..."
            </p>
          </div>

          <GalleryGrid
            images={filteredImages}
            onImageClick={(visibleIdx, visibleImages) => {
              // find the true index in filteredImages for the lightbox
              const clickedId = visibleImages[visibleIdx]?.id;
              const trueIdx = filteredImages.findIndex(img => img.id === clickedId);
              setLightboxIndex(trueIdx >= 0 ? trueIdx : visibleIdx);
            }}
          />

          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-[var(--color-text-muted)]"
            >
              <p className="text-5xl mb-4">📭</p>
              <p className="text-xl font-serif">
                No photos in <span className="text-amber-400">{activeAlbum}</span>
                {activeYear !== "All" && ` for ${activeYear}`}.
              </p>
              <button
                onClick={() => { setAlbumIndex(0); setActiveYear("All"); }}
                className="mt-4 text-sm text-amber-500/60 hover:text-amber-400 transition-colors underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}

          <div className="flex justify-between items-center w-full mt-20">
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
    </PageTransition>
  );
};

export default Scrapbook;

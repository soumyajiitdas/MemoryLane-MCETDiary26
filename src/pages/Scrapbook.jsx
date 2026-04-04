import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownUp, SlidersHorizontal } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import GalleryGrid from '../components/sections/ScrapbookGrid';
import Lightbox from '../components/ui/Lightbox';
import ChapterNav from '../components/ui/ChapterNav';
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

          {/* ── Top bar ── */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">

            {/* Left: Title + Year filters */}
            <div className="flex-1">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-serif text-white text-gradient mb-3">
                  Scrapbook
                </h1>
                <p className="text-[var(--color-text-muted)] text-lg">
                  Fragments of time we chose to keep. ✨
                </p>
              </div>

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
              " Photographs are a ticket to a moment otherwise gone..."
            </p>
          </div>

          <GalleryGrid
            images={filteredImages}
            onImageClick={(idx) => setLightboxIndex(idx)}
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

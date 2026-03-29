import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, Upload } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import GalleryGrid from '../components/sections/GalleryGrid';
import Lightbox from '../components/ui/Lightbox';
import Button from '../components/ui/Button';
import { galleryData } from '../data/gallery';

const years = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year"];

const Gallery = () => {
  const [activeYear, setActiveYear] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "oldest"
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Map 1st Year etc. to actual years for filtering logic seamlessly
  const yearMapping = {
    "1st Year": "2022",
    "2nd Year": "2023",
    "3rd Year": "2024",
    "4th Year": "2025" // Assuming 2025/2026
  };

  let filteredImages = activeYear === "All"
    ? [...galleryData]
    : galleryData.filter(img => img.year === yearMapping[activeYear] || (activeYear === "4th Year" && img.year >= "2025"));

  // Sort
  filteredImages.sort((a, b) => {
    if (sortOrder === "newest") {
      return parseInt(b.year) - parseInt(a.year);
    } else {
      return parseInt(a.year) - parseInt(b.year);
    }
  });

  return (
    <PageTransition>
      <div className="min-h-screen py-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Top Bar constraints according to requested layout */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
            
            {/* Top-Left: Headings & Filters */}
            <div className="flex-1">
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-3">Media Vault</h1>
                <p className="text-[var(--color-text-muted)] text-lg">A collection of captured memories.</p>
              </div>

              <div className="flex flex-wrap gap-2">
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

            {/* Top-Right: Sort & Upload */}
            <div className="flex items-center gap-4 flex-shrink-0 self-start lg:self-end pb-2">
               <button 
                 onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
                 className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-[var(--color-text-muted)] hover:text-white transition-colors"
               >
                 <ArrowDownUp size={16} />
                 {sortOrder === "newest" ? "Newest First" : "Oldest First"}
               </button>
               
               <Button variant="primary" size="sm" className="gap-2">
                 <Upload size={16} />
                 Upload Photo
               </Button>
            </div>
          </div>

          {/* Nostalgic Quote */}
          <div className="mb-12 border-l-4 border-amber-500/50 pl-6 py-2">
            <p className="font-['Caveat'] text-3xl text-gray-300 italic">
               "Photographs are a ticket to a moment otherwise gone."
            </p>
          </div>

          <GalleryGrid 
            images={filteredImages} 
            onImageClick={(idx) => setLightboxIndex(idx)} 
          />

          {filteredImages.length === 0 && (
            <div className="text-center py-20 text-[var(--color-text-muted)]">
              <p className="text-xl">No photos found for "{activeYear}"</p>
            </div>
          )}
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

export default Gallery;

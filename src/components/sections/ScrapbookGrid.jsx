import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GalleryGrid = ({ images, onImageClick }) => {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Generate random stable positions/rotations for each image on load
    setPositions(images.map(() => ({
      rotate: Math.floor(Math.random() * 20) - 10,
      x: Math.floor(Math.random() * 40) - 20,
      y: Math.floor(Math.random() * 40) - 20,
    })));
  }, [images]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full min-h-[100vh] bg-[#2a1b12]/10 border-2 border-dashed border-amber-900/20 rounded-2xl overflow-visible mt-8 flex flex-wrap justify-center items-start content-start gap-8 p-12 py-20"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.1\"/%3E%3C/svg%3E')"
      }}
    >
      {/* Decorative prompt */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-amber-500/50 font-serif italic text-sm pointer-events-none">
        Grab and toss the memories around...
      </div>

      {images.map((image, i) => {
        const pos = positions[i] || { rotate: 0, x: 0, y: 0 };
        return (
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            whileDrag={{ scale: 1.05, zIndex: 50, rotate: 0, cursor: 'grabbing' }}
            whileHover={{ scale: 1.02 }}
            key={image.id}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 1), duration: 0.5, type: "spring" }}
            className="group cursor-grab p-3 sm:p-4 bg-[#fdfbf7] rounded-sm shadow-xl flex flex-col will-change-transform"
            style={{ 
              rotate: pos.rotate,
              x: pos.x,
              y: pos.y,
              width: "280px", 
              boxShadow: "2px 4px 15px rgba(0,0,0,0.15), inset 0 0 40px rgba(0,0,0,0.02)"
            }}
            onClick={() => onImageClick(i)}
          >
            {/* Translucent Tape */}
            <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-20 h-7 bg-white/40 border-l border-r border-white/20 shadow-sm backdrop-blur-md rotate-[-2deg] z-10 pointer-events-none"></div>

            <div className="relative overflow-hidden w-full h-[220px] bg-gray-200 border border-black/5 pointer-events-none">
              {(image.src && (image.src.startsWith('http') || image.src.startsWith('/'))) ? (
                <img 
                  src={image.src} 
                  alt={image.caption || "Scrapbook memory"}
                  className="w-full h-full object-cover block"
                  loading="lazy"
                  draggable={false}
                />
              ) : (
                <div 
                  className="w-full h-full"
                  style={{ backgroundImage: image.src || 'linear-gradient(45deg, #ccc, #eee)' }}
                ></div>
              )}
            </div>
            
            <div className="pt-4 pb-2 px-1 pointer-events-none flex flex-col items-center justify-center min-h-[80px]">
              <h4 className="font-['Caveat'] text-2xl text-gray-800 text-center leading-tight">
                {image.caption}
              </h4>
              <p className="text-amber-700/60 text-[10px] sm:text-xs mt-2 font-serif uppercase tracking-widest">
                {image.year} • {image.album}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default GalleryGrid;

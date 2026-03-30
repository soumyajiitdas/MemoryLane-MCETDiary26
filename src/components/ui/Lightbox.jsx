import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Lightbox = ({ images, currentIndex, isOpen, onClose, onNavigate }) => {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-md">
          {/* Controls */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all"
          >
            <X size={24} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((currentIndex - 1 + images.length) % images.length);
                }}
                className="absolute left-4 sm:left-8 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all"
              >
                <ChevronLeft size={32} />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate((currentIndex + 1) % images.length);
                }}
                className="absolute right-4 sm:right-8 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Image Container */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-screen p-4 flex flex-col items-center justify-center"
            onClick={onClose} // Close when clicking outside image
          >
            <div 
              className="relative w-full h-[80vh] rounded-lg overflow-hidden shadow-2xl bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: (currentImage.src?.startsWith('http') || currentImage.src?.startsWith('/')) ? `url('${currentImage.src}')` : currentImage.src }} 
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
            >
             {/* If we had real images: <img src={currentImage.src} className="w-full h-full object-contain" /> */}
            </div>
            
            {(currentImage.caption || currentImage.year) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                {currentImage.caption && (
                  <h3 className="text-xl md:text-2xl text-white font-serif tracking-wide">{currentImage.caption}</h3>
                )}
                {currentImage.year && (
                  <p className="text-amber-400 font-medium mt-2">{currentImage.year} • {currentImage.album}</p>
                )}
              </motion.div>
            )}
            
            <div className="absolute bottom-6 text-sm text-white/50">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;

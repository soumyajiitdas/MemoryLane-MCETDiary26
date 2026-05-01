import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── LazyImage ────────────────────────────────────────────────────────────────
// Uses IntersectionObserver to defer loading until the image enters the viewport.
// Shows a warm blur-shimmer skeleton while loading.
const LazyImage = ({ src, alt, onClick, caption, year, album, priority = false }) => {
  const imgRef   = useRef(null);
  const [loaded,   setLoaded]   = useState(false);
  const [inView,   setInView]   = useState(priority); // high-priority images load immediately

  useEffect(() => {
    if (priority) return; // skip observer for above-the-fold images
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: '200px' } // start loading 200px before it scrolls into view
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={imgRef} className="relative w-full cursor-pointer overflow-hidden rounded-xl" onClick={onClick}>
      {/* Shimmer skeleton shown while image hasn't loaded yet */}
      {!loaded && (
        <div
          className="w-full bg-amber-950/30 animate-pulse"
          style={{ minHeight: '220px', aspectRatio: '4/3' }}
          aria-hidden="true"
        />
      )}

      {inView && (
        <img
          src={src}
          alt={alt || 'Scrapbook memory'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          className={`w-full h-auto block transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
          onLoad={() => setLoaded(true)}
        />
      )}

      {/* Caption overlay — only visible on hover, never blocks load */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none">
        <h4 className="text-white font-serif text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{caption}</h4>
        <p  className="text-amber-400 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{year} • {album}</p>
      </div>
    </div>
  );
};

// ─── GalleryGrid ─────────────────────────────────────────────────────────────
const PAGE_SIZE = 12; // images per page

const GalleryGrid = ({ images, onImageClick }) => {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset visible count whenever the filtered set changes (new filter applied)
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [images]);

  const visibleImages = images.slice(0, visibleCount);
  const hasMore       = visibleCount < images.length;

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + PAGE_SIZE, images.length));
  }, [images.length]);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {visibleImages.map((image, i) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: Math.min(i, PAGE_SIZE - 1) * 0.04, duration: 0.35 }}
              className="relative group break-inside-avoid mb-4"
            >
              {(image.src?.startsWith('http') || image.src?.startsWith('/')) ? (
                <LazyImage
                  src={image.src}
                  alt={image.caption}
                  caption={image.caption}
                  year={image.year}
                  album={image.album}
                  priority={i < 6} // first 6 images load eagerly (above-the-fold)
                  onClick={() => onImageClick(i, visibleImages)}
                />
              ) : (
                // CSS gradient fallback (no real URL)
                <div
                  className="w-full aspect-[4/3] rounded-xl cursor-pointer"
                  style={{ backgroundImage: image.src, minHeight: '250px' }}
                  onClick={() => onImageClick(i, visibleImages)}
                  role="img"
                  aria-label={image.caption}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Load More ── */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2 mt-12"
        >
          <p className="text-sm text-gray-500 font-['Caveat'] uppercase">
            Showing <span className="text-amber-400">{visibleCount}</span> of <span className="text-amber-400">{images.length}</span> fragments
          </p>
          <motion.button
            onClick={loadMore}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-5 py-3 font-serif text-sm font-medium rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(22, 16, 6, 0.5), rgba(21, 12, 6, 0.6))',
              border: '1px solid rgba(100, 66, 7, 0.35)',
              color: '#d7b02cff',
            }}
          >
            {/* Shimmer sweep on hover */}
            <span className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="relative z-10">
              Unfold more ↓ &nbsp;
              <span className="text-amber-500/60">({images.length - visibleCount} remaining)</span>
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* All loaded indicator */}
      {!hasMore && images.length > PAGE_SIZE && (
        <p className="text-center text-sm text-gray-600 font-['Caveat'] mt-10 tracking-widest uppercase">
          ✦ All <span className='text-amber-700'>{images.length}</span> fragments loaded ✦
        </p>
      )}
    </>
  );
};

export default GalleryGrid;

import React from 'react';
import { motion } from 'framer-motion';

const GalleryGrid = ({ images, onImageClick }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {images.map((image, i) => (
        <motion.div
          key={image.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="relative group cursor-pointer overflow-hidden rounded-xl break-inside-avoid"
          onClick={() => onImageClick(i)}
        >
          <div 
            className="w-full aspect-[4/3] sm:aspect-auto bg-cover bg-center"
            style={{ 
               backgroundImage: image.src?.startsWith('http') ? `url(${image.src})` : image.src, 
               minHeight: Math.random() > 0.5 ? '250px' : '350px' // Simulated masonry variation for gradients
            }}
          ></div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <h4 className="text-white font-serif text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.caption}</h4>
            <p className="text-amber-400 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{image.year} • {image.album}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GalleryGrid;

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';

const EventCard = ({ event, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      layoutId={`event-${event.id}`}
      onClick={() => onClick(event)}
      className="cursor-pointer h-full"
    >
      <div 
        className="relative bg-[#f4ecd8] border border-[#d4c3a3] shadow-lg p-3 pb-6 flex flex-col items-center min-h-[320px]"
        style={{
          boxShadow: '2px 4px 15px rgba(0,0,0,0.15), inset 0 0 40px rgba(100,70,30,0.05)',
        }}
      >
        {/* Postcard Stamp Area (Top Right) */}
        <div className="absolute top-4 right-4 w-12 h-14 bg-[#fdfbf7] p-1 border border-dashed border-[#b3a182] shadow-sm rotate-3 z-20">
           <div 
             className="w-full h-full bg-cover bg-center border border-[#d4c3a3]/50 opacity-80 mix-blend-multiply"
             style={{ backgroundImage: event.gallery[0]?.startsWith('http') ? `url(${event.gallery[0]})` : event.gallery[0] || 'linear-gradient(to bottom, #d4a373, #faedcd)' }}
           >
             <span className="text-[7px] font-bold text-black/60 block text-center mt-1 uppercase tracking-tighter">'26</span>
           </div>
        </div>

        {/* Vintage Postmark overlays (Ink Rings & Wavy lines canceling the stamp) */}
        <div className="absolute top-2 right-8 w-16 h-16 border-[1.5px] border-dashed border-[#3e3222]/20 rounded-full pointer-events-none mix-blend-multiply z-20 opacity-70"></div>
        <div className="absolute top-6 right-1 w-24 h-[1px] border-t border-wavy border-[#3e3222]/30 pointer-events-none mix-blend-multiply z-20 opacity-80"></div>
        <div className="absolute top-8 right-2 w-24 h-[1px] border-t border-wavy border-[#3e3222]/30 pointer-events-none mix-blend-multiply z-20 opacity-80"></div>

        {/* The Main View / Photo inside the Postcard */}
        <div className="w-full h-48 bg-white p-1.5 shadow-sm border border-[#e5e5e5] mt-1 z-10 relative group overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: event.gallery[0]?.startsWith('http') ? `url(${event.gallery[0]})` : event.gallery[0] || '#e5e5e5' }}
          >
            {/* Dark overlay for contrast */}
            <div className="inset-0 absolute bg-black/5 mix-blend-multiply"></div>
          </div>
          <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#f4ecd8] text-[#7d6b52] font-semibold text-[10px] uppercase tracking-widest shadow-sm rounded-sm">
            {event.category}
          </span>
        </div>

        {/* Postcard Written Details */}
        <div className="mt-5 w-full px-2 text-center relative z-10">
          <h3 className="font-['Caveat'] text-3xl font-bold text-[#3e3222] leading-none mb-2">
             {event.title}
          </h3>
          
          <div className="flex justify-center items-center gap-3 text-xs text-[#7d6b52] font-sans tracking-wide font-medium">
              <span className="flex items-center gap-1"><Calendar size={12} className="text-[#b94a4a]" /> {event.date}</span>
              {event.taggedPeople?.length > 0 && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Users size={12} className="text-[#b94a4a]" /> {event.taggedPeople.length}</span>
                </>
              )}
          </div>
          
          <p className="font-['Caveat'] text-xl text-[#5c4a35] mt-3 line-clamp-2 leading-tight">
            "{event.description}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';

const EventCard = ({ event, onClick }) => {
  // Give each instance a slight unique rotation for a more organic, scattered look
  const photoRotate = React.useMemo(() => (Math.random() * 6 - 3).toFixed(1), []);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5, zIndex: 30 }}
      whileTap={{ scale: 0.98 }}
      layoutId={`event-${event.id}`}
      onClick={() => onClick(event)}
      className="cursor-pointer h-full relative perspective-1000"
    >
      <div 
        className="relative bg-[#fcf9f2] w-full h-full p-4 pb-6 flex flex-col border border-[#e2d8c3] overflow-hidden rounded-sm"
        style={{
          boxShadow: '0 8px 20px -6px rgba(0, 0, 0, 0.15), 0 4px 8px -4px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Background Texture Layers */}
        <div className="absolute inset-0 bg-white" style={{ backgroundImage: "url('/textures/rice-paper.png')" }}></div>
        
        {/* Ruled lines overlay */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
             backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #6098cc 27px, #6098cc 28px)",
             backgroundSize: "100% 28px",
             top: "140px" // Start lines mostly below the photo
          }}
        ></div>

        {/* Red vertical margin line for classical notebook effect */}
        <div className="absolute left-[39px] top-0 bottom-0 w-[1px] bg-red-800/20 pointer-events-none"></div>
        <div className="absolute left-[37px] top-0 bottom-0 w-[1px] bg-red-800/20 pointer-events-none"></div>

        {/* Vintage Round Stamp */}
        <div className="absolute top-2 right-2 w-[72px] h-[72px] border-[2.5px] border-red-800/40 rounded-full flex items-center justify-center rotate-[-15deg] z-20 mix-blend-multiply opacity-60 shadow-sm pointer-events-none">
           <div className="border-[1.5px] border-dashed border-red-800/40 rounded-full w-[60px] h-[60px] flex items-center justify-center text-center leading-none">
             <span className="text-[10px] font-bold text-red-800/60 uppercase tracking-tighter block mt-0.5">
               MCET<br/>{event.category?.substring(0, 8)}<br/>★
             </span>
           </div>
        </div>

        {/* Content wrapper */}
        <div className="relative z-10 w-full pl-10 pr-2 h-full flex flex-col pt-2">
          
          {/* Photo polaroid-style attachment */}
          <div 
            className="w-full mx-auto bg-white p-2.5 pb-7 shadow-[2px_6px_12px_rgba(0,0,0,0.12)] border border-gray-200/80 mb-6 relative group"
            style={{ transform: `rotate(${photoRotate}deg)` }}
          >
            {/* Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-7 bg-blue-600/30 backdrop-blur-sm border border-amber-800/10 shadow-[1px_2px_3px_rgba(0,0,0,0.05)]"
                 style={{ transform: "rotate(-3deg)", backgroundImage: "url('/textures/rice-paper.png')" }}></div>
            
            {/* The Image */}
            <div className="overflow-hidden">
               <div 
                 data-photo="true"
                 className="w-full aspect-[16/9] bg-cover bg-center border border-black/10 sepia-[0.15] transition-transform duration-700 group-hover:scale-[1.05] group-hover:sepia-0"
                style={{ backgroundImage: (event.gallery[0]?.startsWith('http') || event.gallery[0]?.startsWith('/')) ? `url('${event.gallery[0]}')` : (event.gallery[0] || 'linear-gradient(to bottom, #f8dcc0 0%, #fffefd 50%, #d7ead7 100%)') }}
               >
                  <div className="w-full h-full bg-[#3e2723]/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"></div>
               </div>
            </div>
            
            {/* Little caption/date under photo */}
            <p className="text-center font-['Caveat'] text-xl text-gray-700/80 absolute bottom-1 left-0 right-0 leading-none">
              {event.date} 
            </p>
          </div>

          {/* Title */}
          <h3 className="font-['Caveat'] text-4xl font-bold text-[#201d18] leading-[28px] mt-1 mb-2 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
             {event.title}
          </h3>
          
          {/* Metadata: Date & People tagged */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-[#786b5b] font-sans tracking-[0.15em] font-bold uppercase mb-2 mt-1">
              <span className="flex items-center gap-1.5 bg-[#f0eadd] px-2 py-0.5 rounded-sm"><Calendar size={11} className="text-red-800/60" /> {event.date}</span>
          </div>
          
          {/* Description */}
          <p className="font-['Caveat'] text-2xl text-[#332b21] leading-[28px] opacity-95 flex-grow line-clamp-3 my-2 pt-1">
            {event.description}
          </p>

        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;

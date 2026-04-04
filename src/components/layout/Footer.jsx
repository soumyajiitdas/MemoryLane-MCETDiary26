import { motion } from 'framer-motion';
const Footer = () => {
  return (
    <footer className="relative mt-auto pt-8 pb-6 border-t z-10 border-amber-600/20 overflow-hidden text-center">
      {/* Subtle vintage texture layer */}
      <div className="absolute inset-0 bg-amber-900/10 z-0" />
      <div 
        className="absolute inset-0 opacity-[0.15] z-0 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
      />
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center relative z-10">
        
        {/* Decorative Divider */}
        <div className="w-full max-w-sm flex items-center justify-center gap-4 mb-8 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent"></div>
          <span className="text-amber-600/60 text-xl font-serif animate-pulse">✦</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-600/60 to-transparent"></div>
        </div>

        {/* Branding */}
        <p className="text-2xl font-serif tracking-wider mb-2 text-gradient">
          MCET <span className="font-['Caveat'] text-amber-500 text-4xl font-normal tracking-normal ml-1">Batch</span>'26 ✨
        </p>
        
        {/* Tagline */}
        <p className="text-[var(--color-text-muted)] font-['Caveat'] text-2xl tracking-wide mb-8 opacity-80">
          " A repository of memories, friendship, and unforgettable journeys. "
        </p>

        {/* Built With - Pill badge style */}
        <div className="px-6 py-2.5 rounded-full border border-amber-900/30 bg-black/40 backdrop-blur-sm">
          <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-[0.2em] font-medium flex items-center gap-2">
            Crafted with <span className="text-amber-600 animate-pulse text-sm">❤️</span> by Batch 2022–'26
          </p>
        </div>
         {/* ── Closing quote ── */}
          <p className="text-center text-amber-700/50 text-xs font-serif m-8">
            &#127279; Batch 2022-'26 ● Murshidabad Collage of Engineering and Technology, W.B. - 742102 🇮🇳
          </p>
      </div>
    </footer>
  );
};

export default Footer;
  

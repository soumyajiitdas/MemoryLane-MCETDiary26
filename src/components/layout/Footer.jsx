import { motion } from 'framer-motion';
import { DoodleHeart, DoodleCrown, DoodleSparkle } from '../ui/VintageDoodles';
import Fireflies from '../ui/Fireflies';

const Footer = () => {

  return (
    <footer className="relative mt-auto z-10 min-h-[400px]">

      {/* Background layers (placed first so they sit behind content) */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.95) 0%, rgba(5, 5, 5, 0.99) 100%)'
      }} />
      <div
        className="absolute inset-0 opacity-[0.15] z-0 pointer-events-none"
        style={{ backgroundImage: "url('/textures/paper-grain.png')" }}
      />

      {/* Torn paper edge overlapping upward into previous section */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none -translate-y-[99%] drop-shadow-md" style={{ height: '28px' }}>
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="w-full h-full block"
          aria-hidden="true"
        >
          {/* Jagged, sharp path simulating the paper rip. */}
          <path
            d="M0,40 L0,15 L30,25 L75,10 L110,25 L160,5 L220,30 L270,15 L320,32 L380,10 L440,25 L490,5 L550,22 L600,10 L640,30 L710,12 L770,25 L830,5 L890,30 L950,15 L1010,28 L1060,8 L1110,32 L1160,15 L1200,25 L1200,40 Z"
            fill="rgba(10, 10, 10, 0.95)"
          />
          {/* Subtle fibrous amber edge glow along the tear line */}
          <path
            d="M0,15 L30,25 L75,10 L110,25 L160,5 L220,30 L270,15 L320,32 L380,10 L440,25 L490,5 L550,22 L600,10 L640,30 L710,12 L770,25 L830,5 L890,30 L950,15 L1010,28 L1060,8 L1110,32 L1160,15 L1200,25"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Ambient amber glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-48 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(245,158,11,0.06) 0%, transparent 70%)' }}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 flex flex-col items-center relative z-10 gap-6">

        {/* Decorative diamond divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xs flex items-center justify-center gap-3"
        >
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.4))' }} />
          <span className="text-amber-500/60 text-sm font-serif" style={{ textShadow: '0 0 8px rgba(245,158,11,0.4)' }}>✦</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(245,158,11,0.4))' }} />
        </motion.div>
        
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center relative mt-6"
        >
          <DoodleSparkle className="w-16 h-16 absolute -top-8 -right-8 opacity-40 mix-blend-screen" color="#F59E0B" />
          
          <span className="font-serif text-white/90 text-4xl md:text-5xl tracking-tighter drop-shadow-md mr-3">MCET</span>
          <span className="font-['Caveat'] text-gradient-animate text-5xl md:text-6xl leading-none drop-shadow-lg -rotate-2 inline-block">Diary '26</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-serif italic font-light text-xl md:text-2xl text-white/40 text-center max-w-lg leading-snug mt-2"
        >
          <span className='text-amber-600/50 text-[18px] sm:text-md'>❝</span> A repository of memories, friendship, and unforgettable journeys. <span className='text-amber-600/50 text-[18px] sm:text-md'>❞</span>
        </motion.p>

        {/* Crafted with */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: 'spring', damping: 14 }}
          className="mt-6"
        >
          <div className="px-5 sm:px-8 py-3 rounded-2xl sm:rounded-full border border-white/5 bg-white/5 backdrop-blur-sm shadow-inner relative max-w-[90vw]">
            <DoodleCrown className="w-8 h-8 sm:w-10 sm:h-10 absolute -top-3 sm:-top-4 -left-3 sm:-left-4 opacity-50 -rotate-12 mix-blend-screen" color="#F59E0B" />
            <p className="text-[10px] sm:text-xs text-white/60 uppercase tracking-widest sm:tracking-[0.2em] font-sans font-semibold flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 text-center">
              <span>Crafted with</span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-amber-500 text-xs sm:text-sm inline-block drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
              >
                🧡
              </motion.span>
              <span>by</span><span className='text-amber-600/70'> MCETians 2022–’26</span>
            </p>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative text-center text-amber-600/30 text-[10px] uppercase tracking-widest font-['Special_Elite'] font-medium leading-relaxed pt-8 mt-4 border-t border-white/5 w-full max-w-md"
        >
          {/* Heart doodle near the final text */}
          <DoodleHeart className="hidden sm:inline w-12 h-12 absolute -top-4 -right-10 opacity-40 rotate-12 mix-blend-screen" color="#F59E0B" />

          &#127279; MCETians 2022–’26 <span className='text-[6px] opacity-70 sm:text-[10px] sm:opacity-100'>●</span>  All memories preserved forever...
          <br />
          Murshidabad College of Engineering and Technology, W.B. – 742102
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from 'framer-motion';
import { DoodleHeart, DoodleCrown } from '../ui/VintageDoodles';

const Footer = () => {

  return (
    <footer className="relative mt-auto z-10">

      {/* Background layers (placed first so they sit behind content) */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(18,14,8,0.95) 0%, rgba(10,8,5,0.99) 100%)'
      }} />
      <div
        className="absolute inset-0 opacity-[0.12] z-0 pointer-events-none"
        style={{ backgroundImage: "url('/textures/stardust.png')" }}
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
            fill="rgba(18,14,8,0.95)"
          />
          {/* Subtle fibrous amber edge glow along the tear line */}
          <path
            d="M0,15 L30,25 L75,10 L110,25 L160,5 L220,30 L270,15 L320,32 L380,10 L440,25 L490,5 L550,22 L600,10 L640,30 L710,12 L770,25 L830,5 L890,30 L950,15 L1010,28 L1060,8 L1110,32 L1160,15 L1200,25"
            fill="none"
            stroke="rgba(245,158,11,0.25)"
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
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-8 flex flex-col items-center relative z-10 gap-6">

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
        <DoodleCrown className="w-10 h-10 absolute top-16 left-18 sm:top-16 sm:left-120 opacity-70 -rotate-15 mix-blend-screen" color="rgba(245, 158, 11, 0.8)" />
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center"
        >
          <p className="text-3xl font-serif tracking-wider inline-block">
            MCET
            <span className='text-gradient-animate'><span className="font-['Caveat'] text-5xl font-normal tracking-normal ml-2 mr-1">Batch</span>
              '26</span>
          </p>
          <span className="ml-2 text-2xl">✨</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-['Caveat'] text-2xl text-center max-w-lg leading-snug"
          style={{ color: 'rgba(212,180,120,0.7)' }}
        >
          "A repository of memories, friendship, and unforgettable journeys."
        </motion.p>

        {/* Crafted with */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: 'spring', damping: 14 }}
        >
          <div className="px-6 py-2.5 rounded-full border border-amber-900/25 bg-black/30 backdrop-blur-sm">
            <p className="text-xs text-amber-700/70 uppercase tracking-[0.22em] font-medium flex items-center gap-2">
              Crafted with
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-red-500 text-sm inline-block"
              >
                ❤️
              </motion.span>
              by Batch 2022–'26
            </p>
          </div>
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative text-center text-amber-900 text-[11px] font-serif leading-relaxed pt-4 border-t border-amber-900/10 w-full max-w-md"
        >
          {/* Heart doodle near the final text */}
          <DoodleHeart className="hidden sm:inline w-12 h-12 absolute -top-4 -right-10 opacity-80 rotate-12" color="rgba(245, 158, 11, 0.8)" />

          &#127279; Batch 2022–'26 · All memories preserved forever...
          <br />
          Murshidabad College of Engineering and Technology, W.B. – 742102 🇮🇳
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;

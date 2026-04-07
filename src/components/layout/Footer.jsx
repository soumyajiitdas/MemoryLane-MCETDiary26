import { motion } from 'framer-motion';

// Firefly particle component
const Firefly = ({ style }) => (
  <div
    className="firefly"
    style={style}
    aria-hidden="true"
  />
);

const Footer = () => {
  // 10 fireflies with varied positions, sizes and timings
  const fireflies = [
    { left: '8%',  bottom: '20%', '--duration': '10s', '--delay': '0s',   width: '4px', height: '4px' },
    { left: '18%', bottom: '15%', '--duration': '13s', '--delay': '1.5s', width: '3px', height: '3px' },
    { left: '30%', bottom: '30%', '--duration': '9s',  '--delay': '0.8s', width: '5px', height: '5px' },
    { left: '50%', bottom: '10%', '--duration': '11s', '--delay': '2.2s', width: '4px', height: '4px' },
    { left: '65%', bottom: '25%', '--duration': '8s',  '--delay': '3s',   width: '3px', height: '3px' },
    { left: '75%', bottom: '18%', '--duration': '14s', '--delay': '0.4s', width: '5px', height: '5px' },
    { left: '85%', bottom: '32%', '--duration': '10s', '--delay': '1s',   width: '4px', height: '4px' },
    { left: '42%', bottom: '40%', '--duration': '12s', '--delay': '4s',   width: '3px', height: '3px' },
    { left: '58%', bottom: '12%', '--duration': '9s',  '--delay': '2.5s', width: '6px', height: '6px' },
    { left: '22%', bottom: '45%', '--duration': '15s', '--delay': '0.2s', width: '3px', height: '3px' },
  ];

  return (
    <footer className="relative mt-auto z-10">

      {/* ── Background layers (placed first so they sit behind content) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(18,14,8,0.95) 0%, rgba(10,8,5,0.99) 100%)'
      }} />
      <div
        className="absolute inset-0 opacity-[0.12] z-0 pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
      />

      {/* ── True Torn paper edge overlapping upward into previous section ── */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none -translate-y-[99%] drop-shadow-md" style={{ height: '28px' }}>
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="w-full h-full block"
          aria-hidden="true"
        >
          {/* Jagged, sharp path simulating the paper rip. 
              The fill perfectly matches the very top color of the footer gradient `rgba(18,14,8,0.95)` */}
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

      {/* ── Firefly particles ── */}
      {fireflies.map((style, i) => (
        <Firefly key={i} style={style} />
      ))}

      {/* ── Ambient amber glow ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-48 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(245,158,11,0.06) 0%, transparent 70%)' }}
      />

      {/* ── Main content ── */}
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

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center"
        >
          <p className="text-3xl font-serif tracking-wider text-gradient-animate inline-block">
            MCET
            <span className="font-['Caveat'] text-5xl font-normal tracking-normal ml-2 mr-1">Batch</span>
            '26
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

        {/* Wax seal + Crafted with */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: 'spring', damping: 14 }}
          className="flex flex-col items-center gap-3"
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
          className="text-center text-amber-900/40 text-[11px] font-serif leading-relaxed pt-2 border-t border-amber-900/10 w-full max-w-md"
        >
          &#127279; Batch 2022–'26 · All memories preserved forever
          <br />
          Murshidabad College of Engineering and Technology, W.B. – 742102 🇮🇳
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;

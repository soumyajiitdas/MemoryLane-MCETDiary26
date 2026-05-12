import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Play, Pause, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '../../context/PlayerContext';
import PaperTear from '../ui/PaperTear';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const listener = () => setIsMobile(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

/* ── One-direction marquee ─────────────────────────────────────────── */
/* Duplicates the text so the loop is seamless (no jump-back)          */
const MarqueeText = ({ text, className = '' }) => {
  const needsScroll = text.length > 14;
  return (
    <span
      className={`block overflow-hidden whitespace-nowrap ${className}`}
      style={{ maxWidth: '100px' }}
    >
      {needsScroll ? (
        <motion.span
          className="inline-block"
          /* scroll left to -50% → identical visual to start → loop seamlessly */
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
        >
          {/* doubled text with separator so loop is invisible */}
          {text}&nbsp;&nbsp;&nbsp;&nbsp;&#9734;&nbsp;&nbsp;&nbsp;&nbsp;{text}&nbsp;&nbsp;&nbsp;&nbsp;&#9734;&nbsp;&nbsp;&nbsp;&nbsp;
        </motion.span>
      ) : (
        <span>{text}</span>
      )}
    </span>
  );
};

/* ── Tiny vinyl SVG (matches home page aesthetics) ──────────────────── */
/* Pure CSS animation-play-state — no Framer Motion rotation needed     */
const MiniVinyl = ({ isPlaying, isResetting, size = 26 }) => {
  const playState = (isPlaying && !isResetting) ? 'running' : 'paused';
  return (
    <div
      key={isResetting ? 'mini-reset' : 'mini-play'}
      className="vinyl-spinning flex-shrink-0 relative"
      style={{
        width: size,
        height: size,
        animationDuration: '3s',
        animationPlayState: playState,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="mDiscGrad" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#2e2822" />
            <stop offset="100%" stopColor="#100d08" />
          </radialGradient>
          <radialGradient id="mLabelGrad" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#c8934a" />
            <stop offset="100%" stopColor="#7c481f" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="50" fill="url(#mDiscGrad)" />
        {[44, 37, 30, 23].map((r, i) => (
          <circle key={i} cx="50" cy="50" r={r}
            fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.9" />
        ))}
        <circle cx="50" cy="50" r="15" fill="url(#mLabelGrad)" />
        <circle cx="50" cy="50" r="3.5" fill="#0d0b09" />
        <path d="M 22 28 Q 50 12 78 28"
          stroke="rgba(255,255,255,0.07)" strokeWidth="7"
          fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
};

/* ── Inline mini player pill ─────────────────────────────────────────  */
const NavMiniPlayer = ({ showDisc = true }) => {
  const { currentTrack, isPlaying, isResetting, activeTrack, playTrack, stop } = usePlayer();

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          key="nav-player"
          initial={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0, border: 'none', marginLeft: 0 }}
          animate={{ opacity: 1, width: 'auto', paddingLeft: 12, paddingRight: 12, border: '1px solid rgba(187, 120, 20, 0.6)', marginLeft: 8 }}
          exit={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0, border: 'none', marginLeft: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="flex items-center gap-2 py-1.5 rounded-full min-w-0 overflow-hidden"
          style={{
            background: 'rgba(80, 54, 18, 0.34)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Vinyl disc — desktop only */}
          {showDisc && <MiniVinyl isPlaying={isPlaying} isResetting={isResetting} size={26} />}

          {/* Scrolling track name */}
          <MarqueeText
            text={`${currentTrack.title} - ${currentTrack.feat}`}
            className="text-amber-300/80 text-xs font-['Playfair_Display'] min-w-0"
          />

          {/* Play / Pause */}
          <button
            onClick={() => playTrack(activeTrack)}
            className="text-amber-400/80 hover:text-amber-200 transition-colors text-[10px] leading-none flex-shrink-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className='w-4 h-4' /> : <Play className='w-4 h-4' />}
          </button>

          {/* Stop */}
          <button
            onClick={stop}
            className="text-amber-600/70 hover:text-amber-400 transition-colors text-xs leading-none flex-shrink-0"
            aria-label="Stop"
          >
            <X className='w-4 h-4' />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Navbar ──────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Prologue', path: '/' },
    { name: 'Chapters', path: '/chapters' },
    { name: 'The Cast', path: '/the-cast' },
    { name: 'Scrapbook', path: '/scrapbook' },
    { name: 'Our Notes', path: '/our-notes' },
    { name: 'Last Pages', path: '/last-pages' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'shadow-2xl' : ''}`}
      style={{ borderBottom: 'none' }}
    >
      {/* Dynamic Background (Gradient + Paper Grain) */}
      <div
        className="absolute inset-0 pointer-events-none z-[-2]"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.95) 0%, rgba(5, 5, 5, 0.99) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div
          className="absolute inset-0 w-full h-full mix-blend-overlay"
          style={{
            opacity: 0.15,
            backgroundImage: "url('/textures/paper-grain.png')"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`flex items-center justify-between gap-2 overflow-hidden transition-all duration-500 ${isScrolled ? 'h-15' : 'h-20'}`}>

          {/* Logo — match hero vibe */}
          <div className={`flex-shrink-0 transition-all duration-500 ${isScrolled ? 'scale-90 origin-left' : 'scale-100'}`}>
            <NavLink
              to="/"
              className="group flex items-baseline whitespace-nowrap relative"
            >
              <span className="font-serif text-white/90 text-2xl tracking-tighter drop-shadow-md mr-1.5">MCET</span>
              <span className="font-['Caveat'] text-gradient-animate text-3xl leading-none drop-shadow-lg -rotate-2">Batch '26</span>

              {/* logo glow on hover */}
              <span
                className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 20px rgba(245,158,11,0.25)', pointerEvents: 'none' }}
              />
            </NavLink>
          </div>

          {/* Desktop nav links — premium tracking uppercase */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={{ animationDelay: `${i * 0.07}s`, animationFillMode: 'backwards' }}
                className={({ isActive }) =>
                  `relative px-1 py-2 transition-all duration-300 whitespace-nowrap group font-sans text-xs uppercase tracking-[0.2em] font-semibold ${isActive
                    ? 'text-amber-500'
                    : 'text-white/50 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.name}</span>
                    {/* active amber underline indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-amber-500"
                        style={{ boxShadow: '0 0 8px rgba(245,158,11,0.8)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Desktop mini player — disc visible */}
          <div className="hidden md:block flex-shrink-0">
            <NavMiniPlayer showDisc={true} />
          </div>

          {/* Mobile: mini player (no disc) + hamburger */}
          <div className="md:hidden flex items-center gap-2 min-w-0 shrink">
            <div className="min-w-0 max-w-[38vw] overflow-hidden">
              <NavMiniPlayer showDisc={false} />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-amber-400 focus:outline-none flex-shrink-0 transition-colors duration-200 p-1"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown — animated */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className="md:hidden overflow-hidden relative"
        style={{
          background: 'rgba(10, 8, 5, 0.99)',
          borderBottom: isOpen ? '1px solid rgba(245,158,11,0.15)' : 'none',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.15,
            backgroundImage: "url('/textures/paper-grain.png')"
          }}
        />
        <div className="px-4 pt-4 pb-6 space-y-1 relative z-10 flex flex-col items-center">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-center w-full px-4 py-3 rounded-md font-sans text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-150 ${isActive
                  ? 'text-amber-500 bg-white/5'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </motion.div>

      {/* Torn paper edge hanging downward from the navbar */}
      <PaperTear
        color="rgba(5, 5, 5, 0.99)"
        flip={true}
        strokeColor="rgba(255,255,255,0.05)"
        height="12px"
        dense={!isMobile}
        className="z-[-1]"
      />

    </nav>
  );
};

export default Navbar;

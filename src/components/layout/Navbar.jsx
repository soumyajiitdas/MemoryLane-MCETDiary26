import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Play, Pause, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '../../context/PlayerContext';
import Fireflies from '../ui/Fireflies';
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
        text={currentTrack.title}
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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'shadow-2xl' : ''
        }`}
      style={{ borderBottom: 'none' }}
    >
      {/* Dynamic Background (Gradient + Stardust) */}
      <div
        className="absolute inset-0 pointer-events-none z-[-2]"
        style={{
          background: 'linear-gradient(to bottom, rgba(20, 15, 9, 0.95) 0%, rgba(17, 13, 8, 0.99) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <div
          className="absolute inset-0 w-full h-full mix-blend-overlay"
          style={{
            opacity: 0.12,
            backgroundImage: "url('/textures/stardust.png')"
          }}
        />
      </div>

      {/* Firefly particles — clipping wrapper prevents overflow on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        <Fireflies count={8} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16 gap-2 overflow-hidden">

          {/* Logo — shimmer on hover */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="group text-2xl font-serif font-bold whitespace-nowrap relative inline-block"
            >

              <span className="font-['Caveat']">MCET </span><span className='text-gradient-animate'><span className="font-['Caveat']">Batch</span>'26</span>

              {/* logo glow on hover */}
              <span
                className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: '0 0 20px rgba(245,158,11,0.25)', pointerEvents: 'none' }}
              />
            </NavLink>
          </div>

          {/* Desktop nav links — staggered entrance */}
          <div className="hidden md:flex items-baseline font-serif space-x-1 text-sm font-medium flex-1 justify-center">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.name}
                to={link.path}
                style={{ animationDelay: `${i * 0.07}s`, animationFillMode: 'backwards' }}
                className={({ isActive }) =>
                  `relative px-3 py-2 rounded-md transition-all duration-200 whitespace-nowrap group ${isActive
                    ? 'text-amber-400'
                    : 'text-[var(--color-text-muted)] hover:text-amber-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.name}</span>
                    {/* hover bg */}
                    <span className="absolute inset-0 rounded-md bg-amber-500/0 group-hover:bg-amber-500/8 transition-colors duration-200" />
                    {/* active amber underline indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-400"
                        style={{ boxShadow: '0 0 6px rgba(245,158,11,0.8)' }}
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
            opacity: 0.12,
            backgroundImage: "url('/textures/stardust.png')"
          }}
        />
        <div className="px-3 pt-2 pb-4 space-y-0.5 font-serif relative z-10">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-150 ${isActive
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" style={{ boxShadow: '0 0 4px rgba(245,158,11,0.8)' }} />}
                  {link.name}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </motion.div>

      {/* Torn paper edge hanging downward from the navbar */}
      <PaperTear 
        color="rgba(17, 13, 8, 0.99)" 
        flip={true} 
        strokeColor="rgba(245,158,11,0.35)"
        height="12px"
        dense={!isMobile}
        className="z-[-1]"
      />

    </nav>
  );
};

export default Navbar;

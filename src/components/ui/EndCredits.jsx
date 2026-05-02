import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import { peopleData } from '../../data/cast';
import { galleryData } from '../../data/scrapbook';
import Fireflies from './Fireflies';
import {
  DoodleHeart, DoodleSparkle, DoodleArrow,
  DoodleCrown, DoodleCircle,
} from './VintageDoodles';
import { usePlayer } from '../../context/PlayerContext';
import { noSleep } from '../../utils/noSleep';

const castNames = peopleData.map(p => p.name);
const CREDITS_DUR = 90;
const FILM_DUR = galleryData.length * 3;

// ── Palette ────────────────────────────────────────────────────────────────────
const SERIF = "'Playfair Display', serif";
const HAND = "'Caveat', cursive";
const MONO = "'Courier New', monospace";

const COL = {
  gold: '#e8b84b',
  amber: '#c9922a',
  cream: 'rgba(230,200,150,0.92)',
  muted: 'rgba(210,180,130,0.75)',
  dim: 'rgba(195,165,115,0.55)',
  sepia: 'rgba(180,140,80,0.45)',
};

// ── CSS injected globally ──────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @keyframes credits-roll {
    from { transform: translateY(100vh); }
    to   { transform: translateY(-100%); }
  }
  @keyframes film-roll {
    from { transform: translateY(0); }
    to   { transform: translateY(-50%); }
  }
  @keyframes flicker {
    0%,100% { opacity: 1; }
    4%       { opacity: 0.82; }
    8%       { opacity: 1; }
    30%      { opacity: 0.96; }
    32%      { opacity: 0.78; }
    34%      { opacity: 0.98; }
    70%      { opacity: 0.94; }
    72%      { opacity: 0.80; }
    74%      { opacity: 1; }
  }
  @keyframes grain {
    0%,100% { transform: translate(0,0); }
    10%     { transform: translate(-2%,-1%); }
    20%     { transform: translate(1%,2%); }
    30%     { transform: translate(-1%,1%); }
    40%     { transform: translate(2%,-2%); }
    50%     { transform: translate(-2%,0); }
    60%     { transform: translate(0,2%); }
    70%     { transform: translate(1%,-1%); }
    80%     { transform: translate(-1%,2%); }
    90%     { transform: translate(2%,1%); }
  }
  @keyframes scratch {
    0%,89%,100% { opacity: 0; }
    90%         { opacity: 0.55; left: 18%; }
    91%         { opacity: 0.30; left: 22%; }
    92%         { opacity: 0.45; left: 19%; }
    93%         { opacity: 0; }
  }
  @keyframes scratch2 {
    0%,74%,100% { opacity: 0; }
    75%         { opacity: 0.40; left: 72%; }
    77%         { opacity: 0.25; left: 68%; }
    79%         { opacity: 0; }
  }
  @keyframes burn-in {
    0%   { opacity: 0.7; transform: scale(1.08); filter: brightness(2.5) sepia(1); }
    100% { opacity: 0;   transform: scale(1);    filter: brightness(1) sepia(0); }
  }
  .credits-inner {
    animation: credits-roll ${CREDITS_DUR}s linear forwards;
    will-change: transform;
  }
`;

// ── Type atoms ─────────────────────────────────────────────────────────────────
const BigTitle = ({ c }) => (
  <p style={{
    fontFamily: "'Special Elite', " + MONO,
    fontSize: 'clamp(1.7rem,3.5vw,3rem)',
    color: COL.gold,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    lineHeight: 1.2,
    margin: 0,
    textShadow: '0 0 30px rgba(200,140,30,0.4)',
  }}>{c}</p>
);

const Title = ({ c }) => (
  <p style={{
    fontFamily: "'Special Elite', " + MONO,
    fontSize: 'clamp(1.15rem,2.2vw,1.9rem)',
    color: COL.gold,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    margin: 0,
  }}>{c}</p>
);

const SectionLabel = ({ c }) => (
  <p style={{
    fontFamily: MONO,
    fontSize: 'clamp(0.6rem,1.2vw,0.8rem)',
    color: COL.sepia,
    letterSpacing: '0.5em',
    textTransform: 'uppercase',
    marginBottom: '0.8rem',
    marginTop: 0,
  }}>{c}</p>
);

const Verse = ({ c }) => (
  <p style={{
    fontFamily: HAND,
    fontStyle: 'italic',
    fontSize: 'clamp(1.15rem,2.5vw,1.6rem)',
    color: COL.cream,
    lineHeight: 2,
    margin: '0 auto',
    maxWidth: '22rem',
    textShadow: '0 1px 8px rgba(0,0,0,0.5)',
  }}>{c}</p>
);

const CastName = ({ c }) => (
  <p style={{
    fontFamily: "'Special Elite', " + MONO,
    fontSize: 'clamp(0.85rem,1.6vw,1rem)',
    color: COL.muted,
    letterSpacing: '0.1em',
    lineHeight: 2.5,
    margin: 0,
  }}>{c}</p>
);

const Item = ({ c }) => (
  <p style={{
    fontFamily: MONO,
    fontStyle: 'italic',
    fontSize: 'clamp(0.85rem,1.5vw,1.05rem)',
    color: COL.dim,
    letterSpacing: '0.08em',
    lineHeight: 2.8,
    margin: 0,
  }}>{c}</p>
);

const MedTitle = ({ c }) => (
  <p style={{
    fontFamily: "'Special Elite', " + MONO,
    fontSize: 'clamp(1rem,2vw,1.35rem)',
    color: COL.cream,
    letterSpacing: '0.08em',
    margin: 0,
  }}>{c}</p>
);

// ── Decorative rule ────────────────────────────────────────────────────────────
const Rule = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '2.6rem auto', maxWidth: 80 }}>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right,transparent,rgba(200,140,30,0.3))' }} />
    <div style={{ fontFamily: MONO, fontSize: '0.55rem', color: 'rgba(200,140,30,0.4)', letterSpacing: '0.3em' }}>✦</div>
    <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left,transparent,rgba(200,140,30,0.3))' }} />
  </div>
);

const Gap = ({ h = '3.5rem' }) => <div style={{ height: h }} />;

// ── Sprocket hole ──────────────────────────────────────────────────────────────
const Hole = () => (
  <div style={{
    width: 16, height: 24, borderRadius: 3,
    background: 'rgba(255,255,255,0.88)',
    border: '1px solid rgba(40,30,20,0.7)',
    boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.95)',
    flexShrink: 0,
  }} />
);

// ─── Doodle overlay ─────────────────────────────────────────────────────────
const DoodleLayer = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
    {/* Corners */}
    <DoodleCrown style={{ position: 'absolute', top: '4%', left: '3%', width: 72, height: 72, opacity: 0.16, transform: 'rotate(-18deg)' }} color="rgba(245,158,11,0.9)" />
    <DoodleSparkle style={{ position: 'absolute', top: '8%', right: '4%', width: 62, height: 62, opacity: 0.15, transform: 'rotate(22deg)' }} color="rgba(245,158,11,0.9)" />
    <DoodleCircle style={{ position: 'absolute', bottom: '5%', right: '3%', width: 70, height: 70, opacity: 0.15, transform: 'rotate(-10deg)' }} color="rgba(245,158,11,0.9)" />
    <DoodleArrow style={{ position: 'absolute', bottom: '6%', left: '4%', width: 62, height: 62, opacity: 0.14, transform: 'rotate(35deg)' }} color="rgba(245,158,11,0.9)" />
    {/* Sides — left */}
    <DoodleCircle style={{ position: 'absolute', top: '28%', left: '1.5%', width: 70, height: 70, opacity: 0.14, transform: 'rotate(-5deg)' }} color="rgba(245,158,11,0.9)" />
    <DoodleHeart style={{ position: 'absolute', top: '52%', left: '2%', width: 58, height: 58, opacity: 0.13, transform: 'rotate(14deg)' }} color="rgba(245,158,11,0.9)" />
    <DoodleSparkle style={{ position: 'absolute', top: '74%', left: '3%', width: 60, height: 60, opacity: 0.14, transform: 'rotate(-25deg)' }} color="rgba(245,158,11,0.9)" />
    {/* Sides — right */}
    <DoodleCrown style={{ position: 'absolute', top: '20%', right: '2%', width: 66, height: 66, opacity: 0.13, transform: 'rotate(-8deg)' }} color="rgba(245,158,11,0.9)" />
    <DoodleHeart style={{ position: 'absolute', top: '44%', right: '1.5%', width: 72, height: 72, opacity: 0.13, transform: 'rotate(12deg)' }} color="rgba(245,158,11,0.9)" />
    <DoodleArrow style={{ position: 'absolute', top: '65%', right: '3%', width: 60, height: 60, opacity: 0.14, transform: 'rotate(-40deg)' }} color="rgba(245,158,11,0.9)" />
    <DoodleSparkle style={{ position: 'absolute', top: '38%', left: '48%', width: 48, height: 48, opacity: 0.07, transform: 'rotate(5deg)' }} color="rgba(245,158,11,0.9)" />
  </div>
);


// ── Film strip ─────────────────────────────────────────────────────────────────
const FilmStrip = ({ isPaused }) => {
  const frames = [...galleryData, ...galleryData];
  const filmRef = useRef(null);

  useEffect(() => {
    if (filmRef.current)
      filmRef.current.style.animationPlayState = isPaused ? 'paused' : 'running';
  }, [isPaused]);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: '#0f0a00ff' }}>
      {/* Film grain on strip */}
      <div style={{
        position: 'absolute', inset: '-10%', zIndex: 4, pointerEvents: 'none',
        backgroundImage: "url('/textures/noise.png')",
        backgroundSize: '120px',
        opacity: 0.18,
        animation: 'grain 0.4s steps(1) infinite',
      }} />

      {/* Scrolling strip */}
      <div
        ref={filmRef}
        style={{ animation: `film-roll ${FILM_DUR}s linear infinite`, willChange: 'transform', position: 'relative', zIndex: 1 }}
      >
        {frames.map((photo, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'stretch', background: '#0a0700', borderBottom: '3px solid #050300' }}>
            {/* Left sprockets */}
            <div style={{ width: 38, flexShrink: 0, background: '#0e0b00ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: '12px 0', gap: 7 }}>
              <Hole /><Hole /><Hole /><Hole />
            </div>
            {/* Photo frame */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                width: '100%', aspectRatio: '3/2',
                backgroundImage: `url('${photo.src}')`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'sepia(0.2) contrast(1.1) brightness(0.75) saturate(0.7)',
              }} />
              {/* Scratched film overlay on photo */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: "url('/textures/noise-lines.png')",
                backgroundSize: '200px',
                opacity: 0.08, mixBlendMode: 'screen',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(8, 5, 0, 0.92) 0%, transparent 100%)',
                padding: '18px 8px 6px',
              }}>
                <p style={{ fontFamily: MONO, fontSize: '1rem', color: 'rgba(220,160,20,0.9)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {photo.caption}
                </p>
                <p style={{ fontFamily: MONO, fontSize: '0.9rem', color: 'rgba(200,140,20,0.45)', margin: '2px 0 0', letterSpacing: '0.2em' }}>
                  {String((i % galleryData.length) + 1).padStart(2, '0')} / {galleryData.length} ▲ {photo.year}
                </p>
              </div>
            </div>
            {/* Right sprockets */}
            <div style={{ width: 38, flexShrink: 0, background: '#0e0b00ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', padding: '12px 0', gap: 7 }}>
              <Hole /><Hole /><Hole /><Hole />
            </div>
          </div>
        ))}
      </div>

      {/* Fade top/bottom */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20%', background: 'linear-gradient(to bottom,#060400,transparent)', zIndex: 3, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%', background: 'linear-gradient(to top,#060400,transparent)', zIndex: 3, pointerEvents: 'none' }} />
    </div>
  );
};

// ── Film grain overlay (whole screen) ─────────────────────────────────────────
const GrainOverlay = () => (
  <div aria-hidden="true" style={{
    position: 'absolute', inset: '-10%',
    zIndex: 12, pointerEvents: 'none',
    backgroundImage: "url('/textures/noise.png')",
    backgroundSize: '180px',
    opacity: 0.09,
    animation: 'grain 0.35s steps(1) infinite',
  }} />
);

// ── Projector scratch lines ────────────────────────────────────────────────────
const ScratchLines = () => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 11, pointerEvents: 'none', overflow: 'hidden' }}>
    <div style={{
      position: 'absolute', top: 0, bottom: 0, width: 1,
      background: 'linear-gradient(to bottom,transparent,rgba(255,245,210,0.6),transparent)',
      animation: 'scratch 7s linear infinite',
    }} />
    <div style={{
      position: 'absolute', top: 0, bottom: 0, width: 1,
      background: 'linear-gradient(to bottom,transparent,rgba(255,245,210,0.4),transparent)',
      animation: 'scratch2 11s linear infinite',
    }} />
  </div>
);

// ── Projector burn vignette ────────────────────────────────────────────────────
const BurnVignette = () => (
  <div aria-hidden="true" style={{
    position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
    background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(4,2,0,0.72) 100%)',
  }} />
);

// ── Credits content ────────────────────────────────────────────────────────────
const CreditsInner = ({ rollRef, onEnd }) => (
  <div
    ref={rollRef}
    className="credits-inner"
    onAnimationEnd={onEnd}
    style={{ width: '100%', textAlign: 'center', padding: '0 clamp(1.2rem,4vw,3rem)', position: 'relative', zIndex: 1 }}
  >
    <Gap h="22vh" />
    <BigTitle c="MCET Batch '26" />
    <Gap h="2rem" />
    <Verse c="A few years," />
    <Verse c="a thousand ordinary days," />
    <Verse c="that somehow meant everything..." />
    <Rule />
    <SectionLabel c="Batch of 2022–'26" />
    <MedTitle c="Murshidabad College of Engineering & Technology" />
    <Rule />
    <SectionLabel c="The Cast" />
    <Gap h="0.4rem" />
    {castNames.map((n, i) => <CastName key={i} c={n} />)}
    <Rule />
    <Verse c="We never really noticed it happening" />
    <Verse c="it was just another day" />
    <Verse c="until it wasn't..." />
    <Rule />
    <SectionLabel c="Memories Across" />
    {['Classrooms', 'Playground', 'Corridors', 'Labs', 'Last benches'].map(x => <Item key={x} c={x} />)}
    <Rule />
    <SectionLabel c="Captured In" />
    {['Late nights', 'Chai - adda', 'Unplanned outings', 'College Events', 'Meetups', 'Trips'].map(x => <Item key={x} c={x} />)}
    <Rule />
    <Verse c="No one told us" />
    <Verse c="which day would be the last" />
    <Verse c="so we lived them all" />
    <Verse c="like there would be more..." />
    <Rule />
    <SectionLabel c="Collected As" />
    {['Photos', 'Notes', 'Fragments', 'Memories'].map(x => <Item key={x} c={x} />)}
    <Rule />
    <SectionLabel c="Put Together By" />
    <MedTitle c="Someone from within" />
    <Gap h="0.5rem" />
    <Verse c="who didn't want to forget..." />
    <Rule />
    <Verse c="It didn't feel like much back then" />
    <Verse c="just days passing" />
    <Verse c="but now they feel like everything :)" />
    <Rule />
    <Verse c="This isn't the end" />
    <Verse c="just the last page of this part..." />
    <Rule />
    <Verse c="Guess this is goodbye... Take Care" />
    <Gap h="1rem" />
    <Title c="Thanks for Everything..." />
    <Gap h="1rem" />
    <Verse c="...I love you 3000 ♡" />
    <Gap h="18vh" />
  </div>
);

// ── End card ───────────────────────────────────────────────────────────────────
const EndCard = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    transition={{ duration: 1.8 }}
    style={{
      position: 'absolute', inset: 0, zIndex: 20,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.2rem',
      padding: '0 1.5rem', textAlign: 'center'
    }}
  >
    {/* Film grain on end card too */}
    <div style={{
      position: 'absolute', inset: '-10%', pointerEvents: 'none',
      backgroundImage: "url('/textures/noise.png')",
      backgroundSize: '180px', opacity: 0.1,
      animation: 'grain 0.35s steps(1) infinite',
    }} />
    <BurnVignette />

    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 1.4 }}
      style={{ width: 60, height: 1, background: 'linear-gradient(to right,transparent,rgba(200,140,30,0.5),transparent)' }} />

    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.2 }}
      style={{ fontFamily: MONO, fontSize: 'clamp(0.55rem,2vw,0.9rem)', color: 'rgba(180,130,30,0.5)', letterSpacing: '0.4em', textTransform: 'uppercase', margin: 0 }}>
      Classes of 2022–'26
    </motion.p>

    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1.3 }}
      style={{ fontFamily: "'Special Elite', " + MONO, fontSize: 'clamp(1.8rem,7vw,4.5rem)', color: COL.gold, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0, textShadow: '0 0 40px rgba(200,140,20,0.35)', lineHeight: 1.2 }}>
      MCET Diary '26
    </motion.p>

    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 1.4 }}
      style={{ width: 60, height: 1, background: 'linear-gradient(to right,transparent,rgba(200,140,30,0.5),transparent)' }} />

    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1.4 }}
      style={{ fontFamily: HAND, fontStyle: 'italic', fontSize: 'clamp(1.1rem,4vw,1.8rem)', color: 'rgba(200,170,110,0.38)', letterSpacing: '0.1em', margin: 0 }}>
      A few days, a lifetime's weight... :)
    </motion.p>

    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ delay: 2.8, duration: 1.5 }}
      style={{ fontFamily: MONO, fontSize: '0.75rem', color: 'rgba(180,140,60,0.6)', letterSpacing: '0.4em', textTransform: 'uppercase', margin: '1rem 0 0' }}>
      — fin —
    </motion.p>
  </motion.div>
);

// ── Icon button style ──────────────────────────────────────────────────────────
const iconBtn = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: 34, height: 34, borderRadius: '50%',
  background: 'rgba(200,140,30,0.06)', border: '1px solid rgba(200,140,30,0.18)',
  color: 'rgba(200,140,30,0.55)', cursor: 'pointer', transition: 'all 0.25s',
};
const hI = e => { e.currentTarget.style.background = 'rgba(200,140,30,0.16)'; e.currentTarget.style.color = 'rgba(220,165,40,0.95)'; };
const hO = e => { e.currentTarget.style.background = 'rgba(200,140,30,0.06)'; e.currentTarget.style.color = 'rgba(200,140,30,0.55)'; };

// ── Main component ─────────────────────────────────────────────────────────────
const EndCredits = ({ isOpen, onClose }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [showEndCard, setShowEndCard] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  const rollRef = useRef(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  const { isPlaying, playTrack, fadeOutStop, activeTrack } = usePlayer();
  const [startedByCredits, setStartedByCredits] = useState(false);
  const hasCheckedAutoPlay = useRef(false);
  const wakeLockRef = useRef(null);

  // Keep screen awake while credits are playing
  useEffect(() => {
    // 1. NoSleep.js disable fallback (enable is triggered synchronously in LastPages.jsx)
    if (!isOpen) {
      noSleep.disable();
    }

    // 2. Native WakeLock API for modern devices
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator && isOpen && document.visibilityState === 'visible') {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
        }
      } catch (err) {
        // Silently ignore failures
      }
    };

    const handleVisibilityChange = () => {
      if (isOpen && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    if (isOpen) {
      requestWakeLock();
      document.addEventListener('visibilitychange', handleVisibilityChange);
    } else {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      noSleep.disable();
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isOpen]);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (isOpen && !hasCheckedAutoPlay.current) {
      hasCheckedAutoPlay.current = true;
      const t = setTimeout(() => { if (!isPlaying) { playTrack(1); setStartedByCredits(true); } }, 300);  // Currently set track 1 (2nd one)
      return () => clearTimeout(t);
    }
    if (!isOpen) hasCheckedAutoPlay.current = false;
  }, [isOpen, isPlaying, playTrack]);

  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    Object.assign(document.body.style, { position: 'fixed', top: `-${scrollY}px`, left: '0', right: '0', overflow: 'hidden' });
    return () => {
      Object.assign(document.body.style, { position: '', top: '', left: '', right: '', overflow: '' });
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsPaused(false); setShowEndCard(false);
      if (rollRef.current) rollRef.current.style.animationPlayState = 'running';
      if (startedByCredits) { fadeOutStop(1800); setStartedByCredits(false); }
    }
  }, [isOpen, startedByCredits, fadeOutStop]);

  useEffect(() => {
    if (!showEndCard) return;
    const t = setTimeout(() => onCloseRef.current(), 6000);
    return () => clearTimeout(t);
  }, [showEndCard]);

  const togglePause = () => {
    const next = !isPaused;
    setIsPaused(next);
    if (rollRef.current) rollRef.current.style.animationPlayState = next ? 'paused' : 'running';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="end-credits"
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10015, overflow: 'hidden',
            backgroundColor: '#0b0800ff',
          }}
        >
          <style>{GLOBAL_CSS}</style>

          {/* Aged paper texture */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/textures/aged-paper.png')", backgroundSize: '600px', opacity: 0.20, zIndex: 0, pointerEvents: 'none' }} />

          {/* Flicker overlay — only dims content, base stays solid */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,2,0,0.18)', zIndex: 0, pointerEvents: 'none', animation: 'flicker 8s ease-in-out infinite' }} />

          {/* Vintage effects */}
          <GrainOverlay />
          <ScratchLines />
          <BurnVignette />
          <Fireflies count={15} />

          {/* Controls */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}
            style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.4rem', zIndex: 25 }}
          >
            <button onClick={() => playTrack(activeTrack ?? 0)} style={iconBtn} onMouseEnter={hI} onMouseLeave={hO}>
              {!isPlaying ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
            <button onClick={togglePause} style={iconBtn} onMouseEnter={hI} onMouseLeave={hO}>
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
            </button>
            <button onClick={onClose}
              style={{ ...iconBtn, borderColor: 'rgba(180,60,40,0.25)', color: 'rgba(210,80,60,0.5)' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(180,60,40,0.16)'; e.currentTarget.style.color = 'rgba(220,90,70,0.9)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,140,30,0.06)'; e.currentTarget.style.color = 'rgba(210,80,60,0.5)'; }}
            ><X size={13} /></button>
          </motion.div>

          {/* Layout */}
          {isDesktop ? (
            <div style={{ display: 'flex', width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '45%', height: '100%', flexShrink: 0, position: 'relative' }}>
                <FilmStrip isPaused={isPaused} />
              </div>
              <div style={{ width: '55%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 50, background: 'linear-gradient(to right,rgba(4,2,0,0.7),transparent)', zIndex: 2, pointerEvents: 'none' }} />
                {/* Doodles */}
                <DoodleLayer />
                <CreditsInner rollRef={rollRef} onEnd={() => setShowEndCard(true)} />
                <AnimatePresence>{showEndCard && <EndCard onClose={onClose} />}</AnimatePresence>
              </div>
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
              {/* Doodles */}
              <DoodleLayer />
              <CreditsInner rollRef={rollRef} onEnd={() => setShowEndCard(true)} />
              <AnimatePresence>{showEndCard && <EndCard onClose={onClose} />}</AnimatePresence>
            </div>
          )}

          {/* Top/bottom vignettes */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '12vh', zIndex: 8, pointerEvents: 'none', background: 'linear-gradient(to bottom,#060400,transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '14vh', zIndex: 8, pointerEvents: 'none', background: 'linear-gradient(to top,#060400,transparent)' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EndCredits;

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import { peopleData } from '../../data/cast';
import {
  DoodleHeart, DoodleSparkle, DoodleArrow,
  DoodleCrown, DoodleCircle,
} from './VintageDoodles';
import { usePlayer } from '../../context/PlayerContext';

const castNames = peopleData.map(p => p.name);
const DURATION  = 80;
const BG        = '#0d0904';

// ─── Design tokens ────────────────────────────────────────────────────────────
const SERIF = "'Playfair Display', serif";
const HAND  = "'Caveat', cursive";
const COL = {
  gold:   '#f0b840',
  cream:  'rgba(225, 185, 111, 0.9)',
  muted:  'rgba(215,190,148,0.78)',
  dim:    'rgba(215,190,148,0.55)',
  label:  'rgba(240,165,40,0.65)',
  verse:  'rgba(232,210,168,0.82)',
};

// ─── Type atoms (slightly larger than before) ─────────────────────────────────
const BigTitle = ({ children }) => (
  <p style={{
    fontFamily: SERIF, fontWeight: 300, textTransform: 'uppercase',
    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
    color: COL.gold, letterSpacing: '0.1em', lineHeight: 1.15,
  }}>{children}</p>
);

const Title = ({ children }) => (
  <p style={{
    fontFamily: SERIF, fontWeight: 300, textTransform: 'uppercase',
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    color: COL.gold, letterSpacing: '0.1em', lineHeight: 1,
  }}>{children}</p>
);

const SectionLabel = ({ children }) => (
  <p style={{
    fontFamily: SERIF, fontWeight: 400, textTransform: 'uppercase',
    fontSize: 'clamp(0.72rem, 2vw, 0.85rem)',
    color: COL.label, letterSpacing: '0.38em', marginBottom: '1.2rem',
  }}>{children}</p>
);

const Verse = ({ children }) => (
  <p style={{
    fontFamily: HAND, fontStyle: 'italic',
    fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)',
    color: COL.verse, lineHeight: 1.9, maxWidth: '28rem', margin: '0 auto',
  }}>{children}</p>
);

const CastName = ({ children }) => (
  <p style={{
    fontFamily: SERIF, fontWeight: 400,
    fontSize: 'clamp(0.95rem, 2.4vw, 1.15rem)',
    color: COL.muted, letterSpacing: '0.09em', lineHeight: 2.4,
  }}>{children}</p>
);

const Item = ({ children }) => (
  <p style={{
    fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    color: COL.dim, letterSpacing: '0.06em', lineHeight: 2.6,
  }}>{children}</p>
);

const MedTitle = ({ children }) => (
  <p style={{
    fontFamily: SERIF, fontWeight: 600,
    fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)',
    color: COL.cream, letterSpacing: '0.07em',
  }}>{children}</p>
);

const Rule = () => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'0.7rem', margin:'4rem auto', maxWidth:100 }}>
    <div style={{ flex:1, height:1, background:'linear-gradient(to right,transparent,rgba(240,165,40,0.22))' }} />
    <div style={{ width:3, height:3, borderRadius:'50%', background:'rgba(240,165,40,0.4)' }} />
    <div style={{ flex:1, height:1, background:'linear-gradient(to left,transparent,rgba(240,165,40,0.22))' }} />
  </div>
);

const Gap = ({ h = '4rem' }) => <div style={{ height: h }} />;

// ─── Icon button ──────────────────────────────────────────────────────────────
const iconBtn = {
  display:'inline-flex', alignItems:'center', justifyContent:'center',
  width:34, height:34, borderRadius:'50%',
  background:'rgba(240,165,40,0.08)',
  border:'1px solid rgba(240,165,40,0.22)',
  color:'rgba(240,165,40,0.65)', cursor:'pointer', transition:'all 0.2s',
};

// ─── Doodle overlay ─────────────────────────────────────────────────────────
const DoodleLayer = () => (
  <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
    {/* Corners */}
    <DoodleHeart   style={{ position:'absolute', top:'4%',   left:'3%',    width:72,  height:72,  opacity:0.16, transform:'rotate(-18deg)' }} color="rgba(245,158,11,0.9)" />
    <DoodleSparkle style={{ position:'absolute', top:'8%',   right:'4%',   width:62,  height:62,  opacity:0.15, transform:'rotate(22deg)'  }} color="rgba(245,158,11,0.9)" />
    <DoodleCrown   style={{ position:'absolute', bottom:'5%',right:'3%',   width:70,  height:70,  opacity:0.15, transform:'rotate(-10deg)' }} color="rgba(245,158,11,0.9)" />
    <DoodleArrow   style={{ position:'absolute', bottom:'6%',left:'4%',    width:62,  height:62,  opacity:0.14, transform:'rotate(35deg)'  }} color="rgba(245,158,11,0.9)" />
    {/* Sides — left */}
    <DoodleCircle  style={{ position:'absolute', top:'28%',  left:'1.5%',  width:70,  height:70,  opacity:0.14, transform:'rotate(-5deg)'  }} color="rgba(245,158,11,0.9)" />
    <DoodleHeart   style={{ position:'absolute', top:'52%',  left:'2%',    width:58,  height:58,  opacity:0.13, transform:'rotate(14deg)'  }} color="rgba(245,158,11,0.9)" />
    <DoodleSparkle style={{ position:'absolute', top:'74%',  left:'3%',    width:60,  height:60,  opacity:0.14, transform:'rotate(-25deg)' }} color="rgba(245,158,11,0.9)" />
    {/* Sides — right */}
    <DoodleCrown   style={{ position:'absolute', top:'20%',  right:'2%',   width:66,  height:66,  opacity:0.13, transform:'rotate(-8deg)'  }} color="rgba(245,158,11,0.9)" />
    <DoodleCircle  style={{ position:'absolute', top:'44%',  right:'1.5%', width:72,  height:72,  opacity:0.13, transform:'rotate(12deg)'  }} color="rgba(245,158,11,0.9)" />
    <DoodleArrow   style={{ position:'absolute', top:'65%',  right:'3%',   width:60,  height:60,  opacity:0.14, transform:'rotate(-40deg)' }} color="rgba(245,158,11,0.9)" />
    {/* Centre accent — very subtle */}
    <DoodleSparkle style={{ position:'absolute', top:'38%',  left:'48%',   width:48,  height:48,  opacity:0.07, transform:'rotate(5deg)'   }} color="rgba(245,158,11,0.9)" />
  </div>
);

const EndCredits = ({ isOpen, onClose }) => {
  const [isPaused,    setIsPaused]    = useState(false);
  const [showEndCard, setShowEndCard] = useState(false);
  const rollRef = useRef(null);

  const { isPlaying, playTrack, fadeOutStop, activeTrack } = usePlayer();
  const [startedByCredits, setStartedByCredits] = useState(false);

  const hasCheckedAutoPlay = useRef(false);

  // Play background song if not already playing (only trigger once per open)
  useEffect(() => {
    if (isOpen && !hasCheckedAutoPlay.current) {
      hasCheckedAutoPlay.current = true;
      // Small timeout to ensure context is ready and UI has started rendering
      const t = setTimeout(() => {
        if (!isPlaying) {
          playTrack(0);      // set song to play, 0 = first, 1 = second and so on...
          setStartedByCredits(true);
        }
      }, 300);
      return () => clearTimeout(t);
    }
    
    if (!isOpen) {
      hasCheckedAutoPlay.current = false;
    }
  }, [isOpen, isPlaying, playTrack]);

  // ── Scroll lock — works on iOS Safari, Android Chrome, and desktop ──────────
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;

    // Freeze the page at current scroll position
    document.body.style.position   = 'fixed';
    document.body.style.top        = `-${scrollY}px`;
    document.body.style.left       = '0';
    document.body.style.right      = '0';
    document.body.style.overflow   = 'hidden';

    return () => {
      // Restore position and scroll back to where the user was
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.left     = '';
      document.body.style.right    = '';
      document.body.style.overflow = '';
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };
  }, [isOpen]);

  // Reset on close + Handle Fade Out
  useEffect(() => {
    if (!isOpen) {
      setIsPaused(false);
      setShowEndCard(false);
      if (rollRef.current) rollRef.current.style.animationPlayState = 'running';

      // Fade out if we started it
      if (startedByCredits) {
        fadeOutStop(2500);
        setStartedByCredits(false);
      }
    }
  }, [isOpen, startedByCredits, fadeOutStop]);

  // Auto-close 5 s after end card appears
  useEffect(() => {
    if (!showEndCard) return;
    const t = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(t);
  }, [showEndCard, onClose]);

  const togglePause = () => {
    const next = !isPaused;
    setIsPaused(next);
    if (rollRef.current)
      rollRef.current.style.animationPlayState = next ? 'paused' : 'running';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="end-credits"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // ── Faster fade-in (was 2s, now 0.9s) ──
          transition={{ duration: 0.9 }}
          style={{
            position:'fixed', inset:0, zIndex:10015, overflow:'hidden',
            // ── Site-themed warm dark bg (amber-brown, not pure black) ──
            backgroundColor: BG,
            background: `
              radial-gradient(ellipse 70% 55% at 50% 38%,
                rgba(40,20,4,0.95) 0%,
                rgba(18,11,4,0.98) 45%,
                ${BG} 100%)
            `,
          }}
        >
          <style>{`
            @keyframes credits-roll {
              from { transform: translateY(100vh); }
              to   { transform: translateY(-100%); }
            }
            .credits-inner { animation: credits-roll ${DURATION}s linear forwards; will-change: transform; }
          `}</style>

          {/* Paper-texture overlay — matches site's parchment feel */}
          <div aria-hidden="true" style={{
            position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
            opacity: 0.025,
            backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />

          {/* Warm amber radial halo at centre */}
          <div aria-hidden="true" style={{
            position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
            background:'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(100,50,5,0.20) 0%, transparent 70%)',
          }} />

          {/* Doodles */}
          <DoodleLayer />

          {/* Controls — icon-only, top-right */}
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }}
            transition={{ delay:0.8, duration:0.5 }}
            style={{ position:'absolute', top:'1.1rem', right:'1.1rem', display:'flex', gap:'0.4rem', zIndex:10 }}
          >
            <button onClick={() => playTrack(activeTrack !== null ? activeTrack : 0)} style={iconBtn} aria-label={!isPlaying ? 'Unmute' : 'Mute'}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(240,165,40,0.16)'; e.currentTarget.style.color='rgba(240,165,40,0.95)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(240,165,40,0.08)'; e.currentTarget.style.color='rgba(240,165,40,0.65)'; }}
            >{!isPlaying ? <VolumeX size={13}/> : <Volume2 size={13}/>}</button>
            <button onClick={togglePause} style={iconBtn} aria-label={isPaused ? 'Resume' : 'Pause'}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(240,165,40,0.16)'; e.currentTarget.style.color='rgba(240,165,40,0.95)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(240,165,40,0.08)'; e.currentTarget.style.color='rgba(240,165,40,0.65)'; }}
            >{isPaused ? <Play size={13}/> : <Pause size={13}/>}</button>
            <button onClick={onClose} aria-label="Exit"
              style={{ ...iconBtn, borderColor:'rgba(200,75,55,0.25)', color:'rgba(220,95,75,0.58)' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(200,75,55,0.15)'; e.currentTarget.style.color='rgba(220,95,75,0.95)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(240,165,40,0.08)'; e.currentTarget.style.color='rgba(220,95,75,0.58)'; }}
            ><X size={13}/></button>
          </motion.div>

          {/* ── Rolling credits ── */}
          <div
            ref={rollRef}
            className="credits-inner"
            onAnimationEnd={() => setShowEndCard(true)}
            style={{ width:'100%', textAlign:'center', padding:'0 clamp(1rem,5vw,3rem)', position:'relative', zIndex:1 }}
          >
            <Gap h="22vh" />

            <BigTitle>MCET Batch '26</BigTitle>
            <Gap h="2.5rem" />
            <Verse>A few years,</Verse>
            <Verse>a thousand ordinary days,</Verse>
            <Verse>that somehow meant everything...</Verse>
            <Rule />

            <SectionLabel>Batch of 2022–'26</SectionLabel>
            <MedTitle>Murshidabad College of Engineering & Technology</MedTitle>
            <Rule />

            <SectionLabel>The Cast</SectionLabel>
            <Gap h="0.5rem" />
            {castNames.map((n, i) => <CastName key={i}>{n}</CastName>)}
            <Rule />

            <Verse>We never really noticed it happening</Verse>
            <Verse>it was just another day</Verse>
            <Verse>until it wasn't...</Verse>
            <Rule />

            <SectionLabel>Memories across</SectionLabel>
            {['Classrooms','Playground','Corridors','Labs','Last benches'].map(x=><Item key={x}>{x}</Item>)}
            <Rule />

            <SectionLabel>Captured in</SectionLabel>
            {['Late nights','Chai - adda','Unplanned outings','College Events', 'Meetups', 'Trips'].map(x=><Item key={x}>{x}</Item>)}
            <Rule />

            <Verse>No one told us</Verse>
            <Verse>which day would be the last</Verse>
            <Verse>so we lived them all</Verse>
            <Verse>like there would be more...</Verse>
            <Rule />

            <SectionLabel>Collected as</SectionLabel>
            {['Photos','Notes','Fragments','Memories'].map(x=><Item key={x}>{x}</Item>)}
            <Rule />

            <SectionLabel>Put together by</SectionLabel>
            <MedTitle>Someone from within</MedTitle>
            <Gap h="0.6rem" />
            <Verse>(who didn’t want to forget)</Verse>
            <Rule />

            <Verse>It didn't feel like much back then</Verse>
            <Verse>just days passing</Verse>
            <Verse>but now they feel like everything :)</Verse>
            <Rule />

            <Verse>This isn't the end</Verse>
            <Verse>just the last page of this part...</Verse>
            <Rule />

            <Verse>Guess this is goodbye...Take Care</Verse>
            <Gap h="1rem" />
            <Title>Thanks for Everything</Title>
            <Gap h="1rem" />
            <Verse>...I love you 3000 ♡</Verse>

            <Gap h="18vh" />
          </div>

          {/* ── End card ── */}
          <AnimatePresence>
            {showEndCard && (
              <motion.div
                initial={{ y:'100vh' }} animate={{ y:0 }}
                transition={{ duration:2, ease:[0.16,1,0.3,1] }}
                style={{
                  position:'absolute', inset:0, zIndex:2,
                  display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center', gap:'1rem',
                  background:`rgba(13,9,4,0.92)`,
                  backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
                }}
              >
                {/* Doodles on end card too */}
                <DoodleHeart  style={{ position:'absolute', top:'15%', left:'8%',  width:55, height:55, opacity:0.10, transform:'rotate(-12deg)' }} color="rgba(245,158,11,0.9)" />
                <DoodleSparkle style={{ position:'absolute', top:'18%', right:'8%', width:50, height:50, opacity:0.09, transform:'rotate(18deg)' }}  color="rgba(245,158,11,0.9)" />
                <DoodleCrown  style={{ position:'absolute', bottom:'18%', left:'6%', width:55, height:55, opacity:0.09, transform:'rotate(-6deg)' }}  color="rgba(245,158,11,0.9)" />
                <DoodleCircle style={{ position:'absolute', bottom:'15%', right:'6%', width:60, height:60, opacity:0.08, transform:'rotate(8deg)' }} color="rgba(245,158,11,0.9)" />

                <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.8, duration:1.2 }}
                  style={{ width:44, height:1, background:'linear-gradient(to right,transparent,rgba(240,165,40,0.55),transparent)' }} />
                <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5, duration:0.9 }}
                  style={{ fontFamily:SERIF, fontSize:'0.65rem', color:'rgba(240,165,40,0.48)', letterSpacing:'0.42em', textTransform:'uppercase' }}
                >Classes of 2022-'26</motion.p>
                <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7, duration:1 }}
                  style={{ fontFamily:SERIF, fontSize:'clamp(1.8rem,6vw,3.2rem)', fontWeight:400, color:COL.gold, letterSpacing:'0.12em', textTransform:'uppercase' }}
                >MCET Diary '26</motion.p>
                <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:1.2, duration:1.2 }}
                  style={{ width:44, height:1, background:'linear-gradient(to right,transparent,rgba(240,165,40,0.55),transparent)' }} />
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5, duration:1 }}
                  style={{ fontFamily:HAND, fontSize:'1.2rem', color:'rgba(210,185,145,0.38)', letterSpacing:'0.22em' }}
                >A few days, a lifetimes weight...</motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edge vignettes — warm brown tone */}
          <div aria-hidden="true" style={{
            position:'absolute', top:0, left:0, right:0, height:'16vh', zIndex:3, pointerEvents:'none',
            background:`linear-gradient(to bottom, ${BG} 20%, transparent)`,
          }} />
          <div aria-hidden="true" style={{
            position:'absolute', bottom:0, left:0, right:0, height:'20vh', zIndex:3, pointerEvents:'none',
            background:`linear-gradient(to top, ${BG} 28%, transparent)`,
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EndCredits;

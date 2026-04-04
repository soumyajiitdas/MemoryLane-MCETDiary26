import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer, TRACKLIST } from '../../context/PlayerContext';
import { Play } from 'lucide-react';

// ── Sub-components ─────────────────────────────────────────────────────────────

const VinylGrooves = () => (
  <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
    {Array.from({ length: 22 }, (_, i) => (
      <circle key={i} cx="200" cy="200" r={165 - i * 6} fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="0.8" />
    ))}
    <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    <circle cx="200" cy="200" r="78" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
  </svg>
);

const VinylLabel = ({ trackTitle, playing }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div
      className="w-[38%] h-[38%] rounded-full flex flex-col items-center justify-center text-center shadow-inner"
      style={{
        background: 'radial-gradient(circle at 35% 35%, #c8934a, #7c481f)',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6), 0 0 0 2px rgba(255,200,100,0.2)',
      }}
    >
      <p className="font-['Playfair_Display'] text-amber-100 text-[0.4rem] tracking-[0.15em] uppercase mb-0.5 opacity-80 px-1">
        {playing && trackTitle ? trackTitle : 'MCET · Batch'}
      </p>
      <p className="font-['Caveat'] text-amber-200 text-sm font-bold leading-none">2022–'26</p>
      <p className="text-amber-300/70 text-[0.36rem] tracking-wider mt-0.5 uppercase">The Memory Tape</p>
      <div className="w-2 h-2 rounded-full mt-1" style={{ background: '#0d0b09', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.9)' }} />
    </div>
  </div>
);

const ToneArm = ({ playing }) => (
  <motion.div
    className="absolute z-20 origin-top-right"
    style={{ top: '-6%', right: '4%', width: '35%', height: '55%' }}
    animate={{ rotate: playing ? 20 : 0 }}
    transition={{ type: 'spring', stiffness: 60, damping: 14 }}
  >
    <svg viewBox="0 0 120 200" className="w-full h-full drop-shadow-lg" aria-hidden="true">
      <circle cx="100" cy="10" r="10" fill="#2a2520" stroke="#5a4f3f" strokeWidth="1.5" />
      <circle cx="100" cy="10" r="4"  fill="#b8943f" />
      <line x1="100" y1="10" x2="30" y2="180" stroke="#3d3530" strokeWidth="5" strokeLinecap="round" />
      <line x1="100" y1="10" x2="30" y2="180" stroke="#5a4f3f" strokeWidth="2" strokeLinecap="round" />
      <rect x="24" y="175" width="14" height="6" rx="2" fill="#8b7355" />
      <rect x="29" y="181" width="4"  height="8" rx="1" fill="#c8a96e" />
      <circle cx="31" cy="189" r="2" fill="#fcd34d" opacity="0.9" />
    </svg>
  </motion.div>
);

const TrackRow = ({ track, title, feat, duration, index, revealed, isActive, isPlaying, onPlay }) => (
  <motion.button
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.06, duration: 0.35, ease: 'easeOut' }}
    onClick={() => onPlay(index)}
    className={`group w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-left transition-colors ${
      isActive ? 'bg-amber-500/15' : 'hover:bg-amber-500/8'
    }`}
    disabled={!revealed}
  >
    <span className="w-5 shrink-0 flex items-center justify-center">
      {isActive && isPlaying ? (
        <span className="flex gap-[2px] items-end h-3.5">
          {[1, 1.5, 0.8, 1.4].map((h, i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded-full bg-amber-400 block"
              animate={{ scaleY: [h * 0.4, h, h * 0.4] }}
              transition={{ repeat: Infinity, duration: 0.5 + i * 0.12, ease: 'easeInOut' }}
              style={{ height: '100%', originY: 1 }}
            />
          ))}
        </span>
      ) : isActive ? (
        <Play className='w-5 h-5 text-amber-700'/>
      ) : (
        <span className="text-amber-600/50 font-mono text-xs">{track}</span>
      )}
    </span>

    <div className="flex-1 min-w-0">
      <p className={`font-['Playfair_Display'] text-sm font-semibold truncate transition-colors ${
        isActive ? 'text-amber-300' : 'text-amber-100 group-hover:text-amber-300'
      }`}>
        {title}
      </p>
      <p className="text-amber-500/60 text-xs truncate">{feat}</p>
    </div>

    <span className="text-amber-600/50 font-mono text-xs shrink-0">{duration}</span>

    {!isActive && (
      <span className="text-amber-400/0 group-hover:text-amber-400/70 transition-colors text-xs">▶</span>
    )}
  </motion.button>
);

// ── Main Component (pure UI — audio lives in PlayerContext) ───────────────────
const BatchSoundtrack = () => {
  const { activeTrack, isPlaying, isResetting, revealed, currentTrack, playTrack, toggleVinyl } = usePlayer();
  const [isHovered, setIsHovered] = useState(false);

  // CSS animation-play-state: 'running' only when audio is truly playing AND not resetting
  const discPlayState   = (isPlaying && !isResetting) ? 'running' : 'paused';
  const headerPlayState = (isPlaying && !isResetting) ? 'running' : 'paused';

  return (
    <section className="py-14 relative z-10 overflow-hidden" id="batch-soundtrack">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(120,60,10,0.4) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-[95%] sm:max-w-5xl mx-auto px-4 sm:px-12 py-14 sm:py-16 border bg-amber-600/10 border-amber-500/30 rounded-xl sm:rounded-2xl shadow-md">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-amber-500/60 font-['Caveat'] tracking-[0.10em] text-2xl mb-3">
            If our time had a playlist, this would be it...
          </p>
        </motion.div>

        {/* Side-by-side layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16"
        >

          {/* ── Vinyl + Turntable ── */}
          <div
            className="relative flex-shrink-0"
            style={{
              width:  'clamp(190px, 55vw, 320px)',
              height: 'clamp(190px, 55vw, 320px)',
            }}
          >
            <ToneArm playing={isPlaying} />

            {/* Turntable base */}
            <div
              className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 z-0"
              style={{
                width: '108%', height: '36px',
                background: 'linear-gradient(180deg, #2a2017 0%, #1a1208 100%)',
                borderRadius: '6px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,200,100,0.08)',
                border: '1px solid rgba(100,70,20,0.4)',
              }}
            />
            {/* Platter */}
            <div
              className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 z-[1]"
              style={{
                width: '90%', height: '14px',
                background: 'linear-gradient(180deg, #3a2f1c 0%, #241c0d 100%)',
                borderRadius: '50%',
                boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
              }}
            />

            {/* Vinyl disc — wind-down animation on reset, CSS spin when playing */}
            <div
              key={isResetting ? 'resetting' : 'playing'}
              className={isResetting ? 'vinyl-winddown' : 'vinyl-spinning'}
              style={{
                position: 'absolute', inset: 0, zIndex: 10,
                borderRadius: '9999px',
                cursor: 'pointer', userSelect: 'none',
                background: 'radial-gradient(circle at 40% 35%, #2e2822, #100d08 65%)',
                boxShadow: isPlaying
                  ? '0 0 55px 10px rgba(200,140,50,0.22), 0 20px 60px rgba(0,0,0,0.7)'
                  : '0 20px 60px rgba(0,0,0,0.7)',
                transition: 'box-shadow 0.6s ease',
                ...(isResetting ? {} : {
                  animationDuration: '2.5s',
                  animationPlayState: discPlayState,
                }),
              }}
              onClick={toggleVinyl}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              role="button"
              aria-label="Click to reveal the batch tracklist"
            >
              <VinylGrooves />
              <VinylLabel trackTitle={currentTrack?.title} playing={isPlaying} />
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: 'conic-gradient(from 120deg, transparent 0%, rgba(255,255,255,0.045) 15%, transparent 30%)' }}
              />
            </div>

            {/* Hint badge */}
            <AnimatePresence>
              <motion.p
                key={revealed ? 'close-hint' : 'open-hint'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute hidden sm:block -bottom-12 left-1/2 -translate-x-1/2 text-[10px] text-amber-500/40 tracking-widest uppercase font-sans whitespace-nowrap pointer-events-none"
              >
                {revealed ? '↑ Click to stop' : '↑ Click the record'}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ── Tracklist Panel ── */}
          <div
            className="w-full max-w-sm rounded-2xl overflow-hidden flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #1a1510 0%, #120e09 100%)',
              border: '1px solid rgba(200,140,50,0.18)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,200,100,0.06)',
              filter: revealed ? 'none' : 'blur(5px)',
              pointerEvents: revealed ? 'auto' : 'none',
              userSelect: revealed ? 'auto' : 'none',
              transition: 'filter 0.6s ease',
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: 'rgba(200,140,50,0.12)' }}>
              <div
                key={isResetting ? 'h-resetting' : 'h-playing'}
                className={isResetting ? 'vinyl-winddown' : 'vinyl-spinning'}
                style={{
                  width: '1.75rem', height: '1.75rem',
                  borderRadius: '9999px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  background: 'radial-gradient(circle, #2e2620, #100d08)',
                  border: '1px solid rgba(200,140,50,0.25)',
                  ...(isResetting ? {} : {
                    animationDuration: '3s',
                    animationPlayState: headerPlayState,
                  }),
                }}
              >
                <div className="w-2 h-2 rounded-full bg-amber-800/60" />
              </div>
              <div>
                <p className="font-['Playfair_Display'] text-amber-200 font-semibold text-sm">The Memory Tape</p>
                <p className="text-amber-600/50 text-xs">MCET · 2022–'26 · {TRACKLIST.length} tracks</p>
              </div>
            </div>

            {/* Status bar */}
            <div className="px-5 py-2 flex items-center gap-2" style={{ background: 'rgba(200,140,50,0.05)' }}>
              <div className="flex gap-[3px] items-end h-4">
                {[1, 1.6, 0.8, 1.4, 1].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] rounded-full bg-amber-500"
                    animate={isPlaying ? { scaleY: [h * 0.5, h, h * 0.5] } : { scaleY: 0.3 }}
                    transition={isPlaying
                      ? { repeat: Infinity, duration: 0.7 + i * 0.15, ease: 'easeInOut' }
                      : { duration: 0.4 }
                    }
                    style={{ height: '100%', originY: 1 }}
                  />
                ))}
              </div>
              <span className="text-amber-400/70 text-xs font-mono ml-2 truncate max-w-[180px]">
                {isPlaying && currentTrack ? `▶  ${currentTrack.title}` : revealed ? 'Select a track to play' : 'Ready…'}
              </span>
            </div>

            {/* Track list */}
            <div
              className="py-2 px-2 overflow-y-auto"
              style={{ maxHeight: '280px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(200,140,50,0.25) transparent' }}
            >
              {TRACKLIST.map((t, i) => (
                <TrackRow
                  key={t.track}
                  {...t}
                  index={i}
                  revealed={revealed}
                  isActive={activeTrack === i}
                  isPlaying={isPlaying && activeTrack === i}
                  onPlay={playTrack}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 text-center border-t" style={{ borderColor: 'rgba(200,140,50,0.08)' }}>
              <p className="font-['Caveat'] text-amber-500/50 text-md italic">
                " Every song a memory, every memory a song. "
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default BatchSoundtrack;

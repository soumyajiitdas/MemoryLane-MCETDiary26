import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ─── Fountain pen nib SVG ─────────────────────────────────────────────────────
const PenNib = ({ isHovering }) => {
  const inkColor   = isHovering ? '#f59e0b' : '#fcd34d';
  const bodyColor  = '#2a2017';
  const glintColor = 'rgba(255,220,100,0.5)';
  return (
    <svg
      width="26" height="34" viewBox="0 0 26 34" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.45))' }}
      aria-hidden="true"
    >
      {/* Ink dot at the very tip (top) */}
      <circle cx="13" cy="0.5" r={isHovering ? 2.5 : 1.5} fill={inkColor} opacity={isHovering ? 0.95 : 0.8} />
      {isHovering && <circle cx="13" cy="0.5" r="5" fill={inkColor} opacity="0.12" />}

      {/* Nib — pointed metal tip at the top */}
      <path d="M13 0 L8 13 L18 13 Z" fill="#c8a96e" stroke="#8b6914" strokeWidth="0.5" />
      <line x1="13" y1="1" x2="13" y2="13" stroke="#8b6914" strokeWidth="0.6" opacity="0.7" />
      <ellipse cx="13" cy="8" rx="1.1" ry="1.6" fill="#8b6914" opacity="0.5" />
      <path d="M10 11 L12 13" stroke={glintColor} strokeWidth="0.8" opacity="0.6" />

      {/* Grip section */}
      <rect x="8" y="13" width="10" height="6" rx="2" fill="#3d3020" />

      {/* Barrel (body) — at the bottom */}
      <rect x="9" y="17" width="8" height="17" rx="3" fill={bodyColor} />
      <rect x="10.5" y="18" width="3" height="13" rx="1.5" fill={glintColor} opacity="0.4" />
    </svg>
  );
};

// ─── Magnifying Glass SVG ─────────────────────────────────────────────────────
const MagnifyingGlass = () => (
  <svg
    width="30" height="30" viewBox="0 0 32 32" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.3))' }}
    aria-hidden="true"
  >
    <rect x="18" y="18" width="6" height="14" rx="3" fill="#8b5a00" transform="rotate(-45 21 25)" />
    <rect x="19" y="19" width="4" height="12" rx="2" fill="#5a3a00" transform="rotate(-45 21 25)" />
    <circle cx="13" cy="13" r="10" stroke="#c8a96e" strokeWidth="3" />
    <circle cx="13" cy="13" r="11" stroke="#8b6914" strokeWidth="1" />
    <circle cx="13" cy="13" r="8" fill="rgba(255,255,255,0.12)" />
    <path d="M8 9 Q13 4 18 9" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Ink Splat Drop ───────────────────────────────────────────────────────────
const InkDrop = ({ x, y, angle, distance, size, onDone }) => (
  <motion.div
    initial={{ x, y, scale: 0, opacity: 1 }}
    animate={{
      x: x + Math.cos(angle) * distance,
      y: y + Math.sin(angle) * distance,
      scale: 1,
      opacity: 0,
    }}
    transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    onAnimationComplete={onDone}
    style={{
      position: 'fixed',
      width: size,
      height: size * 1.4,
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      background: 'radial-gradient(circle at 35% 35%, #fcd34d, #b45309)',
      pointerEvents: 'none',
      zIndex: 10009,
      transformOrigin: 'center',
      rotate: `${(angle * 180) / Math.PI}deg`,
    }}
    aria-hidden="true"
  />
);

// ─── Main Cursor Component ────────────────────────────────────────────────────
const FountainPenCursor = () => {
  const cursorRef   = useRef(null);
  const modeRef     = useRef('default');
  const visibleRef  = useRef(false);
  // Tilt — tracked separately so position stays instant
  const tiltRef     = useRef(0);     // current smoothed tilt (degrees)
  const targetTilt  = useRef(0);     // target tilt from movement direction
  const prevPos     = useRef({ x: 0, y: 0 });
  const rafId       = useRef(null);

  const [mode,      setMode]      = useState('default');
  const [inkSplats, setInkSplats] = useState([]);
  const [visible,   setVisible]   = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('custom-cursor');

    // ── Compute mode from DOM element ──────────────────────────────────────
    const getMode = (el) => {
      if (!el) return 'default';
      if (el.closest('[data-photo="true"]') || el.closest('img, [role="img"]')) return 'doodle';
      if (el.closest('[data-doodle="true"]'))                                     return 'doodle';
      if (el.closest('a, button, [role="button"], input, label, select, textarea')) return 'link';
      return 'default';
    };

    // ── Continuous RAF loop — smoothly lerps tilt toward target ───────────────
    // Runs independently of mousemove so the position update is never delayed.
    const animateTilt = () => {
      const diff = targetTilt.current - tiltRef.current;
      if (Math.abs(diff) > 0.05) {
        tiltRef.current += diff * 0.35; // fast lerp: responsive but organic
        if (cursorRef.current) {
          cursorRef.current.style.transform =
            `translate(${prevPos.current.x}px, ${prevPos.current.y}px) rotate(${tiltRef.current}deg)`;
        }
      }
      rafId.current = requestAnimationFrame(animateTilt);
    };
    rafId.current = requestAnimationFrame(animateTilt);

    // ── Single mousemove handler does everything ───────────────────────────
    // Position is updated with direct DOM manipulation — zero React overhead.
    // Mode is only updated via setState when it actually changes.
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // 1. Position — instant, no lerp, no RAF delay
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${x}px, ${y}px) rotate(${tiltRef.current}deg)`;
      }

      // 2. Tilt target — derived from velocity direction, capped at ±20°
      const dx = x - prevPos.current.x;
      const dy = y - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 1.2) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
        // Clamp to ±20° for a subtle pen-writing tilt
        targetTilt.current = Math.max(-20, Math.min(20, angle));
      }
      prevPos.current = { x, y };

      // 2. Visibility (fires at most once)
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      // 3. Mode — only re-renders when the category actually changes
      const newMode = getMode(e.target);
      if (newMode !== modeRef.current) {
        modeRef.current = newMode;
        setMode(newMode);
      }
    };

    const onLeave = () => { visibleRef.current = false; setVisible(false); };
    const onEnter = () => { visibleRef.current = true;  setVisible(true);  };

    window.addEventListener('mousemove',    onMove,   { passive: true });
    document.addEventListener('mouseleave', onLeave,  { passive: true });
    document.addEventListener('mouseenter', onEnter,  { passive: true });

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove',    onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []); // runs once — never re-attaches

  // ── Click → ink splat ─────────────────────────────────────────────────────
  const handleClick = useCallback((e) => {
    const { clientX: x, clientY: y } = e;
    const count = 5 + Math.floor(Math.random() * 4);
    setInkSplats(prev => [
      ...prev,
      ...Array.from({ length: count }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        x: x - 3,
        y: y - 3,
        angle:    (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.7,
        distance: 16 + Math.random() * 26,
        size:     3 + Math.random() * 4,
      })),
    ]);
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [handleClick]);

  const removeInkSplat = useCallback(
    (id) => setInkSplats(prev => prev.filter(s => s.id !== id)),
    []
  );

  const isDoodle   = mode === 'doodle';
  const isHovering = mode === 'link';

  return (
    <>
      {/* ── Cursor shell — positioned with direct DOM transform ── */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:    0,
          left:   0,
          width:  30,
          height: 34,
          // Hotspot: nib tip (top-centre of SVG) for pen, centre for glass
          marginLeft: -13,
          marginTop:  isDoodle ? -13 : -1,
          pointerEvents: 'none',
          // Above the graduation banner overlay (z-index 10000–10002)
          zIndex:        10010,
          willChange:    'transform',
          opacity:       visible ? 1 : 0,
          // Only transition opacity and the hotspot shift — NOT position
          transition:    'opacity 0.15s ease, margin-top 0.15s ease',
        }}
      >
        <AnimatePresence mode="wait">
          {isDoodle ? (
            <motion.div
              key="glass"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{   opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.12 }}
            >
              <MagnifyingGlass />
            </motion.div>
          ) : (
            <motion.div
              key="pen"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{   opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
            >
              <PenNib isHovering={isHovering} />
              {isHovering && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.12, 0.35] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position:     'absolute',
                    top:          -6,
                    left:        '5%',
                    transform:    'translateX(-50%)',
                    width:        16,
                    height:       16,
                    borderRadius: '50%',
                    background:   'radial-gradient(circle, rgba(245,158,11,0.55), transparent)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Ink splat drops ── */}
      <AnimatePresence>
        {inkSplats.map(splat => (
          <InkDrop
            key={splat.id}
            {...splat}
            onDone={() => removeInkSplat(splat.id)}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default FountainPenCursor;

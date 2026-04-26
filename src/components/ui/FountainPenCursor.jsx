import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// ─── Fountain Pen Nib SVG ─────────────────────────────────────────────────────
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

// ─── Eraser Tip SVG ───────────────────────────────────────────────────────────
const EraserTip = () => (
  <svg
    width="28" height="18" viewBox="0 0 32 22" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.35))' }}
    aria-hidden="true"
  >
    {/* Main eraser body */}
    <rect x="1" y="2" width="22" height="14" rx="2.5" fill="#fda4af" stroke="#fb7185" strokeWidth="0.8" />
    {/* Centre stripe label */}
    <rect x="1" y="8" width="22" height="4" fill="#f43f5e" opacity="0.35" />
    {/* Brand line detail */}
    <line x1="5" y1="5" x2="18" y2="5" stroke="#fb7185" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
    {/* Metal ferrule band */}
    <rect x="22" y="2" width="8" height="14" rx="1.5" fill="#d1d5db" stroke="#9ca3af" strokeWidth="0.5" />
    <rect x="23.5" y="3" width="2" height="12" rx="1" fill="rgba(255,255,255,0.45)" />
    {/* Rubber erasing edge (bottom of eraser) */}
    <rect x="1" y="14" width="22" height="4" rx="1.5" fill="#fecdd3" />
    {/* Eraser dust/shavings beneath */}
    <ellipse cx="5"  cy="20" rx="2"   ry="0.7" fill="#fda4af" opacity="0.5" />
    <ellipse cx="11" cy="21" rx="1.5" ry="0.6" fill="#fda4af" opacity="0.4" />
    <ellipse cx="17" cy="20" rx="2"   ry="0.7" fill="#fda4af" opacity="0.45" />
  </svg>
);

// ─── Ink Splat Drop ───────────────────────────────────────────────────────────
// FIX: rotate moved OUT of style into animate props so framer-motion's
// transform matrix doesn't conflict. top:0/left:0 make positioning unambiguous.
const InkDrop = ({ x, y, angle, distance, size, onDone }) => (
  <motion.div
    initial={{
      x,
      y,
      scale:   0,
      opacity: 1,
      rotate:  (angle * 180) / Math.PI,
    }}
    animate={{
      x:       x + Math.cos(angle) * distance,
      y:       y + Math.sin(angle) * distance,
      scale:   1,
      opacity: 0,
      rotate:  (angle * 180) / Math.PI + 60,
    }}
    transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    onAnimationComplete={onDone}
    style={{
      position:     'fixed',
      top:          0,       // explicit anchor — framer x/y are transforms from here
      left:         0,
      width:        size,
      height:       size * 1.4,
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      background:   'radial-gradient(circle at 35% 35%, #fcd34d, #b45309)',
      pointerEvents: 'none',
      zIndex:       10019,
      transformOrigin: 'center',
    }}
    aria-hidden="true"
  />
);

// ─── Main Cursor Component ────────────────────────────────────────────────────
const FountainPenCursor = () => {
  // Only activate on devices with a fine pointer (mouse/trackpad).
  // On touch/mobile there is no cursor at all — skip everything.
  const [isMouse] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(any-pointer: fine)').matches
  );

  const cursorRef  = useRef(null);
  const modeRef    = useRef('default');
  const visibleRef = useRef(false);
  const tiltRef    = useRef(0);
  const targetTilt = useRef(0);
  const prevPos    = useRef({ x: 0, y: 0 });
  const rafId      = useRef(null);

  const [mode,      setMode]      = useState('default');
  const [inkSplats, setInkSplats] = useState([]);
  const [visible,   setVisible]   = useState(false);

  useEffect(() => {
    if (!isMouse) return;

    document.documentElement.classList.add('custom-cursor');

    // ── Mode detection — throttled to ≥6px movement ────────────────────────
    const lastModeCheck = { x: -999, y: -999 };
    const MODE_THRESHOLD_SQ = 36;

    const getMode = (el, x, y) => {
      const dx = x - lastModeCheck.x;
      const dy = y - lastModeCheck.y;
      if (dx * dx + dy * dy < MODE_THRESHOLD_SQ) return modeRef.current;
      lastModeCheck.x = x;
      lastModeCheck.y = y;
      const stack = document.elementsFromPoint(x, y);
      const onDoodle = stack.some(e => e.closest?.('[data-doodle="true"]'));
      if (onDoodle) return 'eraser';
      if (!el) return 'default';
      if (el.closest('[data-photo="true"]') || el.closest('img, [role="img"]')) return 'photo';
      if (el.closest('a, button, [role="button"], input, label, select, textarea')) return 'link';
      return 'default';
    };

    // ── Lerp state — separate from prevPos used for speed/angle calc ───────
    // curPos: the rendered cursor position (lerped each frame)
    // mousePos: the raw mouse target (updated instantly in onMove)
    const mousePos = { x: 0, y: 0 };
    const curPos   = { x: 0, y: 0 };

    // Lerp factor: 0.28 ≈ fast but still smooth.
    // Lower = dreamier, higher = snappier. 0.10–0.40 is the range.
    const LERP = 0.28;
    const TILT_LERP = 0.30;

    // ── Unified RAF loop — handles position lerp + tilt ease ───────────────
    // Self-suspending: stops when both position and tilt are settled.
    const animate = () => {
      let needsFrame = false;

      // Position lerp
      const px = mousePos.x - curPos.x;
      const py = mousePos.y - curPos.y;
      if (Math.abs(px) > 0.08 || Math.abs(py) > 0.08) {
        curPos.x += px * LERP;
        curPos.y += py * LERP;
        needsFrame = true;
      } else {
        // Snap to avoid sub-pixel drift
        curPos.x = mousePos.x;
        curPos.y = mousePos.y;
      }

      // Tilt ease
      const td = targetTilt.current - tiltRef.current;
      if (Math.abs(td) > 0.05) {
        tiltRef.current += td * TILT_LERP;
        needsFrame = true;
      } else {
        tiltRef.current = targetTilt.current;
      }

      // Apply both in a single transform — one style mutation per frame
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${curPos.x}px, ${curPos.y}px) rotate(${tiltRef.current}deg)`;
      }

      rafId.current = needsFrame ? requestAnimationFrame(animate) : null;
    };

    // ── Mousemove — record target only, never touch the DOM ────────────────
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Update raw target
      mousePos.x = x;
      mousePos.y = y;

      // Tilt from movement direction
      const dx = x - prevPos.current.x;
      const dy = y - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 1.2) {
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
        targetTilt.current = Math.max(-20, Math.min(20, angle));
      }
      prevPos.current = { x, y };

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const newMode = getMode(e.target, x, y);
      if (newMode !== modeRef.current) {
        modeRef.current = newMode;
        setMode(newMode);
      }

      // Kick off the RAF loop if it isn't already running
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const onLeave = () => { visibleRef.current = false; setVisible(false); };
    const onEnter = () => { visibleRef.current = true;  setVisible(true);  };

    window.addEventListener('mousemove',    onMove,  { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    document.addEventListener('mouseenter', onEnter, { passive: true });

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove',    onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [isMouse]);


  // ── Click → ink splat ─────────────────────────────────────────────────────
  const handleClick = useCallback((e) => {
    const { clientX: x, clientY: y } = e;
    const count = 6 + Math.floor(Math.random() * 5); // 6–10 drops
    setInkSplats(prev => [
      ...prev,
      ...Array.from({ length: count }, (_, i) => ({
        id:       `${Date.now()}-${i}`,
        x:        x - 4,
        y:        y - 4,
        angle:    (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8,
        distance: 24 + Math.random() * 36,   // fly further for visibility
        size:     5 + Math.random() * 6,      // bigger drops
      })),
    ]);
  }, []);

  useEffect(() => {
    if (!isMouse) return;
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [handleClick, isMouse]);

  const removeInkSplat = useCallback(
    (id) => setInkSplats(prev => prev.filter(s => s.id !== id)),
    []
  );

  // Don't render anything on touch/mobile devices
  if (!isMouse) return null;

  // ── Derived state ──────────────────────────────────────────────────────────
  const isPhoto   = mode === 'photo';
  const isEraser  = mode === 'eraser';
  const isHovering = mode === 'link';

  // Hotspot adjustments per cursor type
  const marginTop = isPhoto || isEraser ? -13 : -1;

  return (
    <>
      {/* ── Cursor shell ── */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position:   'fixed',
          top:        0,
          left:       0,
          width:      34,
          height:     34,
          marginLeft: -13,
          marginTop,
          pointerEvents: 'none',
          zIndex:     10020,
          willChange: 'transform',
          opacity:    visible ? 1 : 0,
          transition: 'opacity 0.15s ease, margin-top 0.15s ease',
        }}
      >
        <AnimatePresence mode="wait">
          {isPhoto ? (
            <motion.div
              key="glass"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1   }}
              exit={{   opacity: 0, scale: 0.6  }}
              transition={{ duration: 0.12 }}
            >
              <MagnifyingGlass />
            </motion.div>
          ) : isEraser ? (
            <motion.div
              key="eraser"
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={{ opacity: 1, scale: 1,   rotate: 0   }}
              exit={{   opacity: 0, scale: 0.6, rotate: 10  }}
              transition={{ duration: 0.12 }}
            >
              <EraserTip />
            </motion.div>
          ) : (
            <motion.div
              key="pen"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1   }}
              exit={{   opacity: 0, scale: 0.8  }}
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
                    left:         '5%',
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

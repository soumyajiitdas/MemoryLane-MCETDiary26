import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Confetti particle generator ─────────────────────────────────────────────
const COLORS = [
  '#fcd34d', '#f59e0b', '#ef4444', '#10b981',
  '#3b82f6', '#a855f7', '#ec4899', '#14b8a6',
  '#f97316', '#ffffff',
];

const GRAD_DATE_STR = '2026-07-17'; // ← Graduation date (YYYY-MM-DD)

// ─────────────────────────────────────────────────────────────────────────────
// DEV TESTING: Set this to `true` to always show the banner during development.
// Set it back to `false` before deploying!
// ─────────────────────────────────────────────────────────────────────────────
const DEV_FORCE_SHOW = true;

/** True only if today's local date is graduation day */
const isGraduationDay = () => {
  const today = new Date();
  const [y, m, d] = GRAD_DATE_STR.split('-').map(Number);
  return (
    today.getFullYear() === y &&
    today.getMonth() + 1 === m &&
    today.getDate() === d
  );
};

/** localStorage key scoped to graduation date so it auto-resets any other day */
const DISMISS_KEY = `grad_banner_dismissed_${GRAD_DATE_STR}`;

// ─── Single confetti piece ────────────────────────────────────────────────────
const ConfettiPiece = ({ color, left, delay, duration, size, shape }) => (
  <motion.div
    aria-hidden="true"
    initial={{ y: -20, opacity: 1, rotate: 0, x: 0 }}
    animate={{
      y: '105vh',
      opacity: [1, 1, 0.8, 0],
      rotate: Math.random() > 0.5 ? 720 : -720,
      x: [0, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 80, 0],
    }}
    transition={{
      duration,
      delay,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
    }}
    style={{
      position:    'fixed',
      top:         0,
      left:        `${left}%`,
      width:       shape === 'circle' ? size : size * 1.6,
      height:      size,
      borderRadius: shape === 'circle' ? '50%' : shape === 'rect' ? '2px' : '0',
      background:  color,
      pointerEvents: 'none',
      zIndex:      10001,
      willChange:  'transform, opacity',
    }}
  />
);

// ─── Main Banner ──────────────────────────────────────────────────────────────
const GraduationBanner = () => {
  // Compute show state synchronously — no useEffect delay that could be missed.
  // Also supports ?preview-graduation in the URL for dev testing.
  const shouldShow = () => {
    if (DEV_FORCE_SHOW) return true; // ← flip to false before deploying
    const isPreview = typeof window !== 'undefined' &&
      window.location.search.includes('preview-graduation');
    if (isPreview) return true;
    return isGraduationDay() && !localStorage.getItem(DISMISS_KEY);
  };

  const [show,    setShow]    = useState(shouldShow);
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, '1');
    setVisible(false);
    // Give exit animation time then unmount
    setTimeout(() => setShow(false), 600);
  };

  if (!show) return null;

  // Generate confetti pieces once (memo-style via useMemo workaround)
  const pieces = Array.from({ length: 80 }, (_, i) => ({
    id:       i,
    color:    COLORS[i % COLORS.length],
    left:     Math.random() * 100,
    delay:    Math.random() * 4,
    duration: 3.5 + Math.random() * 4,
    size:     6 + Math.random() * 8,
    shape:    ['circle', 'rect', 'square'][Math.floor(Math.random() * 3)],
  }));

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Confetti ── */}
          {pieces.map(p => (
            <ConfettiPiece key={p.id} {...p} />
          ))}

          {/* ── Overlay Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position:   'fixed',
              inset:      0,
              zIndex:     10000,
              background: 'radial-gradient(ellipse at center, rgba(10,7,3,0.92) 0%, rgba(5,3,1,0.97) 100%)',
              display:    'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* ── Content Card ── */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, y: 40 }}
              animate={{ scale: 1,   opacity: 1, y: 0  }}
              exit={{    scale: 0.8, opacity: 0, y: -30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.15 }}
              style={{
                maxWidth:  540,
                width:     '90vw',
                padding:   '3rem 2.5rem',
                borderRadius: '1.5rem',
                background: 'linear-gradient(135deg, #1a1208 0%, #2a1a0a 100%)',
                border:    '1px solid rgba(245,158,11,0.4)',
                boxShadow: '0 0 80px rgba(245,158,11,0.2), 0 40px 80px rgba(0,0,0,0.6)',
                textAlign: 'center',
                position:  'relative',
                zIndex:    10002,
              }}
            >
              {/* Wax seal decoration */}
              <div style={{
                position: 'absolute', top: -24, left: '50%',
                transform: 'translateX(-50%)',
                width: 48, height: 48, borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #f59e0b, #92400e)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,220,100,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem',
              }}>
                🎓
              </div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize:   'clamp(1.8rem, 5vw, 2.8rem)',
                  fontWeight: 700,
                  color:      '#fcd34d',
                  lineHeight: 1.2,
                  marginBottom: '0.75rem',
                  marginTop:  '1rem',
                  background: 'linear-gradient(to right, #fcd34d, #f59e0b, #fcd34d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                }}
              >
                Congratulations, Batch '26! 🎉
              </motion.h1>

              {/* Sub-message */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize:   '1.4rem',
                  color:      'rgba(255,220,100,0.85)',
                  marginBottom: '1rem',
                  lineHeight: 1.5,
                }}
              >
                Today, the corridors of MCET echo one last time with our footsteps.
                Four years, one family. Forever. 💛
              </motion.p>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{
                  height: 1,
                  background: 'linear-gradient(to right, transparent, rgba(245,158,11,0.5), transparent)',
                  margin: '1.25rem 0',
                }}
              />

              {/* Date stamp */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize:   '0.85rem',
                  color:      'rgba(245,158,11,0.5)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '2rem',
                }}
              >
                17 July 2026 · MCET, Coochbehar
              </motion.p>

              {/* Dismiss button */}
              <motion.button
                onClick={handleDismiss}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                style={{
                  padding:      '0.75rem 2.5rem',
                  borderRadius: '9999px',
                  background:   'linear-gradient(135deg, #f59e0b, #d97706)',
                  color:        '#1a1208',
                  fontFamily:   "'Playfair Display', serif",
                  fontWeight:   700,
                  fontSize:     '0.95rem',
                  border:       'none',
                  cursor:       'pointer',
                  boxShadow:    '0 4px 16px rgba(245,158,11,0.35)',
                  letterSpacing: '0.05em',
                }}
              >
                🎓 Close & Celebrate!
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GraduationBanner;

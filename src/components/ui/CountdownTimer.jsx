import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ── Graduation moment ─────────────────────────────────────────────────────────
// End-of-day on graduation day so the countdown completes at midnight.
const GRADUATION = new Date('2026-07-17T23:59:59');

// Start of graduation day (for "is today the day?" check)
const GRAD_DAY_START = new Date('2026-07-17T00:00:00');
const GRAD_DAY_END = new Date('2026-07-17T23:59:59');

// ── Helpers ───────────────────────────────────────────────────────────────────
const pad = (n) => (n < 10 ? `0${n}` : String(n));

const msToHMS = (ms) => {
  const totalSec = Math.floor(Math.abs(ms) / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds };
};

const getMode = () => {
  const now = Date.now();
  if (now >= GRAD_DAY_START.getTime() && now <= GRAD_DAY_END.getTime()) return 'celebrate';
  if (now < GRAD_DAY_START.getTime()) return 'countdown';
  return 'countup';
};

// ── Shared NumberBox ──────────────────────────────────────────────────────────
const NumberBox = ({ num, label, glow }) => (
  <div className="flex flex-col items-center justify-center mx-1 sm:mx-3">
    <div
      className="glass w-16 h-16 sm:w-24 sm:h-24 rounded-lg sm:rounded-2xl flex items-center justify-center relative overflow-hidden"
      style={glow ? { boxShadow: '0 0 24px rgba(245,158,11,0.5)' } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
      <span className="text-3xl sm:text-5xl font-bold font-serif text-white relative z-10 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
        {pad(num)}
      </span>
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30 z-20" />
    </div>
    <span className="text-xs sm:text-sm uppercase font-serif tracking-widest text-[#9CA3AF] mt-3 font-medium">
      {label}
    </span>
  </div>
);

// ── Graduation Day Celebration Display ────────────────────────────────────────
const CelebrationDisplay = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    className="flex flex-col items-center gap-4 text-center"
  >
    <motion.div
      animate={{ rotate: [0, -8, 8, -6, 6, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
      style={{ fontSize: '4rem', lineHeight: 1 }}
    >
      🎓
    </motion.div>
    <h2
      className="font-serif font-bold"
      style={{
        fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
        background: 'linear-gradient(to right, #fcd34d, #f59e0b, #fcd34d)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundSize: '200% auto',
      }}
    >
      Graduation Day! 🎉
    </h2>
    <p className="font-['Caveat'] text-2xl text-amber-400/80">
      The day has finally arrived, Batch '26!
    </p>
  </motion.div>
);

// Compute correct initial timeLeft without waiting for useEffect
const computeTimeLeft = () => {
  const mode = getMode();
  if (mode === 'celebrate') return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const now = Date.now();
  const diff = mode === 'countdown'
    ? GRADUATION.getTime() - now   // ms remaining
    : now - GRADUATION.getTime();  // ms elapsed
  return msToHMS(diff);
};

// ── Main Component ─────────────────────────────────────────────────────────────
const CountdownTimer = () => {
  const [mode, setMode] = useState(getMode);
  // Lazy initializer — computes correct value on first render, no zeros flash
  const [timeLeft, setTimeLeft] = useState(computeTimeLeft);

  useEffect(() => {
    const tick = () => {
      const currentMode = getMode();
      setMode(currentMode);

      if (currentMode === 'celebrate') return;

      const now = Date.now();
      const diff = currentMode === 'countdown'
        ? GRADUATION.getTime() - now    // positive: time remaining
        : now - GRADUATION.getTime();   // positive: time elapsed

      setTimeLeft(msToHMS(diff));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (mode === 'celebrate') {
    return <CelebrationDisplay />;
  }

  const isCountup = mode === 'countup';

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Context label */}
      <p
        className="font-['Caveat'] text-2xl pt-8 text-amber-500/70 tracking-wide"
        style={{ letterSpacing: '0.05em' }}
      >
        {isCountup ? '⏳ Time since graduation…' : '⏳ Counting down to graduation…'}
      </p>

      {/* Timer boxes */}
      <div className="flex items-center justify-center">
        <NumberBox num={timeLeft.days} label="Days" glow={isCountup} />
        <div className="text-2xl sm:text-4xl font-light text-amber-500/50 -mt-8">:</div>
        <NumberBox num={timeLeft.hours} label="Hours" glow={isCountup} />
        <div className="text-2xl sm:text-4xl font-light text-amber-500/50 -mt-8">:</div>
        <NumberBox num={timeLeft.minutes} label="Mins" glow={isCountup} />
        <div className="text-2xl sm:text-4xl font-light text-amber-500/50 -mt-8">:</div>
        <NumberBox num={timeLeft.seconds} label="Secs" glow={isCountup} />
      </div>

      {isCountup && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-['Caveat'] text-lg text-amber-400/60 italic"
        >
          …and every second adds to the memory. 💛
        </motion.p>
      )}
    </div>
  );
};

export default CountdownTimer;

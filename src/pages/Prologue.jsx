import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import BatchSoundtrack from '../components/sections/BatchSoundtrack';
import CountdownTimer from '../components/ui/CountdownTimer';
import PageTransition from '../components/layout/PageTransition';
import ChapterNav from '../components/ui/ChapterNav';
import Fireflies from '../components/ui/Fireflies';
import PaperTear from '../components/ui/PaperTear';
import { DoodleHeart, DoodleSparkle, DoodleArrow, DoodleCrown } from '../components/ui/VintageDoodles';
import { getTrailingEmoji } from "../utils/emojiExtract";

// Data imports
import { peopleData } from '../data/cast';
import { eventsData } from '../data/moments';
import { memoriesData } from '../data/notes';
import { timelineData } from '../data/chapters';

// Premium Vintage Ticket
const VintageStatTicket = ({ label, value, delay }) => {
  const tilt = useMemo(() => (Math.random() > 0.5 ? (Math.random() * 2 + 1) : -(Math.random() * 2 + 1)), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -6, rotate: tilt * 0.3 }}
      transition={{ duration: 0.7, delay }}
      className="relative w-48 h-28 sm:w-56 sm:h-32 flex items-center justify-center group"
    >
      {/* TICKET BODY */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `
  radial-gradient(circle at 20% 25%, rgba(120,120,120,0.12) 0%, transparent 55%),
  radial-gradient(circle at 80% 70%, rgba(90,90,90,0.10) 0%, transparent 60%),
  radial-gradient(circle at 50% 50%, rgba(60,60,60,0.06) 0%, transparent 70%),
  linear-gradient(135deg, #f2f2ee 0%, #e4e4df 55%, #d6d6d0 100%)
`,
          filter: "contrast(0.95) brightness(0.95) drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
          borderRadius: "0px",
          WebkitMaskImage: `
        radial-gradient(circle at left center, transparent 10px, black 11px),
        radial-gradient(circle at right center, transparent 10px, black 11px)
      `,
          WebkitMaskComposite: "source-in",
          maskImage: `
        radial-gradient(circle at left center, transparent 10px, black 11px),
        radial-gradient(circle at right center, transparent 10px, black 11px)
      `,
          maskComposite: "intersect",
        }}
      >
        {/* PAPER TEXTURE (REALISTIC) */}
        <div
          className="absolute inset-0 opacity-60 mix-blend-multiply"
          style={{
            backgroundImage: "url('/textures/noise-lines.png')",
            backgroundSize: "cover",
          }}
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-darken"
          style={{
            backgroundImage: "url('/textures/noise.png')",
            backgroundSize: "100px",
          }}
        />
        {/* SCAN VIGNETTE */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,0.35))] opacity-40" />

        {/* INK BORDER */}
        <div
          className="absolute inset-3 opacity-40"
          style={{
            border: "2px solid rgba(60,20,15,0.6)",
            opacity: 0.85,
          }}
        />

        {/* INNER DIVIDERS */}
        <div className="absolute left-[22%] top-3 bottom-3 w-[2px] bg-[rgba(60,20,15,0.6)] opacity-40"></div>
        <div className="absolute right-[22%] top-3 bottom-3 w-[2px] bg-[rgba(60,20,15,0.6)] opacity-40"></div>

        {/* PRINT FADE OVERLAY */}
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none">

        {/* INK BLEED (shadow layer) */}
        <span
          className="absolute text-4xl sm:text-5xl font-serif text-black opacity-30"
          style={{
            transform: "translate(0.6px, 0.8px)",
            filter: "blur(0.6px)",
          }}
        >
          {value}
        </span>

        {/* MAIN TEXT */}
        <span
          className="relative text-4xl sm:text-5xl font-serif text-[#2b1d13]"
          style={{
            letterSpacing: "0.02em",
            filter: "blur(0.3px)",
          }}
        >
          {value}
        </span>

        {/* LABEL */}
        <span className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#5a4630] font-semibold"
          style={{
            filter: "blur(0.3px)",
          }}
        >
          {label}
        </span>
      </div>

      {/* SUBTLE STAINS */}
      <div className="absolute w-6 h-6 bg-black/10 rounded-full blur-md top-2 left-6"></div>
      <div className="absolute w-4 h-4 bg-black/10 rounded-full blur-sm bottom-2 right-6"></div>
    </motion.div>
  );
};

// Sticky Note
const StickyNoteMini = ({ post, index }) => {
  const [hovered, setHovered] = useState(false);
  const len = post.content?.length ?? 0;
  const textSize = len < 120 ? 'text-2xl' : 'text-xl';
  const contentStyle = len > 330 ? { maxHeight: '200px', overflowY: 'auto', paddingRight: '8px' } : {};
  const rotation = useMemo(() => Math.floor(Math.random() * 6) - 3, []);

  // Detect if the device actually supports hover (ignores touch screens)
  const isHoverable = typeof window !== 'undefined' ? window.matchMedia('(hover: hover)').matches : true;
  const getBlurFilter = (amount) => (!isHoverable || hovered) ? 'blur(0px)' : `blur(${amount})`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.05, rotate: 0, y: -8, transition: { duration: 0.35, ease: 'easeOut' } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative w-full max-w-[340px] mx-auto flex flex-col cursor-pointer"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Card body + stamp grouped in a shared relative wrapper */}
      <div
        className="relative"
        style={{
          boxShadow: (isHoverable && hovered) ? '0 25px 50px rgba(0,0,0,0.22)' : '2px 4px 15px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.4s ease'
        }}
      >
        {/* Note Body */}
        <div
          className="p-8 pb-12 flex flex-col bg-[#FDFBF7]"
          style={{
            backgroundImage: "url('/textures/rice-paper.png')",
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2px))'
          }}
        >

          {/* Pin */}
          <div className="push-pin -top-3" />

          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #4A90E2 27px, #4A90E2 28px)', backgroundSize: '100% 28px' }} />

          {/* Text — blurred by default on desktop, clear on hover */}
          <div
            className={`font-['Caveat'] ${textSize} leading-[28px] text-[#2c3e50] w-full mt-2 styling-scrollbar relative z-10`}
            data-photo="true"
            style={{
              ...contentStyle,
              filter: getBlurFilter('1px'),
              transition: 'filter 0.5s ease'
            }}
          >
            "{post.content}"
          </div>

          <div
            className="mt-8 w-full flex justify-between items-end border-t border-black/5 pt-4 relative z-10"
            style={{ filter: getBlurFilter('1px'), transition: 'filter 0.5s ease' }}
          >
            <span className="font-['Caveat'] text-2xl font-bold text-[#1e3a8a]">{post.author}</span>
            <span className="text-[10px] text-[#8b95a5] font-sans tracking-[0.15em] uppercase font-semibold">{new Date(post.timestamp).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Vintage Round Stamp */}
        <div
          className="absolute bottom-3 right-3 w-[72px] h-[72px] border-[2.5px] border-red-800/50 rounded-full flex items-center justify-center rotate-[-15deg] z-30 opacity-55 shadow-sm pointer-events-none"
          style={{ filter: getBlurFilter('1px'), transition: 'filter 0.5s ease' }}
        >
          <div className="border-[1.5px] border-dashed border-red-800/50 rounded-full w-[60px] h-[60px] flex items-center justify-center text-center leading-none">
            <span className="text-[10px] font-bold text-red-800/70 uppercase tracking-tighter block mt-0.5">
              MCET<br />Diary'26<br />★
            </span>
          </div>
        </div>
      </div>

      {/* Curling shadow effect */}
      <div className="absolute -bottom-2 left-4 right-4 h-4 shadow-[0_15px_15px_rgba(0,0,0,0.15)] -z-10 rounded-[100%]"></div>
    </motion.div>
  );
};

// Interactive Cast Card (Draggable + Flip)
const InteractiveCastCard = ({ person, idx, containerRef, updateZIndex, currentZIndex }) => {
  const emoji = getTrailingEmoji(person.nickname);
  const tilt = useMemo(() => (idx % 2 === 0 ? -1 : 1) * (Math.random() * 8 + 4), [idx]);
  const yOffset = useMemo(() => (idx % 3 === 0 ? 30 : idx % 3 === 1 ? -20 : 10), [idx]);

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.1}
      onDragStart={() => updateZIndex(person.id || idx)}
      initial={{ opacity: 0, y: 80, rotate: tilt * 1.5 }}
      whileInView={{ opacity: 1, y: yOffset, rotate: tilt }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative cursor-grab active:cursor-grabbing"
      style={{ perspective: '1200px', zIndex: currentZIndex || 10 }}
    >
      <motion.div
        whileHover={{ scale: 1.12, rotate: 0, rotateY: 180, zIndex: 50, y: yOffset - 15, transition: { duration: 0.4, type: 'spring', damping: 18 } }}
        className="relative w-40 sm:w-48 h-56 sm:h-64 bg-[#FDFBF7] p-3 pb-8 shadow-[0_15px_40px_rgba(0,0,0,0.3)] border border-black/5"
        style={{ transformStyle: 'preserve-3d', backgroundImage: "url('/textures/rice-paper.png')" }}
      >
        {/* Front */}
        <div className="absolute inset-0 p-2 sm:p-3 pb-2 sm:pb-4 backface-hidden flex flex-col">
          {/* Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/70 -rotate-2 z-30 shadow-sm border border-white/20"></div>

          <div className="w-full flex-1 bg-gray-200 mb-2 overflow-hidden relative border border-black/5">
            {person.photo && person.photo.startsWith('linear') ? (
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{ background: person.photo }}
              />
            ) : (
              <img
                src={person.photo || ''}
                alt={person.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                onError={(e) => {
                  e.target.style.opacity = '0';
                  e.target.parentElement.style.background = 'linear-gradient(45deg, #f3f4f6, #e5e7eb)';
                }}
              />
            )}
            <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] pointer-events-none"></div>
          </div>

          <h3 className="font-['Caveat'] text-xl sm:text-2xl text-[#2c2416] font-semibold truncate text-center relative z-10 leading-none mb-1">{`${person.name.split(' ')[0]} ${emoji}`}</h3>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 p-5 md:p-6 backface-hidden bg-[#FDFBF7] flex flex-col border border-black/5"
          style={{ transform: 'rotateY(180deg)', backgroundImage: "url('/textures/rice-paper.png')" }}
        >
          {/* Ruled lines */}
          <div className="absolute inset-0 opacity-[0.30] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #4A90E2 27px, #4A90E2 28px)', backgroundSize: '100% 28px' }} />

          {/* Oneliner - Filling the space */}
          <div className="flex-1 relative z-10 w-full pt-1 overflow-hidden" data-photo="true">
            <p className="text-[#2c3e50] font-['Caveat'] text-lg md:text-xl leading-[28px] pointer-events-none text-left">
              "{person.oneliner || 'A familiar face from those moments that still linger.'}"
            </p>
          </div>

          {/* Nickname moved to bottom left */}
          <div className="relative z-10 w-full flex justify-start mt-4">
            <span className="text-[10px] md:text-xs text-amber-900/60 font-serif font-semibold pointer-events-none truncate max-w-full">
              "{person.nickname || ''}"
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Letter To Batch
const LetterToBatch = () => {
  return (
    <section className="py-24 md:py-40 relative z-10 px-4 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-24">

      {/* Left Side: Elegant Editorial Decor */}
      <div className="w-full lg:w-[45%] pt-10 lg:pt-20 relative">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Subtle Background Typography */}
          <div className="absolute -top-24 -left-12 sm:-left-24 text-[10rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter mix-blend-overlay">
            Missive
          </div>

          <div className="relative z-10">
            <h2 className="text-sm md:text-base font-sans font-semibold tracking-[0.3em] text-amber-500 uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-amber-500/50 block"></span>
              Where it Began
            </h2>
            <h3 className="text-6xl md:text-7xl lg:text-[7rem] font-['Caveat'] text-white/90 leading-[1.1] tracking-wide drop-shadow-md mb-8">
              Before we turn <br />
              <span className="text-amber-500/90">the page...</span>
            </h3>

            <p className="text-lg md:text-xl text-white/50 font-sans leading-relaxed max-w-md">
              A small note to the people who made this story worth writing. We walked in carrying uncertainty, and somehow, built a world out of ordinary days.
            </p>

            <DoodleCrown className="w-24 h-24 absolute -bottom-12 right-12 md:right-32 -rotate-12 mix-blend-screen opacity-30" color="#F59E0B" />
            <DoodleArrow className="w-16 h-16 absolute top-0 -right-4 md:right-10 rotate-[45deg] mix-blend-screen opacity-20" color="#F59E0B" />
          </div>
        </motion.div>
      </div>

      {/* Right Side: The Physical Letter */}
      <div className="w-full lg:w-[55%] relative mt-16 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative perspective-1000"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Back Paper (Stack effect) */}
          <div className="absolute inset-0 bg-[#E8E1D5] transform rotate-[-2deg] translate-x-2 translate-y-2 shadow-xl border border-black/5" style={{ backgroundImage: "url('/textures/paper-grain.png')", opacity: 0.8 }}></div>
          <div className="absolute inset-0 bg-[#F0EBE1] transform rotate-[1deg] -translate-x-1 translate-y-1 shadow-lg border border-black/5" style={{ backgroundImage: "url('/textures/paper-grain.png')", opacity: 0.9 }}></div>

          {/* Main Letter Box */}
          <div
            className="relative bg-[#FDFBF7] p-10 md:p-16 lg:p-20 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#E5DFD3]"
            style={{
              backgroundImage: "url('/textures/rice-paper.png')",
            }}
          >
            {/* Elegant Tape (Optimized without blur) */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/70 rotate-1 z-20 border border-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"></div>

            {/* Subtle Ruled Lines */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #7A8B99 31px, #7A8B99 32px)', backgroundSize: '100% 32px' }} />

            {/* Premium Wax Seal */}
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
              className="absolute -right-6 -top-6 md:-right-10 md:-top-10 z-30 drop-shadow-xl"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#8B2323] relative flex items-center justify-center border-[3px] border-[#6A1A1A] shadow-inner mix-blend-multiply" style={{ background: 'radial-gradient(circle at 30% 30%, #A52A2A, #5C1616)' }}>
                <div className="w-[85%] h-[85%] rounded-full border-[1.5px] border-dashed border-[#FDFBF7]/40 flex items-center justify-center">
                  <span className="text-[#FDFBF7]/80 font-serif text-sm tracking-widest text-center uppercase leading-tight font-bold">
                    Jnl.<br /><span className="text-xl">2026</span>
                  </span>
                </div>
                {/* Wax seal highlights */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Letter Content */}
            <div className="relative z-10 text-[#3A332A]" data-photo="true">
              <h2 className="font-['Caveat'] text-4xl md:text-5xl text-[#8B2323] mb-8 font-bold transform -rotate-1">
                Dearest Batch of 2026,
              </h2>

              <div className="space-y-6 font-['Caveat'] text-[22px] md:text-[28px] leading-[32px] md:leading-[32px] text-gray-800/90">
                <p>
                  <span className="text-5xl md:text-6xl float-left mr-3 leading-[0.8] text-[#8B2323] font-serif mt-1">I</span>
                  t feels unreal how something that began with unfamiliar faces and hesitant conversations has become a place that feels like home.
                </p>

                <div className="py-6 my-8 border-y border-[#8B2323]/20 bg-[#8B2323]/[0.02] -mx-4 px-4 md:-mx-8 md:px-8 transform -rotate-[0.5deg]">
                  <p className="text-[#8B2323] text-center font-bold text-[26px] md:text-[32px] leading-tight">
                    "What changes with every moment becomes truly beautiful."
                  </p>
                </div>

                <p>
                  Maybe that's what we were—ever-changing, fleeting, yet deeply unforgettable. As we prepare to step onto different paths, it's okay to acknowledge that some of us may drift. Some friendships are meant to be a beautiful chapter rather than the whole book...
                </p>

                <p>
                  We didn’t just spend these years… we lived them. No matter where the road leads, these days will always be a part of us.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-12 text-right">
                <span className="font-['Caveat'] text-3xl md:text-4xl font-bold text-[#8B2323] inline-block transform -rotate-2">
                  — The Memories We Made
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Prologue = () => {
  useEffect(() => { document.title = "MCET Diary ’26 | From First Year to Farewell"; }, []);

  const [featuredCast, setFeaturedCast] = useState([]);
  const [recentMemories, setRecentMemories] = useState([]);

  // Z-Index tracking for draggable cast cards
  const castContainerRef = React.useRef(null);
  const [castZIndices, setCastZIndices] = useState({});
  const [castMaxZ, setCastMaxZ] = useState(10);

  const bringCastCardToFront = (id) => {
    setCastMaxZ(prev => prev + 1);
    setCastZIndices(prev => ({ ...prev, [id]: castMaxZ + 1 }));
  };

  useEffect(() => {
    const shuffled = [...peopleData].sort(() => 0.5 - Math.random());
    setFeaturedCast(shuffled.slice(0, 5));
    const shuffledNotes = [...memoriesData].sort(() => 0.5 - Math.random());
    setRecentMemories(shuffledNotes.slice(0, 3));
  }, []);

  const stats = [
    { label: 'Batchmates', value: peopleData.length },
    { label: 'Events Logged', value: eventsData.length },
    { label: 'Memories Shared', value: memoriesData.length },
    { label: 'Years Together', value: timelineData.length }
  ];

  return (
    <PageTransition>
      <div className="relative overflow-hidden w-full">
        {/* Subtle background texture for the entire page overlaying global bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: "url('/textures/paper-grain.png')", mixBlendMode: "overlay", zIndex: 1 }}></div>

        {/* Hero Section */}
        <Hero />

        {/* Firefly Particles */}
        <div className="absolute inset-0 pointer-events-none z-10"><Fireflies count={35} /></div>

        {/* Intro Letter */}
        <LetterToBatch />

        {/* Quick Stats Summary - Vintage Tickets */}
        <section className="py-24 md:py-30 relative z-20">
          <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row-reverse items-center justify-between">

            <div className="w-full lg:w-[40%] relative">
              {/* Subtle Background Typography */}
              <div className="absolute -top-23 sm:-top-24 right-40 sm:-right-20  text-[10rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter">
                Stats
              </div>

              <h2 className="text-sm md:text-base font-sans font-semibold tracking-[0.3em] text-amber-500 uppercase mb-6 flex items-center gap-4 lg:justify-end">
                <span className="w-12 h-[1px] bg-amber-500/50 block lg:hidden"></span>
                The Math
                <span className="w-12 h-[1px] bg-amber-500/50 hidden lg:block"></span>
              </h2>

              <h3 className="text-6xl md:text-7xl lg:text-[6rem] font-['Caveat'] text-white/90 leading-tight mb-6 text-left lg:text-right tracking-wide drop-shadow-md">
                By The <span className="text-amber-500/90">Numbers</span>
              </h3>

              <p className="text-lg text-white/50 font-sans leading-relaxed max-w-md ml-auto text-left lg:text-right">
                A quick look back at the quantifiable moments of our journey together. Behind every number is a story.
              </p>
            </div>

            {/* Left Scattered Tickets */}
            <div className="w-full lg:w-[60%] relative min-h-[400px] flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none"></div>

              <DoodleHeart className="w-32 h-32 absolute -bottom-4 -left-4 lg:-left-12 opacity-30 -rotate-12 mix-blend-screen hidden lg:block" color="#F59E0B" />

              <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative z-10">
                {stats.map((stat, i) => (
                  <VintageStatTicket key={i} label={stat.label} value={stat.value} delay={i * 0.15} />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ── The Batch Soundtrack – Interactive Vinyl ── */}
        <div className="relative z-20">
          <BatchSoundtrack />
        </div>

        {/* Featured Cast Spotlight */}
        {featuredCast.length > 0 && (
          <section className="py-40 md:py-30 relative z-20">
            <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

              {/* Left Text */}
              <div className="w-full lg:w-[40%] relative">
                {/* Subtle Background Typography */}
                <div className="absolute -top-23 sm:-top-24 -left-11 sm:-left-20 text-[10rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter">
                  Cast
                </div>

                <h2 className="text-sm md:text-base font-sans font-semibold tracking-[0.3em] text-amber-500 uppercase mb-6 flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-amber-500/50 block"></span>
                  The Spotlight
                </h2>

                <h3 className="text-6xl md:text-7xl lg:text-[6rem] font-['Caveat'] text-white/90 leading-tight mb-6 tracking-wide drop-shadow-md">
                  Familiar <span className="text-amber-500/90">Faces</span>
                </h3>

                <p className="text-lg text-white/50 font-sans leading-relaxed max-w-md">
                  The people who turned a building into an experience, and ordinary days into unforgettable memories.
                </p>

                <div className="mt-12">
                  <Link to="/the-cast" className="group flex items-center gap-6 text-white/80 hover:text-amber-500 transition-colors w-fit">
                    <div className="w-14 h-14 rounded-full border border-white/20 group-hover:border-amber-500 flex items-center justify-center transition-colors">
                      <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                    <span className="font-sans text-sm tracking-[0.2em] uppercase font-semibold">Meet Everyone</span>
                  </Link>
                </div>
              </div>

              {/* Right Scattered Polaroids (Premium glass reflection) */}
              <div ref={castContainerRef} className="w-full lg:w-[60%] relative min-h-[500px] flex items-center justify-center lg:justify-end mt-6 lg:mt-0">
                {/* Optimized Radial Gradient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.04] to-transparent pointer-events-none"></div>

                <DoodleSparkle className="w-24 h-24 absolute top-10 -right-4 opacity-40 mix-blend-screen hidden lg:block z-10" color="#F59E0B" />

                <div className="flex flex-wrap justify-center gap-6 md:gap-8 relative z-10 lg:pl-10">
                  {featuredCast.map((person, idx) => (
                    <InteractiveCastCard
                      key={person.id || idx}
                      person={person}
                      idx={idx}
                      containerRef={castContainerRef}
                      currentZIndex={castZIndices[person.id || idx]}
                      updateZIndex={bringCastCardToFront}
                    />
                  ))}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* Countdown to Farewell */}
        <section className="py-6 md:py-30 relative z-20">
          <div className="max-w-[1400px] mx-auto px-4 flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-24">

            {/* Right Text */}
            <div className="w-full lg:w-[40%] relative">
              {/* Subtle Background Typography */}
              <div className="absolute -top-23 sm:-top-24 right-26 sm:-right-20 text-[10rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter">
                Clock
              </div>

              <h2 className="text-sm md:text-base font-sans font-semibold tracking-[0.3em] text-amber-500 uppercase mb-6 flex items-center gap-4 lg:justify-end">
                <span className="w-12 h-[1px] bg-amber-500/50 block lg:hidden"></span>
                Until Farewell
                <span className="w-12 h-[1px] bg-amber-500/50 hidden lg:block"></span>
              </h2>

              <h3 className="text-6xl md:text-7xl lg:text-[6rem] font-['Caveat'] text-white/90 leading-tight mb-6 text-left lg:text-right tracking-wide drop-shadow-md">
                The Final <span className="text-amber-500/90">Countdown</span>
              </h3>

              <p className="text-lg text-white/50 font-sans leading-relaxed max-w-md ml-auto text-left lg:text-right mb-8">
                Time left until we throw our caps and say our goodbyes. Every second passing is a moment we won't get back.
              </p>

              <p className="font-serif italic text-2xl text-amber-500/80 max-w-md ml-auto text-left lg:text-right font-light leading-relaxed">
                "Don't cry because it's over, smile because it happened."
              </p>
            </div>

            {/* Left Timer */}
            <div className="w-full lg:w-[60%] relative min-h-[400px] flex items-center justify-center lg:justify-start">
              {/* Optimized Radial Gradient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 to-transparent pointer-events-none blur-xl"></div>

              <DoodleSparkle className="w-24 h-24 absolute -top-10 -left-4 opacity-40 mix-blend-screen hidden lg:block z-10" color="#F59E0B" />
              <DoodleArrow className="w-24 h-24 absolute -bottom-10 right-10 opacity-30 rotate-[120deg] mix-blend-screen hidden lg:block z-10" color="#F59E0B" />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-2xl"
              >
                {/* Premium Clock Container */}
                <div className="relative bg-[#0f0b06]/90 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                  style={{
                    border: '1px solid rgba(245,158,11,0.2)',
                    boxShadow: '0 0 0 1px rgba(245,158,11,0.1), 0 25px 60px rgba(0,0,0,0.6)',
                    backgroundImage: "url('/textures/paper-grain.png')"
                  }}
                >
                  {/* Vintage details */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-amber-500/50 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-amber-500/50 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-amber-500/50 rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-amber-500/50 rounded-br-lg"></div>

                  <CountdownTimer />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Random Memories Corkboard */}
        <section className="py-24 md:py-30 relative z-20">
          <div className="max-w-[1400px] mx-auto px-4 text-center relative">

            <div className="absolute -top-16 sm:-top-24 right-47 sm:right-113 text-[8rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter">
              Notes
            </div>

            <DoodleArrow className="w-20 h-20 absolute top-0 left-0 md:left-20 opacity-40 -rotate-[120deg] mix-blend-screen hidden md:block" color="#F59E0B" />
            <h2 className="text-sm md:text-base font-sans font-semibold tracking-[0.3em] text-amber-500 uppercase mb-6 flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-amber-500/50 block"></span>
              From Our Highlights
              <span className="w-12 h-[1px] bg-amber-500/50 block"></span>
            </h2>
            <h3 className="text-6xl md:text-7xl lg:text-[6rem] font-['Caveat'] text-white/90 leading-tight mb-6 tracking-wide drop-shadow-md">
              Little Things We <span className="text-amber-500/90">Wrote</span>
            </h3>
            <p className="text-lg text-white/50 font-sans max-w-xl mx-auto mb-20">
              Words that stayed when everything else moved on. A glimpse into the thoughts we shared.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 max-w-6xl mx-auto mt-16 pb-16 px-6 overflow-visible">
              {recentMemories.map((post, idx) => (
                <StickyNoteMini key={post.id} post={post} index={idx} />
              ))}
            </div>

            <Link to="/our-notes" className="group inline-flex items-center gap-4 mt-12 font-sans tracking-[0.2em] uppercase text-sm font-semibold text-white/70 hover:text-amber-500 transition-colors">
              View all entries
              <span className="w-8 h-[1px] bg-white/30 group-hover:bg-amber-500 transition-colors block relative">
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-white/30 group-hover:border-amber-500 transform rotate-45 transition-colors"></span>
              </span>
            </Link>
          </div>
        </section>

        <div className="w-full flex justify-end px-4 md:px-12 pb-12 relative z-20">
          <ChapterNav chapterName="Chapters" path="/chapters" />
        </div>
      </div>
    </PageTransition>
  );
};

export default Prologue;

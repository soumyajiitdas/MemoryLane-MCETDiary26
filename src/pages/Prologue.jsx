import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/sections/Hero';
import BatchSoundtrack from '../components/sections/BatchSoundtrack';
import CountdownTimer from '../components/ui/CountdownTimer';
import SectionHeading from '../components/ui/SectionHeading';
import PageTransition from '../components/layout/PageTransition';
import ChapterNav from '../components/ui/ChapterNav';
import Fireflies from '../components/ui/Fireflies';
import PaperTear from '../components/ui/PaperTear';
import { DoodleHeart, DoodleSparkle, DoodleArrow, DoodleCrown } from '../components/ui/VintageDoodles';

// Data imports
import { peopleData } from '../data/cast';
import { eventsData } from '../data/moments';
import { memoriesData } from '../data/notes';
import { timelineData } from '../data/chapters';

// Vintage Ticket Card with Framer Motion
const VintageStatTicket = ({ label, value, delay }) => {
  const paperColor = '#eaddc5';
  // Stable tilt: computed once per mount, never re-randomized on re-render
  const tilt = useMemo(() => (Math.random() > 0.5 ? 1 : -1), []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.06, y: -7, rotate: 0, transition: { duration: 0.25, type: 'spring', damping: 15 } }}
      className="relative border border-[#d4c3a3] p-6 shadow-md flex flex-col items-center justify-center min-h-[140px] cursor-pointer glow-on-hover"
      style={{
        backgroundColor: paperColor,
        boxShadow: '2px 4px 20px rgba(0,0,0,0.25), inset 0 0 40px rgba(100,70,30,0.12)',
        backgroundImage: `radial-gradient(circle at 0 50%, transparent 6px, ${paperColor} 7px), radial-gradient(circle at 100% 50%, transparent 6px, ${paperColor} 7px)`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        transform: `rotate(${tilt}deg)`
      }}
    >
      <span className="text-4xl font-serif text-[#3e3222] mb-2 font-bold relative z-10" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {value}
      </span>
      <span className="text-xs uppercase tracking-widest font-sans text-[#7d6b52] font-semibold text-center z-10 relative">{label}</span>
      {/* Vintage stamp overlay */}
      <motion.div
        initial={{ scale: 1.8, rotate: -20, opacity: 0 }}
        whileInView={{ scale: 1, rotate: -15, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.3, type: 'spring', damping: 12 }}
        className="absolute top-1 right-1 w-[69px] h-[69px] border-[2.5px] border-red-800/40 rounded-full flex items-center justify-center z-20 mix-blend-multiply opacity-70 shadow-sm pointer-events-none"
      >
        <div className="border-[1.5px] border-dashed border-red-800/40 rounded-full w-[60px] h-[60px] flex items-center justify-center text-center leading-none">
          <span className="text-[10px] font-bold text-red-800/60 uppercase tracking-tighter block mt-0.5">
            MCET<br/>Batch'26<br/>★
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Reusable Sticky Note for Home Page with Framer Motion
const StickyNoteMini = ({ post, index }) => {
  const len = post.content?.length ?? 0;

  const textSize =
    len < 120 ? 'text-2xl' :
                'text-xl';

  const contentStyle = len > 330
    ? { maxHeight: '220px', overflowY: 'auto', paddingRight: '4px' }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: Math.floor(Math.random() * 10) - 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: Math.floor(Math.random() * 6) - 3 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', damping: 15 }}
      whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}
      style={{ backgroundImage: "url('/textures/rice-paper.png')" }}
      className="sticky-note paper-lift p-6 break-inside-avoid w-full max-w-sm mx-auto flex flex-col cursor-pointer"
    >

      {/* Ruled lines overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #6098cc 27px, #6098cc 28px)',
          backgroundSize: '100% 28px',
        }}
      />

      {/* Vintage Round Stamp */}
      <div className="absolute bottom-3 right-3 w-[72px] h-[72px] border-[2.5px] border-red-800/40 rounded-full flex items-center justify-center rotate-[-15deg] z-20 mix-blend-multiply opacity-60 shadow-sm pointer-events-none">
        <div className="border-[1.5px] border-dashed border-red-800/40 rounded-full w-[60px] h-[60px] flex items-center justify-center text-center leading-none">
          <span className="text-[10px] font-bold text-red-800/60 uppercase tracking-tighter block mt-0.5">
            MCET<br/>Diary'26<br/>★
          </span>
        </div>
      </div>
      <div className="push-pin -top-3" />

      <div
        data-photo="true"
        className={`font-['Caveat'] ${textSize} leading-relaxed text-[#2c3e50] w-full mt-4 styling-scrollbar`}
        style={contentStyle}
      >
        "{post.content}"
      </div>

      <div className="mt-6 w-full flex justify-between items-end border-t border-black/5 pt-4">
        <span className="font-['Caveat'] text-xl font-bold text-[#1e3a8a]">
          {post.author}
        </span>
        <span className="text-[11px] text-[#5D6574] font-sans tracking-widest uppercase font-medium">
          {new Date(post.timestamp).toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  );
};
const LetterToBatch = () => {
  return (
  <section className="py-15 relative z-10 px-3">
  <motion.div 
    initial={{ opacity: 0, y: 30, rotate: -2 }}
    whileInView={{ opacity: 1, y: 0, rotate: -2 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.8 }}
    className="max-w-3xl mx-auto p-10 md:p-16 relative bg-[#fdfbf7] text-[#2c3e50]"
    style={{
      boxShadow: '8px 20px 50px rgba(0,0,0,0.3), 4px 4px 0 rgba(0,0,0,0.04)',
      backgroundImage: "url('/textures/rice-paper.png')",
      backgroundSize: '100% 2.6rem',
      lineHeight: '2.6rem'
    }}
  >
    {/* Ruled lines overlay */}
    <div 
      className="absolute inset-0 opacity-40 pointer-events-none"
      style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #6098cc 27px, #6098cc 28px)',
          backgroundSize: '100% 28px',
      }}
    />

    {/* Red vertical margin lines */}
    <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-red-800/30 pointer-events-none" />
    <div className="absolute left-[34px] top-0 bottom-0 w-[1px] bg-red-800/20 pointer-events-none" />

    {/* Paper Tear from previous section */}
    <PaperTear color="#fdfbf7" className="opacity-75" />

    {/* Animated wax seal stamp */}
    <motion.div
      initial={{ scale: 1.8, rotate: -20, opacity: 0 }}
      whileInView={{ scale: 1, rotate: -15, opacity: 0.8 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.5, type: 'spring', damping: 12 }}
      className="absolute -top-1 -right-2 sm:top-3 sm:right-3 w-[72px] h-[72px] border-[2.5px] border-red-800/40 rounded-full flex items-center justify-center z-20 mix-blend-multiply opacity-80 shadow-md pointer-events-none"
    >
      <div className="border-[1.5px] border-dashed border-red-800/40 rounded-full w-[60px] h-[60px] flex items-center justify-center text-center leading-none">
        <span className="text-[10px] font-bold text-red-800/60 uppercase tracking-tighter block mt-0.5">
          MCET Diary'26
        </span>
      </div>
    </motion.div>

    {/* Title */}
    <h2 className="font-['Caveat'] text-4xl text-amber-900/80 border-b-2 border-amber-900/80 inline-block leading-tight">
      Dearest Batch of 2026,
    </h2>

    {/* Body */}
    <div className="mt-4 space-y-3 font-['Caveat'] pt-2 text-xl md:text-[26px] text-gray-900/80">

  <p>
      It feels unreal how something that began with unfamiliar faces and hesitant conversations has become a place that feels like home. We walked in carrying uncertainty, and somehow, without noticing, we built a world out of ordinary days. These years were never just about lectures, exams, or milestones, but the quiet, in-between moments - chai breaks, sleepless nights filled with unspoken thoughts.
  </p>

  <p className="text-amber-900/85 text-center">
    "What changes with every moment becomes truly beautiful."
  </p>

  <p>
    Maybe that's what we were, ever-changing, fleeting, yet deeply unforgettable.
    As we prepare to step onto different paths, it's okay to acknowledge that some of us may drift. Some friendships are meant to be a beautiful chapter rather than the whole book, but that doesn't make the chapter any less vital.
  </p>

  <p>
    We didn’t just spend these years… we lived them. Deeply, together.
    <span className='inline sm:block'> No matter where the road leads, these days will always be a part of us...</span>
  </p>

</div>

    {/* Signature */}
    <div className="mt-4 sm:mt-5 text-right">
      <span className="font-['Caveat'] text-xl font-medium md:text-2xl text-amber-900/85">
        — From the memories we made :)
      </span>
    </div>

  </motion.div>
</section>
  );
};


const Prologue = () => {
  // Page title for Lighthouse SEO score
  useEffect(() => { document.title = "MCET Diary'26 | Prologue - Where It Began"; }, []);

  const [featuredCast, setFeaturedCast] = useState([]);
  const [recentMemories, setRecentMemories] = useState([]);

  useEffect(() => {
    // Randomly pick 5 distinct batchmates on load
    const shuffled = [...peopleData].sort(() => 0.5 - Math.random());
    setFeaturedCast(shuffled.slice(0, 5));

    // Randomly pick 3 distinct notes on load
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

      {/* Firefly Particles */}
      <Fireflies count={40}/>

      {/* Hero Section */}
      <Hero />

      {/* Intro Letter */}
      <LetterToBatch />

      {/* Quick Stats Summary - Vintage Tickets */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="The Journey So Far"
            subtitle="A look back at everything we’ve been through."
            eyebrow="By the Numbers"
          />
          <DoodleHeart className="w-20 h-20 absolute top-13 right-7 sm:top-15 sm:left-135 opacity-80 -rotate-20" color="rgba(245, 158, 11, 0.6)" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mt-12">
            {stats.map((stat, i) => (
              <VintageStatTicket key={i} label={stat.label} value={stat.value} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── The Batch Soundtrack – Interactive Vinyl ── */}
      <BatchSoundtrack />

      {/* Featured Cast Spotlight */}
      {featuredCast.length > 0 && (
        <section className="py-24 relative z-10">

          <div className="max-w-7xl mx-auto px-4 text-center">
             <div className="relative inline-block">
               <SectionHeading
                 title="Familiar Faces"
                 subtitle="The people who made these years unforgettable."
                 eyebrow="Cast Spotlight"
               />
               <DoodleSparkle className="w-20 h-20 absolute -top-15 -right-1 sm:-top-10 sm:-right-16 opacity-80" color="rgba(245, 158, 11, 0.6)" />
             </div>
             
             <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-16 pb-8">
               {featuredCast.map((person, idx) => (
                 <motion.div
                   key={person.id || idx}
                   initial={{ opacity: 0, y: 40, rotate: (idx % 2 === 0 ? -4 : 4) }}
                   whileInView={{ opacity: 1, y: 0, rotate: (idx % 2 === 0 ? -2 : 2) }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.6, delay: idx * 0.15 }}
                   whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                   className="w-[calc(50%-0.5rem)] sm:w-40 md:w-48 bg-[#fdfbf7] p-2 sm:p-3 pb-4 sm:pb-6 shadow-xl border border-black/10 cursor-pointer flex flex-col justify-center"
                 >
                   <div 
                     data-photo="true"
                     className="w-full aspect-[4/5] bg-gray-200 mb-2 sm:mb-4 mix-blend-multiply border border-black/5"
                     style={{ 
                       background: person.photo.startsWith('linear') ? person.photo : `url(${person.photo}) center/cover no-repeat` 
                     }}
                   ></div>
                   <DoodleCrown className="w-16 h-16 absolute bottom-1 -top-11 -right-6 rotate-18 z-20 opacity-50" />
                   <h3 className="font-['Caveat'] text-xl sm:text-2xl text-amber-900 font-bold truncate">{`@${person.name.split(' ')[0]}`}</h3>
                   <p className="text-[10px] sm:text-xs text-amber-700/70 tracking-wider">{person.roll || "1060012****"}</p>
                 </motion.div>
               ))}
             </div>
             <Link to="/the-cast" className="relative inline-block mt-8 font-serif italic text-amber-500 hover:text-white transition-colors text-xl border-b border-amber-500/30 pb-1">
                Meet the full cast &rarr;
                <DoodleArrow className="w-16 h-16 absolute -right-20 top-0 opacity-80 rotate-90" color="rgba(200, 200, 200, 0.8)" />
             </Link>
          </div>
        </section>
      )}

      {/* Countdown to Farewell */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 relative z-10 mx-4 max-w-4xl md:mx-auto rounded-2xl overflow-hidden shadow-2xl my-12"
        style={{
          background: 'rgba(15, 11, 6, 0.97)',
          border: '1px solid rgba(245,158,11,0.2)',
          boxShadow: '0 0 0 1px rgba(245,158,11,0.1), 0 25px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Multi-layer glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.5), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }} />
        <div className="relative z-10 px-4">
           <SectionHeading
             title="The Final Countdown"
             subtitle="Time left until we throw our caps and say our goodbyes."
             eyebrow="Graduation Day"
           />
           <CountdownTimer />
           <p className="text-center font-['Caveat'] text-3xl text-amber-600 mt-12 drop-shadow-md">
              "Don't cry because it's over, smile because it happened."
           </p>
        </div>
      </motion.section>

      {/* Random Memories Corkboard */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeading
            title="Little Things We Wrote"
            subtitle="Words that stayed when everything else moved on."
            eyebrow="From Our Notes"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-16 pb-12">
            {recentMemories.map((post, idx) => (
              <StickyNoteMini key={post.id} post={post} index={idx} />
            ))}
          </div>

          <Link to="/our-notes" className="inline-block mt-8 font-serif italic text-amber-500 hover:text-white transition-colors text-xl border-b border-amber-500/30 pb-1">
             View all entries in Our Notes &rarr;
          </Link>
        </div>
      </section>

      <div className="w-full flex justify-end px-4 md:px-12 pb-12">
        <ChapterNav chapterName="Chapters" path="/chapters" />
      </div>
    </PageTransition>
  );
};

export default Prologue;

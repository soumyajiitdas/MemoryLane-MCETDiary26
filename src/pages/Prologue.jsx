import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import CountdownTimer from '../components/ui/CountdownTimer';
import SectionHeading from '../components/ui/SectionHeading';
import PageTransition from '../components/layout/PageTransition';
import ChapterNav from '../components/ui/ChapterNav';

// Data imports
import { peopleData } from '../data/batchmates';
import { eventsData } from '../data/moments';
import { memoriesData } from '../data/notes';
import { timelineData } from '../data/chapters';

// Updated Vintage Ticket Card with Framer Motion
const VintageStatTicket = ({ label, value, delay }) => {
  const paperColor = '#eaddc5'; // Aged parchment/cream color
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
      className="relative border border-[#d4c3a3] p-6 shadow-md flex flex-col items-center justify-center min-h-[140px] cursor-pointer"
      style={{
        backgroundColor: paperColor,
        boxShadow: "2px 4px 15px rgba(0,0,0,0.2), inset 0 0 40px rgba(100,70,30,0.15)",
        // Perforated edge illusion
        backgroundImage: `radial-gradient(circle at 0 50%, transparent 6px, ${paperColor} 7px), radial-gradient(circle at 100% 50%, transparent 6px, ${paperColor} 7px)`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        transform: `rotate(${Math.random() > 0.5 ? 1 : -1}deg)`
      }}
    >
        <span className="text-4xl font-serif text-[#3e3222] mb-2 font-bold">{value}</span>
        <span className="text-xs uppercase tracking-widest font-sans text-[#7d6b52] font-semibold text-center">{label}</span>
        {/* Vintage stamp overlay detail */}
        <div className="absolute opacity-60 border-2 border-[#b94a4a] rounded-full w-16 h-16 flex items-center justify-center rotate-12 top-2 right-2 pointer-events-none mix-blend-multiply">
           <span className="text-[10px] font-bold text-[#b94a4a] tracking-tighter uppercase">'26</span>
        </div>
    </motion.div>
  );
};

// Reusable Sticky Note for Home Page with Framer Motion
const StickyNoteMini = ({ post, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, rotate: Math.floor(Math.random() * 10) - 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: Math.floor(Math.random() * 6) - 3 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, type: 'spring', damping: 15 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className="sticky-note p-6 break-inside-avoid w-full max-w-sm mx-auto flex flex-col cursor-pointer"
    >
      <p className="font-['Caveat'] text-2xl leading-relaxed text-[#2c3e50] w-full mt-4">
         "{post.content}"
      </p>
      
      <div className="mt-6 w-full flex justify-between items-end border-t border-black/5 pt-4">
         <span className="font-['Caveat'] text-xl font-bold text-gray-800">
           {post.author}
         </span>
      </div>
    </motion.div>
  );
};

const Prologue = () => {
  const [featuredCast, setFeaturedCast] = useState([]);

  useEffect(() => {
    // Randomly pick 4 distinct batchmates on load
    const shuffled = [...peopleData].sort(() => 0.5 - Math.random());
    setFeaturedCast(shuffled.slice(0, 5));
  }, []);

  const recentMemories = memoriesData.slice(0, 3); // Get top 3 memories
  
  // Use the very latest event from eventsData
  const latestEvent = eventsData[eventsData.length - 1];

  const stats = [
    { label: 'Batchmates', value: peopleData.length },
    { label: 'Events Logged', value: eventsData.length },
    { label: 'Memories Shared', value: memoriesData.length },
    { label: 'Years Together', value: timelineData.length }
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <Hero />

      {/* Quick Stats Summary - Vintage Tickets */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="By The Numbers" subtitle="A quantifiable look at our unquantifiable memories." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mt-12">
            {stats.map((stat, i) => (
              <VintageStatTicket key={i} label={stat.label} value={stat.value} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cast Spotlight */}
      {featuredCast.length > 0 && (
        <section className="py-24 relative z-10">

          <div className="max-w-7xl mx-auto px-4 text-center">
             <SectionHeading title="Cast Spotlight" subtitle="Faces from the batch, randomly shuffled." />
             <div className="flex flex-wrap justify-center gap-6 mt-16 pb-8">
               {featuredCast.map((person, idx) => (
                 <motion.div
                   key={person.id || idx}
                   initial={{ opacity: 0, y: 40, rotate: (idx % 2 === 0 ? -4 : 4) }}
                   whileInView={{ opacity: 1, y: 0, rotate: (idx % 2 === 0 ? -2 : 2) }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.6, delay: idx * 0.15 }}
                   whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                   className="w-48 bg-[#fdfbf7] p-3 pb-6 shadow-xl border border-black/10 cursor-pointer"
                 >
                   <div 
                     className="w-full aspect-square bg-gray-200 mb-4 mix-blend-multiply border border-black/5"
                     style={{ 
                       background: person.photo.startsWith('linear') ? person.photo : `url(${person.photo}) center/cover no-repeat` 
                     }}
                   ></div>
                   <h3 className="font-['Caveat'] text-2xl text-amber-900 font-bold">{`@${person.name.split(' ')[0]}`}</h3>
                   {person.roll && <p className="text-xs text-amber-700/70 tracking-wider">{person.roll}</p>}
                 </motion.div>
               ))}
             </div>
             <a href="/the-cast" className="inline-block mt-8 font-serif italic text-amber-500 hover:text-white transition-colors text-xl border-b border-amber-500/30 pb-1">
                Meet the full cast &rarr;
             </a>
          </div>
        </section>
      )}

      {/* Countdown to Farewell */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 relative z-10 glass mx-4 max-w-4xl md:mx-auto rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 bg-[#15120e]/95 my-12"
      >
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full"></div>
        <div className="relative z-10 px-4">
           <SectionHeading title="The Final Countdown" subtitle="Time left until we throw our caps and say our goodbyes." />
           <CountdownTimer targetDate="2026-07-17T00:00:00" />
           <p className="text-center font-['Caveat'] text-3xl text-amber-400 mt-12 drop-shadow-md">
              "Don't cry because it's over, smile because it happened."
           </p>
        </div>
      </motion.section>

      {/* Recent Memories Corkboard */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeading title="Fresh Off The Notes" subtitle="The latest thoughts and reflections from the batch." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-16 pb-12">
            {recentMemories.map((post, idx) => (
              <StickyNoteMini key={post.id} post={post} index={idx} />
            ))}
          </div>

          <a href="/our-notes" className="inline-block mt-8 font-serif italic text-amber-500 hover:text-white transition-colors text-xl border-b border-amber-500/30 pb-1">
             View all entries in Our Notes &rarr;
          </a>
        </div>
      </section>

      <div className="w-full flex justify-end px-4 md:px-12 pb-12">
        <ChapterNav chapterName="Chapters" path="/chapters" />
      </div>
    </PageTransition>
  );
};

export default Prologue;

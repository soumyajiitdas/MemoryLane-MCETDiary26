import React from 'react';
import Hero from '../components/sections/Hero';
import CountdownTimer from '../components/ui/CountdownTimer';
import SectionHeading from '../components/ui/SectionHeading';
import PageTransition from '../components/layout/PageTransition';

// Data imports
import { peopleData } from '../data/people';
import { eventsData } from '../data/events';
import { memoriesData } from '../data/memories';
import { timelineData } from '../data/timeline';

// Updated Vintage Ticket Card
const VintageStatTicket = ({ label, value, delay }) => {
  const paperColor = '#eaddc5'; // Aged parchment/cream color
  return (
    <div 
      className="relative border border-[#d4c3a3] p-6 shadow-md flex flex-col items-center justify-center min-h-[140px]"
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
        <span className="text-xs uppercase tracking-widest font-sans text-[#7d6b52] font-semibold">{label}</span>
        {/* Vintage stamp overlay detail */}
        <div className="absolute opacity-60 border-2 border-[#b94a4a] rounded-full w-16 h-16 flex items-center justify-center rotate-12 top-2 right-2 pointer-events-none mix-blend-multiply">
           <span className="text-[10px] font-bold text-[#b94a4a] tracking-tighter uppercase">'26</span>
        </div>
    </div>
  );
};

// Reusable Sticky Note for Home Page
const StickyNoteMini = ({ post }) => {
  return (
    <div 
      className="sticky-note p-6 break-inside-avoid w-full max-w-sm mx-auto flex flex-col"
      style={{
        transform: `rotate(${Math.floor(Math.random() * 6) - 3}deg)`
      }}
    >
      <p className="font-['Caveat'] text-2xl leading-relaxed text-[#2c3e50] w-full mt-4">
         "{post.content}"
      </p>
      
      <div className="mt-6 w-full flex justify-between items-end border-t border-black/5 pt-4">
         <span className="font-['Caveat'] text-xl font-bold text-gray-800">
           {post.author}
         </span>
      </div>
    </div>
  );
};


const Home = () => {
  const recentMemories = memoriesData.slice(0, 3); // Get top 3 memories

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

      {/* Countdown to Farewell */}
      <section className="py-24 relative z-10 glass mx-4 rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-glass-border)] bg-[#100f0d]/80">
        <div className="absolute inset-0 bg-amber-500/5 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
           <SectionHeading title="The Final Countdown" subtitle="Time left until we throw our caps and say our goodbyes." />
           <CountdownTimer targetDate="2026-06-01T00:00:00" />
           <p className="text-center font-['Caveat'] text-3xl text-amber-500 mt-12">
              "Don't cry because it's over, smile because it happened."
           </p>
        </div>
      </section>

      {/* Recent Memories Corkboard */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeading title="Fresh Off The Wall" subtitle="The latest thoughts and reflections from the batch." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-16 pb-12">
            {recentMemories.map(post => (
              <StickyNoteMini key={post.id} post={post} />
            ))}
          </div>

          <a href="/memory-wall" className="inline-block mt-8 font-serif italic text-amber-500 hover:text-white transition-colors text-xl border-b border-amber-500/30 pb-1">
             View all notes on the Memory Wall &rarr;
          </a>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;

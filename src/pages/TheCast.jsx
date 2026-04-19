import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import MomentCard from '../components/sections/MomentCard';
import ChapterNav from '../components/ui/ChapterNav';
import { peopleData } from '../data/cast';
import { eventsData } from '../data/moments';
import Modal from '../components/ui/Modal';
import Fireflies from '../components/ui/Fireflies';
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { DoodleCrown } from '../components/ui/VintageDoodles';

// random bg color of Vintage masking tape
const bgColors = [
  "bg-yellow-200/50",
  "bg-red-200/50",
  "bg-green-200/50",
  "bg-blue-200/50"
];

const getRandomBg = () =>
  bgColors[Math.floor(Math.random() * bgColors.length)];

// Polaroid Component
const Polaroid = ({ person, onClick }) => {
  // Show a crown doodle for specific people or pseudo-randomly based on ID length/value
  const showCrown = (person.id % 3 === 0) || (person.id === 1);

  return (
    <motion.div
      whileHover={{ scale: 1.07, rotate: Math.random() > 0.5 ? 2 : -2, y: -8 }}
      transition={{ type: 'spring', stiffness: 360, damping: 22 }}
      layoutId={`person-${person.id}`}
      className="cursor-pointer bg-[#fdfaf3] p-3 pb-6 flex flex-col items-center border border-amber-900/10 relative"
      onClick={() => onClick(person)}
      style={{
        transform: `rotate(${Math.floor(Math.random() * 4) - 2}deg)`,
        backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper.png')",
        boxShadow: '3px 6px 20px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.15)',
      }}
    >

      {/* Masking tape */}
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${getRandomBg()} border border-white/20 shadow-sm z-10 backdrop-blur-sm`}
        style={{ transform: 'rotate(-2deg)' }}
      />

      {/* Crown doodle rendering above card */}
      {showCrown && (<DoodleCrown className="w-15 h-15 absolute -top-10 -right-5 rotate-15 z-20 opacity-80"  />)}

      <div
        className="w-full aspect-[4/5] bg-gray-200 shadow-inner bg-cover bg-center sepia-[0.15] contrast-[1.05]"
        style={{ backgroundImage: (person.photo?.startsWith('http') || person.photo?.startsWith('/')) ? `url('${person.photo}')` : person.photo }}
      >
        {/* Warm vignette overlay */}
        <div className="w-full h-full" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(120,60,10,0.12) 100%)' }} />
      </div>

      <div className="pt-4 w-full text-center relative">
        <h3 className="text-3xl font-['Caveat'] text-amber-950 font-medium tracking-wide">
          {person.name.split(' ')[0]}
        </h3>
        <p className="text-xs text-amber-900/60 uppercase tracking-widest mt-1 scale-90 font-semibold">
          {person.department}
        </p>
      </div>
    </motion.div>
  );
};

const TheCast = () => {
  const [view, setView] = useState('batchmates'); // 'batchmates' | 'events'
  const [selectedPerson, setSelectedPerson] = useState(null);

  const getSocialIcon = (network) => {
    switch (network) {
      case 'github': return <FaGithub size={20} />;
      case 'linkedin': return <FaLinkedin size={20} />;
      case 'instagram': return <FaInstagram size={20} />;
      default: return null;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="The Cast"
            subtitle="The faces and the events that made it all real. ❣️"
            eyebrow="MCETians"
          />

          {/* Firefly particles */}
          <Fireflies/>

          {/* Toggle Tab — smooth motion indicator */}
          <div className="flex justify-center mb-12">
            <div
              className="glass p-1 rounded-full inline-flex relative"
              style={{ border: '1px solid rgba(245,158,11,0.15)' }}
            >
              <button
                onClick={() => setView('batchmates')}
                className={`relative px-8 py-2.5 rounded-full text-sm font-serif font-medium transition-colors z-10 ${
                  view === 'batchmates'
                    ? 'text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {view === 'batchmates' && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Roll Call</span>
              </button>
              <button
                onClick={() => setView('events')}
                className={`relative px-8 py-2.5 rounded-full text-sm font-serif font-medium transition-colors z-10 ${
                  view === 'events'
                    ? 'text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {view === 'events' && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Events</span>
              </button>
            </div>
          </div>
          
          <p className="text-center font-['Caveat'] text-3xl text-[var(--color-text-muted)] mb-16 italic">
              " We didn't realize we were making memories, we just knew we were having fun. "
          </p>

          <AnimatePresence mode="wait">
            {view === 'batchmates' ? (
              <motion.div
                key="batchmates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-8"
              >
                {peopleData.map((person) => (
                   <div key={person.id} className="px-2">
                     <Polaroid person={person} onClick={setSelectedPerson} />
                   </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {eventsData.map((event) => (
                  <MomentCard key={event.id} event={event} onClick={() => {}} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between items-center w-full mt-20">
            <ChapterNav direction="prev" chapterName="Chapters" path="/chapters" />
            <ChapterNav direction="next" chapterName="Scrapbook" path="/scrapbook" />
          </div>
        </div>
      </div>

      {/* Vintage Scrapbook Page Modal */}
      <Modal 
        isOpen={!!selectedPerson} 
        onClose={() => setSelectedPerson(null)}
        maxWidth="max-w-2xl"
      >
        {selectedPerson && (
          <div className="w-full relative py-6 md:p-8 flex flex-col items-center overflow-hidden">
            {/* The main scrapbook paper background spanning the modal */}
            <div className="absolute inset-0 bg-[#f9f5eb] shadow-inner" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper.png')" }}>
              {/* Ruled lines overlay */}
              <div 
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #6098cc 27px, #6098cc 28px)",
                    backgroundSize: "100% 28px",
                }}
              ></div>
              {/* Red vertical margin line for classical notebook effect */}
              <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-red-800/20 pointer-events-none"></div>
              <div className="absolute left-[34px] top-0 bottom-0 w-[1px] bg-red-800/10 pointer-events-none"></div>
              {/* Vintage Round Stamp */}
        <div className="absolute top-3 right-3 w-[72px] h-[72px] border-[2.5px] border-red-800/40 rounded-full flex items-center justify-center rotate-[-15deg] z-20 mix-blend-multiply opacity-80 shadow-sm pointer-events-none">
           <div className="border-[1.5px] border-dashed border-red-800/40 rounded-full w-[60px] h-[60px] flex items-center justify-center text-center leading-none">
             <span className="text-[10px] font-bold text-red-800/60 uppercase tracking-tighter block mt-0.5">
               MCET<br/>Batch'26<br/>★
             </span>
           </div>
        </div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] opacity-20 mix-blend-overlay"></div>
            </div>

            {/* Scrapbook Content Container */}
            <div className="relative z-10 w-full flex flex-col md:flex-row gap-8 items-center md:items-start pt-4">
              
              {/* Left Column: Taped Photo */}
              <div className="relative w-64 flex-shrink-0">
                {/* Vintage Tape top left */}
                <div className="absolute -top-5 -left-4 z-20 w-20 h-6 bg-green-400/40 backdrop-blur-sm shadow-sm rotate-[-12deg] border border-black/5" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')" }} />
                {/* Vintage Tape bottom right */}
                <div className="absolute -bottom-4 -right-4 z-20 w-16 h-6 bg-amber-400/40 backdrop-blur-sm shadow-sm rotate-[15deg] border border-black/5" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')" }} />
                
                <div className="bg-[#fdfaf3] p-2 pb-6 shadow-[3px_5px_15px_rgba(0,0,0,0.25)] border border-[#d5d0c0] transform rotate-2">
                  <div 
                    className="w-full aspect-square sm:aspect-[3/4] relative contrast-100 saturate-[0.8] border border-black/20"
                    style={{ backgroundImage: (selectedPerson.photo?.startsWith('http') || selectedPerson.photo?.startsWith('/')) ? `url('${selectedPerson.photo}')` : selectedPerson.photo, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <DoodleCrown className="w-20 h-20 absolute -top-12 -right-6 rotate-18 z-20 opacity-80" color="rgba(255, 162, 0, 1)" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]"></div>
                  </div>
                  <p className="text-center font-['Caveat'] text-2xl text-[#4a4235] mt-3 opacity-90">{selectedPerson?.nickname?.trim()? `@${selectedPerson.nickname}`: `@${selectedPerson?.name?.split(' ')?.[0] || 'user'}'s shot📸`}</p>
                </div>
              </div>

              {/* Right Column: Details & Decor */}
              <div className="flex-1 flex flex-col justify-center h-full space-y-6 relative mt-4 md:mt-0 w-full px-4 md:px-0">
                
                {/* Title & Nickname area */}
                <div className="relative isolate">
                   <h2 className="text-5xl md:text-6xl font-['Caveat'] text-[#2c261e] font-bold leading-none mix-blend-multiply">
                     {selectedPerson.name}
                   </h2>
                   
                   <div className="flex items-center gap-3 mt-3">
                     {/* Torn paper scrap for nickname */}
                     <div className="relative inline-block bg-[#dbd4bf] px-3 py-1 shadow-sm transform -rotate-2 border border-black/5" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')" }}>
                       <span className="font-['Courier_New'] font-bold text-[#5c2415] text-sm md:text-base tracking-widest lowercase">
                         "{selectedPerson.roll || "1060012****"}"
                       </span>
                     </div>
                     <span className="font-['Inter'] font-semibold text-black/50 text-xs uppercase tracking-[0.2em] ml-2 mt-1">
                       {selectedPerson.department}
                     </span>
                   </div>
                </div>

                {/* Hand-written Note Area */}
                <div className="relative mt-8">
                  {/* Background ruled lines mimicking a torn notebook page */}
                  <div className="absolute -inset-4 bg-[#fdfaf1] shadow-[1px_2px_8px_rgba(0,0,0,0.1)] " style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(160, 200, 240, 0.4) 31px, rgba(160, 200, 240, 0.4) 32px)", backgroundSize: "100% 32px", clipPath: "polygon(0 0, 100% 2%, 98% 100%, 1% 97%)" }}></div>
                  
                  {/* Paperclip */}
                  <div className="absolute -top-6 right-8 w-4 h-12 border-2 border-zinc-400 rounded-full z-10" style={{ transform: "rotate(15deg)", background: "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)" }}></div>

                  <div className="relative z-10 py-6 px-4">
                    <p className="text-2xl text-[#1a1c29] font-['Caveat'] leading-[32px] pt-1 opacity-90">
                      " {selectedPerson.oneliner || "A familiar face from those moments that still linger."} "
                    </p>
                  </div>
                </div>

                {/* Social Stickers */}
                <div className="flex gap-4 right-0 justify-end md:justify-start w-full relative z-20">
                  {selectedPerson.socialLinks && Object.entries(selectedPerson.socialLinks).map(([network, url], idx) => {
                    if(!url || url === "#") return null;
                    const rotations = ['rotate-3', '-rotate-6', 'rotate-6'];
                    return (
                      <a 
                        key={network} 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-[#faf8f2] shadow-[1px_3px_5px_rgba(0,0,0,0.2)] border border-[#dcd8cc] flex items-center justify-center text-[#5c2415] hover:bg-[#5c2415] hover:text-[#faf8f2] transition-colors transform ${rotations[idx % rotations.length]}`}
                        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper.png')" }}
                        aria-label={network}
                      >
                        {getSocialIcon(network)}
                      </a>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>
        )}
      </Modal>

    </PageTransition>
  );
};

export default TheCast;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import EventCard from '../components/sections/MomentCard';
import ChapterNav from '../components/ui/ChapterNav';
import { peopleData } from '../data/batchmates';
import { eventsData } from '../data/moments';
import Modal from '../components/ui/Modal';
import { Code, Briefcase, Camera, MessageCircle } from 'lucide-react';

// Polaroid Component
const Polaroid = ({ person, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      layoutId={`person-${person.id}`}
      className="cursor-pointer bg-[#fdfbf7] p-3 pb-8 shadow-xl flex flex-col items-center border border-amber-900/10 relative"
      onClick={() => onClick(person)}
      style={{
         // slight organic rotation to each card inherently
         transform: `rotate(${Math.floor(Math.random() * 4) - 2}deg)`,
         backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')"
      }}
    >
      {/* Vintage masking tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/50 border border-white/20 shadow-sm z-10 backdrop-blur-sm" style={{ transform: "rotate(-2deg)" }} />
      
      <div 
        className="w-full aspect-[4/5] bg-gray-200 shadow-inner bg-cover bg-center sepia-[0.3] contrast-[1.1]"
        style={{ backgroundImage: person.photo?.startsWith('http') ? `url(${person.photo})` : person.photo }}
      >
        <div className="w-full h-full bg-amber-900/10 mix-blend-multiply"></div>
      </div>
      
      <div className="pt-5 w-full text-center relative">
         <h3 className="text-3xl font-['Caveat'] text-amber-950 font-medium tracking-wide">
           {person.name}
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
      case 'github': return <Code size={20} />;
      case 'linkedin': return <Briefcase size={20} />;
      case 'instagram': return <Camera size={20} />;
      case 'twitter': return <MessageCircle size={20} />;
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
          />

          {/* Toggle Tab */}
          <div className="flex justify-center mb-12">
            <div className="glass p-1 rounded-full inline-flex">
              <button
                onClick={() => setView('batchmates')}
                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                  view === 'batchmates' 
                    ? 'bg-[var(--color-amber)] text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Roll Call
              </button>
              <button
                onClick={() => setView('events')}
                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                  view === 'events' 
                    ? 'bg-[var(--color-amber)] text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Events
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
                className="columns-1 sm:columns-2 lg:columns-3 lg:gap-8 xl:columns-4 space-y-8"
              >
                {peopleData.map((person) => (
                   <div key={person.id} className="break-inside-avoid px-2">
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {eventsData.map((event) => (
                  <EventCard key={event.id} event={event} onClick={() => {}} />
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

      {/* Nostalgic Person Modal */}
      <Modal 
        isOpen={!!selectedPerson} 
        onClose={() => setSelectedPerson(null)}
        maxWidth="max-w-md"
      >
        {selectedPerson && (
          <div className="flex flex-col relative pb-4 px-2">
            
            {/* Scrapbook photo frame */}
            <div className="relative mb-10 -mt-6">
              {/* Tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-amber-100/30 border border-white/10 shadow-sm z-20 backdrop-blur-md" style={{ transform: "rotate(3deg)" }} />
              
              <div className="p-3 pb-8 bg-[#fdfbf7] shadow-2xl relative rounded-sm transform rotate-1" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')" }}>
                
                <div 
                  className="h-64 w-full relative bg-cover bg-center shadow-inner sepia-[0.2] contrast-[1.05]"
                  style={{ backgroundImage: selectedPerson.photo?.startsWith('http') ? `url(${selectedPerson.photo})` : selectedPerson.photo }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-amber-900/10 to-transparent mix-blend-multiply" />
                  
                  {/* Float social links on the edge of the banner */}
                  <div className="absolute -bottom-5 right-4 flex justify-end gap-3 z-10">
                    {selectedPerson.socialLinks && Object.entries(selectedPerson.socialLinks).map(([network, url]) => {
                      if(url === "#" || !url) return null;
                      return (
                        <a 
                          key={network} 
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-amber-50 border border-amber-900/20 flex items-center justify-center text-amber-900 hover:bg-amber-500 hover:text-amber-50 hover:scale-110 transition-all shadow-lg"
                          aria-label={network}
                        >
                          {getSocialIcon(network)}
                        </a>
                      );
                    })}
                  </div>
                </div>
                
                <h2 className="text-4xl font-['Caveat'] text-amber-950 mt-4 ml-2">{selectedPerson.name}</h2>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-3 mb-6 relative z-10">
               <span className="px-3 py-1 rounded-sm bg-amber-500/20 text-amber-300 text-sm font-medium border border-amber-500/20 shadow-inner rotate-[-1deg]">
                 "{selectedPerson.nickname}"
               </span>
               <span className="text-amber-500/30 text-sm">|</span>
               <span className="text-amber-200/70 text-xs uppercase tracking-widest font-semibold">{selectedPerson.department}</span>
            </div>
            
            <div className="bg-[#1a1510] rounded-sm p-6 relative overflow-hidden shadow-lg border-l-4 border-amber-500/80">
              <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')" }}></div>
              <p className="text-xl text-amber-100/90 font-['Caveat'] leading-relaxed relative z-10 tracking-wide">
                 "{selectedPerson.oneliner}"
              </p>
              {/* Subtle quote decoration */}
              <span className="absolute -bottom-6 -right-2 text-7xl text-amber-500/10 font-serif select-none pointer-events-none">
                "
              </span>
            </div>
            
          </div>
        )}
      </Modal>

    </PageTransition>
  );
};

export default TheCast;

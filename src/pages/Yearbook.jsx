import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import EventCard from '../components/sections/EventCard';
import { peopleData } from '../data/people';
import { eventsData } from '../data/events';
import Modal from '../components/ui/Modal';
import { Code, Briefcase, Camera, MessageCircle } from 'lucide-react';

// Polaroid Component
const Polaroid = ({ person, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      layoutId={`person-${person.id}`}
      className="cursor-pointer bg-white p-3 shadow-xl flex flex-col items-center border border-gray-200"
      onClick={() => onClick(person)}
      style={{
         // slight organic rotation to each card inherently
         transform: `rotate(${Math.floor(Math.random() * 4) - 2}deg)`
      }}
    >
      <div 
        className="w-full aspect-[4/5] bg-gray-200 shadow-inner bg-cover bg-center"
        style={{ backgroundImage: person.photo?.startsWith('http') ? `url(${person.photo})` : person.photo }}
      >
        <div className="w-full h-full bg-black/5 mix-blend-multiply"></div>
      </div>
      
      <div className="py-4 w-full text-center">
         <h3 className="text-3xl font-['Caveat'] text-gray-800 font-medium tracking-wide">
           {person.name}
         </h3>
         <p className="text-sm text-gray-500 uppercase tracking-widest mt-1 scale-90">
           {person.department}
         </p>
      </div>
    </motion.div>
  );
};

const Yearbook = () => {
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
            title="Yearbook" 
            subtitle="The people and moments that defined our legacy."
          />

          {/* Toggle Tab */}
          <div className="flex justify-center mb-8">
            <div className="glass p-1 rounded-full inline-flex">
              <button
                onClick={() => setView('batchmates')}
                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                  view === 'batchmates' 
                    ? 'bg-[var(--color-amber)] text-black shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Batchmates
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
              "We didn't realize we were making memories, we just knew we were having fun."
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
        </div>
      </div>

      {/* Legacy Person Modal (Updated slightly for aesthetic consistency) */}
      <Modal 
        isOpen={!!selectedPerson} 
        onClose={() => setSelectedPerson(null)}
        maxWidth="max-w-md"
      >
        {selectedPerson && (
          <div className="flex flex-col">
            <div 
              className="h-48 -mt-6 -mx-6 mb-6 relative bg-cover bg-center"
              style={{ backgroundImage: selectedPerson.photo?.startsWith('http') ? `url(${selectedPerson.photo})` : selectedPerson.photo }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent" />
            </div>

            <h2 className="text-4xl font-['Caveat'] text-white mb-1">{selectedPerson.name}</h2>
            <p className="text-amber-500 font-medium mb-4">"{selectedPerson.nickname}"</p>
            
            <div className="space-y-4 text-sm text-gray-300">
              <p><strong className="text-white">Department:</strong> {selectedPerson.department}</p>
              <p><strong className="text-white">Fun Fact:</strong> {selectedPerson.funFact}</p>
              <p><strong className="text-white">Favorite Memory:</strong> {selectedPerson.memory}</p>
            </div>
          </div>
        )}
      </Modal>

    </PageTransition>
  );
};

export default Yearbook;

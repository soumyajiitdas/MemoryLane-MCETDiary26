import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';

const ProfileCard = ({ person, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      layoutId={`profile-card-${person.id}`}
      className="cursor-pointer h-full"
      onClick={() => onClick(person)}
    >
      <GlassCard className="h-full flex flex-col p-0 overflow-hidden group">
        {/* Photo area with placeholder gradient */}
        <div 
          className="h-48 w-full relative"
          style={{ background: person.photo }}
        >
           {/* Gradient overlay for effect */}
           <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] to-transparent pointer-events-none opacity-80" />
           
           <div className="absolute bottom-4 left-4 z-10">
              <h3 className="text-2xl font-serif text-white group-hover:text-[var(--color-amber-light)] transition-colors">
                {person.name}
              </h3>
              <span className="text-sm font-medium text-amber-500 bg-black/40 px-2 py-0.5 rounded backdrop-blur-md">
                "{person.nickname}"
              </span>
           </div>
        </div>

        {/* Info area */}
        <div className="p-5 flex-grow flex flex-col">
          <p className="text-[var(--color-text-muted)] text-sm mb-3">
            {person.department}
          </p>
          <div className="mt-auto">
            <p className="text-sm text-gray-300 italic line-clamp-2">
              <span className="text-amber-500 font-bold mr-1">💡 Fun fact:</span>
              {person.funFact}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default ProfileCard;

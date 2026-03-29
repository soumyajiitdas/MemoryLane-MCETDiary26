import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Briefcase, Code, Star } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const AchievementCard = ({ achievement }) => {
  const getIcon = () => {
    switch (achievement.icon) {
      case 'Trophy': return <Trophy className="text-amber-500 w-8 h-8" />;
      case 'Briefcase': return <Briefcase className="text-blue-400 w-8 h-8" />;
      case 'Code': return <Code className="text-green-400 w-8 h-8" />;
      default: return <Star className="text-amber-400 w-8 h-8" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <GlassCard className="h-full flex flex-col items-center text-center group">
        <div className="w-16 h-16 rounded-full glass mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-[var(--color-amber-glow)] bg-black/20 text-blue-500">
          {getIcon()}
        </div>
        
        <div className="px-3 py-1 text-xs rounded-full bg-[var(--color-glass)] text-[var(--color-text-muted)] mb-4 uppercase tracking-wider">
          {achievement.category}
        </div>
        
        <h3 className="text-xl md:text-2xl font-serif text-white mb-2">{achievement.title}</h3>
        <p className="text-amber-500 font-medium mb-4">{achievement.person}</p>
        
        <p className="text-gray-400 text-sm mt-auto">
          {achievement.description}
        </p>
      </GlassCard>
    </motion.div>
  );
};

export default AchievementCard;

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const OnThisDay = ({ memory }) => {
  if (!memory) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <GlassCard className="border-[var(--color-amber-glow)] bg-amber-900/10">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/20 rounded-lg text-amber-500">
            <CalendarDays size={24} />
          </div>
          <div>
            <h3 className="text-lg font-serif text-white mb-1">On This Day</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-3">{new Date(memory.timestamp).getFullYear()}</p>
            <p className="text-gray-300 italic text-sm border-l-2 border-amber-500 pl-3">
              "{memory.content}"
            </p>
            <p className="text-xs text-amber-500/70 mt-2">— {memory.author}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default OnThisDay;

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Code2 } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import GlassCard from '../components/ui/GlassCard';

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen py-24 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <SectionHeading 
            title="About Memory Lane" 
            subtitle="Why we built this archive."
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <GlassCard className="p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Heart size={100} className="text-amber-500" />
              </div>
              <h3 className="text-3xl font-serif text-amber-500 mb-6 relative z-10">The Purpose</h3>
              <p className="text-lg text-gray-300 leading-relaxed font-light relative z-10">
                Four years pass by in the blink of an eye. From the chaotic first days of orientation to the bittersweet hours of farewells, our batch—2022 to 2026—shared a journey unlike any other.
              </p>
              <br />
              <p className="text-lg text-gray-300 leading-relaxed font-light relative z-10">
                Memory Lane was created not just as a website, but as a digital time capsule. A sanctuary where we can look back at who we were, what we achieved, and the unforgettable moments we lived together.
              </p>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GlassCard className="p-8">
                <h4 className="text-xl font-serif text-white mb-4">A Note to the Batch</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 italic">
                  "Wherever life takes us next, remember the late-night study sessions, the endless fest prep, and that one bench where we solved all the world's problems. You are entirely up to you."
                </p>
              </GlassCard>

              <GlassCard className="p-8 flex flex-col justify-center items-center text-center">
                <Code2 size={40} className="text-amber-500 mb-4" />
                <h4 className="text-xl font-serif text-white mb-2">Built by Batch '26</h4>
                <p className="text-[var(--color-text-muted)] text-sm mb-4">
                  Open-source architecture entirely designed and developed to preserve our legacy.
                </p>
                <div className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-medium">
                  v1.0.0
                </div>
              </GlassCard>
            </div>
            
            <div className="mt-16 text-center text-[var(--color-text-muted)] text-sm border-t border-[var(--color-glass-border)] pt-8">
              <p>Disclaimer: This is a private archive intended only for the Batch 2022–2026.</p>
              <p className="mt-2">Content curated with ❤️.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;

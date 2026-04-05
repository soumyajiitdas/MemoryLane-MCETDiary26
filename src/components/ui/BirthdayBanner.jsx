import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { peopleData } from '../../data/cast';
import ReactConfetti from 'react-confetti';

const BirthdayBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [birthdayNames, setBirthdayNames] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Get today's date in MM-DD format
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayString = `${mm}-${dd}`;

    const bdayPeople = peopleData
      .filter(person => person.birthday === todayString)
      .map(p => p.name.split(' ')[0]); // Get only first name
      
    setBirthdayNames(bdayPeople);

    // Get window size for Confetti
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
       setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (birthdayNames.length === 0) return null;

  const namesString = birthdayNames.length === 1 
    ? birthdayNames[0] 
    : birthdayNames.length === 2 
      ? `${birthdayNames[0]} & ${birthdayNames[1]}` 
      : `${birthdayNames.slice(0, -1).join(', ')} & ${birthdayNames[birthdayNames.length - 1]}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Confetti floating over the entire screen */}
          <div className="fixed inset-0 pointer-events-none z-[90]">
            <ReactConfetti 
              width={windowDimensions.width} 
              height={windowDimensions.height} 
              recycle={false} 
              numberOfPieces={400} 
              gravity={0.15}
              colors={['#f59e0b', '#fbbf24', '#d97706', '#ef4444', '#10b981', '#3b82f6']}
            />
          </div>

          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="relative w-full z-[100]"
          >
            {/* Main sticky banner */}
            <div className="px-4 py-3 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] bg-[#FEB05D]/90 shadow-xl border-b-2 border-amber-900/20 overflow-hidden relative">
              <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-3 w-full justify-center">
                  <Gift className="text-amber-800 animate-bounce" size={24} strokeWidth={2} />
                  <p className="text-amber-950 font-['Caveat'] text-xl md:text-2xl text-center">
                    Happy Birthday <span className="font-bold border-b-2 border-amber-800/40 pb-0.5 mx-1">{namesString}</span>! Wishing you endless success and happiness...🎂
                  </p>
                </div>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-amber-900/60 hover:text-amber-900 transition-colors rounded-full hover:bg-amber-900/10 p-1.5 flex-shrink-0"
                  aria-label="Close banner"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BirthdayBanner;

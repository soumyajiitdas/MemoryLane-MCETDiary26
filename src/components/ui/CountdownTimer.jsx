import React, { useState, useEffect } from 'react';

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

const NumberBox = ({ num, label }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-1 sm:mx-3">
      <div className="glass w-16 h-16 sm:w-24 sm:h-24 rounded-lg sm:rounded-2xl flex items-center justify-center relative overflow-hidden group">
        {/* Decorative inner gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
        
        <span className="text-3xl sm:text-5xl font-bold font-serif text-white relative z-10 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
          {formatTime(num)}
        </span>
        
        {/* Split line effect for flip-clock look */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30 z-20"></div>
      </div>
      <span className="text-xs sm:text-sm uppercase font-serif tracking-widest text-[#9CA3AF] mt-3 font-medium">
        {label}
      </span>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center justify-center">
      <NumberBox num={timeLeft.days} label="Days" />
      <div className="text-2xl sm:text-4xl font-light text-amber-500/50 -mt-8">:</div>
      <NumberBox num={timeLeft.hours} label="Hours" />
      <div className="text-2xl sm:text-4xl font-light text-amber-500/50 -mt-8">:</div>
      <NumberBox num={timeLeft.minutes} label="Mins" />
      <div className="text-2xl sm:text-4xl font-light text-amber-500/50 -mt-8">:</div>
      <NumberBox num={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default CountdownTimer;

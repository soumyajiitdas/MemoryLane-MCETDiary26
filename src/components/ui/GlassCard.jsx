import React from 'react';

const GlassCard = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`glass rounded-xl p-6 transition-all duration-300 ${
        hover ? 'hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)] hover:border-[var(--color-amber-glow)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;

import React from 'react';

/**
 * PaperTear
 * 
 * A reusable component that creates a realistic, jagged torn paper edge.
 * Should be placed inside a relative container where it will attach to the top edge 
 * and extend upwards.
 * 
 * @param {string} color - The CSS color of the torn edge (should match the container's background)
 * @param {boolean} flip - If true, flips the tear upside down
 * @param {string} className - Additional CSS classes
 */
const PaperTear = ({ color = "#fdfbf7", flip = false, className = "" }) => {
  return (
    <div 
      className={`absolute left-0 w-full z-20 pointer-events-none drop-shadow-sm ${flip ? 'bottom-0 translate-y-full rotate-180' : 'top-0 transform -translate-y-full'} ${className}`} 
      style={{ height: '24px' }}
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-full block"
        aria-hidden="true"
      >
        {/* Jagged sharp path simulating the paper rip. */}
        <path
          d="M0,40 L0,15 L30,25 L75,10 L110,25 L160,5 L220,30 L270,15 L320,32 L380,10 L440,25 L490,5 L550,22 L600,10 L640,30 L710,12 L770,25 L830,5 L890,30 L950,15 L1010,28 L1060,8 L1110,32 L1160,15 L1200,25 L1200,40 Z"
          fill={color}
        />
        {/* Faint subtle edge line running along the tear for texture */}
        <path
            d="M0,15 L30,25 L75,10 L110,25 L160,5 L220,30 L270,15 L320,32 L380,10 L440,25 L490,5 L550,22 L600,10 L640,30 L710,12 L770,25 L830,5 L890,30 L950,15 L1010,28 L1060,8 L1110,32 L1160,15 L1200,25"
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1.5"
          />
      </svg>
    </div>
  );
};

export default PaperTear;

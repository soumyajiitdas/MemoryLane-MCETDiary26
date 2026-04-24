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
const PaperTear = ({ color = "#fdfbf7", flip = false, className = "", strokeColor = "rgba(0,0,0,0.06)", height = "24px", dense = false }) => {
  
  // Standard 24-point jagged path
  const stdFill = "M0,40 L0,15 L30,25 L75,10 L110,25 L160,5 L220,30 L270,15 L320,32 L380,10 L440,25 L490,5 L550,22 L600,10 L640,30 L710,12 L770,25 L830,5 L890,30 L950,15 L1010,28 L1060,8 L1110,32 L1160,15 L1200,25 L1200,40 Z";
  const stdStroke = "M0,15 L30,25 L75,10 L110,25 L160,5 L220,30 L270,15 L320,32 L380,10 L440,25 L490,5 L550,22 L600,10 L640,30 L710,12 L770,25 L830,5 L890,30 L950,15 L1010,28 L1060,8 L1110,32 L1160,15 L1200,25";

  // Dense 48-point jagged path (doubles the number of clefts)
  const denseFill = "M0,40 L0,15 L15,25 L37.5,10 L55,25 L80,5 L110,30 L135,15 L160,32 L190,10 L220,25 L245,5 L275,22 L300,10 L320,30 L355,12 L385,25 L415,5 L445,30 L475,15 L505,28 L530,8 L555,32 L580,15 L600,25 L615,25 L637.5,10 L655,25 L680,5 L710,30 L735,15 L760,32 L790,10 L820,25 L845,5 L875,22 L900,10 L920,30 L955,12 L985,25 L1015,5 L1045,30 L1075,15 L1105,28 L1130,8 L1155,32 L1180,15 L1200,25 L1200,40 Z";
  const denseStroke = "M0,15 L15,25 L37.5,10 L55,25 L80,5 L110,30 L135,15 L160,32 L190,10 L220,25 L245,5 L275,22 L300,10 L320,30 L355,12 L385,25 L415,5 L445,30 L475,15 L505,28 L530,8 L555,32 L580,15 L600,25 L615,25 L637.5,10 L655,25 L680,5 L710,30 L735,15 L760,32 L790,10 L820,25 L845,5 L875,22 L900,10 L920,30 L955,12 L985,25 L1015,5 L1045,30 L1075,15 L1105,28 L1130,8 L1155,32 L1180,15 L1200,25";

  return (
    <div 
      className={`absolute left-0 w-full z-20 pointer-events-none drop-shadow-sm ${flip ? 'bottom-0 translate-y-full rotate-180' : 'top-0 transform -translate-y-full'} ${className}`} 
      style={{ height }}
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <path
          d={dense ? denseFill : stdFill}
          fill={color}
        />
        <path
          d={dense ? denseStroke : stdStroke}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default PaperTear;

import React from 'react';

const defaultColor = "rgba(200, 200, 200, 0.8)"; // 80% opacity pencil sketch color

export const DoodleArrow = ({ className, color = defaultColor, style }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute pointer-events-none ${className}`} 
    style={style}
    fill="none" 
    stroke={color} 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Messy sketched arrow pointing top-right */}
    <path d="M20,80 Q40,65 75,30 M70,35 L80,25 L65,20 M18,82 Q38,63 73,32" />
  </svg>
);

export const DoodleHeart = ({ className, color = defaultColor, style }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute pointer-events-none ${className}`} 
    style={style}
    fill="none" 
    stroke={color} 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Messy heart with distinct overlapping lines */}
    <path d="M50,85 Q20,50 25,25 Q30,5 50,25 Q70,5 75,25 Q80,50 50,85 M50,82 Q22,50 28,28 Q32,10 50,28 Q68,10 72,28 Q78,50 50,82" />
  </svg>
);

export const DoodleCrown = ({ className, color = defaultColor, style }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute pointer-events-none ${className}`} 
    style={style}
    fill="none" 
    stroke={color} 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Sketchy 3-point crown */}
    <path d="M10,80 L20,30 L40,60 L50,20 L60,60 L80,30 L90,80 Z M12,78 L22,32 L40,58 L52,22 L60,58 L78,32 L88,78 Z" />
    <path d="M10,85 L90,85 M12,82 L88,82" />
  </svg>
);

export const DoodleCircle = ({ className, color = defaultColor, style }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute pointer-events-none ${className}`} 
    style={style}
    fill="none" 
    stroke={color} 
    strokeWidth="1.5" 
    strokeLinecap="round" 
  >
    {/* Messy overlapping circle representing a selection/highlight */}
    <path d="M10,50 Q10,10 50,10 Q90,10 90,50 Q90,90 50,90 Q20,90 20,55 Q15,15 55,15" />
    <path d="M12,52 Q12,12 52,12 Q88,12 88,52 Q88,88 52,88 Q22,88 22,57" />
  </svg>
);

export const DoodleSparkle = ({ className, color = defaultColor, style }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute pointer-events-none ${className}`} 
    style={style}
    fill="none" 
    stroke={color} 
    strokeWidth="1.5" 
    strokeLinecap="round" 
  >
    {/* Simple 4-point cross star drawn roughly */}
    <path d="M50,10 L50,90 M48,15 L48,85 M10,50 L90,50 M15,48 L85,48 M30,30 L70,70 M70,30 L30,70" />
  </svg>
);

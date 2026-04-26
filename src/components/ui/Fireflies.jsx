import React, { useMemo } from 'react';

// Firefly generator
const generateFireflies = (count = 20) =>
  Array.from({ length: count }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    '--duration': `${8 + Math.random() * 8}s`,
    '--delay': `${Math.random() * 5}s`,
    width: `${3 + Math.random() * 3}px`,
    height: `${3 + Math.random() * 3}px`,
  }));

export default function Fireflies({ count = 15 }) {
  // Prevent regeneration on every render
  const firefliesConfig = useMemo(() => generateFireflies(count), [count]);

  return (
    <div className="fireflies-container">
      {firefliesConfig.map((style, i) => (
        <div key={i} className="firefly" style={style} aria-hidden="true" />
      ))}
    </div>
  );
}
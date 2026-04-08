import { useState, useEffect } from "react";

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
  let ticking = false;

  const updateScroll = () => {
    setScrollY(window.scrollY);
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return scrollY;
};
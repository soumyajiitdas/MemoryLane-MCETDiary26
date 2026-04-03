import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

// ── Tracklist — single source of truth ────────────────────────────────────────
export const TRACKLIST = [
  {
    track: '01',
    title: "End of the Beginning",
    feat: "DJO",
    duration: "3:00 min",
    src: '/music/background-music.m4a',
  },
  {
    track: '02',
    title: "Yaariyaan",
    feat: "Cocktail",
    duration: "4:25 min",
    src: '/music/background-music_02.mp3',
  },
];

// ── Context ───────────────────────────────────────────────────────────────────
const PlayerContext = createContext(null);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside <PlayerProvider>');
  return ctx;
};

// ── Provider — mounts ONCE, never unmounts ────────────────────────────────────
export const PlayerProvider = ({ children }) => {
  const audioRef       = useRef(null);
  const [activeTrack,  setActiveTrack]  = useState(null);   // index | null
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [revealed,     setRevealed]     = useState(false);  // vinyl playlist visible

  // Lazily create the Audio element once
  if (!audioRef.current) {
    audioRef.current = new Audio();
    audioRef.current.preload = 'none';
  }

  // Sync state with native audio events
  useEffect(() => {
    const audio = audioRef.current;
    const onPlay  = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setActiveTrack(prev => {
        const next = (prev === null ? 0 : prev + 1) % TRACKLIST.length; // wrap around
        audio.src = TRACKLIST[next].src;
        audio.load();
        audio.play().catch(() => {});
        return next;
      });
    };
    audio.addEventListener('play',  onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('play',  onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // ── Actions ────────────────────────────────────────────────────────────────

  /** Play a track by index, or toggle if it's already active */
  const playTrack = useCallback((idx) => {
    const audio = audioRef.current;
    if (activeTrack === idx) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
      }
    } else {
      audio.pause();
      audio.src = TRACKLIST[idx].src;
      audio.load();
      audio.currentTime = 0;
      setActiveTrack(idx);
      audio.play().catch(() => {});
    }
  }, [activeTrack, isPlaying]);

  /** Toggle the vinyl reveal: open → play track 0; close → stop + hide */
  const toggleVinyl = useCallback(() => {
    const audio = audioRef.current;
    if (!revealed) {
      audio.src = TRACKLIST[0].src;
      audio.load();
      audio.currentTime = 0;
      setActiveTrack(0);
      setRevealed(true);
      audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setActiveTrack(null);
      setRevealed(false);
    }
  }, [revealed]);

  /** Stop playback entirely */
  const stop = useCallback(() => {
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setActiveTrack(null);
    setRevealed(false);
  }, []);

  const currentTrack = activeTrack !== null ? TRACKLIST[activeTrack] : null;

  return (
    <PlayerContext.Provider value={{
      TRACKLIST,
      activeTrack,
      isPlaying,
      revealed,
      currentTrack,
      playTrack,
      toggleVinyl,
      stop,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

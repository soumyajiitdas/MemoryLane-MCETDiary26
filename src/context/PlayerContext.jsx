import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

// ── Tracklist — single source of truth ────────────────────────────────────────
export const TRACKLIST = [
  {
    track: '01',
    title: "Yaariyaan",
    feat: "Cocktail",
    duration: "4:25 min",
    src: '/music/background-music.mp3',
  },
  {
    track: '02',
    title: "End of the Beginning",
    feat: "DJO",
    duration: "3:00 min",
    src: '/music/background-music_02.m4a',
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
  const [activeTrack,  setActiveTrack]  = useState(null);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [revealed,     setRevealed]     = useState(false);
  const [isResetting,  setIsResetting]  = useState(false); // disc momentarily reset to 0°

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
      // Brief reset, then play next track
      setIsResetting(true);
      setActiveTrack(prev => {
        const next = (prev === null ? 0 : prev + 1) % TRACKLIST.length;
        setTimeout(() => {
          const audio = audioRef.current;
          audio.src = TRACKLIST[next].src;
          audio.load();
          audio.play().catch(() => {});
          setIsResetting(false);
        }, 300); // 300ms reset window — disc returns to 0° then spins
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
      // Same track — toggle
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {});
        // isPlaying set by native 'play' event — no manual set needed
      }
    } else {
      // Different track — reset disc then play
      setIsResetting(true);
      audio.pause();
      setActiveTrack(idx);
      setTimeout(() => {
        audio.src = TRACKLIST[idx].src;
        audio.load();
        audio.currentTime = 0;
        audio.play().catch(() => {});
        setIsResetting(false);
      }, 300);
    }
  }, [activeTrack, isPlaying]);

  /** Toggle the vinyl reveal: open → play track 0; close → stop + hide */
  const toggleVinyl = useCallback(() => {
    const audio = audioRef.current;
    if (!revealed) {
      // Open — reset disc to 0° then start playing
      setIsResetting(true);
      setActiveTrack(0);
      setRevealed(true);
      setTimeout(() => {
        audio.src = TRACKLIST[0].src;
        audio.load();
        audio.currentTime = 0;
        audio.play().catch(() => {});
        setIsResetting(false);
        // isPlaying is set by the native 'play' event — no early spin
      }, 250);
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
      isResetting,
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

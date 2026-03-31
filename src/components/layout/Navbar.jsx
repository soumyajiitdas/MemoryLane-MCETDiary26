import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isMusicPlaying) {
      audio.volume = 0;
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          let vol = 0;
          const fade = setInterval(() => {
            if (vol < 0.2) {
              vol = Math.min(vol + 0.02, 0.2);
              audio.volume = vol;
            } else {
              clearInterval(fade);
            }
          }, 100);
          setIsMusicPlaying(true);
        }).catch(e => {
          console.error('Audio play failed:', e);
          setIsMusicPlaying(false);
        });
      }
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Prologue', path: '/' },
    { name: 'Chapters', path: '/chapters' },
    { name: 'The Cast', path: '/the-cast' },
    { name: 'Scrapbook', path: '/scrapbook' },
    { name: 'Our Notes', path: '/our-notes' },
    { name: 'Last Pages', path: '/last-pages' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-2xl font-serif font-bold text-gradient">
              MCET <span className="font-['Caveat']">Batch</span>'26 
            </NavLink>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline font-serif space-x-4 text-sm font-medium">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md transition-colors ${
                      isActive ? 'text-amber-500 bg-[var(--color-glass)]' : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-glass)]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <button
                onClick={toggleMusic}
                className="ml-4 p-2 text-[var(--color-text-muted)] hover:text-amber-400 transition-colors"
                aria-label="Toggle Music"
              >
                {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
                onClick={toggleMusic}
                className="mr-4 p-2 text-[var(--color-text-muted)] hover:text-amber-400 transition-colors"
            >
                {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass bg-[#0a0a0f]/95 shadow-2xl border-t border-[var(--color-glass-border)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-serif">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-amber-500 bg-[var(--color-glass)]' : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-glass)]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
      {/* Background Audio Element */}
      <audio ref={audioRef} src="/music/background-music.m4a" loop />
    </nav>
  );
};

export default Navbar;

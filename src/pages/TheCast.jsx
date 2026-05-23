import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/ui/SectionHeading';
import ChapterNav from '../components/ui/ChapterNav';
import Fireflies from '../components/ui/Fireflies';
import { peopleData } from '../data/cast';
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { DoodleCrown, DoodleSparkle, DoodleHeart } from '../components/ui/VintageDoodles';
import { X, Search, SlidersHorizontal, ArrowDownUp } from 'lucide-react';


// random bg color of Vintage masking tape
const bgColors = [
  "bg-yellow-200/50",
  "bg-red-200/50",
  "bg-green-200/50",
  "bg-blue-200/50"
];

const Polaroid = ({ person, onClick }) => {
  const showCrown = (person.id % 3 === 0) || (person.id === 1);

  // Stable random values — computed once per mount, never on re-render
  const hoverRotate = useMemo(() => (Math.random() > 0.5 ? 2 : -2), []);
  const baseRotation = useMemo(() => Math.floor(Math.random() * 4) - 2, []);
  const tapeBg = useMemo(() => bgColors[Math.floor(Math.random() * bgColors.length)], []);

  return (
    <motion.div
      whileHover={{ scale: 1.07, rotate: hoverRotate, y: -8 }}
      transition={{ type: 'spring', stiffness: 360, damping: 22 }}
      className="cursor-pointer bg-[#fdfaf3] p-3 pb-6 flex flex-col items-center border border-amber-900/10 relative"
      onClick={() => onClick(person)}
      style={{
        transform: `rotate(${baseRotation}deg)`,
        backgroundImage: "url('/textures/rice-paper.png')",
        boxShadow: '3px 6px 20px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.15)',
        willChange: "transform, opacity"
      }}
    >

      {/* Masking tape */}
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 ${tapeBg} border border-white/20 shadow-sm z-10`}
        style={{ transform: 'rotate(-2deg)' }}
      />

      {/* Crown doodle rendering above card */}
      {showCrown && (<DoodleCrown className="w-15 h-15 absolute -top-10 -right-5 rotate-15 z-20 opacity-80" color="#1e3a8a" />)}

      <div
        data-photo="true"
        className="w-full aspect-[4/5] bg-gray-200 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] bg-cover bg-center sepia-[0.15] contrast-[1.05] relative overflow-hidden"
        style={{ backgroundImage: (person.photo?.startsWith('http') || person.photo?.startsWith('/')) ? `url('${person.photo}')` : person.photo }}
      >
        {/* Subtle glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        {/* Warm vignette overlay */}
        <div className="w-full h-full pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(120,60,10,0.12) 100%)' }} />
      </div>

      <div className="pt-4 w-full text-center relative">
        <h3 className="text-3xl font-['Caveat'] text-amber-950 font-medium tracking-wide">
          <span className='block sm:hidden'>{person.name.split(' ')[0]}</span>
          <span className='hidden sm:block'>{person.name}</span>
        </h3>
        <p className="text-xs text-amber-900/60 uppercase tracking-widest mt-1 scale-90 font-semibold">
          {person.department}
        </p>
      </div>
    </motion.div>
  );
};

// ── Draggable Items Helper Component ───────────────────────────────────────────
const DraggableItem = ({ children, defaultLeft, defaultTop, initialRotate, delay = 0, constraintsRef }) => {
  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      dragMomentum={false}
      initial={{ y: -900, opacity: 0, rotate: initialRotate, scale: 0.85 }}
      animate={{ y: 0, opacity: 1, rotate: initialRotate, scale: 1 }}
      exit={{ y: 600, opacity: 0, scale: 0.7, transition: { duration: 0.35 } }}
      transition={{ type: 'spring', stiffness: 80, damping: 16, delay }}
      whileDrag={{ scale: 1.06, zIndex: 100, cursor: 'grabbing', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
      whileHover={{ zIndex: 50, scale: 1.02 }}
      className="absolute cursor-grab pointer-events-auto"
      style={{ left: defaultLeft, top: defaultTop, touchAction: 'none' }}
    >
      {children}
    </motion.div>
  );
};

// ── Draggable Cast Dossier (Interactive Full Screen) ─────────────────────────
const CastDossier = ({ person, onClose }) => {
  const isOpen = !!person;
  const constraintsRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onCloseRef = React.useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onCloseRef.current(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []); // stable — uses ref internally

  const getSocialIcon = (network) => {
    switch (network) {
      case 'github': return <FaGithub size={20} />;
      case 'linkedin': return <FaLinkedin size={20} />;
      case 'instagram': return <FaInstagram size={20} />;
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] overflow-hidden">
          {/* Warm nostalgic blurred overlay with aged-paper tint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-auto"
            onClick={onClose}
            style={{
              backdropFilter: 'blur(16px) sepia(0.4) brightness(0.55)',
              WebkitBackdropFilter: 'blur(16px) sepia(0.4) brightness(0.55)',
              background: 'radial-gradient(ellipse at 50% 40%, rgba(120,70,20,0.55) 0%, rgba(20,14,8,0.75) 100%)'
            }}
          />
          {/* Scattered light dust overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "url('/textures/aged-paper.png')", backgroundSize: '400px', mixBlendMode: 'overlay' }} />

          {/* Close button — wax-sealed X stamp */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute top-5 right-5 z-[250] w-11 h-11 flex items-center justify-center pointer-events-auto"
            aria-label="Close"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #c0392b, #7b0000)',
              borderRadius: '50%',
              boxShadow: '2px 4px 14px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.15)',
              border: '2px solid rgba(80,0,0,0.6)',
              color: '#fdfaf3'
            }}
          >
            <X size={20} strokeWidth={2.5} />
          </motion.button>

          {/* Interactive Drag Area Container */}
          <div ref={constraintsRef} className="absolute inset-4 pointer-events-none" />

          {person && (() => {
            const pos = isMobile ? {
              bagtag: { left: '8px', top: '10vh' },
              photo: { left: 'calc(50% - 90px)', top: '8vh' },
              rose: { left: 'calc(100% - 160px)', top: '7vh' },
              bday: { left: '8px', top: '44vh' },
              nickname: { left: 'calc(50% + 8px)', top: '51vh' },
              note: { left: '8px', top: '58vh' },
              photo2: { left: 'calc(50% + 8px)', top: '63vh' },
              social: { left: '8px', top: '76vh' },
            } : {
              photo: { left: 'calc(50% - 155px)', top: '8vh' },
              photo2: { left: 'calc(50% + 110px)', top: '45vh' },
              note: { left: 'calc(50% - 310px)', top: '52vh' },
              bday: { left: 'calc(50% - 360px)', top: '10vh' },
              bagtag: { left: 'calc(50% - 430px)', top: '34vh' },
              nickname: { left: 'calc(50% + 230px)', top: '12vh' },
              social: { left: 'calc(50% + 255px)', top: '38vh' },
              rose: { left: 'calc(50% - 90px)', top: '72vh' },
            };

            return (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ overflow: 'hidden' }}
              >


                {/* 1. Main Photo */}
                <DraggableItem constraintsRef={constraintsRef} defaultLeft={pos.photo.left} defaultTop={pos.photo.top} initialRotate={-3} delay={0.1}>
                  <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%) rotate(1.5deg)', width: 80, height: 22, background: 'rgba(230,210,160,0.85)', backdropFilter: 'blur(2px)', clipPath: 'polygon(0 15%,3% 0%,6% 12%,9% 0%,12% 10%,15% 0%,18% 12%,21% 0%,24% 10%,27% 0%,30% 12%,33% 0%,36% 10%,39% 0%,100% 0%,100% 100%,0% 100%)', zIndex: 30 }} />
                  <div style={{ background: '#fdfaf3', padding: '10px 10px 36px', width: isMobile ? 220 : 280, boxShadow: '4px 8px 30px rgba(0,0,0,0.45)', filter: 'sepia(0.08)', clipPath: 'polygon(0% 1%,3% 0%,7% 1.5%,12% 0%,17% 1%,22% 0%,27% 1.5%,32% 0%,37% 1%,42% 0%,47% 1.5%,52% 0%,57% 1%,62% 0%,67% 1.5%,72% 0%,77% 1%,82% 0%,87% 1.5%,92% 0%,97% 1%,100% 1%,100% 99%,97% 100%,92% 98.5%,87% 100%,82% 98.5%,77% 100%,72% 98.5%,67% 100%,62% 98.5%,57% 100%,52% 98.5%,47% 100%,42% 98.5%,37% 100%,32% 98.5%,27% 100%,22% 98.5%,17% 100%,12% 98.5%,7% 100%,2% 100%,0% 99%)' }}>
                    <div style={{ backgroundImage: (person.photo?.startsWith('http') || person.photo?.startsWith('/')) ? `url('${person.photo}')` : person.photo, backgroundSize: 'cover', backgroundPosition: 'center top', width: '100%', aspectRatio: '4/5', boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3)', filter: 'sepia(0.12) contrast(1.05)' }} />
                    <div style={{ textAlign: 'center', paddingTop: 10 }}>
                      <h2 style={{ fontFamily: 'Caveat,cursive', fontSize: isMobile ? 28 : 40, color: '#451a03', fontWeight: 700, lineHeight: 1, margin: 0 }}>{person.name}</h2>
                      <p style={{ fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '0.28em', color: 'rgba(120,53,15,0.65)', fontWeight: 700, marginTop: 6, textTransform: 'uppercase' }}>{person.department}</p>
                    </div>
                  </div>
                </DraggableItem>

                {/* 2. Second Photo */}
                {person.funnyPhoto && (
                  <DraggableItem constraintsRef={constraintsRef} defaultLeft={pos.photo2.left} defaultTop={pos.photo2.top} initialRotate={7} delay={0.25}>
                    <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%) rotate(-2deg)', width: 55, height: 18, background: 'rgba(180,210,240,0.75)', backdropFilter: 'blur(2px)', zIndex: 30, clipPath: 'polygon(0 10%,3% 0%,6% 10%,9% 0%,12% 8%,15% 0%,100% 0%,100% 100%,0% 100%)' }} />
                    <div style={{ background: '#f5f0e0', padding: '8px 8px 28px', width: isMobile ? 160 : 200, boxShadow: '3px 6px 22px rgba(0,0,0,0.35)', clipPath: 'polygon(1% 0%,4% 1.5%,8% 0%,13% 1%,18% 0%,23% 1.5%,28% 0%,33% 1%,38% 0%,43% 1.5%,48% 0%,53% 1%,58% 0%,63% 1.5%,68% 0%,73% 1%,78% 0%,83% 1.5%,88% 0%,93% 1%,98% 0%,100% 0%,100% 100%,0% 100%)', filter: 'sepia(0.2)' }}>
                      <div style={{ backgroundImage: (person.funnyPhoto?.startsWith('http') || person.funnyPhoto?.startsWith('/')) ? `url('${person.funnyPhoto}')` : person.funnyPhoto, backgroundSize: 'cover', backgroundPosition: 'center top', width: '100%', aspectRatio: '9/10', filter: 'sepia(0.2) contrast(0.9)' }} />
                      <p style={{ fontFamily: 'Caveat,cursive', fontSize: 18, color: '#451a03', fontWeight: 700, textAlign: 'center', marginTop: 8, opacity: 0.8 }}>“Time well lived...”</p>
                    </div>
                  </DraggableItem>
                )}

                {/* 3. Handwritten note */}
                <DraggableItem constraintsRef={constraintsRef} defaultLeft={pos.note.left} defaultTop={pos.note.top} initialRotate={-5} delay={0.4}>
                  <div style={{ width: isMobile ? 200 : 275, background: '#fdfaf0', padding: '22px 16px 18px', boxShadow: '3px 8px 22px rgba(0,0,0,0.28)', backgroundImage: 'repeating-linear-gradient(#fdfaf0 0px,#fdfaf0 27px,rgba(96,152,204,0.5) 27px,rgba(96,152,204,0.5) 28px)', backgroundSize: '100% 28px', backgroundPosition: '0 4px', borderLeft: '3px solid rgba(220,80,80,0.35)', clipPath: 'polygon(0 0,100% 0,100% 94%,97% 96%,94% 94%,91% 97%,88% 94%,85% 97%,82% 94%,79% 97%,76% 94%,73% 97%,70% 94%,67% 97%,64% 94%,61% 97%,58% 94%,55% 97%,52% 94%,49% 97%,46% 94%,43% 97%,40% 94%,37% 97%,34% 94%,31% 97%,28% 94%,25% 97%,22% 94%,19% 97%,16% 94%,13% 97%,10% 94%,7% 97%,4% 94%,1% 97%,0 94%)' }}>
                    <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 14, height: 14, borderRadius: '50%', background: 'rgba(200,180,140,0.6)', border: '1.5px solid rgba(160,130,90,0.5)' }} />
                    <p style={{ fontFamily: 'Caveat,cursive', fontSize: isMobile ? 20 : 24, color: '#3d1a00', lineHeight: '28px', paddingTop: 4, textAlign: 'center' }}>&ldquo;{person.oneliner || 'A familiar face from those moments that still linger.'}&rdquo;</p>
                    <p style={{ fontFamily: 'Caveat,cursive', fontSize: 15, color: 'rgba(120,53,15,0.55)', textAlign: 'right', marginTop: 6 }}>— a note ✦</p>
                  </div>
                </DraggableItem>

                {/* 4. Birthday Card */}
                {person.birthday && (
                  <DraggableItem constraintsRef={constraintsRef} defaultLeft={pos.bday.left} defaultTop={pos.bday.top} initialRotate={-11} delay={0.5}>
                    <div style={{ width: isMobile ? 130 : 135, background: 'linear-gradient(160deg,#fdf3e0,#f5e6c8)', boxShadow: '3px 6px 20px rgba(0,0,0,0.35)', border: '1px solid rgba(180,130,60,0.35)', padding: '12px 10px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', inset: 5, border: '1.5px solid rgba(160,100,30,0.3)', borderRadius: 2, pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: 6, right: 6, fontSize: 14, opacity: 0.5 }}>✿</div>
                      <div style={{ position: 'absolute', bottom: 6, left: 6, fontSize: 14, opacity: 0.5 }}>✿</div>
                      <span style={{ fontSize: 28, marginBottom: 4 }}>🎂</span>
                      <span style={{ fontFamily: '"Courier New",monospace', fontSize: 8, fontWeight: 700, color: 'rgba(120,70,10,0.6)', letterSpacing: '0.22em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 4 }}>Birthday</span>
                      <span style={{ fontFamily: 'Caveat,cursive', fontSize: 26, fontWeight: 700, color: '#451a03', textAlign: 'center', lineHeight: 1.1 }}>{new Date(`2000-${person.birthday}`).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                      <span style={{ fontFamily: 'Caveat,cursive', fontSize: isMobile ? 12 : 13, color: 'rgba(120,70,10,0.5)', marginTop: 5, textAlign: 'center' }}>Wishing you warmth 🍀</span>
                    </div>
                  </DraggableItem>
                )}

                {/* 5. Roll Bag Tag */}
                <DraggableItem constraintsRef={constraintsRef} defaultLeft={pos.bagtag.left} defaultTop={pos.bagtag.top} initialRotate={14} delay={0.3}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: isMobile ? 110 : 150 }}>
                    <svg width="30" height="28" viewBox="0 0 30 28" style={{ marginBottom: -2 }}>
                      <path d="M15 0 Q5 10 15 18 Q25 10 15 28" stroke="#a07040" strokeWidth="1.5" fill="none" strokeDasharray="2,1" />
                    </svg>
                    <div style={{ background: 'linear-gradient(160deg,#e8d4a8,#d4b87a)', border: '1.5px solid rgba(140,90,30,0.5)', padding: '8px 10px 10px', width: '100%', boxShadow: '2px 4px 14px rgba(0,0,0,0.3)', clipPath: 'polygon(50% 0%,100% 0%,100% 90%,50% 100%,0% 90%,0% 0%)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 10, height: 10, borderRadius: '50%', background: 'rgba(100,60,10,0.25)', border: '1.5px solid rgba(100,60,10,0.5)' }} />
                      <span style={{ fontFamily: '"Courier New",monospace', fontSize: isMobile ? 7.3 : 10, fontWeight: 700, color: 'rgba(80,45,5,0.65)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 14, marginBottom: 3 }}>Roll No.</span>
                      <span style={{ fontFamily: '"Courier New",monospace', fontSize: isMobile ? 11 : 15, fontWeight: 700, color: '#3d1a00', letterSpacing: '0.04em', textAlign: 'center', lineHeight: 1.3 }}>{person.roll || '1060012XXXX'}</span>
                      <span style={{ fontFamily: 'Caveat,cursive', fontSize: isMobile ? 11 : 16, color: 'rgba(100,55,10,0.5)', marginTop: 4 }}>MCET '26</span>
                    </div>
                  </div>
                </DraggableItem>

                {/* 6. Nickname Stamp */}
                {person.nickname && (
                  <DraggableItem constraintsRef={constraintsRef} defaultLeft={pos.nickname.left} defaultTop={pos.nickname.top} initialRotate={-16} delay={0.6}>
                    <div style={{ width: isMobile ? 165 : 195, position: 'relative' }}>
                      <div style={{ background: 'rgba(140,15,15,0.92)', padding: '10px 12px 12px', border: '3px solid rgba(100,5,5,0.7)', boxShadow: '0 0 0 2px rgba(180,40,40,0.3), 3px 6px 18px rgba(0,0,0,0.45)', position: 'relative', overflow: 'visible' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 0,transparent 50%)', backgroundSize: '4px 4px' }} />
                        <p style={{ fontFamily: '"Courier New",monospace', fontSize: 8, fontWeight: 700, color: 'rgba(255,230,210,0.75)', letterSpacing: '0.35em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 5 }}>A.K.A.</p>
                        <p style={{ fontFamily: 'Caveat,cursive', fontSize: isMobile ? 20 : 32, fontWeight: 700, color: '#fdf5e8', textAlign: 'center', lineHeight: 1.05, textShadow: '0 0 8px rgba(255,150,100,0.4)', margin: 0, wordBreak: 'break-word' }}>{person.nickname}</p>
                        <p style={{ fontFamily: '"Courier New",monospace', fontSize: 7, color: 'rgba(255,220,180,0.45)', textAlign: 'center', marginTop: 6, letterSpacing: '0.2em' }}>✦ JNL. 2026 ✦</p>
                      </div>
                      <div style={{ position: 'absolute', top: -3, left: -3, width: 10, height: 10, border: '2px solid rgba(140,15,15,0.5)', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', top: -3, right: -3, width: 10, height: 10, border: '2px solid rgba(140,15,15,0.5)', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', bottom: -3, left: -3, width: 10, height: 10, border: '2px solid rgba(140,15,15,0.5)', borderRadius: '50%' }} />
                      <div style={{ position: 'absolute', bottom: -3, right: -3, width: 10, height: 10, border: '2px solid rgba(140,15,15,0.5)', borderRadius: '50%' }} />
                    </div>
                  </DraggableItem>
                )}

                {/* 7. Social Links */}
                {(person.socialLinks && Object.entries(person.socialLinks).some(([, url]) => url && url !== '#')) && (
                  <DraggableItem constraintsRef={constraintsRef} defaultLeft={pos.social.left} defaultTop={pos.social.top} initialRotate={4} delay={0.7}>
                    <div style={{ width: isMobile ? 165 : 185, background: '#faf4e0', padding: '14px 12px 16px', boxShadow: '3px 6px 20px rgba(0,0,0,0.3)', backgroundImage: "repeating-linear-gradient(#faf4e0 0px,#faf4e0 23px,rgba(96,152,204,0.4) 23px,rgba(96,152,204,0.4) 24px)", backgroundSize: '100% 24px', backgroundPosition: '0 8px', borderLeft: '3px solid rgba(200,70,70,0.3)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%) rotate(2deg)', width: 50, height: 16, background: 'rgba(240,220,150,0.8)', clipPath: 'polygon(0 20%,3% 0%,6% 18%,9% 0%,12% 15%,15% 0%,100% 0%,100% 100%,0% 100%)', zIndex: 30 }} />
                      <h3 style={{ fontFamily: 'Caveat,cursive', fontSize: 17, fontWeight: 700, color: 'rgba(80,40,10,0.8)', textAlign: 'center', marginBottom: 8, paddingBottom: 5, borderBottom: '1px solid rgba(140,90,30,0.2)', marginTop: 4 }}>Social Links ✎</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {Object.entries(person.socialLinks).map(([network, url]) => {
                          if (!url || url === '#') return null;
                          return (
                            <a key={network} href={url} target="_blank" rel="noopener noreferrer"
                              style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 6px', background: 'rgba(220,190,130,0.25)', borderRadius: 2, textDecoration: 'none', pointerEvents: 'auto' }}>
                              <span style={{ color: 'rgba(80,40,10,0.85)', flexShrink: 0 }}>{getSocialIcon(network)}</span>
                              <span style={{ fontFamily: 'Caveat,cursive', fontSize: 18, fontWeight: 700, color: '#3d1a00', textTransform: 'capitalize' }}>{network}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </DraggableItem>
                )}

                {/* 8. Rose */}
                <DraggableItem constraintsRef={constraintsRef} defaultLeft={pos.rose.left} defaultTop={pos.rose.top} initialRotate={-22} delay={0.85}>
                  {/* Explicit width+height so browser reserves space before image loads*/}
                  <img src="/images/assets/rose.png" alt="rose" width={isMobile ? 150 : 200} height={isMobile ? 200 : 270} style={{ display: 'block', width: isMobile ? 150 : 200, height: 'auto', filter: 'drop-shadow(3px 8px 18px rgba(0,0,0,0.55)) sepia(0.15)', pointerEvents: 'none', userSelect: 'none' }} draggable={false} />
                </DraggableItem>

              </div>
            );
          })()}

        </div>
      )}
    </AnimatePresence>
  );
};
// ── Main Page ─────────────────────────────────────────────────────────────────

const TheCast = () => {
  useEffect(() => { document.title = "MCET Diary '26 | Faces of Us"; }, []);

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const cycleDepartment = () => {
    setDepartmentFilter(prev => {
      if (prev === "All") return "Computer Science";
      if (prev === "Computer Science") return "Civil Engineering";
      return "All";
    });
  };

  const cycleSort = () => {
    setSortOrder(prev => {
      if (prev === "default") return "asc";
      if (prev === "asc") return "desc";
      return "default";
    });
  };

  const filteredAndSortedPeople = useMemo(() => {
    let result = [...peopleData];

    // Filter by branch
    if (departmentFilter !== "All") {
      result = result.filter(p => p.department === departmentFilter);
    }

    // Filter by search query (name or nickname)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.nickname && p.nickname.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortOrder === "asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [searchQuery, departmentFilter, sortOrder]);

  return (
    <PageTransition>
      <div className="relative overflow-hidden w-full min-h-screen">
        {/* Subtle background texture for the entire page overlaying global bg */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.1]" style={{ backgroundImage: "url('/textures/paper-grain.png')", mixBlendMode: "overlay", zIndex: 1 }}></div>
        {/* Subtle Background Typography */}
        <div className="absolute top-5 sm:-top-4 right-16 sm:right-149 text-[10rem] md:text-[14rem] font-serif text-white/5 leading-none select-none pointer-events-none tracking-tighter">
          Peers
        </div>

        {/* Firefly Particles */}
        <div className="absolute inset-0 pointer-events-none z-10"><Fireflies count={30} /></div>

        <div className="py-24 pb-30 relative z-20">
          <div className="max-w-[1400px] mx-auto px-4 relative z-10">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-16 relative"
            >
              <DoodleSparkle className="w-24 h-24 absolute -top-10 left-10 md:left-40 opacity-30 mix-blend-screen hidden md:block" color="#F59E0B" />
              <DoodleHeart className="w-20 h-20 absolute top-10 right-10 md:right-40 opacity-30 -rotate-12 mix-blend-screen hidden md:block" color="#F59E0B" />

              <SectionHeading
                title="The Cast"
                subtitle="The faces and the events that made it all real."
                eyebrow="Faces of Us"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-center font-serif italic font-light text-2xl md:text-3xl text-white/60 mb-16 max-w-2xl mx-auto"
            >
              <span className='text-amber-600/50 text-md sm:text-3xl'>❝</span> We didn't realize we were making memories, we just knew we were having fun... <span className='text-amber-600/50 text-md sm:text-3xl'>❞</span>
            </motion.p>

            {/* Controls Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col md:flex-row gap-4 mb-16 items-center justify-between z-20 relative border-b border-white/5 pb-8"
            >
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600/70" />
                <input 
                  type="text"
                  placeholder="Search name or nickname..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-500/30 transition-all font-sans"
                />
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4 w-full md:w-auto justify-start md:justify-end">

                {/* Sort Cycle Button */}
                <motion.button
                  onClick={cycleSort}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-serif tracking-wide font-semibold text-white/60 hover:text-amber-600 hover:bg-white/5 border border-white/10 transition-colors`}
                >
                  <ArrowDownUp size={15} />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={sortOrder}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      {sortOrder === "default" ? "Default" : sortOrder === "asc" ? "By Name ↓" : "By Name ↑"}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
                
                {/* Branch Cycle Button */}
                <motion.button
                  onClick={cycleDepartment}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-serif tracking-wide font-semibold transition-all duration-300  bg-amber-600 text-black shadow-lg shadow-amber-500/20`}
                >
                  <SlidersHorizontal size={15} />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={departmentFilter}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      {departmentFilter === "All" ? "All Branches" : departmentFilter === "Computer Science" ? "Computer Science" : "Civil Engineering"}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            <div className="relative">
              {/* Radial gradient glow in background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-4xl h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-amber-500/5 to-transparent pointer-events-none"></div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 relative z-10"
              >
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedPeople.map((person) => (
                    <motion.div 
                      key={person.id} 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="px-2"
                    >
                      <Polaroid person={person} onClick={setSelectedPerson} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredAndSortedPeople.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 text-white/40 relative z-20"
                >
                  <p className="text-5xl mb-4">🧑‍🎓</p>
                  <p className="text-xl font-serif font-light">
                    No one found matching your search...
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setDepartmentFilter("All"); setSortOrder("default"); }}
                    className="mt-4 text-sm text-amber-500 hover:text-amber-600 transition-colors underline underline-offset-6 font-serif tracking-wider uppercase"
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </div>

            <div className="flex justify-between items-center w-full mt-16 sm:mt-32 sm:border-t border-amber-900/40 pt-0 sm:pt-12 relative z-20">
              <ChapterNav direction="prev" chapterName="Chapters" path="/chapters" />
              <ChapterNav direction="next" chapterName="Scrapbook" path="/scrapbook" />
            </div>
          </div>
        </div>
      </div>

      {/* Vintage Slide-in Dossier */}
      <CastDossier person={selectedPerson} onClose={() => setSelectedPerson(null)} />

    </PageTransition>
  );
};

export default TheCast;

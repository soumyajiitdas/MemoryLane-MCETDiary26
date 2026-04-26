import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar        from './components/layout/Navbar';
import Footer        from './components/layout/Footer';
const BirthdayBanner = lazy(() => import('./components/ui/BirthdayBanner'));
import GridBackground from './components/ui/GridBackground';
import ScrollToTop   from './components/layout/ScrollToTop';

// Global features
import { PlayerProvider }    from './context/PlayerContext';
const FountainPenCursor = lazy(() => import('./components/ui/FountainPenCursor'));
const GraduationBanner = lazy(() => import('./components/ui/GraduationBanner'));

// Pages — lazy loaded so each route's JS is only fetched on first navigation
const Prologue  = lazy(() => import('./pages/Prologue'));
const Chapters  = lazy(() => import('./pages/Chapters'));
const TheCast   = lazy(() => import('./pages/TheCast'));
const Scrapbook = lazy(() => import('./pages/Scrapbook'));
const OurNotes  = lazy(() => import('./pages/OurNotes'));
const LastPages = lazy(() => import('./pages/LastPages'));

// Minimal loading fallback shown during route chunk fetch
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" />
  </div>
);


function App() {
  return (
    <PlayerProvider>
        <Router>
          <ScrollToTop />
          <GridBackground />

          <div className="flex flex-col min-h-screen">
            <Suspense fallback={null}>
              <BirthdayBanner />
            </Suspense>
            <Navbar />

            <main className="flex-grow mt-20 overflow-x-hidden w-full">
              <Suspense fallback={<PageLoader />}>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/"           element={<Prologue />}  />
                    <Route path="/chapters"   element={<Chapters />}  />
                    <Route path="/the-cast"   element={<TheCast />}   />
                    <Route path="/scrapbook"  element={<Scrapbook />} />
                    <Route path="/our-notes"  element={<OurNotes />}  />
                    <Route path="/last-pages" element={<LastPages />} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </main>

            <Footer />
          </div>

          {/* Fountain Pen Cursor — rendered outside layout so it sits above
              every element (z-9999) and is never clipped by overflow:hidden */}
          <Suspense fallback={null}>
            <FountainPenCursor />
          </Suspense>

          {/* Graduation Day Banner — shows only on 17 July 2026, z-10000+ */}
          <Suspense fallback={null}>
            <GraduationBanner />
          </Suspense>

        </Router>
      </PlayerProvider>
  );
}

export default App;

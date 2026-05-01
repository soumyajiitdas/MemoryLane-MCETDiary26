import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
const BirthdayBanner = lazy(() => import('./components/ui/BirthdayBanner'));
import ScrollToTop from './components/layout/ScrollToTop';

// Global features
import { PlayerProvider } from './context/PlayerContext';
const FountainPenCursor = lazy(() => import('./components/ui/FountainPenCursor'));
const GraduationBanner = lazy(() => import('./components/ui/GraduationBanner'));

// Pages — lazy loaded so each route's JS is only fetched on first navigation
import Prologue from './pages/Prologue';
const Chapters = lazy(() => import('./pages/Chapters'));
const TheCast = lazy(() => import('./pages/TheCast'));
const Scrapbook = lazy(() => import('./pages/Scrapbook'));
const OurNotes = lazy(() => import('./pages/OurNotes'));
const LastPages = lazy(() => import('./pages/LastPages'));

// Custom Diary Loading fallback shown during route chunk fetch
import DiaryLoader from './components/ui/DiaryLoader';
const PageLoader = DiaryLoader;

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Prologue />} />
        <Route path="/chapters" element={<Suspense fallback={<PageLoader />}><Chapters /></Suspense>} />
        <Route path="/the-cast" element={<Suspense fallback={<PageLoader />}><TheCast /></Suspense>} />
        <Route path="/scrapbook" element={<Suspense fallback={<PageLoader />}><Scrapbook /></Suspense>} />
        <Route path="/our-notes" element={<Suspense fallback={<PageLoader />}><OurNotes /></Suspense>} />
        <Route path="/last-pages" element={<Suspense fallback={<PageLoader />}><LastPages /></Suspense>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <PlayerProvider>
      <Router>
        <ScrollToTop />

        <div className="flex flex-col min-h-screen">
          <Suspense fallback={null}>
            <BirthdayBanner />
          </Suspense>
          <Navbar />

          <main className="relative flex-grow mt-20 overflow-x-hidden w-full">
            <AnimatedRoutes />
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

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar        from './components/layout/Navbar';
import Footer        from './components/layout/Footer';
import BirthdayBanner from './components/ui/BirthdayBanner';
import GridBackground from './components/ui/GridBackground';
import ScrollToTop   from './components/layout/ScrollToTop';

// Global features
import { PlayerProvider }    from './context/PlayerContext';
import FountainPenCursor     from './components/ui/FountainPenCursor';
import GraduationBanner      from './components/ui/GraduationBanner';

// Pages
import Prologue  from './pages/Prologue';
import Chapters  from './pages/Chapters';
import TheCast   from './pages/TheCast';
import Scrapbook from './pages/Scrapbook';
import OurNotes  from './pages/OurNotes';
import LastPages from './pages/LastPages';

function App() {
  return (
    <PlayerProvider>
        <Router>
          <ScrollToTop />
          <GridBackground />

          <div className="flex flex-col min-h-screen">
            <BirthdayBanner />
            <Navbar />

            <main className="flex-grow mt-20 overflow-x-hidden w-full">
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
            </main>

            <Footer />
          </div>

          {/* Fountain Pen Cursor — rendered outside layout so it sits above
              every element (z-9999) and is never clipped by overflow:hidden */}
          <FountainPenCursor />

          {/* Graduation Day Banner — shows only on 17 July 2026, z-10000+ */}
          <GraduationBanner />

        </Router>
      </PlayerProvider>
  );
}

export default App;

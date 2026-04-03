import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BirthdayBanner from './components/ui/BirthdayBanner';
import ScrollToTop from './components/layout/ScrollToTop';

// Global Player
import { PlayerProvider } from './context/PlayerContext';

// Pages
import Prologue from './pages/Prologue';
import Chapters from './pages/Chapters';
import TheCast from './pages/TheCast';
import Scrapbook from './pages/Scrapbook';
import OurNotes from './pages/OurNotes';
import LastPages from './pages/LastPages';

function App() {
  return (
    // PlayerProvider wraps everything — the single Audio element lives here,
    // never unmounts, so music continues across all page navigations.
    <PlayerProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <BirthdayBanner />
          <Navbar />
          <main className="flex-grow mt-20">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/"           element={<Prologue />} />
                <Route path="/chapters"   element={<Chapters />} />
                <Route path="/the-cast"   element={<TheCast />} />
                <Route path="/scrapbook"  element={<Scrapbook />} />
                <Route path="/our-notes"  element={<OurNotes />} />
                <Route path="/last-pages" element={<LastPages />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;

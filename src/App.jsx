import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Prologue from './pages/Prologue';
import Chapters from './pages/Chapters';
import TheCast from './pages/TheCast';
import Scrapbook from './pages/Scrapbook';
import OurNotes from './pages/OurNotes';
import LastPages from './pages/LastPages';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20"> {/* pt-20 for fixed navbar */}
          {/* AnimatePresence for page transitions */}
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Prologue />} />
              <Route path="/chapters" element={<Chapters />} />
              <Route path="/the-cast" element={<TheCast />} />
              <Route path="/scrapbook" element={<Scrapbook />} />
              <Route path="/our-notes" element={<OurNotes />} />
              <Route path="/last-pages" element={<LastPages />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

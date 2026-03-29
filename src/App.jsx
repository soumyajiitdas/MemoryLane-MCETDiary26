import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import TheJourney from './pages/TheJourney';
import Yearbook from './pages/Yearbook';
import Gallery from './pages/Gallery';
import MemoryWall from './pages/MemoryWall';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20"> {/* pt-20 for fixed navbar */}
          {/* AnimatePresence for page transitions */}
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/journey" element={<TheJourney />} />
              <Route path="/yearbook" element={<Yearbook />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/memory-wall" element={<MemoryWall />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

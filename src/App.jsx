import { useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import { useIsMobile } from './hooks/useIsMobile';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero/index';
import Marquee from './components/Marquee';

// Lazy loaded components
const Services = lazy(() => import('./components/Services/index'));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs/index'));
const ScrollIntro = lazy(() => import('./components/ScrollIntro/index'));
const About = lazy(() => import('./components/About/index'));
const CTA = lazy(() => import('./components/CTA'));
const BackgroundMesh = lazy(() => import('./components/BackgroundMesh'));
const FAQ = lazy(() => import('./components/FAQ/index'));

const SectionLoader = () => <div style={{ height: '50vh' }} />;

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    // Scroll both the window and any potential wrappers
    window.scrollTo(0, 0);
    const wrappers = document.querySelectorAll('.scroll-wrapper, .page-wrapper');
    wrappers.forEach(w => w.scrollTo(0, 0));

    // If there's a hash, we might want to scroll to it after a short delay
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [pathname, hash]);
  return null;
}

function Home({ scrollWrapperRef }) {
  return (
    <div className="scroll-wrapper" ref={scrollWrapperRef}>
      <div id="hero" style={{ scrollSnapAlign: 'start', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Hero />
        <Marquee />
      </div>

      <Suspense fallback={<SectionLoader />}>
        <Services />
        <ScrollIntro />
        <WhyChooseUs />
        <About />
        <CTA />
      </Suspense>
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile()
  const scrollWrapperRef = useRef(null)


  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={null}>
        <BackgroundMesh />
      </Suspense>
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Home scrollWrapperRef={scrollWrapperRef} />} />
        <Route path="/faq" element={
          <div className="page-wrapper">
            <Suspense fallback={<SectionLoader />}>
              <FAQ />
            </Suspense>
          </div>
        } />
      </Routes>
    </Router>
  )
}


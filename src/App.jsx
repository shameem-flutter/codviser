import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import { useIsMobile } from './hooks/useIsMobile';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero/index';
import Marquee from './components/Marquee';
import Services from './components/Services/index';
import WhyChooseUs from './components/WhyChooseUs/index';
import ScrollIntro from './components/ScrollIntro/index';
import About from './components/About/index';
import CTA from './components/CTA';
import BackgroundMesh from './components/BackgroundMesh';
import FAQ from './components/FAQ/index';

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

      <Services />
      <ScrollIntro />
      <WhyChooseUs />
      <About />
      <CTA />
    </div>
  );
}

export default function App() {
  const isMobile = useIsMobile()
  const scrollWrapperRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile || !scrollWrapperRef.current || !progressRef.current) return
      
      const el = scrollWrapperRef.current
      const scrollTotal = el.scrollHeight - el.clientHeight
      const progress = (el.scrollTop / scrollTotal)
      progressRef.current.style.transform = `scaleX(${progress})`
    }

    const wrapper = scrollWrapperRef.current
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll, { passive: true })
    }
    return () => wrapper?.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <Router>
      <ScrollToTop />
      <BackgroundMesh />
      
      <Navbar />

      <Routes>
        <Route path="/" element={<Home scrollWrapperRef={scrollWrapperRef} />} />
        <Route path="/faq" element={
          <div className="page-wrapper">
            <FAQ />
          </div>
        } />
      </Routes>
    </Router>
  )
}


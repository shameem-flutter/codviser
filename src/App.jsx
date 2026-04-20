import './index.css';
import { useIsMobile } from './hooks/useIsMobile';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import WhatWeProvide from './components/WhatWeProvide';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import CTA from './components/CTA';

export default function App() {
  const isMobile = useIsMobile()

  return (
    <>
      <div className="noise" aria-hidden="true" />
      {!isMobile && <Cursor />}
      <Navbar />

      {/*
        Desktop: scroll-snap wrapper — one section per screen.
        Mobile:  plain document flow — natural scroll, sections auto-height.
        The outer div always exists; CSS handles the difference.
      */}
      <div className="scroll-wrapper">
        {/* Snap group 1: Hero + Marquee (desktop) / stacked (mobile) */}
        <div style={{ scrollSnapAlign: 'start', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Hero />
          <Marquee />
        </div>

        {/* Snap group 2: Services Showcase */}
        <WhatWeProvide />

        {/* Snap group 3: Why Us */}
        <WhyChooseUs />

        {/* Snap group 4: About */}
        <About />

        {/* Snap group 5: CTA + Footer */}
        <CTA />
      </div>
    </>
  )
}


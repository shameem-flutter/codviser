import { useEffect, useRef } from 'react';
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
import BackgroundMesh from './components/BackgroundMesh';

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
    <>
      <div className="scroll-progress" ref={progressRef} />
      <BackgroundMesh />
      <div className="noise" aria-hidden="true" />
      
      {!isMobile && <Cursor />}
      <Navbar />

      <div className="scroll-wrapper" ref={scrollWrapperRef}>
        <div style={{ scrollSnapAlign: 'start', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Hero />
          <Marquee />
        </div>

        <WhatWeProvide />
        <WhyChooseUs />
        <About />
        <CTA />
      </div>
    </>
  )
}


import { useEffect, useRef } from 'react';
import './index.css';
import { useIsMobile } from './hooks/useIsMobile';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero/index';
import Marquee from './components/Marquee';
import Services from './components/Services/index';
import WhyChooseUs from './components/WhyChooseUs/index';
import ScrollIntro from './components/ScrollIntro/index';
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
      <BackgroundMesh />
      
      {/* {!isMobile && <Cursor />} */}
      <Navbar />

      <div className="scroll-wrapper" ref={scrollWrapperRef}>
        <div style={{ scrollSnapAlign: 'start', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Hero />
          <Marquee />
        </div>

        <Services />
        <ScrollIntro />
        <WhyChooseUs />
        <About />
        <CTA />
      </div>
    </>
  )
}


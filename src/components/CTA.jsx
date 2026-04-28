import React from 'react';
import { useInView } from '../hooks/useInView';
import Contact from './Contact/index';
import Footer from './Footer/index';

export default function CTA() {
  const [actionsRef, actionsInView] = useInView(0.15)

  return (
    <section className="section cta-section" id="contact">
      <div className="inner">
        <div className="cta-content">
          <div className={`reveal-up${actionsInView ? ' reveal-visible' : ''}`} ref={actionsRef}>
            <Contact />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}

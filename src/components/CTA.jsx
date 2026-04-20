import React from 'react';
import { useInView } from '../hooks/useInView';

export default function CTA() {
  const [tagRef,     tagInView]     = useInView(0.15)
  const [headRef,    headInView]    = useInView(0.15)
  const [actionsRef, actionsInView] = useInView(0.15)

  return (
    <section className="section cta-section" id="contact">
      <div className="inner">
        <div className="cta-inner">
          <div className="cta-glow" />
          <span className={`cta-tag${tagInView ? ' visible' : ''}`} ref={tagRef}>
            — Ready when you are
          </span>
          <h2 className={`cta-heading${headInView ? ' visible' : ''}`} ref={headRef}>
            Let's Build <span className="accent">Something.</span>
          </h2>
          <div className={`cta-actions${actionsInView ? ' visible' : ''}`} ref={actionsRef}>
            <a href="mailto:hello@codviser.com" className="cta-email">
              hello@codviser.com
            </a>
            <button className="cta-btn">
              <span>Start a Project</span>
              <i>→</i>
            </button>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p className="footer-copy">© 2026 Codviser. All rights reserved.</p>
        <ul className="footer-links">
          {['Instagram', 'LinkedIn', 'Twitter', 'Behance'].map(s => (
            <li key={s}><a href="#" rel="noreferrer">{s}</a></li>
          ))}
        </ul>
      </footer>
    </section>
  )
}

import React from 'react';
import { useInView } from '../hooks/useInView';

export default function CTA() {
  const [tagRef,     tagInView]     = useInView(0.15)
  const [headRef,    headInView]    = useInView(0.15)
  const [actionsRef, actionsInView] = useInView(0.15)

  return (
    <section className="section cta-section" id="contact">
      <div className="inner">
        <div className="cta-content">
          <span className={`section-eyebrow reveal-up${tagInView ? ' reveal-visible' : ''}`} ref={tagRef}>
            Ready when you are
          </span>
          <h2 className={`section-title reveal-up stagger-1${headInView ? ' reveal-visible' : ''}`} ref={headRef}>
            Let's build something<br />extraordinary.
          </h2>
          <div className={`cta-actions reveal-up stagger-2${actionsInView ? ' reveal-visible' : ''}`} ref={actionsRef}>
            <a href="mailto:hello@codviser.com" className="btn-primary">
              Contact us
            </a>
            <button className="btn-ghost" onClick={() => document.getElementById('hero')?.scrollIntoView()}>
              Back to top <span className="link-arrow">↑</span>
            </button>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="inner footer-inner">
          <p className="footer-copy">© 2026 Codviser. All rights reserved.</p>
          <ul className="footer-links">
            {['Instagram', 'LinkedIn', 'Twitter'].map(s => (
              <li key={s}><a href="#" rel="noreferrer">{s}</a></li>
            ))}
          </ul>
        </div>
      </footer>
    </section>
  )
}

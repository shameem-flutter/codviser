import React from 'react';
import { useInView } from '../hooks/useInView';

export default function About() {
  const [textRef, textInView] = useInView()
  const [statsRef, statsInView] = useInView()

  return (
    <section className="section about-section" id="about">
      <div className="inner">
        <div className="about-content">
          <div className="about-header" ref={textRef}>
            <span className="section-eyebrow">03 — About Codviser</span>
            <h2 className={`section-title reveal-up${textInView ? ' reveal-visible' : ''}`}>
              Engineering experiences that move people.
            </h2>
            <p className={`about-lead reveal-up stagger-1${textInView ? ' reveal-visible' : ''}`}>
              We don't just build products — we engineer digital solutions that convert audiences into loyal users. 
              From strategy to execution, every pixel and every line of code is intentional.
            </p>
          </div>

          <div className={`about-stats reveal-up stagger-2${statsInView ? ' reveal-visible' : ''}`} ref={statsRef}>
            {[{ n: '100%', l: 'In-House Expertise' }, { n: '10x', l: 'Faster Iteration' }, { n: '∞', l: 'Commitment' }].map(s => (
              <div className="about-stat-item" key={s.l}>
                <div className="stat-num">{s.n}</div>
                <div className="stat-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

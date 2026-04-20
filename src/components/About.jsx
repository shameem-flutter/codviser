import React from 'react';
import { useInView } from '../hooks/useInView';

export default function About() {
  const [textRef, textInView] = useInView()
  const [statsRef, statsInView] = useInView()

  return (
    <section className="section about-section" id="about">
      <div className="inner">
        <div className="about-inner">
          <div className="about-left">
            <div className="about-num">03</div>
          </div>
          <div className="about-right" ref={textRef}>
            <span className="about-tag">— About Codviser</span>
            <p className={`about-lead${textInView ? ' visible' : ''}`}>
              We don't just build products — we engineer experiences that move
              people and convert audiences into loyal users.
            </p>
            <p className={`about-lead${textInView ? ' visible' : ''}`} style={{ fontFamily: 'DM Mono, monospace', color: 'var(--muted)' }}>
              From strategy to execution, every pixel and every line of code is
              intentional. We partner with ambitious brands to deliver work that
              actually performs.
            </p>
            <div className={`about-stats${statsInView ? ' visible' : ''}`} ref={statsRef}>
              {[{ n: '100%', l: 'In-House Talent' }, { n: '10x', l: 'Faster Delivery' }, { n: '∞', l: 'Creative Energy' }].map(s => (
                <div className="about-stat-item" key={s.l}>
                  <div className="stat-num">{s.n}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

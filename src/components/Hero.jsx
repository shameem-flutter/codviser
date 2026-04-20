import { useState, useEffect } from 'react';

export default function Hero() {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => { const t = setTimeout(() => setRevealed(true), 80); return () => clearTimeout(t) }, [])

  const lines = [
    { text: 'We Build.',  accent: false },
    { text: 'We Market.', accent: false },
    { text: <>We <span className="accent">Advise.</span></>, accent: true },
  ]

  return (
    <section className="section hero-section" id="hero">
      <div className="hero-grid-bg" />
      <div className="inner">
        <div className="hero-inner">
          <div className="hero-eyebrow">— Digital Agency  ·  Est. 2026</div>
          <div className="hero-lines">
            {lines.map((l, i) => (
              <div key={i} className={`hero-line${revealed ? ' revealed' : ''}`}>
                {l.text}
              </div>
            ))}
          </div>
          <div className="hero-sub">
            <div className="hero-sub-line" />
            <p>Codviser — Digital solutions for brands that mean business.</p>
          </div>
          <div className="hero-scroll">
            <div className="scroll-bar" />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  )
}

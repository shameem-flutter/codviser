import { useState, useEffect } from 'react';

export default function Hero() {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="section hero-section" id="hero">
      <div className="inner">
        <div className="hero-content">
          <div className={`hero-badge reveal-up${revealed ? ' reveal-visible' : ''}`}>
            Built for the future of engineering.
          </div>
          
          <h1 className={`hero-headline reveal-up stagger-1${revealed ? ' reveal-visible' : ''}`}>
            We build software that<br />
            thinks with your business.
          </h1>
          
          <p className={`hero-subheadline reveal-up stagger-2${revealed ? ' reveal-visible' : ''}`}>
            Codviser is a product engineering agency that turns complex problems into clean, scalable digital solutions.
          </p>
          
          <div className={`hero-actions reveal-up stagger-3${revealed ? ' reveal-visible' : ''}`}>
            <a href="#contact" className="btn-primary">
              Start a project
            </a>
            <a href="#services" className="btn-ghost">
              Explore services <span className="link-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


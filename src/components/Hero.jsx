import { useState, useEffect } from 'react';

export default function Hero() {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="section hero-section" id="hero">
      <div className="hero-grid-bg" />
      <div className="inner">
        <div className="hero-inner">
          <div className="hero-text">
            <div className={`hero-badge reveal-up${revealed ? ' reveal-visible' : ''}`}>
              Now taking projects for Q3 2025
            </div>
            
            <h1 className={`hero-headline reveal-up stagger-1${revealed ? ' reveal-visible' : ''}`}>
              We build software that<br />
              thinks with your business
              <span className="cursor" />
            </h1>
            
            <p className={`hero-subheadline reveal-up stagger-2${revealed ? ' reveal-visible' : ''}`}>
              Codviser is a product engineering agency that turns complex problems into clean, scalable digital solutions — from MVP to full-scale platform.
            </p>
            
            <div className={`hero-actions reveal-up stagger-3${revealed ? ' reveal-visible' : ''}`}>
              <a href="#contact" className="btn-primary">
                Start a project ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


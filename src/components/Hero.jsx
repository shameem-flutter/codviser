import { useState, useEffect } from 'react';

export default function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Reveal animation on mount
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        .hero-section {
          background: var(--bg);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8rem 2rem;
          position: relative;
        }

        .hero-content {
          max-width: 1100px;
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: inline-block;
          font-size: 14px;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 24px;
          letter-spacing: 0.05em;
        }

        .hero-headline {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          color: var(--text);
          margin-bottom: 32px;
        }

        .hero-subheadline {
          font-size: clamp(18px, 2.2vw, 22px);
          color: var(--text-secondary);
          max-width: 900px;
          margin: 0 auto 56px auto;
          line-height: 1.5;
          font-weight: 400;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }

        .btn-primary {
          background: var(--accent);
          color: var(--white);
          padding: 16px 36px;
          border-radius: var(--radius-pill);
          font-size: 19px;
          font-weight: 500;
          text-decoration: none;
          transition: var(--transition);
        }

        .btn-primary:hover {
          filter: brightness(1.1);
          transform: scale(1.02);
        }

        .btn-ghost {
          color: var(--accent);
          font-size: 19px;
          font-weight: 500;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: var(--transition);
        }

        .btn-ghost:hover .link-arrow {
          transform: translateX(4px);
        }

        .link-arrow {
          transition: var(--transition);
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 8rem 1.5rem 4rem;
          }
          .hero-actions {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>

      <section className="section hero-section" id="hero">
        <div className="hero-content">
          <div className={`hero-badge reveal-up${revealed ? ' reveal-visible' : ''}`}>
            Built for the future of engineering.
          </div>

          <h1 className={`hero-headline reveal-up stagger-1${revealed ? ' reveal-visible' : ''}`}>
            We build software that<br />
            thinks with your business.
          </h1>

          <p className={`hero-subheadline reveal-up stagger-2${revealed ? ' reveal-visible' : ''}`}>
            Codviser is a product engineering agency that turns complex problems into
            clean, scalable digital solutions.
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
      </section>
    </>
  );
}

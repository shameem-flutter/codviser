/**
 * index.jsx  (Hero entry point)
 * ─────────────────────────────────────────────────────────────
 * Assembles the hero section from its sub-components.
 * To customise the effect, edit hero.config.js only.
 * ─────────────────────────────────────────────────────────────
 */
import { useState, useEffect, useRef } from 'react';
import './hero.css';
import { HERO_BG, GRADIENT_TEXT, BADGE, CTA_BUTTON } from './hero.config';
import HeroBlobs from './HeroBlobs';
import HeroGlassCard from './HeroGlassCard';

export default function Hero() {
  const [revealed, setRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    // Trigger reveal animation shortly after mount
    const timer = setTimeout(() => setRevealed(true), 100);

    // Track mouse for blob parallax
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,   // -1 → 1
        y: (e.clientY / window.innerHeight - 0.5) * 2,  // -1 → 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const reveal = (extra = '') =>
    `reveal-up${revealed ? ' reveal-visible' : ''} ${extra}`.trim();

  return (
    <section
      ref={sectionRef}
      className="section hero-section"
      id="hero"
      style={{ background: HERO_BG }}  /* ← Change HERO_BG in hero.config.js */
    >
      {/* ── Animated liquid blob background ── */}
      <HeroBlobs mousePos={mousePos} />

      {/* ── Frosted glass content card ── */}
      <HeroGlassCard>
        <div className="hero-content">

          {/* Badge */}
          <div
            className={reveal()}
            style={{
              display: 'inline-block',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 24,
              padding: '6px 16px',
              borderRadius: 980,
              color: BADGE.accentColor,
              background: `rgba(0, 113, 227, ${BADGE.bgAlpha})`,
              border: `1px solid rgba(0, 113, 227, ${BADGE.borderAlpha})`,
            }}
          >
            Built for the future of engineering.
          </div>

          {/* Headline */}
          <h1 className={`hero-headline ${reveal('stagger-1')}`}>
            We build software that<br />
            <span
              className="hero-gradient-text"
              style={{ backgroundImage: GRADIENT_TEXT }}
            >
              thinks with your business.
            </span>
          </h1>

          {/* Subheadline */}
          <p className={`hero-subheadline ${reveal('stagger-2')}`}>
            Codviser is a product engineering agency that turns complex problems into
            clean, scalable digital solutions.
          </p>

          {/* CTA Buttons */}
          <div className={`hero-actions ${reveal('stagger-3')}`}>
            <a
              href="#contact"
              className="btn-primary"
              style={{ boxShadow: `0 4px 24px ${CTA_BUTTON.shadowColor}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 8px 40px ${CTA_BUTTON.shadowColorHover}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 4px 24px ${CTA_BUTTON.shadowColor}`;
              }}
            >
              Start a project
            </a>
            <a href="#services" className="btn-ghost">
              Explore services <span className="link-arrow">→</span>
            </a>
          </div>

        </div>
      </HeroGlassCard>
    </section>
  );
}

import React from 'react';
import { useInView } from '../../hooks/useInView';
import { aboutConfig as config } from './about.config';
import { aboutColors as colors } from './about.colors';
import './about.css';

export default function About() {
  const [headerRef, headerInView] = useInView(0.1);
  const [narrativeRef, narrativeInView] = useInView(0.1);
  const [sidebarRef, sidebarInView] = useInView(0.1);

  const reveal = (inView, extra = '') => 
    `reveal-up${inView ? ' reveal-visible' : ''} ${extra}`.trim();

  const sectionStyles = {
    '--about-bg': colors.background,
    '--about-accent': colors.accent,
    '--about-text': colors.text,
    '--about-text-secondary': colors.textSecondary,
    '--about-glass-border': colors.glassBorder,
    '--about-principle-hover': colors.principleHover,
  };

  return (
    <section className="section about-section" id="about" style={sectionStyles}>
      <div className="inner">
        <div className="about-grid">
          
          {/* Left Column: Narrative & Story */}
          <div className="about-narrative" ref={narrativeRef}>
            <div className={`about-header ${reveal(headerInView)}`} ref={headerRef}>
              <span className="section-eyebrow">{config.eyebrow}</span>
              <h2 className="about-headline">{config.headline}</h2>
            </div>

            <div className={`story-block ${reveal(narrativeInView, 'stagger-1')}`}>
              <h3 className="story-title">{config.story.title}</h3>
              {config.story.paragraphs.map((p, i) => (
                <p key={i} className="story-text">{p}</p>
              ))}
            </div>

            <div className={`story-block ${reveal(narrativeInView, 'stagger-2')}`}>
              <h3 className="story-title">{config.experience.title}</h3>
              <p className="story-text">{config.experience.content}</p>
            </div>
          </div>

          {/* Right Column: Experience, Mission, Principles (Sticky) */}
          <div className="about-sidebar" ref={sidebarRef}>
            <div className={`sidebar-block ${reveal(sidebarInView)}`}>
              <h4 className="sidebar-title">{config.mission.title}</h4>
              <div className="sidebar-content">
                {config.mission.paragraphs.map((p, i) => {
                  if (config.mission.boldText && p.includes(config.mission.boldText)) {
                    const parts = p.split(config.mission.boldText);
                    return (
                      <p key={i} style={{ marginBottom: i === 0 ? '16px' : '0' }}>
                        <strong>{config.mission.boldText}</strong>{parts[1]}
                      </p>
                    );
                  }
                  return (
                    <p key={i} style={{ marginBottom: i === 0 ? '16px' : '0' }}>
                      {p}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className={`sidebar-block ${reveal(sidebarInView, 'stagger-1')}`}>
              <h4 className="sidebar-title">{config.principlesSection.title}</h4>
              <div className="principles-grid">
                {config.principlesSection.items.map((p, i) => (
                  <div key={i} className="principle-card">
                    <h5 className="principle-title">{p.title}</h5>
                    <p className="principle-desc">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`about-cta-container ${reveal(sidebarInView, 'stagger-2')}`}>
              <a href={config.cta.link} className="btn-primary">
                {config.cta.text} <span style={{ marginLeft: '8px' }}>→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

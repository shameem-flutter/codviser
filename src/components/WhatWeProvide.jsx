import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useIsMobile } from '../hooks/useIsMobile';

const SERVICES_DATA = [
  {
    id: 's1',
    num: '01',
    title: 'Website Development',
    desc: 'High-performance, scalable web applications built with modern frameworks to ensure speed, security, and a seamless user experience across all devices.',
    features: ['React & Next.js Expertise', 'SEO Optimization', 'Responsive Architecture'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M13 5l-2 14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 's2',
    num: '02',
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile solutions that combine intuitive UI with robust performance, helping you reach your audience wherever they are.',
    features: ['iOS & Android', 'React Native / Flutter', 'Cloud Sync'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 18h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 's3',
    num: '03',
    title: 'Brand Identity',
    desc: 'Crafting unique visual identities and strategic branding that resonate with your target audience and establish a lasting market presence.',
    features: ['Logo Design', 'Visual Guidelines', 'Brand Voice'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 's4',
    num: '04',
    title: 'Digital Marketing',
    desc: 'Data-driven marketing strategies including SEO, SEM, and social media campaigns designed to maximize your ROI and grow your online presence.',
    features: ['PPC Campaigns', 'Content Strategy', 'Analytics & Reporting'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 's5',
    num: '05',
    title: 'UI/UX Excellence',
    desc: 'User-centric design processes that focus on usability and aesthetics to create digital products that are not just beautiful, but functional and engaging.',
    features: ['User Research', 'Wireframing & Prototyping', 'Interactive Motion'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    id: 's6',
    num: '06',
    title: 'Custom SaaS Solutions',
    desc: 'End-to-end development of sophisticated Software as a Service products tailored to solve complex business problems and scale with your growth.',
    features: ['Multi-tenant Architecture', 'API Integration', 'Scalable Backend'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
]

export default function WhatWeProvide() {
  const isMobile = useIsMobile()
  const [ref, inView] = useInView(0.1)

  return (
    <section className="section provide-section" id="services">
      <div className="inner provide-inner" ref={ref}>
        <div className={`provide-header reveal-up${inView ? ' reveal-visible' : ''}`}>
          <span className="section-eyebrow">01 — Our Expertise</span>
          <h2 className="section-title">What We Provide</h2>
          <p className="section-subtitle">Delivering high-impact digital solutions through specialized engineering and creative strategy.</p>
        </div>

        <div className={`sliding-cards ${inView ? 'reveal-visible' : ''}`}>
          {SERVICES_DATA.map((s, idx) => (
            <div
              key={s.id}
              className={`glass-card reveal-up stagger-${idx + 1}${inView ? ' reveal-visible' : ''}`}
            >
              <div className="card-icon-wrapper">
                {s.icon}
              </div>

              <div className="card-body">
                <h3 className="card-title">{s.title}</h3>
                <p className="card-desc">{s.desc}</p>
              </div>

              <div className="card-footer">
                <span className="btn-ghost">
                  Learn more <span className="link-arrow">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

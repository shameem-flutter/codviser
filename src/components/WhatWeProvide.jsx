import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { useIsMobile } from '../hooks/useIsMobile';

const SERVICES_DATA = [
  { 
    id: 's1', 
    num: '01', 
    title: 'Website Development', 
    desc: 'High-performance, scalable web applications built with modern frameworks to ensure speed, security, and a seamless user experience across all devices.',
    features: ['React & Next.js Expertise', 'SEO Optimization', 'Responsive Architecture']
  },
  { 
    id: 's2', 
    num: '02', 
    title: 'Mobile App Development', 
    desc: 'Native and cross-platform mobile solutions that combine intuitive UI with robust performance, helping you reach your audience wherever they are.',
    features: ['iOS & Android', 'React Native / Flutter', 'Cloud Sync']
  },
  { 
    id: 's3', 
    num: '03', 
    title: 'Brand Identity', 
    desc: 'Crafting unique visual identities and strategic branding that resonate with your target audience and establish a lasting market presence.',
    features: ['Logo Design', 'Visual Guidelines', 'Brand Voice']
  },
  { 
    id: 's4', 
    num: '04', 
    title: 'Digital Marketing', 
    desc: 'Data-driven marketing strategies including SEO, SEM, and social media campaigns designed to maximize your ROI and grow your online presence.',
    features: ['PPC Campaigns', 'Content Strategy', 'Analytics & Reporting']
  },
  { 
    id: 's5', 
    num: '05', 
    title: 'UI/UX Excellence', 
    desc: 'User-centric design processes that focus on usability and aesthetics to create digital products that are not just beautiful, but functional and engaging.',
    features: ['User Research', 'Wireframing & Prototyping', 'Interactive Motion']
  },
  { 
    id: 's6', 
    num: '06', 
    title: 'Custom SaaS Solutions', 
    desc: 'End-to-end development of sophisticated Software as a Service products tailored to solve complex business problems and scale with your growth.',
    features: ['Multi-tenant Architecture', 'API Integration', 'Scalable Backend']
  }
]

export default function WhatWeProvide() {
  const [activeId, setActiveId] = useState(SERVICES_DATA[0].id)
  const isMobile = useIsMobile()
  const [ref, inView] = useInView(0.15)

  const activeService = SERVICES_DATA.find(s => s.id === activeId) || SERVICES_DATA[0]

  const handleToggle = (id) => {
    if (isMobile && activeId === id) {
      setActiveId(null) // Toggle off if already active on mobile
    } else {
      setActiveId(id)
    }
  }

  return (
    <section className="section provide-section" id="services">
      <div className="inner provide-inner" ref={ref}>
        <div className={`provide-header reveal-up${inView ? ' reveal-visible' : ''}`}>
          <span className="section-eyebrow">01 — Services</span>
          <h2 className="section-title">What We Provide</h2>
        </div>
        
        <div className={`provide-grid reveal-up stagger-1${inView ? ' reveal-visible' : ''}`}>
          {/* Left: Service List */}
          <div className="provide-list">
            {SERVICES_DATA.map(s => (
              <div 
                key={s.id} 
                className={`provide-item${activeId === s.id ? ' active' : ''}`}
                onMouseEnter={() => !isMobile && setActiveId(s.id)}
                onClick={() => handleToggle(s.id)}
              >
                <div className="provide-item-main">
                  <span className="p-num">{s.num}</span>
                  <span className="p-title">{s.title}</span>
                  <div className="p-arrow">{activeId === s.id && isMobile ? '↓' : '→'}</div>
                </div>

                {/* Mobile-only nested detail (Accordion) */}
                {isMobile && activeId === s.id && (
                  <div className="p-mobile-detail">
                    <p>{s.desc}</p>
                    <ul className="p-mob-features">
                      {s.features.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Detail Panel (Desktop only) */}
          <div className="provide-detail">
            <div className="detail-content" key={activeService.id}>
              <h3 className="detail-title">{activeService.title}</h3>
              <p className="detail-desc">{activeService.desc}</p>
              <ul className="detail-features">
                {activeService.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

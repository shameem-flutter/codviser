import { useState } from 'react';
import { useInView } from '../hooks/useInView';

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
  const [active, setActive] = useState(SERVICES_DATA[0])
  const [ref, inView] = useInView(0.15)

  return (
    <section className="section provide-section" id="services">
      <div className="inner provide-inner" ref={ref}>
        <div className={`provide-header${inView ? ' visible' : ''}`}>
          <span className="section-eyebrow">01 — Services</span>
          <h2 className="section-title">What We Provide</h2>
        </div>
        
        <div className={`provide-grid${inView ? ' visible' : ''}`}>
          {/* Left: Service List */}
          <div className="provide-list">
            {SERVICES_DATA.map(s => (
              <div 
                key={s.id} 
                className={`provide-item${active.id === s.id ? ' active' : ''}`}
                onMouseEnter={() => setActive(s)}
                onClick={() => setActive(s)}
              >
                <span className="p-num">{s.num}</span>
                <span className="p-title">{s.title}</span>
                <div className="p-arrow">→</div>
              </div>
            ))}
          </div>

          {/* Right: Detail Panel */}
          <div className="provide-detail">
            <div className="detail-content" key={active.id}>
              <h3 className="detail-title">{active.title}</h3>
              <p className="detail-desc">{active.desc}</p>
              <ul className="detail-features">
                {active.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

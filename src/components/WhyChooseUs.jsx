import React from 'react';
import { useInView } from '../hooks/useInView';

const WHY_CARDS = [
  { num: '01', title: 'Speed', desc: 'We deliver at startup speed without compromising on enterprise-grade stability and security.' },
  { num: '02', title: 'Quality', desc: 'Our "brutally minimal" philosophy ensures focus on what matters: performance and usability.' },
  { num: '03', title: 'Partnership', desc: 'We don’t just work for you; we work with you. Your goals become our engineering mission.' },
  { num: '04', title: 'Results', desc: 'Every line of code and every pixel is measured against the value it adds to your business.' }
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView(0.1)

  return (
    <section className="section why-section" id="why-us">
      <div className="inner why-inner" ref={ref}>
        <div className={`provide-header reveal-up${inView ? ' reveal-visible' : ''}`}>
          <span className="section-eyebrow">02 — Why Us</span>
          <h2 className="section-title">Why Choose Us</h2>
        </div>

        <div className={`why-grid${inView ? ' visible' : ''}`}>
          {WHY_CARDS.map((card, i) => (
            <div 
              className={`why-card reveal-up stagger-${i + 1}${inView ? ' reveal-visible' : ''}`} 
              key={card.num}
            >
              <div className="why-num">{card.num}</div>
              <h3 className="why-card-title">{card.title}</h3>
              <p className="why-card-desc">{card.desc}</p>
              <div className="why-bg-num">{card.num}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

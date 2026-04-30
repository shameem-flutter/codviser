import React, { useEffect, useState } from 'react';
import './faq.css';
import Footer from '../Footer';
import { faqConfig } from './faq.config';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <section className="section faq-hero">
        <div className="inner">
          <span className="section-eyebrow reveal-up reveal-visible">Support</span>
          <h1 className="section-title reveal-up reveal-visible stagger-1">
            Frequently Asked Questions
          </h1>
          <p className="section-subtitle reveal-up reveal-visible stagger-2">
            Find answers to common questions about our services, process, and how we can help your business grow.
          </p>
        </div>
      </section>

      <section className="section faq-content">
        <div className="inner">
          <div className="faq-list">
            {faqConfig.map((item, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeIndex === index ? 'active' : ''} reveal-up reveal-visible`}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <button 
                  className="faq-question" 
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                >
                  <span className="question-text">
                    {item.question}
                  </span>
                  <span className="faq-icon"></span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">
                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                    {item.keywords && (
                      <div className="kw-strip">
                        {item.keywords.map((kw, i) => (
                          <span key={i} className="kw">{kw}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

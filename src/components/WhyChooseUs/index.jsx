import React, { useRef, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WHY_DATA } from './why.config';
import SocialIconsRow from '../SocialIconsRow';
import './why.css';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const [ref, inView] = useInView(0.1)
  const timelineRef = useRef(null)
  const dotRef = useRef(null)
  const trailRef = useRef(null)
  const itemRefs = useRef([])

  const socialIconsRef = useRef(null)

  useEffect(() => {
    // Determine scroller based on device (mobile uses window, desktop uses .scroll-wrapper)
    const isMobileDevice = window.innerWidth <= 768;
    const scroller = isMobileDevice ? window : ".scroll-wrapper";
    
    // Ensure the scroller is ready
    const scrollContainer = isMobileDevice ? window : document.querySelector(scroller);
    if (!scrollContainer || !timelineRef.current || !dotRef.current || !trailRef.current) return;

    let mm = gsap.matchMedia();

    // Small delay to allow layout to stabilize
    const timeoutId = setTimeout(() => {
      
      mm.add({
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)"
      }, (context) => {
        let { isMobile } = context.conditions;
        const activeScroller = isMobile ? window : ".scroll-wrapper";

        // Recalculate positions inside matchMedia
        const firstItem = itemRefs.current[0];
        const lastItem = itemRefs.current[itemRefs.current.length - 1];
        if (!firstItem || !lastItem) return;

        const startPos = firstItem.offsetTop + firstItem.offsetHeight / 2;
        const endPos = lastItem.offsetTop + lastItem.offsetHeight / 2;
        const totalDistance = endPos - startPos;

        // Set initial dot position
        gsap.set(dotRef.current, { top: 0 });

        // 1. Dot & Trail Progress
        gsap.to(dotRef.current, {
          top: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: () => `top+=${startPos} center`,
            end: () => `top+=${endPos} center`,
            scrub: 0.8,
            scroller: activeScroller,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (trailRef.current) {
                trailRef.current.style.height = `${self.progress * 100}%`;
              }
            }
          }
        });

        // Adjust the line's visual start and end
        const line = timelineRef.current.querySelector('.timeline-line');
        if (line) {
          line.style.top = `${startPos}px`;
          line.style.height = `${totalDistance}px`;
        }

        // 2. Section Reveals & Pulses
        itemRefs.current.forEach((item, i) => {
          if (!item) return;
          const isLeft = i % 2 === 0;
          const card = item.querySelector('.timeline-card');
          const title = item.querySelector('.card-title');
          const desc = item.querySelector('.card-desc');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              // Refined triggers for a smoother center-focused fade
              start: isMobile ? "top 92%" : "top 75%",
              end: isMobile ? "top 55%" : "top 35%",
              scrub: 0.5,
              scroller: activeScroller,
              onEnter: () => dotRef.current?.classList.add('pulsing'),
              onLeave: () => dotRef.current?.classList.remove('pulsing'),
              onEnterBack: () => dotRef.current?.classList.add('pulsing'),
              onLeaveBack: () => dotRef.current?.classList.remove('pulsing'),
            }
          });

          tl.fromTo(item, 
            { 
              opacity: 0, 
              scale: isMobile ? 0.92 : 1,
              filter: isMobile ? "blur(8px)" : "none" 
            }, 
            { 
              opacity: 1, 
              scale: 1, 
              filter: isMobile ? "blur(0px)" : "none",
              ease: "power2.out" 
            }
          )
          .fromTo(card,
            { 
              // Desktop: alternate sides. Mobile: all slide from right.
              x: isMobile ? 20 : (isLeft ? -30 : 30), 
              y: isMobile ? 0 : 10 
            },
            { x: 0, y: 0, ease: "power2.out" },
            0
          )
          .fromTo([title, desc],
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, ease: "power2.out" },
            0.1
          );
        });

        // 3. Social Icons Stagger Animation
        if (socialIconsRef.current) {
          const icons = socialIconsRef.current.querySelectorAll('.social-icon-wrapper');
          gsap.fromTo(icons, 
            { 
              opacity: 0, 
              y: 30,
              scale: 0.8,
              rotateX: 45
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              stagger: 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: socialIconsRef.current,
                start: "top 95%",
                scroller: activeScroller,
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, 200); // Slightly longer delay for stability

    return () => {
      clearTimeout(timeoutId);
      mm.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="section why-section" id="why-us">
      {/* Background Atmosphere Blobs */}
      <div className="why-blobs">
        <div className="why-blob blob-1"></div>
        <div className="why-blob blob-2"></div>
      </div>

      <div className="inner why-inner" ref={ref}>
        <div className={`provide-header reveal-up${inView ? ' reveal-visible' : ''}`}>
          <span className="section-eyebrow">{WHY_DATA.eyebrow}</span>
          <h2 className="section-title">{WHY_DATA.title}</h2>
          {WHY_DATA.subtitle && (
            <p className="section-subtitle">{WHY_DATA.subtitle}</p>
          )}
        </div>

        <div className="timeline-container" ref={timelineRef}>
          <div className="timeline-line">
            <div className="timeline-trail" ref={trailRef}></div>
            <div className="timeline-dot" ref={dotRef}></div>
          </div>
          
          {WHY_DATA.cards.map((card, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div 
                className={`timeline-item ${isLeft ? 'left' : 'right'}`} 
                key={card.num}
                ref={el => itemRefs.current[i] = el}
              >
                <div className="glass-card timeline-card">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-desc">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="why-footer-icons" ref={socialIconsRef}>
          <SocialIconsRow />
        </div>
      </div>
    </section>
  )
}

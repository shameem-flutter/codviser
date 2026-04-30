import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCROLLER = ".scroll-wrapper";

export const initIntroAnimation = (list, container, isMobileParam) => {
  if (!list || !container) return;

  const items = list.querySelectorAll("li");
  if (!items.length) return;

  const isMobile = isMobileParam !== undefined ? isMobileParam : window.innerWidth <= 768;
  const activeScroller = isMobile ? window : SCROLLER;

  const triggers = [];

  if (isMobile) {
    const label = container.querySelector(".intro-sticky-label");
    if (label) {
      const stLabel = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scroller: activeScroller,
        onUpdate: (self) => {
          const labelH = label.offsetHeight;
          const containerH = container.offsetHeight;
          const viewportH = window.innerHeight;
          
          const scrollPos = self.scroll();
          const startPos = self.start;
          
          const movedUp = scrollPos - startPos;
          const targetY = movedUp - (viewportH / 2) - (labelH / 2);
          
          const clamped = Math.max(0, Math.min(targetY, containerH - labelH));
          
          gsap.set(label, { y: clamped });
        }
      });
      triggers.push(stLabel);
    }
  }

  // Set initial state for words AFTER mobile label measurement
  gsap.set(items, {
    opacity: 0.2,
    y: 20,
    scale: 0.95,
    filter: "brightness(1)",
  });

  // ── Word fade-in / fade-out ──────────────────────────────────────────────
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;

    const stIn = ScrollTrigger.create({
      trigger: item,
      start: "top 75%",
      end: "center 55%",
      scroller: activeScroller,
      animation: gsap.to(item, {
        opacity: 1,
        y: 0,
        scale: 1.05,
        filter: "brightness(1.15)",
        ease: "power2.out",
      }),
      scrub: 1.2,
    });
    triggers.push(stIn);

    if (!isLast) {
      const stOut = ScrollTrigger.create({
        trigger: item,
        start: "center 45%",
        end: "bottom 25%",
        scroller: activeScroller,
        animation: gsap.to(item, {
          opacity: 0.15,
          y: -20,
          scale: 0.95,
          filter: "brightness(1)",
          ease: "power2.in",
        }),
        scrub: 1.2,
      });
      triggers.push(stOut);
    }
  });

  return () => {
    triggers.forEach((t) => t.kill());
  };
};
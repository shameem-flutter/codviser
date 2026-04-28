import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCROLLER = ".scroll-wrapper";

export const initIntroAnimation = (list, container) => {
  if (!list || !container) return;

  const items = list.querySelectorAll("li");
  if (!items.length) return;

  const isMobile = window.innerWidth <= 768;
  const activeScroller = isMobile ? window : SCROLLER;

  // Initial state
  gsap.set(items, {
    opacity: 0.2,
    y: 20,
    scale: 0.95,
    filter: "brightness(1)",
  });

  const triggers = [];

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;

    // Fade In & Scale Up
    const stIn = ScrollTrigger.create({
      trigger: item,
      start: "top 65%",
      end: "top 45%",
      scroller: activeScroller,
      animation: gsap.to(item, {
        opacity: 1,
        y: 0,
        scale: 1.05,
        filter: "brightness(1.2)",
        ease: "power1.out",
      }),
      scrub: 1, // Smooth scrubbing
    });
    triggers.push(stIn);

    // Fade Out & Scale Down (unless it's the last item)
    if (!isLast) {
      const stOut = ScrollTrigger.create({
        trigger: item,
        start: "bottom 55%",
        end: "bottom 35%",
        scroller: activeScroller,
        animation: gsap.to(item, {
          opacity: 0.2,
          y: -20,
          scale: 0.95,
          filter: "brightness(1)",
          ease: "power1.in",
        }),
        scrub: 1,
      });
      triggers.push(stOut);
    }
  });

  return () => {
    triggers.forEach((t) => t.kill());
  };
};
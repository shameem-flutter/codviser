import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCROLLER = ".scroll-wrapper";

export const initIntroAnimation = (list, container) => {
  if (!list || !container) return;

  const items = list.querySelectorAll("li");
  if (!items.length) return;

  // Initial state
  gsap.set(items, {
    opacity: (i) => (i === 0 ? 1 : 0.25),
    y: 20,
    scale: 1,
    filter: "brightness(1)",
  });

  const triggers = [];

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;

    const st = ScrollTrigger.create({
      trigger: item,
      start: "top 55%",
      end: isLast ? "bottom -100%" : "bottom 45%", // Last item stays active as it moves off screen
      scroller: SCROLLER,

      onEnter: () =>
        gsap.to(item, {
          opacity: 1,
          y: 0,
          scale: 1.05,
          filter: "brightness(1.2)",
          duration: 0.4,
          ease: "power2.out",
        }),

      onLeave: () => {
        if (isLast) return; // Don't dim the last item; it should move with 'we can'
        gsap.to(item, {
          opacity: 0.25,
          y: 20,
          scale: 1,
          filter: "brightness(1)",
          duration: 0.3,
          ease: "power2.in",
        });
      },

      onEnterBack: () =>
        gsap.to(item, {
          opacity: 1,
          y: 0,
          scale: 1.05,
          filter: "brightness(1.2)",
          duration: 0.4,
          ease: "power2.out",
        }),

      onLeaveBack: () =>
        gsap.to(item, {
          opacity: 0.25,
          y: 20,
          scale: 1,
          filter: "brightness(1)",
          duration: 0.3,
          ease: "power2.in",
        }),
    });

    triggers.push(st);
  });

  return () => {
    triggers.forEach((t) => t.kill());
  };
};
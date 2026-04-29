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

  const triggers = [];

  if (isMobile) {
    const label = container.querySelector(".intro-sticky-label");

    if (label) {
      // Clear any prior transforms
      label.style.transform = "";
      label.style.willChange = "transform";

      // Measure BEFORE GSAP touches the items — clean layout snapshot
      const labelDocTop = window.scrollY + label.getBoundingClientRect().top;
      const labelH = label.offsetHeight;
      const viewportH = window.innerHeight;

      // This constant never changes after init:
      // shift = scrollY + viewportH/2 - labelH/2 - labelDocTop
      //       = scrollY + C
      const C = viewportH / 2 - labelH / 2 - labelDocTop;

      // Section height measured lazily (after GSAP has run) so we clamp correctly
      let sectionH = 0;

      const updateLabel = () => {
        if (!sectionH) sectionH = container.offsetHeight;
        const shift = window.scrollY + C;
        const clamped = Math.max(0, Math.min(shift, sectionH - labelH));
        label.style.transform = `translateY(${clamped}px)`;
      };

      // Attach scroll listener BEFORE GSAP initial state so nothing shifts our measurement
      window.addEventListener("scroll", updateLabel, { passive: true });

      // Set initial position on next frame (after browser paints initial layout)
      const rafId = requestAnimationFrame(updateLabel);

      triggers.push({
        kill: () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener("scroll", updateLabel);
          if (label) label.style.transform = "";
        },
      });
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
      start: "top 68%",
      end: "top 42%",
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
        start: "bottom 58%",
        end: "bottom 32%",
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
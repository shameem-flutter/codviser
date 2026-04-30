import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCROLLER = ".scroll-wrapper";

export const initIntroAnimation = (list, container, isMobileParam) => {
  if (!list || !container) return;

  const label = container.querySelector(".intro-sticky-label");
  const items = list.querySelectorAll("li");
  if (!items.length) return;

  const isMobile =
    isMobileParam !== undefined ? isMobileParam : window.innerWidth <= 768;
  const activeScroller = isMobile ? window : SCROLLER;
  const triggers = [];

  /* ────────────────────────────────────────────────────────────
     MOBILE — label is position:fixed at viewport center-left.
     We use a scroll listener to control its opacity:
     - Fade in when the first word is near viewport center
     - Stay visible while any word is near center
     - Fade out when no word is near (above or below section)
     ──────────────────────────────────────────────────────────── */
  if (isMobile && label) {
    // Start hidden
    label.style.opacity = "0";

    const onScroll = () => {
      const viewportCenter = window.innerHeight / 2;

      // Find the word closest to viewport center
      let closestDist = Infinity;

      for (let i = 0; i < items.length; i++) {
        const r = items[i].getBoundingClientRect();
        const itemCenter = r.top + r.height / 2;
        const dist = Math.abs(itemCenter - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
        }
      }

      // Fade based on proximity to viewport center
      const threshold = window.innerHeight * 0.2; 
      if (closestDist < threshold) {
        // Precise transition
        const opacity = Math.min(1, Math.max(0, 1 - (closestDist / threshold)));
        label.style.opacity = String(opacity);
      } else {
        label.style.opacity = "0";
      }
    };

    // Fire immediately + on scroll
    requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    triggers.push({
      kill: () => window.removeEventListener("scroll", onScroll),
    });
  }

  /* ────────────────────────────────────────────────────────────
     DESKTOP — label uses CSS sticky; just fade it in.
     ──────────────────────────────────────────────────────────── */
  if (!isMobile && label) {
    gsap.set(label, { opacity: 0 });
    const stLabelFade = ScrollTrigger.create({
      trigger: items[0],
      start: "top 75%",
      end: "top 55%",
      scroller: activeScroller,
      scrub: 2,
      animation: gsap.to(label, { opacity: 1 }),
    });
    triggers.push(stLabelFade);
  }

  /* ────────────────────────────────────────────────────────────
     ALL: Word initial state
     ──────────────────────────────────────────────────────────── */
  gsap.set(items, {
    opacity: 0.1,
    y: 0,
    scale: 0.98,
    filter: "brightness(1)",
  });

  /* ────────────────────────────────────────────────────────────
     ALL: Word fade-in / fade-out per scroll position
     ──────────────────────────────────────────────────────────── */
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;

    // Reaches full highlight exactly at the line (50%) and stays active upwards
    const inStart = isMobile ? "center 53%" : "top 75%";
    const inEnd = isMobile ? "center 50%" : "center 50%";
    const outStart = isMobile ? "center 45%" : "center 45%";
    const outEnd = isMobile ? "center 35%" : "bottom 15%";

    const stIn = ScrollTrigger.create({
      trigger: item,
      start: inStart,
      end: inEnd,
      scroller: activeScroller,
      animation: gsap.to(item, {
        opacity: 1,
        scale: 1, 
        filter: "brightness(1.15)",
        ease: "none",
        force3D: true,
      }),
      scrub: isMobile ? 0.8 : 2, // Increased scrub lag
    });
    triggers.push(stIn);

    if (!isLast) {
      const stOut = ScrollTrigger.create({
        trigger: item,
        start: outStart,
        end: outEnd,
        scroller: activeScroller,
        animation: gsap.to(item, {
          opacity: 0.1,
          scale: 1,
          filter: "brightness(1)",
          ease: "none",
          force3D: true,
        }),
        scrub: isMobile ? 0.8 : 2, // Increased scrub lag
      });
      triggers.push(stOut);
    }
  });

  return () => {
    triggers.forEach((t) => t.kill());
  };
};
import { useEffect, useRef } from "react";
import { initIntroAnimation } from "./intro.config";
import "./intro.css";

const words = [
  "design.",
  "engineer.",
  "build.",
  "iterate.",
  "optimize.",
  "scale.",
  "deploy.",
  "prototype.",
  "transform.",
  "innovate.",
  "automate.",
  "collaborate.",
  "deliver.",
  "grow.",
  "lead.",
  "dominate.",
  "do it.",
];

export default function ScrollIntro() {
  const listRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // The scroll container is .scroll-wrapper, NOT the document.
    // CSS animation-timeline: view() reads the document scroll — it will
    // NOT work here. We always use GSAP wired to .scroll-wrapper.
    const cleanup = initIntroAnimation(listRef.current, containerRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    // scroll-snap-align: start is set in CSS so this section locks in view
    <div className="intro-container" ref={containerRef}>

      {/* Word journey — sticky label + scrollable list */}
      <div className="intro-scroll-body">
        <section className="intro-section">
          <p className="intro-sticky-label" aria-hidden="true">
            we can&nbsp;
          </p>

          <ul
            className="intro-list"
            ref={listRef}
            style={{ "--count": words.length }}
            aria-label="we can design, engineer, build and more."
          >
            {words.map((word, i) => (
              <li key={i} style={{ "--i": i }}>
                {word}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
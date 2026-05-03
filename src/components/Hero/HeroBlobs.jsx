/**
 * HeroBlobs.jsx
 * ─────────────────────────────────────────────────────────────
 * Renders the animated liquid blob background layer.
 * All blob properties come from hero.config.js → BLOBS array.
 * Mouse parallax is driven by direct DOM mutation for performance.
 * ─────────────────────────────────────────────────────────────
 */
import { useEffect, useRef } from 'react';
import { BLOBS } from './hero.config';

export default function HeroBlobs() {
  const blobRefs = useRef([]);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    // Track mouse for blob parallax (Target position)
    const handleMouseMove = (e) => {
      mouseTarget.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,   // -1 → 1
        y: (e.clientY / window.innerHeight - 0.5) * 2,  // -1 → 1
      };
    };

    // Smooth interpolation loop (LERP)
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateSmoothMouse = () => {
      currentPos.current.x = lerp(currentPos.current.x, mouseTarget.current.x, 0.08);
      currentPos.current.y = lerp(currentPos.current.y, mouseTarget.current.y, 0.08);

      blobRefs.current.forEach((el, i) => {
        if (!el) return;
        const blob = BLOBS[i];
        const tx = currentPos.current.x * blob.parallax;
        const ty = currentPos.current.y * blob.parallax;
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });

      rafId.current = requestAnimationFrame(updateSmoothMouse);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(updateSmoothMouse);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="hero-liquid-bg" aria-hidden="true">
      {BLOBS.map((blob, i) => (
        <div
          key={blob.id}
          ref={(el) => (blobRefs.current[i] = el)}
          className="hero-blob-parallax-wrapper"
          style={{
            position: 'absolute',
            width: blob.size,
            height: blob.size,
            ...blob.position,
            willChange: 'transform',
          }}
        >
          <div
            className="hero-blob"
            style={{
              width: '100%',
              height: '100%',
              background: blob.gradient,
              opacity: blob.opacity,
              '--blob-dur': `${blob.animDur}s`,
              '--blob-delay': `${blob.animDelay}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

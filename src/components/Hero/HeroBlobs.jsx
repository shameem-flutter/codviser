/**
 * HeroBlobs.jsx
 * ─────────────────────────────────────────────────────────────
 * Renders the animated liquid blob background layer.
 * All blob properties come from hero.config.js → BLOBS array.
 * Mouse parallax is driven by the mousePos prop passed in.
 * ─────────────────────────────────────────────────────────────
 */
import { BLOBS } from './hero.config';

/**
 * @param {{ mousePos: { x: number, y: number } }} props
 *   mousePos.x / .y — normalized mouse position (-1 to 1) from center
 */
export default function HeroBlobs({ mousePos }) {
  return (
    <div className="hero-liquid-bg" aria-hidden="true">
      {BLOBS.map((blob) => {
        const tx = mousePos.x * blob.parallax;
        const ty = mousePos.y * blob.parallax;

        return (
          <div
            key={blob.id}
            className="hero-blob"
            style={{
              // Size
              width: blob.size,
              height: blob.size,
              // Position
              ...blob.position,
              // Color
              background: blob.gradient,
              // Opacity
              opacity: blob.opacity,
              // Animation timing via CSS custom props
              '--blob-dur': `${blob.animDur}s`,
              '--blob-delay': `${blob.animDelay}s`,
              // Parallax
              transform: `translate(${tx}px, ${ty}px)`,
            }}
          />
        );
      })}
    </div>
  );
}

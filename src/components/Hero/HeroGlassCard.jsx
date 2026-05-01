/**
 * HeroGlassCard.jsx
 * ─────────────────────────────────────────────────────────────
 * The frosted-glass container that wraps all hero text content.
 * All visual parameters come from hero.config.js → GLASS_CARD.
 * ─────────────────────────────────────────────────────────────
 */
import { GLASS_CARD } from './hero.config';

/**
 * @param {{ children: React.ReactNode }} props
 */
export default function HeroGlassCard({ children }) {
  const {
    blur,
    saturate,
    bgAlpha,
    borderAlpha,
    borderRadius,
    paddingDesktop,
    paddingMobile,
    maxWidth,
  } = GLASS_CARD;

  // Inline styles drive the config-controlled visual values.
  // CSS class handles layout, hover shadow, and shimmer pseudo-elements.
  const style = {
    backdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
    background: `rgba(255, 255, 255, ${bgAlpha})`,
    border: `1px solid rgba(255, 255, 255, ${borderAlpha})`,
    borderRadius: `${borderRadius}px`,
    // Pass config values as CSS variables to the stylesheet
    '--glass-pad-desktop': paddingDesktop,
    '--glass-pad-mobile': paddingMobile,
    '--glass-max-w': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
  };

  return (
    <div className="hero-glass-card" style={style}>
      {children}
    </div>
  );
}

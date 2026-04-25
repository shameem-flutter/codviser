/**
 * hero.config.js
 * ─────────────────────────────────────────────────────────────
 * Central configuration for the Hero premium glass-liquid effect.
 * Change colors, sizes, speeds, blur, and parallax here —
 * everything else updates automatically.
 * ─────────────────────────────────────────────────────────────
 */

// ─── BACKGROUND COLOR ────────────────────────────────────────
// This is the base tint of the hero section behind all blobs.
// Use any valid CSS color value.
export const HERO_BG = '#F0F4FF';          // soft lavender-white

// ─── BLOB DEFINITIONS ────────────────────────────────────────
// Each blob is an object with:
//   gradient  – radial-gradient CSS string (defines the color)
//   size      – diameter as a responsive CSS value
//   position  – { top, left, right, bottom } (any can be omitted)
//   opacity   – float 0-1
//   animDur   – morphing cycle duration in seconds
//   animDelay – animation start offset in seconds (negative = pre-started)
//   parallax  – multiplier for mouse parallax movement (px, negative = opposite direction)
export const BLOBS = [
  {
    id: 'blob-1',
    gradient: 'radial-gradient(circle at 40% 40%, #60a5fa, #3b82f6 45%, #1d4ed8 80%)',
    size: 'min(58vw, 580px)',
    position: { top: '-15%', left: '-8%' },
    opacity: 0.55,
    animDur: 15,
    animDelay: 0,
    parallax: 28,
  },
  {
    id: 'blob-2',
    gradient: 'radial-gradient(circle at 60% 60%, #a78bfa, #7c3aed 45%, #4f46e5 80%)',
    size: 'min(65vw, 650px)',
    position: { bottom: '-18%', right: '-10%' },
    opacity: 0.55,
    animDur: 11,
    animDelay: -3,
    parallax: -18,
  },
  {
    id: 'blob-3',
    gradient: 'radial-gradient(circle at 50% 50%, #38bdf8, #0ea5e9 50%, #0284c7 85%)',
    size: 'min(40vw, 420px)',
    position: { top: '20%', right: '8%' },
    opacity: 0.55,
    animDur: 13,
    animDelay: -6,
    parallax: 22,
  },
  {
    id: 'blob-4',
    gradient: 'radial-gradient(circle at 50% 50%, #f9a8d4, #ec4899 50%, #be185d 85%)',
    size: 'min(35vw, 380px)',
    position: { bottom: '5%', left: '5%' },
    opacity: 0.35,
    animDur: 10,
    animDelay: -8,
    parallax: -32,
  },
];

// ─── GLASS EFFECT ───────────────────────────────────────────────
export const GLASS_CARD = {
  blur: 24,                                // backdrop-filter blur in px
  saturate: 180,                           // backdrop-filter saturate in %
  bgAlpha: 0.04,                           // reduced alpha for full-screen immersion
  borderAlpha: 0.1,                        // subtle border for full-screen
  borderRadius: 0,                         // 0 for full-screen
  paddingDesktop: '8rem 2rem',             // Move section padding here
  paddingMobile: '6rem 1.5rem',
  maxWidth: '100%',                        // 100% for full-screen
};

// ─── GRADIENT TEXT ────────────────────────────────────────────
// Applied to the key words in the headline.
export const GRADIENT_TEXT = 'linear-gradient(to right, #000, #000)';

// ─── BADGE ────────────────────────────────────────────────────
export const BADGE = {
  bgAlpha: 0.08,                           // blue tint alpha
  borderAlpha: 0.2,
  accentColor: '#0071E3',
};

// ─── BUTTON CTA ───────────────────────────────────────────────
export const CTA_BUTTON = {
  shadowColor: 'rgba(0, 113, 227, 0.25)',
  shadowColorHover: 'rgba(0, 113, 227, 0.45)',
};

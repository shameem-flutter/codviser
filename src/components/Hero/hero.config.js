/**
 * hero.config.js
 * ─────────────────────────────────────────────────────────────
 * Central configuration for the Hero premium glass-liquid effect.
 * Change colors, sizes, speeds, blur, and parallax here —
 * everything else updates automatically.
 * ─────────────────────────────────────────────────────────────
 */

import { HERO_BG, BLOB_COLORS, GRADIENT_TEXT, HERO_ACCENTS } from './hero.colors';

// ─── BACKGROUND COLOR ────────────────────────────────────────
// This is the base tint of the hero section behind all blobs.
// Use any valid CSS color value.
export { HERO_BG };

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
    gradient: BLOB_COLORS.blob1,
    size: 'min(58vw, 580px)',
    position: { top: '-15%', left: '-8%' },
    opacity: 0.55,
    animDur: 15,
    animDelay: 0,
    parallax: 28,
  },
  {
    id: 'blob-2',
    gradient: BLOB_COLORS.blob2,
    size: 'min(65vw, 650px)',
    position: { bottom: '-18%', right: '-10%' },
    opacity: 0.55,
    animDur: 11,
    animDelay: -3,
    parallax: -18,
  },
  {
    id: 'blob-3',
    gradient: BLOB_COLORS.blob3,
    size: 'min(40vw, 420px)',
    position: { top: '20%', right: '8%' },
    opacity: 0.55,
    animDur: 13,
    animDelay: -6,
    parallax: 22,
  },
  {
    id: 'blob-4',
    gradient: BLOB_COLORS.blob4,
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

// Applied to the key words in the headline.
export { GRADIENT_TEXT };

// ─── BADGE ────────────────────────────────────────────────────
export const BADGE = {
  bgAlpha: 0.08,                           // blue tint alpha
  borderAlpha: 0.2,
  accentColor: HERO_ACCENTS.badge,
};

// ─── BUTTON CTA ───────────────────────────────────────────────
export const CTA_BUTTON = {
  shadowColor: HERO_ACCENTS.ctaShadow,
  shadowColorHover: HERO_ACCENTS.ctaShadowHover,
};

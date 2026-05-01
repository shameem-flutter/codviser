/**
 * hero.colors.js
 * ─────────────────────────────────────────────────────────────
 * Central color palette for the Hero section.
 * Isolate all color changes here to quickly swap themes.
 * ─────────────────────────────────────────────────────────────
 */

// ─── MAIN BACKGROUND ─────────────────────────────────────────
export const HERO_BG = '#F0F4FF'; // soft lavender-white

// ─── BLOB GRADIENTS ──────────────────────────────────────────
export const BLOB_COLORS = {
  blob1: 'radial-gradient(circle at 40% 40%, #222222ff, #3a3737ff 45%, #848282ff 80%)',
  blob2: 'radial-gradient(circle at 60% 60%, #767676ff, #e8e8e8ff 45%, #101010ff 80%)',
  blob3: 'radial-gradient(circle at 50% 50%, #e9e9e9ff, #000000ff 50%, #787878ff 85%)',
  blob4: 'radial-gradient(circle at 50% 50%, #000000ff, #747474ff 50%, #ffffffff 85%)',
};

// ─── TYPOGRAPHY ──────────────────────────────────────────────
export const GRADIENT_TEXT = 'linear-gradient(to right, #010101ff, #000)';

// ─── COMPONENT ACCENTS ───────────────────────────────────────
export const HERO_ACCENTS = {
  badge: '#0071E3',
  ctaShadow: 'rgba(0, 113, 227, 0.25)',
  ctaShadowHover: 'rgba(0, 113, 227, 0.45)',
};

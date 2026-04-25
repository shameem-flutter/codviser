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
  blob1: 'radial-gradient(circle at 40% 40%, #404142ff, #bababaff 45%, #e2e2e2ff 80%)',
  blob2: 'radial-gradient(circle at 60% 60%, #ebebebff, #565559ff 45%, #2d2d2fff 80%)',
  blob3: 'radial-gradient(circle at 50% 50%, #ccccccff, #ffffffff 50%, #a07d7dff 85%)',
  blob4: 'radial-gradient(circle at 50% 50%, #939293ff, #464946ff 50%, #141512ff 85%)',
};

// ─── TYPOGRAPHY ──────────────────────────────────────────────
export const GRADIENT_TEXT = 'linear-gradient(to right, #000, #000)';

// ─── COMPONENT ACCENTS ───────────────────────────────────────
export const HERO_ACCENTS = {
  badge: '#0071E3',
  ctaShadow: 'rgba(0, 113, 227, 0.25)',
  ctaShadowHover: 'rgba(0, 113, 227, 0.45)',
};

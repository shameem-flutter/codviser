import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --bg:       #00416A;
    --text:     #F0EAD6;
    --lime:     #F0EAD6;
    --muted:    rgba(240, 234, 214, 0.5);
    --border:   rgba(240, 234, 214, 0.15);
    --nav-h:    72px;
    --mob-nav-h: 60px;
    --pad-x:    80px;
  }

  html, body {
    height: 100%;
    overflow: hidden;
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    cursor: none;
  }

  /* On touch/mobile — restore native scroll and cursor */
  @media (max-width: 768px) {
    html, body {
      overflow: auto;
      overflow-x: hidden;
      height: auto;
      cursor: auto;
    }
    body { min-height: 100vh; }
  }

  /* hide scrollbar visually */
  .scroll-wrapper::-webkit-scrollbar { display: none; }

  /* ── Scroll Wrapper ── */
  .scroll-wrapper {
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    position: relative;
  }

  /* ── Custom Cursor ── */
  .cursor-dot {
    width: 10px;
    height: 10px;
    background: var(--lime);
    border-radius: 50%;
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width 0.18s ease, height 0.18s ease,
                background 0.18s ease, border 0.18s ease;
    will-change: transform;
  }

  .cursor-dot.hovered {
    width: 36px;
    height: 36px;
    background: transparent;
    border: 1.5px solid var(--lime);
  }

  .cursor-ring {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(200,255,0,0.3);
    border-radius: 50%;
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    will-change: transform;
    transition: opacity 0.3s ease;
  }

  /* ── Noise overlay ── */
  .noise {
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.022;
    pointer-events: none;
    z-index: 1;
  }

  /* ════════════════════════════════════════
     NAVBAR
  ════════════════════════════════════════ */

  /* ── Base shell ── */
  .navbar {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 80px;           /* starts tall */
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-bottom: 1px solid transparent;
    transition:
      height        0.4s ease,
      background    0.4s ease,
      backdrop-filter 0.4s ease,
      border-color  0.4s ease;
    overflow: hidden;   /* clip the dot-pattern to header */
  }

  /* scrolled state */
  .navbar.scrolled {
    height: 72px;
    background: rgba(0,65,106,0.85);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom-color: rgba(240,234,214,0.06);
  }

  /* ── Dot-grid pattern (lives inside header only) ── */
  .navbar::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(240,234,214,0.07) 1px, transparent 1px);
    background-size: 24px 24px;
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
    mask-image:         linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── Logo ── */
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .nav-logo-diamond {
    width: 8px;
    height: 8px;
    background: var(--lime);
    transform: rotate(45deg);
    flex-shrink: 0;
    transition: transform 0.5s ease;
  }

  .nav-logo:hover .nav-logo-diamond {
    transform: rotate(225deg);
  }

  .nav-logo-text {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 20px;
    color: #F0EAD6;
    letter-spacing: 0.04em;
    line-height: 1;
  }

  /* ── Right side cluster ── */
  .nav-right {
    display: flex;
    align-items: center;
    gap: 32px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  /* ── Nav links ── */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 40px;
    list-style: none;
  }

  .nav-links a {
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(240,237,230,0.55);
    text-decoration: none;
    position: relative;
    padding-bottom: 4px;
    transition: color 0.2s ease;
    white-space: nowrap;
  }

  /* sliding lime underline */
  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0;
    height: 1px;
    background: var(--lime);
    transition: width 0.3s ease;
  }

  .nav-links a:hover,
  .nav-links a.active { color: #F0EAD6; }

  .nav-links a:hover::after,
  .nav-links a.active::after { width: 100%; }

  /* ── Divider ── */
  .nav-divider {
    width: 1px;
    height: 18px;
    background: rgba(240,234,214,0.1);
    flex-shrink: 0;
  }

  /* ── Start Project pill ── */
  .nav-cta {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 18px;
    border-radius: 999px;
    border: 1px solid rgba(200,255,0,0.4);
    background: transparent;
    color: var(--lime);
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: none;
    white-space: nowrap;
    transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  }

  .nav-cta-arrow {
    display: inline-block;
    transition: transform 0.25s ease;
  }

  .nav-cta:hover {
    background: var(--lime);
    color: #00416A;
    border-color: var(--lime);
  }

  .nav-cta:hover .nav-cta-arrow {
    transform: translateX(3px);
  }

  /* ── Mobile hamburger (hidden on desktop) ── */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: none;
    padding: 4px;
    z-index: 1;
    position: relative;
  }

  .nav-hamburger span {
    display: block;
    width: 20px;
    height: 1.5px;
    background: #F0EAD6;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform-origin: center;
  }

  /* ── Mobile overlay ── */
  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: #00416A;
    z-index: 99;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-12px);
    transition:
      opacity    0.38s cubic-bezier(0.4,0,0.2,1),
      transform  0.38s cubic-bezier(0.4,0,0.2,1),
      visibility 0s   0.38s;
    pointer-events: none;
  }

  .mobile-overlay.open {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity    0.38s cubic-bezier(0.4,0,0.2,1),
      transform  0.38s cubic-bezier(0.4,0,0.2,1),
      visibility 0s   0s;
    pointer-events: all;
  }

  .mobile-overlay a {
    font-family: 'Syne', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #F0EAD6;
    text-decoration: none;
    letter-spacing: -0.01em;
    transition: color 0.2s ease;
  }

  .mobile-overlay a:hover { color: var(--lime); }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .navbar { padding: 0 20px; height: var(--mob-nav-h); }
    .navbar.scrolled { height: var(--mob-nav-h); }
    .nav-links, .nav-divider, .nav-cta { display: none; }
    .nav-hamburger { display: flex; }
  }

  /* ════════════════════════════════════════
     SECTIONS — shared snap rules
  ════════════════════════════════════════ */
  .section {
    scroll-snap-align: start;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 100%;
  }

  .inner {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 var(--pad-x);
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* ════════════════════════════════════════
     HERO
  ════════════════════════════════════════ */
  .hero-section {
    padding-top: var(--nav-h);
    justify-content: center;
  }

  .hero-grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(240,234,214,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(240,234,214,0.02) 1px, transparent 1px);
    background-size: 72px 72px;
    animation: gridDrift 28s linear infinite;
    pointer-events: none;
  }

  @keyframes gridDrift {
    0%   { background-position: 0 0; }
    100% { background-position: 72px 72px; }
  }

  .hero-inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  .hero-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: clamp(10px, 1vw, 13px);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--lime);
    margin-bottom: clamp(24px, 3vh, 40px);
    opacity: 0;
    animation: fadeUp 0.6s 0.2s ease-out forwards;
  }

  .hero-lines {
    display: flex;
    flex-direction: column;
    line-height: 0.9;
    margin-bottom: clamp(28px, 4vh, 52px);
  }

  .hero-line {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(64px, 8vw, 118px);
    letter-spacing: -0.03em;
    line-height: 1;
    clip-path: inset(0 0 100% 0);
    opacity: 0;
    will-change: clip-path, opacity, transform;
  }

  .hero-line.revealed {
    animation: clipReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .hero-line:nth-child(1).revealed { animation-delay: 0.25s; }
  .hero-line:nth-child(2).revealed { animation-delay: 0.48s; }
  .hero-line:nth-child(3).revealed { animation-delay: 0.71s; }

  .hero-line .accent {
    color: var(--lime);
    font-style: italic;
  }

  @keyframes clipReveal {
    0%   { clip-path: inset(0 0 100% 0); opacity: 0; transform: translateY(16px); }
    100% { clip-path: inset(0 0 0% 0);   opacity: 1; transform: translateY(0);    }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-sub {
    display: flex;
    align-items: center;
    gap: 1.8rem;
    opacity: 0;
    animation: fadeUp 0.7s 1.05s ease-out forwards;
  }

  .hero-sub-line {
    width: 44px;
    height: 1px;
    background: var(--muted);
    flex-shrink: 0;
  }

  .hero-sub p {
    font-family: 'DM Mono', monospace;
    font-size: clamp(12px, 1.1vw, 16px);
    color: var(--muted);
    letter-spacing: 0.04em;
    line-height: 1.7;
  }

  .hero-scroll {
    position: absolute;
    bottom: clamp(24px, 3.5vh, 48px);
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    opacity: 0;
    animation: fadeUp 0.6s 1.4s ease-out forwards;
  }

  .hero-scroll span {
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    writing-mode: vertical-rl;
  }

  .scroll-bar {
    width: 1px;
    height: 52px;
    background: linear-gradient(to bottom, var(--lime), transparent);
    animation: scrollPulse 2.2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.25; transform: scaleY(1); }
    50%       { opacity: 0.9;  transform: scaleY(0.55); }
  }

  /* ════════════════════════════════════════
     MARQUEE STRIP
  ════════════════════════════════════════ */
  .marquee-section {
    scroll-snap-align: none;
    height: 56px;
    min-height: 56px;
    max-height: 56px;
    overflow: hidden;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    background: var(--bg);
    position: relative;
    z-index: 2;
    flex-shrink: 0;
  }

  .marquee-track {
    display: flex;
    align-items: center;
    width: max-content;
    animation: marquee 20s linear infinite;
    will-change: transform;
  }

  .marquee-track:hover { animation-play-state: paused; }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  .marquee-item {
    display: flex;
    align-items: center;
    gap: 2.2rem;
    padding: 0 2.5rem;
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--lime);
    white-space: nowrap;
    height: 56px;
  }

  .m-sep {
    width: 4px;
    height: 4px;
    background: var(--lime);
    border-radius: 50%;
    opacity: 0.6;
    flex-shrink: 0;
  }

  /* ════════════════════════════════════════
     SERVICES
  ════════════════════════════════════════ */
  .services-section {
    border-bottom: 1px solid var(--border);
  }

  .services-inner {
    padding-top: clamp(40px, 6vh, 72px);
    padding-bottom: clamp(24px, 4vh, 48px);
  }

  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: clamp(10px, 1vw, 14px);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--lime);
    margin-bottom: clamp(20px, 3vh, 36px);
    flex-shrink: 0;
  }

  .services-rows {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .service-row {
    flex: 1;
    display: grid;
    grid-template-columns: clamp(52px, 6vw, 80px) 1fr minmax(160px, 22vw);
    align-items: center;
    gap: clamp(16px, 2.5vw, 36px);
    border-top: 1px solid var(--border);
    position: relative;
    overflow: hidden;
    transition: flex 0.35s ease;
    cursor: none;
  }

  .service-row:last-child { border-bottom: 1px solid var(--border); }

  /* lime fill on hover */
  .service-row::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--lime);
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  .service-row:hover::before { transform: scaleY(1); }

  .service-row:hover .svc-num,
  .service-row:hover .svc-name,
  .service-row:hover .svc-desc { color: #00416A; }

  .svc-num {
    font-family: 'DM Mono', monospace;
    font-size: clamp(10px, 1vw, 14px);
    color: var(--muted);
    letter-spacing: 0.12em;
    position: relative;
    z-index: 1;
    transition: color 0.35s ease;
    padding-left: 4px;
  }

  .svc-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(36px, 4.5vw, 68px);
    letter-spacing: -0.025em;
    line-height: 1;
    position: relative;
    z-index: 1;
    transition: color 0.35s ease;
    white-space: nowrap;
  }

  .svc-desc {
    font-family: 'DM Mono', monospace;
    font-size: clamp(11px, 1.1vw, 15px);
    color: var(--muted);
    text-align: right;
    line-height: 1.65;
    position: relative;
    z-index: 1;
    transition: color 0.35s ease;
    letter-spacing: 0.02em;
  }

  /* ════════════════════════════════════════
     ABOUT
  ════════════════════════════════════════ */
  .about-section {}

  .about-inner {
    flex: 1;
    display: grid;
    grid-template-columns: 35% 65%;
    align-items: center;
    min-height: 0;
  }

  .about-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
  }

  .about-num {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(100px, 13vw, 190px);
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--border);
    letter-spacing: -0.05em;
    user-select: none;
    transition: -webkit-text-stroke-color 0.6s ease;
  }

  .about-section:hover .about-num {
    -webkit-text-stroke-color: rgba(240,234,214,0.4);
  }

  .about-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: clamp(16px, 2.5vh, 28px);
    max-width: 560px;
  }

  .about-tag {
    font-family: 'DM Mono', monospace;
    font-size: clamp(10px, 1vw, 13px);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--lime);
  }

  .about-lead {
    font-family: 'Syne', sans-serif;
    font-size: clamp(18px, 2vw, 28px);
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: -0.01em;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }

  .about-lead.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .about-lead:nth-of-type(2) { transition-delay: 0.12s; }
  .about-lead:nth-of-type(3) {
    font-size: clamp(14px, 1.4vw, 18px);
    font-family: 'DM Mono', monospace;
    font-weight: 400;
    color: var(--muted);
    transition-delay: 0.24s;
  }

  .about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: clamp(12px, 2vh, 24px);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s 0.36s ease-out, transform 0.7s 0.36s ease-out;
  }

  .about-stats.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .about-stat-item {
    border: 1px solid var(--border);
    padding: clamp(20px, 2.5vw, 32px) clamp(16px, 2vw, 24px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    transition: border-color 0.3s ease, transform 0.3s ease;
  }

  .about-stat-item:hover {
    border-color: rgba(240,234,214,0.3);
    transform: translateY(-4px);
  }

  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 3.5vw, 42px);
    font-weight: 800;
    color: var(--lime);
    line-height: 1;
  }

  .stat-label {
    font-family: 'DM Mono', monospace;
    font-size: clamp(10px, 1vw, 12px);
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-top: 10px;
  }

  /* ════════════════════════════════════════
     CTA
  ════════════════════════════════════════ */
  .cta-section {
    border-top: 1px solid var(--border);
  }

  .cta-inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    text-align: center;
    position: relative;
  }

  .cta-glow {
    position: absolute;
    bottom: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(240,234,214,0.05) 0%, transparent 65%);
    pointer-events: none;
  }

  .cta-tag {
    font-family: 'DM Mono', monospace;
    font-size: clamp(10px, 1vw, 13px);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--lime);
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }

  .cta-tag.visible { opacity: 1; transform: translateY(0); }

  .cta-heading {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: clamp(52px, 7vw, 108px);
    line-height: 0.95;
    letter-spacing: -0.03em;
    max-width: min(900px, 90vw);
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.8s 0.12s ease-out, transform 0.8s 0.12s ease-out;
    position: relative;
    z-index: 1;
  }

  .cta-heading.visible { opacity: 1; transform: translateY(0); }
  .cta-heading .accent { color: var(--lime); }

  .cta-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s 0.28s ease-out, transform 0.7s 0.28s ease-out;
    position: relative;
    z-index: 1;
  }

  .cta-actions.visible { opacity: 1; transform: translateY(0); }

  .cta-email {
    font-family: 'DM Mono', monospace;
    font-size: clamp(12px, 1.1vw, 16px);
    color: var(--muted);
    text-decoration: none;
    letter-spacing: 0.06em;
    transition: color 0.25s ease;
  }

  .cta-email:hover { color: var(--text); }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 52px;
    min-width: 200px;
    padding: 0 2rem;
    border: 1.5px solid var(--lime);
    background: transparent;
    color: var(--lime);
    font-family: 'DM Mono', monospace;
    font-size: 15px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: none;
    position: relative;
    overflow: hidden;
    transition: color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }

  .cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--lime);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  .cta-btn:hover::before { transform: scaleX(1); }

  .cta-btn:hover {
    color: #00416A;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(240,234,214,0.18);
  }

  .cta-btn span,
  .cta-btn i {
    position: relative;
    z-index: 1;
  }

  .cta-btn i {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  .cta-btn:hover i { transform: translateX(5px); }

  /* ════════════════════════════════════════
     FOOTER (pinned inside CTA section)
  ════════════════════════════════════════ */
  .footer {
    flex-shrink: 0;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--pad-x);
    border-top: 1px solid var(--border);
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
  }

  .footer-copy {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.08em;
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .footer-links a {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-links a:hover { color: var(--lime); }

  /* ═══════════════════════════════════════════════════
     MOBILE OVERRIDES  ≤768px
     Strategy: disable snap, natural scroll, each section
     auto-height, typography scaled, layout reflowed.
  ═══════════════════════════════════════════════════ */
  @media (max-width: 768px) {

    /* ── Cursor off on touch ── */
    .cursor-dot, .cursor-ring { display: none; }

    /* ── Scroll wrapper → plain document flow ── */
    .scroll-wrapper {
      height: auto;
      overflow: visible;
      scroll-snap-type: none;
    }

    /* Hero + Marquee snap group */
    .scroll-wrapper > div:first-child {
      height: auto;
      overflow: visible;
    }

    /* ── Sections: natural height, no clip ── */
    .section {
      scroll-snap-align: none;
      height: auto;
      min-height: 100svh;
      overflow: visible;
    }

    /* ── Inner padding ── */
    .inner {
      padding: 0 20px;
    }

    /* ─────────────────── HERO ─────────────────── */
    .hero-section {
      padding-top: var(--mob-nav-h);
      min-height: 100svh;
      justify-content: flex-start;
    }

    .hero-inner {
      padding-top: clamp(40px, 8vh, 72px);
      padding-bottom: clamp(40px, 6vh, 64px);
    }

    .hero-eyebrow {
      font-size: 10px;
      margin-bottom: 20px;
    }

    .hero-line {
      font-size: clamp(48px, 13vw, 72px);
      letter-spacing: -0.03em;
    }

    .hero-lines {
      margin-bottom: 24px;
    }

    .hero-sub {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }

    .hero-sub-line { width: 24px; }

    .hero-sub p { font-size: 12px; max-width: 100%; }

    .hero-scroll { display: none; }

    /* ─────────────────── MARQUEE ─────────────────── */
    .marquee-section {
      height: 44px;
      min-height: 44px;
      max-height: 44px;
    }

    .marquee-item {
      font-size: 11px;
      height: 44px;
      gap: 1.4rem;
      padding: 0 1.5rem;
    }

    /* ─────────────────── SERVICES ─────────────────── */
    .services-section {
      height: auto;
      min-height: auto;
    }

    .services-inner {
      padding-top: 60px;
      padding-bottom: 40px;
    }

    .services-rows {
      flex: none;
    }

    .service-row {
      flex: none;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      padding: 20px 0;
      border-top: 1px solid var(--border);
    }

    .service-row:last-child { border-bottom: 1px solid var(--border); }

    .svc-num {
      font-size: 10px;
      padding-left: 0;
      color: var(--lime);
    }

    .svc-name {
      font-size: clamp(28px, 8vw, 44px);
      white-space: normal;
      line-height: 1.05;
    }

    .svc-desc {
      font-size: 11px;
      text-align: left;
      color: var(--muted);
      margin-top: 4px;
      max-width: 100%;
    }

    /* ─────────────────── ABOUT ─────────────────── */
    .about-section {
      height: auto;
      min-height: auto;
    }

    .about-inner {
      grid-template-columns: 1fr;
      gap: 0;
      padding-top: 60px;
      padding-bottom: 48px;
      display: flex;
      flex-direction: column;
    }

    .about-left {
      height: auto;
      justify-content: flex-start;
      margin-bottom: 24px;
    }

    .about-num {
      font-size: clamp(72px, 22vw, 120px);
      -webkit-text-stroke-width: 1px;
    }

    .about-right {
      max-width: 100%;
      gap: 16px;
    }

    .about-lead {
      font-size: clamp(18px, 5vw, 24px);
    }

    .about-stats {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .about-stat-item {
      padding: 16px 12px;
      align-items: center;
      text-align: center;
    }

    .stat-num  { font-size: clamp(20px, 5.5vw, 28px); }
    .stat-label { font-size: 9px; margin-top: 6px; letter-spacing: 0.05em; }

    /* ─────────────────── CTA ─────────────────── */
    .cta-section {
      height: auto;
      min-height: auto;
    }

    .inner:has(.cta-inner) {
      height: auto;
    }

    .cta-inner {
      flex: none;
      padding: 72px 0 40px;
      gap: 24px;
    }

    .cta-heading {
      font-size: clamp(40px, 11vw, 64px);
      line-height: 1;
      max-width: 100%;
    }

    .cta-tag { font-size: 10px; }
    .cta-email { font-size: 13px; }

    .cta-btn {
      height: 48px;
      min-width: 160px;
      font-size: 13px;
    }

    .cta-glow {
      width: 300px;
      height: 300px;
      bottom: -100px;
    }

    /* ─────────────────── FOOTER ─────────────────── */
    .footer {
      height: auto;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 20px 20px 28px;
    }

    .footer-links { gap: 1.2rem; flex-wrap: wrap; }
    .footer-copy, .footer-links a { font-size: 10px; }

    /* ─────────────────── SECTION LABEL ─────────────────── */
    .section-label { font-size: 10px; margin-bottom: 16px; }

    /* ─────────────────── MOBILE OVERLAY LINKS ─────────────────── */
    .mobile-overlay a { font-size: 28px; }
  }

  /* Extra small phones */
  @media (max-width: 390px) {
    .hero-line { font-size: 42px; }
    .svc-name  { font-size: 26px; }
    .cta-heading { font-size: 36px; }
    .about-num { font-size: 72px; }
  }
`

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ─────────────────────────────────────────────
   CURSOR
───────────────────────────────────────────── */
function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring  = useRef({ x: 0, y: 0 })
  const raf   = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`
      }
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const isHoverable = el?.closest('a, button, .service-row, .cta-btn')
      setHovered(!!isHoverable)
    }

    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current) }
  }, [])

  return (
    <>
      <div className={`cursor-dot${hovered ? ' hovered' : ''}`} ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#hero'     },
  { label: 'About',   href: '#about'    },
  { label: 'Contact', href: '#contact'  },
]

function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('')
  const [menuOpen,  setMenuOpen]  = useState(false)

  /* ── Scroll-aware shrink ── */
  useEffect(() => {
    const wrapper = document.querySelector('.scroll-wrapper')
    if (!wrapper) return
    const onScroll = () => setScrolled(wrapper.scrollTop > 40)
    wrapper.addEventListener('scroll', onScroll, { passive: true })
    return () => wrapper.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Active link via IntersectionObserver ── */
  useEffect(() => {
    const sectionIds = ['hero', 'services', 'about', 'contact']
    const observers = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { root: document.querySelector('.scroll-wrapper'), threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <a href="#hero" className="nav-logo">
          <span className="nav-logo-diamond" />
          <span className="nav-logo-text">Codviser</span>
        </a>

        {/* Right cluster */}
        <div className="nav-right">
          <ul className="nav-links">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '')
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={active === id ? 'active' : ''}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="nav-divider" />
          <button className="nav-cta" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
            Start Project
            <span className="nav-cta-arrow">→</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-overlay${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} onClick={close}>{label}</a>
        ))}
      </div>
    </>
  )
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => { const t = setTimeout(() => setRevealed(true), 80); return () => clearTimeout(t) }, [])

  const lines = [
    { text: 'We Build.',  accent: false },
    { text: 'We Market.', accent: false },
    { text: <>We <span className="accent">Advise.</span></>, accent: true },
  ]

  return (
    <section className="section hero-section" id="hero">
      <div className="hero-grid-bg" />
      <div className="inner">
        <div className="hero-inner">
          <div className="hero-eyebrow">— Digital Agency  ·  Est. 2026</div>
          <div className="hero-lines">
            {lines.map((l, i) => (
              <div key={i} className={`hero-line${revealed ? ' revealed' : ''}`}>
                {l.text}
              </div>
            ))}
          </div>
          <div className="hero-sub">
            <div className="hero-sub-line" />
            <p>Codviser — Digital solutions for brands that mean business.</p>
          </div>
          <div className="hero-scroll">
            <div className="scroll-bar" />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   MARQUEE (not a snap section — embedded)
───────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  'Poster Making', 'Branding', 'Ads Video Making',
  'Poster Making', 'Branding', 'Ads Video Making',
  'Poster Making', 'Branding', 'Ads Video Making',
  'Poster Making', 'Branding', 'Ads Video Making',
]

function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((item, i) => (
          <div className="marquee-item" key={i}>
            <span className="m-sep" />
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */
const SERVICES = [
  { num: '01', name: 'Website Development', desc: 'Fast, scalable web experiences built to convert.' },
  { num: '02', name: 'App Development',     desc: 'Native & cross-platform apps that users love.'   },
  { num: '03', name: 'Ads Marketing',       desc: 'Data-driven campaigns that actually perform.'    },
]

function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="inner services-inner">
        <div className="section-label">— What We Do</div>
        <div className="services-rows">
          {SERVICES.map(s => (
            <div className="service-row" key={s.num}>
              <span className="svc-num">{s.num}</span>
              <span className="svc-name">{s.name}</span>
              <span className="svc-desc">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */
function About() {
  const [textRef, textInView] = useInView()
  const [statsRef, statsInView] = useInView()

  return (
    <section className="section about-section" id="about">
      <div className="inner">
        <div className="about-inner">
          <div className="about-left">
            <div className="about-num">04</div>
          </div>
          <div className="about-right" ref={textRef}>
            <span className="about-tag">— About Codviser</span>
            <p className={`about-lead${textInView ? ' visible' : ''}`}>
              We don't just build products — we engineer experiences that move
              people and convert audiences into loyal users.
            </p>
            <p className={`about-lead${textInView ? ' visible' : ''}`} style={{ fontFamily: 'DM Mono, monospace', color: 'var(--muted)' }}>
              From strategy to execution, every pixel and every line of code is
              intentional. We partner with ambitious brands to deliver work that
              actually performs.
            </p>
            <div className={`about-stats${statsInView ? ' visible' : ''}`} ref={statsRef}>
              {[{ n: '100%', l: 'In-House Talent' }, { n: '10x', l: 'Faster Delivery' }, { n: '∞', l: 'Creative Energy' }].map(s => (
                <div className="about-stat-item" key={s.l}>
                  <div className="stat-num">{s.n}</div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   CTA + FOOTER (combined in one 100vh section)
───────────────────────────────────────────── */
function CTA() {
  const [tagRef,     tagInView]     = useInView(0.15)
  const [headRef,    headInView]    = useInView(0.15)
  const [actionsRef, actionsInView] = useInView(0.15)

  return (
    <section className="section cta-section" id="contact">
      <div className="inner">
        <div className="cta-inner">
          <div className="cta-glow" />
          <span className={`cta-tag${tagInView ? ' visible' : ''}`} ref={tagRef}>
            — Ready when you are
          </span>
          <h2 className={`cta-heading${headInView ? ' visible' : ''}`} ref={headRef}>
            Let's Build <span className="accent">Something.</span>
          </h2>
          <div className={`cta-actions${actionsInView ? ' visible' : ''}`} ref={actionsRef}>
            <a href="mailto:hello@codviser.com" className="cta-email">
              hello@codviser.com
            </a>
            <button className="cta-btn">
              <span>Start a Project</span>
              <i>→</i>
            </button>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p className="footer-copy">© 2026 Codviser. All rights reserved.</p>
        <ul className="footer-links">
          {['Instagram', 'LinkedIn', 'Twitter', 'Behance'].map(s => (
            <li key={s}><a href="#" rel="noreferrer">{s}</a></li>
          ))}
        </ul>
      </footer>
    </section>
  )
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
/* Detect touch/mobile to conditionally render cursor */
function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setMobile(mq.matches)
    const handler = (e) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return mobile
}

export default function App() {
  const isMobile = useIsMobile()

  return (
    <>
      <style>{styles}</style>
      <div className="noise" aria-hidden="true" />
      {!isMobile && <Cursor />}
      <Navbar />

      {/*
        Desktop: scroll-snap wrapper — one section per screen.
        Mobile:  plain document flow — natural scroll, sections auto-height.
        The outer div always exists; CSS handles the difference.
      */}
      <div className="scroll-wrapper">
        {/* Snap group 1: Hero + Marquee (desktop) / stacked (mobile) */}
        <div style={{ scrollSnapAlign: 'start', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Hero />
          <Marquee />
        </div>

        {/* Snap group 2: Services */}
        <Services />

        {/* Snap group 3: About */}
        <About />

        {/* Snap group 4: CTA + Footer */}
        <CTA />
      </div>
    </>
  )
}

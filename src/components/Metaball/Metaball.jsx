import React, { useEffect, useRef, useState, useMemo } from 'react';
import { VFX } from '@vfx-js/core';
import { metaballShader } from './shader';

/**
 * Metaball Background Component
 * 
 * A premium, interactive liquid distortion effect using VFX-JS.
 */
export default function Metaball({
  children,
  size = 0.085,
  bubbleCount = 12,
  bubbleSpeed = 0.5,
  bubbleRadiusMin = 0.02,
  bubbleRadiusMax = 0.05,
  bubbleSmooth = 0.025,
  absorbColor = [6.0, 3.6, 3.0],
  bgColor = [0.9608, 0.9608, 0.9686, 1.0],
  mouseSmoothing = 0.08,
  zIndex = 0,
  interactive = true,
  isPaused = false,
}) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ p0: { x: 0, y: 0 }, p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 } });
  const [clickData, setClickData] = useState({ time: 0, count: 0 });
  const bubblesRef = useRef(null);
  const hasMouseRef = useRef(false);
  const centerBlendRef = useRef(1.0);
  const [isReady, setIsReady] = useState(false);

  // Internal clocks for freezing animation
  const internalTimeRef = useRef(0);
  const internalClickTimeRef = useRef(0);
  const lastTickTimeRef = useRef(performance.now() / 1000);

  // Use refs for props so we don't need to re-init VFX on every prop change
  const propsRef = useRef({
    size,
    bubbleSpeed,
    bubbleRadiusMin,
    bubbleRadiusMax,
    bubbleSmooth,
    absorbColor,
    bgColor,
    mouseSmoothing,
    interactive,
    isPaused
  });

  useEffect(() => {
    propsRef.current = {
      size,
      bubbleSpeed,
      bubbleRadiusMin,
      bubbleRadiusMax,
      bubbleSmooth,
      absorbColor,
      bgColor,
      mouseSmoothing,
      interactive,
      isPaused
    };
  }, [size, bubbleSpeed, bubbleRadiusMin, bubbleRadiusMax, bubbleSmooth, absorbColor, bgColor, mouseSmoothing, interactive, isPaused]);

  // Manage bubbles buffer
  if (!bubblesRef.current || bubblesRef.current.length !== bubbleCount * 4) {
    bubblesRef.current = new Float32Array(bubbleCount * 4);
  }

  // Generate shader based on bubble count
  const shaderSource = useMemo(() => metaballShader(bubbleCount), [bubbleCount]);

  useEffect(() => {
    if (!containerRef.current) return;

    let rafId;
    let isDestroyed = false;
    let vfx = null;

    // Use a singleton VFX instance per window to avoid WebGL context leaks during HMR.
    if (!window.__VFX_INSTANCE__) {
      try {
        window.__VFX_INSTANCE__ = new VFX({ zIndex });
      } catch (e) {
        console.error("Failed to create VFX instance:", e);
        setIsReady(true);
        return;
      }
    }
    
    // Check if the singleton is somehow destroyed (has no internal canvas) and recreate if needed
    if (window.__VFX_INSTANCE__ && window.__VFX_INSTANCE__.isDestroyed) {
      window.__VFX_INSTANCE__ = new VFX({ zIndex });
    }
    
    vfx = window.__VFX_INSTANCE__;
    const target = containerRef.current;

    const initVFX = async () => {
      try {
        if (document.fonts) {
          await document.fonts.ready;
        }

        if (isDestroyed) return;

        vfx.addHTML(target, { 
          shader: shaderSource,
          uniforms: {
            time: () => internalTimeRef.current,
            lag: () => {
              const { p0, p1 } = mouseRef.current;
              const lx = (p1.x - p0.x) * window.devicePixelRatio;
              const ly = (p1.y - p0.y) * window.devicePixelRatio;
              
              const blend = propsRef.current.interactive ? centerBlendRef.current : 1.0;
              const cx = (window.innerWidth / 2) * window.devicePixelRatio * blend;
              const cy = (window.innerHeight / 2) * window.devicePixelRatio * blend;
              
              return [cx + lx, cy + ly];
            },
            clickTime: () => internalClickTimeRef.current,
            clickCount: () => clickData.count,
            bubbleData: () => bubblesRef.current,
            sphereR: () => propsRef.current.size,
            bubbleSmooth: () => propsRef.current.bubbleSmooth,
            absorbColor: () => propsRef.current.absorbColor,
            bgColor: () => propsRef.current.bgColor,
          }
        });
        
        vfx.play();
        setIsReady(true);
      } catch (err) {
        console.error("VFX Initialization Error:", err);
        setIsReady(true); // Fallback so container appears
      }
    };

    const timeoutId = setTimeout(initVFX, 100);

    const handleMouseMove = (e) => {
      if (!propsRef.current.interactive) return;
      mouseRef.current.p0.x = e.clientX;
      mouseRef.current.p0.y = window.innerHeight - e.clientY;
      hasMouseRef.current = true;
    };

    const handleMouseDown = () => {
      if (!propsRef.current.interactive || propsRef.current.isPaused) return;
      
      internalClickTimeRef.current = 0;
      setClickData((prev) => ({
        time: performance.now() / 1000,
        count: prev.count + 1,
      }));
    };

    window.addEventListener('pointermove', handleMouseMove);
    window.addEventListener('pointerdown', handleMouseDown);

    const t0 = performance.now() / 1000;
    const fract = (x) => x - Math.floor(x);
    const rot2d = (x, y, t) => {
      const c = Math.cos(t), s = Math.sin(t);
      return [x * c - y * s, x * s + y * c];
    };

    const tick = () => {
      if (isDestroyed || !vfx) return;

      const now = performance.now() / 1000;
      const dt = now - lastTickTimeRef.current;
      lastTickTimeRef.current = now;

      const { size, bubbleSpeed, bubbleRadiusMin, bubbleRadiusMax, mouseSmoothing, interactive, isPaused } = propsRef.current;

      if (!isPaused) {
        internalTimeRef.current += dt;
        internalClickTimeRef.current += dt;

        const time = internalTimeRef.current;
        const { p0, p1, p2 } = mouseRef.current;
        
        p1.x += (p0.x - p1.x) * mouseSmoothing;
        p1.y += (p0.y - p1.y) * mouseSmoothing;
        p2.x += (p1.x - p2.x) * mouseSmoothing;
        p2.y += (p1.y - p2.y) * mouseSmoothing;

        if (hasMouseRef.current && interactive) {
          centerBlendRef.current *= 0.95;
        }

        const bubbles = bubblesRef.current;

        for (let i = 0; i < bubbleCount; i++) {
          const life = fract(time * bubbleSpeed + i / bubbleCount);
          const orbitR = size * (0.3 + life * 0.8);
          const orbitAngle = time * (0.8 + fract(i * 0.618) * 0.7) + i * 1.256;

          let bx = Math.cos(orbitAngle) * orbitR;
          let by = 0;
          let bz = Math.sin(orbitAngle) * orbitR;

          [bx, by] = rot2d(bx, by, i * 2.3);
          [by, bz] = rot2d(by, bz, i * 1.8);

          by += life * 0.1;
          bx += Math.sin(time * 2.7 + i * 4.1) * 0.008 * life;
          bz += Math.cos(time * 3.1 + i * 3.7) * 0.008 * life;

          const w = window.innerWidth;
          const h = window.innerHeight;
          
          if (interactive) {
            bx += ((p2.x - p1.x) / w) * (h / w);
            by += (p2.y - p1.y) / h;
          }

          const range = bubbleRadiusMax - bubbleRadiusMin;
          const maxR = bubbleRadiusMin + range * fract(i * 0.618);

          const j = i * 4;
          bubbles[j] = bx;
          bubbles[j + 1] = by;
          bubbles[j + 2] = bz;
          bubbles[j + 3] = maxR * Math.sin(life * Math.PI);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      isDestroyed = true;
      clearTimeout(timeoutId);
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('pointerdown', handleMouseDown);
      cancelAnimationFrame(rafId);
      
      try {
        if (vfx) {
          // Only remove the target, do NOT destroy the global VFX instance
          vfx.remove(target);
        }
      } catch (err) {
        console.warn("Error removing VFX target:", err);
      }
    };
  }, [shaderSource, zIndex, bubbleCount]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: zIndex,
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
}

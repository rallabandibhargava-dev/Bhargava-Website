'use client';
// @ts-nocheck
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * SmoothScroll — mounts Lenis and wires it to the GSAP ticker.
 *
 * Also drives the scroll-velocity skew effect:
 *   • Lenis exposes .velocity (px/s) on every scroll event.
 *   • We lerp a local `skew` value toward the velocity-based target
 *     each RAF frame — this gives a natural spring-back without
 *     needing a CSS transition (which would lag behind each frame).
 *   • The result is written to --scroll-skew on :root.
 *   • motion.css applies skewY(var(--scroll-skew)) to .shell elements,
 *     so only text content tilts — backgrounds/images stay flat.
 */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update);

    // Lerped skew state — persists across frames
    let skew = 0;

    // Single ticker drives both Lenis RAF and the skew lerp
    const tick = (time: number) => {
      lenis.raf(time * 1000);

      // velocity is in px/s; scale down to degrees (max ±0.55°)
      const target = Math.max(-0.55, Math.min(0.55, (lenis.velocity || 0) * 0.00085));
      // Lerp: 0.1 factor ≈ smooth 6-frame spring-back at 60 fps
      skew += (target - skew) * 0.1;

      document.documentElement.style.setProperty(
        '--scroll-skew',
        `${skew.toFixed(4)}deg`
      );
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      // Reset skew on unmount
      document.documentElement.style.removeProperty('--scroll-skew');
      lenis.destroy();
    };
  }, []);

  return null;
}

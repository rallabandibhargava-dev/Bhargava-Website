'use client';
// @ts-nocheck
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  /** 0–1 — how far the element follows the cursor (default 0.32) */
  strength?: number;
  /** px radius from element centre that activates the effect (default 90) */
  radius?: number;
}

/**
 * Wraps any inline element (usually a <Link> / <button>) and makes it
 * follow the cursor with a smooth spring when the pointer is within
 * `radius` pixels of the element centre.
 */
export default function MagneticButton({
  children,
  strength = 0.32,
  radius = 90,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Create reusable quickTo tweens for buttery-smooth spring-back
    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        // Scale pull by proximity: strongest at centre, fades toward radius
        const pull = 1 - dist / radius;
        xTo(dx * strength * pull);
        yTo(dy * strength * pull);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, radius]);

  return (
    <div ref={ref} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </div>
  );
}

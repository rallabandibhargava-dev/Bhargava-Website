'use client';
// @ts-nocheck
import { useEffect } from 'react';

/**
 * ScrollAnimations — mounts once after hydration and sets up:
 *
 *  1. Line-clip reveals on every .shout-title heading.
 *     Each <br>-separated line gets wrapped in an overflow:hidden
 *     container; lines slide up into view when the heading enters
 *     the viewport (0.1 threshold).
 *
 *  2. Eyebrow rule draw-in on .pq-rule and .tss__eyebrow-rule.
 *     Adds .sr-rule (defined in motion.css) and triggers .is-in
 *     on viewport entry (0.5 threshold).
 *
 * The Hero h1 is split separately inside the Hero component
 * because it has a delayed entrance tied to the mount state.
 *
 * Renders nothing — pure side-effect component.
 */
export default function ScrollAnimations() {
  useEffect(() => {
    /* ── 1. Headline line-clip reveals ──────────────────────── */
    const headlines = document.querySelectorAll<HTMLElement>('.shout-title');

    headlines.forEach(el => {
      // Skip if already processed (StrictMode double-mount guard)
      if (el.querySelector('.sr-line-wrap')) return;

      const parts = el.innerHTML.split(/<br\s*\/?>/gi);
      if (parts.length < 2) return; // single-line headings: skip

      el.innerHTML = parts
        .map(
          (part, i) =>
            `<span class="sr-line-wrap">` +
            `<span class="sr-line" style="transition-delay:${i * 95}ms">` +
            `${part}` +
            `</span></span>`
        )
        .join('');

      el.classList.add('sr-split');
    });

    const lineObs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target
            .querySelectorAll<HTMLElement>('.sr-line')
            .forEach(line => line.classList.add('is-in'));
          lineObs.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll('.sr-split')
      .forEach(el => lineObs.observe(el));

    /* ── 2. Eyebrow rule draw-in ─────────────────────────────── */
    const rules = document.querySelectorAll<HTMLElement>(
      '.pq-rule, .tss__eyebrow-rule'
    );

    rules.forEach(rule => rule.classList.add('sr-rule'));

    const ruleObs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          ruleObs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );

    rules.forEach(rule => ruleObs.observe(rule));

    /* ── Cleanup ─────────────────────────────────────────────── */
    return () => {
      lineObs.disconnect();
      ruleObs.disconnect();
    };
  }, []);

  return null;
}

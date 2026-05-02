'use client';
// @ts-nocheck
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ─── helpers ─────────────────────────────────────────────── */

/**
 * Walk every text node inside `el` and wrap each word in
 * <span class="pq-word">. Whitespace nodes are left as-is so
 * spacing, line-breaks, and parent styling (strike, underline,
 * bold) are completely preserved.
 */
function splitIntoWords(el: Element) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  textNodes.forEach(textNode => {
    const parts = textNode.textContent!.split(/(\s+)/);
    const frag = document.createDocumentFragment();
    parts.forEach(part => {
      if (part === '') return;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else {
        const span = document.createElement('span');
        span.className = 'pq-word';
        span.textContent = part;
        frag.appendChild(span);
      }
    });
    textNode.parentNode!.replaceChild(frag, textNode);
  });
}

/* ─── component ───────────────────────────────────────────── */

export default function PositioningQuoteReveal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const bodyEl = section.querySelector('.pq-body');
    if (!bodyEl) return;

    // Wrap every word in a span we can target
    splitIntoWords(bodyEl);

    const words = gsap.utils.toArray<HTMLElement>('.pq-word', section);
    if (!words.length) return;

    // All words begin as light grey — only color changes, never opacity
    gsap.set(words, { color: '#b8b2a8' });

    // Build a timeline where each word lights up in sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=1400',      // pixels pinned while animating
        pin: true,
        pinSpacing: true,
        scrub: 0.8,         // smoothly tied to scroll
        anticipatePin: 1,
      },
    });

    words.forEach((word, i) => {
      // Determine the word's natural end colour
      let targetColor = '#161410';                              // default: ink
      if (word.closest('.pq-accent')) targetColor = '#C8621C'; // matches .pq-accent CSS
      else if (word.closest('.pq-strike')) targetColor = 'rgba(26,26,26,0.42)'; // matches .pq-strike CSS

      tl.to(word, { color: targetColor, ease: 'none', duration: 0.4 }, i * 0.4);
    });

    // Draw each strike line in sync with its words revealing.
    // backgroundSize goes 0% → 100% across exactly the same timeline
    // window as the words inside that span — no new ScrollTrigger needed.
    gsap.utils.toArray<HTMLElement>('.pq-strike', section).forEach(strikeEl => {
      const strikeWords = Array.from(strikeEl.querySelectorAll<HTMLElement>('.pq-word'));
      if (!strikeWords.length) return;
      const firstIdx = words.indexOf(strikeWords[0]);
      const lastIdx  = words.indexOf(strikeWords[strikeWords.length - 1]);
      if (firstIdx === -1) return;
      tl.fromTo(
        strikeEl,
        { backgroundSize: '0% 1.5px' },
        { backgroundSize: '100% 1.5px', ease: 'none', duration: (lastIdx - firstIdx + 1) * 0.4 },
        firstIdx * 0.4,   // starts exactly when the first word in this span lights up
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars?.trigger === section) t.kill();
      });
      gsap.set(words, { clearProps: 'color' });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad-sm positioning-quote"
      data-screen-label="03 Positioning quote"
    >
      <div className="shell">
        <div className="pq-block">
          <div className="pq-eyebrow">
            <span className="pq-rule" aria-hidden="true" />— THE POSITIONING
          </div>

          {/* ↓ keep all existing spans exactly as-is ↓ */}
          <p className="pq-body">
            Growth doesn&apos;t break because{' '}
            <span className="pq-strike">SEO stopped working</span> or{' '}
            <span className="pq-strike">ads got expensive</span>. It breaks
            because things are working in isolation — the intent is off, the
            message doesn&apos;t land, the value doesn&apos;t stick. I work at
            the seam where{' '}
            <span className="pq-accent">
              marketing decisions become business decisions
            </span>
            . <span className="pq-underline">That&apos;s the work.</span>
          </p>

          <div className="pq-sign">
            <span className="pq-rule pq-rule--short" aria-hidden="true" />
            — BHARGAVA · HOW I LOOK AT GROWTH
          </div>
        </div>
      </div>
    </section>
  );
}

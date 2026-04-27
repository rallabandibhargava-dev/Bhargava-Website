'use client';
import { useEffect } from 'react';

export default function useRevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .img-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

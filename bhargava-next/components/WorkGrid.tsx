'use client';
// @ts-nocheck
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

const CATEGORIES = ['All', 'Acquisition', 'Positioning', 'Systems', 'Tools'];

function WorkGridCard({ item }) {
  return (
    <Link href={`/work/${item.slug}`} className={'wgc wgc--' + item.surface}>
      <div className="wgc__media">
        <div
          className={'ph-image img-reveal' + (item.surface === 'dim' || item.surface === 'ochre' ? ' ph-image--dark' : '')}
          style={{ aspectRatio: item.ratio, width: '100%', height: '100%' }}
        >
          <div className="ph-image__label">{item.client.toLowerCase().replace(/ /g, '-')} · {item.year}</div>
        </div>
        <div className="wgc__overlay" />
        <span className="tag tag--ochre wgc__tag">{item.tag}</span>
      </div>
      <div className="wgc__line">
        <span>{item.client}</span><span className="wgc__dot">·</span>
        <span>{item.type}</span><span className="wgc__dot">·</span>
        <span>{item.year}</span>
      </div>
      <h3 className="wgc__title">{item.title}</h3>
      <div className="wgc__read">Read case <span className="wgc__arrow">→</span></div>
    </Link>
  );
}

export default function WorkGrid({ items }) {
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(
    () => filter === 'All' ? items : items.filter(w => w.category === filter),
    [filter, items]
  );

  useEffect(() => {
    const els = document.querySelectorAll('.wgc .img-reveal');
    els.forEach(el => el.classList.add('is-in'));
  }, [filtered]);

  return (
    <>
      <div className="work-controls">
        <div className="work-filter" role="tablist">
          {CATEGORIES.map(c => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={'work-filter__btn' + (filter === c ? ' is-active' : '')}
              onClick={() => setFilter(c)}
            >
              {c}
              <span className="work-filter__count">
                {c === 'All' ? items.length : items.filter(w => w.category === c).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="section-pad-sm">
        <div className="work-grid-full">
          {filtered.map(w => <WorkGridCard key={w.slug} item={w} />)}
        </div>
        {filtered.length === 0 && (
          <div className="work-empty">Nothing in this category yet.</div>
        )}
      </div>
    </>
  );
}

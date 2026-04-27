'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const links = [
  { href: '/',         label: 'Home',     key: 'home' },
  { href: '/work',     label: 'Work',     key: 'work' },
  { href: '/services', label: 'Services', key: 'services' },
  { href: '/about',    label: 'About',    key: 'about' },
  { href: '/notes',    label: 'Notes',    key: 'notes' },
  { href: '/contact',  label: 'Contact',  key: 'contact' },
];

export default function SiteNav({ current, dark }: { current?: string; dark?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={'site-nav' + (dark ? ' site-nav--dark' : '')}>
        <div className="site-nav__inner">
          <Link href="/" className="site-nav__mark">
            Bhargava <span>/</span> Strategist
          </Link>
          <div className="site-nav__links">
            {links.map(l => (
              <Link key={l.key} href={l.href} className={current === l.key ? 'is-active' : ''}>
                {l.label}
              </Link>
            ))}
          </div>
          <button
            className={'site-nav__burger' + (menuOpen ? ' is-open' : '') + (dark ? ' site-nav__burger--dark' : '')}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={'mobile-nav' + (menuOpen ? ' is-open' : '') + (dark ? ' mobile-nav--dark' : '')} aria-hidden={!menuOpen}>
        <div className="mobile-nav__inner">
          {links.map(l => (
            <Link key={l.key} href={l.href}
              className={'mobile-nav__link' + (current === l.key ? ' is-active' : '')}
              onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Bhargava — Marketing Strategist, Mumbai', template: '%s — Bhargava' },
  description: 'Independent marketing strategist based in Mumbai. I diagnose why growth stalled and fix it — across positioning, acquisition, UX, and retention.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Bhargava',
    images: [{ url: '/assets/bhargava-portrait.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

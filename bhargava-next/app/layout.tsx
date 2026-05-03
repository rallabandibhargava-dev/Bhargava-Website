import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '../components/SmoothScroll';

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W553CNJZ');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W553CNJZ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

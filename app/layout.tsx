import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteConfig } from '@/lib/data';
import AdBanner from './components/AdBanner';
import './globals.css';

export const metadata: Metadata = {
  title: 'MBTI わたしの取説占い',
  description: 'MBTIで読む、わたしの今月',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteConfig = getSiteConfig();

  return (
    <html lang="ja">
      <head>
        {siteConfig.adsenseEnabled && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsensePublisherId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <header className="header">
          <div className="container">
            <h1 className="site-title">
              <Link href="/">{siteConfig.siteName}</Link>
            </h1>
            <p className="site-description">{siteConfig.siteDescription}</p>
          </div>
        </header>

        <main className="main">
          <div className="container">
            {children}
          </div>
        </main>

        {siteConfig.adsenseEnabled && (
          <div className="container">
            <AdBanner format="horizontal" />
          </div>
        )}

        <footer className="footer">
          <div className="container">
            <p>&copy; 2026 MBTI わたしの取説占い</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

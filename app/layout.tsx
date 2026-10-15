import type { Metadata } from 'next';
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ClientProviders } from './ClientProviders';
import { siteUrl } from '@/config/constants';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  // Lets OG/Twitter images resolve to absolute URLs from the configured origin.
  metadataBase: new URL(siteUrl),
  title: 'Lifted - Full-Stack Developer | Mobile & Web Solutions',
  description:
    'Hi, I am Lifted — a passionate Flutter and JavaScript developer. I specialize in building sleek, functional, and scalable digital experiences for fintech, medical, and artisan brands.',
  keywords: ['developer', 'flutter', 'react', 'javascript', 'mobile', 'web', 'portfolio'],
  authors: [{ name: 'Lifted' }],
  creator: 'Lifted',
  openGraph: {
    title: 'Lifted - Full-Stack Developer',
    description: 'Building beautiful, functional digital experiences',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lifted - Full-Stack Developer',
    description: 'Building beautiful, functional digital experiences',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#09090b" />
        {/*
          Applies the saved theme before first paint. Runs synchronously so there is
          no flash, and lets the app render normally on the server.
          Keep in sync with contexts/ThemeContext.tsx.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var t = localStorage.getItem('theme');
                  if (t !== 'light' && t !== 'dark') {
                    t = window.matchMedia('(prefers-color-scheme: dark)').matches
                      ? 'dark'
                      : 'light';
                  }
                  var r = document.documentElement;
                  r.classList.remove('light', 'dark');
                  r.classList.add(t);
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/service-worker.js').catch(() => {
                    // Service worker registration failed, app will still work
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

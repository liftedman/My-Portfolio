import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClientProviders } from './ClientProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Samuel Akinrimisade - Security Architecture & Risk Advisory',
  description:
    'Akinrimisade Samuel is a trained criminologist and security professional with experience spanning intelligence operations, physical security, organizational risk, governance, and security leadership. He helps organizations understand, structure, and fix their security before incidents happen.',
  keywords: [
    'security architecture',
    'risk advisory',
    'intelligence operations',
    'physical security',
    'governance',
    'security leadership',
    'security consulting',
  ],
  authors: [{ name: 'Samuel Akinrimisade' }],
  creator: 'Samuel Akinrimisade',
  openGraph: {
    title: 'Samuel Akinrimisade - Security Architecture & Risk Advisory',
    description: 'Proactive, system-based security through intelligence and governance',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samuel Akinrimisade - Security Architecture & Risk Advisory',
    description: 'Proactive, system-based security for organizations',
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
        <meta name="theme-color" content="#0E1116" />
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

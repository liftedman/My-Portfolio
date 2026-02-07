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
        <meta name="theme-color" content="#0f172a" />
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

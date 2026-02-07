import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Lifted - Full-Stack Developer | Mobile & Web Solutions',
    description:
      'Hi, I am Lifted — a passionate Flutter and JavaScript developer. I specialize in building sleek, functional, and scalable digital experiences for fintech, medical, and artisan brands.',
    keywords: [
      'developer',
      'flutter',
      'react',
      'javascript',
      'mobile',
      'web',
      'portfolio',
      'full-stack',
      'javascript developer',
      'flutter developer',
    ],
    authors: [{ name: 'Lifted' }],
    creator: 'Lifted',
    applicationName: 'Lifted Portfolio',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      telephone: false,
    },
    openGraph: {
      title: 'Lifted - Full-Stack Developer',
      description:
        'Building beautiful, functional digital experiences for innovative brands',
      type: 'website',
      locale: 'en_US',
      url: 'https://lifted.dev',
      images: [
        {
          url: 'https://lifted.dev/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Lifted - Full-Stack Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Lifted - Full-Stack Developer',
      description: 'Building beautiful, functional digital experiences',
      images: ['https://lifted.dev/twitter-image.png'],
    },
    verification: {
      google: 'google-site-verification-code',
    },
  };
};

export const robots = {
  index: true,
  follow: true,
  nocache: true,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

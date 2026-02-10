import type { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
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
      'organizational risk',
      'security assessment',
      'security portfolio',
    ],
    authors: [{ name: 'Samuel Akinrimisade' }],
    creator: 'Samuel Akinrimisade',
    applicationName: 'Samuel Akinrimisade Portfolio',
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      email: false,
      telephone: false,
    },
    openGraph: {
      title: 'Samuel Akinrimisade - Security Architecture & Risk Advisory',
      description:
        'Proactive, system-based security through intelligence, governance, and structured operations',
      type: 'website',
      locale: 'en_US',
      url: 'https://soasecure.com',
      images: [
        {
          url: 'https://soasecure.com/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Samuel Akinrimisade - Security Architecture & Risk Advisory',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Samuel Akinrimisade - Security Architecture & Risk Advisory',
      description: 'Proactive, system-based security for organizations',
      images: ['https://soasecure.com/twitter-image.png'],
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

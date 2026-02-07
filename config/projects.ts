export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'mobile' | 'web' | 'design' | 'backend';
  technologies: string[];
  image: string;
  images: string[];
  role: string;
  link?: string;
  github?: string;
  highlights: string[];
  year: number;
}

export const projects: Project[] = [
  {
    id: 'astravest',
    title: 'Astravest',
    shortDescription: 'A sleek financial platform with secure authentication',
    description:
      'Astravest is a cutting-edge fintech application designed for seamless financial transactions. Built with Flutter for iOS and Android, it features secure authentication, real-time balance updates, and smooth transaction flows.',
    category: 'mobile',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Supabase', 'Stripe API'],
    image: '/images/Asset.png',
    images: [
      '/images/Asset.png',
    ],
    role: 'Mobile Frontend Developer',
    github: 'https://github.com',
    link: 'https://astravestapp.com',
    highlights: [
      'Secure JWT-based authentication',
      'Real-time transaction processing with Stripe',
      'Firebase Cloud Firestore for data sync',
      'Responsive UI with smooth animations',
      '100+ happy users on launch',
    ],
    year: 2024,
  },
  {
    id: 'safegeeg',
    title: 'Safegeeg',
    shortDescription: 'Connecting artisans to clients with job posting and chat',
    description:
      'Safegeeg is a full-stack platform connecting skilled artisans with clients seeking services. Features include job posting, real-time chat, rating systems, and secure payment processing.',
    category: 'web',
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind'],
    image: '/images/code.webp',
    images: ['/images/code.webp'],
    role: 'Full-Stack Developer',
    github: 'https://github.com',
    link: 'https://safegeeg.com',
    highlights: [
      'Real-time chat using Socket.io',
      'Job matching algorithm',
      'Secure payment integration with Stripe',
      'Rating and review system',
      'Mobile-responsive design',
    ],
    year: 2023,
  },
  {
    id: 'alivee',
    title: 'Alivee',
    shortDescription: 'Real-time health data and appointment booking',
    description:
      'Alivee is a medical platform enabling patients to track health metrics, book appointments, and communicate with healthcare providers in real-time.',
    category: 'mobile',
    technologies: ['Flutter', 'Firebase', 'Google Cloud', 'Dart', 'Real-time Database'],
    image: '/images/alivee.jpeg',
    images: ['/images/alivee.jpeg', '/images/fitness-tracker.png'],
    role: 'Mobile Developer',
    github: 'https://github.com',
    link: 'https://alivee-health.com',
    highlights: [
      'Real-time health data sync',
      'Appointment scheduling system',
      'Doctor-patient messaging',
      'Firebase authentication',
      'HIPAA compliance considerations',
    ],
    year: 2024,
  },
  {
    id: 'vms',
    title: 'VMS - Visitor Management Security',
    shortDescription: 'Next-generation visitor management system for modern offices',
    description:
      'VMS is an enterprise-grade visitor management system combining Apple\'s futuristic simplicity with enterprise reliability. Features real-time visitor logging, QR-based check-in, role-based dashboards, and live analytics for seamless office security.',
    category: 'web',
    technologies: ['TypeScript', 'JavaScript', 'Next.js', 'Supabase', 'Google Cloud', 'Tailwind'],
    image: '/images/vms.png',
    images: ['/images/vms.png', '/images/vmstwo.png'],
    role: 'Full-Stack Developer',
    github: 'https://github.com',
    link: 'https://vms-security.com',
    highlights: [
      'Real-time visitor logging and tracking',
      'QR code-based check-in system',
      'Role-based dashboards for security and admin',
      'Live analytics and reporting',
      'Enterprise-grade security with Supabase',
    ],
    year: 2024,
  },
  {
    id: 'god-first',
    title: 'God First',
    shortDescription: 'Christian devotional app for spiritual wellness and prayer',
    description:
      'God First is a serene spiritual companion app designed to deepen faith through daily Bible verses, mood-based devotions, and a personal prayer journal. Features gentle motion transitions and soft light animations for an inspiring, peaceful experience.',
    category: 'mobile',
    technologies: ['Flutter', 'Firebase', 'Dart', 'Cloud Firestore', 'Push Notifications'],
    image: '/images/reading.jpeg',
    images: ['/images/reading.jpeg'],
    role: 'Mobile Developer',
    github: 'https://github.com',
    link: 'https://godfirstapp.com',
    highlights: [
      'Daily Bible verses with beautiful typography',
      'Mood-based devotional recommendations',
      'Personal prayer journal with cloud sync',
      'Push notifications for daily devotions',
      'Serene UI with soft animations and light effects',
    ],
    year: 2025,
  },
];

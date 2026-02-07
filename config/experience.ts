export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string | 'Present';
  technologies: string[];
  achievements: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: 'astravest-fintech',
    company: 'Astravest',
    position: 'Fintech Developer',
    description: 'Built secure financial platform for mobile users across iOS and Android.',
    startDate: 'Jan 2025',
    endDate: 'Present',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Stripe API'],
    achievements: [
      'Implemented secure JWT-based authentication system',
      'Integrated Stripe payment processing for seamless transactions',
      'Designed real-time balance updates using Firebase Cloud Firestore',
      'Achieved 100+ active users within first month of launch',
      'Built responsive UI with smooth micro-interactions',
    ],
  },
  {
    id: 'safeGeeg-fullstack',
    company: 'SafeGeeg',
    position: 'Frontend Developer',
    description:
      'Developed complete artisan-to-client marketplace platform with real-time features.',
    startDate: 'Jun 2024',
    endDate: 'Dec 2024',
    technologies: ['React', 'Next.js', 'Socket.io', 'Tailwind'],
    achievements: [
      'Engineered real-time chat system using Socket.io',
      'Built intelligent job matching algorithm',
      'Integrated secure payment system with Stripe',
      'Developed rating and review system',
      'Optimized performance with Next.js SSR and API routes',
    ],
  },
  {
    id: 'alivee-medical',
    company: 'Alivee',
    position: 'Medical App Developer',
    description: 'Created healthcare platform for real-time patient-doctor communication.',
    startDate: 'Mar 2024',
    endDate: 'Dec 2024',
    technologies: ['Flutter', 'Firebase', 'Google Cloud', 'Dart', 'Real-time Database'],
    achievements: [
      'Designed real-time health data synchronization',
      'Built appointment scheduling system',
      'Implemented doctor-patient messaging features',
      'Set up Firebase authentication with custom claims',
      'Deployed on Google Cloud with security best practices',
    ],
  },
];

export type ProjectStatus = 'live' | 'private' | 'archived';

/**
 * Long-form case study content. Every field is optional and each section is
 * skipped when empty, so a project can be filled in gradually.
 */
export interface CaseStudy {
  /** The problem the client actually had, in their terms. */
  problem?: string;
  /** Budget, timeline, platform or team limits that shaped the build. */
  constraints?: string;
  /** One hard technical call and the reasoning behind it. */
  decision?: {
    title: string;
    body: string;
  };
  /** What changed after shipping — ideally measurable. */
  outcome?: string;
}

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
  /** Only set when status is 'live'. An archived or private project has no link. */
  link?: string;
  github?: string;
  /** Controls how the project advertises itself instead of showing a dead link. */
  status: ProjectStatus;
  /** Short, honest explanation shown wherever a link would otherwise be. */
  statusNote?: string;
  /** Long-form write-up for /projects/[id]. Sections render only when filled in. */
  caseStudy?: CaseStudy;
  highlights: string[];
  year: number;
}

/*
 * TODO — outcome metrics.
 *
 * The highlights below are feature claims: accurate, but they describe what the
 * product does rather than what it changed. One real number per project is worth
 * more than five feature bullets, so answer whichever of these you can and add it
 * to `caseStudy.outcome` (or as a highlight):
 *
 *   Astravest — transactions processed? users at launch? App Store rating?
 *   Safegeeg  — artisans or clients registered? jobs matched? time-to-match?
 *   Alivee    — patients onboarded? appointments booked? sync latency achieved?
 *   VMS       — sites deployed to? check-in time before vs. after? visitors/day?
 *   God First — installs? daily actives? retention or notification open rate?
 *
 * Use only figures you can point at in a dashboard, invoice or store listing —
 * anything here is something an interviewer may ask you to substantiate.
 */
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
    link: 'https://astravestapp.com',
    status: 'live',
    highlights: [
      'Secure JWT-based authentication',
      'Real-time transaction processing with Stripe',
      'Firebase Cloud Firestore for data sync',
      'Responsive UI with smooth animations',
      '100+ active users within the first month of launch',
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
    image: '/images/safegeeg.jpeg',
    images: ['/images/safegeeg.jpeg'],
    role: 'Full-Stack Developer',
    link: 'https://safegeeg.com',
    status: 'live',
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
    status: 'archived',
    statusNote:
      'Built under contract for Alivee. The client retired the deployment after the engagement ended, so the product is no longer publicly hosted — screenshots and the technical breakdown are below.',
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
    link: 'https://secure-vis.vercel.app',
    status: 'live',
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
    image: '/images/godfirst.jpeg',
    images: ['/images/godfirst.jpeg'],
    role: 'Mobile Developer',
    link: 'https://godfirstapp.com',
    status: 'live',
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

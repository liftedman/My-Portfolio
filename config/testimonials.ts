export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Capt. Taiwo Oladele',
    role: 'Head of Security Operations',
    company: 'Nigerian Maritime Administration & Safety Agency (NIMASA)',
    content:
      'Samuel brings strategic thinking and meticulous planning to complex security challenges. His intelligence-driven approach and thorough situational awareness have proven invaluable to our maritime operations and organizational safety framework.',
    image: '/images/avatar-1.jpg',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Chief Bola Okonkwo',
    role: 'General Manager',
    company: 'Eko Hotel & Suites',
    content:
      'Samuel conducted a comprehensive security assessment of our property and operational protocols. His findings were thorough, professional, and his recommendations have significantly enhanced our organizational risk posture and guest safety measures.',
    image: '/images/avatar-2.jpg',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Chioma Adeyemi',
    role: 'Program Participant',
    company: 'Security Starts With Us Initiative',
    content:
      'Samuel\'s security awareness training completely changed how I view organizational safety. He transformed complex security concepts into practical lessons that resonate. This initiative should reach every organization in Nigeria.',
    image: '/images/avatar-3.jpg',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    name: 'Dr. Kunle Adebayo',
    role: 'Executive Director',
    company: 'First Peniel Global Services',
    content:
      'Samuel restructured our operations and governance systems with professional excellence. His systematic approach to identifying gaps and building accountability frameworks transformed our organizational efficiency and reduced operational risks significantly.',
    image: '/images/avatar-4.jpg',
    rating: 5,
  },
];

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
    name: 'Ushoro Samuel',
    role: 'CTO',
    company: 'AstravestApp',
    content:
      'Lifted transformed our vision into reality. His attention to detail and motion design expertise made AstravestApp feel premium. The app has exceeded our expectations.',
    image: '/images/avatar-1.jpg',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Michelle',
    role: 'CEO',
    company: 'SafeGeeg',
    content:
      'Working with Lifted was a game-changer. He built a full-stack platform that was both performant and beautiful. His real-time chat implementation was seamless.',
    image: '/images/avatar-2.jpg',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Dr. James Mitchell',
    role: 'Founder',
    company: 'Alivee',
    content:
      'Lifted brought our health platform to life with technical excellence and creative vision. His Firebase integration was bulletproof, and the UX is fantastic.',
    image: '/images/avatar-3.jpg',
    rating: 5,
  },
  {
    id: 'testimonial-4',
    name: 'Maya Patel',
    role: 'Design Lead',
    company: 'Tech Startup',
    content:
      'As a designer, I was impressed by how well Lifted implemented animations and micro-interactions. He truly bridges the gap between design and development.',
    image: '/images/avatar-4.jpg',
    rating: 5,
  },
];

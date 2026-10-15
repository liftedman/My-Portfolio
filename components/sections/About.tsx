'use client';

import { animate, motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Arrow, Eyebrow, FadeIn, ScrollText, TiltCard } from '@/components/motion/primitives';

const services = [
  {
    title: 'Mobile apps',
    description: 'Flutter and Dart apps for iOS and Android — one codebase, native feel, smooth at 60fps.',
    tags: ['Flutter', 'Dart', 'Firebase'],
  },
  {
    title: 'Web platforms',
    description: 'Next.js and React products with real-time data, server rendering and clean, accessible UI.',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    title: 'Backend & data',
    description: 'APIs, auth and data layers on Node.js, Supabase and Firebase that stay fast under load.',
    tags: ['Node.js', 'Supabase', 'MongoDB'],
  },
  {
    title: 'Motion & polish',
    description: 'Micro-interactions and transitions that make a product feel considered, not decorated.',
    tags: ['Framer Motion', 'Figma'],
  },
];

const stats = [
  { value: 5, suffix: '', label: 'Products shipped' },
  { value: 3, suffix: '', label: 'Industries — fintech, health, marketplaces' },
  { value: 3, suffix: '', label: 'Platforms — iOS, Android, web' },
];

/** Counts up from zero the first time it scrolls into view. */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {String(display).padStart(2, '0')}
      {suffix}
    </span>
  );
}

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-36">
      <div className="shell">
        <Eyebrow index="01">About</Eyebrow>

        <ScrollText
          className="max-w-6xl font-display text-[clamp(1.9rem,4.4vw,4.2rem)] font-semibold leading-[1.08] tracking-tight"
          text="I turn product ideas into fast, polished software — Flutter apps people keep on their home screen, Next.js platforms that stay quick under real-time load, and the backend that holds it all together."
        />

        <div className="mt-16 grid gap-14 sm:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Portrait */}
          <FadeIn>
            <TiltCard className="relative mx-auto max-w-md">
              <div className="liquid-glass shine-on-hover overflow-hidden rounded-[2rem] p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Portrait of Gbeminiyi Akinfala"
                    fill
                    sizes="(max-width: 1024px) 90vw, 440px"
                    className="object-cover grayscale-[30%] transition-[filter] duration-700 hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="tilt-pop absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                    <div>
                      <p className="font-display text-2xl font-bold leading-none">Gbeminiyi</p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                        Software Engineer
                      </p>
                    </div>
                    <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-on-accent">
                      Lifted
                    </span>
                  </div>
                </div>
              </div>
              <div className="liquid-glass float-slow tilt-pop absolute -right-4 -top-5 rounded-2xl px-4 py-3 sm:-right-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Shipping since</p>
                <p className="font-display text-2xl font-bold">2024</p>
              </div>
            </TiltCard>
          </FadeIn>

          {/* Bio + stats */}
          <div className="flex flex-col justify-between gap-12">
            <FadeIn className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m <span className="text-fg">Gbeminiyi Akinfala</span>, a mobile and web engineer
                who goes by <span className="text-fg">Lifted</span>. I work across the stack, but
                I care most about the part people touch — interfaces that are quick, clear and
                pleasant to use.
              </p>
              <p>
                I&apos;ve built for fintech, healthcare and marketplace clients: payment flows,
                real-time health data, visitor check-in systems and chat. I like small teams, clear
                problems and shipping things that get used.
              </p>
            </FadeIn>

            <div className="grid grid-cols-3 border-t border-line">
              {stats.map((stat, i) => (
                <FadeIn
                  key={stat.label}
                  delay={i * 0.1}
                  className={`pt-6 ${i > 0 ? 'border-l border-line pl-4 sm:pl-6' : 'pr-4'}`}
                >
                  <p className="font-display-tight text-5xl sm:text-7xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-3 text-xs leading-snug text-muted sm:text-sm">{stat.label}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mt-20 sm:mt-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display-tight text-[clamp(2.5rem,6vw,5rem)]">What I do</h3>
            <p className="max-w-sm text-muted">
              End-to-end product engineering — from the first screen to the database behind it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.article
                key={service.title}
                className="liquid-glass spotlight glass-rim group flex min-h-[220px] flex-col rounded-3xl p-6 sm:min-h-[300px] sm:p-7"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
              >
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-lg transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
                    <Arrow direction="up-right" />
                  </span>
                </div>
                <h4 className="relative mt-auto font-display text-2xl font-bold">{service.title}</h4>
                <p className="relative mt-3 text-sm leading-relaxed text-muted">{service.description}</p>
                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

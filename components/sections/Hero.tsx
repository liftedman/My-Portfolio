'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useIntro } from '@/contexts/IntroContext';
import { Arrow, Magnetic } from '@/components/motion/primitives';
import { smoothScroll } from '@/lib/utils';

const ROLES = ['Flutter apps', 'Next.js platforms', 'fintech products', 'real-time dashboards'];
const EASE = [0.22, 1, 0.36, 1] as const;

/** One headline row that rises from behind a mask once the intro is done. */
function Line({
  children,
  index,
  play,
  className = '',
}: {
  children: React.ReactNode;
  index: number;
  play: boolean;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className={`flex items-center gap-[0.18em] ${className}`}
        initial={{ y: '105%' }}
        animate={{ y: play ? '0%' : '105%' }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.08 * index }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export const Hero: React.FC = () => {
  const { ready } = useIntro();
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Scroll-out parallax: the headline drifts up and fades as the hero leaves.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // A soft accent glow that trails the pointer.
  const glowX = useSpring(0, { stiffness: 40, damping: 20 });
  const glowY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-svh flex-col overflow-hidden pt-28 pb-8"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        glowX.set(e.clientX - rect.left - rect.width / 2);
        glowY.set(e.clientY - rect.top - rect.height / 2);
      }}
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-lines absolute inset-0 opacity-60" />
        <div className="aurora-beam absolute -top-1/4 left-[10%] h-[50vh] w-[45vw] rounded-full bg-accent/25 blur-3xl" />
        <div className="aurora-beam delay absolute -bottom-1/4 right-[5%] h-[40vh] w-[35vw] rounded-full bg-accent-deep/15 blur-3xl" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
          style={{ x: glowX, y: glowY }}
        />
      </div>

      <div className="shell flex flex-1 flex-col">
        {/* Top meta row */}
        <motion.div
          className="mb-10 flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <p className="eyebrow">
            Hey, I&apos;m <span className="text-fg">Gbeminiyi Akinfala</span> — aka Lifted
          </p>
          <span className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
            Available for new projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display-tight text-[clamp(3.6rem,14vw,14rem)]"
          style={{ y: headlineY, opacity: headlineOpacity }}
        >
          <Line index={0} play={ready}>
            Mobile&nbsp;&amp;
          </Line>
          <Line index={1} play={ready}>
            <motion.span
              className="relative inline-block h-[0.72em] w-[1.5em] shrink-0 overflow-hidden rounded-full ring-2 ring-accent ring-offset-4 ring-offset-bg"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={ready ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            >
              <Image
                src="/images/profile.jpeg"
                alt="Gbeminiyi Akinfala"
                fill
                priority
                sizes="(max-width: 768px) 30vw, 260px"
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </motion.span>
            <span className="text-outline">Web</span>
          </Line>
          <Line index={2} play={ready}>
            <span>
              Engineer<span className="text-accent">.</span>
            </span>
          </Line>
        </motion.h1>

        {/* Intro + actions */}
        <div className="mt-auto pt-12">
          <motion.div
            className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end"
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          >
            <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              I build{' '}
              <span className="relative inline-block min-w-[11ch] text-fg perspective-[600px]">
                <span key={roleIndex} className="role-flip font-semibold text-accent-ink">
                  {ROLES[roleIndex]}
                </span>
              </span>
              <br className="sm:hidden" /> for fintech, healthcare and marketplace teams — Flutter
              on iOS and Android, Next.js on the web. Five products shipped since 2024.
            </p>

            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <Magnetic>
                <button
                  type="button"
                  onClick={() => smoothScroll('projects')}
                  className="btn-pill solid"
                >
                  View my work
                  <Arrow direction="down-right" />
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href="/documents/flutter_dev.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill"
                >
                  Résumé
                  <Arrow direction="up-right" />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="mt-10 flex items-center justify-between border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
        >
          <span>Mobile · Web · Backend</span>
          <span className="flex items-center gap-3">
            Scroll
            <span className="relative block h-8 w-px overflow-hidden bg-line-strong">
              <motion.span
                className="absolute inset-x-0 top-0 h-1/2 bg-accent"
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </span>
          <span className="hidden sm:inline">Remote · Worldwide</span>
        </motion.div>
      </div>
    </section>
  );
};

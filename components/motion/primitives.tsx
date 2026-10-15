'use client';

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Splits text into words that slide up from behind a mask.
 * Plays when scrolled into view, or when `play` flips to true if it is given.
 */
export function SplitReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  play,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}) {
  const words = text.split(' ');
  const controlled = play !== undefined;
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(controlled
        ? { animate: play ? 'visible' : 'hidden' }
        : { whileInView: 'visible', viewport: { once: true, margin: '-10% 0px' } })}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden="true">
          <motion.span
            className={cn('inline-block', wordClassName)}
            variants={{
              hidden: { y: '110%', rotate: 4 },
              visible: { y: '0%', rotate: 0, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Fades and lifts children into place once they scroll into view. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 32,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** One word of a ScrollText paragraph; its opacity follows scroll progress. */
function ScrollWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
      {' '}
    </span>
  );
}

/** A paragraph that "reads itself": words light up one by one as you scroll past. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={cn('flex flex-wrap', className)} aria-label={text}>
      {words.map((word, i) => (
        <ScrollWord
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </ScrollWord>
      ))}
    </p>
  );
}

/** Pulls its child toward the pointer while hovered, then springs back. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** 3D tilt toward the pointer. Children can use .tilt-pop to float above the card. */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove('is-tilting');
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div className="tilt-scene">
      <div
        ref={ref}
        className={cn('tilt-inner', className)}
        onPointerMove={(e) => {
          const el = ref.current;
          if (e.pointerType !== 'mouse' || !el) return;
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          el.classList.add('is-tilting');
          el.style.setProperty('--tilt-x', `${(-py * max).toFixed(2)}deg`);
          el.style.setProperty('--tilt-y', `${(px * max).toFixed(2)}deg`);
        }}
        onPointerLeave={reset}
      >
        {children}
      </div>
    </div>
  );
}

/** Infinite horizontal ticker. Content is rendered twice so the loop is seamless. */
export function Marquee({
  children,
  duration = 32,
  reverse = false,
  className,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn('overflow-hidden', pauseOnHover && 'marquee-hover-pause', className)}>
      <div
        className={cn('marquee-track', reverse && 'reverse')}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

const ARROW_ROTATION = { right: 0, 'up-right': -45, 'down-right': 45, down: 90, left: 180, up: -90 };

/**
 * Line arrow icon. Unicode arrows (↗ ↘) render as emoji on Windows, so
 * every arrow on the site goes through this instead.
 */
export function Arrow({
  direction = 'right',
  className,
}: {
  direction?: keyof typeof ARROW_ROTATION;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-[1em] w-[1em] shrink-0', className)}
      style={{ rotate: `${ARROW_ROTATION[direction]}deg` }}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Small mono label with an accent tick, used above section titles. */
export function Eyebrow({ index, children }: { index?: string; children: React.ReactNode }) {
  return (
    <div className="eyebrow mb-6 flex items-center gap-3">
      {index && <span className="text-accent-ink">{index}</span>}
      <span className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </div>
  );
}

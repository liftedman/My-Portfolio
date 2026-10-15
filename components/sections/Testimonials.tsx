'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { testimonials } from '@/config/testimonials';
import { getInitials } from '@/lib/utils';
import { Eyebrow } from '@/components/motion/primitives';

const INTERVAL_MS = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % testimonials.length), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, paused]);

  if (testimonials.length === 0) return null;

  const go = (next: number) => setIndex((next + testimonials.length) % testimonials.length);
  const current = testimonials[index];
  const words = current.content.split(' ');

  return (
    <section
      id="testimonials"
      className="relative py-20 sm:py-28 lg:py-36"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="shell">
        <Eyebrow index="05">Kind words</Eyebrow>

        <div className="liquid-glass relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-14 sm:py-16">
          <span
            className="pointer-events-none absolute right-6 top-2 select-none font-display text-[12rem] leading-[0.8] text-accent opacity-15 sm:right-12"
            aria-hidden="true"
          >
            &rdquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.figure
              key={current.id}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              transition={{ staggerChildren: 0.025 }}
              className="relative"
            >
              <blockquote className="max-w-5xl font-display text-[clamp(1.5rem,3.2vw,3rem)] font-medium leading-[1.2] tracking-tight">
                {words.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
                      visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE } },
                    }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </blockquote>

              <motion.figcaption
                className="mt-10 flex items-center gap-4"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.4 } } }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent font-display font-bold text-on-accent">
                  {getInitials(current.name).slice(0, 2)}
                </span>
                <span>
                  <span className="block font-semibold">{current.name}</span>
                  <span className="block text-sm text-muted">
                    {current.role}, {current.company}
                  </span>
                </span>
              </motion.figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="relative mt-12 flex items-center gap-6">
            <div className="flex gap-2">
              <button type="button" onClick={() => go(index - 1)} className="btn-circle" aria-label="Previous testimonial">
                ←
              </button>
              <button type="button" onClick={() => go(index + 1)} className="btn-circle" aria-label="Next testimonial">
                →
              </button>
            </div>

            <div className="flex flex-1 gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => go(i)}
                  className="relative h-8 flex-1"
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-accent"
                      initial={{ width: paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: paused ? 0 : INTERVAL_MS / 1000, ease: 'linear' }}
                    />
                  )}
                  {i < index && <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-fg/40" />}
                </button>
              ))}
            </div>

            <span className="font-mono text-xs tabular-nums text-faint">
              {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

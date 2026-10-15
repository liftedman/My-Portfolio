'use client';

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { experiences } from '@/config/experience';
import { Eyebrow, SplitReveal } from '@/components/motion/primitives';

export const Experience: React.FC = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const [open, setOpen] = useState<string | null>(experiences[0]?.id ?? null);

  // The rail on the left fills in as the list scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.75', 'end 0.6'] });
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative py-20 sm:py-28 lg:py-36">
      <div className="shell">
        <div className="mb-16 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow index="04">Experience</Eyebrow>
            <SplitReveal as="h2" text="The journey so far" className="font-display-tight text-[clamp(3rem,8vw,8rem)]" />
          </div>
          <p className="max-w-md text-muted lg:justify-self-end">
            Product teams I&apos;ve built with, what I owned, and what came out of it. Tap a role
            for the detail.
          </p>
        </div>

        <ol ref={listRef} className="relative border-b border-line pl-6 sm:pl-10">
          {/* Rail */}
          <span className="absolute bottom-0 left-0 top-0 w-px bg-line" aria-hidden="true" />
          <motion.span
            className="absolute left-0 top-0 h-full w-px origin-top bg-accent"
            style={{ scaleY: rail }}
            aria-hidden="true"
          />

          {experiences.map((exp, i) => {
            const isOpen = open === exp.id;
            return (
              <motion.li
                key={exp.id}
                className="relative border-t border-line"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className={`absolute -left-6 top-9 h-2.5 w-2.5 -translate-x-1/2 rounded-full border transition-colors duration-500 sm:-left-10 ${
                    isOpen ? 'border-accent bg-accent' : 'border-line-strong bg-bg'
                  }`}
                  aria-hidden="true"
                />

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : exp.id)}
                  className="group grid w-full gap-2 py-7 text-left sm:grid-cols-[180px_1fr_auto] sm:items-center sm:gap-8"
                  aria-expanded={isOpen}
                  aria-controls={`exp-${exp.id}`}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-faint">
                    {exp.startDate} — {exp.endDate}
                  </span>
                  <span>
                    <span className="block font-display text-3xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl">
                      {exp.company}
                    </span>
                    <span className="mt-1 block text-muted">{exp.position}</span>
                  </span>
                  <span
                    className={`hidden h-12 w-12 items-center justify-center rounded-full border text-xl transition-all duration-500 sm:flex ${
                      isOpen
                        ? 'rotate-45 border-accent bg-accent text-on-accent'
                        : 'border-line-strong group-hover:border-fg'
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`exp-${exp.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-9 sm:grid-cols-[180px_1fr] sm:gap-8">
                        <div className="flex flex-wrap content-start gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div>
                          <p className="mb-5 max-w-2xl text-lg text-fg">{exp.description}</p>
                          <ul className="grid gap-x-8 gap-y-2.5 md:grid-cols-2">
                            {exp.achievements.map((item) => (
                              <li key={item} className="flex gap-3 text-sm text-muted">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

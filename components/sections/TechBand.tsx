'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { skills } from '@/config/skills';
import { Marquee } from '@/components/motion/primitives';

/** Two crossed tickers of the stack between the hero and About. */
export function TechBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 2]);
  const rotateBack = useTransform(scrollYProgress, [0, 1], [3, -1]);

  const names = skills.map((skill) => skill.name);

  return (
    <div ref={ref} className="relative overflow-hidden py-16" aria-label="Tech stack">
      <motion.div style={{ rotate: rotateBack }} className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2">
        <Marquee duration={50} reverse className="border-y border-line bg-surface py-4">
          {names.map((name) => (
            <span key={name} className="mx-6 font-display-tight text-3xl text-outline [--outline-color:var(--faint)] sm:text-4xl">
              {name}
            </span>
          ))}
        </Marquee>
      </motion.div>

      <motion.div style={{ rotate }} className="relative -mx-[5%]">
        <Marquee duration={40} className="bg-accent py-4 text-on-accent">
          {names.map((name) => (
            <span key={name} className="flex items-center font-display-tight text-3xl sm:text-4xl">
              <span className="mx-6">{name}</span>
              <span aria-hidden="true">✦</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}

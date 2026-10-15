'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Page-wide atmosphere: film grain, a scroll progress hairline, and the
 * pointer tracking that powers every `.spotlight` / `.liquid-glass` glow.
 */
export function Ambient() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('.spotlight');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <>
      <div className="grain-layer" aria-hidden="true" />
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent"
        style={{ scaleX }}
        aria-hidden="true"
      />
    </>
  );
}

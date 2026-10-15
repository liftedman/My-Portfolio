'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useIntro } from '@/contexts/IntroContext';
import { getLenis } from '@/lib/lenis';
import { prefersReducedMotion } from '@/lib/utils';

const WORDS = ['Design', 'Build', 'Ship', 'Lifted'];
const DURATION_MS = 1600;

/**
 * Counter + word cycle that lifts away like a curtain. Rendered on the server
 * so there is no flash of the page underneath; a CSS failsafe hides it if
 * JavaScript never runs.
 */
export function Preloader() {
  const { setReady } = useIntro();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(false);
      setReady(true);
      return;
    }

    let start: number | null = null;
    let readyTimer: ReturnType<typeof setTimeout> | undefined;
    let frame = requestAnimationFrame(function tick(now) {
      if (start === null) {
        start = now;
        // Lenis registers in a parent effect, so it only exists from the first frame on.
        getLenis()?.stop();
      }
      const t = Math.min(1, (now - start) / DURATION_MS);
      // Ease-out so the count slows as it approaches 100.
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setVisible(false);
        // Let the hero start entering while the curtain is still rising.
        readyTimer = setTimeout(() => setReady(true), 250);
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(readyTimer);
    };
  }, [setReady]);

  const word = WORDS[Math.min(WORDS.length - 1, Math.floor((count / 100) * WORDS.length))];

  return (
    <AnimatePresence
      onExitComplete={() => {
        getLenis()?.start();
      }}
    >
      {visible && (
        <motion.div
          key="preloader"
          className="preloader-failsafe fixed inset-0 z-100 flex flex-col justify-between bg-fg p-6 text-bg sm:p-10"
          exit={{ y: '-100%', borderBottomLeftRadius: '50% 12%', borderBottomRightRadius: '50% 12%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] opacity-60">
            <span>Lifted — Portfolio</span>
            <span>©{new Date().getFullYear()}</span>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={word}
                className="font-display-tight text-[18vw] sm:text-[12vw]"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
                <span className="text-accent">.</span>
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="h-px flex-1 bg-current opacity-20">
              <div className="h-px bg-accent" style={{ width: `${count}%` }} />
            </div>
            <span className="font-display-tight text-6xl tabular-nums sm:text-8xl">
              {String(count).padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

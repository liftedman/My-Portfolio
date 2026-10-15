'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { siteConfig } from '@/config/constants';
import { smoothScroll } from '@/lib/utils';
import { Magnetic } from '@/components/motion/primitives';

export const Footer: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  // The wordmark rises into place as the footer comes into view.
  const wordY = useTransform(scrollYProgress, [0, 1], ['45%', '0%']);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line pt-16">
      <div className="shell">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2">
              {siteConfig.navigation
                .filter((item) => item.href.startsWith('#'))
                .map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-muted transition-colors hover:text-fg">
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2">
              {Object.entries(siteConfig.socialLinks).map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="capitalize text-muted transition-colors hover:text-fg"
                  >
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 flex items-center justify-between gap-6 sm:col-span-1 sm:flex-col sm:items-end">
            <a href={`mailto:${siteConfig.email}`} className="text-muted transition-colors hover:text-fg">
              {siteConfig.email}
            </a>
            <Magnetic>
              <button
                type="button"
                onClick={() => smoothScroll('')}
                className="btn-circle h-14! w-14!"
                aria-label="Back to top"
              >
                ↑
              </button>
            </Magnetic>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line py-6 sm:mt-14 font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
          <span>© {new Date().getFullYear()} Gbeminiyi Akinfala</span>
          <span>Designed &amp; built by Lifted</span>
        </div>
      </div>

      <motion.p
        className="font-display-tight pointer-events-none select-none whitespace-nowrap text-center text-[27vw] leading-[0.75] text-fg"
        style={{ y: wordY }}
        aria-hidden="true"
      >
        Lifted<span className="text-accent">.</span>
      </motion.p>
    </footer>
  );
};

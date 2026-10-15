'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/constants';
import { getLenis } from '@/lib/lenis';
import { smoothScroll } from '@/lib/utils';
import { useIntro } from '@/contexts/IntroContext';
import { Magnetic } from '@/components/motion/primitives';
import { ThemeToggle } from './ThemeToggle';

const links = siteConfig.navigation.filter((item) => item.href.startsWith('#'));

export const Navbar: React.FC = () => {
  const { ready } = useIntro();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Tuck the bar away while reading downwards; bring it back on any upward scroll.
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > previous && latest > 400 && !menuOpen);
  });

  // Track which section is under the middle of the viewport.
  useEffect(() => {
    const sections = links
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Freeze the page behind the full-screen mobile menu.
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    smoothScroll(href.replace('#', ''));
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: ready && !hidden ? 0 : -100 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="shell flex h-20 items-center justify-between gap-4">
          {/* Wordmark */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              go('');
            }}
            className="group relative z-10 flex items-center gap-2 font-display text-xl font-bold tracking-tight"
            aria-label="Lifted — back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fg text-sm text-bg transition-transform duration-500 group-hover:rotate-360">
              L
            </span>
            <span className="hidden sm:inline">
              Lifted<span className="text-accent-ink">.</span>
            </span>
          </Link>

          {/* Desktop pill */}
          <nav
            className={`liquid-glass hidden items-center rounded-full p-1.5 transition-shadow duration-500 lg:flex ${
              scrolled ? '' : 'shadow-none!'
            }`}
            aria-label="Primary"
          >
            {links.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-on-accent' : 'text-muted hover:text-fg'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <ThemeToggle />
            <Magnetic className="hidden sm:inline-block">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go('#contact');
                }}
                className="btn-pill solid py-3!"
              >
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-on-accent" />
                Let&apos;s talk
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="btn-circle lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ${
                    menuOpen ? 'top-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ${
                    menuOpen ? 'top-1/2 -rotate-45' : 'top-full'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-4 pb-10 pt-28 sm:px-8 lg:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((item, i) => (
                <div key={item.href} className="overflow-hidden border-b border-line">
                  <motion.a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.href);
                    }}
                    className="flex items-baseline justify-between py-3"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-display-tight text-5xl sm:text-6xl">{item.label}</span>
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>

            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {Object.entries(siteConfig.socialLinks).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                  {platform}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

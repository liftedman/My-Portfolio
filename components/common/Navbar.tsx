'use client';

import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/constants';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href === '/' || href === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sectionId = href.replace('#', '');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-effect-dark backdrop-blur-xl border-b border-cyan-500/20'
          : 'bg-transparent'
      }`}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('/');
              }}
              className="text-2xl font-bold gradient-text cursor-pointer"
            >
              Lifted Akinfala
            </a>
          </motion.div>

          {/* Navigation Items - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {siteConfig.navigation.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right Side - Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button - Hidden on mobile */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="hidden sm:inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-slate-300"
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 px-4 space-y-3 border-t border-cyan-500/20 glass-effect-dark bg-gradient-to-b from-slate-900/60 to-slate-950/80 backdrop-blur-lg">
                {siteConfig.navigation.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm font-semibold text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-cyan-500/30 cursor-pointer"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.label}
                    </motion.div>
                  </a>
                ))}
                <motion.div
                  className="pt-4 border-t border-slate-700/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#contact');
                    }}
                    className="block w-full px-4 py-3 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-sm text-center cursor-pointer"
                  >
                    Get In Touch
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      {isScrolled && (
        <motion.div
          className="h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.5 }}
          style={{ originX: 0 }}
        />
      )}
    </motion.nav>
  );
};

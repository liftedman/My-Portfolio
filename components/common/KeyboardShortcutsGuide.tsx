'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const shortcuts = [
  { key: 'Alt + H', action: 'Home' },
  { key: 'Alt + A', action: 'About' },
  { key: 'Alt + P', action: 'Projects' },
  { key: 'Alt + S', action: 'Skills' },
  { key: 'Alt + E', action: 'Experience' },
  { key: 'Alt + T', action: 'Testimonials' },
  { key: 'Alt + C', action: 'Contact' },
  { key: 'Esc', action: 'Scroll to top' },
];

export const KeyboardShortcutsGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle shortcuts guide with ? key
      if (e.key === '?' && e.shiftKey) {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="liquid-glass fixed bottom-6 right-6 z-50 hidden h-11 w-11 items-center justify-center rounded-full font-mono text-sm text-muted transition-colors hover:text-fg md:flex"
        title="Keyboard shortcuts (Shift + ?)"
        aria-label="Keyboard shortcuts"
      >
        ?
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Keyboard shortcuts"
            >
              <div className="rounded-3xl border border-line bg-elevated p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold">Shortcuts</h3>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn-circle h-9! w-9!"
                    aria-label="Close keyboard shortcuts"
                  >
                    ✕
                  </button>
                </div>

                <ul>
                  {shortcuts.map((shortcut) => (
                    <li
                      key={shortcut.key}
                      className="flex items-center justify-between border-t border-line py-3"
                    >
                      <span className="text-muted">{shortcut.action}</span>
                      <kbd className="rounded-md border border-line-strong px-2.5 py-1 font-mono text-xs">
                        {shortcut.key}
                      </kbd>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

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
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-violet-500 text-white rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Keyboard Shortcuts (Shift + ?)"
      >
        <span className="text-xl font-bold">?</span>
      </motion.button>

      {/* Shortcuts modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="glass-effect-dark p-6 rounded-xl border border-cyan-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold gradient-text">Keyboard Shortcuts</h3>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label="Close keyboard shortcuts"
                    title="Close keyboard shortcuts"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-3">
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="text-slate-300">{shortcut.action}</span>
                      <kbd className="px-3 py-1 bg-slate-700 text-cyan-400 rounded font-mono text-sm">
                        {shortcut.key}
                      </kbd>
                    </motion.div>
                  ))}
                </div>

                <p className="mt-6 text-sm text-slate-400 text-center">
                  Press <kbd className="px-2 py-1 bg-slate-700 rounded text-xs">Shift + ?</kbd> to
                  toggle this guide
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

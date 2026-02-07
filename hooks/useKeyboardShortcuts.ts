'use client';

import { useEffect } from 'react';
import { smoothScroll } from '@/lib/utils';

export const useKeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if no input is focused
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      // Alt/Option + key shortcuts
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'h':
            e.preventDefault();
            smoothScroll('');
            break;
          case 'a':
            e.preventDefault();
            smoothScroll('about');
            break;
          case 'p':
            e.preventDefault();
            smoothScroll('projects');
            break;
          case 's':
            e.preventDefault();
            smoothScroll('skills');
            break;
          case 'e':
            e.preventDefault();
            smoothScroll('experience');
            break;
          case 't':
            e.preventDefault();
            smoothScroll('testimonials');
            break;
          case 'c':
            e.preventDefault();
            smoothScroll('contact');
            break;
        }
      }

      // Escape key to scroll to top
      if (e.key === 'Escape') {
        smoothScroll('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
};

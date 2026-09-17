'use client';

import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user" makes every framer-motion animation honour the
    // operating system's "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>{children}</ThemeProvider>
    </MotionConfig>
  );
}

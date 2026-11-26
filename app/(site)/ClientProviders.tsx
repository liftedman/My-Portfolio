'use client';

import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Ambient } from '@/components/motion/Ambient';
import { CustomCursor } from '@/components/common/CustomCursor';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user" makes every framer-motion animation honour the
    // operating system's "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <SmoothScroll />
        <Ambient />
        <CustomCursor />
        {children}
      </ThemeProvider>
    </MotionConfig>
  );
}

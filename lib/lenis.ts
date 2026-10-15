import type Lenis from 'lenis';

/**
 * The single Lenis instance, registered by <SmoothScroll />. Null until it
 * mounts, and permanently null for visitors who prefer reduced motion.
 */
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

export const getLenis = () => instance;

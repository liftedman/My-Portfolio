import { getLenis } from './lenis';

export const clsx = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * True when the visitor has asked their OS to reduce motion.
 * JS-driven scrolling ignores the CSS media query, so it has to be checked here.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const scrollBehavior = (): ScrollBehavior =>
  prefersReducedMotion() ? 'auto' : 'smooth';

/** Scrolls to a section id, or to the top for an empty id. Uses Lenis when it is running. */
export const smoothScroll = (elementId: string) => {
  const lenis = getLenis();
  const element = elementId ? document.getElementById(elementId) : null;

  if (elementId && !element) return;

  if (lenis) {
    lenis.scrollTo(element ?? 0, { duration: 1.4 });
    return;
  }

  if (element) {
    element.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  }
};

export const debounce = <T extends (...args: never[]) => unknown>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: never[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const rgbToString = (r: number, g: number, b: number, a: number = 1): string => {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

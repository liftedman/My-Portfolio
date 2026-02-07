'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

interface ScrollAnimationState {
  isScrolling: boolean;
  scrollY: number;
  scrollDirection: 'up' | 'down' | 'none';
}

export const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ScrollAnimationState>({
    isScrolling: false,
    scrollY: 0,
    scrollDirection: 'none',
  });

  const { scrollY } = useScroll();
  let lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setState((prev) => ({
      ...prev,
      scrollY: latest,
      scrollDirection: latest > lastScrollY.current ? 'down' : 'up',
    }));
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const handleScroll = () => {
      setState((prev) => ({
        ...prev,
        isScrolling: true,
      }));
    };

    const handleScrollEnd = () => {
      setState((prev) => ({
        ...prev,
        isScrolling: false,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scrollend', handleScrollEnd);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
    };
  }, []);

  return {
    ref,
    ...state,
  };
};

export const useInViewAnimation = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
};

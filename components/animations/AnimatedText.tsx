'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'fadeInUp' | 'fadeInDown' | 'typewriter' | 'characterByCharacter';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  type = 'fadeInUp',
}) => {
  if (type === 'characterByCharacter') {
    return (
      <motion.div className={className}>
        {children.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: delay + i * 0.05,
              duration: 0.3,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  const variants = {
    fadeInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay },
      },
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay },
      },
    },
  };

  const selectedVariants = variants[type as 'fadeInUp' | 'fadeInDown'];

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={selectedVariants}
    >
      {children}
    </motion.div>
  );
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}) => {
  const variants = {
    up: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants[direction]}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.1,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

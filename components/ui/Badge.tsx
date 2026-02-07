'use client';

import { motion } from 'framer-motion';

interface BadgeProps {
  children: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const variantStyles = {
  primary: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  secondary: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
  accent: 'bg-green-500/20 text-green-300 border border-green-500/30',
  neutral: 'bg-slate-500/20 text-slate-300 border border-slate-500/30',
};

const sizeStyles = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  animated = false,
}) => {
  return (
    <motion.span
      className={`
        inline-flex items-center justify-center rounded-full font-semibold
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      animate={animated ? { scale: [1, 1.05, 1] } : {}}
      transition={animated ? { duration: 2, repeat: Infinity } : {}}
      whileHover={{ scale: 1.1 }}
    >
      {children}
    </motion.span>
  );
};

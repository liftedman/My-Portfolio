'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true,
  gradient = false,
  onClick,
}) => {
  return (
    <motion.div
      className={`
        glass-effect-dark p-6 rounded-lg
        ${gradient ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50' : 'bg-slate-900/40'}
        ${hoverable ? 'hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      whileHover={hoverable ? { scale: 1.02, y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

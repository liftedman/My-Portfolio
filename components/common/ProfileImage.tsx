'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProfileImageProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: { width: 120, height: 120, className: 'w-32 h-32' },
  md: { width: 180, height: 180, className: 'w-48 h-48' },
  lg: { width: 240, height: 240, className: 'w-64 h-64' },
  xl: { width: 320, height: 320, className: 'w-80 h-80' },
};

export const ProfileImage: React.FC<ProfileImageProps> = ({ className = '', size = 'lg' }) => {
  const dimensions = sizeMap[size];

  return (
    <motion.div
      className={`relative ${dimensions.className} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 via-violet-500 to-green-500 p-1"
        animate={{
          boxShadow: [
            '0 0 20px rgba(6, 182, 212, 0.4)',
            '0 0 40px rgba(6, 182, 212, 0.6)',
            '0 0 20px rgba(6, 182, 212, 0.4)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Inner container */}
        <div className="relative w-full h-full rounded-full bg-slate-950 p-1 overflow-hidden">
          {/* Image */}
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="/images/image.jpeg"
              alt="Profile Picture"
              width={dimensions.width}
              height={dimensions.height}
              className="w-full h-full object-cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-950/20" />
          </div>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          animate={{
            x: [0, 50 * Math.cos((i * 2 * Math.PI) / 3), 0],
            y: [0, 50 * Math.sin((i * 2 * Math.PI) / 3), 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </motion.div>
  );
};

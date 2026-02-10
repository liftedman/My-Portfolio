'use client';

import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { fadeInUp, fadeInDown, scaleIn, staggerContainer } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { ProfileImage } from '@/components/common/ProfileImage';
import { smoothScroll } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

// Animated particles component
const Particles: React.FC<{ mousePosition: { x: number; y: number } }> = ({
  mousePosition,
}) => {
  const particles = Array.from({ length: 5 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-sky-400 to-violet-400 rounded-full blur-sm"
          animate={{
            x: [mousePosition.x, mousePosition.x + Math.random() * 100 - 50],
            y: [mousePosition.y, mousePosition.y + Math.random() * 100 - 50],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

export const Hero: React.FC = () => {
  const mousePosition = useMousePosition();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            y: [0, -100, 0],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Particle effect on cursor movement */}
      {isClient && <Particles mousePosition={mousePosition} />}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div className="mt-10 mb-10 flex justify-center" variants={scaleIn}>
          <ProfileImage size="lg" />
        </motion.div>

        {/* Animated badge */}
        <motion.div className="mb-8 flex justify-center" variants={fadeInDown}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20">
            <span className="text-sky-400 text-sm font-semibold">Security Architecture & Risk Advisory</span>
          </div>
        </motion.div>

        {/* Main tagline with gradient text */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          variants={fadeInUp}
        >
          <span className="gradient-text-vivid">Building Proactive,</span>
          <br />
          <span className="text-slate-100">System-Based Security</span>
        </motion.h1>

        {/* Subheading */}
        <motion.div
          className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed space-y-4"
          variants={fadeInUp}
        >
          <p className="font-medium">
            I'm Samuel Akinrimisade, a trained criminologist and security professional with experience spanning 
            <span className="text-slate-100"> intelligence operations, physical security, organizational risk, governance, and security leadership</span>.
          </p>
          <p>
            I help organizations understand, structure, and fix their security before incidents happen—bridging 
            traditional physical security, intelligence, and structured systems to enable proactive, system-based protection.
          </p>
          <p className="text-slate-400 text-base">
            Founder of <span className="text-sky-400 font-semibold">SOA Secure Ltd</span>, a security advisory firm 
            built on the philosophy of Structured Security for Organizations.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={fadeInUp}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => smoothScroll('projects')}
            className="group"
          >
            <span className="flex items-center justify-center gap-2">
              View My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => smoothScroll('contact')}
          >
            Let&apos;s Collaborate
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => {
              // Download both documents
              const documents = [
                '/documents/samuel.akinrimisade-Strategic-Leadership-Course-Certificate-London-School-of-Business-Administrati.pdf',
                '/documents/certificate-sam.pdf'
              ];
              
              documents.forEach((doc, index) => {
                setTimeout(() => {
                  const link = document.createElement('a');
                  link.href = doc;
                  link.download = doc.split('/').pop() || 'document.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }, index * 300); // Stagger downloads by 300ms
              });
            }}
          >
            Download Certificates
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              // Preview both documents on a single page
              window.open('/documents', '_blank', 'noopener,noreferrer');
            }}
          >
            View Certificates
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          variants={fadeInUp}
        >
          <div className="w-6 h-10 border-2 border-sky-400 rounded-full flex items-center justify-center">
            <motion.div
              className="w-1 h-2 bg-sky-400 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

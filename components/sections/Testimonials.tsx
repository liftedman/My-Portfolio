'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { testimonials } from '@/config/testimonials';
import { containerVariants, fadeInUp } from '@/lib/animations';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
  };

  return (
    <section id="testimonials" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 100, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">What Others Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Feedback from amazing people I've had the pleasure of working with
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main testimonial */}
          <div className="relative min-h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="glass-effect-dark p-12 rounded-lg">
                  {/* Star rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-2xl text-yellow-400"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1,
                          repeat: Infinity,
                        }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl sm:text-2xl text-slate-100 mb-8 leading-relaxed">
                    "{testimonials[activeIndex].content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 flex items-center justify-center text-xl font-bold text-slate-950"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {testimonials[activeIndex].name.charAt(0)}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-slate-200">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-sm text-slate-400">
                        {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8">
            <motion.button
              onClick={goToPrevious}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
              className="px-6 py-2 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-all font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Previous
            </motion.button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === index ? 'bg-cyan-400 w-8' : 'bg-slate-600'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={goToNext}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
              className="px-6 py-2 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-all font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next →
            </motion.button>
          </div>

          {/* Testimonial counter */}
          <motion.div
            className="text-center mt-8 text-slate-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {activeIndex + 1} / {testimonials.length}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

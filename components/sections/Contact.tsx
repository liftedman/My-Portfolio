'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeInUp, containerVariants } from '@/lib/animations';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/constants';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send form data to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Failed to send message. Please try again or email me directly.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again or email me directly.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
          animate={{ 
            y: [0, -80, 0], 
            x: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-3xl"
          animate={{ 
            y: [0, 80, 0], 
            x: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-green-500/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(148_163_184/0.1)_1px,_transparent_0)] bg-[length:50px_50px]" />
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
            <span className="gradient-text">Let's Build Something Amazing</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something extraordinary together.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Form */}
          <motion.div variants={fadeInUp}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Name</label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                  placeholder="Your name"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              {/* Email Input */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Email</label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
                  placeholder="your@email.com"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              {/* Message Input */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Message</label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all resize-none"
                  placeholder="Tell me about your project..."
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isLoading || submitted}
                  className="w-full"
                >
                  {isLoading ? 'Sending...' : submitted ? '✓ Message Sent!' : 'Send Message'}
                </Button>
              </motion.div>

              {/* Success Message */}
              {submitted && (
                <motion.p
                  className="text-center text-green-400 font-semibold"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Email */}
            <motion.a
              href={`mailto:${siteConfig.email}`}
              className="relative group block glass-effect-dark p-8 rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <motion.div 
                className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center relative z-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>
              
              <h4 className="text-xl font-bold text-slate-200 mb-2 relative z-10">Email</h4>
              <p className="text-cyan-400 font-semibold text-lg relative z-10 group-hover:text-cyan-300 transition-colors">{siteConfig.email}</p>
              
              {/* Hover effect line */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-green-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-bold text-slate-200 mb-4">Connect With Me</h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(siteConfig.socialLinks).map(([platform, url], index) => (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group glass-effect-dark p-5 rounded-lg text-center border border-slate-700/50 hover:border-cyan-500/50 transition-all font-semibold capitalize overflow-hidden"
                    whileHover={{ scale: 1.08, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <span className="relative z-10 text-slate-300 group-hover:text-cyan-400 transition-colors">
                      {platform}
                    </span>
                    
                    {/* Bottom border effect */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-violet-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="relative group glass-effect-dark p-8 rounded-xl overflow-hidden border border-slate-700/50"
              whileHover={{ y: -5 }}
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-green-500/10"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
              />
              
              <p className="text-slate-300 text-center relative z-10 leading-relaxed">
                Whether you have a question or a project idea, feel free to reach out. I'd love to
                hear from you!
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

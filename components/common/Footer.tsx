'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/config/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-cyan-500/10 mt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h3 className="text-2xl font-bold gradient-text mb-4">Lifted</h3>
            <p className="text-slate-400 mb-4">
              Building beautiful, functional digital experiences for innovative brands.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-slate-200 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-slate-200 mb-4">Connect</h4>
            <div className="flex gap-4">
              {Object.entries(siteConfig.socialLinks).map(([platform, url]) => (
                <motion.a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {platform.charAt(0).toUpperCase()}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-8" />

        {/* Bottom */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between text-sm text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p>&copy; {currentYear} Lifted. All rights reserved.</p>
          <p>
            Crafted with <span className="text-red-500">❤️</span> by Lifted
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

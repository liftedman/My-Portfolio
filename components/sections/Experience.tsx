'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/config/experience';
import { containerVariants, fadeInLeft, fadeInRight } from '@/lib/animations';
import { Badge } from '@/components/ui/Badge';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -100, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
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
            <span className="gradient-text">Experience & Journey</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A timeline of my professional journey building innovative digital solutions
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-cyan-500/50" />

          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="mb-12 md:mb-16"
              variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
            >
              <div className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="w-full md:w-1/2">
                  <motion.div
                    className="glass-effect-dark p-8 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                    whileHover={{ y: -5 }}
                  >
                    {/* Company & Position */}
                    <h3 className="text-2xl font-bold text-slate-100 mb-1">{exp.position}</h3>
                    <p className="text-cyan-400 font-semibold mb-2">{exp.company}</p>

                    {/* Date Range */}
                    <p className="text-sm text-slate-400 mb-4">
                      {exp.startDate} — {exp.endDate}
                    </p>

                    {/* Description */}
                    <p className="text-slate-300 mb-4">{exp.description}</p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-200 mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="primary" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200 mb-2">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start gap-2 text-slate-400 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span className="text-cyan-400 mt-1 flex-shrink-0">✓</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 items-center justify-center flex-shrink-0 z-10 glow-cyan">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-slate-950"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Spacer for layout */}
                <div className="w-full md:w-1/2" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16 p-8 glass-effect-dark rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-300 text-lg mb-4">
            Interested in working together? Let&apos;s connect and create something amazing!
          </p>
          <motion.a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

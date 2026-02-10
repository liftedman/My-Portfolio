'use client';

import { motion } from 'framer-motion';
import { fadeInUp, containerVariants, staggerContainer } from '@/lib/animations';
import { Badge } from '@/components/ui/Badge';
import { skills } from '@/config/skills';

export const About: React.FC = () => {
  const aboutItems = [
    {
      title: 'Security Architecture',
      description: 'Designing structured, proactive security systems before incidents expose gaps.',
      icon: '🏗️',
    },
    {
      title: 'Risk Intelligence',
      description: 'Threat analysis, vulnerability assessment, and intelligent risk communication.',
      icon: '🔍',
    },
    {
      title: 'Organizational Governance',
      description: 'Building security policies, SOPs, and compliance frameworks that stick.',
      icon: '📋',
    },
    {
      title: 'Leadership & Awareness',
      description: 'Training security-conscious cultures and enabling informed decision-making.',
      icon: '👥',
    },
  ];

  const skillCategories = [
    {
      name: 'Security & Risk',
      skills: ['Physical Security', 'Risk Assessment', 'Threat Analysis', 'Access Control'],
    },
    {
      name: 'Governance & Ops',
      skills: ['Policy Development', 'SOPs', 'Compliance', 'Risk Management'],
    },
    {
      name: 'Intelligence',
      skills: ['Threat Intelligence', 'Analysis', 'Reconnaissance', 'Situational Awareness'],
    },
    {
      name: 'Leadership',
      skills: ['Strategic Thinking', 'Training', 'Decision-Making', 'Stakeholder Engagement'],
    },
  ];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background element */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-40 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 100, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">About Samuel</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Security architect helping organizations understand and fix their security before incidents happen.
          </p>
        </motion.div>

        {/* About Items Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {aboutItems.map((item, index) => (
            <motion.div
              key={index}
              className="glass-effect-dark p-8 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">{item.title}</h3>
              <p className="text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-slate-100 mb-8 text-center">Core Expertise</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-effect-dark p-6 rounded-lg"
              >
                <h4 className="text-blue-400 font-semibold mb-4 text-center">{category.name}</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="primary" size="sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-400 text-lg">
            With expertise in criminology, intelligence operations, and security governance, I help organizations transition from reactive protection to proactive, system-based security. Let&apos;s structure your security before incidents happen.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

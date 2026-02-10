'use client';

import { motion } from 'framer-motion';
import { skillCategories, skills } from '@/config/skills';
import { containerVariants, fadeInUp } from '@/lib/animations';

interface SkillIconProps {
  name: string;
  category: string;
  level: 'expert' | 'intermediate' | 'beginner';
}

const SkillIcon: React.FC<SkillIconProps> = ({ name, category, level }) => {
  const getIcon = (name: string) => {
    const iconMap: { [key: string]: string } = {
      'Physical Security Architecture': '🛡️',
      'Security Risk Assessment': '📋',
      'Threat & Vulnerability Analysis': '🔍',
      'Access Control & VMS': '🔒',
      'Background Checks & Screening': '🧾',
      'Incident Prevention': '🚨',
      'Security Policy Development': '📑',
      'Organizational Risk Governance': '🏛️',
      'Standard Operating Procedures': '🧭',
      'Compliance & Internal Controls': '✅',
      'Security Reporting': '📊',
      'Security Intelligence Gathering': '🛰️',
      'Information Analysis & Reporting': '🧠',
      'Situational Awareness': '👁️',
      'Threat Intelligence': '🧩',
      'Confidential Data Handling': '🗝️',
      'VMS Design & Implementation': '🗂️',
      'Security Process Mapping': '🧬',
      'Operational Workflow Design': '🧱',
      'Digital Records & Access': '🗄️',
      'Strategic Thinking': '♟️',
      'Leadership & Decision-Making': '🧑‍💼',
      'Risk Communication': '🗣️',
      'Stakeholder Engagement': '🤝',
      'Security Awareness Training': '🎓',
      'Ethical Judgment': '⚖️',
    };
    return iconMap[name] || '🛡️';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'from-sky-400 to-violet-500';
      case 'intermediate':
        return 'from-emerald-400 to-sky-400';
      default:
        return 'from-slate-400 to-slate-500';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.15, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center"
    >
      <motion.div
        className={`w-16 h-16 rounded-lg bg-gradient-to-br ${getLevelColor(level)} p-3 flex items-center justify-center text-3xl glow-cyan mb-2 cursor-pointer`}
        animate={{
          boxShadow: level === 'expert' ? ['0 0 20px rgba(239, 68, 68, 0.5)', '0 0 40px rgba(239, 68, 68, 0.8)', '0 0 20px rgba(239, 68, 68, 0.5)'] : 'none',
        }}
        transition={{
          duration: 2,
          repeat: level === 'expert' ? Infinity : 0,
        }}
      >
        {getIcon(name)}
      </motion.div>
      <p className="text-sm font-semibold text-slate-200 text-center">{name}</p>
      <p className="text-xs text-slate-400">{level}</p>
    </motion.div>
  );
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/3 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
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
            <span className="gradient-text">Security Capabilities</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A structured, security-first toolkit covering architecture, intelligence, governance, and
            leadership
          </p>
        </motion.div>

        {/* Skills Grid by Category */}
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category) => {
            const categorySkills = skills.filter((skill) => skill.category === category);

            return (
              <motion.div key={category} variants={fadeInUp} className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-slate-100 mb-8 text-center gradient-text">
                {category}
              </h3>

              <div className="flex flex-wrap justify-center gap-6 mx-auto max-w-6xl">
                {categorySkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                    >
                      <SkillIcon
                        name={skill.name}
                        category={category}
                        level={skill.level}
                      />
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          );
          })}
        </motion.div>

        {/* Legend */}
        <motion.div
          className="mt-16 p-8 glass-effect-dark rounded-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-semibold text-slate-200 mb-4 text-center">Proficiency Legend</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-400 to-violet-500 glow-cyan" />
              <div>
                <p className="font-semibold text-slate-200">Expert</p>
                <p className="text-sm text-slate-400">Advanced proficiency</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400 to-sky-400" />
              <div>
                <p className="font-semibold text-slate-200">Intermediate</p>
                <p className="text-sm text-slate-400">Good working knowledge</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-400 to-slate-500" />
              <div>
                <p className="font-semibold text-slate-200">Beginner</p>
                <p className="text-sm text-slate-400">Learning & growing</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

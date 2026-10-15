'use client';

import { motion } from 'framer-motion';
import { skillCategories, skills, type Skill } from '@/config/skills';
import { Eyebrow, SplitReveal } from '@/components/motion/primitives';

const LEVELS: Record<Skill['level'], number> = { beginner: 1, intermediate: 2, expert: 3 };

/** Three-segment proficiency meter. */
function LevelMeter({ level }: { level: Skill['level'] }) {
  const filled = LEVELS[level];
  return (
    <span className="flex items-center gap-1" aria-label={`${level} level`} title={level}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`h-1.5 w-4 rounded-full transition-colors duration-500 ${
            n <= filled ? 'bg-accent' : 'bg-line-strong'
          }`}
        />
      ))}
    </span>
  );
}

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-20 sm:py-28 lg:py-36">
      <div className="shell">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow index="03">Skills</Eyebrow>
            <SplitReveal as="h2" text="The toolkit" className="font-display-tight text-[clamp(3rem,8vw,8rem)]" />
          </div>
          <p className="max-w-md text-muted lg:justify-self-end">
            Languages, frameworks and services I ship with day to day. Three bars means I&apos;d
            lead with it; two means I use it comfortably in production.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category}
              className="liquid-glass spotlight glass-rim rounded-3xl p-7"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: ci * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">{category}</h3>
                <span className="font-mono text-xs text-faint">0{ci + 1}</span>
              </div>
              <ul className="relative">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, si) => (
                    <motion.li
                      key={skill.name}
                      className="group flex items-center justify-between border-t border-line py-3.5"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + ci * 0.08 + si * 0.05 }}
                    >
                      <span className="font-medium transition-transform duration-300 group-hover:translate-x-1.5">
                        {skill.name}
                      </span>
                      <LevelMeter level={skill.level} />
                    </motion.li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

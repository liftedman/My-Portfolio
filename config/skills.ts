export interface Skill {
  name: string;
  category: string;
  icon?: string;
  level: 'expert' | 'intermediate' | 'beginner';
}

export const skills: Skill[] = [
  // Languages
  { name: 'Dart', category: 'Languages', level: 'expert' },
  { name: 'JavaScript', category: 'Languages', level: 'expert' },
  { name: 'TypeScript', category: 'Languages', level: 'intermediate' },
  { name: 'SQL', category: 'Languages', level: 'intermediate' },

  // Frameworks
  { name: 'Flutter', category: 'Frameworks', level: 'expert' },
  { name: 'React', category: 'Frameworks', level: 'expert' },
  { name: 'Next.js', category: 'Frameworks', level: 'intermediate' },
  { name: 'Node.js', category: 'Frameworks', level: 'intermediate' },

  // Databases
  { name: 'Firebase', category: 'Databases', level: 'expert' },
  { name: 'Supabase', category: 'Databases', level: 'intermediate' },
  { name: 'MySQL', category: 'Databases', level: 'intermediate' },
  { name: 'MongoDB', category: 'Databases', level: 'intermediate' },

  // Cloud & Tools
  { name: 'Google Cloud', category: 'Cloud & Tools', level: 'intermediate' },
  { name: 'Git', category: 'Cloud & Tools', level: 'expert' },
  { name: 'Docker', category: 'Cloud & Tools', level: 'intermediate' },
  { name: 'Figma', category: 'Cloud & Tools', level: 'intermediate' },
];

export const skillCategories = ['Languages', 'Frameworks', 'Databases', 'Cloud & Tools'];

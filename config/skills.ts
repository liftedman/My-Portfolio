export interface Skill {
  name: string;
  category: string;
  icon?: string;
  level: 'expert' | 'intermediate' | 'beginner';
}

export const skills: Skill[] = [
  // Security & Risk
  { name: 'Physical Security Architecture', category: 'Security & Risk', level: 'expert' },
  { name: 'Security Risk Assessment', category: 'Security & Risk', level: 'expert' },
  { name: 'Threat & Vulnerability Analysis', category: 'Security & Risk', level: 'expert' },
  { name: 'Access Control & VMS', category: 'Security & Risk', level: 'expert' },
  { name: 'Background Checks & Screening', category: 'Security & Risk', level: 'expert' },
  { name: 'Incident Prevention', category: 'Security & Risk', level: 'intermediate' },

  // Governance & Operations
  { name: 'Security Policy Development', category: 'Governance & Operations', level: 'expert' },
  { name: 'Organizational Risk Governance', category: 'Governance & Operations', level: 'expert' },
  { name: 'Standard Operating Procedures', category: 'Governance & Operations', level: 'expert' },
  { name: 'Compliance & Internal Controls', category: 'Governance & Operations', level: 'expert' },
  { name: 'Security Reporting', category: 'Governance & Operations', level: 'intermediate' },

  // Intelligence & Analysis
  { name: 'Security Intelligence Gathering', category: 'Intelligence & Analysis', level: 'expert' },
  { name: 'Information Analysis & Reporting', category: 'Intelligence & Analysis', level: 'expert' },
  { name: 'Situational Awareness', category: 'Intelligence & Analysis', level: 'expert' },
  { name: 'Threat Intelligence', category: 'Intelligence & Analysis', level: 'intermediate' },
  { name: 'Confidential Data Handling', category: 'Intelligence & Analysis', level: 'expert' },

  // Systems & Technology
  { name: 'VMS Design & Implementation', category: 'Systems & Technology', level: 'intermediate' },
  { name: 'Security Process Mapping', category: 'Systems & Technology', level: 'expert' },
  { name: 'Operational Workflow Design', category: 'Systems & Technology', level: 'expert' },
  { name: 'Digital Records & Access', category: 'Systems & Technology', level: 'intermediate' },

  // Professional & Leadership
  { name: 'Strategic Thinking', category: 'Professional & Leadership', level: 'expert' },
  { name: 'Leadership & Decision-Making', category: 'Professional & Leadership', level: 'expert' },
  { name: 'Risk Communication', category: 'Professional & Leadership', level: 'expert' },
  { name: 'Stakeholder Engagement', category: 'Professional & Leadership', level: 'expert' },
  { name: 'Security Awareness Training', category: 'Professional & Leadership', level: 'expert' },
  { name: 'Ethical Judgment', category: 'Professional & Leadership', level: 'expert' },
];

export const skillCategories = ['Security & Risk', 'Governance & Operations', 'Intelligence & Analysis', 'Systems & Technology', 'Professional & Leadership'];

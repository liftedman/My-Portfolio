export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'advisory' | 'assessment' | 'training' | 'operations';
  technologies: string[];
  image: string;
  images: string[];
  role: string;
  link?: string;
  github?: string;
  highlights: string[];
  year: number;
}

export const projects: Project[] = [
  {
    id: 'vms-advisory',
    title: 'Visitor Management System (VMS) Advisory',
    shortDescription: 'Enterprise-grade VMS design for modern organizational security',
    description:
      'Comprehensive advisory and conceptual framework for designing next-generation visitor management systems. Combines futuristic simplicity with enterprise-grade security infrastructure, enabling real-time logging, QR-based check-in, role-based dashboards, and live analytics.',
    category: 'advisory',
    technologies: ['Security Architecture', 'Access Control', 'Risk Assessment', 'Process Design'],
    image: '/images/samproject.jpg',
    images: ['/images/samproject.jpg'],

    role: 'Security Architect & Advisor',
    highlights: [
      'Enterprise-grade visitor tracking and logging',
      'QR-based check-in with role-based access',
      'Real-time analytics and reporting dashboards',
      'Risk assessment and threat identification',
      'Compliance-aligned architectural design',
    ],
    year: 2024,
  },
  {
    id: 'security-assessment',
    title: 'Security Assessments & Risk Evaluations',
    shortDescription: 'Comprehensive organizational security assessments and risk advisory',
    description:
      'Conducted in-depth security reconnaissance and risk assessments for high-level maritime operations at Eko Hotel and NIMASA environments. Provided situational awareness analysis and preventive planning recommendations to support strategic decision-making.',
    category: 'assessment',
    technologies: ['Threat Analysis', 'Risk Assessment', 'Intelligence Gathering', 'Reporting'],
    image: '/images/samproject.jpg',
    images: ['/images/samproject.jpg'],
    role: 'Security Consultant & Intelligence Analyst',
    highlights: [
      'Comprehensive organizational risk evaluations',
      'Physical and operational security assessments',
      'Threat identification and vulnerability mapping',
      'Actionable recommendations for risk mitigation',
      'Strategic security intelligence reporting',
    ],
    year: 2024,
  },
  {
    id: 'security-awareness',
    title: 'Security Starts With Us Initiative',
    shortDescription: 'Educational security awareness program across Nigerian states',
    description:
      'Designed and led comprehensive security awareness initiative reaching 1000+ students and community members across two Nigerian states. Created educational framework repositioning security as shared organizational responsibility rooted in structure, awareness, and human behavior.',
    category: 'training',
    technologies: ['Curriculum Design', 'Training', 'Community Engagement', 'Education'],
    image: '/images/samproject.jpg',
    images: ['/images/samproject.jpg'],
    role: 'Program Founder & Lead Facilitator',
    highlights: [
      'Designed comprehensive security awareness curriculum',
      'Successfully implemented across two Nigerian states',
      'Trained 1000+ students and community members',
      'Published "Security Starts With Us" educational book',
      'Built culture of preventive security thinking',
    ],
    year: 2023,
  },
  {
    id: 'background-screening',
    title: 'Background Checks & Integrity Screening',
    shortDescription: 'Organizational integrity verification and background screening services',
    description:
      'Provided comprehensive background check and integrity screening services for organizations to support informed hiring, trust-building, and strategic risk decisions. Enabled organizations to make confident personnel decisions with full situational awareness.',
    category: 'operations',
    technologies: ['Due Diligence', 'Information Analysis', 'Confidential Handling', 'Verification'],
    image: '/images/samproject.jpg',
    images: ['/images/samproject.jpg'],
    role: 'Security Consultant',
    highlights: [
      'Comprehensive background verification processes',
      'Integrity assessment and screening protocols',
      'Confidential information handling and reporting',
      'Risk-based decision support for organizations',
      'Compliance with verification standards',
    ],
    year: 2023,
  },
  {
    id: 'organizational-governance',
    title: 'Organizational Risk Governance & Operations',
    shortDescription: 'Operations oversight and governance framework implementation',
    description:
      'Managed and restructured operations, internal controls, and compliance systems for service-based organization. Identified governance gaps, built accountability frameworks, and improved operational risk management through systematic process design.',
    category: 'operations',
    technologies: ['Operations Management', 'Governance', 'Compliance', 'Risk Management'],
    image: '/images/samproject.jpg',
    images: ['/images/samproject.jpg'],
    role: 'Operations Lead & Governance Advisor',
    highlights: [
      'Built comprehensive internal control systems',
      'Implemented organizational governance frameworks',
      'Designed standard operating procedures (SOPs)',
      'Established accountability and reporting systems',
      'Improved operational efficiency through structuring',
    ],
    year: 2022,
  },
];

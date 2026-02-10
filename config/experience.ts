export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string | 'Present';
  technologies: string[];
  achievements: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: 'nimasa-intelligence',
    company: 'Nigerian Maritime Administration & Safety Agency (NIMASA)',
    position: 'Intelligence Officer',
    description: 'Supported intelligence operations, monitoring, reconnaissance, and security reporting within maritime security environment.',
    startDate: '2021',
    endDate: 'Present',
    technologies: ['Intelligence Analysis', 'Threat Assessment', 'Security Reporting'],
    achievements: [
      'Conducted security reconnaissance for high-level maritime operations',
      'Performed comprehensive risk assessments in NIMASA operational environments',
      'Provided intelligence analysis for strategic decision-making',
      'Supported situational awareness initiatives across maritime domain',
      'Built relationships with key stakeholders for intelligence gathering',
    ],
  },
  {
    id: 'soa-secure-founder',
    company: 'SOA Secure Ltd',
    position: 'Founder & Security Architect',
    description: 'Established security advisory firm providing comprehensive organizational security structuring and risk governance solutions.',
    startDate: '2023',
    endDate: 'Present',
    technologies: ['Security Architecture', 'Risk Governance', 'Policy Development'],
    achievements: [
      'Founded SOA Secure Ltd with philosophy of Structured Security for Organizations',
      'Designed and delivered comprehensive security advisory services',
      'Conducted background checks and integrity screenings for organizations',
      'Performed security reconnaissance and situational assessments',
      'Built client relationships across multiple sectors',
    ],
  },
  {
    id: 'security-awareness-facilitator',
    company: 'Security Starts With Us Initiative',
    position: 'Founder & Lead Facilitator',
    description: 'Designed and led security awareness initiative across two Nigerian states, repositioning security as shared responsibility.',
    startDate: '2022',
    endDate: '2024',
    technologies: ['Security Training', 'Awareness Programs', 'Community Engagement'],
    achievements: [
      'Designed comprehensive security awareness curriculum for schools',
      'Successfully implemented program across two states in Nigeria',
      'Trained 1000+ students and community members on preventive security',
      'Authored "Security Starts With Us" educational book',
      'Built culture of security consciousness through structured education',
    ],
  },
  {
    id: 'first-peniel-operations',
    company: 'First Peniel Global Nig Ltd',
    position: 'Operations Lead',
    description: 'Oversaw operations, internal controls, and compliance within service-based organization.',
    startDate: '2019',
    endDate: '2022',
    technologies: ['Operations Management', 'Governance', 'Compliance'],
    achievements: [
      'Managed operational processes and internal control systems',
      'Identified and addressed governance and compliance gaps',
      'Implemented process improvements for operational efficiency',
      'Built accountability frameworks and documentation systems',
      'Trained staff on operational standards and procedures',
    ],
  },
];

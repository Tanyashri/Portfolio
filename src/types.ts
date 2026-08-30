export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  summary: string;
  problem: string;
  approach: string;
  architecture: {
    title: string;
    description: string;
    diagramType: 'aura-pipeline' | 'graph-nodes' | 'skill-matching' | 'voice-pipeline';
    points: string[];
  };
  interestingDetail: string;
  result: string;
  verifiedMetrics?: { label: string; value: string }[];
  stack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  accentColor: string;
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    relatedProjects: string[]; // IDs of projects using this
    highlightReason?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  badge?: string;
  highlights: string[];
  metrics?: { value: string; label: string }[];
}

export interface OpenSourceProgram {
  name: string;
  fullName: string;
  role: string;
  description: string;
  contributions: string[];
  badge: string;
}

export interface CommunityImpact {
  organization: string;
  role: string;
  focus: string;
  highlights: string[];
}

export interface PersonalityFact {
  title: string;
  category: string;
  description: string;
  lesson: string;
  tag: string;
}

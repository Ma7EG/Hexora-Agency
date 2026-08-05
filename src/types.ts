export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  accentColor: string; // 'primary' | 'secondary' | 'tertiary'
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'E-Commerce Platform' | 'Branding' | 'App Design' | 'Web Development';
  tag: string;
  accentColor: string;
  gridSpan: string; // Tailwind grid span
  imagePlaceholder?: string;
  client: string;
  year: string;
  metrics: { label: string; value: string }[];
  summary: string;
  challenge: string;
  solution: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  instructor: string;
  price: string;
  rating: number;
  studentsCount: number;
  description: string;
  modules: string[];
  badgeColor: string;
}

export interface AIStrategyResult {
  overview: string;
  channels: {
    name: string;
    allocation: string;
    impact: string;
    details: string;
  }[];
  keyKPIs: string[];
  milestones: {
    phase: string;
    focus: string;
  }[];
  hexoraRecommendation: string;
}

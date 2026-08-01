export interface AboutInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  experienceYears: number;
  location: string;
  philosophy: string;
  interests: string[];
}

export interface SkillItem {
  name: string;
  proficiency: "Expert" | "Advanced" | "Intermediate" | "Learning";
  version?: string;
  icon?: string;
}

export interface SkillGroup {
  languages: SkillItem[];
  frameworks: SkillItem[];
  databases: string[];
  cloud_platforms: string[];
  tools: string[];
}

export interface MetricStat {
  label: string;
  value: string | number;
  unit?: string;
  history: number[];
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  status: "completed" | "in-progress" | "maintenance";
  overview: string;
  your_role: string;
  technologies_used: string[];
  key_features: string[];
  architecture_notes: string;
  challenges_solved: string[];
  github_repo: string;
  live_demo_api?: string;
  detailed_documentation?: string;
  metric?: string; // e.g. "Response latency reduced by 40%"
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  highlights: string[];
  technologies: string[];
  metrics?: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  graduationDate: string;
  cgpa: string;
}

export interface ContactDetails {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface ApiEndpoint {
  path: string;
  method: "GET" | "POST";
  description: string;
  category: "System" | "Profile" | "Experience" | "Stack" | "Projects" | "Contact";
}

export interface QueryParamRow {
  key: string;
  value: string;
  enabled: boolean;
  description?: string;
}

export interface HeaderRow {
  key: string;
  value: string;
  enabled: boolean;
  description?: string;
}

export interface LogEntry {
  timestamp: string;
  method: "GET" | "POST";
  path: string;
  statusCode: number;
  latencyMs: number;
  ip: string;
}

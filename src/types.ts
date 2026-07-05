export interface Project {
  id: string;
  name: string;
  description: string;
  category: "software" | "vlsi";
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  emoji: string;
  accentColor: string;
  details: {
    architecture: string;
    challenges: string;
    timeline: string;
    stack: string[];
    gallery: string[];
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  description: string;
  skills: string[];
  emoji: string;
  accentClass: string;
  highlights: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  score?: string;
  icon: string;
  badge: string;
  verified: boolean;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
  color: "blue" | "violet" | "gold";
}

export interface GithubRepo {
  name: string;
  description: string;
  language: string;
  color: string;
  stars: number;
  forks: number;
  url: string;
}

export interface GithubStats {
  username: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  total_stars: number;
  languages: { name: string; percentage: number; color: string }[];
  pinned_projects: GithubRepo[];
}

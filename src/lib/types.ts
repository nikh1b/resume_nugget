export interface Resume {
  id: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    website?: string;
    summary: string;
  };
  education: {
    id: string;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description?: string;
  }[];
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  skills: string[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
}

export type ResumeSection =
  | 'personal'
  | 'education'
  | 'experience'
  | 'skills'
  | 'projects';

export interface PortfolioConfig {
  id: string;
  slug: string;
  heroHeadline: string;
  aboutHtml: string;
  primaryColor: string;
  fontFamily: string;
  isPublished: boolean;
}

export type ThemePreset = 'midnight' | 'ember' | 'forest' | 'ocean';

export const THEME_PRESETS: Record<ThemePreset, { label: string; primaryColor: string; description: string }> = {
  midnight: { label: 'Midnight', primaryColor: '#7c3aed', description: 'Deep purple, elegant' },
  ember: { label: 'Ember', primaryColor: '#ef4444', description: 'Bold red, energetic' },
  forest: { label: 'Forest', primaryColor: '#22c55e', description: 'Fresh green, natural' },
  ocean: { label: 'Ocean', primaryColor: '#3b82f6', description: 'Cool blue, professional' },
};

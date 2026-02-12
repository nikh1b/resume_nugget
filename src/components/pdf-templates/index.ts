export { IvyTemplate } from './IvyTemplate';
export { ModernTemplate } from './ModernTemplate';
export { CreativeTemplate } from './CreativeTemplate';
export { MinimalistTemplate } from './MinimalistTemplate';
export { ExecutiveTemplate } from './ExecutiveTemplate';
export { StartupTemplate } from './StartupTemplate';
export { TechTemplate } from './TechTemplate';
export { ClassicTemplate } from './ClassicTemplate';

export type TemplateName = 'ivy' | 'modern' | 'creative' | 'minimalist' | 'executive' | 'startup' | 'tech' | 'classic';

export const TEMPLATE_INFO: Record<TemplateName, { label: string; description: string }> = {
    ivy: { label: 'Ivy', description: 'ATS-friendly, serif, single-column' },
    modern: { label: 'Modern', description: 'Two-column with dark sidebar' },
    creative: { label: 'Creative', description: 'Bold purple banner header' },
    minimalist: { label: 'Minimalist', description: 'Clean, centered, max whitespace' },
    executive: { label: 'Executive', description: 'Corporate style, dark blue accents' },
    startup: { label: 'Startup', description: 'Fresh teal accents, list style' },
    tech: { label: 'Tech', description: 'Monospace, terminal aesthetic' },
    classic: { label: 'Classic', description: 'Traditional Times New Roman' },
};

export { IvyTemplate } from './IvyTemplate';
export { ModernTemplate } from './ModernTemplate';
export { CreativeTemplate } from './CreativeTemplate';
export { MinimalistTemplate } from './MinimalistTemplate';
export { ExecutiveTemplate } from './ExecutiveTemplate';
export { StartupTemplate } from './StartupTemplate';
export { TechTemplate } from './TechTemplate';
export { ClassicTemplate } from './ClassicTemplate';
export { CompactTemplate } from './CompactTemplate';
export { DesignerTemplate } from './DesignerTemplate';
export { FinanceTemplate } from './FinanceTemplate';
export { EngineeringTemplate } from './EngineeringTemplate';
export { MarketingTemplate } from './MarketingTemplate';
export { AcademicTemplate } from './AcademicTemplate';
export { SaaSTemplate } from './SaaSTemplate';
export { ConsultingTemplate } from './ConsultingTemplate';
export { StudentTemplate } from './StudentTemplate';
export { ExecutiveProTemplate } from './ExecutiveProTemplate';
export { PureTemplate } from './PureTemplate';
export { BoldTemplate } from './BoldTemplate';

export type TemplateName =
    | 'ivy' | 'modern' | 'creative' | 'minimalist' | 'executive' | 'startup' | 'tech' | 'classic'
    | 'compact' | 'designer' | 'finance' | 'engineering' | 'marketing' | 'academic' | 'saas' | 'consulting'
    | 'student' | 'executivepro' | 'pure' | 'bold';

export const TEMPLATE_INFO: Record<TemplateName, { label: string; description: string }> = {
    ivy: { label: 'Ivy', description: 'ATS-friendly, serif, single-column' },
    modern: { label: 'Modern', description: 'Two-column with dark sidebar' },
    creative: { label: 'Creative', description: 'Bold purple banner header' },
    minimalist: { label: 'Minimalist', description: 'Clean, centered, max whitespace' },
    executive: { label: 'Executive', description: 'Corporate style, dark blue accents' },
    startup: { label: 'Startup', description: 'Fresh teal accents, list style' },
    tech: { label: 'Tech', description: 'Monospace, terminal aesthetic' },
    classic: { label: 'Classic', description: 'Traditional Times New Roman' },

    // New Templates
    compact: { label: 'Compact', description: 'High density, single page focus' },
    designer: { label: 'Designer', description: 'Bold typography, visual hierarchy' },
    finance: { label: 'Finance', description: 'Traditional, structured, dense' },
    engineering: { label: 'Engineering', description: 'Clean, structure-first, skills focus' },
    marketing: { label: 'Marketing', description: 'Vibrant, results-oriented layout' },
    academic: { label: 'Academic', description: 'Focus on research & publications' },
    saas: { label: 'SaaS', description: 'Modern startup aesthetic, blue/gray' },
    consulting: { label: 'Consulting', description: 'Bullet-points, management style' },
    student: { label: 'Student', description: 'Education & skills emphasized' },
    executivepro: { label: 'Exec Pro', description: 'Elegant, centered, authoritative' },
    pure: { label: 'Pure', description: 'Absolute minimalism, zero clutter' },
    bold: { label: 'Bold', description: 'Heavy borders, maximum impact' },
};

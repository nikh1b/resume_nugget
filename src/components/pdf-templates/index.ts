export { IvyTemplate } from './IvyTemplate';
export { ModernTemplate } from './ModernTemplate';
export { CreativeTemplate } from './CreativeTemplate';

export type TemplateName = 'ivy' | 'modern' | 'creative';

export const TEMPLATE_INFO: Record<TemplateName, { label: string; description: string }> = {
    ivy: { label: 'Ivy', description: 'ATS-friendly, serif, single-column' },
    modern: { label: 'Modern', description: 'Two-column with dark sidebar' },
    creative: { label: 'Creative', description: 'Bold purple banner header' },
};

'use client';

import { useResumeStore } from '@/store/useResumeStore';
import dynamic from 'next/dynamic';
import {
    IvyTemplate,
    ModernTemplate,
    CreativeTemplate,
    type TemplateName,
} from '@/components/pdf-templates';
import { Loader2 } from 'lucide-react';

// Dynamic import for PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-full w-full bg-white">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        ),
    }
);

export const ResumePreview = () => {
    const { resume, selectedTemplate } = useResumeStore();

    const getTemplateComponent = () => {
        switch (selectedTemplate) {
            case 'ivy':
                return <IvyTemplate resume={resume} />;
            case 'modern':
                return <ModernTemplate resume={resume} />;
            case 'creative':
                return <CreativeTemplate resume={resume} />;
            default:
                return <IvyTemplate resume={resume} />;
        }
    };

    return (
        <div className="w-full h-full bg-gray-100 flex justify-center items-center shadow-inner overflow-hidden">
            <PDFViewer
                width="100%"
                height="100%"
                className="border-none"
                showToolbar={false}
            >
                {getTemplateComponent()}
            </PDFViewer>
        </div>
    );
};


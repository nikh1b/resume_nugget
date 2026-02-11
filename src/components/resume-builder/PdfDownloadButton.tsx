'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useResumeStore } from '@/store/useResumeStore';
import {
    IvyTemplate,
    ModernTemplate,
    CreativeTemplate,
    TEMPLATE_INFO,
    type TemplateName,
} from '@/components/pdf-templates';

export function PdfDownloadButton() {
    const { resume, selectedTemplate } = useResumeStore();
    const [isGenerating, setIsGenerating] = useState(false);

    const getTemplateComponent = (name: TemplateName) => {
        switch (name) {
            case 'ivy':
                return <IvyTemplate resume={resume} />;
            case 'modern':
                return <ModernTemplate resume={resume} />;
            case 'creative':
                return <CreativeTemplate resume={resume} />;
        }
    };

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            const doc = getTemplateComponent(selectedTemplate);
            const blob = await pdf(doc).toBlob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${resume.personalInfo.fullName || 'Resume'}-${TEMPLATE_INFO[selectedTemplate].label}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button
            size="sm"
            onClick={handleDownload}
            disabled={isGenerating}
            className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
            variant="outline"
        >
            {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Download className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? 'Generating...' : `Download PDF`}
        </Button>
    );
}

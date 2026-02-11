'use client';

import { useResumeStore } from '@/store/useResumeStore';
import { TEMPLATE_INFO, TemplateName } from '@/components/pdf-templates';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Paintbrush } from 'lucide-react';

export const TemplateSelector = () => {
    const { selectedTemplate, setTemplate } = useResumeStore();

    return (
        <div className="flex items-center gap-2">
            <Paintbrush className="h-4 w-4 text-gray-500" />
            <Select
                value={selectedTemplate}
                onValueChange={(value) => setTemplate(value as TemplateName)}
            >
                <SelectTrigger className="w-[180px] h-8 text-xs bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent className="bg-[#111] border-white/10 text-gray-300">
                    {Object.entries(TEMPLATE_INFO).map(([key, info]) => (
                        <SelectItem key={key} value={key} className="focus:bg-white/10 focus:text-white cursor-pointer">
                            <span className="font-medium text-white">{info.label}</span>
                            <span className="ml-2 text-xs text-gray-500">- {info.description}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

"use client";

import { ResumeForm } from '@/components/resume-form/ResumeForm';
import { ResumePreview } from '@/components/resume-preview/ResumePreview';
import { Button } from '@/components/ui/button';
import { Save, Bot } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Resume } from '@/lib/types';
import { useResumeStore } from '@/store/useResumeStore';
import { saveResume } from '@/app/actions/resume';
import { UploadResume } from '@/components/resume-form/UploadResume';
import { JobMatch } from '@/components/resume-builder/JobMatch';
import dynamic from 'next/dynamic';
import { TemplateName } from '@/components/pdf-templates';

import { TemplateSelector } from '@/components/resume-builder/TemplateSelector';

const PdfDownloadButton = dynamic(
    () => import('@/components/resume-builder/PdfDownloadButton').then(mod => mod.PdfDownloadButton),
    { ssr: false, loading: () => <span className="text-xs text-gray-400">Loading...</span> }
);
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from "@/components/ui/sheet"

import { Logo } from '@/components/Logo';

interface ResumeEditorProps {
    initialData: Resume;
    id: string; // The ID from database
    initialTemplate?: string;
}

export default function ResumeEditor({ initialData, id, initialTemplate }: ResumeEditorProps) {
    const [mounted, setMounted] = useState(false);
    const { setResume, resume, _hasUnsavedChanges, markAsSaved, setTemplate } = useResumeStore();
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (initialData) {
            setResume({ ...initialData, id });

            // Apply initial template if provided from landing page
            if (initialTemplate) {
                setTemplate(initialTemplate as TemplateName);
            }

            // Should mark as saved after initial load to prevent 'unsaved' flag
            setTimeout(() => markAsSaved(), 100);
        }
    }, [initialData, id, setResume, markAsSaved, initialTemplate, setTemplate]);

    // Enhanced Auto-save Logic
    useEffect(() => {
        const interval = setInterval(async () => {
            if (_hasUnsavedChanges && resume && !isSaving) {
                setIsSaving(true);
                try {
                    await saveResume(resume);
                    markAsSaved();
                    console.log('Auto-saved resume');
                } catch (error) {
                    console.error('Auto-save failed:', error);
                } finally {
                    setIsSaving(false);
                }
            }
        }, 5000); // Check every 5s

        return () => clearInterval(interval);
    }, [_hasUnsavedChanges, resume, isSaving, markAsSaved]);




    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

    if (!mounted) return null;

    return (
        <div className="flex flex-col h-screen bg-[#0a0a0a]">


            {/* Toolbar */}
            <div className="h-14 border-b border-white/10 bg-[#111] flex items-center justify-between px-4 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="flex items-center scale-75 origin-left">
                        <Logo />
                    </div>

                    <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block"></div>

                    {/* Mobile View Toggle */}
                    <div className="flex items-center bg-[#0a0a0a] rounded-lg p-1 border border-white/10 sm:hidden">
                        <button
                            onClick={() => setActiveTab('editor')}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'editor' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${activeTab === 'preview' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
                        >
                            View
                        </button>
                    </div>

                    {/* Desktop Status */}
                    <div className="hidden sm:flex items-center gap-2">
                        {isSaving && <span className="text-xs text-gray-500 animate-pulse">Saving...</span>}
                        {!isSaving && _hasUnsavedChanges && <span className="text-xs text-amber-400">● Unsaved</span>}
                        {!isSaving && !_hasUnsavedChanges && <span className="text-xs text-lime-400">● Saved</span>}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white sm:hidden">
                                <Bot className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:w-[540px] overflow-y-auto bg-[#111] border-white/10">
                            <SheetHeader>
                                <SheetTitle className="text-white">AI Job Match</SheetTitle>
                                <SheetDescription className="text-gray-400">
                                    Compare resume vs job description.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-6 h-full">
                                <JobMatch />
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white sm:hidden"
                        onClick={async () => {
                            setIsSaving(true);
                            await saveResume(resume);
                            markAsSaved();
                            setIsSaving(false);
                        }}
                        disabled={isSaving}
                    >
                        <Save className="h-5 w-5" />
                    </Button>

                    {/* Desktop Buttons */}
                    <div className="hidden sm:flex items-center gap-2">
                        <TemplateSelector />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white">
                                    <Bot className="mr-2 h-4 w-4 text-blue-400" /> Job Match
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-[540px] overflow-y-auto bg-[#111] border-white/10">
                                <SheetHeader>
                                    <SheetTitle className="text-white">AI Job Match Analysis</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 h-full">
                                    <JobMatch />
                                </div>
                            </SheetContent>
                        </Sheet>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
                            onClick={async () => {
                                setIsSaving(true);
                                await saveResume(resume);
                                markAsSaved();
                                setIsSaving(false);
                            }}
                            disabled={isSaving}
                        >
                            <Save className="mr-2 h-4 w-4" /> Save
                        </Button>
                    </div>
                    <PdfDownloadButton />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Editor Panel */}
                <div className={`
                    absolute inset-0 sm:static sm:w-1/2 border-r border-white/10 bg-[#0d0d0d] p-4 sm:p-6 overflow-hidden transition-opacity duration-200
                    ${activeTab === 'editor' ? 'opacity-100 z-10' : 'opacity-0 -z-10 sm:opacity-100 sm:z-0'}
                `}>
                    <ResumeForm />
                </div>

                {/* Preview Panel */}
                <div className={`
                    absolute inset-0 sm:static sm:w-1/2 p-4 sm:p-8 overflow-y-auto bg-[#161616] flex justify-center transition-opacity duration-200
                    ${activeTab === 'preview' ? 'opacity-100 z-10' : 'opacity-0 -z-10 sm:opacity-100 sm:z-0'}
                `}>
                    <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl origin-top sm:scale-100 scale-[0.45] sm:transform-none mt-[-25%] sm:mt-0">
                        <ResumePreview />
                    </div>
                </div>
            </div>
        </div>
    );
}


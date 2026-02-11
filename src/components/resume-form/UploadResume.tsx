'use client';

import { Button } from '@/components/ui/button';
import { Upload, Loader2, FileText } from 'lucide-react';
import { useRef, useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { parseResume } from '@/app/actions/parse';

export const UploadResume = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const { setResume, resume } = useResumeStore();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file.');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const result = await parseResume(formData);
            if (result.success && result.resume) {
                // Merge parsed content while preserving the current resume ID
                setResume({
                    ...resume,
                    personalInfo: result.resume.personalInfo as typeof resume.personalInfo,
                    education: result.resume.education as typeof resume.education,
                    experience: result.resume.experience as typeof resume.experience,
                    skills: result.resume.skills,
                    projects: result.resume.projects as typeof resume.projects,
                });
                alert('Resume parsed successfully!');
            } else {
                alert('Failed to parse resume: ' + result.error);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('An error occurred during upload.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 p-4 border border-white/10 border-dashed rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
            />
            <div className="p-3 bg-white/5 rounded-full">
                <Upload className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-center">
                <p className="text-sm font-medium text-white">Import from PDF</p>
                <p className="text-xs text-gray-500">Auto-fill your resume</p>
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full mt-2 border-white/10 text-gray-300 hover:bg-white/5"
            >
                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                {isUploading ? 'Parsing...' : 'Select PDF'}
            </Button>
        </div>
    );
};

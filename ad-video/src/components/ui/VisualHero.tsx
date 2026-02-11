import React from 'react';

import { VisualLogo } from './VisualLogo';

// Mocking the Button since likely it wasn't exported from VisualJobMatch properly or we need a clean one
const HeroButton = ({ text, className }: { text: string, className?: string }) => (
    <div className={`px-8 py-3 rounded-full font-bold text-base cursor-pointer transform transition-transform hover:scale-105 ${className}`}>
        {text}
    </div>
);

export const VisualHero = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-20 bg-[#0a0a0a] w-full">
            <h1 className="text-8xl font-black tracking-tighter text-white leading-[0.9] mb-6">
                BUILD KILLER
                <br />
                <span className="text-red-500">RESUMES.</span>
            </h1>
            <p className="text-gray-400 text-2xl max-w-2xl mx-auto mt-4 mb-2">
                The AI-powered resume builder that helps you craft ATS-optimized resumes in minutes.
            </p>
            <p className="text-lime-400 font-semibold text-lg mb-12">
                AI-enhanced. ATS-optimized. Recruiter-approved.
            </p>

            <div className="flex gap-4 justify-center">
                <HeroButton text="Start Building" className="bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]" />
                <HeroButton text="Go to Dashboard" className="border border-gray-700 text-gray-300" />
            </div>
        </div>
    );
};
